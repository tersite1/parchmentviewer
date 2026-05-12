import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  Animated,
  Share,
} from 'react-native';
import * as Haptics from '../utils/haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, TYPOGRAPHY } from '../config/constants';
import { getCategoryColor, getCategoryLabel } from '../utils/category';
import { Icon } from './Icon';
import { useBookmarksStore } from '../stores/bookmarksStore';
import { useAuthStore } from '../stores/authStore';
import type { Place } from '../types/database';
import { isSafeImageUrl, filterSafeImageUrls } from '../utils/sanitizeUrl';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const CARD_WIDTH = Math.min(420, SCREEN_W - SPACING.lg * 2);
const CARD_MAX_HEIGHT = Math.min(720, SCREEN_H * 0.86);
const HERO_HEIGHT = 220;

interface SpaceCardProps {
  place: Place;
  onClose: () => void;
}

export function SpaceCard({ place, onClose }: SpaceCardProps) {
  const { user } = useAuthStore();
  const { isBookmarked, toggleBookmark } = useBookmarksStore();
  const bookmarked = isBookmarked(place.id);
  const [imgIndex, setImgIndex] = useState(0);

  const catColor = getCategoryColor(place.category || '');
  const catLabel = getCategoryLabel(place.category || '');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        damping: 18,
        stiffness: 220,
        mass: 0.6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.94,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        message: `${place.name} — ${catLabel} · ${place.city}`,
      });
    } catch {}
  };

  const handleToggleBookmark = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleBookmark(place, user?.id);
  };

  const handleDirections = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const url = Platform.select({
      ios: `maps://app?daddr=${place.lat},${place.lng}`,
      android: `google.navigation:q=${place.lat},${place.lng}`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`,
    });
    if (url) Linking.openURL(url);
  };

  const images = place.gallery_urls?.length
    ? filterSafeImageUrls(place.gallery_urls)
    : isSafeImageUrl(place.image_url)
      ? [place.image_url]
      : [];

  const menuItems = place.menu_items || [];
  const showMenu =
    (place.category === 'cafe' || place.category === 'restaurant') && menuItems.length > 0;

  return (
    <View style={styles.container} pointerEvents="box-none">
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} accessibilityLabel="닫기" />
      </Animated.View>

      <Animated.View
        style={[
          styles.card,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: SPACING.lg }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero image */}
          <View style={styles.imageWrap}>
            {images.length > 0 ? (
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                  setImgIndex(Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH));
                }}
              >
                {images.map((uri, i) => (
                  <Image key={i} source={{ uri }} style={styles.image} />
                ))}
              </ScrollView>
            ) : (
              <View style={styles.noImage}>
                <Icon name={(place.category as any) || 'cafe'} size={48} color={catColor} />
              </View>
            )}

            <LinearGradient
              colors={['transparent', 'rgba(10,10,10,0.65)']}
              style={styles.gradient}
            />

            {/* Close X — top right */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={handleClose}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
              accessibilityLabel="닫기"
            >
              <Icon name="close" size={18} color={COLORS.bone} />
            </TouchableOpacity>

            {/* Dots */}
            {images.length > 1 && (
              <View style={styles.dots}>
                {images.map((_, i) => (
                  <View key={i} style={[styles.dot, imgIndex === i && styles.dotActive]} />
                ))}
              </View>
            )}
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.catRow}>
                <View style={[styles.catDot, { backgroundColor: catColor }]} />
                <Text style={styles.catText}>{catLabel}</Text>
                <Text style={styles.divider}>·</Text>
                <Text style={styles.cityText}>{place.city}</Text>
              </View>
              <Text style={styles.name}>{place.name}</Text>
              {place.address && <Text style={styles.address}>{place.address}</Text>}
            </View>

            {/* Vibe */}
            {place.vibe && (
              <View style={styles.vibeWrap}>
                <Text style={styles.vibe}>{place.vibe}</Text>
                {place.curated_by && <Text style={styles.curator}>— {place.curated_by}</Text>}
              </View>
            )}

            {/* Menu */}
            {showMenu && (
              <View style={styles.menuWrap}>
                {menuItems.slice(0, 3).map((item, i) => (
                  <View key={i} style={styles.menuRow}>
                    <Text style={styles.menuName}>{item.name}</Text>
                    <Text style={styles.menuPrice}>{item.price}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.dirBtn}
                onPress={handleDirections}
                accessibilityLabel="길찾기"
              >
                <Text style={styles.dirText}>길찾기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={handleShare}
                accessibilityLabel="공유"
              >
                <Icon name="share" size={20} color={COLORS.bone} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconBtn, bookmarked && styles.iconBtnActive]}
                onPress={handleToggleBookmark}
                accessibilityLabel={bookmarked ? '북마크 해제' : '북마크'}
              >
                <Icon
                  name="heart"
                  size={20}
                  color={bookmarked ? COLORS.heartActive : COLORS.bone}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlayStrong,
  },
  card: {
    width: CARD_WIDTH,
    maxHeight: CARD_MAX_HEIGHT,
    backgroundColor: COLORS.coal,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.glassHint,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.55,
    shadowRadius: 40,
    elevation: 24,
  },
  imageWrap: {
    width: CARD_WIDTH,
    height: HERO_HEIGHT,
    position: 'relative',
    backgroundColor: COLORS.obsidian,
  },
  image: {
    width: CARD_WIDTH,
    height: HERO_HEIGHT,
  },
  noImage: {
    width: CARD_WIDTH,
    height: HERO_HEIGHT,
    backgroundColor: COLORS.obsidian,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  closeBtn: {
    position: 'absolute',
    top: SPACING.sm + 4,
    right: SPACING.sm + 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(10,10,10,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.glassHint,
  },
  dots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.glass,
  },
  dotActive: {
    backgroundColor: COLORS.bone,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  header: {
    marginBottom: SPACING.md,
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: SPACING.sm,
  },
  catDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  catText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.parchmentDefault,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.parchmentGhost,
  },
  cityText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.parchmentMuted,
  },
  name: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.light,
    color: COLORS.bone,
    letterSpacing: -0.5,
  },
  address: {
    fontSize: TYPOGRAPHY.sizes.meta,
    color: COLORS.parchmentSecondary,
    marginTop: 4,
  },
  vibeWrap: {
    marginBottom: SPACING.md,
  },
  vibe: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.parchmentStrong,
    lineHeight: 22,
  },
  curator: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.parchmentFaded,
    marginTop: 6,
  },
  menuWrap: {
    marginBottom: SPACING.md,
    paddingTop: SPACING.sm + SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.glassHint,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  menuName: {
    fontSize: TYPOGRAPHY.sizes.meta,
    color: COLORS.parchment,
  },
  menuPrice: {
    fontSize: TYPOGRAPHY.sizes.meta,
    color: COLORS.parchmentSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: SPACING.sm,
  },
  dirBtn: {
    flex: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bone,
    borderRadius: 12,
  },
  dirText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.coal,
  },
  iconBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.glassSubtle,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.glassHint,
  },
  iconBtnActive: {
    backgroundColor: COLORS.heartActiveSubtle,
    borderColor: COLORS.heartActive,
  },
});
