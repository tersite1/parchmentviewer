import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS, SPACING, CATEGORIES, TYPOGRAPHY } from '../config/constants';
import { Icon, IconName } from './Icon';

interface EmptyStateProps {
  icon: IconName;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'search' | 'bookmark' | 'error';
}

const VARIANT_COLORS = {
  default: CATEGORIES.cafe.color,
  search: COLORS.searchAccent,
  bookmark: CATEGORIES.bar.color,
  error: COLORS.errorSubtle,
};

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = 'default',
}: EmptyStateProps) {
  const iconBgColor = VARIANT_COLORS[variant];

  return (
    <Animated.View
      entering={FadeInDown.springify()}
      style={styles.container}
    >
      {/* Decorative circles */}
      <View style={styles.decoration}>
        <View style={[styles.circle, styles.circleOuter, { borderColor: iconBgColor }]} />
        <View style={[styles.circle, styles.circleMiddle, { borderColor: iconBgColor }]} />
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <Icon name={icon} size={32} color={COLORS.coal} />
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {actionLabel && onAction && (
        <TouchableOpacity style={styles.actionButton} onPress={onAction}>
          <Text style={styles.actionText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

// Preset empty states
export function SearchEmptyState({ onReset }: { onReset?: () => void }) {
  return (
    <EmptyState
      icon="search"
      title="검색 결과가 없습니다"
      description="다른 검색어나 필터를 시도해보세요"
      actionLabel={onReset ? "필터 초기화" : undefined}
      onAction={onReset}
      variant="search"
    />
  );
}

export function BookmarkEmptyState({ onExplore }: { onExplore?: () => void }) {
  return (
    <EmptyState
      icon="bookmark"
      title="저장된 공간이 없습니다"
      description="마음에 드는 공간을 북마크해보세요"
      actionLabel={onExplore ? "공간 둘러보기" : undefined}
      onAction={onExplore}
      variant="bookmark"
    />
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <EmptyState
      icon="close"
      title="문제가 발생했습니다"
      description="잠시 후 다시 시도해주세요"
      actionLabel={onRetry ? "다시 시도" : undefined}
      onAction={onRetry}
      variant="error"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 2,
    paddingHorizontal: SPACING.xl,
  },
  decoration: {
    position: 'relative',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  circle: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 1,
  },
  circleOuter: {
    width: 120,
    height: 120,
    opacity: 0.2,
  },
  circleMiddle: {
    width: 90,
    height: 90,
    opacity: 0.4,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.title,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  actionButton: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    backgroundColor: COLORS.coal,
    borderRadius: 8,
  },
  actionText: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.bone,
  },
});
