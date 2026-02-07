import React, { useRef, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { MapViewWrapper as MapView } from '../components/MapViewWrapper';
import * as Haptics from '../utils/haptics';
import { COLORS, TYPOGRAPHY, SPACING, ANIMATION, CITIES, type CityName } from '../config/constants';
import mapStyle from '../config/mapStyle.json';
import { usePlaces } from '../hooks/usePlaces';
import { usePlacesStore } from '../stores/placesStore';
import { useMapStore } from '../stores/mapStore';
import { MapMarker } from '../components/MapMarker';
import { FlyToButton } from '../components/FlyToButton';
import { CityModal } from '../components/CityModal';
import { SpaceCard } from '../components/SpaceCard';
import type { Place } from '../types/database';

export function MapScreen() {
  const mapRef = useRef<any>(null);
  const { isLoading, error } = usePlaces();
  const { places, selectedPlace, selectPlace } = usePlacesStore();
  const { region, setCurrentCity } = useMapStore();

  const handleMarkerPress = useCallback((place: Place) => {
    selectPlace(place);
  }, [selectPlace]);

  const handleCloseCard = useCallback(() => {
    selectPlace(null);
  }, [selectPlace]);

  const handleCitySelect = useCallback(async (city: CityName) => {
    setCurrentCity(city);

    mapRef.current?.animateToRegion(CITIES[city], ANIMATION.duration);

    // Haptic feedback after animation completes
    setTimeout(async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, ANIMATION.duration);
  }, [setCurrentCity]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={region}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        showsPointsOfInterest={false}
      >
        {places.map((place) => (
          <MapMarker key={place.id} place={place} onPress={handleMarkerPress} />
        ))}
      </MapView>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color={COLORS.bone} />
        </View>
      )}

      <FlyToButton />
      <CityModal onCitySelect={handleCitySelect} />

      {selectedPlace && (
        <SpaceCard place={selectedPlace} onClose={handleCloseCard} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.coal,
  },
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    backgroundColor: COLORS.coal,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  errorText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weights.light as any,
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.rust,
    textAlign: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: SPACING.xl * 2,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
