import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { COLORS, SPACING } from '../config/constants';

const { width } = Dimensions.get('window');

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export function Skeleton({ width: w = '100%', height = 20, borderRadius = 8, style }: SkeletonProps) {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 0.5, 1], [0.3, 0.7, 0.3]),
  }));

  return (
    <Animated.View
      style={[
        {
          width: w,
          height,
          borderRadius,
          backgroundColor: COLORS.border,
        },
        animatedStyle,
        style,
      ]}
    />
  );
}

export function HeroSkeleton() {
  return (
    <View style={styles.heroSkeleton}>
      <Skeleton width="100%" height={320} borderRadius={16} />
      <View style={styles.heroSkeletonContent}>
        <Skeleton width={80} height={24} borderRadius={12} />
        <Skeleton width="70%" height={28} borderRadius={8} style={{ marginTop: 12 }} />
        <Skeleton width="50%" height={18} borderRadius={6} style={{ marginTop: 8 }} />
      </View>
    </View>
  );
}

export function PlaceCardSkeleton() {
  const cardWidth = (width - SPACING.lg * 2 - SPACING.sm) / 2;

  return (
    <View style={[styles.placeCardSkeleton, { width: cardWidth }]}>
      <Skeleton width="100%" height={cardWidth} borderRadius={12} />
      <Skeleton width="80%" height={16} borderRadius={6} style={{ marginTop: 10 }} />
      <Skeleton width="50%" height={12} borderRadius={4} style={{ marginTop: 6 }} />
    </View>
  );
}

export function MapSkeleton() {
  return (
    <View style={styles.mapSkeleton}>
      <Skeleton width="100%" height={300} borderRadius={16} />
      <View style={styles.mapSkeletonOverlay}>
        <Skeleton width={100} height={32} borderRadius={16} />
      </View>
    </View>
  );
}

export function HomeScreenSkeleton() {
  return (
    <View style={styles.container}>
      {/* Search bar skeleton */}
      <View style={styles.searchSkeleton}>
        <Skeleton width="100%" height={48} borderRadius={12} />
      </View>

      {/* Filter chips skeleton */}
      <View style={styles.filterSkeleton}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} width={60} height={32} borderRadius={16} style={{ marginRight: 8 }} />
        ))}
      </View>

      {/* Map skeleton */}
      <View style={styles.mapSkeletonContainer}>
        <MapSkeleton />
      </View>

      {/* Hero skeleton */}
      <View style={styles.sectionSkeleton}>
        <Skeleton width={100} height={20} borderRadius={6} style={{ marginBottom: 12 }} />
        <HeroSkeleton />
      </View>

      {/* Place cards skeleton */}
      <View style={styles.sectionSkeleton}>
        <Skeleton width={80} height={20} borderRadius={6} style={{ marginBottom: 12 }} />
        <View style={styles.placeCardRow}>
          <PlaceCardSkeleton />
          <PlaceCardSkeleton />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bone,
  },
  searchSkeleton: {
    paddingTop: SPACING.xl + SPACING.xl,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  filterSkeleton: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  mapSkeletonContainer: {
    height: 300,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
  },
  mapSkeleton: {
    flex: 1,
    position: 'relative',
  },
  mapSkeletonOverlay: {
    position: 'absolute',
    bottom: SPACING.md,
    alignSelf: 'center',
  },
  sectionSkeleton: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
  heroSkeleton: {
    position: 'relative',
  },
  heroSkeletonContent: {
    position: 'absolute',
    bottom: SPACING.lg,
    left: SPACING.lg,
    right: SPACING.lg,
  },
  placeCardSkeleton: {
    marginRight: SPACING.sm,
  },
  placeCardRow: {
    flexDirection: 'row',
  },
});
