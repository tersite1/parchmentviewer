-- Seed: Daejeon curated places (12) — Perplexity 큐레이션 결과
-- city = 'Daejeon'
-- 멱등 (id 고정 + ON CONFLICT DO UPDATE).
-- 주의: '청룡바베큐'는 viewer fixtures(fx-cheongryong-bbq)와 별개로 DB에 들어감.

insert into public.places (
  id, name, address, lat, lng, city, category, vibe,
  image_url, gallery_urls, source_post_url, status, curator_notes, published_at
) values
(
  'eeeeeeee-eeee-eeee-eeee-da40e0000001',
  '카페 마루 (Cafe Maru)',
  '대전 중구 보문산공원로497번길 61',
  36.3150, 127.4190, 'Daejeon', 'cafe',
  '보문산 자락에서 내려다보는 시내',
  'https://blog.naver.com/pool5425/222940091216',
  array['https://blog.naver.com/pool5425/222940091216'],
  'https://map.naver.com/v5/search/%EC%B9%B4%ED%8E%98%20%EB%A7%88%EB%A3%A8/place/36970876',
  'published',
  E'보문산 전망대 가는 길에 있는 카페로 번잡한 도심을 피해 산기슭의 여유를 느낄 수 있습니다. 대전 시내가 한눈에 내려다보이는 높은 뷰를 가지고 있어, 조용하게 풍경을 즐기기 좋습니다.\n영업: 매일 10:00-22:00',
  now()
),
(
  'eeeeeeee-eeee-eeee-eeee-da40e0000002',
  '카페 사무실 (Cafe Samusil)',
  '대전 중구 대종로452번길 3 2층',
  36.3265, 127.4281, 'Daejeon', 'cafe',
  '대흥동 낡은 건물 2층의 은신처',
  'https://blog.naver.com/seulzzan_0/223656794939',
  array['https://blog.naver.com/seulzzan_0/223656794939'],
  'https://map.naver.com/v5/search/%EC%B9%B4%ED%8E%98%EC%82%AC%EB%AC%B4%EC%8B%A4/place/1755106176',
  'published',
  E'대흥동 구도심의 오래된 건물 2층에 조용히 숨어있는 카페입니다. 어두운 조명과 절제된 인테리어가 주는 묘한 적막감 덕분에 혼자서 책을 읽거나 사색하기에 매우 좋은 공간입니다.\n영업: 현장 확인 권장',
  now()
),
(
  'eeeeeeee-eeee-eeee-eeee-da40e0000003',
  '카페 을축 (Cafe Eulchuk)',
  '대전 대덕구 신탄진동로23번길 81',
  36.4468, 127.4243, 'Daejeon', 'cafe',
  '신탄진 골목 안 주택의 반전',
  'https://blog.naver.com/minggong_world/223528335355',
  array['https://blog.naver.com/minggong_world/223528335355'],
  'https://map.naver.com/v5/search/%EC%B9%B4%ED%8E%98%20%EC%9D%84%EC%B6%95/place/1816405786',
  'published',
  E'신탄진 외곽, 오래된 구옥을 개조해 투박한 겉모습과 달리 안은 아주 세련되고 평온합니다. 노키즈존으로 운영되는 루프탑이 있어 대청호 주변 나들이 후 조용하게 쉬어가기 좋습니다.\n영업: 매일 10:30-22:00 (루프탑 21:00 마감)',
  now()
),
(
  'eeeeeeee-eeee-eeee-eeee-da40e0000004',
  '더노은로 (The Noeunro)',
  '대전 유성구 노은서로 19-2 1층',
  36.3768, 127.3090, 'Daejeon', 'cafe',
  '유성구 외곽에 내려앉은 제주',
  'https://www.welfarehello.com/community/hometownNews/d0780c71-b649-47dc-806d-1ea7dcdb26d2',
  array['https://www.welfarehello.com/community/hometownNews/d0780c71-b649-47dc-806d-1ea7dcdb26d2'],
  'https://map.naver.com/v5/search/%EB%8D%94%EB%85%B8%EC%9D%80%EB%A1%9C/place/1759600649',
  'published',
  E'번잡한 유성온천이나 궁동을 벗어나 노은동 끝자락에 자리 잡은 카페입니다. 제주도를 테마로 꾸며진 내부와 주변의 한적한 농가 분위기가 어우러져 한결 여유로운 시간을 보낼 수 있습니다.\n영업: 매일 10:30-22:00',
  now()
),
(
  'eeeeeeee-eeee-eeee-eeee-da40e0000005',
  '청룡바베큐 (Cheongryong Barbecue)',
  '대전 유성구 농대로2번길 3 1층',
  36.3637, 127.3513, 'Daejeon', 'restaurant',
  '어은동 골목 안 숯불향 생활 식당',
  'https://blog.naver.com/zoo_oo-/223611975123',
  array['https://blog.naver.com/zoo_oo-/223611975123'],
  'https://map.naver.com/v5/search/%EC%B2%AD%EB%A3%A1%EB%B0%94%EB%B2%A0%ED%81%90/place/1460395751',
  'published',
  E'카이스트 학생들로 북적이는 메인 거리를 살짝 비껴난 어은동 골목길의 바베큐 집입니다. 과도한 웨이팅 없이 동네 사람들의 저녁을 책임지는 편안하고 일상적인 분위기가 매력적입니다.\n영업: 화-일 18:00-01:00 (월요일 휴무)',
  now()
),
(
  'eeeeeeee-eeee-eeee-eeee-da40e0000006',
  '서해반점 (Seohae Banjeom)',
  '대전 서구 가수원로 31-1',
  36.3026, 127.3486, 'Daejeon', 'restaurant',
  '가수원 옛 골목의 노포 볶음밥',
  'https://blog.naver.com/halmoney-/223303397279',
  array['https://blog.naver.com/halmoney-/223303397279'],
  'https://map.naver.com/v5/search/%EC%84%9C%ED%95%B4%EB%B0%98%EC%A0%90%20%EA%B0%80%EC%88%98%EC%9B%90%EB%8F%99/place/16405230',
  'published',
  E'가수원동 구도심 옛 시장 골목에 자리 잡은 작고 오래된 노포 중국집입니다. 화려함은 없지만 오랜 세월 동네 주민들과 함께해 온 낡은 흔적과 옛날식 볶음밥이 묵직한 감성을 줍니다.\n영업: 현장 확인 권장',
  now()
),
(
  'eeeeeeee-eeee-eeee-eeee-da40e0000007',
  '한마음정육식당 노은점 (Hanmaeum Jeongyuksikdang)',
  '대전 유성구 노은서로 117 2층',
  36.3761, 127.3182, 'Daejeon', 'restaurant',
  '노은동 외곽의 편안한 고기 식탁',
  'https://blog.naver.com/black-eye/223652845338',
  array['https://blog.naver.com/black-eye/223652845338'],
  'https://map.naver.com/v5/search/%ED%95%9C%EB%A7%88%EC%9D%8C%EC%A0%95%EC%9C%A1%EC%8B%9D%EB%8B%B9%20%EB%85%B8%EC%9D%80/place/1498642735',
  'published',
  E'유성 중심가에서 벗어나 노은동 한적한 곳에 있어 식사 환경이 비교적 정돈되어 있습니다. 번잡함을 피해 일행과 조용하게 식사에 집중할 수 있는 깔끔한 동네 고깃집입니다.\n영업: 평일 15:00-22:00 / 주말 11:00-22:00',
  now()
),
(
  'eeeeeeee-eeee-eeee-eeee-da40e0000008',
  '구구절절 (Gugujeoljeol)',
  '대전 중구 테미로 34-1 1층',
  36.3218, 127.4265, 'Daejeon', 'culture',
  '대흥동 구도심의 고요한 글밭',
  'https://www.youtube.com/watch?v=DORp1c3YD1U',
  array['https://www.youtube.com/watch?v=DORp1c3YD1U'],
  'https://map.naver.com/v5/search/%EA%B5%AC%EA%B5%AC%EC%A0%88%EC%A0%88/place/1162391035',
  'published',
  E'테미공원 근처, 대흥동의 오래된 거리에 자리한 작은 독립서점입니다. 매일 책방지기가 바뀌며, 책에 둘러싸여 대전 구도심의 나른한 오후를 차분히 보내기 완벽한 장소입니다.\n영업: 화-토 운영 (일·월 휴무)',
  now()
),
(
  'eeeeeeee-eeee-eeee-eeee-da40e0000009',
  '테미오래 (Temiorae)',
  '대전 중구 보문로205번길 13',
  36.3225, 127.4248, 'Daejeon', 'culture',
  '플라타너스 아래 남겨진 관사촌',
  'https://blog.naver.com/storydaejeon/222541802119',
  array['https://blog.naver.com/storydaejeon/222541802119'],
  'https://map.naver.com/v5/search/%ED%85%8C%EB%AF%B8%EC%98%A4%EB%9E%98/place/1640578643',
  'published',
  E'옛 충남도지사공관과 관사들이 모여 있는 곳으로, 대전의 대표적인 근대 문화유산입니다. 북적이는 관광지 코스보다 훨씬 고즈넉하고 옛 일본식 가옥 구조가 잘 보존되어 있어 걷기 좋습니다.\n영업: 하절기 10:00-17:00 / 동절기 10:00-16:00 (월 휴관)',
  now()
),
(
  'eeeeeeee-eeee-eeee-eeee-da40e000000a',
  '아도니스 (Adonis)',
  '대전 중구 중앙로130번길 24 3층',
  36.3261, 127.4266, 'Daejeon', 'bar',
  '대흥동 밤거리를 지키는 클래식 바',
  'https://kr.hotels.com/go/south-korea/best-bars-daejeon',
  array['https://kr.hotels.com/go/south-korea/best-bars-daejeon'],
  'https://map.naver.com/v5/search/%EC%95%84%EB%8F%84%EB%8B%88%EC%8A%A4/place/11831872',
  'published',
  E'대흥동에 자리한 오래되고 무게감 있는 클래식 바입니다. 둔산동의 시끄러운 클럽이나 감성 주점과는 달리, 원목 인테리어와 은은한 조명 속에서 칵테일에만 집중할 수 있는 성숙한 공간입니다.\n영업: 월-금 17:00-24:00 / 주말 변동',
  now()
),
(
  'eeeeeeee-eeee-eeee-eeee-da40e000000b',
  '글룩921 (Gluck 921)',
  '대전 서구 청사서로 46 지하1층',
  36.3610, 127.3784, 'Daejeon', 'bar',
  '월평동 지하로 숨어든 와인 한 잔',
  'https://blog.naver.com/mario24/222635700793',
  array['https://blog.naver.com/mario24/222635700793'],
  'https://map.naver.com/v5/search/%EA%B8%80%EB%A3%A9921/place/1684347719',
  'published',
  E'월평동 주거단지 상가 지하에 조용히 문을 연 펍으로 감바스와 찹스테이크를 주로 냅니다. 메인 번화가가 아니라 동네 안쪽에 있어 소수 인원이 대화하며 와인과 맥주를 즐기기에 적합합니다.\n영업: 화-일 17:00-02:00 (월요일 휴무)',
  now()
),
(
  'eeeeeeee-eeee-eeee-eeee-da40e000000c',
  '스테이아야나 (Stay Ayana)',
  '대전 대덕구 대덕대로 1585',
  36.4485, 127.4190, 'Daejeon', 'stay',
  '신탄진 대로변에 숨긴 풀빌라 쉼터',
  'https://blog.naver.com/elisabet42/223351190505',
  array['https://blog.naver.com/elisabet42/223351190505'],
  'https://map.naver.com/v5/search/%EC%8A%A4%ED%85%8C%EC%9D%B4%EC%95%84%EC%95%BC%EB%82%98/place/1498642735',
  'published',
  E'번화한 시내 호텔이 아니라 신탄진 외곽에 위치한 펜션형 숙소입니다. 바깥의 소음과 단절된 채, 일행끼리만 프라이빗하게 온수풀을 즐기며 대전 외곽의 밤을 온전히 독점할 수 있습니다.\n체크인 15:00 / 체크아웃 11:00',
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
