import { create } from 'zustand';
import { CITIES, type CityName } from '../config/constants';
import type { MapRegion as Region } from '../components/MapViewWrapper';

interface MapState {
  region: Region;
  currentCity: CityName;
  isCityModalVisible: boolean;
  setRegion: (region: Region) => void;
  setCurrentCity: (city: CityName) => void;
  toggleCityModal: () => void;
  closeCityModal: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  region: CITIES.SEOUL,
  currentCity: 'SEOUL',
  isCityModalVisible: false,
  setRegion: (region) => set({ region }),
  setCurrentCity: (city) => set({ currentCity: city, region: CITIES[city] }),
  toggleCityModal: () => set((state) => ({ isCityModalVisible: !state.isCityModalVisible })),
  closeCityModal: () => set({ isCityModalVisible: false }),
}));
