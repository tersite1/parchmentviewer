import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import { usePlacesStore } from '../stores/placesStore';
import { FIXTURE_PLACES } from '../data/fixtures';

export function usePlaces() {
  const { places, isLoading, error, setPlaces, setLoading, setError } = usePlacesStore();
  const [version, setVersion] = useState(0);
  const refetch = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    let cancelled = false;
    async function fetchPlaces() {
      setLoading(true);
      setError(null);

      try {
        const { data, error: supabaseError } = await supabase
          .from('places')
          .select('*')
          .eq('status', 'published');

        if (cancelled) return;
        if (supabaseError) throw supabaseError;

        setPlaces(data && data.length > 0 ? data : FIXTURE_PLACES);
      } catch {
        if (cancelled) return;
        setPlaces(FIXTURE_PLACES);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPlaces();
    return () => { cancelled = true; };
  }, [setPlaces, setLoading, setError, version]);

  return { places, isLoading, error, refetch };
}
