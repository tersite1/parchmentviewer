import React from 'react';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';
import { COLORS } from '../config/constants';

export type IconName =
  | 'search'
  | 'close'
  | 'location'
  | 'copy'
  | 'share'
  | 'pin'
  | 'cafe'
  | 'restaurant'
  | 'culture'
  | 'bar'
  | 'stay'
  | 'chevronRight'
  | 'chevronLeft'
  | 'menu'
  | 'heart'
  | 'check'
  | 'home'
  | 'user'
  | 'plus'
  | 'bookmark'
  | 'map'
  | 'expand'
  | 'collapse'
  | 'settings'
  | 'camera'
  | 'image';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 20, color = COLORS.bone, strokeWidth = 1.5 }: IconProps) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none' };

  switch (name) {
    // UI Icons
    case 'search':
      return (
        <Svg {...props}>
          <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={strokeWidth} />
          <Path d="M21 21l-4.35-4.35" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </Svg>
      );

    case 'close':
      return (
        <Svg {...props}>
          <Path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </Svg>
      );

    case 'location':
      return (
        <Svg {...props}>
          <Path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <Circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth={strokeWidth} />
        </Svg>
      );

    case 'copy':
      return (
        <Svg {...props}>
          <Rect x="8" y="8" width="12" height="12" rx="2" stroke={color} strokeWidth={strokeWidth} />
          <Path
            d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </Svg>
      );

    case 'share':
      return (
        <Svg {...props}>
          <Path
            d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <Path
            d="M16 6l-4-4-4 4M12 2v13"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    case 'pin':
      return (
        <Svg {...props}>
          <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth={strokeWidth} />
          <Path
            d="M12 2a8 8 0 00-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 00-8-8z"
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </Svg>
      );

    case 'chevronRight':
      return (
        <Svg {...props}>
          <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );

    case 'chevronLeft':
      return (
        <Svg {...props}>
          <Path d="M15 18l-6-6 6-6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );

    case 'menu':
      return (
        <Svg {...props}>
          <Line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
          <Line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
          <Line x1="3" y1="18" x2="21" y2="18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </Svg>
      );

    case 'heart':
      return (
        <Svg {...props}>
          <Path
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </Svg>
      );

    case 'check':
      return (
        <Svg {...props}>
          <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );

    case 'home':
      return (
        <Svg {...props}>
          <Path
            d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path d="M9 22V12h6v10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );

    case 'user':
      return (
        <Svg {...props}>
          <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={strokeWidth} />
          <Path
            d="M20 21a8 8 0 10-16 0"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </Svg>
      );

    case 'plus':
      return (
        <Svg {...props}>
          <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
          <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </Svg>
      );

    case 'bookmark':
      return (
        <Svg {...props}>
          <Path
            d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    case 'map':
      return (
        <Svg {...props}>
          <Path
            d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Line x1="8" y1="2" x2="8" y2="18" stroke={color} strokeWidth={strokeWidth} />
          <Line x1="16" y1="6" x2="16" y2="22" stroke={color} strokeWidth={strokeWidth} />
        </Svg>
      );

    case 'expand':
      return (
        <Svg {...props}>
          <Path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );

    case 'collapse':
      return (
        <Svg {...props}>
          <Path d="M4 14h6v6M20 10h-6V4M10 14l-7 7M14 10l7-7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );

    case 'settings':
      return (
        <Svg {...props}>
          <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
          <Path
            d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    case 'camera':
      return (
        <Svg {...props}>
          <Path
            d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle cx="12" cy="13" r="4" stroke={color} strokeWidth={strokeWidth} />
        </Svg>
      );

    case 'image':
      return (
        <Svg {...props}>
          <Rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth={strokeWidth} />
          <Circle cx="8.5" cy="8.5" r="1.5" stroke={color} strokeWidth={strokeWidth} />
          <Path d="M21 15l-5-5L5 21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );

    // Category Icons
    case 'cafe':
      return (
        <Svg {...props}>
          <Path d="M5 9h12v6a4 4 0 01-4 4H9a4 4 0 01-4-4V9z" stroke={color} strokeWidth={strokeWidth} />
          <Path d="M17 10h1a2 2 0 012 2v0a2 2 0 01-2 2h-1" stroke={color} strokeWidth={strokeWidth} />
          <Line x1="5" y1="21" x2="17" y2="21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </Svg>
      );

    case 'restaurant':
      return (
        <Svg {...props}>
          <Path
            d="M7 3v18M7 3C5.5 3 5 5 5 7s.5 4 2 4M7 3c1.5 0 2 2 2 4s-.5 4-2 4"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <Path d="M17 3v8a3 3 0 01-3 3v7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </Svg>
      );

    case 'culture':
      return (
        <Svg {...props}>
          <Path
            d="M3 21h18M5 21V8l7-5 7 5v13"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Rect x="9" y="12" width="6" height="9" stroke={color} strokeWidth={strokeWidth} />
        </Svg>
      );

    case 'bar':
      return (
        <Svg {...props}>
          <Path
            d="M8 3h8l-4 7v8M7 21h10M12 18v-1"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle cx="12" cy="7" r="1" fill={color} />
        </Svg>
      );

    case 'stay':
      return (
        <Svg {...props}>
          <Path
            d="M3 18v-5a2 2 0 012-2h14a2 2 0 012 2v5M3 18v2M21 18v2"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <Path d="M5 11V7a2 2 0 012-2h3a2 2 0 012 2v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
          <Circle cx="7.5" cy="7" r="1.5" stroke={color} strokeWidth={strokeWidth} />
        </Svg>
      );

    default:
      return null;
  }
}
