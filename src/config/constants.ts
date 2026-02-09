// Design tokens - The Quarry palette
// Lemaire × Le Corbusier aesthetics

export const COLORS = {
  // Core palette
  coal: '#1A1A1A',
  bone: '#F5F5F0',
  graphite: '#666666',
  rust: '#8B3A3A',
  obsidian: '#0A0A0A',
  text: '#2A2A2A',
  textLight: '#888888',

  // Surfaces
  surface: '#FFFFFF',
  surfaceDim: '#F0F0F0',
  surfaceElevated: '#F8F8F8',

  // Borders
  border: '#E0E0E0',
  borderLight: '#E8E8E8',
  borderFocus: '#D4604E',

  // Disabled
  disabled: '#D0D0D0',
  disabledText: '#C0C0C0',

  // Inverse (on dark backgrounds)
  textInverse: '#FFFFFF',

  // Parchment card palette (#E3DAC9 base)
  parchment: 'rgba(227,218,201,0.8)',
  parchmentStrong: 'rgba(227,218,201,0.7)',
  parchmentDefault: 'rgba(227,218,201,0.6)',
  parchmentSecondary: 'rgba(227,218,201,0.5)',
  parchmentTertiary: 'rgba(227,218,201,0.45)',
  parchmentMuted: 'rgba(227,218,201,0.4)',
  parchmentFaded: 'rgba(227,218,201,0.35)',
  parchmentGhost: 'rgba(227,218,201,0.3)',

  // Status
  success: '#2D5A3D',
  error: '#5A2D2D',
  errorAction: '#FF6B6B',
  info: '#333333',

  // Overlays
  overlay: 'rgba(0,0,0,0.5)',
  overlayStrong: 'rgba(0,0,0,0.85)',
  overlayLight: 'rgba(0,0,0,0.4)',
  overlayModal: 'rgba(10,10,10,0.9)',
  coalTranslucent: 'rgba(26,26,26,0.6)',

  // Heart / bookmark
  heartActive: '#E74C3C',
  heartActiveSubtle: 'rgba(231,76,60,0.15)',

  // Accent (empty states, onboarding)
  searchAccent: '#B8C5D6',
  errorSubtle: '#D4A5A5',
  warmAccent: '#F5C6AA',

  // Glass (light on dark)
  glass: 'rgba(255,255,255,0.3)',
  glassMedium: 'rgba(255,255,255,0.2)',
  glassSubtle: 'rgba(255,255,255,0.08)',
  glassHint: 'rgba(255,255,255,0.06)',
  glassStrong: 'rgba(255,255,255,0.7)',

  // Brand
  kakaoYellow: '#FEE500',
  kakaoText: '#191919',

  // Shadow (iOS/Android)
  shadow: '#000000',

  // Tab bar
  tabInactive: '#AAAAAA',
} as const;

export const TYPOGRAPHY = {
  fontFamily: 'Inter',
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
  sizes: {
    xxs: 9,
    xs: 10,
    sm: 11,
    caption: 12,
    meta: 13,
    body: 14,
    md: 15,
    lg: 16,
    title: 18,
    xl: 20,
    xxl: 24,
    display: 28,
    hero: 32,
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
