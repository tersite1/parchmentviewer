import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import * as Haptics from '../utils/haptics';
import { COLORS, SPACING, CATEGORIES } from '../config/constants';
import { Icon } from '../components/Icon';
import { usePlacesStore } from '../stores/placesStore';
import { useRegionsStore, Region } from '../stores/regionsStore';
import type { Place } from '../types/database';

interface SearchScreenProps {
  navigation: any;
}

interface CityData {
  id: string;
  name: string;
  icon_url: string | null;
  places: Place[];
  count: number;
  subRegions: { id: string; name: string; places: Place[]; count: number }[];
}

interface CountryData {
  id: string;
  name: string;
  icon_url: string | null;
  cities: CityData[];
  places: Place[];
  count: number;
}

// Group places by country > city > sub-region using backend regions and region_id
function groupPlacesByRegions(places: Place[], regions: Region[]): CountryData[] {
  // Separate parent regions and sub-regions
  const parentRegions = regions.filter(r => !r.parent_id);

  // Build region lookup by id
  const regionById: Record<string, Region> = {};
  regions.forEach(r => { regionById[r.id] = r; });

  // Get unique countries with their icons and order
  const countryData: Record<string, { icon_url: string | null; order: number }> = {};
  parentRegions.forEach((r) => {
    if (!countryData[r.country]) {
      countryData[r.country] = { icon_url: r.icon_url, order: r.display_order };
    }
  });

  const countryMap: Record<string, {
    icon_url: string | null;
    cities: Record<string, {
      id: string;
      icon_url: string | null;
      places: Place[];
      subRegions: Record<string, { id: string; places: Place[] }>;
    }>;
  }> = {};

  places.forEach((place) => {
    let country = '기타';
    let cityName = place.city || '기타';
    let cityId = cityName;
    let cityIcon: string | null = null;
    let subRegionName: string | null = null;
    let subRegionId: string | null = null;

    // If place has region_id, use it for precise grouping
    if (place.region_id && regionById[place.region_id]) {
      const region = regionById[place.region_id];

      if (region.parent_id) {
        // It's a sub-region
        const parentRegion = regionById[region.parent_id];
        if (parentRegion) {
          country = parentRegion.country;
          cityName = parentRegion.name;
          cityId = parentRegion.id;
          cityIcon = parentRegion.icon_url;
          subRegionName = region.name;
          subRegionId = region.id;
        }
      } else {
        // It's a top-level region (city)
        country = region.country;
        cityName = region.name;
        cityId = region.id;
        cityIcon = region.icon_url;
      }
    } else {
      // Fallback to city name matching
      const matchedRegion = parentRegions.find(r =>
        r.name.toUpperCase() === cityName.toUpperCase()
      );
      if (matchedRegion) {
        country = matchedRegion.country;
        cityId = matchedRegion.id;
        cityIcon = matchedRegion.icon_url;
      }
    }

    // Initialize country if needed
    if (!countryMap[country]) {
      countryMap[country] = {
        icon_url: countryData[country]?.icon_url || null,
        cities: {},
      };
    }

    // Initialize city if needed
    if (!countryMap[country].cities[cityName]) {
      countryMap[country].cities[cityName] = {
        id: cityId,
        icon_url: cityIcon,
        places: [],
        subRegions: {},
      };
    }

    // Add place to sub-region or city
    if (subRegionName && subRegionId) {
      if (!countryMap[country].cities[cityName].subRegions[subRegionName]) {
        countryMap[country].cities[cityName].subRegions[subRegionName] = {
          id: subRegionId,
          places: [],
        };
      }
      countryMap[country].cities[cityName].subRegions[subRegionName].places.push(place);
    }

    // Always add to city places for total count
    countryMap[country].cities[cityName].places.push(place);
  });

  return Object.entries(countryMap)
    .map(([country, data]) => {
      const cities = Object.entries(data.cities).map(([cityName, cityData]) => ({
        id: cityData.id,
        name: cityName,
        icon_url: cityData.icon_url,
        places: cityData.places,
        count: cityData.places.length,
        subRegions: Object.entries(cityData.subRegions).map(([subName, subData]) => ({
          id: subData.id,
          name: subName,
          places: subData.places,
          count: subData.places.length,
        })),
      }));
      const allPlaces = cities.flatMap(c => c.places);
      return {
        id: country.toLowerCase(),
        name: country,
        icon_url: data.icon_url,
        cities,
        places: allPlaces,
        count: allPlaces.length,
      };
    })
    .sort((a, b) => {
      const orderA = countryData[a.name]?.order ?? 999;
      const orderB = countryData[b.name]?.order ?? 999;
      return orderA - orderB;
    });
}

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const accordionAnim = {
  duration: 250,
  create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
  update: { type: LayoutAnimation.Types.easeInEaseOut },
  delete: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
};

export function SearchScreen({ navigation }: SearchScreenProps) {
  const { places, selectPlace } = usePlacesStore();
  const { regions, isLoading: regionsLoading, fetchRegions } = useRegionsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [expandedCity, setExpandedCity] = useState<string | null>(null);

  // Fetch regions on mount
  useEffect(() => {
    fetchRegions();
  }, []);

  // Group places by country from backend regions
  const countries = useMemo(() => groupPlacesByRegions(places, regions), [places, regions]);

  // Filter countries and places based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;

    const query = searchQuery.toLowerCase();
    return countries
      .map((country) => ({
        ...country,
        cities: country.cities
          .map((city) => ({
            ...city,
            places: city.places.filter(
              (place) =>
                place.name.toLowerCase().includes(query) ||
                place.city.toLowerCase().includes(query) ||
                country.name.toLowerCase().includes(query) ||
                city.name.toLowerCase().includes(query) ||
                (place.vibe && place.vibe.toLowerCase().includes(query))
            ),
            count: city.places.filter(
              (place) =>
                place.name.toLowerCase().includes(query) ||
                place.city.toLowerCase().includes(query) ||
                country.name.toLowerCase().includes(query) ||
                city.name.toLowerCase().includes(query) ||
                (place.vibe && place.vibe.toLowerCase().includes(query))
            ).length,
          }))
          .filter((city) => city.places.length > 0),
      }))
      .map((country) => ({
        ...country,
        places: country.cities.flatMap(c => c.places),
        count: country.cities.reduce((sum, c) => sum + c.places.length, 0),
      }))
      .filter((country) => country.count > 0);
  }, [countries, searchQuery]);

  const handleCountryPress = async (countryId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    LayoutAnimation.configureNext(accordionAnim);
    setExpandedCountry(expandedCountry === countryId ? null : countryId);
    setExpandedCity(null);
  };

  const handleCityPress = async (cityName: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    LayoutAnimation.configureNext(accordionAnim);
    setExpandedCity(expandedCity === cityName ? null : cityName);
  };

  const handlePlacePress = async (place: Place) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    selectPlace(place);
    navigation.navigate('홈');
  };

  const getCategoryColor = (category: string) => {
    return CATEGORIES[category as keyof typeof CATEGORIES]?.color || COLORS.textLight;
  };

  const totalPlaces = places.length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>지역 검색</Text>
        <Text style={styles.subtitle}>큐레이팅된 {totalPlaces}개의 공간</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={18} color={COLORS.textLight} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="공간, 지역 검색..."
            placeholderTextColor={COLORS.textLight}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close" size={18} color={COLORS.textLight} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Country List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <View key={country.id} style={styles.countrySection}>
              <TouchableOpacity
                style={styles.countryHeader}
                onPress={() => handleCountryPress(country.id)}
                activeOpacity={0.7}
              >
                <View style={styles.countryInfo}>
                  {country.icon_url && (
                    <Image source={{ uri: country.icon_url }} style={styles.countryIcon} />
                  )}
                  <Text style={styles.countryName}>{country.name}</Text>
                  <Text style={styles.countryCount}>{country.count}곳</Text>
                </View>
                <View
                  style={{
                    transform: [{ rotate: expandedCountry === country.id ? '90deg' : '0deg' }],
                  }}
                >
                  <Icon name="chevronRight" size={20} color={COLORS.graphite} />
                </View>
              </TouchableOpacity>

              {expandedCountry === country.id && (
                <View style={styles.citiesContainer}>
                  {country.cities.map((city) => (
                    <View key={city.name} style={styles.citySection}>
                      <TouchableOpacity
                        style={styles.cityHeader}
                        onPress={() => handleCityPress(city.name)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.cityInfo}>
                          {city.icon_url && (
                            <Image source={{ uri: city.icon_url }} style={styles.cityIcon} />
                          )}
                          <Text style={styles.cityName}>{city.name}</Text>
                          <Text style={styles.cityCount}>{city.count}곳</Text>
                        </View>
                        <View
                          style={{
                            transform: [{ rotate: expandedCity === city.name ? '90deg' : '0deg' }],
                          }}
                        >
                          <Icon name="chevronRight" size={16} color={COLORS.textLight} />
                        </View>
                      </TouchableOpacity>

                      {expandedCity === city.name && (
                        <View style={styles.placesContainer}>
                          {city.places.map((place) => (
                            <TouchableOpacity
                              key={place.id}
                              style={styles.placeItem}
                              onPress={() => handlePlacePress(place)}
                              activeOpacity={0.7}
                            >
                              <View
                                style={[
                                  styles.placeCategoryDot,
                                  { backgroundColor: getCategoryColor(place.category) },
                                ]}
                              />
                              <View style={styles.placeInfo}>
                                <Text style={styles.placeName}>{place.name}</Text>
                                {place.vibe && (
                                  <Text style={styles.placeVibe} numberOfLines={1}>
                                    {place.vibe}
                                  </Text>
                                )}
                              </View>
                              <Icon name="chevronRight" size={16} color={COLORS.textLight} />
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="search" size={48} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>검색 결과 없음</Text>
            <Text style={styles.emptyText}>다른 검색어를 입력해보세요</Text>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bone,
  },
  header: {
    paddingTop: SPACING.xl + SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.bone,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.coal,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.bone,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  countrySection: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  countryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: '#FFFFFF',
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  countryIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 4,
  },
  countryName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.coal,
    letterSpacing: 1,
  },
  countryCount: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  citiesContainer: {
    backgroundColor: COLORS.bone,
  },
  citySection: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  cityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingLeft: SPACING.xl,
    backgroundColor: COLORS.bone,
  },
  cityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  cityIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 4,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  cityCount: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  placesContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    paddingLeft: SPACING.xl + SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    gap: SPACING.sm,
  },
  placeCategoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
  },
  placeVibe: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 3,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  bottomPadding: {
    height: SPACING.lg,
  },
});
