-- Seed: Takamatsu / Kagawa curated places (10) — Perplexity 큐레이션 결과
-- city = 'Takamatsu'
-- 멱등 (id 고정 + ON CONFLICT DO UPDATE).

insert into public.places (
  id, name, address, lat, lng, city, category, vibe,
  image_url, gallery_urls, source_post_url, status, curator_notes, published_at
) values
(
  '55555555-5555-5555-5555-aaaaaa000001',
  '우미에 (Umie)',
  'Kitahamacho 3-2, Takamatsu, Kagawa',
  34.3518, 134.0577, 'Takamatsu', 'cafe',
  '항구 창고에 스민 오후 빛',
  'http://www.umie.info',
  array['http://www.umie.info'],
  'https://www.google.com/maps/search/?api=1&query=Umie%2C%203-2%20Kitahamacho%2C%20Takamatsu%2C%20Kagawa',
  'published',
  E'다카마쓰 항 동쪽 키타하마 창고지구 안에 있어, 세토내해 햇빛과 오래된 산업 건물의 질감이 같이 남는 카페입니다. 줄 서는 명소형 카페보다 천천히 앉아 바다를 보는 손님이 많아 Parchment 톤과 잘 맞습니다.\n영업: 월·화·목·금 11:00-19:00 / 토 11:00-21:00 / 일 11:00-19:00 / 수 휴무',
  now()
),
(
  '55555555-5555-5555-5555-aaaaaa000002',
  '오기지마 유쿠루 (ogijima Yukulu)',
  'Ogijima 194-1, Ogicho, Takamatsu, Kagawa',
  34.4086, 134.0957, 'Takamatsu', 'cafe',
  '섬 골목 끝 주말 식탁',
  'https://ogijima-yukulu.com',
  array['https://ogijima-yukulu.com'],
  'https://www.google.com/maps/search/?api=1&query=ogijima%20Yukulu%2C%20194-1%20Ogicho%2C%20Takamatsu%2C%20Kagawa',
  'published',
  E'오기지마 마을 안쪽의 작은 주말 카페라, 페리에서 내려 바로 보이는 상업 동선보다 한 박자 더 느린 섬의 생활 리듬을 느끼기 좋습니다. 운영일이 제한적이라 오히려 로컬 마을집을 잠깐 빌려 쓰는 듯한 분위기가 남습니다.\n영업: 토·일 11:00-16:30',
  now()
),
(
  '55555555-5555-5555-5555-aaaaaa000003',
  '테시마노마도 (Teshima no Mado)',
  'Teshima, 2458-2 Teshimaieura, Tonosho, Kagawa',
  34.4878, 134.0897, 'Takamatsu', 'cafe',
  '낡은 섬집 창가의 커피',
  'http://www.teshimanomado.com',
  array['http://www.teshimanomado.com'],
  'https://www.google.com/maps/search/?api=1&query=Teshima%20no%20Mado%2C%202458-2%20Teshimaieura%2C%20Tonosho%2C%20Kagawa',
  'published',
  E'이에우라 마을 안쪽에 붙은 소형 카페라 테시마의 메인 미술 동선보다 마을 생활 쪽에 더 가깝습니다. 화려한 전시시설 대신 창가, 작은 디저트, 섬 골목 풍경으로 기억되는 타입이라 숨은 후보로 적합합니다.\n영업: 월·수-일 10:30-17:00 / 화 휴무',
  now()
),
(
  '55555555-5555-5555-5555-aaaaaa000004',
  '우미노 레스토랑 (Umi no Restaurant)',
  'Teshima, 525-1 Teshimaieura, Tonosho, Kagawa',
  34.4851, 134.0864, 'Takamatsu', 'restaurant',
  '테시마 항 뒤편의 조용한 식사',
  'https://il-grano.jp/umi/',
  array['https://il-grano.jp/umi/'],
  'https://www.google.com/maps/search/?api=1&query=Umi%20no%20Restaurant%2C%20525-1%20Teshimaieura%2C%20Tonosho%2C%20Kagawa',
  'published',
  E'이에우라 항권에 있지만 대형 미술관 부속 식당이 아니라 마을 속 독립 레스토랑이라 체류감이 다릅니다. 섬 저녁까지 여는 드문 곳이라 오후의 빛이 빠진 뒤에도 한적한 세토내해 분위기를 이어가기 좋습니다.\n영업: 월 11:00-14:30 / 목 18:00-20:00 / 금-일 11:00-14:30, 18:00-20:00 / 화·수 휴무',
  now()
),
(
  '55555555-5555-5555-5555-aaaaaa000005',
  '마고코로 (Hemp Heart)',
  '621-9 Kotohira, Nakatado District, Kagawa',
  34.1895, 133.8192, 'Takamatsu', 'restaurant',
  '콘피라 자락의 담백한 채식 식당',
  'https://www.instagram.com/magokoro_kotohira/',
  array['https://www.instagram.com/magokoro_kotohira/'],
  'https://www.google.com/maps/search/?api=1&query=Hemp%20Heart%2C%20621-9%20Kotohira%2C%20Nakatado%20District%2C%20Kagawa',
  'published',
  E'금비라산 참배 메인 동선보다 한 블록 물러난 자리라 사람을 피하고 쉬어가기 좋습니다. 카레와 차, 나무 가구의 결이 강해 관광 상점가보다 마을 다실 같은 온도로 머물 수 있습니다.\n영업: 월·화·수·금·토·일 12:00-20:00 / 목 휴무',
  now()
),
(
  '55555555-5555-5555-5555-aaaaaa000006',
  '사누키 멘노스케 (Sanuki Mennosuke)',
  '1-7-3 Kawaramachi, Takamatsu, Kagawa',
  34.3394, 134.0498, 'Takamatsu', 'restaurant',
  '이른 아침 현지 우동 한 그릇',
  'https://x.com/sanukimennosuke',
  array['https://x.com/sanukimennosuke'],
  'https://www.google.com/maps/search/?api=1&query=Sanuki%20Mennosuke%2C%201-7-3%20Kawaramachi%2C%20Takamatsu%2C%20Kagawa',
  'published',
  E'관광객이 길게 줄 서는 유명 셀프 우동집보다, 가와라마치 생활권에서 빠르게 한 끼 해결하는 로컬 식당 쪽에 가깝습니다. 새벽 5시는 아니지만 아침 7시부터 열어 숙소를 나와 바로 들르기 좋은 도시형 우동 후보입니다.\n영업: 매일 07:00-24:00',
  now()
),
(
  '55555555-5555-5555-5555-aaaaaa000007',
  '더 티룸 고토히라 (The TeaRoom KOTOHIRA)',
  '279-4 Kotohira, Nakatado District, Kagawa',
  34.1889, 133.8212, 'Takamatsu', 'culture',
  '참배길 바깥의 작은 다실',
  'https://www.instagram.com/the_tea_room_kotohira/profilecard/',
  array['https://www.instagram.com/the_tea_room_kotohira/profilecard/'],
  'https://www.google.com/maps/search/?api=1&query=The%20TeaRoom%20KOTOHIRA%2C%20279-4%20Kotohira%2C%20Nakatado%20District%2C%20Kagawa',
  'published',
  E'콘피라산 자락에서 차와 작은 디저트를 중심으로 머무는 공간이라, 소비형 관광보다 체험형 문화 정거장에 가깝습니다. 계단길 주변의 붐비는 점포보다 조용히 쉬어가는 비메인 다실을 찾을 때 특히 좋습니다.\n영업: 월·목·금·토·일 12:00-18:00 / 화·수 휴무',
  now()
),
(
  '55555555-5555-5555-5555-aaaaaa000008',
  '코토매스 오기지마 (KOTOMATH OGIJIMA)',
  'Ogijima 1887, Ogicho, Takamatsu, Kagawa',
  34.4100, 134.0950, 'Takamatsu', 'culture',
  '섬 예술이 스민 작은 방',
  'https://www.instagram.com/kotomath_ogijima/',
  array['https://www.instagram.com/kotomath_ogijima/'],
  'https://www.google.com/maps/search/?api=1&query=KOTOMATH%20OGIJIMA%2C%201887%20Ogicho%2C%20Takamatsu%2C%20Kagawa',
  'published',
  E'오기지마 마을집 스케일 안에서 움직이는 아트 카페 성격의 공간이라, 거대한 입장권형 미술시설과 전혀 다른 호흡을 가집니다. 폐가와 골목, 바다빛이 섞이는 오기지마 특유의 생활 예술 감각을 가장 작게 체감하기 좋은 후보입니다.\n영업: 운영시간 변동 가능, 방문 전 현장 채널 확인 권장',
  now()
),
(
  '55555555-5555-5555-5555-aaaaaa000009',
  '바 타이 (BAR TIE)',
  '8-28 Furubabacho, Takamatsu, Kagawa',
  34.3400, 134.0477, 'Takamatsu', 'bar',
  '가와라마치 뒤편의 단정한 한 잔',
  'https://bartie.jp',
  array['https://bartie.jp'],
  'https://www.google.com/maps/search/?api=1&query=BAR%20TIE%2C%208-28%20Furubabacho%2C%20Takamatsu%2C%20Kagawa',
  'published',
  E'화려한 대형 이자카야 거리보다 한층 차분한 칵테일 바로, 혼자 들어가도 흐름이 자연스럽습니다. 과한 파티감보다 저녁의 여백을 길게 가져가는 스타일이라 Parchment의 밤 카테고리에 맞습니다.\n영업: 월-목 16:30-01:00 / 금-토 16:30-02:00 / 일 16:30-24:00',
  now()
),
(
  '55555555-5555-5555-5555-aaaaaa00000a',
  '메기지마 게스트하우스 앤 카페 (Megijima Guesthouse & Cafe)',
  'Megijima 4531-2, Takamatsu, Kagawa',
  34.3954, 134.0673, 'Takamatsu', 'stay',
  '메기지마 포구 곁 하룻밤',
  'http://megijima-megino.com',
  array['http://megijima-megino.com'],
  'https://www.google.com/maps/search/?api=1&query=Megijima%20Guesthouse%20%26%20Cafe%2C%204531-2%20Megijima%2C%20Takamatsu%2C%20Kagawa',
  'published',
  E'메기지마의 작은 포구 생활권 안에 붙은 숙소라, 섬이 조용해지는 저녁부터 공간의 매력이 더 살아납니다. 숙박과 카페가 함께 있어 페리 시간에 쫓기지 않고 세토내해의 낮은 소음과 오래된 마을 공기를 끝까지 가져갈 수 있습니다.\n체크인·체크아웃은 예약처 확인 권장',
  now()
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
  published_at   = excluded.published_at;
