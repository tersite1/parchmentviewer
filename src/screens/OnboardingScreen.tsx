import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import * as Haptics from '../utils/haptics';
import { COLORS, SPACING } from '../config/constants';
import { storage } from '../utils/storage';
import { Icon, IconName } from '../components/Icon';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  icon: IconName;
  iconColor: string;
  title: string;
  subtitle: string;
  description: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    icon: 'map',
    iconColor: '#A8D5BA',
    title: '큐레이팅된 공간',
    subtitle: 'Curated Spaces',
    description: '감각적인 카페, 레스토랑, 문화공간을\n직접 발굴하고 엄선했습니다.',
  },
  {
    id: '2',
    icon: 'pin',
    iconColor: '#F5C6AA',
    title: '지도에서 발견',
    subtitle: 'Discover on Map',
    description: '주변의 숨겨진 공간들을\n지도에서 한눈에 확인하세요.',
  },
  {
    id: '3',
    icon: 'heart',
    iconColor: '#E8B4B8',
    title: '나만의 컬렉션',
    subtitle: 'Your Collection',
    description: '마음에 드는 공간을 북마크하고\n나만의 리스트를 만들어보세요.',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    handleComplete();
  };

  const handleComplete = async () => {
    await storage.setItem('onboardingComplete', 'true');
    onComplete();
  };

  const renderSlide = ({ item, index }: { item: OnboardingSlide; index: number }) => (
    <View style={styles.slide}>
      <View style={styles.slideContent}>
        {/* Icon */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={[styles.iconContainer, { backgroundColor: item.iconColor }]}
        >
          <Icon name={item.icon} size={48} color={COLORS.coal} />
        </Animated.View>

        {/* Text */}
        <Animated.View entering={FadeInUp.delay(300).springify()}>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Animated.View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>건너뛰기</Text>
      </TouchableOpacity>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      />

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Pagination */}
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.dotActive,
              ]}
            />
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex === SLIDES.length - 1 ? '시작하기' : '다음'}
          </Text>
          <Icon name="chevronRight" size={18} color={COLORS.coal} />
        </TouchableOpacity>
      </View>

      {/* Brand */}
      <Animated.View entering={FadeIn.delay(500)} style={styles.brand}>
        <Text style={styles.brandText}>PARCHMENT</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.coal,
  },
  skipButton: {
    position: 'absolute',
    top: SPACING.xl + SPACING.lg,
    right: SPACING.lg,
    zIndex: 10,
    padding: SPACING.sm,
  },
  skipText: {
    fontSize: 14,
    color: COLORS.graphite,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  slideContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.graphite,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.bone,
    textAlign: 'center',
    letterSpacing: -1,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: 16,
    color: COLORS.graphite,
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: -0.3,
  },
  bottomSection: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl * 2,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.graphite,
  },
  dotActive: {
    backgroundColor: COLORS.bone,
    width: 24,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bone,
    paddingVertical: SPACING.md + 2,
    borderRadius: 12,
    gap: SPACING.xs,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.coal,
  },
  brand: {
    position: 'absolute',
    bottom: SPACING.lg,
    alignSelf: 'center',
  },
  brandText: {
    fontSize: 10,
    fontWeight: '300',
    color: COLORS.graphite,
    letterSpacing: 4,
  },
});
