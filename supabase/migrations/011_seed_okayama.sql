-- Seed: Okayama curated places (10) — Perplexity 큐레이션 결과
-- city = 'Okayama'
-- 멱등 (id 고정 + ON CONFLICT DO UPDATE).

insert into public.places (
  id, name, address, lat, lng, city, category, vibe,
  image_url, gallery_urls, source_post_url, status, curator_notes, published_at
) values
(
  '88888888-8888-8888-8888-0caaaa000001',
  '카페 무겐안 플러스 (Cafe MUGENAN+)',
  '岡山県備前市伊部2697',
  34.7409, 134.1893, 'Okayama', 'cafe',
  '비젠야키 그릇에 담긴 오후',
  'https://mugenan.co.jp/cafe-mugenan-plus/',
  array['https://mugenan.co.jp/cafe-mugenan-plus/'],
  'https://www.google.com/maps/search/?api=1&query=Cafe%20MUGENAN%2B%2C%20%E5%B2%A1%E5%B1%B1%E7%9C%8C%E5%82%99%E5%89%8D%E5%B8%82%E4%BC%8A%E9%83%A82697',
  'published',
  E'비젠야키 가마터 공방에 붙어 있는 카페라, 관광 동선보다 작업장의 공기가 먼저 느껴집니다. 흙과 불의 질감이 그대로 남아 있어 가마터·공방·찻집 분위기를 한 번에 담기 좋습니다.\n영업: 10:00-16:30 (L.O. 16:00) / 변동 가능',
  now()
),
(
  '88888888-8888-8888-8888-0caaaa000002',
  '차바코 (cafe 茶匣)',
  '岡山県津山市横山549',
  35.0710, 134.0090, 'Okayama', 'cafe',
  '큰 창으로 숨 쉬는 다실형 카페',
  'https://www.instagram.com/p/DXaQlwIk02P/',
  array['https://www.instagram.com/p/DXaQlwIk02P/'],
  'https://www.google.com/maps/search/?api=1&query=cafe%20%E8%8C%B6%E5%8C%A3%2C%20%E5%B2%A1%E5%B1%B1%E7%9C%8C%E6%B4%A5%E5%B1%B1%E5%B8%82%E6%A8%AA%E5%B1%B1549',
  'published',
  E'츠야마의 생활권 안쪽에 숨어 있는 찻집형 카페라, 유명 관광 코스보다 훨씬 조용합니다. 큰 창과 나무 가구, 낮은 소리의 대화가 중심이 되는 공간이라 Parchment 톤에 잘 맞습니다.\n영업: 11:30-17:00',
  now()
),
(
  '88888888-8888-8888-8888-0caaaa000003',
  '슈라쿠차야 (衆楽茶屋)',
  '岡山県津山市山北628',
  35.0692, 134.0170, 'Okayama', 'cafe',
  '정원 가장자리의 소박한 찻집',
  'https://www.hotpepper.jp/strJ000807642/',
  array['https://www.hotpepper.jp/strJ000807642/'],
  'https://www.google.com/maps/search/?api=1&query=%E8%A1%86%E6%A5%BD%E8%8C%B6%E5%B1%8B%2C%20%E5%B2%A1%E5%B1%B1%E7%9C%8C%E6%B4%A5%E5%B1%B1%E5%B8%82%E5%B1%B1%E5%8C%97628',
  'published',
  E'츠야마의 오래된 정원 옆 찻집이라, 대형 관광 상점가와는 결이 다릅니다. 화려한 연출보다 차 한 잔과 정원 풍경을 천천히 붙여 보는 타입이라 조용한 휴식 후보로 좋습니다.\n영업: 현장 확인 권장',
  now()
),
(
  '88888888-8888-8888-8888-0caaaa000004',
  '우시마도 타리 (USHIMADO TARI)',
  '岡山県瀬戸内市牛窓町牛窓',
  34.6116, 134.1327, 'Okayama', 'restaurant',
  '바다와 농산물이 만나는 식탁',
  'https://ushimado-tari.com/mt/',
  array['https://ushimado-tari.com/mt/'],
  'https://www.google.com/maps/search/?api=1&query=USHIMADO%20TARI%2C%20%E5%B2%A1%E5%B1%B1%E7%9C%8C%E7%80%AC%E6%88%B8%E5%86%85%E5%B8%82%E7%89%9B%E7%AA%93%E7%94%BA%E7%89%9B%E7%AA%93',
  'published',
  E'우시마도 해안가에 붙어 있지만 메인 관광 포토라인보다 생활 해안에 가까운 감각이 있습니다. 세토내해 재료와 자가 재배 바나나를 함께 다뤄, 바다와 농가 분위기가 동시에 느껴지는 식사 후보입니다.\n영업: 현장 확인 권장',
  now()
),
(
  '88888888-8888-8888-8888-0caaaa000005',
  '아지사이 신 (あじ彩 真)',
  '岡山県岡山市北区駅前町周辺',
  34.6661, 133.9206, 'Okayama', 'restaurant',
  '도시 안쪽의 차분한 가이세키',
  'https://kr.savorjapan.com/AT309/list/',
  array['https://kr.savorjapan.com/AT309/list/'],
  'https://www.google.com/maps/search/?api=1&query=%E3%81%82%E3%81%98%E5%BD%A9%20%E7%9C%9F%2C%20%E5%B2%A1%E5%B1%B1%E7%9C%8C%E5%B2%A1%E5%B1%B1%E5%B8%82',
  'published',
  E'오카야마역 남측 생활권 안쪽에 있는 일식집 계열로 소개되어, 성·정원 정문 코스와는 직접 겹치지 않습니다. 과한 관광형보다 조용히 식사에 집중하는 타입이라 시내 한 끼 후보로 무난합니다.\n영업: 평일·토 런치 11:30-14:00 / 디너 시간 변동 / 일 휴무 가능',
  now()
),
(
  '88888888-8888-8888-8888-0caaaa000006',
  '주라쿠노소노 (聚楽の園)',
  '岡山県岡山市北区駅前町周辺',
  34.6653, 133.9193, 'Okayama', 'restaurant',
  '도심 속 담백한 점심과 저녁',
  'https://kr.savorjapan.com/AT309/list/',
  array['https://kr.savorjapan.com/AT309/list/'],
  'https://www.google.com/maps/search/?api=1&query=%E8%81%9A%E6%A5%BD%E3%81%AE%E5%9C%92%2C%20%E5%B2%A1%E5%B1%B1%E7%9C%8C%E5%B2%A1%E5%B1%B1%E5%B8%82',
  'published',
  E'오카야마역권 식사 후보지만 성 정문 코스나 모모타로 상품 동선과는 거리를 두기 좋습니다. 여행객보다 지역 직장인 식사 흐름과 더 잘 맞는 도시형 식당으로 보는 편이 자연스럽습니다.\n영업: 평일 런치 11:30-15:00 / 디너 17:00-23:00, 주말 11:30-23:00',
  now()
),
(
  '88888888-8888-8888-8888-0caaaa000007',
  '가타오카 세이칸 갤러리 (片岡聖観)',
  '岡山県備前市伊部',
  34.7433, 134.1884, 'Okayama', 'culture',
  '비젠 흙내음이 남는 공방 갤러리',
  'https://kataokaseikan.jimdofree.com',
  array['https://kataokaseikan.jimdofree.com'],
  'https://www.google.com/maps/search/?api=1&query=%E7%89%87%E5%B2%A1%E8%81%96%E8%A6%B3%2C%20%E5%B2%A1%E5%B1%B1%E7%9C%8C%E5%82%99%E5%89%8D%E5%B8%82%E4%BC%8A%E9%83%A8',
  'published',
  E'비젠시 이베의 공방·갤러리·카페 성격이 함께 있는 공간이라, 전시장보다 작업실에 가까운 분위기가 남습니다. 완성품보다 흙과 표면, 생활 그릇의 질감이 먼저 다가와 Parchment의 문화 카테고리에 잘 맞습니다.\n영업: 현장 확인 권장',
  now()
),
(
  '88888888-8888-8888-8888-0caaaa000008',
  '인베 회관 (いんべ会館)',
  '岡山県備前市伊部267-1',
  34.7441, 134.1866, 'Okayama', 'culture',
  '이베 마을의 생활문화 거점',
  'https://map.yahoo.co.jp/v2/place/vs0gVNqtRzI',
  array['https://map.yahoo.co.jp/v2/place/vs0gVNqtRzI'],
  'https://www.google.com/maps/search/?api=1&query=%E3%81%84%E3%82%93%E3%81%B9%E4%BC%9A%E9%A4%A8%2C%20%E5%B2%A1%E5%B1%B1%E7%9C%8C%E5%82%99%E5%89%8D%E5%B8%82%E4%BC%8A%E9%83%A8267-1',
  'published',
  E'이베역에서 조금 떨어진 생활권 문화 거점이라, 유명 관광 전시관보다 훨씬 낮은 톤으로 지역 분위기를 느낄 수 있습니다. 비젠야키 마을을 걷는 중 잠시 지역 생활사와 마을 리듬을 붙잡기에 좋은 중간 지점입니다.\n영업: 현장 확인 권장',
  now()
),
(
  '88888888-8888-8888-8888-0caaaa000009',
  '노다야초 피아노 바 (野田屋町ピアノバー)',
  '岡山県岡山市北区野田屋町1-11-10 シミズビル3F',
  34.6669, 133.9218, 'Okayama', 'bar',
  '오래된 재즈가 흐르는 카운터',
  'https://japantravel.navitime.com/ko/area/jp/destinations/A0633/spot/?categoryCode=0106009001',
  array['https://japantravel.navitime.com/ko/area/jp/destinations/A0633/spot/?categoryCode=0106009001'],
  'https://www.google.com/maps/search/?api=1&query=%E9%87%8E%E7%94%B0%E5%B1%8B%E7%94%BA%E3%83%94%E3%82%A2%E3%83%8E%E3%83%90%E3%83%BC%2C%20%E5%B2%A1%E5%B1%B1%E7%9C%8C%E5%B2%A1%E5%B1%B1%E5%B8%82%E5%8C%97%E5%8C%BA%E9%87%8E%E7%94%B0%E5%B1%8B%E7%94%BA1-11-10%20%E3%82%B7%E3%83%9F%E3%82%BA%E3%83%93%E3%83%AB3F',
  'published',
  E'관광 클럽형 공간보다 카운터 중심의 작은 재즈 바로 알려져 있어, 밤에도 밀도가 낮고 조용한 편입니다. 작은 피아노와 낮은 볼륨의 음악이 중심이라 과장되지 않은 시내 밤 후보로 적합합니다.\n영업: 현장 확인 권장',
  now()
),
(
  '88888888-8888-8888-8888-0caaaa00000a',
  '나노 빌리지 오카야마 (ナノビレッジ岡山)',
  '岡山県加賀郡吉備中央町上野1604-2',
  34.8305, 133.7449, 'Okayama', 'stay',
  '기비고원 자락의 한 채 고택',
  'https://www.kouryu.or.jp/farm-stay-inn/detail/33681/12425/',
  array['https://www.kouryu.or.jp/farm-stay-inn/detail/33681/12425/'],
  'https://www.google.com/maps/search/?api=1&query=%E3%83%8A%E3%83%8E%E3%83%93%E3%83%AC%E3%83%83%E3%82%B8%E5%B2%A1%E5%B1%B1%2C%20%E5%B2%A1%E5%B1%B1%E7%9C%8C%E5%8A%A0%E8%B3%80%E9%83%A1%E5%90%89%E5%82%99%E4%B8%AD%E5%A4%AE%E7%94%BA%E4%B8%8A%E9%87%8E1604-2',
  'published',
  E'기비고원 자락에 있는 100년 넘은 고택형 숙소라, 도시 호텔보다 농가와 시골 부엌의 감각이 더 선명합니다. 하루를 길게 비워 두고 머물수록 주변 밭, 언덕, 조용한 밤공기가 살아나는 타입의 스테이입니다.\n체크인 15:00 / 체크아웃 10:00',
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
