import { CATEGORIES, CATEGORY_MARKER_COLORS, COLORS } from '../config/constants';

export function getCategoryColor(category: string): string {
  return CATEGORIES[category as keyof typeof CATEGORIES]?.color || COLORS.bone;
}

// 다크 지도 위에서 명도/채도가 잘 잡히는 마커 전용 컬러
export function getCategoryMarkerColor(category: string): string {
  return (
    CATEGORY_MARKER_COLORS[category as keyof typeof CATEGORY_MARKER_COLORS] ||
    COLORS.bone
  );
}

export function getCategoryLabel(category: string): string {
  return CATEGORIES[category as keyof typeof CATEGORIES]?.label || category;
}
