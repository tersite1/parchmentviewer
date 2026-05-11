-- Seed: Dahab / South Sinai curated places (10) — Perplexity 큐레이션 결과
-- city = 'Dahab'
-- 멱등 (id 고정 + ON CONFLICT DO UPDATE).

insert into public.places (
  id, name, address, lat, lng, city, category, vibe,
  image_url, gallery_urls, source_post_url, status, curator_notes, published_at
) values
(
  '77777777-7777-7777-7777-da4ab0000001',
  '샨티 가든 카페 (Shanti Garden Restaurant & Café)',
  'Asalah Square, Elteleel Street, Dahab, South Sinai',
  28.5112, 34.5181, 'Dahab', 'cafe',
  '베두인 정원에 앉는 느린 아침',
  'https://klap.life/lifestyle/shanti-garden-restaurant-cafe-dahab',
  array['https://klap.life/lifestyle/shanti-garden-restaurant-cafe-dahab'],
  'https://www.google.com/maps/search/?api=1&query=Shanti%20Garden%20Restaurant%20%26%20Cafe%2C%20Asalah%20Square%2C%20Elteleel%20Street%2C%20Dahab%2C%20Egypt',
  'published',
  E'아살라 광장 안쪽에 있어 라이트하우스 메인 라인보다 훨씬 생활권에 가깝고, 정원형 좌석 덕분에 골목의 느린 공기가 살아 있습니다. 붉은 산과 홍해 사이에서 차분하게 오래 머물기 좋은 카페라 Parchment 톤에 잘 맞습니다.\n안전: 밤에는 아살라 골목 조명이 고르지 않은 편이라 귀가가 늦으면 택시나 동행 이동이 더 무난합니다.\n영업: 매일 08:30-20:30',
  now()
),
(
  '77777777-7777-7777-7777-da4ab0000002',
  '에브리데이 카페 (EveryDay Cafe Original)',
  'El Masbat St, Peace Rd, Dahab, South Sinai',
  28.4966, 34.5161, 'Dahab', 'cafe',
  '골목 끝에서 바다로 이어지는 휴식',
  'https://blog.naver.com/taengsweethome/223165661806',
  array['https://blog.naver.com/taengsweethome/223165661806'],
  'https://www.google.com/maps/search/?api=1&query=EveryDay%20Cafe%20Original%2C%20El%20Masbat%20St%2C%20Peace%20Rd%2C%20Dahab%2C%20Egypt',
  'published',
  E'엘마스밧과 피스 로드가 만나는 생활 동선에 있어, 다이브숍 광고가 강한 정면 해변보다 한결 담백한 분위기로 머물 수 있습니다. 로컬 장기체류자와 여행자가 섞이는 카페 타입이라 과하게 소비되는 관광 스폿 느낌이 적습니다.\n안전: 해변길보다 안쪽 골목으로 들어갈 때는 밤늦게 혼자 걷기보다 큰 길 위주로 이동하는 편이 더 안전합니다.\n영업: 현장 확인 권장',
  now()
),
(
  '77777777-7777-7777-7777-da4ab0000003',
  '블루 하우스 레스토랑 (Blue House Restaurant & Cafe)',
  'El Fanar Street, Lighthouse, Dahab, South Sinai',
  28.4938, 34.5167, 'Dahab', 'restaurant',
  '집처럼 느슨한 홍해 식탁',
  'https://www.facebook.com/p/Blue-House-Restaurant-Cafe-100064169556404/',
  array['https://www.facebook.com/p/Blue-House-Restaurant-Cafe-100064169556404/'],
  'https://www.google.com/maps/search/?api=1&query=Blue%20House%20Restaurant%20%26%20Cafe%2C%20El%20Fanar%20Street%2C%20Dahab%2C%20Egypt',
  'published',
  E'메인 다이브숍 광고가 강한 정면 라인에서 살짝 벗어난 숙소 겸 식당 계열이라, 해변가의 과한 소음보다 한 박자 느린 체류감이 있습니다. 바다를 바로 앞에 두되 좌석과 식사가 집처럼 편안한 편이라 오래 앉기 좋습니다.\n안전: 바람이 강한 날은 야외 좌석보다 실내 좌석이 더 안정적입니다.\n영업: 현장 확인 권장',
  now()
),
(
  '77777777-7777-7777-7777-da4ab0000004',
  '베두인 문 레스토랑 (Bedouin Moon Restaurant)',
  'Blue Hole Road, Asala, Dahab, South Sinai',
  28.5183, 34.5209, 'Dahab', 'restaurant',
  '홍해 끝자락의 조용한 해산물 식사',
  'https://evendo.com/locations/egypt/dahab/restaurant/bedouin-moon-restaurant',
  array['https://evendo.com/locations/egypt/dahab/restaurant/bedouin-moon-restaurant'],
  'https://www.google.com/maps/search/?api=1&query=Bedouin%20Moon%20Restaurant%2C%20Blue%20Hole%20Road%2C%20Asala%2C%20Dahab%2C%20Egypt',
  'published',
  E'아살라 북쪽과 블루홀 가는 길 사이에 있어 중심 해변보다 밀도가 훨씬 낮고, 바다와 산이 바로 겹쳐 보이는 로케이션이 좋습니다. 다합 북단으로 빠지는 길목이라 한낮보다 이른 저녁의 공기가 특히 좋습니다.\n안전: 블루홀 방면 이동을 함께 묶는다면 햇빛이 세지 않은 오전 시간대 출발이 더 안전하고 편합니다.\n영업: 매일 24시간',
  now()
),
(
  '77777777-7777-7777-7777-da4ab0000005',
  '자누바 슬로우 쿠킹 (Zanooba Slow Cooking)',
  'Asalah, Dahab, South Sinai',
  28.5104, 34.5175, 'Dahab', 'restaurant',
  '느리게 익힌 집밥과 낮은 조도',
  'https://kr.trip.com/moments/detail/dahab-17361-15322870/',
  array['https://kr.trip.com/moments/detail/dahab-17361-15322870/'],
  'https://www.google.com/maps/search/?api=1&query=Zanooba%20Slow%20Cooking%2C%20Asalah%2C%20Dahab%2C%20Egypt',
  'published',
  E'다합 로컬 식당 목록에서 꾸준히 언급되는 아살라권 슬로우 쿠킹 식당으로, 화려한 외관보다 음식의 속도와 생활감이 앞서는 타입입니다. 아살라 골목 특유의 베두인 주거지 분위기와 잘 어울려 관광 동선 밖 식사 후보로 적합합니다.\n안전: 골목 진입이 좁은 편이라 밤에는 도보보다 자전거 속도를 낮추거나 택시 하차 후 짧게 걷는 편이 안전합니다.\n영업: 현장 확인 권장',
  now()
),
(
  '77777777-7777-7777-7777-da4ab0000006',
  '베두이나 카페 (Bedouina Cafe)',
  'Desert track toward White Canyon foothills, Dahab, South Sinai',
  28.5582, 34.4758, 'Dahab', 'culture',
  '쿠션 좌석 위로 쏟아지는 사막 별빛',
  'https://blog.naver.com/hanbyul665/223352093801',
  array['https://blog.naver.com/hanbyul665/223352093801'],
  'https://www.google.com/maps/search/?api=1&query=Bedouina%20Cafe%2C%20Dahab%20Desert%2C%20South%20Sinai%2C%20Egypt',
  'published',
  E'다합 외곽 사막 쪽에 있는 베두인식 별보기 카페 경험으로, 실내 문화시설보다 사막의 밤과 차, 모닥불, 낮은 바닥 좌석 자체가 핵심입니다. 페트라 나이트를 떠올리게 하는 촛불과 어둠의 분위기가 있어 Parchment의 문화 카테고리로 쓰기 좋습니다.\n안전: 시내에서 차로 15~20분가량 들어가는 경우가 많아 달이 너무 밝지 않은 날에 예약형 이동으로 가는 편이 더 안전합니다.\n영업: 일몰 후 운영, 예약·택시 동행 권장',
  now()
),
(
  '77777777-7777-7777-7777-da4ab0000007',
  '사우스 노스 티 가든 (South North - Tea Garden & Culture Cafe)',
  'Asalah, Dahab, South Sinai',
  28.5098, 34.5186, 'Dahab', 'bar',
  '차와 저녁 공기가 이어지는 정원',
  'https://kr.trip.com/moments/detail/dahab-17361-15322870/',
  array['https://kr.trip.com/moments/detail/dahab-17361-15322870/'],
  'https://www.google.com/maps/search/?api=1&query=South%20North%20Tea%20Garden%20and%20Culture%20Cafe%2C%20Asalah%2C%20Dahab%2C%20Egypt',
  'published',
  E'이름 그대로 차와 문화 카페 성격이 강하지만, 늦은 시간에는 조용히 머무는 저녁 공간으로 쓰기 좋아 다합식 로우키 바 후보로 적합합니다. 쿠션 좌석과 정원 무드가 살아 있어 음악이 큰 해변 바보다 훨씬 낮은 톤으로 밤을 보낼 수 있습니다.\n안전: 주류 중심 파티 공간은 아니라 귀가가 늦더라도 비교적 차분하지만, 아살라 쪽 골목 이동은 늦은 밤 택시 호출이 더 편합니다.\n영업: 현장 확인 권장',
  now()
),
(
  '77777777-7777-7777-7777-da4ab0000008',
  '더 베두인 문 (The Bedouin Moon)',
  'Blue Hole Road, Asala, Dahab, South Sinai 46617',
  28.5186, 34.5210, 'Dahab', 'stay',
  '홍해 절벽과 수영장, 북단 스테이',
  'https://thebedouinmoon.com',
  array['https://thebedouinmoon.com'],
  'https://www.google.com/maps/search/?api=1&query=The%20Bedouin%20Moon%2C%20Blue%20Hole%20Road%2C%20Asala%2C%20Dahab%2C%20Egypt',
  'published',
  E'아살라 북쪽 블루홀 로드에 있어 중심부보다 조용하고, 바다와 산이 바로 마주 보는 북단 체류감이 강합니다. 다이빙 베이스와 사막 이동을 함께 쓰기 좋은 위치라 오래 머무는 여행자와 잘 맞습니다.\n안전: 블루홀 쪽 이른 아침 출발이 잦다면 전날 밤 장비와 물을 미리 챙겨 두는 편이 안전합니다.\n체크인 14:00 / 체크아웃 12:00',
  now()
),
(
  '77777777-7777-7777-7777-da4ab0000009',
  '블루 하우스 인 라이트하우스 (Blue House in Lighthouse)',
  'El Fanar Street, Dahab, South Sinai 46617',
  28.4942, 34.5165, 'Dahab', 'stay',
  '작은 마당과 푸른 벽의 조용한 집',
  'https://www.booking.com/hotel/eg/blue-house-in-lighthouse.html',
  array['https://www.booking.com/hotel/eg/blue-house-in-lighthouse.html'],
  'https://www.google.com/maps/search/?api=1&query=Blue%20House%20in%20Lighthouse%2C%20El%20Fanar%20Street%2C%20Dahab%2C%20Egypt',
  'published',
  E'라이트하우스 권역이지만 메인 광고 라인보다는 주거 골목에 가까운 숙소라 소음이 덜합니다. 대형 리조트보다 집처럼 머무는 감각이 강해서 장기 체류자나 재택형 여행자에게 특히 잘 맞습니다.\n안전: 야간에는 해변보다 골목 조명이 약한 구간이 있어 귀가 동선은 미리 잡아두는 편이 좋습니다.\n체크인 14:00 / 체크아웃 12:00',
  now()
),
(
  '77777777-7777-7777-7777-da4ab000000a',
  '다합 월드 아살라 (DAHAB WORLD ASALA)',
  'Asala, Dahab, South Sinai',
  28.5109, 34.5187, 'Dahab', 'stay',
  '베두인 골목 안의 넓은 로컬 하우스',
  'https://www.booking.com/hotel/eg/dahab-world-asala.html',
  array['https://www.booking.com/hotel/eg/dahab-world-asala.html'],
  'https://www.google.com/maps/search/?api=1&query=DAHAB%20WORLD%20ASALA%2C%20Asala%2C%20Dahab%2C%20Egypt',
  'published',
  E'아살라 생활권 안에 있어 관광형 호텔보다 훨씬 일상적인 다합을 느끼기 좋고, 정원과 테라스가 있는 집형 숙소라 체류감이 좋습니다. 바닷가 메인 스트립에서 한 걸음 물러난 위치 덕분에 조용한 밤을 보내기 쉽습니다.\n안전: 아살라 골목은 차량 진입이 좁은 구간이 있어 큰 짐은 낮 시간에 체크인하는 편이 편합니다.\n체크인·체크아웃 예약처 확인 권장',
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
