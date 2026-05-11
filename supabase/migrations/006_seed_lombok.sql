-- Seed: Lombok & Gili Islands curated places (10) — Perplexity 큐레이션 결과
-- city = 'Lombok' (길리 3섬 포함, 행정상 모두 Lombok Utara)
-- 멱등 (id 고정 + ON CONFLICT DO UPDATE).

insert into public.places (
  id, name, address, lat, lng, city, category, vibe,
  image_url, gallery_urls, source_post_url, status, curator_notes, published_at
) values
(
  '33333333-3333-3333-3333-10bc00000001',
  '뉴 사삭 카페 (New Sasak Cafe)',
  'Gili Meno, Gili Indah, Pemenang, Lombok Utara',
  -8.3505, 116.0578, 'Lombok', 'cafe',
  '메노 해변의 느린 아침',
  'http://sasakisland.com',
  array['http://sasakisland.com'],
  'https://www.google.com/maps/search/?api=1&query=New%20Sasak%20Cafe%2C%20Gili%20Meno%2C%20Lombok',
  'published',
  E'길리 메노 해변 쪽의 작은 카페라 트라왕안 메인 스트립과 결이 다르고, 야외 좌석에서 섬의 느린 호흡이 그대로 느껴집니다. 해산물과 인도네시아식 메뉴 비중이 높아 관광형 브런치 카페보다 한층 로컬한 체류감이 있습니다.\n영업: 매일 08:00-23:00',
  now()
),
(
  '33333333-3333-3333-3333-10bc00000002',
  '키라키라 올 데이 리스닝 카페 (KIRAKIRA ALL DAY LISTENING CAFE)',
  'Jl. Ikan Hiu, Gili Trawangan, Pemenang, Lombok Utara',
  -8.3438, 116.0388, 'Lombok', 'cafe',
  '음악이 낮게 흐르는 쉼터',
  'https://www.instagram.com/kirakira_gili',
  array['https://www.instagram.com/kirakira_gili'],
  'https://www.google.com/maps/search/?api=1&query=KIRAKIRA%20ALL%20DAY%20LISTENING%20CAFE%2C%20Gili%20Trawangan%2C%20Lombok',
  'published',
  E'카페 카드 기준으로 조용하고 아늑한 분위기가 강하게 드러나서, 클럽 밀집 메인 스트립보다 한 템포 느린 동선에 놓기 좋습니다. 이름 그대로 리스닝 카페 성격이 살아 있어 자전거로 천천히 돌아다니는 길리 무드와 잘 맞습니다.\n영업: 월-토 07:00-22:00 / 일 09:00-22:00',
  now()
),
(
  '33333333-3333-3333-3333-10bc00000003',
  '프렌들리 와룽 (Friendly Warung)',
  'Jl. Pariwisata No.84, Senaru, Bayan, Lombok Utara',
  -8.3067, 116.4069, 'Lombok', 'restaurant',
  '폭포 마을 입구의 소박한 식탁',
  'http://www.faisalrinjanitrekking.com',
  array['http://www.faisalrinjanitrekking.com'],
  'https://www.google.com/maps/search/?api=1&query=Friendly%20Warung%2C%20Senaru%2C%20Lombok',
  'published',
  E'세나루 폭포 동선 근처이지만 리뷰 수가 많지 않고, 조용하고 아늑한 분위기의 소형 와룽으로 확인됩니다. 관광 버스형 식당보다 린자니 자락 마을의 생활감이 남아 있는 식당이라 Parchment 톤에 더 가깝습니다.\n영업: 매일 08:00-22:00',
  now()
),
(
  '33333333-3333-3333-3333-10bc00000004',
  '와룽 이부 데데 (Warung Ibu Dede)',
  'Jalan Raya, Karang Bajo, Bayan, Lombok Utara',
  -8.2721, 116.4125, 'Lombok', 'restaurant',
  '바얀 마을의 집밥 한 끼',
  'http://jetsbudaya.blogspot.com',
  array['http://jetsbudaya.blogspot.com'],
  'https://www.google.com/maps/search/?api=1&query=Warung%20Ibu%20Dede%2C%20Karang%20Bajo%2C%20Bayan%2C%20Lombok',
  'published',
  E'리뷰 수가 적고 현금 결제 중심의 조용한 와룽이라 여행자용 상업 공간보다 마을 식당에 가깝습니다. 바얀 문화권과 붙어 있어 문화 공간 방문 전후에 자연스럽게 이어 붙이기 좋습니다.\n영업: 매일 07:00-20:00',
  now()
),
(
  '33333333-3333-3333-3333-10bc00000005',
  '샤카 레스토랑 (Shaka Restaurant - Kuta Lombok)',
  'Jl. Pariwisata Pantai Kuta, Kuta, Pujut, Lombok Tengah',
  -8.8895, 116.2814, 'Lombok', 'restaurant',
  '남롬복의 담백한 올데이 다이닝',
  'https://shaka-fuel.com',
  array['https://shaka-fuel.com'],
  'https://www.google.com/maps/search/?api=1&query=Shaka%20Restaurant%20Kuta%20Lombok',
  'published',
  E'조용하고 아늑한 분위기, 건강식 중심 메뉴, 야외 좌석 조합이 확인되어 남부 해변 마을 베이스캠프용 식당으로 무난합니다. 쿠타 중심권 안에 있지만 대형 파티 바 성격보다 서퍼·장기체류자 식당 쪽에 가깝습니다.\n영업: 매일 07:30-20:30',
  now()
),
(
  '33333333-3333-3333-3333-10bc00000006',
  '부다야 카키 린자니 & 린자니 비지터 (Budaya Kaki Rinjani & Rinjani Visitor)',
  'Karang Bajo, Bayan, Lombok Utara',
  -8.2715, 116.4090, 'Lombok', 'culture',
  '린자니 자락의 생활문화 거점',
  'http://www.rinjanivisitor.com',
  array['http://www.rinjanivisitor.com'],
  'https://www.google.com/maps/search/?api=1&query=Budaya%20Kaki%20Rinjani%20%26%20Rinjani%20Visitor%2C%20Karang%20Bajo%2C%20Bayan%2C%20Lombok',
  'published',
  E'문화센터이면서 홈스테이와 관광안내 기능을 함께 가진 공간으로 확인돼, 전시형 명소보다 생활문화 접점에 가깝습니다. 바얀 권역의 사삭 문화와 린자니 북사면 동선을 같이 묶기 좋은 로컬 허브입니다.\n영업: 매일 09:00-17:00',
  now()
),
(
  '33333333-3333-3333-3333-10bc00000007',
  '뜨뜨바뚜 관광마을 (Tetebatu Tourist Village)',
  'Raya Tetebatu, Tetebatu, Sikur, Lombok Timur',
  -8.5320, 116.4215, 'Lombok', 'culture',
  '논과 숲이 이어지는 마을 풍경',
  'https://guslombokdriver.com/tetebatu-on-lombok/',
  array['https://guslombokdriver.com/tetebatu-on-lombok/'],
  'https://www.google.com/maps/search/?api=1&query=Tetebatu%20Tourist%20Village%2C%20Tetebatu%2C%20Lombok',
  'published',
  E'뜨뜨바뚜는 린자니 남사면의 조용한 마을로, 라이스테라스와 폭포, 일상적인 마을 풍경이 함께 남아 있는 곳으로 소개됩니다. 과한 관광 연출보다 걷는 속도로 체감하는 풍경이 강해서 Parchment의 문화 카테고리에 넣기 좋습니다.\n영업: 매일 08:00-17:00',
  now()
),
(
  '33333333-3333-3333-3333-10bc00000008',
  '팁시 고트 바 앤 카페 (The Tipsy Goat Bar and Cafe)',
  'Jl. Pantai Gili Trawangan, Gili Trawangan, Pemenang, Lombok Utara',
  -8.3440, 116.0328, 'Lombok', 'bar',
  '과하지 않은 섬 저녁 한 잔',
  'http://www.lutwaladive.com',
  array['http://www.lutwaladive.com'],
  'https://www.google.com/maps/search/?api=1&query=The%20Tipsy%20Goat%20Bar%20and%20Cafe%2C%20Gili%20Trawangan%2C%20Lombok',
  'published',
  E'카드 정보상 훌륭한 칵테일과 아늑한 분위기가 강조돼, 빈탕 광고 위주의 비치바보다 차분한 선택지에 가깝습니다. 늦은 밤 클럽 동선보다 해 질 무렵 한 잔 마시고 돌아가기 좋은 소형 바로 보는 편이 맞습니다.\n영업: 매일 08:00-21:00',
  now()
),
(
  '33333333-3333-3333-3333-10bc00000009',
  '바스크 길리 메노 (BASK Gili Meno)',
  'Gili Meno, Pemenang, Lombok Utara',
  -8.3500, 116.0565, 'Lombok', 'stay',
  '메노 섬 해변의 저밀도 스테이',
  'https://au.trip.com/hotels/pemenang-hotel-detail-114218850/bask-gili-meno/',
  array['https://au.trip.com/hotels/pemenang-hotel-detail-114218850/bask-gili-meno/'],
  'https://www.google.com/maps/search/?api=1&query=BASK%20Gili%20Meno%2C%20Lombok',
  'published',
  E'구글 호텔 스니펫 기준으로 해변 앞에 있고 NEST 조각과 메노 호수에 가깝게 붙은 독립 빌라형 숙소입니다. 가장 조용한 섬인 길리 메노의 장점을 바로 누리기 쉬워, 파티 섬과 반대 결의 숙소 후보로 적합합니다.\n체크인/체크아웃은 예약처 확인 권장',
  now()
),
(
  '33333333-3333-3333-3333-10bc0000000a',
  '길리 에어 이스케이프 (Gili Air Escape)',
  'Gili Air, Pemenang, Lombok Utara',
  -8.3614, 116.0847, 'Lombok', 'stay',
  '동쪽 해변 안쪽의 조용한 방갈로',
  'https://www.myboutiquehotel.com/en/boutique-hotels-gili-air/',
  array['https://www.myboutiquehotel.com/en/boutique-hotels-gili-air/'],
  'https://www.google.com/maps/search/?api=1&query=Gili%20Air%20Escape%2C%20Gili%20Air%2C%20Lombok',
  'published',
  E'부티크 숙소 정리 페이지에서 해변에서 200m 떨어진 소형 리조트형 방갈로로 언급돼, 길리 에어 동쪽의 느린 체류감과 잘 맞습니다. 메인 선셋 바 라인보다 숙박 밀도가 한층 낮은 쪽을 찾는 용도로 넣기 좋은 후보입니다.\n체크인/체크아웃은 예약처 확인 권장',
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
