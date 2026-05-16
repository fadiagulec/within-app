/**
 * Within — Welcome 01 · Arrival.
 *
 * Brand reveal. A seated meditator under a crescent moon — quiet, still,
 * inward. Tagline: "The way back is inward." One large CTA to begin the
 * story, plus a small "I've been here before" that skips the whole flow.
 *
 * No noise. No content. This is the door, not the room.
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { useOnboardingStore } from '@/store/useOnboardingStore';

import { SeatedFigureMoon } from './_illustrations';

export default function WelcomeArrival() {
  const router = useRouter();
  const markWelcomeSeen = useOnboardingStore((s) => s.markWelcomeSeen);

  function continueStory() {
    router.push('/(welcome)/what-this-is' as never);
  }

  function skipEntirely() {
    markWelcomeSeen();
    router.replace('/(tabs)' as never);
  }

  return (
    <View style={styles.root}>
      {/* Full-bleed warm pastel gradient — drawn with SVG so it renders
          consistently on every device, no extra dependency required. */}
      <Svg
        style={StyleSheet.absoluteFill}
        viewBox="0 0 100 200"
        preserveAspectRatio="none"
      >
        <Defs>
          <RadialGradient
            id="sunGlow"
            cx="50%"
            cy="32%"
            r="42%"
            fx="50%"
            fy="32%"
          >
            <Stop offset="0%" stopColor="#FFF6E6" stopOpacity={0.9} />
            <Stop offset="70%" stopColor={tokens.palette.peach} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        {/* Vertical gradient stops mirror palette.skyTop → coralPink. */}
        <Rect x={0} y={0} width={100} height={45} fill={tokens.palette.skyTop} />
        <Rect x={0} y={45} width={100} height={45} fill={tokens.palette.skyMid} />
        <Rect x={0} y={90} width={100} height={60} fill={tokens.palette.peach} />
        <Rect x={0} y={150} width={100} height={50} fill={tokens.palette.coralPink} />
        <Rect x={0} y={0} width={100} height={200} fill="url(#sunGlow)" />
      </Svg>

      <View style={styles.content}>
        {/* Top — brand mark, very small, very far away */}
        <View style={styles.topMark}>
          <Text style={styles.brandMark}>WITHIN</Text>
        </View>

        {/* Centre — the seated figure under the moon */}
        <View style={styles.illustrationWrap}>
          <SeatedFigureMoon size={240} />
        </View>

        {/* Tagline */}
        <View style={styles.tagline}>
          <Text style={styles.taglineHead}>
            The way back{'\n'}is inward.
          </Text>
          <Text style={styles.taglineSub}>
            A seven-stage path for putting{'\n'}your life together — gently.
          </Text>
        </View>

        {/* CTA */}
        <View style={styles.ctaBlock}>
          <Pressable
            onPress={continueStory}
            accessibilityRole="button"
            accessibilityLabel="Begin"
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && { opacity: 0.92, transform: [{ scale: 0.995 }] },
            ]}
          >
            <Text style={styles.primaryBtnText}>Begin</Text>
          </Pressable>
          <Pressable
            onPress={skipEntirely}
            accessibilityRole="button"
            accessibilityLabel="Skip welcome, I've been here before"
            hitSlop={10}
            style={({ pressed }) => [
              styles.secondaryBtn,
              pressed && { opacity: 0.6 },
            ]}
          >
            <Text style={styles.secondaryBtnText}>
              I've been here before
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: tokens.semantic.bgBase },
  content: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 56,
    paddingBottom: 36,
  },

  topMark: {
    alignItems: 'center',
    marginBottom: 28,
  },
  brandMark: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 4,
    color: tokens.semantic.textSecondary,
  },

  illustrationWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tagline: {
    alignItems: 'center',
    marginBottom: 36,
  },
  taglineHead: {
    fontFamily: tokens.fonts.display,
    fontSize: 26,
    lineHeight: 34,
    color: tokens.semantic.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  taglineSub: {
    fontFamily: tokens.fonts.displayRegular,
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight: 22,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
  },

  ctaBlock: {
    alignItems: 'center',
  },
  primaryBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: tokens.radii.pill,
    backgroundColor: tokens.semantic.accent,
    alignItems: 'center',
    ...tokens.shadows.gold,
  },
  primaryBtnText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 15,
    letterSpacing: 0.6,
    color: tokens.semantic.textInverse,
  },
  secondaryBtn: {
    marginTop: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  secondaryBtnText: {
    fontFamily: tokens.fonts.body,
    fontSize: 12,
    letterSpacing: 0.4,
    color: tokens.semantic.textTertiary,
  },
});
