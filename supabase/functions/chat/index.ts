// deno-lint-ignore-file no-explicit-any
// Supabase Edge Function: chat
// POST { messages: [{role, content}], userLocation?: {lat,lng} }
// → { reply: string, places: Place[] }
//
// Calls OpenAI (gpt-4o-mini by default) with a single tool `search_places`
// that hits the public.places table via the anon key.

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') ?? '';
const OPENAI_MODEL = Deno.env.get('OPENAI_MODEL') ?? 'gpt-4o-mini';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_ANON_KEY =
  Deno.env.get('SUPABASE_ANON_KEY') ?? Deno.env.get('SUPABASE_KEY') ?? '';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SYSTEM_PROMPT = `너는 파치먼트(Parchment)의 큐레이션 어시스턴트야.
사용자가 가고 싶은 도시·지역·분위기·카테고리를 말하면 search_places 툴로 우리 DB의 큐레이팅된 장소를 찾아 추천해.
한국어로 따뜻하고 간결하게 답해. 추천 시 장소 이름과 한 줄 vibe를 함께 언급해.
DB에 결과가 없으면 솔직히 "아직 그 지역 큐레이션이 부족해요"라고 알려줘.
도시명은 영문 슬러그(Seoul, Daejeon, Tokyo, Bali, Cairo, Busan, Gyeongju, Jeju)로 매핑해서 검색해.`;

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'search_places',
      description:
        'Search Parchment curated places. Filters: city, category, keywords, near (radius in km).',
      parameters: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            description:
              'English city slug, e.g. Seoul, Daejeon, Tokyo, Bali, Cairo, Busan, Gyeongju, Jeju',
          },
          category: {
            type: 'string',
            enum: ['cafe', 'restaurant', 'culture', 'bar', 'stay'],
          },
          keywords: {
            type: 'array',
            items: { type: 'string' },
            description: 'Free-form vibe keywords to filter on (Korean OK).',
          },
          near_lat: { type: 'number' },
          near_lng: { type: 'number' },
          radius_km: { type: 'number', default: 5 },
        },
      },
    },
  },
];

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function searchPlaces(args: any) {
  let q = supabase.from('places').select('*').eq('status', 'published');
  if (args.city) q = q.ilike('city', `%${args.city}%`);
  if (args.category) q = q.eq('category', args.category);

  const { data, error } = await q.limit(50);
  if (error) return { places: [], error: error.message };

  let places = data ?? [];

  if (typeof args.near_lat === 'number' && typeof args.near_lng === 'number') {
    const r = args.radius_km ?? 5;
    places = places.filter(
      (p: any) =>
        haversineKm(args.near_lat, args.near_lng, p.lat, p.lng) <= r,
    );
  }

  if (Array.isArray(args.keywords) && args.keywords.length > 0) {
    const kw = args.keywords.map((k: string) => k.toLowerCase());
    places = places.filter((p: any) => {
      const hay = `${p.name ?? ''} ${p.vibe ?? ''} ${p.curator_notes ?? ''}`.toLowerCase();
      return kw.some((k: string) => hay.includes(k));
    });
  }

  return { places: places.slice(0, 6) };
}

async function callOpenAI(messages: any[], tools?: any) {
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      tools,
      tool_choice: tools ? 'auto' : undefined,
      temperature: 0.6,
    }),
  });
  if (!r.ok) {
    throw new Error(`OpenAI ${r.status}: ${await r.text()}`);
  }
  return r.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method not allowed' }), {
      status: 405,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
  if (!OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'OPENAI_API_KEY not configured' }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } },
    );
  }

  try {
    const { messages = [], userLocation } = await req.json();

    const sys = userLocation
      ? `${SYSTEM_PROMPT}\n\n사용자 현재 좌표: lat=${userLocation.lat}, lng=${userLocation.lng}. 위치를 명시 안 했으면 이 좌표 주변(near_lat/near_lng)으로 search_places 호출해.`
      : SYSTEM_PROMPT;

    const initial = await callOpenAI(
      [{ role: 'system', content: sys }, ...messages],
      TOOLS,
    );

    const choice = initial.choices?.[0];
    const msg = choice?.message;
    if (!msg) throw new Error('OpenAI: no message');

    let places: any[] = [];

    if (msg.tool_calls?.length) {
      const toolMessages: any[] = [];
      for (const tc of msg.tool_calls) {
        if (tc.function?.name === 'search_places') {
          const args = JSON.parse(tc.function.arguments || '{}');
          const result = await searchPlaces(args);
          places = result.places;
          toolMessages.push({
            role: 'tool',
            tool_call_id: tc.id,
            content: JSON.stringify(result),
          });
        }
      }

      const final = await callOpenAI([
        { role: 'system', content: sys },
        ...messages,
        msg,
        ...toolMessages,
      ]);

      return new Response(
        JSON.stringify({
          reply: final.choices?.[0]?.message?.content ?? '',
          places,
        }),
        { headers: { ...CORS, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({ reply: msg.content ?? '', places }),
      { headers: { ...CORS, 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
});
