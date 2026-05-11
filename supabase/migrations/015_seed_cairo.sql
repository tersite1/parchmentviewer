-- Seed: Cairo curated places (10) — Perplexity 큐레이션 결과
-- city = 'Cairo'
-- 멱등 (id 고정 + ON CONFLICT DO UPDATE).

insert into public.places (
  id, name, address, lat, lng, city, category, vibe,
  image_url, gallery_urls, source_post_url, status, curator_notes, published_at
) values
(
  'cccccccc-cccc-cccc-cccc-cacaca000001',
  '카페 리슈 (Café Riche)',
  '17 Talaat Harb Street, Downtown, Cairo',
  30.0453, 31.2380, 'Cairo', 'cafe',
  '구시가지 문인들의 오래된 살롱',
  'https://en.wikipedia.org/wiki/Caf%C3%A9_Riche',
  array['https://en.wikipedia.org/wiki/Caf%C3%A9_Riche'],
  'https://www.google.com/maps/search/?api=1&query=Caf%C3%A9%20Riche%2C%2017%20Talaat%20Harb%20Street%2C%20Downtown%2C%20Cairo',
  'published',
  E'1908년에 문을 연 다운타운의 오래된 카페로 알려져 있어, 시끄러운 관광 카페보다 훨씬 낮은 톤의 도시 감각이 남아 있습니다. 화려한 뷰 대신 오래된 테이블, 신문, 대화가 중심이라 Parchment 취지와 잘 맞습니다.\n영업: 현장 확인 권장',
  now()
),
(
  'cccccccc-cccc-cccc-cccc-cacaca000002',
  '알 칸 (Al Khan)',
  'Mari Gerges Street, Misr al-Qadima, Cairo',
  30.0065, 31.2310, 'Cairo', 'cafe',
  '콥트 카이로 안쪽 중정 카페',
  'https://www.barcelo.com/guia-turismo/en/egypt/cairo/things-to-do/coptic-cairo/',
  array['https://www.barcelo.com/guia-turismo/en/egypt/cairo/things-to-do/coptic-cairo/'],
  'https://www.google.com/maps/search/?api=1&query=Al%20Khan%2C%20Mari%20Gerges%20Street%2C%20Misr%20al-Qadima%2C%20Cairo',
  'published',
  E'암르 이븐 알아스 모스크 아래쪽, 콥트 카이로 생활권에 붙은 중정형 카페로 소개되어 있습니다. 메인 수크보다 훨씬 조용하고, 카르카데나 차를 마시며 잠깐 숨 고르기 좋은 올드 카이로형 공간입니다.\n영업: 현장 확인 권장',
  now()
),
(
  'cccccccc-cccc-cccc-cccc-cacaca000003',
  '북스팟 카페 (The Bookspot Café)',
  'Road 9, Maadi, Cairo',
  29.9597, 31.2588, 'Cairo', 'cafe',
  '영문서점 옆의 조용한 오후',
  'https://www.google.com/maps/search/?api=1&query=The%20Bookspot%20Cafe%20Maadi',
  array['https://www.google.com/maps/search/?api=1&query=The%20Bookspot%20Cafe%20Maadi'],
  'https://www.google.com/maps/search/?api=1&query=The%20Bookspot%20Cafe%2C%20Road%209%2C%20Maadi%2C%20Cairo',
  'published',
  E'마아디의 나무 많은 주택가와 잘 어울리는 책방형 카페 후보입니다. 대형 체인보다 머무는 시간이 길고, 영어책과 베이커리, 낮은 대화 소음이 중심이라 작업하거나 쉬기에 좋습니다.\n영업: 현장 확인 권장',
  now()
),
(
  'cccccccc-cccc-cccc-cccc-cacaca000004',
  '올드 카이로 레스토랑 앤 카페 (Old Cairo Restaurant & Cafe)',
  'Mari Gerges Street, Misr al-Qadima, Cairo',
  30.0069, 31.2303, 'Cairo', 'restaurant',
  '성지 골목 곁의 담백한 한 끼',
  'https://www.tripadvisor.com/Restaurant_Review-g294201-d19919242-Reviews-Old_Cairo_Restaurant_Cafe-Cairo_Cairo_Governorate.html',
  array['https://www.tripadvisor.com/Restaurant_Review-g294201-d19919242-Reviews-Old_Cairo_Restaurant_Cafe-Cairo_Cairo_Governorate.html'],
  'https://www.google.com/maps/search/?api=1&query=Old%20Cairo%20Restaurant%20%26%20Cafe%2C%20Mari%20Gerges%20Street%2C%20Misr%20al-Qadima%2C%20Cairo',
  'published',
  E'콥트 카이로 안에서 비교적 무난하고 조용한 식사처로 자주 언급되는 곳입니다. 단체 관광 식당보다 분위기가 가볍고, 교회와 골목을 걷다가 쉬어가는 로컬 식당 쪽 감각이 강합니다.\n영업: 현장 확인 권장',
  now()
),
(
  'cccccccc-cccc-cccc-cccc-cacaca000005',
  '타블리야 (Tabliya)',
  'Road 151, Maadi, Cairo',
  29.9610, 31.2570, 'Cairo', 'restaurant',
  '마아디 골목의 집밥 식탁',
  'https://www.google.com/maps/search/?api=1&query=Tabliya%20Maadi%20Cairo',
  array['https://www.google.com/maps/search/?api=1&query=Tabliya%20Maadi%20Cairo'],
  'https://www.google.com/maps/search/?api=1&query=Tabliya%2C%20Road%20151%2C%20Maadi%2C%20Cairo',
  'published',
  E'마아디의 주거 골목과 잘 맞는 작은 이집트 가정식 식당 후보입니다. 관광 밀도가 낮고, 과장된 연출보다 식기와 실내 결이 편안해서 저녁 한 끼를 천천히 보내기 좋습니다.\n영업: 현장 확인 권장',
  now()
),
(
  'cccccccc-cccc-cccc-cccc-cacaca000006',
  '다르브 1718 (Darb 1718)',
  'Kasr Al Sham Street, Fustat, Cairo',
  30.0067, 31.2328, 'Cairo', 'culture',
  '폐도시 가장자리의 현대미술 마당',
  'https://www.darb1718.com',
  array['https://www.darb1718.com'],
  'https://www.google.com/maps/search/?api=1&query=Darb%201718%2C%20Kasr%20Al%20Sham%20Street%2C%20Fustat%2C%20Cairo',
  'published',
  E'푸스타트의 오래된 층위 한가운데 자리한 컨템포러리 아트 센터로, 관광 체크리스트보다 동시대 카이로의 감각을 보여주는 공간입니다. 야외 상영, 공연, 워크숍, 루프 라운지까지 이어져 있어 올드 카이로의 다른 시간을 느끼기 좋습니다.\n영업: 전시·행사별 상이, 방문 전 확인 권장',
  now()
),
(
  'cccccccc-cccc-cccc-cccc-cacaca000007',
  '바이트 알 수하이미 (Bayt Al-Suhaymi)',
  'Al Darb al Asfar, Gamaliya, Cairo',
  30.0548, 31.2624, 'Cairo', 'culture',
  '오스만 중정에 고인 늦은 빛',
  'https://ko.skyticket.com/guide/19064',
  array['https://ko.skyticket.com/guide/19064'],
  'https://www.google.com/maps/search/?api=1&query=Bayt%20Al-Suhaymi%2C%20Al%20Darb%20al%20Asfar%2C%20Gamaliya%2C%20Cairo',
  'published',
  E'이슬라믹 카이로의 메인 통로보다 한 겹 안쪽으로 들어간 오래된 오스만 가옥입니다. 중정, 목재 장식, 채광이 좋아 관광 군중보다 건물의 호흡을 느끼기 쉬운 문화 후보입니다.\n영업: 현장 확인 권장',
  now()
),
(
  'cccccccc-cccc-cccc-cccc-cacaca000008',
  '성 바르바라 교회 (St. Barbara Church)',
  'Mar Girgis Street, Misr al-Qadima, Cairo',
  30.0069, 31.2309, 'Cairo', 'culture',
  '작고 조용한 콥트 교회',
  'https://herasianadventures.com/coptic-cairo-ultimate-guide/',
  array['https://herasianadventures.com/coptic-cairo-ultimate-guide/'],
  'https://www.google.com/maps/search/?api=1&query=St.%20Barbara%20Church%2C%20Mar%20Girgis%20Street%2C%20Misr%20al-Qadima%2C%20Cairo',
  'published',
  E'콥트 카이로 안에서도 비교적 차분하고 머무르기 쉬운 작은 교회 쪽에 가깝습니다. 단체 동선의 상징 명소보다 한 발 물러나 있어, 조용한 예배 공간과 오래된 아이콘을 천천히 보기 좋습니다.\n영업: 대체로 주간 개방, 예배 시간 변동 가능',
  now()
),
(
  'cccccccc-cccc-cccc-cccc-cacaca000009',
  '재즈 메이트 (Jazz Mate)',
  '6 El Gezira El Wosta Street, Zamalek, Cairo',
  30.0597, 31.2198, 'Cairo', 'bar',
  '작은 무대와 어두운 목재의 밤',
  'https://www.cairo360.com/article/nightlife/jazz-mate-live-jazz-music-in-zamalek/',
  array['https://www.cairo360.com/article/nightlife/jazz-mate-live-jazz-music-in-zamalek/'],
  'https://www.google.com/maps/search/?api=1&query=Jazz%20Mate%2C%206%20El%20Gezira%20El%20Wosta%20Street%2C%20Zamalek%2C%20Cairo',
  'published',
  E'자말렉 26 July 대로 안쪽의 작은 재즈 바로, 주말 라이브와 2층 소파 좌석이 있는 조용한 밤 공간으로 소개됩니다. 5성 호텔 라운지보다 훨씬 인간적이고, 식사와 한 잔을 함께 하기 좋은 낮은 밀도의 바입니다.\n영업: 라이브 일정·운영시간 변동 가능',
  now()
),
(
  'cccccccc-cccc-cccc-cccc-cacaca00000a',
  '빌라 벨 에포크 (Villa Belle Epoque)',
  'Road 13, Maadi, Cairo',
  29.9604, 31.2586, 'Cairo', 'stay',
  '정원과 저층 빌라, 부티크 스테이',
  'https://www.villabelleepoque.com',
  array['https://www.villabelleepoque.com'],
  'https://www.google.com/maps/search/?api=1&query=Villa%20Belle%20Epoque%2C%20Road%2013%2C%20Maadi%2C%20Cairo',
  'published',
  E'마아디의 영국식 주택가 분위기를 잘 살리는 부티크 호텔 계열이라, 5성 체인보다 훨씬 조용하고 동네 결이 살아 있습니다. 오래된 빌라와 정원, 저층 객실 중심이라 카이로에서도 숨을 고르기 좋은 숙소 후보입니다.\n체크인·체크아웃 예약처 확인 권장',
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
