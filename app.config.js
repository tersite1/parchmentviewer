const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY || '';

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
      buildNumber: '10',
      // Apple Sign-In capability — Sign in with Apple required by App Store guideline 4.8
      // when offering 3rd-party logins (Kakao).
      usesAppleSignIn: true,
      infoPlist: {
        CFBundleDisplayName: '파치먼트',
        CFBundleName: '파치먼트',
        ITSAppUsesNonExemptEncryption: false,
        NSLocationWhenInUseUsageDescription:
          '주변 공간을 찾기 위해 위치 정보가 필요합니다. We use your location to surface nearby curated places.',
        NSPhotoLibraryUsageDescription:
          '리뷰에 사진을 첨부하려면 사진첩 접근이 필요합니다. We need photo library access to attach images to your reviews.',
        NSCameraUsageDescription:
          '리뷰에 사진을 직접 촬영해 첨부하려면 카메라 접근이 필요합니다. We need camera access so you can take photos for your reviews.',
        // Allow opening external map apps for "길찾기"
        LSApplicationQueriesSchemes: [
          'maps',
          'comgooglemaps',
          'kakaolink',
          'kakaomap',
          'nmap',
        ],
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
      versionCode: 10,
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
      'expo-apple-authentication',
    ],
    extra: {
      eas: {
        projectId: '78a40f4d-4ea9-4b68-a101-db199b5217a9',
      },
    },
    owner: 'tersite',
  },
};
