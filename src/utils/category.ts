import { CATEGORIES, COLORS } from '../config/constants';

export function getCategoryColor(category: string): string {
  return CATEGORIES[category as keyof typeof CATEGORIES]?.color || COLORS.bone;
}

export function getCategoryLabel(category: string): string {
  return CATEGORIES[category as keyof typeof CATEGORIES]?.label || category;
}
