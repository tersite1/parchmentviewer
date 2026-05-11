-- Seed: Nha Trang curated places (10) — Perplexity 큐레이션 결과
-- city = 'Nhatrang'
-- 멱등 (id 고정 + ON CONFLICT DO UPDATE).

insert into public.places (
  id, name, address, lat, lng, city, category, vibe,
  image_url, gallery_urls, source_post_url, status, curator_notes, published_at
) values
(
  'bbbbbbbb-bbbb-bbbb-bbbb-aceaaa000001',
  '안 카페 (An Café)',
  'Phường Tân Lập, Nha Trang, Khánh Hòa',
  12.2403, 109.1913, 'Nhatrang', 'cafe',
  '나뭇결과 잎사귀가 가득한 정원',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
  array['https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800'],
  'https://www.google.com/maps/search/?api=1&query=12.2403,109.1913',
  'published',
  E'바익당 거리 근처에 자리한 목조 중심의 아늑한 로컬 정원 카페입니다. 쩐푸 해변의 서구화된 카페들과 달리 옛 냐짱의 다정하고 고즈넉한 쉼을 느낄 수 있습니다.\n영업: 매일 07:00-22:00',
  now()
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-aceaaa000002',
  '카페 헴 (Cafe Hẻm)',
  'Phường Phương Sài, Nha Trang, Khánh Hòa',
  12.2505, 109.1862, 'Nhatrang', 'cafe',
  '골목 안쪽의 느린 베트남 커피',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
  array['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
  'https://www.google.com/maps/search/?api=1&query=12.2505,109.1862',
  'published',
  E'관광객의 발길이 닿지 않는 응오시리엔 골목 안쪽에 숨어있는 로컬 카페입니다. 플라스틱 의자와 낡은 벽면이 베트남 소도시 특유의 느슨하고 일상적인 분위기를 자아냅니다.\n영업: 매일 06:30-22:00',
  now()
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-aceaaa000003',
  '띠엠 까페 꼬 (Tiệm Cà Phê Cổ)',
  'Phường Vĩnh Phước, Nha Trang, Khánh Hòa',
  12.2711, 109.1983, 'Nhatrang', 'cafe',
  '혼쫑 바위 뒤편의 낡은 공간',
  'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800',
  array['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800'],
  'https://www.google.com/maps/search/?api=1&query=12.2711,109.1983',
  'published',
  E'혼쫑 관광지에서 북쪽으로 조금만 걸어 들어가면 나오는 빈티지 감성의 작은 카페입니다. 옛 베트남의 낡은 빌라 느낌을 살려내어 조용하게 책을 읽거나 쉬어가기 제격입니다.\n영업: 매일 07:00-22:00',
  now()
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-aceaaa000004',
  '반세오 짜오 응오시리엔 (Bánh xèo chảo Ngô Sĩ Liên)',
  'Phường Phương Sài, Nha Trang, Khánh Hòa',
  12.2501, 109.1865, 'Nhatrang', 'restaurant',
  '응오시리엔 골목의 로컬 반세오',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
  array['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800'],
  'https://www.google.com/maps/search/?api=1&query=12.2501,109.1865',
  'published',
  E'화려한 해산물 뷔페를 벗어나 베트남 사람들의 퇴근길을 책임지는 골목 반세오 식당입니다. 오래된 팬에서 바삭하게 구워내는 반세오의 소리와 고소한 냄새가 매력적입니다.\n영업: 매일 15:00-21:00',
  now()
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-aceaaa000005',
  '하이산 보 케 쏨봉 (Quán Hải Sản Bờ Kè Xóm Bóng)',
  'Phường Vĩnh Thọ, Nha Trang, Khánh Hòa',
  12.2642, 109.1953, 'Nhatrang', 'restaurant',
  '어시장 골목 끝의 해산물 그릴',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
  array['https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'],
  'https://www.google.com/maps/search/?api=1&query=12.2642,109.1953',
  'published',
  E'쏨봉교 아래 어시장 골목에 위치한 투박한 해산물 식당입니다. 패키지 단체 식당과 달리 낚시 배가 오가는 어촌의 활기와 신선한 숯불구이를 즐길 수 있습니다.\n영업: 매일 16:00-23:00',
  now()
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-aceaaa000006',
  '꽌 랑 비엔 (Quán Làng Biển)',
  'Xã Cam Hải Đông, Cam Lâm, Khánh Hòa',
  12.0620, 109.2130, 'Nhatrang', 'restaurant',
  '캄란 북부 부두의 투박한 시푸드',
  'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800',
  array['https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800'],
  'https://www.google.com/maps/search/?api=1&query=12.0620,109.2130',
  'published',
  E'나트랑 시내에서 캄란으로 내려가는 북단에 위치한 한적한 농가식 수상 식당입니다. 조용한 바다를 바라보며 로컬 방식으로 조리된 가리비와 새우를 맛볼 수 있습니다.\n영업: 매일 10:00-22:00',
  now()
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-aceaaa000007',
  '알렉상드르 예르생 박물관 (Bảo tàng A. Yersin)',
  'Phường Xương Huân, Nha Trang, Khánh Hòa',
  12.2530, 109.1950, 'Nhatrang', 'culture',
  '파스퇴르 연구소 내의 고요한 시간',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
  array['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800'],
  'https://www.google.com/maps/search/?api=1&query=12.2530,109.1950',
  'published',
  E'낡은 프랑스식 건축물인 파스퇴르 연구소 안에 숨겨진 작고 고요한 박물관입니다. 단체 관광객이 거의 없어 조용하게 과거의 나트랑과 유럽의 흔적을 살펴볼 수 있습니다.\n영업: 월-금 08:00-11:30, 14:00-16:30 (주말 휴무)',
  now()
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-aceaaa000008',
  '하이브리드 나트랑 (Hybrid Nha Trang)',
  'Phường Lộc Thọ, Nha Trang, Khánh Hòa',
  12.2355, 109.1963, 'Nhatrang', 'bar',
  '좁은 골목 안쪽의 스피크이지',
  'https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?auto=format&fit=crop&q=80&w=800',
  array['https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?auto=format&fit=crop&q=80&w=800'],
  'https://www.google.com/maps/search/?api=1&query=12.2355,109.1963',
  'published',
  E'쩐푸 해변의 시끄러운 라이브 클럽을 피해 조용히 대화하기 좋은 골목 안 숨은 바입니다. 세련된 베트남 전통 재료를 활용한 창작 칵테일을 차분한 분위기 속에서 즐길 수 있습니다.\n영업: 매일 18:00-01:00',
  now()
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-aceaaa000009',
  '썸 데이즈 오브 사일런스 리조트 (Some Days Of Silence Resort and Spa)',
  'Phường Ninh Hải, Ninh Hòa, Khánh Hòa',
  12.5630, 109.2312, 'Nhatrang', 'stay',
  '독렛 비치 북쪽의 완전한 정적',
  'https://images.unsplash.com/photo-1582719478250-c894e4dc240e?auto=format&fit=crop&q=80&w=800',
  array['https://images.unsplash.com/photo-1582719478250-c894e4dc240e?auto=format&fit=crop&q=80&w=800'],
  'https://www.google.com/maps/search/?api=1&query=12.5630,109.2312',
  'published',
  E'이름 그대로 철저한 침묵과 평화를 지향하는 독렛 해변 북쪽 한적한 구간의 은신처입니다. 거대한 수영장이나 리조트 시설 대신 야자수와 낡은 빌라 감성이 섞인 진정한 로컬 휴양지입니다.\n체크인 14:00 / 체크아웃 12:00',
  now()
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-aceaaa00000a',
  '씨카사 호스텔 (Ccasa Hostel)',
  'Phường Vĩnh Hải, Nha Trang, Khánh Hòa',
  12.2708, 109.2001, 'Nhatrang', 'stay',
  '혼쫑 마을의 비주류 게스트하우스',
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800',
  array['https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800'],
  'https://www.google.com/maps/search/?api=1&query=12.2708,109.2001',
  'published',
  E'혼쫑 바위 뒤편 생활권에 자리 잡은 개방형 업사이클링 게스트하우스입니다. 녹지와 폐컨테이너가 어우러져 있으며, 다이빙이나 로컬 여행을 준비하는 여행객들의 차분한 베이스캠프입니다.\n체크인 14:00 / 체크아웃 12:00',
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
