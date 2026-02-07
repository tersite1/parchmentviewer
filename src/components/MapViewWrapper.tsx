import React, { forwardRef } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../config/constants';

// Re-export types for consumers
export type MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

interface MapViewWrapperProps {
  style?: any;
  initialRegion?: MapRegion;
  customMapStyle?: any;
  showsUserLocation?: boolean;
  showsMyLocationButton?: boolean;
  showsCompass?: boolean;
  showsScale?: boolean;
  showsBuildings?: boolean;
  showsTraffic?: boolean;
  showsIndoors?: boolean;
  showsPointsOfInterest?: boolean;
  onRegionChangeComplete?: (region: MapRegion) => void;
  children?: React.ReactNode;
  [key: string]: any;
}

interface MarkerWrapperProps {
  coordinate: { latitude: number; longitude: number };
  onPress?: () => void;
  anchor?: { x: number; y: number };
  children?: React.ReactNode;
  [key: string]: any;
}

// Web placeholder components
function WebMapPlaceholder({ style, children }: MapViewWrapperProps) {
  return (
    <View style={[webStyles.container, style]}>
      <View style={webStyles.content}>
        <Text style={webStyles.icon}>🗺</Text>
        <Text style={webStyles.title}>Map View</Text>
        <Text style={webStyles.subtitle}>지도는 모바일 앱에서 이용 가능합니다</Text>
      </View>
    </View>
  );
}

function WebMarkerPlaceholder(_props: MarkerWrapperProps) {
  return null;
}

const webStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: SPACING.sm,
  },
  icon: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.bone,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.graphite,
  },
});

// Conditional exports based on platform
let MapViewComponent: React.ComponentType<any>;
let MarkerComponent: React.ComponentType<any>;
let PROVIDER_GOOGLE_VALUE: any = undefined;

if (Platform.OS === 'web') {
  MapViewComponent = WebMapPlaceholder;
  MarkerComponent = WebMarkerPlaceholder;
} else {
  // Dynamic require for native only — avoids web bundler crash
  const Maps = require('react-native-maps');
  MapViewComponent = Maps.default;
  MarkerComponent = Maps.Marker;
  PROVIDER_GOOGLE_VALUE = Maps.PROVIDER_GOOGLE;
}

export const MapViewWrapper = forwardRef<any, MapViewWrapperProps>((props, ref) => {
  if (Platform.OS === 'web') {
    return <WebMapPlaceholder {...props} />;
  }
  const NativeMapView = MapViewComponent;
  return <NativeMapView ref={ref} provider={PROVIDER_GOOGLE_VALUE} {...props} />;
});

MapViewWrapper.displayName = 'MapViewWrapper';

export const MarkerWrapper = MarkerComponent;
export const PROVIDER_GOOGLE = PROVIDER_GOOGLE_VALUE;
