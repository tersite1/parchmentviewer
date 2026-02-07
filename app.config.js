const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY || 'AIzaSyBiwjG4JuVDr-djY9hFu-pSAYNIFnTFTt0';

export default {
  expo: {
    name: '파치먼트',
    slug: 'parchment',
    version: '1.2.0',
    scheme: 'parchment',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    newArchEnabled: true,
    splash: {
      image: './assets/icon.png',
      resizeMode: 'contain',
      backgroundColor: '#1A1A1A',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.tersite.parchment',
      buildNumber: '9',
      infoPlist: {
        CFBundleDisplayName: '파치먼트',
        CFBundleName: '파치먼트',
        ITSAppUsesNonExemptEncryption: false,
        NSLocationWhenInUseUsageDescription: '주변 공간을 찾기 위해 위치 정보가 필요합니다.',
      },
      config: {
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#1A1A1A',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: 'com.tersite.parchment',
      permissions: ['ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION'],
      config: {
        googleMaps: {
          apiKey: GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      [
        'expo-font',
        {
          fonts: ['./assets/fonts/Inter-Variable.ttf'],
        },
      ],
      'expo-web-browser',
    ],
    extra: {
      eas: {
        projectId: '78a40f4d-4ea9-4b68-a101-db199b5217a9',
      },
    },
    owner: 'tersite',
  },
};
