-- Seed: Shenzhen curated places (10) — Perplexity 큐레이션 결과
-- city = 'Shenzhen'
-- 멱등 (id 고정 + ON CONFLICT DO UPDATE).

insert into public.places (
  id, name, address, lat, lng, city, category, vibe,
  image_url, gallery_urls, source_post_url, status, curator_notes, published_at
) values
(
  '5a5a5a5a-5a5a-5a5a-5a5a-bbeeed000001',
  '나이시 커피 다펑점 (Niceee Coffee 大鹏所城店)',
  '大鹏新区, 大鹏街道南门东路3号, 深圳市, 广东省',
  22.5950, 114.5023, 'Shenzhen', 'cafe',
  '고성 성벽 앞 느린 커피 한 잔',
  'https://hk.trip.com/moments/detail/shenzhen-26-124911068/',
  array['https://hk.trip.com/moments/detail/shenzhen-26-124911068/'],
  'https://www.xiaohongshu.com/explore',
  'published',
  E'다펑 고성(大鹏所城) 부근에 위치하여 시끌벅적한 해변가 상업 구역을 벗어나 한적하게 쉴 수 있는 카페입니다. 조용한 옛 성의 분위기를 창밖으로 내다보며 걷다 지친 다리를 쉬어가기 좋습니다.\n영업: 매일 10:00-21:00',
  now()
),
(
  '5a5a5a5a-5a5a-5a5a-5a5a-bbeeed000002',
  '더 핏 / 티 웰 (The Peat / Tea Well 深业上城店)',
  '福田区, 华富街道深业上城小镇L3层, 深圳市, 广东省',
  22.5532, 114.0620, 'Shenzhen', 'cafe',
  '빌딩 숲을 벗어난 차분한 티 하우스',
  'https://in.naver.com/siso/challenge/keyword/253560710694465',
  array['https://in.naver.com/siso/challenge/keyword/253560710694465'],
  'https://www.xiaohongshu.com/explore',
  'published',
  E'커피와 함께 동양차를 세련되게 재해석해 내어놓는 곳입니다. 대규모 럭셔리 몰이나 스타벅스 체인을 피하고 싶을 때, 로프트(LOFT) 감성의 공간에서 샴페인 잔에 담긴 차를 맛볼 수 있습니다.\n영업: 매일 10:00-22:00',
  now()
),
(
  '5a5a5a5a-5a5a-5a5a-5a5a-bbeeed000003',
  '하카 카페 앤 바 (HAKKA·客咖 Cafe & Bar 坑梓店)',
  '坪山区, 坑梓街道横龙路12号, 深圳市, 广东省',
  22.7485, 114.3820, 'Shenzhen', 'cafe',
  '백 년 된 객가 가옥에서 마시는 커피',
  'https://hk.trip.com/restaurant/china/shenzhen/detail/rest-134179401/',
  array['https://hk.trip.com/restaurant/china/shenzhen/detail/rest-134179401/'],
  'https://hk.trip.com/restaurant/china/shenzhen/detail/rest-134179401/',
  'published',
  E'선전 외곽 핑산(坪山) 지역의 백 년 넘은 객가(客家) 옛 가옥을 개조해 만든 공간입니다. 도심의 빌딩 숲에서 완전히 벗어나 객가 전통 뜰락의 고요함과 시간의 흔적을 짙게 느낄 수 있습니다.\n영업: 매일 10:00-22:00',
  now()
),
(
  '5a5a5a5a-5a5a-5a5a-5a5a-bbeeed000004',
  '어민 식당 마터우점 (蛇口渔民合作社·渔民食堂 码头店)',
  '南山区, 招商街道望海路利安商务B座7-8楼, 深圳市, 广东省',
  22.4820, 113.9215, 'Shenzhen', 'restaurant',
  '셔커우 부두의 날것 같은 해산물 식탁',
  'https://gs.ctrip.com/html5/you/foods/Shenzhen26/15894700.html',
  array['https://gs.ctrip.com/html5/you/foods/Shenzhen26/15894700.html'],
  'https://gs.ctrip.com/html5/you/foods/Shenzhen26/15894700.html',
  'published',
  E'셔커우(蛇口) 어촌 시장과 부두에 인접해 어민들이 직접 잡아 온 해산물을 소박하게 요리해 내놓는 곳입니다. 세련된 씨월드(Sea World) 상권의 정제된 식당들과 달리, 현지 어항의 거칠고 투박한 에너지가 매력적입니다.\n영업: 매일 11:00-16:30',
  now()
),
(
  '5a5a5a5a-5a5a-5a5a-5a5a-bbeeed000005',
  '차오후이위안 부지점 (潮汇源·潮汕菜·早茶 布吉店)',
  '龙岗区, 布吉街道布吉街67号, 深圳市, 广东省',
  22.6025, 114.1208, 'Shenzhen', 'restaurant',
  '부지 안쪽의 끈끈한 차오저우 로컬 맛',
  'http://m.dianping.com/shop/1934754485',
  array['http://m.dianping.com/shop/1934754485'],
  'http://m.dianping.com/shop/1934754485',
  'published',
  E'선전 시내를 벗어나 현지 노동자와 주민들이 모여 사는 부지(布吉) 지역의 찐 로컬 차오저우(潮州) 요리점입니다. 관광객이 드물며, 투박한 모래 냄비 죽(砂锅粥)과 가루 고기가 달래주는 하루의 피로를 경험할 수 있습니다.\n영업: 매일 10:00-22:00',
  now()
),
(
  '5a5a5a5a-5a5a-5a5a-5a5a-bbeeed000006',
  '둥황 해산물 주루 옌톈점 (东煌海鲜酒楼 盐田店)',
  '盐田区, 盐田街道海鲜街18号A栋, 深圳市, 广东省',
  22.5855, 114.2690, 'Shenzhen', 'restaurant',
  '옌톈 어항 뷰를 둔 대형 로컬 해산물',
  'https://utravel.com.hk/news/detail/20065445',
  array['https://utravel.com.hk/news/detail/20065445'],
  'https://www.youtube.com/watch?v=uzi2N6Vvj78',
  'published',
  E'관광객 밀집도가 덜한 옌톈(盐田) 해산물 거리 끝자락에 위치해 옌톈 항구를 정면으로 바라보며 해산물을 뜯어 먹는 노포입니다. 홍콩 접경지의 오래된 어촌 감성과 가성비 좋은 신선한 해산물이 대비를 이룹니다.\n영업: 평일 11:00-22:00, 주말 10:00-22:30',
  now()
),
(
  '5a5a5a5a-5a5a-5a5a-5a5a-bbeeed000007',
  '허샹닝 미술관 (何香凝美术馆)',
  '南山区, 沙河街道深南大道9013号, 深圳市, 广东省',
  22.5350, 113.9780, 'Shenzhen', 'culture',
  'OCT 숲길 옆 부드러운 백색 미술관',
  'https://www.sohu.com/a/257770720_280151',
  array['https://www.sohu.com/a/257770720_280151'],
  'https://www.sohu.com/a/257770720_280151',
  'published',
  E'화챠오청(OCT) 메인 라인의 대형 카페들을 지나 숲길에 조용히 자리 잡은 국립 미술관입니다. 현대적인 빌딩 숲 옆에 대비되는 부드럽고 잔잔한 전시 공간에서 여백의 미를 느낄 수 있습니다.\n영업: 화-일 10:00-17:00 (월 휴관)',
  now()
),
(
  '5a5a5a5a-5a5a-5a5a-5a5a-bbeeed000008',
  '대만세거 객가 민속촌 (大万世居 / 客家民俗村)',
  '坪山区, 坪山街道大万路, 深圳市, 广东省',
  22.6850, 114.3330, 'Shenzhen', 'culture',
  '선전 외곽 객가 사람들의 요새',
  'https://hk.trip.com/moments/detail/shenzhen-26-132963944/',
  array['https://hk.trip.com/moments/detail/shenzhen-26-132963944/'],
  'https://www.xiaohongshu.com/explore',
  'published',
  E'마천루로 대변되는 선전 도심과 정반대의 시간을 사는 핑산(坪山) 객가 전통 성곽 마을입니다. 관광지화가 덜 되어 낡고 좁은 미로 같은 마을 골목을 고요하게 산책할 수 있습니다.\n영업: 매일 09:00-17:30',
  now()
),
(
  '5a5a5a5a-5a5a-5a5a-5a5a-bbeeed000009',
  '플루토 (PLUTO 海上世界店)',
  '南山区, 招商街道海上世界B区119, 深圳市, 广东省',
  22.4835, 113.9140, 'Shenzhen', 'bar',
  '씨월드 밤바람에 숨긴 모던 바',
  'https://in.naver.com/siso/challenge/keyword/253560710694465',
  array['https://in.naver.com/siso/challenge/keyword/253560710694465'],
  'https://in.naver.com/siso/challenge/keyword/253560710694465',
  'published',
  E'씨월드의 큰 길가 시끌벅적한 바를 벗어나 구석에 차분하게 자리 잡은 바입니다. 세련된 인테리어 속에서 차분하게 칵테일에 집중하며 선전의 밤을 즐길 수 있습니다.\n영업: 매일 19:00-02:00',
  now()
),
(
  '5a5a5a5a-5a5a-5a5a-5a5a-bbeeed00000a',
  '쉰인 민숙 자오창웨이 해변 (巡隐民宿 较场尾海滨店)',
  '大鹏新区, 大鹏街道较场尾路76号101, 深圳市, 广东省',
  22.5932, 114.5085, 'Shenzhen', 'stay',
  '다펑 어촌 해변가 앞 조용한 밤',
  'https://www.booking.com/hotel/cn/xun-yin-min-su-shen-zhen-da-peng-jiao-chang-wei-hai-bin-dian.zh-tw.html',
  array['https://www.booking.com/hotel/cn/xun-yin-min-su-shen-zhen-da-peng-jiao-chang-wei-hai-bin-dian.zh-tw.html'],
  'https://www.booking.com/hotel/cn/xun-yin-min-su-shen-zhen-da-peng-jiao-chang-wei-hai-bin-dian.zh-tw.html',
  'published',
  E'선전 동부 외곽 다펑(大鹏) 반도 자오창웨이(较场尾) 해변 안쪽에 위치한 민숙(게스트하우스)입니다. 번잡한 다메이사(大梅沙) 호텔촌을 피해 밤바다 소리를 들으며 소박한 바닷마을의 정취를 누릴 수 있습니다.\n체크인 14:00, 체크아웃 12:00',
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
