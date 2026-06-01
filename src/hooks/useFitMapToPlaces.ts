import { useCallback, useEffect, useRef, useState } from 'react';
import type { Place } from '../types/database';

/**
 * 지도가 준비되고 장소가 로드되면, 모든 마커가 한 화면에 보이도록 카메라를 맞춘다.
 * 큐레이팅된 장소들이 여러 도시(대전·발리·홍콩·제주 등)에 흩어져 있어
 * 초기 region(SEOUL)에는 마커가 하나도 안 보이던 문제를 해결한다.
 *
 * onMapReady를 MapView에 연결하고, mapRef는 호출부의 기존 ref를 그대로 전달한다.
 */
export function useFitMapToPlaces(mapRef: React.RefObject<any>, places: Place[]) {
  const [ready, setReady] = useState(false);
  const fitted = useRef(false);
  const onMapReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!ready || fitted.current) return;
    const coords = (places || [])
      .filter((p) => Number.isFinite(p?.lat) && Number.isFinite(p?.lng))
      .map((p) => ({ latitude: p.lat, longitude: p.lng }));
    if (coords.length === 0) return;
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
