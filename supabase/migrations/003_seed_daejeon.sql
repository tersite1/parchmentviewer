-- Seed: Daejeon curated places
-- Idempotent via ON CONFLICT (id).

insert into public.places (
  id, name, address, lat, lng, city, category, vibe,
  image_url, gallery_urls, source_post_url, status, curator_notes,
  published_at, menu_items
) values
(
  '11111111-1111-1111-1111-111111111101',
  '커피인터뷰',
  '대전 유성구 한밭대로371번길 25-3',
  36.3653, 127.3380, 'Daejeon', 'cafe',
  '하천뷰 테라스, 마을 같은 카페 컴플렉스. 봉명동 본점.',
  '/places/coffee-interview.webp',
  array['/places/coffee-interview.webp'],
  'https://www.diningcode.com/profile.php?rid=AIy8DlWXkf5P',
  'published',
  '주차 무료, 반려동물 동반, 11–22시.',
  now(),
  '[{"name":"아메리카노","price":"5,500원"},{"name":"카페라떼","price":"6,000원"}]'::jsonb
),
(
  '11111111-1111-1111-1111-111111111102',
  '청룡바베큐',
  '대전 유성구 어은동',
  36.3656, 127.3596, 'Daejeon', 'restaurant',
  '어은동 숯불구이. 캠핑 감성 야외 바베큐.',
  '/places/cheongryong-bbq.jpg',
  array['/places/cheongryong-bbq.jpg'],
  null,
  'published',
  'KAIST 인근. 그릴 옆에서 직접 굽는 스타일.',
  now(),
  '[{"name":"삼겹살","price":"18,000원"},{"name":"목살","price":"17,000원"}]'::jsonb
),
(
  '11111111-1111-1111-1111-111111111103',
  'CHOPPY',
  '대전',
  36.3504, 127.3845, 'Daejeon', 'restaurant',
  '"We have pizza, drink & love" — 캐주얼 피자 & 펍.',
  '/places/choppy-pizza.jpg',
  array['/places/choppy-pizza.jpg'],
  'https://www.facebook.com/people/CHOPPY-kr/100086361370764/',
  'published',
  '피자 + 음료 조합. 분위기 있는 저녁 자리.',
  now(),
  '[{"name":"마르게리타","price":"18,000원"},{"name":"페퍼로니","price":"20,000원"}]'::jsonb
)
on conflict (id) do update set
  name           = excluded.name,
  address        = excluded.address,
  lat            = excluded.lat,
  lng            = excluded.lng,
  city           = excluded.city,
  category       = excluded.category,
  vibe           = excluded.vibe,
  image_url      = excluded.image_url,
  gallery_urls   = excluded.gallery_urls,
  source_post_url= excluded.source_post_url,
  status         = excluded.status,
  curator_notes  = excluded.curator_notes,
  published_at   = excluded.published_at,
  menu_items     = excluded.menu_items;
