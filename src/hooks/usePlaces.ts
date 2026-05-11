import { useEffect } from 'react';
import { supabase } from '../config/supabase';
import { usePlacesStore } from '../stores/placesStore';
import { FIXTURE_PLACES } from '../data/fixtures';

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

        setPlaces(data && data.length > 0 ? data : FIXTURE_PLACES);
      } catch {
        setPlaces(FIXTURE_PLACES);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaces();
  }, [setPlaces, setLoading, setError]);

  return { places, isLoading, error };
}
