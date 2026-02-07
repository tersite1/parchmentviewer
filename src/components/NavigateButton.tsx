import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking, Platform } from 'react-native';
import * as Haptics from '../utils/haptics';
import { COLORS, TYPOGRAPHY, SPACING } from '../config/constants';

interface NavigateButtonProps {
  lat: number;
  lng: number;
  name: string;
}

export function NavigateButton({ lat, lng, name }: NavigateButtonProps) {
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    const encodedName = encodeURIComponent(name);
    const url = Platform.select({
      ios: `maps://app?daddr=${lat},${lng}&q=${encodedName}`,
      android: `google.navigation:q=${lat},${lng}`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    });

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      // Fallback to Google Maps web
      await Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      );
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
      <Text style={styles.text}>NAVIGATE</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: COLORS.graphite,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weights.regular as any,
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.bone,
    letterSpacing: 2,
  },
});
