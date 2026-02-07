// Design tokens - The Quarry palette
// Lemaire × Le Corbusier aesthetics

export const COLORS = {
  coal: '#1A1A1A',      // Cards/Map background
  bone: '#F5F5F0',      // Light background
  graphite: '#666666',  // Lines/borders
  rust: '#8B3A3A',      // Accent/error
  obsidian: '#0A0A0A',  // Map water
  text: '#2A2A2A',      // Primary text
  textLight: '#888888', // Secondary text
} as const;

// Pastel colors for category icons
export const PASTEL_COLORS = {
  mint: '#A8E6CF',      // 민트 - cafe
  orange: '#FFB347',    // 주황 - restaurant
  purple: '#D4A5FF',    // 보라 - culture
  pink: '#FFB6C1',      // 핑크 - bar
  yellow: '#FDFD96',    // 노랑 - stay
} as const;

export const TYPOGRAPHY = {
  fontFamily: 'Inter',
  weights: {
    light: '300',
    regular: '400',
  },
  sizes: {
    title: 18,
    body: 14,
    caption: 12,
  },
} as const;

export const SPACING = {
  unit: 8,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const ANIMATION = {
  duration: 300,
  slow: 500,
} as const;

export const CITIES = {
  SEOUL: {
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  },
  DAEJEON: {
    latitude: 36.3504,
    longitude: 127.3845,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  },
  GYEONGJU: {
    latitude: 35.8562,
    longitude: 129.2247,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  },
  BALI: {
    latitude: -8.4095,
    longitude: 115.1889,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  },
  CAIRO: {
    latitude: 30.0444,
    longitude: 31.2357,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
  },
  TOKYO: {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
  },
} as const;

export type CityName = keyof typeof CITIES;

export const CATEGORIES = {
  cafe: { label: '카페', color: '#A8E6CF' },       // 민트
  restaurant: { label: '식당', color: '#FFB347' }, // 주황
  culture: { label: '문화', color: '#D4A5FF' },    // 보라
  bar: { label: '술집', color: '#FFB6C1' },        // 핑크
  stay: { label: '숙박', color: '#FDFD96' },       // 노랑
} as const;

export type CategoryType = keyof typeof CATEGORIES;

export const MARKER = {
  size: 8,
} as const;
