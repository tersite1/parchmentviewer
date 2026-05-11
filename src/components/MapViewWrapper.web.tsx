// Web (react-native-web) 환경용 MapView 래퍼.
// react-native-maps는 웹에서 깨지므로 Leaflet 기반으로 동일 인터페이스 제공.
//
// 인터페이스 호환:
// - props: style, region, initialRegion, onRegionChangeComplete, children
// - ref method: animateToRegion(region, durationMs)
// - <MarkerWrapper coordinate={{latitude,longitude}} onPress markerColor label />
//   (네이티브에선 children 렌더링, 웹에선 markerColor/label로 leaflet divIcon 표현)

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  Children,
  isValidElement,
} from 'react';
import { View, StyleSheet } from 'react-native';
import L from 'leaflet';

export type MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

function ensureLeafletCss() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('leaflet-css')) return;
  const link = document.createElement('link');
  link.id = 'leaflet-css';
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  link.crossOrigin = '';
  document.head.appendChild(link);
}

function deltaToZoom(delta: number) {
  if (!delta || delta <= 0) return 12;
  return Math.max(2, Math.min(18, Math.round(Math.log2(360 / delta))));
}
function zoomToDelta(zoom: number) {
  return 360 / Math.pow(2, zoom);
}

interface MapViewProps {
  style?: any;
  region?: MapRegion;
  initialRegion?: MapRegion;
  onRegionChangeComplete?: (r: MapRegion) => void;
  children?: React.ReactNode;
  [k: string]: any;
}

export const MapViewWrapper = forwardRef<any, MapViewProps>(function MapViewWrapper(
  { style, region, initialRegion, onRegionChangeComplete, children },
  ref,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      animateToRegion: (target: MapRegion, durationMs = 300) => {
        if (!mapRef.current) return;
        mapRef.current.flyTo(
          [target.latitude, target.longitude],
          deltaToZoom(target.latitudeDelta),
          { duration: Math.max(0.1, durationMs / 1000) },
        );
      },
    }),
    [],
  );

  // init
  useEffect(() => {
    ensureLeafletCss();
    if (!containerRef.current || mapRef.current) return;

    const seed =
      region ?? initialRegion ?? {
        latitude: 37.5665,
        longitude: 126.978,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };

    const map = L.map(containerRef.current, {
      center: [seed.latitude, seed.longitude],
      zoom: deltaToZoom(seed.latitudeDelta),
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      { maxZoom: 19 },
    ).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    map.on('moveend', () => {
      const c = map.getCenter();
      const z = map.getZoom();
      const delta = zoomToDelta(z);
      onRegionChangeComplete?.({
        latitude: c.lat,
        longitude: c.lng,
        latitudeDelta: delta,
        longitudeDelta: delta,
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
    // 의도적으로 한 번만 init
  }, []);

  // controlled region
  useEffect(() => {
    if (!mapRef.current || !region) return;
    mapRef.current.setView(
      [region.latitude, region.longitude],
      deltaToZoom(region.latitudeDelta),
      { animate: false },
    );
  }, [region?.latitude, region?.longitude, region?.latitudeDelta]);

  // children → markers
  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      const props: any = (child as any).props;
      const coord = props?.coordinate;
      if (!coord || typeof coord.latitude !== 'number' || typeof coord.longitude !== 'number') {
        return;
      }
      const color = props.markerColor || '#E3DAC9';
      const label = props.label;
      const onPress = props.onPress;

      const labelHtml = label
        ? `<div style="position:absolute;top:18px;left:50%;transform:translateX(-50%);background:rgba(26,26,26,0.85);color:#E3DAC9;padding:2px 6px;border-radius:4px;font-size:10px;white-space:nowrap;font-family:Inter,-apple-system,sans-serif;pointer-events:none">${escapeHtml(
            String(label),
          )}</div>`
        : '';
      const html = `<div style="position:relative;width:14px;height:14px"><div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid #1a1a1a;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>${labelHtml}</div>`;

      const icon = L.divIcon({
        html,
        className: 'parchment-marker',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const marker = L.marker([coord.latitude, coord.longitude], { icon });
      if (typeof onPress === 'function') {
        marker.on('click', () => onPress());
      }
      markersLayerRef.current!.addLayer(marker);
    });
  }, [children]);

  return (
    <View style={[styles.container, style]}>
      {/* leaflet은 DOM 컨테이너 필요 */}
      <div
        ref={containerRef as any}
        style={{ width: '100%', height: '100%', minHeight: 200, borderRadius: 12 }}
      />
    </View>
  );
});

MapViewWrapper.displayName = 'MapViewWrapper';

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface MarkerProps {
  coordinate: { latitude: number; longitude: number };
  onPress?: () => void;
  markerColor?: string;
  label?: string;
  children?: React.ReactNode;
  [k: string]: any;
}

// 웹에선 placeholder — 실제 렌더링은 MapViewWrapper가 children을 분석해 처리.
export function MarkerWrapper(_props: MarkerProps) {
  return null;
}

export const PROVIDER_GOOGLE = undefined;

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
});
