import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  Animated as RNAnimated,
  Modal,
  StatusBar,
  Platform,
} from 'react-native';
import { MapViewWrapper as MapView } from '../components/MapViewWrapper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInRight,
} from 'react-native-reanimated';
import * as Haptics from '../utils/haptics';
import { COLORS, SPACING, CITIES, CATEGORIES, TYPOGRAPHY } from '../config/constants';
import { usePlacesStore } from '../stores/placesStore';
import { useLanguageStore, getMapLanguage } from '../stores/languageStore';
import { useBookmarksStore } from '../stores/bookmarksStore';
import { useAuthStore } from '../stores/authStore';
import { usePlaces } from '../hooks/usePlaces';
import { MapMarker } from '../components/MapMarker';
import { SpaceCard } from '../components/SpaceCard';
import { Icon } from '../components/Icon';
import { HomeScreenSkeleton } from '../components/SkeletonLoader';
import { SearchEmptyState } from '../components/EmptyState';
import mapStyle from '../config/mapStyle.json';
import type { Place } from '../types/database';
import { isSafeImageUrl } from '../utils/sanitizeUrl';

const { width, height } = Dimensions.get('window');
const MAP_HEIGHT = height * 0.35;
const HERO_HEIGHT = 340;
const HERO_WIDTH = width - SPACING.md * 2;
const PLACE_CARD_WIDTH = (width - SPACING.lg * 2 - SPACING.sm) / 2;
const PLACE_CARD_HEIGHT = 220;

const FILTERS: { id: string; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'cafe', label: '카페' },
  { id: 'restaurant', label: '음식' },
  { id: 'culture', label: '문화' },
  { id: 'bar', label: '술집' },
  { id: 'stay', label: '숙박' },
];

// Calculate distance between two coordinates (Haversine formula)
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface HomeScreenProps {
  navigation: any;
}

export function HomeScreen({ navigation }: HomeScreenProps) {
  usePlaces();
  const { places, selectedPlace, selectPlace, isLoading } = usePlacesStore();
  const { language } = useLanguageStore();
  const mapLanguage = getMapLanguage(language);
  const mapRef = useRef<MapView>(null);
  const scrollY = useRef(new RNAnimated.Value(0)).current;
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(0.1); // Track zoom level (latitudeDelta)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const fullscreenMapRef = useRef<MapView>(null);

  // Auth store
  const { user } = useAuthStore();
  const userId = user?.id || null;

  // Bookmarks store
  const { toggleBookmark: storeToggleBookmark, loadBookmarks, isBookmarked } = useBookmarksStore();

  // Load bookmarks on mount and when user changes
  useEffect(() => {
    loadBookmarks(userId);
  }, [userId]);

  // Request location permission and get user location (native only)
  useEffect(() => {
    if (Platform.OS === 'web') return;
    (async () => {
      const Location = await import('expo-location');
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      }
    })();
  }, []);

  const toggleBookmark = async (place: Place) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await storeToggleBookmark(place, userId);
  };

  
  const filteredPlaces = activeFilter === 'all'
    ? places
    : places.filter(p => p.category === activeFilter);

  const sortedPlaces = userLocation
    ? [...filteredPlaces].sort((a, b) => {
        const distA = getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distB = getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return distA - distB;
      })
    : filteredPlaces;

  // Hero places and recommendations
  const heroPlaces = sortedPlaces.slice(0, 5);
  const recommendedPlaces = sortedPlaces.slice(5);

  const handleFilterPress = async (filterId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveFilter(filterId);
  };

  const handleMarkerPress = async (place: Place) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    selectPlace(place);
    // Animate both maps (whichever is active)
    mapRef.current?.animateToRegion(
      { latitude: place.lat, longitude: place.lng, latitudeDelta: 0.01, longitudeDelta: 0.01 },
      300
    );
    fullscreenMapRef.current?.animateToRegion(
      { latitude: place.lat, longitude: place.lng, latitudeDelta: 0.01, longitudeDelta: 0.01 },
      300
    );
  };

  const handlePlacePress = async (place: Place) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    selectPlace(place);
    mapRef.current?.animateToRegion(
      { latitude: place.lat, longitude: place.lng, latitudeDelta: 0.01, longitudeDelta: 0.01 },
      300
    );
  };

  const handleMyLocation = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (userLocation) {
      mapRef.current?.animateToRegion({
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 300);
    } else {
      // Fallback to Seoul if location not available
      mapRef.current?.animateToRegion(CITIES.SEOUL, 300);
    }
  };

  const handleExpandMap = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsMapFullscreen(true);
  };

  const handleCloseFullscreenMap = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsMapFullscreen(false);
  };

  const handleFullscreenMyLocation = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (userLocation) {
      fullscreenMapRef.current?.animateToRegion({
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 300);
    } else {
      fullscreenMapRef.current?.animateToRegion(CITIES.SEOUL, 300);
    }
  };

  const formatDistance = (place: Place) => {
    if (!userLocation) return '';
    const dist = getDistance(userLocation.lat, userLocation.lng, place.lat, place.lng);
    if (dist < 1) return `${Math.round(dist * 1000)}m`;
    return `${dist.toFixed(1)}km`;
  };

  const getCategoryLabel = (cat: string) => {
    return CATEGORIES[cat as keyof typeof CATEGORIES]?.label || cat;
  };

  const getCategoryColor = (cat: string) => {
    return CATEGORIES[cat as keyof typeof CATEGORIES]?.color || COLORS.bone;
  };

  // Map parallax effect
  const mapScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  });

  const renderHeroItem = ({ item, index }: { item: Place; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      style={styles.heroSlide}
    >
      <TouchableOpacity
        style={styles.heroCard}
        onPress={() => handlePlacePress(item)}
        activeOpacity={0.95}
      >
        {isSafeImageUrl(item.image_url) ? (
          <Image source={{ uri: item.image_url }} style={styles.heroImage} />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Icon name={item.category as any || 'cafe'} size={48} color={getCategoryColor(item.category || '')} />
          </View>
        )}
        <LinearGradient
          colors={['transparent', COLORS.overlayLight, COLORS.overlayStrong]}
          locations={[0, 0.5, 1]}
          style={styles.heroGradient}
        />
        <View style={styles.heroContent}>
          <View style={[styles.heroBadge, { backgroundColor: getCategoryColor(item.category || '') }]}>
            <Icon name={item.category as any || 'cafe'} size={12} color={COLORS.coal} />
            <Text style={styles.heroBadgeText}>{getCategoryLabel(item.category || '')}</Text>
          </View>
          <Text style={styles.heroTitle} numberOfLines={2}>{item.name}</Text>
          {item.vibe && (
            <Text style={styles.heroVibe} numberOfLines={2}>{item.vibe}</Text>
          )}
          <View style={styles.heroMeta}>
            <Icon name="pin" size={12} color={COLORS.glassStrong} />
            <Text style={styles.heroMetaText}>{item.city}</Text>
          </View>
        </View>
        {/* Bookmark Button */}
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={(e) => {
            e.stopPropagation();
            toggleBookmark(item);
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon
            name="heart"
            size={20}
            color={isBookmarked(item.id) ? CATEGORIES.bar.color : COLORS.textInverse}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderPlaceCard = ({ item, index }: { item: Place; index: number }) => (
    <Animated.View
      entering={SlideInRight.delay(index * 50).springify()}
    >
      <TouchableOpacity
        style={styles.placeCard}
        onPress={() => handlePlacePress(item)}
        activeOpacity={0.9}
      >
        <View style={styles.placeImageContainer}>
          {isSafeImageUrl(item.image_url) ? (
            <Image source={{ uri: item.image_url }} style={styles.placeImage} />
          ) : (
            <View style={styles.placePlaceholder}>
              <Icon name={item.category as any || 'cafe'} size={32} color={getCategoryColor(item.category || '')} />
            </View>
          )}
          <View style={[styles.placeCategoryBadge, { backgroundColor: getCategoryColor(item.category || '') }]}>
            <Icon name={item.category as any || 'cafe'} size={12} color={COLORS.coal} />
          </View>
          {/* Bookmark Button */}
          <TouchableOpacity
            style={styles.placeBookmarkButton}
            onPress={(e) => {
              e.stopPropagation();
              toggleBookmark(item);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="heart"
              size={16}
              color={isBookmarked(item.id) ? CATEGORIES.bar.color : COLORS.textInverse}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.placeInfo}>
          <Text style={styles.placeName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.placeMeta} numberOfLines={1}>
            {getCategoryLabel(item.category || '')} · {item.city}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {FILTERS.map((filter, index) => (
            <Animated.View
              key={filter.id}
              entering={FadeIn.delay(index * 50)}
            >
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  activeFilter === filter.id && styles.filterChipActive,
                ]}
                onPress={() => handleFilterPress(filter.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter.id && styles.filterTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      <RNAnimated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={RNAnimated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Map Section with Parallax */}
        <RNAnimated.View style={[styles.mapContainer, { transform: [{ scale: mapScale }] }]}>
          <MapView
            key={`map-${mapLanguage}`}
            ref={mapRef}
            style={styles.map}
            initialRegion={CITIES.SEOUL}
            customMapStyle={mapStyle}
            showsUserLocation={true}
            showsMyLocationButton={false}
            showsCompass={false}
            showsScale={false}
            showsBuildings={false}
            showsTraffic={false}
            showsIndoors={false}
            pitchEnabled={false}
            rotateEnabled={false}
            onRegionChangeComplete={(region) => setZoomLevel(region.latitudeDelta)}
          >
            {sortedPlaces.map((place) => (
              <MapMarker
                key={place.id}
                place={place}
                onPress={handleMarkerPress}
                showName={zoomLevel < 0.02}
              />
            ))}
          </MapView>

          {/* Map Control Buttons - Bottom Right */}
          <View style={styles.mapButtonsContainer}>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={handleExpandMap}
              activeOpacity={0.8}
            >
              <Icon name="expand" size={16} color={COLORS.bone} strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={handleMyLocation}
              activeOpacity={0.8}
            >
              <Icon name="location" size={18} color={COLORS.bone} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </RNAnimated.View>

        {/* Hero Carousel */}
        {heroPlaces.length > 0 && (
          <View style={styles.heroSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>추천 공간</Text>
              <View style={styles.heroPagination}>
                {heroPlaces.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.paginationDot,
                      activeHeroIndex === i && styles.paginationDotActive,
                    ]}
                  />
                ))}
              </View>
            </View>
            <FlatList
              data={heroPlaces}
              renderItem={renderHeroItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.heroScroll}
              snapToInterval={HERO_WIDTH + SPACING.md}
              decelerationRate="fast"
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / (HERO_WIDTH + SPACING.md));
                setActiveHeroIndex(index);
              }}
            />
          </View>
        )}

        {/* Recommendations */}
        {recommendedPlaces.length > 0 && (
          <View style={styles.recommendSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>주변 공간</Text>
              <Text style={styles.sectionCount}>{recommendedPlaces.length}곳</Text>
            </View>
            <FlatList
              data={recommendedPlaces}
              renderItem={renderPlaceCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.placesScroll}
            />
          </View>
        )}

        {/* Empty State */}
        {sortedPlaces.length === 0 && !isLoading && (
          <SearchEmptyState onReset={() => setActiveFilter('all')} />
        )}

        <View style={styles.bottomPadding} />
      </RNAnimated.ScrollView>

      {/* Bottom Sheet */}
      {selectedPlace && (
        <SpaceCard place={selectedPlace} onClose={() => selectPlace(null)} />
      )}

      {/* Fullscreen Map Modal */}
      <Modal
        visible={isMapFullscreen}
        animationType="slide"
        statusBarTranslucent
        onRequestClose={handleCloseFullscreenMap}
      >
        <View style={styles.fullscreenContainer}>
          <StatusBar barStyle="light-content" />
          <MapView
            key={`fullscreen-map-${mapLanguage}`}
            ref={fullscreenMapRef}
            style={styles.fullscreenMap}
            initialRegion={CITIES.SEOUL}
            customMapStyle={mapStyle}
            showsUserLocation={true}
            showsMyLocationButton={false}
            showsCompass={false}
            showsScale={false}
            showsBuildings={false}
            showsTraffic={false}
            showsIndoors={false}
          >
            {sortedPlaces.map((place) => (
              <MapMarker
                key={place.id}
                place={place}
                onPress={handleMarkerPress}
                showName={true}
              />
            ))}
          </MapView>

          {/* Fullscreen Map Header */}
          <View style={styles.fullscreenHeader}>
            <TouchableOpacity
              style={styles.fullscreenCloseButton}
              onPress={handleCloseFullscreenMap}
              activeOpacity={0.8}
            >
              <Icon name="close" size={20} color={COLORS.bone} strokeWidth={2} />
            </TouchableOpacity>
            <Text style={styles.fullscreenTitle}>지도</Text>
            <View style={styles.fullscreenHeaderSpacer} />
          </View>

          {/* Fullscreen Map Buttons */}
          <View style={styles.fullscreenButtonsContainer}>
            <TouchableOpacity
              style={styles.fullscreenMapButton}
              onPress={handleFullscreenMyLocation}
              activeOpacity={0.8}
            >
              <Icon name="location" size={20} color={COLORS.bone} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Filter Chips in Fullscreen */}
          <View style={styles.fullscreenFilterContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.fullscreenFilterScroll}
            >
              {FILTERS.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.fullscreenFilterChip,
                    activeFilter === filter.id && styles.fullscreenFilterChipActive,
                  ]}
                  onPress={() => handleFilterPress(filter.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.fullscreenFilterText,
                      activeFilter === filter.id && styles.fullscreenFilterTextActive,
                    ]}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Selected Place Card in Fullscreen */}
          {selectedPlace && (
            <TouchableOpacity
              style={styles.fullscreenPlaceCard}
              activeOpacity={0.95}
              onPress={() => {
                setIsMapFullscreen(false);
              }}
            >
              {isSafeImageUrl(selectedPlace.image_url) ? (
                <Image source={{ uri: selectedPlace.image_url }} style={styles.fullscreenPlaceImage} />
              ) : (
                <View style={[styles.fullscreenPlaceImage, styles.fullscreenPlacePlaceholder]}>
                  <Icon name={selectedPlace.category as any || 'cafe'} size={24} color={COLORS.graphite} />
                </View>
              )}
              <View style={styles.fullscreenPlaceInfo}>
                <Text style={styles.fullscreenPlaceName} numberOfLines={1}>{selectedPlace.name}</Text>
                <Text style={styles.fullscreenPlaceMeta} numberOfLines={1}>
                  {getCategoryLabel(selectedPlace.category || '')} · {selectedPlace.city}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.fullscreenPlaceBookmark}
                onPress={(e) => {
                  e.stopPropagation();
                  toggleBookmark(selectedPlace);
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon
                  name="heart"
                  size={20}
                  color={isBookmarked(selectedPlace.id) ? CATEGORIES.bar.color : COLORS.coal}
                />
              </TouchableOpacity>
              <Icon name="chevronRight" size={20} color={COLORS.graphite} />
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bone,
  },
  filterContainer: {
    backgroundColor: COLORS.bone,
    paddingTop: SPACING.xl + SPACING.xl,
  },
  filterScroll: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    gap: SPACING.xs,
  },
  filterChip: {
    paddingHorizontal: SPACING.md + 2,
    paddingVertical: SPACING.xs + 3,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.xs,
  },
  filterChipActive: {
    backgroundColor: COLORS.coal,
    borderColor: COLORS.coal,
  },
  filterText: {
    fontSize: 13,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text,
    letterSpacing: -0.2,
  },
  filterTextActive: {
    color: COLORS.textInverse,
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: MAP_HEIGHT,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapButtonsContainer: {
    position: 'absolute',
    bottom: SPACING.sm,
    right: SPACING.sm,
    gap: SPACING.xs,
  },
  mapButton: {
    backgroundColor: COLORS.coal,
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  heroSection: {
    marginTop: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.title,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  sectionCount: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  heroPagination: {
    flexDirection: 'row',
    gap: 6,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.disabled,
  },
  paginationDotActive: {
    backgroundColor: COLORS.coal,
    width: 18,
  },
  heroScroll: {
    paddingHorizontal: SPACING.md,
  },
  heroSlide: {
    width: HERO_WIDTH,
    marginRight: SPACING.md,
  },
  heroCard: {
    height: HERO_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.obsidian,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.obsidian,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  heroContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: SPACING.md + 2,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 5,
    marginBottom: SPACING.sm,
  },
  heroBadgeText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.coal,
    letterSpacing: -0.2,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textInverse,
    lineHeight: 28,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  heroVibe: {
    fontSize: 13,
    color: COLORS.glassStrong,
    lineHeight: 18,
    letterSpacing: -0.2,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: SPACING.sm,
  },
  heroMetaText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.glassStrong,
    letterSpacing: -0.2,
  },
  bookmarkButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.overlayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendSection: {
    marginTop: SPACING.xl,
  },
  placesScroll: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  placeCard: {
    width: PLACE_CARD_WIDTH,
    marginRight: SPACING.sm + 2,
  },
  placeImageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  placeImage: {
    width: '100%',
    height: PLACE_CARD_WIDTH,
    backgroundColor: COLORS.obsidian,
  },
  placePlaceholder: {
    width: '100%',
    height: PLACE_CARD_WIDTH,
    backgroundColor: COLORS.obsidian,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeCategoryBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeBookmarkButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.overlayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeInfo: {
    paddingTop: SPACING.sm,
    paddingHorizontal: 2,
  },
  placeName: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  placeMeta: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.textLight,
    marginTop: 3,
    letterSpacing: -0.2,
  },
  bottomPadding: {
    height: SPACING.lg,
  },
  // Fullscreen Map Styles
  fullscreenContainer: {
    flex: 1,
    backgroundColor: COLORS.coal,
  },
  fullscreenMap: {
    flex: 1,
  },
  fullscreenHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.xl + SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.overlayModal,
  },
  fullscreenCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(26, 26, 26, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.glassMedium,
  },
  fullscreenTitle: {
    fontSize: 17,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.bone,
    letterSpacing: -0.3,
  },
  fullscreenHeaderSpacer: {
    width: 40,
  },
  fullscreenButtonsContainer: {
    position: 'absolute',
    bottom: SPACING.xl * 3,
    right: SPACING.md,
    gap: SPACING.sm,
  },
  fullscreenMapButton: {
    backgroundColor: COLORS.coal,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fullscreenFilterContainer: {
    position: 'absolute',
    bottom: SPACING.xl,
    left: 0,
    right: 0,
  },
  fullscreenFilterScroll: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.xs,
  },
  fullscreenFilterChip: {
    paddingHorizontal: SPACING.md + 2,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.overlayStrong,
    marginRight: SPACING.xs,
  },
  fullscreenFilterChipActive: {
    backgroundColor: COLORS.bone,
  },
  fullscreenFilterText: {
    fontSize: 13,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.bone,
    letterSpacing: -0.2,
  },
  fullscreenFilterTextActive: {
    color: COLORS.coal,
  },
  fullscreenPlaceCard: {
    position: 'absolute',
    bottom: SPACING.xl * 4 + 20,
    left: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.sm,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  fullscreenPlaceImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  fullscreenPlacePlaceholder: {
    backgroundColor: COLORS.surfaceDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenPlaceInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  fullscreenPlaceName: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  fullscreenPlaceMeta: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 2,
  },
  fullscreenPlaceBookmark: {
    padding: SPACING.sm,
  },
});
