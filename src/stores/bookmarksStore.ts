import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../config/supabase';
import type { Place } from '../types/database';

const BOOKMARKS_KEY = 'parchment_bookmarks';

// Type for raw Supabase client without strict typing for bookmarks table
const supabaseAny = supabase as any;

interface BookmarksState {
  bookmarkedIds: Set<string>;
  bookmarkedPlaces: Place[];
  isLoading: boolean;
  loadBookmarks: (userId?: string | null) => Promise<void>;
  addBookmark: (place: Place, userId?: string | null) => Promise<void>;
  removeBookmark: (placeId: string, userId?: string | null) => Promise<void>;
  toggleBookmark: (place: Place, userId?: string | null) => Promise<void>;
  isBookmarked: (placeId: string) => boolean;
}

export const useBookmarksStore = create<BookmarksState>((set, get) => ({
  bookmarkedIds: new Set(),
  bookmarkedPlaces: [],
  isLoading: true,

  loadBookmarks: async (userId?: string | null) => {
    try {
      set({ isLoading: true });

      let places: Place[] = [];

      if (userId) {
        // Fetch from Supabase (works for both anonymous and authenticated users)
        const { data: serverBookmarks, error } = await supabaseAny
          .from('bookmarks')
          .select('place_id')
          .eq('user_id', userId);

        if (!error && serverBookmarks && serverBookmarks.length > 0) {
          const placeIds = serverBookmarks.map((b: any) => b.place_id);

          // Fetch full place data
          const { data: serverPlaces } = await supabaseAny
            .from('places')
            .select('*')
            .in('id', placeIds);

          if (serverPlaces) {
            places = serverPlaces as Place[];
          }
        }
      } else {
        // Fallback to local storage if no user session
        const stored = await AsyncStorage.getItem(BOOKMARKS_KEY);
        if (stored) {
          places = JSON.parse(stored);
        }
      }

      set({
        bookmarkedPlaces: places,
        bookmarkedIds: new Set(places.map(p => p.id)),
        isLoading: false,
      });

      // Also update local cache
      await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(places));
    } catch (error) {
      console.error('Error loading bookmarks:', error);

      // Fallback to local storage on error
      try {
        const stored = await AsyncStorage.getItem(BOOKMARKS_KEY);
        if (stored) {
          const places = JSON.parse(stored);
          set({
            bookmarkedPlaces: places,
            bookmarkedIds: new Set(places.map((p: Place) => p.id)),
            isLoading: false,
          });
          return;
        }
      } catch {}

      set({ isLoading: false });
    }
  },

  addBookmark: async (place: Place, userId?: string | null) => {
    const { bookmarkedPlaces, bookmarkedIds } = get();

    if (bookmarkedIds.has(place.id)) return;

    const newPlaces = [place, ...bookmarkedPlaces];
    const newIds = new Set(bookmarkedIds);
    newIds.add(place.id);

    set({ bookmarkedPlaces: newPlaces, bookmarkedIds: newIds });

    // Update local cache
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newPlaces));

    // Sync to Supabase if we have a user
    if (userId) {
      try {
        await supabaseAny
          .from('bookmarks')
          .upsert({ user_id: userId, place_id: place.id }, { onConflict: 'user_id,place_id' });
      } catch (error) {
        console.error('Error syncing bookmark to server:', error);
      }
    }
  },

  removeBookmark: async (placeId: string, userId?: string | null) => {
    const { bookmarkedPlaces, bookmarkedIds } = get();

    const newPlaces = bookmarkedPlaces.filter(p => p.id !== placeId);
    const newIds = new Set(bookmarkedIds);
    newIds.delete(placeId);

    set({ bookmarkedPlaces: newPlaces, bookmarkedIds: newIds });

    // Update local cache
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newPlaces));

    // Sync to Supabase if we have a user
    if (userId) {
      try {
        await supabaseAny
          .from('bookmarks')
          .delete()
          .eq('user_id', userId)
          .eq('place_id', placeId);
      } catch (error) {
        console.error('Error removing bookmark from server:', error);
      }
    }
  },

  toggleBookmark: async (place: Place, userId?: string | null) => {
    const { bookmarkedIds, addBookmark, removeBookmark } = get();

    if (bookmarkedIds.has(place.id)) {
      await removeBookmark(place.id, userId);
    } else {
      await addBookmark(place, userId);
    }
  },

  isBookmarked: (placeId: string) => {
    return get().bookmarkedIds.has(placeId);
  },
}));
