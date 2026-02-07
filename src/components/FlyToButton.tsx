import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Haptics from '../utils/haptics';
import { COLORS, TYPOGRAPHY, SPACING } from '../config/constants';
import { useMapStore } from '../stores/mapStore';

export function FlyToButton() {
  const { currentCity, toggleCityModal } = useMapStore();

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    toggleCityModal();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
      <Text style={styles.text}>{currentCity}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.md,
    backgroundColor: COLORS.coal,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.graphite,
  },
  text: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weights.light as any,
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.bone,
    letterSpacing: 2,
  },
});
