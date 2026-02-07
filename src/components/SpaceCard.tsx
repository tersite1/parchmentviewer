import React, { useState, useEffect, useRef } from 'react';
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
  PanResponder,
  Share,
} from 'react-native';
import * as Haptics from '../utils/haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, CATEGORIES } from '../config/constants';
import { Icon } from './Icon';
import { useBookmarksStore } from '../stores/bookmarksStore';
import { useAuthStore } from '../stores/authStore';
import type { Place } from '../types/database';
import { isSafeImageUrl, filterSafeImageUrls } from '../utils/sanitizeUrl';

const { width, height } = Dimensions.get('window');
const SHEET_HEIGHT = height * 0.65;

interface SpaceCardProps {
  place: Place;
  onClose: () => void;
}

export function SpaceCard({ place, onClose }: SpaceCardProps) {
  const { user } = useAuthStore();
  const { isBookmarked, toggleBookmark } = useBookmarksStore();
  const bookmarked = isBookmarked(place.id);
  const [imgIndex, setImgIndex] = useState(0);

  const catColor = CATEGORIES[place.category as keyof typeof CATEGORIES]?.color || COLORS.bone;
  const catLabel = CATEGORIES[place.category as keyof typeof CATEGORIES]?.label || place.category;

  const slideAnim = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: SHEET_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gs) => {
        if (gs.dy > 0) {
          slideAnim.setValue(gs.dy);
          fadeAnim.setValue(Math.max(0, 1 - gs.dy / SHEET_HEIGHT));
        }
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 80 || gs.vy > 0.5) {
          handleClose();
        } else {
          Animated.parallel([
            Animated.spring(slideAnim, {
              toValue: 0,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
    })
  ).current;

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        message: `${place.name} — ${catLabel} · ${place.city}`,
      });
    } catch {}
  };

  const images = place.gallery_urls?.length
    ? filterSafeImageUrls(place.gallery_urls)
    : isSafeImageUrl(place.image_url)
      ? [place.image_url]
      : [];

  const menuItems = place.menu_items || [];
  const showMenu = (place.category === 'cafe' || place.category === 'restaurant') && menuItems.length > 0;

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

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.sheet,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        {/* Handle bar — drag to dismiss */}
        <View style={styles.handleBar} {...panResponder.panHandlers}>
          <View style={styles.handle} />
        </View>

        {/* Image - full bleed */}
        <View style={styles.imageWrap}>
          {images.length > 0 ? (
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                setImgIndex(Math.round(e.nativeEvent.contentOffset.x / width));
              }}
            >
              {images.map((uri, i) => (
                <Image key={i} source={{ uri }} style={styles.image} />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.noImage}>
              <Icon name={place.category as any} size={48} color={catColor} />
            </View>
          )}

          <LinearGradient
            colors={['transparent', 'rgba(26,26,26,1)']}
            style={styles.gradient}
          />

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
            {place.address && (
              <Text style={styles.address}>{place.address}</Text>
            )}
          </View>

          {/* Vibe */}
          {place.vibe && (
            <View style={styles.vibeWrap}>
              <Text style={styles.vibe}>{place.vibe}</Text>
              {place.curated_by && (
                <Text style={styles.curator}>— {place.curated_by}</Text>
              )}
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
            <TouchableOpacity style={styles.dirBtn} onPress={handleDirections}>
              <Text style={styles.dirText}>길찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
              <Icon name="share" size={20} color={COLORS.bone} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.heartBtn, bookmarked && styles.heartBtnActive]}
              onPress={handleToggleBookmark}
            >
              <Icon name="heart" size={20} color={bookmarked ? '#E74C3C' : COLORS.bone} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    height: SHEET_HEIGHT,
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  handleBar: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
  imageWrap: {
    width: width,
    height: 200,
    position: 'relative',
  },
  image: {
    width: width,
    height: 200,
  },
  noImage: {
    width: width,
    height: 200,
    backgroundColor: '#111',
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
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: {
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 16,
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  catDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  catText: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(227,218,201,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    fontSize: 11,
    color: 'rgba(227,218,201,0.3)',
  },
  cityText: {
    fontSize: 11,
    color: 'rgba(227,218,201,0.4)',
  },
  name: {
    fontSize: 24,
    fontWeight: '300',
    color: COLORS.bone,
    letterSpacing: -0.5,
  },
  address: {
    fontSize: 13,
    color: 'rgba(227,218,201,0.45)',
    marginTop: 4,
  },
  vibeWrap: {
    marginBottom: 16,
  },
  vibe: {
    fontSize: 14,
    color: 'rgba(227,218,201,0.7)',
    lineHeight: 20,
  },
  curator: {
    fontSize: 12,
    color: 'rgba(227,218,201,0.35)',
    marginTop: 6,
  },
  menuWrap: {
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  menuName: {
    fontSize: 13,
    color: 'rgba(227,218,201,0.8)',
  },
  menuPrice: {
    fontSize: 13,
    color: 'rgba(227,218,201,0.5)',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
    paddingBottom: 20,
  },
  dirBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bone,
    paddingVertical: 14,
    borderRadius: 10,
  },
  dirText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  shareBtn: {
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
  },
  heartBtn: {
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
  },
  heartBtnActive: {
    backgroundColor: 'rgba(231,76,60,0.15)',
  },
});
