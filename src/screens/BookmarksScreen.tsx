import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, CATEGORIES, TYPOGRAPHY } from '../config/constants';
import { Icon } from '../components/Icon';
import { BookmarkEmptyState } from '../components/EmptyState';
import { useBookmarksStore } from '../stores/bookmarksStore';
import { usePlacesStore } from '../stores/placesStore';
import { useAuthStore } from '../stores/authStore';
import type { Place } from '../types/database';
import { isSafeImageUrl } from '../utils/sanitizeUrl';

interface BookmarksScreenProps {
  navigation: any;
}

export function BookmarksScreen({ navigation }: BookmarksScreenProps) {
  const { user } = useAuthStore();
  const userId = user?.id || null;
  const { bookmarkedPlaces, loadBookmarks, removeBookmark } = useBookmarksStore();
  const { selectPlace } = usePlacesStore();

  useEffect(() => {
    loadBookmarks(userId);
  }, [userId]);

  const handleExplore = () => {
    navigation.navigate('홈');
  };

  const handlePlacePress = (place: Place) => {
    selectPlace(place);
    navigation.navigate('홈');
  };

  const handleRemoveBookmark = async (placeId: string) => {
    await removeBookmark(placeId, userId);
  };

  const renderBookmark = ({ item }: { item: Place }) => (
    <TouchableOpacity
      style={styles.bookmarkItem}
      activeOpacity={0.8}
      onPress={() => handlePlacePress(item)}
    >
      {isSafeImageUrl(item.image_url) ? (
        <Image source={{ uri: item.image_url }} style={styles.bookmarkImage} />
      ) : (
        <View style={styles.bookmarkPlaceholder}>
          <Icon name={item.category as any || 'cafe'} size={24} color={COLORS.graphite} />
        </View>
      )}
      <View style={styles.bookmarkInfo}>
        <Text style={styles.bookmarkName}>{item.name}</Text>
        <Text style={styles.bookmarkMeta}>
          {CATEGORIES[item.category as keyof typeof CATEGORIES]?.label || item.category} · {item.city}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveBookmark(item.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.removeButton}
      >
        <Icon name="heart" size={20} color={CATEGORIES.bar.color} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>북마크</Text>
        <Text style={styles.subtitle}>저장한 공간 {bookmarkedPlaces.length}곳</Text>
      </View>

      {bookmarkedPlaces.length > 0 ? (
        <FlatList
          data={bookmarkedPlaces}
          renderItem={renderBookmark}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <BookmarkEmptyState onExplore={handleExplore} />
      )}
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
    backgroundColor: COLORS.coal,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.bone,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.graphite,
    marginTop: SPACING.xs,
  },
  list: {
    padding: SPACING.md,
  },
  bookmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  bookmarkImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  bookmarkPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  bookmarkName: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  bookmarkMeta: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 3,
  },
  removeButton: {
    padding: SPACING.sm,
  },
});
