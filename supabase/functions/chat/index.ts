// deno-lint-ignore-file no-explicit-any
// Supabase Edge Function: chat
//
// POST { messages: [{role, content}], userLocation?: {lat,lng} }
// → { reply: string, places: Place[] }
//
// 강건화 포인트
// - city 한↔영 매핑 (서울/부산/대전/대구/경주/제주/도쿄/발리/카이로/...)
// - multi-round tool loop (max 4) → search_places + list_curated_cities + get_place_details
// - city만 있을 때 city 중심좌표로 자동 near 검색 + 거리순 정렬
// - 입력 유효성 (history 12개로 잘라내기, 메시지당 1000자 cap, 첫 메시지가 user인지)
// - OpenAI 호출 30초 timeout, max_tokens 800
// - DB 외 장소 절대 만들지 말 것 / 위험 주제 부드럽게 거절 / 추천 카드는 자동 첨부
// - 멱등 collect (같은 id 중복 제거)

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

const MAX_HISTORY = 12;
const MAX_TOOL_ROUNDS = 4;
const MAX_MESSAGE_LEN = 1000;
const OPENAI_TIMEOUT_MS = 30_000;

// ---- City mapping (Korean ↔ English slug + center coords) ---------------
const CITY_MAP: Record<string, { slug: string; lat: number; lng: number }> = {};
function addCity(slug: string, lat: number, lng: number, ...aliases: string[]) {
  const entry = { slug, lat, lng };
  CITY_MAP[slug.toLowerCase()] = entry;
  for (const a of aliases) CITY_MAP[a.toLowerCase()] = entry;
}
addCity('Seoul', 37.5665, 126.9780, '서울');
addCity('Busan', 35.1796, 129.0756, '부산');
addCity('Daejeon', 36.3504, 127.3845, '대전');
addCity('Daegu', 35.8714, 128.6014, '대구');
addCity('Gyeongju', 35.8562, 129.2247, '경주');
addCity('Jeju', 33.4996, 126.5312, '제주', '제주도');
addCity('Tokyo', 35.6762, 139.6503, '도쿄', '東京');
addCity('Bali', -8.4095, 115.1889, '발리');
addCity('Cairo', 30.0444, 31.2357, '카이로');

function resolveCity(input: string | undefined | null) {
  if (!input) return null;
  return CITY_MAP[input.trim().toLowerCase()] ?? null;
}

// ---- Prompt --------------------------------------------------------------
const SYSTEM_PROMPT = `너는 파치먼트(Parchment)의 따뜻한 큐레이션 어시스턴트야.
사용자가 가고 싶은 도시·분위기·카테고리를 말하면, 반드시 search_places 툴로 우리 DB에 있는 큐레이팅된 장소만 추천해.

[원칙]
- DB에 없는 장소는 절대 지어내지 마. 모르면 솔직히 "아직 그 지역 큐레이션이 부족해요"라고 말해.
- 도시명을 한국어/영어로 자유롭게 받되, search_places의 city 파라미터에는 영문 슬러그(Seoul, Busan, Daejeon, Daegu, Gyeongju, Jeju, Tokyo, Bali, Cairo)로 넘겨.
- 답변은 한국어, 따뜻하고 간결하게(2~3문장). 추천이 있으면 그 장소들의 분위기를 묶어 짧게 표현해.
- 카드는 자동으로 첨부되니 본문에 주소·메뉴를 길게 나열하지 마. 이름과 짧은 vibe만.
- 사용자가 카테고리를 명시하지 않았는데 결과가 비면 다른 카테고리도 한 번 시도해.
- 사용자가 광범위하게 물으면 list_curated_cities로 우리가 큐레이션한 도시를 먼저 보여주고 좁혀가.
- 사용자가 한 장소를 콕 집어 더 알고 싶어하면 get_place_details 사용.

[금지]
- 정치/혐오/위험 주제, 개인정보 요구는 부드럽게 거절: "공간 추천 외엔 도와드리기 어려워요. 어디로 가고 싶으세요?"
- 사용자가 욕설을 해도 침착하게 본 주제(공간 추천)로 돌려.
- DB 외 장소를 만들어내거나 평점/가격을 추측하지 마.

[도구 사용 가이드]
- 도시 + 카테고리가 있으면 한 번의 search_places로 충분.
- 도시만 있으면 카테고리 없이 search_places (limit=6).
- 결과가 0개면 같은 city로 카테고리만 바꿔 한 번 더 시도. 그래도 0이면 list_curated_cities로 안내 후 답변.`;

// ---- OpenAI tool schema --------------------------------------------------
const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'search_places',
      description:
        'Parchment DB에서 published된 장소 검색. 결과 없으면 빈 배열을 반환.',
      parameters: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            description:
              'English slug. one of: Seoul, Busan, Daejeon, Daegu, Gyeongju, Jeju, Tokyo, Bali, Cairo',
          },
          category: {
            type: 'string',
            enum: ['cafe', 'restaurant', 'culture', 'bar', 'stay'],
          },
          keywords: {
            type: 'array',
            items: { type: 'string' },
            description: '한국어 OK. 분위기·특징 키워드 (이름/vibe/메모에 부분 일치 필터)',
          },
          near_lat: { type: 'number' },
          near_lng: { type: 'number' },
          radius_km: { type: 'number', description: 'default: 5km (city 좌표만 있을 땐 30km)' },
          limit: { type: 'number', description: '1~10, default 6' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_curated_cities',
      description: 'DB에 published 장소가 있는 도시 목록과 각 도시 장소 수.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_place_details',
      description: '특정 장소 id의 상세 (메뉴/주소/모든 이미지). 사용자가 한 곳을 콕 집어 물을 때만.',
      parameters: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id'],
      },
    },
  },
];

// ---- Helpers -------------------------------------------------------------
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

function mergeUnique<T extends { id: string }>(existing: T[], incoming: T[]) {
  const seen = new Set(existing.map((p) => p.id));
  return [...existing, ...incoming.filter((p) => !seen.has(p.id))];
}

// ---- Tools impl ----------------------------------------------------------
async function searchPlaces(args: any) {
  let q = supabase.from('places').select('*').eq('status', 'published');

  let cityCenter: { lat: number; lng: number } | null = null;
  if (args.city) {
    const resolved = resolveCity(args.city);
    if (resolved) {
      q = q.ilike('city', `%${resolved.slug}%`);
      cityCenter = { lat: resolved.lat, lng: resolved.lng };
    } else {
      q = q.ilike('city', `%${args.city}%`);
    }
  }
  if (args.category) q = q.eq('category', args.category);

  const { data, error } = await q.limit(50);
  if (error) return { places: [], error: error.message };

  let places: any[] = data ?? [];

  const lat = typeof args.near_lat === 'number' ? args.near_lat : cityCenter?.lat;
  const lng = typeof args.near_lng === 'number' ? args.near_lng : cityCenter?.lng;
  if (typeof lat === 'number' && typeof lng === 'number') {
    const r = args.radius_km ?? (cityCenter ? 30 : 5);
    places = places
      .map((p) => ({ ...p, _dist: haversineKm(lat, lng, p.lat, p.lng) }))
      .filter((p) => p._dist <= r)
      .sort((a, b) => a._dist - b._dist);
  }

  if (Array.isArray(args.keywords) && args.keywords.length > 0) {
    const kw = args.keywords
      .filter((k: unknown): k is string => typeof k === 'string')
      .map((k) => k.toLowerCase());
    places = places.filter((p) => {
      const hay = `${p.name ?? ''} ${p.vibe ?? ''} ${p.curator_notes ?? ''} ${p.address ?? ''}`.toLowerCase();
      return kw.some((k) => hay.includes(k));
    });
  }

  const limit = Math.max(1, Math.min(args.limit ?? 6, 10));
  return {
    places: places.slice(0, limit).map(({ _dist: _omit, ...rest }) => rest),
    total: places.length,
  };
}

async function listCuratedCities() {
  const { data, error } = await supabase
    .from('places')
    .select('city')
    .eq('status', 'published');
  if (error) return { cities: [], error: error.message };
  const counts: Record<string, number> = {};
  for (const r of data ?? []) {
    counts[r.city] = (counts[r.city] ?? 0) + 1;
  }
  return {
    cities: Object.entries(counts)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count),
  };
}

async function getPlaceDetails(args: any) {
  if (!args?.id) return { place: null, error: 'id required' };
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('id', args.id)
    .maybeSingle();
  if (error) return { place: null, error: error.message };
  return { place: data };
}

async function runTool(tc: any) {
  const name = tc.function?.name;
  const args = (() => {
    try {
      return JSON.parse(tc.function?.arguments || '{}');
    } catch {
      return {};
    }
  })();
  switch (name) {
    case 'search_places':
      return await searchPlaces(args);
    case 'list_curated_cities':
      return await listCuratedCities();
    case 'get_place_details':
      return await getPlaceDetails(args);
    default:
      return { error: `unknown tool: ${name}` };
  }
}

// ---- OpenAI call ---------------------------------------------------------
async function callOpenAI(messages: any[], tools?: any) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), OPENAI_TIMEOUT_MS);
  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal: ctrl.signal,
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
        max_tokens: 800,
      }),
    });
    if (!r.ok) {
      const txt = await r.text();
      throw new Error(`OpenAI ${r.status}: ${txt.slice(0, 500)}`);
    }
    return await r.json();
  } finally {
    clearTimeout(t);
  }
}

// ---- HTTP handler --------------------------------------------------------
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method not allowed' }), {
      status: 405,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
  if (!OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'OPENAI_API_KEY not configured on Edge Function' }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } },
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const userLocation = body.userLocation;
    const raw = Array.isArray(body.messages) ? body.messages : [];

    const messages: Array<{ role: string; content: string }> = raw
      .filter(
        (m: any) =>
          m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string',
      )
      .map((m: any) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LEN) }))
      .slice(-MAX_HISTORY);

    if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
      return new Response(
        JSON.stringify({
          reply: '무엇을 도와드릴까요? 가고 싶은 도시나 분위기를 말씀해주세요.',
          places: [],
        }),
        { headers: { ...CORS, 'Content-Type': 'application/json' } },
      );
    }

    const sys =
      userLocation && typeof userLocation.lat === 'number' && typeof userLocation.lng === 'number'
        ? `${SYSTEM_PROMPT}\n\n[사용자 현재 좌표] lat=${userLocation.lat}, lng=${userLocation.lng}\n위치를 명시하지 않은 추천 요청에는 이 좌표 주변(near_lat/near_lng)으로 search_places를 호출해.`
        : SYSTEM_PROMPT;

    const convo: any[] = [{ role: 'system', content: sys }, ...messages];
    let collected: any[] = [];

    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const res = await callOpenAI(convo, TOOLS);
      const msg = res.choices?.[0]?.message;
      if (!msg) throw new Error('OpenAI: no message');
      convo.push(msg);

      if (!msg.tool_calls?.length) {
        return new Response(
          JSON.stringify({
            reply: msg.content ?? '',
            places: collected,
          }),
          { headers: { ...CORS, 'Content-Type': 'application/json' } },
        );
      }

      for (const tc of msg.tool_calls) {
        const result: any = await runTool(tc);
        if (tc.function?.name === 'search_places' && Array.isArray(result.places)) {
          collected = mergeUnique(collected, result.places);
        }
        if (tc.function?.name === 'get_place_details' && result.place) {
          collected = mergeUnique(collected, [result.place]);
        }
        convo.push({
          role: 'tool',
          tool_call_id: tc.id,
          content: JSON.stringify(result),
        });
      }
    }

    // 라운드 초과 — tool 없이 한 번 더 종합 답변
    const final = await callOpenAI(convo);
    return new Response(
      JSON.stringify({
        reply:
          final.choices?.[0]?.message?.content ??
          '잠시 헷갈렸어요. 다시 한 번 말씀해주세요.',
        places: collected,
      }),
      { headers: { ...CORS, 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
});
