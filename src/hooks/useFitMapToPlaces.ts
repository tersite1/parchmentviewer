import { useCallback, useEffect, useRef, useState } from 'react';
import type { Place } from '../types/database';

/**
 * 지도가 준비되고 장소가 로드되면, "장소가 가장 많은 도시"의 마커들에 카메라를 맞춘다.
 *
 * 큐레이팅된 장소들이 전 세계(대전·발리·홍콩·제주·카이로 등)에 흩어져 있어,
 * 전부를 한 화면에 맞추면 세계지도로 줌아웃돼 마커가 점처럼 뭉쳐 보였다.
 * 대신 가장 밀집된 도시로 시작 → 의미 있는 도시 단위 뷰. 나머지는 도시 선택/패닝으로 이동.
 *
 * onMapReady를 MapView에 연결하고, mapRef는 호출부의 기존 ref를 그대로 전달한다.
 */
export function useFitMapToPlaces(mapRef: React.RefObject<any>, places: Place[]) {
  const [ready, setReady] = useState(false);
  const fitted = useRef(false);
  const onMapReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!ready || fitted.current) return;
    const valid = (places || []).filter(
      (p) => Number.isFinite(p?.lat) && Number.isFinite(p?.lng),
    );
    if (valid.length === 0) return;
    if (typeof mapRef.current?.fitToCoordinates !== 'function') return;

    // 도시별로 묶어 가장 장소가 많은 도시를 고른다 (city 없으면 전체)
    const byCity = new Map<string, Place[]>();
    for (const p of valid) {
      const key = p.city || '__none__';
      const arr = byCity.get(key);
      if (arr) arr.push(p);
      else byCity.set(key, [p]);
    }
    let target = valid;
    let max = 0;
    for (const arr of byCity.values()) {
      if (arr.length > max) {
        max = arr.length;
        target = arr;
      }
    }

    const coords = target.map((p) => ({ latitude: p.lat, longitude: p.lng }));
    fitted.current = true;
    requestAnimationFrame(() => {
      mapRef.current?.fitToCoordinates(coords, {
        edgePadding: { top: 100, right: 70, bottom: 160, left: 70 },
        animated: false,
      });
    });
  }, [ready, places, mapRef]);

  return { onMapReady };
}
