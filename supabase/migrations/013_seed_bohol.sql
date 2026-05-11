-- Seed: Bohol curated places (10) — Perplexity 큐레이션 결과
-- city = 'Bohol'
-- 멱등 (id 고정 + ON CONFLICT DO UPDATE).

insert into public.places (
  id, name, address, lat, lng, city, category, vibe,
  image_url, gallery_urls, source_post_url, status, curator_notes, published_at
) values
(
  'aaaaaaaa-aaaa-aaaa-aaaa-b00b00000001',
  '코코 로코 카페 (Coco Loco Cafe)',
  'Barangay Poblacion, Anda, Bohol',
  9.7438, 124.5735, 'Bohol', 'cafe',
  '안다 바람이 머무는 베란다',
  'https://www.tripadvisor.com.ph/Restaurants-g1872021-zfp2-Anda_Bohol_Island_Bohol_Province_Visayas.html',
  array['https://www.tripadvisor.com.ph/Restaurants-g1872021-zfp2-Anda_Bohol_Island_Bohol_Province_Visayas.html'],
  'https://www.google.com/maps/search/?api=1&query=Coco%20Loco%20Cafe%2C%20Anda%2C%20Bohol',
  'published',
  E'알로나 쪽 해변 상업 라인과 달리 안다 타운 쪽의 느린 해변 공기 안에 있어 훨씬 차분합니다. 바다를 바로 앞에 두기보다 작은 테라스와 식사, 커피가 자연스럽게 이어져 오래 머물기 좋습니다.\n영업: 매일 07:00-21:00',
  now()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-b00b00000002',
  '스위스 가든 카페 (Swiss Garden Restaurant, Bar, and Cafe)',
  'Barangay Doljo, Panglao, Bohol',
  9.6152, 123.7860, 'Bohol', 'cafe',
  '정원 그늘 아래의 느린 오후',
  'https://www.bohol.ph/resort.php?businessid=326',
  array['https://www.bohol.ph/resort.php?businessid=326'],
  'https://www.google.com/maps/search/?api=1&query=Swiss%20Garden%20Restaurant%2C%20Bar%2C%20and%20Cafe%2C%20Panglao%2C%20Bohol',
  'published',
  E'알로나 메인 비치바와 다르게 정원형 좌석과 낮은 밀도의 식사가 중심인 공간입니다. 여행객도 오지만 요란한 해변 음악보다 그늘, 식물, 천천한 대화가 먼저 남는 타입입니다.\n영업: 현장 확인 권장',
  now()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-b00b00000003',
  '올드 플랜테이션 (The Old Plantation)',
  'Barangay Virgen, Anda, Bohol',
  9.7502, 124.5801, 'Bohol', 'restaurant',
  '정원 안쪽의 조용한 저녁 식사',
  'https://www.tripadvisor.com.ph/Restaurants-g1872021-Anda_Bohol_Island_Bohol_Province_Visayas.html',
  array['https://www.tripadvisor.com.ph/Restaurants-g1872021-Anda_Bohol_Island_Bohol_Province_Visayas.html'],
  'https://www.google.com/maps/search/?api=1&query=The%20Old%20Plantation%2C%20Anda%2C%20Bohol',
  'published',
  E'안다에서도 메인 화이트비치 군집보다 한 걸음 물러난 쪽에 있어 저녁 공기가 훨씬 고요합니다. 바다를 전면에 내세우기보다 오래된 정원과 집 같은 분위기로 기억되는 식당입니다.\n영업: 매일 11:00-21:00',
  now()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-b00b00000004',
  '제이앤알 레지던스 레스토랑 (J&R Residence Restaurant)',
  'Barangay Bacong, Anda, Bohol',
  9.7689, 124.5898, 'Bohol', 'restaurant',
  '절벽 바다를 내려다보는 식탁',
  'https://www.tripadvisor.com.ph/Restaurants-g1872021-zfp2-Anda_Bohol_Island_Bohol_Province_Visayas.html',
  array['https://www.tripadvisor.com.ph/Restaurants-g1872021-zfp2-Anda_Bohol_Island_Bohol_Province_Visayas.html'],
  'https://www.google.com/maps/search/?api=1&query=J%26R%20Residence%20Restaurant%2C%20Anda%2C%20Bohol',
  'published',
  E'안다 동쪽 끝에 가까운 바다 쪽이라 디젤 보트 소음이 적고, 섬의 외곽으로 밀려난 듯한 정숙함이 있습니다. 숙소 손님 외에는 크게 붐비지 않아 식사만 하러 들러도 여백이 많은 편입니다.\n영업: 매일 07:00-21:00',
  now()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-b00b00000005',
  '카사 아미한 레스토랑 (Casa Amihan Restaurant)',
  'Barangay Virgen, Anda, Bohol',
  9.7426, 124.5771, 'Bohol', 'restaurant',
  '백사장 뒤편의 담백한 한 끼',
  'https://www.tripadvisor.com.ph/Restaurants-g1872021-zfp2-Anda_Bohol_Island_Bohol_Province_Visayas.html',
  array['https://www.tripadvisor.com.ph/Restaurants-g1872021-zfp2-Anda_Bohol_Island_Bohol_Province_Visayas.html'],
  'https://www.google.com/maps/search/?api=1&query=Casa%20Amihan%20Restaurant%2C%20Anda%2C%20Bohol',
  'published',
  E'안다 화이트비치 권역 안에서도 비교적 낮은 톤으로 운영되는 리조트 레스토랑 계열이라, 메인 해변 상업 라인의 소란이 덜합니다. 바다와 식사가 붙어 있지만 전체 결은 조용한 게스트하우스 쪽에 가깝습니다.\n영업: 매일 07:00-21:00',
  now()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-b00b00000006',
  '다우이스 성당 (Our Lady of the Assumption Church / Dauis Church)',
  'Barangay Poblacion, Dauis, Bohol',
  9.6246, 123.8652, 'Bohol', 'culture',
  '회칠 벽 뒤에 남은 오래된 고요',
  'https://sites.google.com/view/boholtourismcluster/culture-and-heritage',
  array['https://sites.google.com/view/boholtourismcluster/culture-and-heritage'],
  'https://www.google.com/maps/search/?api=1&query=Dauis%20Church%2C%20Dauis%2C%20Bohol',
  'published',
  E'보홀의 대표 유산이지만 바클라욘보다 동선이 비교적 느슨하고, 성당 뒤편 골목의 분위기가 특히 좋습니다. 옛 스페인식 회칠 벽과 광장이 남아 있어 Parchment가 선호하는 시간감이 분명한 장소입니다.\n영업: 매일 06:00-18:00',
  now()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-b00b00000007',
  '로복 성당 앤 뮤지엄 (Loboc Church & Museum)',
  'Barangay Poblacion, Loboc, Bohol',
  9.6383, 124.0328, 'Bohol', 'culture',
  '강마을에 남은 오래된 신앙의 결',
  'https://sites.google.com/view/boholtourismcluster/culture-and-heritage',
  array['https://sites.google.com/view/boholtourismcluster/culture-and-heritage'],
  'https://www.google.com/maps/search/?api=1&query=Loboc%20Church%20and%20Museum%2C%20Loboc%2C%20Bohol',
  'published',
  E'로복 리버 크루즈 단체 동선과는 달리, 성당과 마을 중심부는 훨씬 조용하게 시간을 보낼 수 있습니다. 강가 마을의 낮은 속도와 오래된 석조 건축이 겹쳐 보여 문화 카테고리로 넣기 좋습니다.\n영업: 매일 08:00-17:00',
  now()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-b00b00000008',
  '행오버 레스토 바 (Hangover Resto Bar)',
  'Barangay Poblacion, Anda, Bohol',
  9.7447, 124.5756, 'Bohol', 'bar',
  '안다 밤바람에 앉는 한 잔',
  'https://www.tripadvisor.com.ph/Restaurants-g1872021-zfp2-Anda_Bohol_Island_Bohol_Province_Visayas.html',
  array['https://www.tripadvisor.com.ph/Restaurants-g1872021-zfp2-Anda_Bohol_Island_Bohol_Province_Visayas.html'],
  'https://www.google.com/maps/search/?api=1&query=Hangover%20Resto%20Bar%2C%20Anda%2C%20Bohol',
  'published',
  E'대형 비치클럽 분위기보다 안다 타운 저녁 생활권에 가까워, 여행자와 현지인이 섞이는 작은 밤 공간으로 보기 좋습니다. 늦게까지 과열되기보다는 식사와 술이 자연스럽게 이어지는 로컬 레스토바 쪽 성격이 강합니다.\n영업: 매일 10:00-22:00',
  now()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-b00b00000009',
  '아문 이니 비치 리조트 (Amun Ini Beach Resort & Spa)',
  'Barangay Candabong, Anda, Bohol',
  9.7920, 124.6062, 'Bohol', 'stay',
  '절벽 바다와 정원이 만나는 은신처',
  'https://www.youtube.com/watch?v=1NQpabAVmvs',
  array['https://www.youtube.com/watch?v=1NQpabAVmvs'],
  'https://www.google.com/maps/search/?api=1&query=Amun%20Ini%20Beach%20Resort%20and%20Spa%2C%20Anda%2C%20Bohol',
  'published',
  E'안다에서도 더 바깥쪽 해안에 있어 보트 소음과 상업 밀도가 낮고, 바다를 내려다보는 은둔형 분위기가 강합니다. 북적이는 팡라오 대신 조용한 동부 보홀을 숙소 자체로 느끼고 싶을 때 잘 맞습니다.\n체크인 14:00 / 체크아웃 12:00',
  now()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-b00b0000000a',
  '아이스 베어 바 앤 투어리스트 인 (Ice Bear Bar & Tourist Inn)',
  'Barangay Bingag, Dauis, Bohol',
  9.6390, 123.8725, 'Bohol', 'stay',
  '다우이스 안쪽의 소형 인',
  'https://www.booking.com/hotel/ph/icebear-bar-and-tourist-inn-dauis1.html',
  array['https://www.booking.com/hotel/ph/icebear-bar-and-tourist-inn-dauis1.html'],
  'https://www.google.com/maps/search/?api=1&query=Ice%20Bear%20Bar%20and%20Tourist%20Inn%2C%20Dauis%2C%20Bohol',
  'published',
  E'알로나 메인 라인이 아니라 다우이스 쪽 주거 지역에 있어 이동 동선이 한층 조용합니다. 화려한 리조트보다 작은 인 앤 바 타입이라, 본섬 생활권에 붙어 머무는 느낌을 원할 때 더 적합합니다.\n체크인 14:00 / 체크아웃 12:00',
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
