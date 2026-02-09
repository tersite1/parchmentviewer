import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Pressable } from 'react-native';
import * as Haptics from '../utils/haptics';
import { COLORS, TYPOGRAPHY, SPACING, CITIES, type CityName } from '../config/constants';
import { useMapStore } from '../stores/mapStore';

interface CityModalProps {
  onCitySelect: (city: CityName) => void;
}

export function CityModal({ onCitySelect }: CityModalProps) {
  const { isCityModalVisible, closeCityModal, currentCity } = useMapStore();
  const cities = Object.keys(CITIES) as CityName[];

  const handleCityPress = async (city: CityName) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    closeCityModal();
    onCitySelect(city);
  };

  return (
    <Modal
      visible={isCityModalVisible}
      transparent
      animationType="fade"
      onRequestClose={closeCityModal}
    >
      <Pressable style={styles.overlay} onPress={closeCityModal}>
        <View style={styles.container}>
          <Text style={styles.title}>도시 선택</Text>
          <View style={styles.cityRow}>
            {cities.map((city) => (
              <TouchableOpacity
                key={city}
                style={[
                  styles.cityButton,
                  currentCity === city && styles.cityButtonActive,
                ]}
                onPress={() => handleCityPress(city)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.cityText,
                    currentCity === city && styles.cityTextActive,
                  ]}
                >
                  {city}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlayModal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.coal,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.graphite,
    borderRadius: 12,
    alignItems: 'center',
    maxWidth: '90%',
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weights.light as any,
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.bone,
    opacity: 0.5,
    letterSpacing: 2,
    marginBottom: SPACING.lg,
  },
  cityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  cityButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.graphite,
  },
  cityButtonActive: {
    borderColor: COLORS.bone,
  },
  cityText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weights.light as any,
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.bone,
    opacity: 0.7,
    letterSpacing: 1,
  },
  cityTextActive: {
    opacity: 1,
  },
});
