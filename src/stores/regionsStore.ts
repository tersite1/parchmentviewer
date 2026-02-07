import { create } from 'zustand';
import { supabase } from '../config/supabase';

export interface Region {
  id: string;
  name: string;
  country: string;
  display_order: number;
  parent_id: string | null;
  icon_url: string | null;
}

interface RegionsState {
  regions: Region[];
  isLoading: boolean;
  error: string | null;
  fetchRegions: () => Promise<void>;
}

export const useRegionsStore = create<RegionsState>((set) => ({
  regions: [],
  isLoading: false,
  error: null,

  fetchRegions: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('regions')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      set({ regions: data || [], isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
