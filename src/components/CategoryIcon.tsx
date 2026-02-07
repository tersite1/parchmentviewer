import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { COLORS } from '../config/constants';
import type { CategoryType } from '../config/constants';

interface CategoryIconProps {
  category: CategoryType;
  size?: number;
  color?: string;
}

export function CategoryIcon({ category, size = 16, color = COLORS.bone }: CategoryIconProps) {
  const strokeWidth = 1.5;

  switch (category) {
    case 'cafe':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M5 9h12v6a4 4 0 01-4 4H9a4 4 0 01-4-4V9z"
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <Path
            d="M17 10h1a2 2 0 012 2v0a2 2 0 01-2 2h-1"
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </Svg>
      );

    case 'restaurant':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M6 3v18M6 3c-1.5 0-2 2-2 4s.5 4 2 4M6 3c1.5 0 2 2 2 4s-.5 4-2 4"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <Path
            d="M18 3v8a3 3 0 01-3 3v7"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </Svg>
      );

    case 'culture':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M3 21h18M5 21V8l7-5 7 5v13"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Rect x="9" y="13" width="6" height="8" stroke={color} strokeWidth={strokeWidth} />
        </Svg>
      );

    case 'bar':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M6 4h12l-5 8v6h4M8 18h8"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    case 'stay':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M3 18v-5a2 2 0 012-2h14a2 2 0 012 2v5M3 18v2M21 18v2"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <Path
            d="M5 11V7a2 2 0 012-2h3a2 2 0 012 2v4"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </Svg>
      );

    default:
      return null;
  }
}
