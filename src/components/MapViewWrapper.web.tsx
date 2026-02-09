import React, { forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../config/constants';

export type MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export const MapViewWrapper = forwardRef<any, any>(({ style, ...props }, ref) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <Text style={styles.icon}>🗺</Text>
        <Text style={styles.title}>Map View</Text>
        <Text style={styles.subtitle}>지도는 모바일 앱에서 이용 가능합니다</Text>
      </View>
    </View>
  );
});

MapViewWrapper.displayName = 'MapViewWrapper';

export function MarkerWrapper(_props: any) {
  return null;
}

export const PROVIDER_GOOGLE = undefined;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.coal,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    borderRadius: 16,
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
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.bone,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.meta,
    color: COLORS.graphite,
  },
});
