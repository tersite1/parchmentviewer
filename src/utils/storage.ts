import AsyncStorage from '@react-native-async-storage/async-storage';

// Simple storage utility that works in Expo Go
// Uses AsyncStorage which doesn't require native modules

export const storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log('Storage getItem error:', e);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('Storage setItem error:', e);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log('Storage removeItem error:', e);
    }
  },
};
