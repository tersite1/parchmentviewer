-- Seed: Matsuyama / Ehime curated places (10) — Perplexity 큐레이션 결과
-- city = 'Matsuyama'
-- 멱등 (id 고정 + ON CONFLICT DO UPDATE).

insert into public.places (
  id, name, address, lat, lng, city, category, vibe,
  image_url, gallery_urls, source_post_url, status, curator_notes, published_at
) values
(
  '66666666-6666-6666-6666-bbbbbb000001',
  '미쓰 카페 (三津カフェ)',
  '愛媛県松山市三津1丁目10-8',
  33.8550, 132.7108, 'Matsuyama', 'cafe',
  '항구마을 창가의 느린 커피',
  'https://wanderlog.com/place/details/2625475/mitsu-cafe',
  array['https://wanderlog.com/place/details/2625475/mitsu-cafe'],
  'https://www.google.com/maps/search/?api=1&query=%E4%B8%89%E6%B4%A5%E3%82%AB%E3%83%95%E3%82%A7%20%E6%84%9B%E5%AA%9B%E7%9C%8C%E6%9D%BE%E5%B1%B1%E5%B8%82%E4%B8%89%E6%B4%A51%E4%B8%81%E7%9B%AE10-8',
  'published',
  E'미쓰 항구마을 쪽에 붙은 카페라 도고 중심 관광 동선과 결이 전혀 다릅니다. 오래된 항구 주택가의 공기와 바닷바람이 남아 있어, 세토우치보다 한층 생활감 있는 에히메 무드를 담기 좋습니다.\n영업: 방문 전 재확인 권장',
  now()
),
(
  '66666666-6666-6666-6666-bbbbbb000002',
  '모에기노 (もえぎの)',
  '愛媛県伊予郡砥部町岩谷口',
  33.7289, 132.7890, 'Matsuyama', 'cafe',
  '산기슭 흙내음이 남는 카페',
  'https://pbp.co.kr/magazine/10/17/01',
  array['https://pbp.co.kr/magazine/10/17/01'],
  'https://www.google.com/maps/search/?api=1&query=%E3%82%82%E3%81%88%E3%81%8E%E3%81%AE%20%E6%84%9B%E5%AA%9B%E7%9C%8C%E4%BC%8A%E4%BA%88%E9%83%A1%E7%A0%A5%E9%83%A8%E7%94%BA%E5%B2%A9%E8%B0%B7%E5%8F%A3',
  'published',
  E'도베초 계곡 산기슭 쪽에 자리한 카페로 알려져 있어, 마쓰야마 시내보다 훨씬 차분한 공기가 강합니다. 미캉 농가와 산자락 풍경을 함께 묶기 좋은 타입이라, 숨은 교외 후보로 넣기 좋습니다.\n영업: 방문 전 재확인 권장',
  now()
),
(
  '66666666-6666-6666-6666-bbbbbb000003',
  '더 파크 엠즈 커피 (the park M''s coffee)',
  '愛媛県松山市堀之内 愛媛県美術館内',
  33.8413, 132.7592, 'Matsuyama', 'cafe',
  '도심 공원 가장자리의 여백',
  'https://gurunavi.com/en/s430701/mp/rst/',
  array['https://gurunavi.com/en/s430701/mp/rst/'],
  'https://www.google.com/maps/search/?api=1&query=the%20park%20M%27s%20coffee%20%E6%84%9B%E5%AA%9B%E7%9C%8C%E6%9D%BE%E5%B1%B1%E5%B8%82%E5%A0%80%E4%B9%8B%E5%86%85',
  'published',
  E'성 천수각 코스가 아니라 미술관과 공원 가장자리 쪽에 붙어 있어 비교적 숨 고르기 좋습니다. 관광 체크리스트형 공간보다 현지인이 잠깐 쉬어가는 도시 카페 느낌이 강합니다.\n영업: 11:00-17:00',
  now()
),
(
  '66666666-6666-6666-6666-bbbbbb000004',
  '고토리 (ことり)',
  '愛媛県松山市湊町3丁目7-2',
  33.8366, 132.7648, 'Matsuyama', 'restaurant',
  '아침부터 몸을 데우는 우동집',
  'https://www.google.com/maps/search/?api=1&query=%E3%81%93%E3%81%A8%E3%82%8A%20%E6%9D%BE%E5%B1%B1',
  array['https://www.google.com/maps/search/?api=1&query=%E3%81%93%E3%81%A8%E3%82%8A%20%E6%9D%BE%E5%B1%B1'],
  'https://www.google.com/maps/search/?api=1&query=%E3%81%93%E3%81%A8%E3%82%8A%20%E6%84%9B%E5%AA%9B%E7%9C%8C%E6%9D%BE%E5%B1%B1%E5%B8%82%E6%B9%8A%E7%94%BA3%E4%B8%81%E7%9B%AE7-2',
  'published',
  E'도고의 유명 상점가보다 훨씬 생활권에 가까운 마쓰야마식 식당입니다. 화려한 연출 없이도 로컬 아침과 점심의 결을 보여줘, 관광객용 대기 맛집을 피하고 싶을 때 적합합니다.\n영업: 매일 10:00-14:00 내외, 조기 마감 가능',
  now()
),
(
  '66666666-6666-6666-6666-bbbbbb000005',
  '호즈미테이 (ほづみ亭)',
  '愛媛県宇和島市新町2丁目3-8',
  33.2239, 132.5607, 'Matsuyama', 'restaurant',
  '우와지마 로컬 해산물 저녁',
  'https://www.google.com/maps/search/?api=1&query=%E3%81%BB%E3%81%A5%E3%81%BF%E4%BA%AD%20%E5%AE%87%E5%92%8C%E5%B3%B6',
  array['https://www.google.com/maps/search/?api=1&query=%E3%81%BB%E3%81%A5%E3%81%BF%E4%BA%AD%20%E5%AE%87%E5%92%8C%E5%B3%B6'],
  'https://www.google.com/maps/search/?api=1&query=%E3%81%BB%E3%81%A5%E3%81%BF%E4%BA%AD%20%E6%84%9B%E5%AA%9B%E7%9C%8C%E5%AE%87%E5%92%8C%E5%B3%B6%E5%B8%82%E6%96%B0%E7%94%BA2%E4%B8%81%E7%9B%AE3-8',
  'published',
  E'우와지마 중심 관광 코스보다 한결 생활권에 가까운 향토 식당 계열로 보기에 좋습니다. 마쓰야마에서 조금 벗어나지만, 에히메 남부 식문화의 결을 넣을 수 있어 큐레이션 폭을 넓혀 줍니다.\n영업: 방문 전 재확인 권장',
  now()
),
(
  '66666666-6666-6666-6666-bbbbbb000006',
  '시모하가테이 (下芳我邸)',
  '愛媛県喜多郡内子町内子1952',
  33.5448, 132.6504, 'Matsuyama', 'restaurant',
  '옛 거리 안쪽의 느린 점심',
  'https://www.google.com/maps/search/?api=1&query=%E4%B8%8B%E8%8A%B3%E6%88%91%E9%82%B8%20%E5%86%85%E5%AD%90',
  array['https://www.google.com/maps/search/?api=1&query=%E4%B8%8B%E8%8A%B3%E6%88%91%E9%82%B8%20%E5%86%85%E5%AD%90'],
  'https://www.google.com/maps/search/?api=1&query=%E4%B8%8B%E8%8A%B3%E6%88%91%E9%82%B8%20%E6%84%9B%E5%AA%9B%E7%9C%8C%E5%96%9C%E5%A4%9A%E9%83%A1%E5%86%85%E5%AD%90%E7%94%BA%E5%86%85%E5%AD%901952',
  'published',
  E'우치코 옛거리 안에서도 메인 관광 동선의 소음을 한 걸음 비껴난 전통가옥 계열 공간입니다. 식사와 차를 함께 묶기 좋아, 흰 벽과 목랍 상가 풍경을 살리는 Parchment 무드에 잘 맞습니다.\n영업: 방문 전 재확인 권장',
  now()
),
(
  '66666666-6666-6666-6666-bbbbbb000007',
  '덴진산시 공방 (天神産紙工場)',
  '愛媛県喜多郡内子町寺村',
  33.5256, 132.6954, 'Matsuyama', 'culture',
  '와시 섬유 냄새가 남는 공방',
  'https://pbp.co.kr/magazine/10/17/01',
  array['https://pbp.co.kr/magazine/10/17/01'],
  'https://www.google.com/maps/search/?api=1&query=%E5%A4%A9%E7%A5%9E%E7%94%A3%E7%B4%99%E5%B7%A5%E5%A0%B4%20%E6%84%9B%E5%AA%9B%E7%9C%8C%E5%96%9C%E5%A4%9A%E9%83%A1%E5%86%85%E5%AD%90%E7%94%BA%E5%AF%BA%E6%9D%91',
  'published',
  E'우치코에 남은 오즈 와시 계열 공방 중 하나로 알려져 있어, 입장권형 전시 대신 생활 공예의 질감을 보여주기 좋습니다. 조용한 산기슭 마을과 연결해 보면 에히메의 손작업 분위기가 잘 살아납니다.\n영업: 방문 전 재확인 권장',
  now()
),
(
  '66666666-6666-6666-6666-bbbbbb000008',
  '오모리 와로소쿠야 (大森和蝋燭屋)',
  '愛媛県喜多郡内子町内子2214',
  33.5452, 132.6491, 'Matsuyama', 'culture',
  '초 냄새와 흰 벽이 남는 집',
  'https://pbp.co.kr/magazine/10/17/01',
  array['https://pbp.co.kr/magazine/10/17/01'],
  'https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E6%A3%AE%E5%92%8C%E8%9D%8B%E7%87%AD%E5%B1%8B%20%E6%84%9B%E5%AA%9B%E7%9C%8C%E5%96%9C%E5%A4%9A%E9%83%A1%E5%86%85%E5%AD%90%E7%94%BA%E5%86%85%E5%AD%902214',
  'published',
  E'우치코의 오래된 상가 풍경 속에서 전통 양초 문화를 지금도 이어가는 공간입니다. 번쩍이는 관광 시설보다 훨씬 낮은 톤으로, 흰 벽돌 창고와 옛 거리의 감도를 살리기 좋습니다.\n영업: 방문 전 재확인 권장',
  now()
),
(
  '66666666-6666-6666-6666-bbbbbb000009',
  '바 카이자르 (BAR CAEZAR)',
  '愛媛県松山市一番町2丁目1-3',
  33.8411, 132.7697, 'Matsuyama', 'bar',
  '조용한 밤을 길게 끄는 바',
  'https://www.google.com/maps/search/?api=1&query=BAR%20CAEZAR%20%E6%9D%BE%E5%B1%B1',
  array['https://www.google.com/maps/search/?api=1&query=BAR%20CAEZAR%20%E6%9D%BE%E5%B1%B1'],
  'https://www.google.com/maps/search/?api=1&query=BAR%20CAEZAR%20%E6%84%9B%E5%AA%9B%E7%9C%8C%E6%9D%BE%E5%B1%B1%E5%B8%82%E4%B8%80%E7%95%AA%E7%94%BA2%E4%B8%81%E7%9B%AE1-3',
  'published',
  E'오카이도 메인 보행축에서 조금 비껴난 골목권 바 후보로, 과한 관광형 술집보다 밀도가 낮은 밤 분위기를 기대할 수 있습니다. 마쓰야마의 차분한 저녁을 살리는 용도로 넣기 좋은 타입입니다.\n영업: 방문 전 재확인 권장',
  now()
),
(
  '66666666-6666-6666-6666-bbbbbb00000a',
  '도고 온센 료칸 도키와소 (旅館 常磐荘)',
  '愛媛県松山市道後湯月町4-2',
  33.8512, 132.7866, 'Matsuyama', 'stay',
  '동백 정원과 노송, 소형 료칸',
  'https://triple.guide/hotels/cb8280f2-c5db-4ca2-a010-93f53a746cfb',
  array['https://triple.guide/hotels/cb8280f2-c5db-4ca2-a010-93f53a746cfb'],
  'https://www.google.com/maps/search/?api=1&query=%E6%97%85%E9%A4%A8%20%E5%B8%B8%E7%A3%90%E8%8D%98%20%E6%84%9B%E5%AA%9B%E7%9C%8C%E6%9D%BE%E5%B1%B1%E5%B8%82%E9%81%93%E5%BE%8C%E6%B9%AF%E6%9C%88%E7%94%BA4-2',
  'published',
  E'도고온센 본관 정면 상점가가 아니라 뒷골목에 가까운 소형 료칸 계열이라, 숙박 자체의 밀도가 훨씬 차분합니다. 큰 호텔보다 오래된 온천마을의 밤 공기와 골목 소리를 담기 좋은 타입입니다.\n체크인/체크아웃 및 온천 이용시간은 예약처 확인 권장',
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
