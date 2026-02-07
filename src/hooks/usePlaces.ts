import { useEffect } from 'react';
import { supabase } from '../config/supabase';
import { usePlacesStore } from '../stores/placesStore';

export function usePlaces() {
  const { places, isLoading, error, setPlaces, setLoading, setError } = usePlacesStore();

  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true);
      setError(null);

      try {
        const { data, error: supabaseError } = await supabase
          .from('places')
          .select('*')
          .eq('status', 'published');

        if (supabaseError) {
          throw supabaseError;
        }

        setPlaces(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch places';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaces();
  }, [setPlaces, setLoading, setError]);

  return { places, isLoading, error };
}
