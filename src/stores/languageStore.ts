import { create } from 'zustand';
import { storage } from '../utils/storage';

export type LanguageOption = 'kr' | 'en' | 'all';

interface LanguageState {
  language: LanguageOption;
  setLanguage: (lang: LanguageOption) => void;
  loadLanguage: () => Promise<void>;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'all',

  setLanguage: async (lang: LanguageOption) => {
    set({ language: lang });
    await storage.setItem('appLanguage', lang);
  },

  loadLanguage: async () => {
    const saved = await storage.getItem('appLanguage');
    if (saved && ['kr', 'en', 'all'].includes(saved)) {
      set({ language: saved as LanguageOption });
    }
  },
}));

// Map language codes for Google Maps
export const getMapLanguage = (lang: LanguageOption): string => {
  switch (lang) {
    case 'kr': return 'ko';
    case 'en': return 'en';
    case 'all': return 'ko'; // Default to Korean
  }
};
