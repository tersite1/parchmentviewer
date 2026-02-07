import { create } from 'zustand';
import type { Place } from '../types/database';

interface PlacesState {
  places: Place[];
  selectedPlace: Place | null;
  isLoading: boolean;
  error: string | null;
  setPlaces: (places: Place[]) => void;
  selectPlace: (place: Place | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePlacesStore = create<PlacesState>((set) => ({
  places: [],
  selectedPlace: null,
  isLoading: false,
  error: null,
  setPlaces: (places) => set({ places }),
  selectPlace: (place) => set({ selectedPlace: place }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
