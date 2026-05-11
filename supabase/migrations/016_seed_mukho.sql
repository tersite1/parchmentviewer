-- Seed: Mukho / Donghae curated places (10) — Perplexity 큐레이션 결과
-- city = 'Mukho' (강원 동해시 묵호항권)
-- 멱등 (id 고정 + ON CONFLICT DO UPDATE).

insert into public.places (
  id, name, address, lat, lng, city, category, vibe,
  image_url, gallery_urls, source_post_url, status, curator_notes, published_at
) values
(
  'dddddddd-dddd-dddd-dddd-bbcccc000001',
  '카페 조양관 (Cafe Joyanggwan)',
  '강원 동해시 발한동 (동해시립발한도서관 인근)',
  37.5510, 129.1110, 'Mukho', 'cafe',
  '발한동 적산가옥에 남은 1935년',
  'https://blog.naver.com/puha18/221653147067',
  array['https://blog.naver.com/puha18/221653147067'],
  'https://map.naver.com/p/search/%EC%A1%B0%EC%96%91%EA%B4%80%20%EC%B9%B4%ED%8E%98',
  'published',
  E'1935년에 지어진 구 조양관 적산가옥 건물을 복원해 2023년 말 새롭게 문을 연 발한동 안쪽의 조용한 카페입니다. 묵호항의 화려한 오션뷰 대형 카페들과 달리, 다다미방과 오래된 목조 구조가 남아 있어 묵호의 옛 시간으로 차분하게 침잠하기 좋은 곳입니다.\n영업: 매일 09:00-22:00 (주말 18:00 마감) / 월요일·법정공휴일 휴무',
  now()
),
(
  'dddddddd-dddd-dddd-dddd-bbcccc000002',
  '나포리 다방 (Napori Dabang)',
  '강원 동해시 묵호진동 논골1길 26',
  37.5540, 129.1165, 'Mukho', 'cafe',
  '논골담길 언덕 위 양철 지붕 골목',
  'https://morinael.tistory.com/94',
  array['https://morinael.tistory.com/94'],
  'https://map.naver.com/p/search/%EB%82%98%ED%8F%AC%EB%A6%AC%20%EB%8B%A4%EB%B0%A9',
  'published',
  E'도째비골 정문 코스의 대규모 관광객이 모이는 카페들을 지나 바람의 언덕 뒤편 골목에 작게 숨어있는 다방입니다. 레트로 감성의 소박한 인테리어 속에서 땀을 식히며 바다와 언덕 마을의 평화로움을 느낄 수 있습니다.\n영업: 유동적 (방문 전 확인 권장)',
  now()
),
(
  'dddddddd-dddd-dddd-dddd-bbcccc000003',
  '제리베리 (Jerry Berry)',
  '강원 동해시 발한동 발한로 219-6 1층',
  37.5535, 129.1120, 'Mukho', 'cafe',
  '발한동 구도심의 유럽 시골집',
  'https://blog.naver.com/ghdlgottkf/223081073249',
  array['https://blog.naver.com/ghdlgottkf/223081073249'],
  'https://map.naver.com/p/search/%EC%A0%9C%EB%A6%AC%EB%B2%A0%EB%A6%AC',
  'published',
  E'묵호 구도심 발한동 안쪽에 위치한 유럽풍 빈티지 감성의 작은 디저트 카페입니다. 바다 관광지에 온 것이 아니라 마치 조용한 동네 골목의 아지트에 들어온 듯한 아늑함을 선사합니다.\n영업: 매일 11:00-19:00 (정기 휴무 변동 가능)',
  now()
),
(
  'dddddddd-dddd-dddd-dddd-bbcccc000004',
  '동해바다곰치국 (Donghaebada Gomchiguk)',
  '강원 동해시 묵호진동 일출로 179',
  37.5560, 129.1170, 'Mukho', 'restaurant',
  '묵호항 새벽 어판장의 뜨거운 국물',
  'https://blog.naver.com/hwsongtwo/223542657914',
  array['https://blog.naver.com/hwsongtwo/223542657914'],
  'https://map.naver.com/p/search/%EB%8F%99%ED%95%B4%EB%B0%94%EB%8B%A4%EA%B3%B0%EC%B9%98%EA%B5%AD',
  'published',
  E'묵호항 회센터 인근 대형 식당가에서 살짝 벗어난, 이른 아침부터 뱃사람들과 현지인들의 속을 달래주는 노포입니다. 투박한 외관이지만 새벽 바다 공기를 맞은 뒤 먹는 시원하고 녹진한 곰치국의 맛은 묵호의 진짜 삶을 보여줍니다.\n영업: 매일 06:00-19:00 내외 (겨울철 새벽 동선 원활)',
  now()
),
(
  'dddddddd-dddd-dddd-dddd-bbcccc000005',
  '물곰식당 (Mulgomsikdang)',
  '강원 동해시 묵호진동 산재골길 3',
  37.5525, 129.1155, 'Mukho', 'restaurant',
  '항구 뒤편 골목의 소박한 해장',
  'https://plumpowl.tistory.com/entry/%EB%8F%99%ED%95%B4-%EB%AC%B5%ED%98%B8%ED%95%AD-%EA%B0%9C%EC%9A%B4%ED%95%98%EA%B3%A0-%EC%8B%9C',
  array['https://plumpowl.tistory.com/entry/%EB%8F%99%ED%95%B4-%EB%AC%B5%ED%98%B8%ED%95%AD-%EA%B0%9C%EC%9A%B4%ED%95%98%EA%B3%A0-%EC%8B%9C'],
  'https://map.naver.com/p/search/%EB%AC%BC%EA%B3%B0%EC%8B%9D%EB%8B%B9%20%EB%8F%99%ED%95%B4',
  'published',
  E'묵호항 수협 어판장에서 한 블록 뒤 산재골길에 자리 잡은 작고 오래된 식당입니다. 관광 식당의 번잡함을 피하고 싶을 때, 무심한 듯 썰어 넣은 김치와 곰치가 어우러진 깊은 맛으로 빈속을 채우기 좋습니다.\n영업: 매일 06:00-19:30 (첫째 화요일 휴무)',
  now()
),
(
  'dddddddd-dddd-dddd-dddd-bbcccc000006',
  '오뚜기칼국수 (Ottugi Kalguksu)',
  '강원 동해시 발한동 발한로 212-2',
  37.5530, 129.1125, 'Mukho', 'restaurant',
  '발한동 시장 골목의 장칼국수 노포',
  'https://blog.naver.com/hey_che/222801611549',
  array['https://blog.naver.com/hey_che/222801611549'],
  'https://map.naver.com/p/search/%EC%98%A4%EB%9A%9C%EA%B8%B0%EC%B9%BC%EA%B5%AD%EC%88%98',
  'published',
  E'동쪽바다 중앙시장 인근 구도심인 발한동 상가 골목에 위치한, 오랜 시간 동해 시민들의 한 끼를 책임져온 장칼국수 노포입니다. 항구의 활어회와는 또 다른, 구수한 장맛이 스며든 로컬들의 일상 식탁입니다.\n영업: 매일 07:00-18:00',
  now()
),
(
  'dddddddd-dddd-dddd-dddd-bbcccc000007',
  '여행책방 잔잔하게 (Janjanhagae)',
  '강원 동해시 발한동 발한로 215-2',
  37.5532, 129.1122, 'Mukho', 'culture',
  '묵호 구도심의 고요한 글방',
  'https://kangdbang.tistory.com/1133',
  array['https://kangdbang.tistory.com/1133'],
  'https://map.naver.com/p/search/%EC%97%AC%ED%96%89%EC%B1%85%EB%B0%A9%20%EC%9E%94%EC%9E%94%ED%95%98%EA%B2%8C',
  'published',
  E'발한동 골목길에 자리한 여행 작가 부부가 운영하는 작은 여행 전문 독립서점입니다. 화려한 바다 뷰 대신 조용하고 내밀하게 글귀를 고르며 마음속 파도를 잠재울 수 있는 공간입니다.\n영업: 매일 12:00-19:00 (매주 화요일 휴무)',
  now()
),
(
  'dddddddd-dddd-dddd-dddd-bbcccc000008',
  '논골담길 등대언덕 전망길 (Nongoldamgil Lighthouse Path)',
  '강원 동해시 묵호진동 논골1길 일원',
  37.5545, 129.1160, 'Mukho', 'culture',
  '덕장 마을 담벼락 사이 부는 해풍',
  'https://blog.naver.com/taejunim5/223307414153',
  array['https://blog.naver.com/taejunim5/223307414153'],
  'https://map.naver.com/p/search/%EB%85%BC%EA%B3%A8%EB%8B%B4%EA%B8%B8',
  'published',
  E'도째비골 스카이밸리 입장 코스와 연결된 대로를 버리고, 오징어 덕장이 있던 시절의 벽화가 그려진 논골 윗골목 미로를 걷는 코스입니다. 양철 지붕 위로 스치는 해풍과 묵호항의 전경이 삶의 터전으로 다가옵니다.\n영업: 24시간 개방 (주민 거주 구역, 야간 정숙 요망)',
  now()
),
(
  'dddddddd-dddd-dddd-dddd-bbcccc000009',
  '지미 앤 자코 (Jimi and Jaco)',
  '강원 동해시 천곡동 957-1 2층',
  37.5210, 129.1165, 'Mukho', 'bar',
  '천곡동의 어둡고 포근한 LP 음향',
  'https://blog.naver.com/tremb1ing/223329439773',
  array['https://blog.naver.com/tremb1ing/223329439773'],
  'https://map.naver.com/p/search/%EC%A7%80%EB%AF%B8%EC%95%A4%EC%9E%90%EC%BD%94',
  'published',
  E'천곡동 시내 뒷골목 2층에 숨겨진 감성 LP 펍으로, 동해 밤바다의 정막함을 아날로그 음악으로 채우기 좋은 곳입니다. 요란한 관광지 횟집의 소음에서 벗어나 위스키 한 잔과 음악에 온전히 침잠할 수 있습니다.\n영업: 매일 18:00-03:00 (격주 수요일 휴무)',
  now()
),
(
  'dddddddd-dddd-dddd-dddd-bbcccc00000a',
  '어달빛 스테이 & 게스트하우스 (Oudalbit Stay & Guesthouse)',
  '강원 동해시 어달동 일출로 243-7',
  37.5620, 129.1180, 'Mukho', 'stay',
  '어달항 갯바위 앞의 소박한 밤',
  'https://www.instagram.com/oudalbit_stay_2021s/',
  array['https://www.instagram.com/oudalbit_stay_2021s/'],
  'https://map.naver.com/p/search/%EC%96%B4%EB%8B%AC%EB%B9%9B%EC%8A%A4%ED%85%8C%EC%9D%B4',
  'published',
  E'묵호항 북쪽 어달해변 근처의 게스트하우스로, 번잡한 리조트촌을 지나 조용한 어촌 마을의 밤을 지새우기 좋습니다. 아침이면 창문 너머 어달항의 잔잔한 방파제와 일출을 방해 없이 마주할 수 있습니다.\n체크인 15:00 / 체크아웃 11:00',
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
