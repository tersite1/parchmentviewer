import { Platform } from 'react-native';

export const ImpactFeedbackStyle = {
  Light: 'Light' as const,
  Medium: 'Medium' as const,
  Heavy: 'Heavy' as const,
};

export const NotificationFeedbackType = {
  Success: 'Success' as const,
  Warning: 'Warning' as const,
  Error: 'Error' as const,
};

const noop = async () => {};

let _impactAsync: (style?: string) => Promise<void> = noop;
let _notificationAsync: (type?: string) => Promise<void> = noop;
let _selectionAsync: () => Promise<void> = noop;

if (Platform.OS !== 'web') {
  const init = async () => {
    try {
      const Haptics = await import('expo-haptics');
      _impactAsync = Haptics.impactAsync as any;
      _notificationAsync = Haptics.notificationAsync as any;
      _selectionAsync = Haptics.selectionAsync;
    } catch {}
  };
  init();
}

export const impactAsync = (style?: any) => _impactAsync(style);
export const notificationAsync = (type?: any) => _notificationAsync(type);
export const selectionAsync = () => _selectionAsync();
