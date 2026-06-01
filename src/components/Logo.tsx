import React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';
import { COLORS } from '../config/constants';

interface LogoProps {
  size?: number;
  /** 마크 선/점 색상 (기본: bone) */
  color?: string;
  /** coal 배경 사각형을 그릴지 (기본: false — 투명 배경) */
  withBackground?: boolean;
}

/**
 * Parchment 로고 마크 — 접힌 모서리 사각형(양피지/지도) + 큐레이팅된 장소 점.
 * SVG라 어떤 크기에서도 선명하다. favicon/app icon과 동일한 마크.
 */
export function Logo({ size = 64, color = COLORS.bone, withBackground = false }: LogoProps) {
  // viewBox 1024 기준 — stroke 두께를 크기에 비례 유지
  const stroke = Math.max(2, Math.round((size / 1024) * 16));
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="none">
      {withBackground && <Rect width={1024} height={1024} rx={224} fill={COLORS.coal} />}
      {/* 양피지/지도 사각형 */}
      <Rect x={192} y={192} width={640} height={640} fill="none" stroke={color} strokeWidth={stroke} />
      {/* 접힌 모서리 (우상단) */}
      <Path
        d="M640 192 L832 384 L640 384 Z"
        fill={withBackground ? COLORS.coal : 'none'}
        stroke={color}
        strokeWidth={stroke}
        strokeLinejoin="miter"
      />
      {/* 큐레이팅된 장소 마커 점 */}
      <Circle cx={416} cy={512} r={48} fill={color} />
    </Svg>
  );
}
