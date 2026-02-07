import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import * as Haptics from '../utils/haptics';
import { COLORS, TYPOGRAPHY, SPACING } from '../config/constants';

const TOSS_PAY_URL = 'https://toss.me/parchment';

export function AboutScreen() {
  const handleDonate = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await Linking.openURL(TOSS_PAY_URL);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.tagline}>No Algorithms. Just Silence.</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>MANIFESTO</Text>
        <Text style={styles.body}>
          Parchment is a curated collection of architectural spaces that reward stillness.
          {'\n\n'}
          In an age of algorithmic noise, we believe in the quiet power of human curation.
          Each place on this map was selected not by machines, but by people who understand
          that the best spaces are discovered, not recommended.
          {'\n\n'}
          We show you where to go. Nothing more.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>AESTHETIC</Text>
        <Text style={styles.body}>
          Inspired by the restraint of Christophe Lemaire and the raw honesty of Le Corbusier.
          Brutalist, minimal, considered.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>SUPPORT</Text>
        <Text style={styles.body}>
          Parchment is free and will remain free. If you find value in silence,
          consider supporting our work.
        </Text>

        <TouchableOpacity style={styles.donateButton} onPress={handleDonate} activeOpacity={0.7}>
          <Text style={styles.donateText}>DONATE VIA TOSS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>PARCHMENT</Text>
        <Text style={styles.footerSubtext}>Seoul · Daejeon · Gyeongju · Tokyo · Bali · Cairo</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.coal,
  },
  content: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  tagline: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weights.light as any,
    fontSize: TYPOGRAPHY.sizes.title,
    color: COLORS.bone,
    textAlign: 'center',
    marginBottom: SPACING.xl * 2,
    letterSpacing: 1,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  heading: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weights.light as any,
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.bone,
    opacity: 0.5,
    letterSpacing: 3,
    marginBottom: SPACING.sm,
  },
  body: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weights.light as any,
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.bone,
    lineHeight: 24,
  },
  donateButton: {
    backgroundColor: COLORS.graphite,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.xs,
    alignSelf: 'flex-start',
    marginTop: SPACING.md,
  },
  donateText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weights.regular as any,
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.bone,
    letterSpacing: 2,
  },
  footer: {
    marginTop: SPACING.xl * 2,
    alignItems: 'center',
    paddingBottom: SPACING.xl,
  },
  footerText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weights.light as any,
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.bone,
    opacity: 0.3,
    letterSpacing: 4,
  },
  footerSubtext: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weights.light as any,
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.bone,
    opacity: 0.2,
    marginTop: SPACING.xs,
  },
});
