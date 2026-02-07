import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MarkerWrapper as Marker } from './MapViewWrapper';
import { COLORS, CATEGORIES } from '../config/constants';
import { Icon } from './Icon';
import type { Place } from '../types/database';

interface MapMarkerProps {
  place: Place;
  onPress: (place: Place) => void;
  showName?: boolean;
}

export function MapMarker({ place, onPress, showName = false }: MapMarkerProps) {
  const getCategoryColor = (category: string) => {
    return CATEGORIES[category as keyof typeof CATEGORIES]?.color || COLORS.bone;
  };

  const categoryColor = getCategoryColor(place.category || '');

  return (
    <Marker
      coordinate={{ latitude: place.lat, longitude: place.lng }}
      onPress={() => onPress(place)}
      anchor={{ x: 0.5, y: showName ? 0.8 : 0.5 }}
    >
      <View style={styles.markerContainer}>
        {/* Place Name Label - only shown when zoomed in */}
        {showName && (
          <View style={styles.nameLabel}>
            <Text style={styles.nameLabelText} numberOfLines={1}>
              {place.name}
            </Text>
          </View>
        )}

        {/* Marker Icon */}
        <View style={styles.marker}>
          <View style={[styles.markerBg, { backgroundColor: categoryColor }]}>
            <Icon
              name={place.category as any || 'cafe'}
              size={16}
              color={COLORS.coal}
            />
          </View>
          <View style={[styles.markerShadow, { backgroundColor: categoryColor }]} />
        </View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
  },
  nameLabel: {
    backgroundColor: COLORS.coal,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
    maxWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  nameLabelText: {
    color: COLORS.bone,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  marker: {
    width: 36,
    height: 42,
    alignItems: 'center',
  },
  markerBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 2,
  },
  markerShadow: {
    position: 'absolute',
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    opacity: 0.3,
    transform: [{ scaleX: 2 }],
  },
});
