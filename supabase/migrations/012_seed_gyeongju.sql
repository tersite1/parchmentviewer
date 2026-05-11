-- Seed: Gyeongju curated places (10) — Perplexity 큐레이션 결과
-- city = 'Gyeongju'
-- 멱등 (id 고정 + ON CONFLICT DO UPDATE).

insert into public.places (
  id, name, address, lat, lng, city, category, vibe,
  image_url, gallery_urls, source_post_url, status, curator_notes, published_at
) values
(
  '99999999-9999-9999-9999-eeeeee000001',
  '아무카페 로스터리 (Amu Cafe Roastery)',
  '보문마을4길 1',
  35.8402, 129.2558, 'Gyeongju', 'cafe',
  '왕릉 숲길과 이어지는 커피',
  'https://blog.naver.com/shinhwa6508/222544521673',
  array['https://blog.naver.com/shinhwa6508/222544521673'],
  'https://map.naver.com/p/search/%EC%95%84%EB%AC%B4%EC%B9%B4%ED%8E%98',
  'published',
  E'진평왕릉 바로 앞에 있어 황리단길의 붐빔을 피해 조용히 산책과 커피를 묶기 좋은 곳입니다. 창밖으로 시골 풍경과 왕릉 산책로가 보여 경주 특유의 시공간감을 편안하게 즐길 수 있습니다.\n영업: 매일 10:00-20:00 (휴무일 변동 가능)',
  now()
),
(
  '99999999-9999-9999-9999-eeeeee000002',
  '1925감포 (1925 Gampo)',
  '감포읍 감포안길 15-1',
  35.8049, 129.5041, 'Gyeongju', 'cafe',
  '백 년 전 목욕탕의 새로운 호흡',
  'https://www.gyeongju.go.kr/tour/page.do?mnu_uid=2287&con_uid=7113&cmd=2',
  array['https://www.gyeongju.go.kr/tour/page.do?mnu_uid=2287&con_uid=7113&cmd=2'],
  'https://map.naver.com/p/search/1925%EA%B0%90%ED%8F%AC',
  'published',
  E'1925년에 지어진 감포항 어촌 마을의 목욕탕을 개조해 만든 카페로, 관광지보다 적산가옥이 남은 옛 항구 골목의 역사가 선명합니다. 감포 시장이나 등대를 걷다 잠깐의 시간 여행을 하듯 들르기 좋습니다.\n영업: 목-화 09:30-18:00 (주말 19:00 마감) / 수 휴무',
  now()
),
(
  '99999999-9999-9999-9999-eeeeee000003',
  '이어서 (eeeoseo)',
  '북문로 59 2층',
  35.8459, 129.2131, 'Gyeongju', 'cafe',
  '구도심 2층의 고요한 북카페',
  'https://blog.naver.com/wjstjdwl44/223544431437',
  array['https://blog.naver.com/wjstjdwl44/223544431437'],
  'https://map.naver.com/p/search/%EA%B2%BD%EC%A3%BC%20%EC%9D%B4%EC%96%B4%EC%84%9C',
  'published',
  E'독립 서점을 겸하고 있는 북카페라 대화를 나누기보다는 각자의 독서와 작업에 집중하는 차분한 공기가 흐릅니다. 화려한 외관 대신 경주 구도심에서 책과 음료에 기대 조용한 오후를 보내기 좋은 곳입니다.\n영업: 금-수 11:00-19:00 / 목 휴무',
  now()
),
(
  '99999999-9999-9999-9999-eeeeee000004',
  '묵도리식당 (Mukdori Sikdang)',
  '외동읍 신기앞길 59-3',
  35.7335, 129.3242, 'Gyeongju', 'restaurant',
  '외동 공단 근처 숨은 백반집',
  'https://blog.naver.com/hb2skmc/223257313788',
  array['https://blog.naver.com/hb2skmc/223257313788'],
  'https://map.naver.com/p/search/%EB%AC%B5%EB%8F%84%EB%A6%AC%EC%8B%9D%EB%8B%B9',
  'published',
  E'유명 관광지가 아니라 외동읍 생활권과 공단 노동자들이 점심을 위해 찾는 찐 현지인 식당입니다. 가성비 좋은 찌개와 반찬들이 깔끔하게 나와 화려하지 않아도 든든한 로컬 한 끼를 챙길 수 있습니다.\n영업: 방문 전 현장 재확인 권장',
  now()
),
(
  '99999999-9999-9999-9999-eeeeee000005',
  '산내대일한우 (Sannae Daeil Hanwoo)',
  '산내면 의곡중앙길 35',
  35.7483, 129.0270, 'Gyeongju', 'restaurant',
  '산내면의 묵직한 한우 소금구이',
  'https://www.siksinhot.com/P/656529',
  array['https://www.siksinhot.com/P/656529'],
  'https://map.naver.com/p/search/%EC%82%B0%EB%82%B4%EB%8C%80%EC%9D%BC%ED%95%9C%EC%9A%B0',
  'published',
  E'경주시 서쪽 끝자락 산내면 한우단지에 있어 시내 관광 코스와는 완전히 동떨어진 생활권 식당입니다. 고기를 구워 먹는 로컬들의 오래된 발길이 이어져, 시골 산간 마을 특유의 투박하고 깊은 맛을 냅니다.\n영업: 평일 09:00-20:00 (변동 가능)',
  now()
),
(
  '99999999-9999-9999-9999-eeeeee000006',
  '남산바담 회 국수 카페삼릉점 (Namsan Badam)',
  '포석로 639-4',
  35.7951, 129.2132, 'Gyeongju', 'restaurant',
  '남산 소나무 숲길 앞의 식사',
  'https://blog.naver.com/qnnp11/223642358605',
  array['https://blog.naver.com/qnnp11/223642358605'],
  'https://map.naver.com/p/search/%EB%82%A8%EC%82%B0%EB%B0%94%EB%8B%B4%20%ED%9A%8C%20%EA%B5%AD%EC%88%98%20%EC%B9%B4%ED%8E%98%EC%82%BC%EB%A6%89%EC%A0%90',
  'published',
  E'서남산 주차장 바로 앞에 있어 아침 일찍 남산이나 삼릉을 걷기 전후로 식사하기 좋은 위치입니다. 식당과 카페를 겸하고 있어 소나무 숲의 향을 느끼며 느슨하게 일정을 시작하기에 무리가 없습니다.\n영업: 매일 09:00-22:00',
  now()
),
(
  '99999999-9999-9999-9999-eeeeee000007',
  '달작 약선차 카페 (Daljak)',
  '내남면 용장리 (용장주차장 인근)',
  35.7725, 129.2173, 'Gyeongju', 'culture',
  '남산 등산로 초입의 약선차 한 잔',
  'https://blog.naver.com/ankara711/222987356130',
  array['https://blog.naver.com/ankara711/222987356130'],
  'https://map.naver.com/p/search/%EB%8B%AC%EC%9E%91%20%EC%95%BD%EC%84%A0%EC%B0%A8%20%EC%B9%B4%ED%8E%98',
  'published',
  E'서남산 용장골 초입에 자리해 흔한 한옥 카페의 상업적 느낌보다 산에 오르내리는 사람들의 쉼터 역할이 강합니다. 차를 내리고 마시는 행위 자체가 남산의 기운과 어우러져 조용한 문화적 체험으로 다가옵니다.\n영업: 방문 전 현장 재확인 권장',
  now()
),
(
  '99999999-9999-9999-9999-eeeeee000008',
  '진평왕릉 (Tomb of King Jinpyeong)',
  '보문동 608',
  35.8398, 129.2555, 'Gyeongju', 'culture',
  '대릉원을 벗어난 한적한 고분 숲길',
  'https://blog.naver.com/hanjun1990/222317662814',
  array['https://blog.naver.com/hanjun1990/222317662814'],
  'https://map.naver.com/p/search/%EC%A7%84%ED%8F%89%EC%99%95%EB%A6%89',
  'published',
  E'줄 서는 대릉원이나 첨성대 코스와 달리, 거대한 능 주변으로 오래된 고목과 넓은 풀밭이 조용하게 펼쳐집니다. 능을 따라 걷는 것 자체가 경주의 고즈넉한 시간을 그대로 호흡하는 일종의 전시 감상과 같습니다.\n영업: 상시 개방',
  now()
),
(
  '99999999-9999-9999-9999-eeeeee000009',
  '르씨엘 (Le Ciel)',
  '석장동 1174',
  35.8569, 129.1923, 'Gyeongju', 'bar',
  '동궁과 월지 외곽의 늦은 밤',
  'https://librarysheep.com/entry/%EB%8F%99%EA%B6%81%EA%B3%BC-%EC%9B%94%EC%A7%80-%EC%9D%B8%EA%B7%BC-%EB%8A%A6%EC%9D%80-%EC%8B%9C%EA%B0%84',
  array['https://librarysheep.com/entry/%EB%8F%99%EA%B6%81%EA%B3%BC-%EC%9B%94%EC%A7%80-%EC%9D%B8%EA%B7%BC-%EB%8A%A6%EC%9D%80-%EC%8B%9C%EA%B0%84'],
  'https://map.naver.com/p/search/%EA%B2%BD%EC%A3%BC%20%EB%A5%B4%EC%94%A8%EC%97%98',
  'published',
  E'황리단길 펍들의 왁자지껄함을 피해, 밤 10시까지 불을 밝히며 조용히 야경과 쉼을 제공하는 늦은 저녁의 카페 겸 바 공간입니다. 밤 시간대 문을 닫는 곳이 많은 경주에서 여행의 하루를 차분히 정리하기 좋습니다.\n영업: 매일 10:00-22:00',
  now()
),
(
  '99999999-9999-9999-9999-eeeeee00000a',
  '감포 한옥펜션 (Gampo Hanok Pension)',
  '감포읍 감포리 139-2',
  35.8078, 129.5074, 'Gyeongju', 'stay',
  '감포항 갯바람이 부는 한옥의 밤',
  'https://www.gyeongju.go.kr/tour/page.do?mnu_uid=2338&con_uid=511&cmd=2',
  array['https://www.gyeongju.go.kr/tour/page.do?mnu_uid=2338&con_uid=511&cmd=2'],
  'https://map.naver.com/p/search/%EA%B0%90%ED%8F%AC%20%ED%95%9C%EC%98%A5%ED%8E%9C%EC%85%98',
  'published',
  E'보문단지의 대형 리조트나 황리단길의 밀집된 숙소가 아니라, 송대말 등대와 감포항의 생활 구역을 걸어 다닐 수 있는 숙소입니다. 동해안 어촌 마을의 공기 속에 한옥이 섞여 있어 경주 바다의 다른 결을 느낄 수 있습니다.\n입실 15:00 / 퇴실 11:00',
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
