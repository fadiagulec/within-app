/**
 * Within — Welcome 04 · First step.
 *
 * The active onboarding moment. Tells the user the Wheel of Life is the
 * real first step — a 4-minute honest read of where they are right now,
 * which the rest of the app reads from.
 *
 * The 8-petal bloom illustration replaces the prior wheel polygon. Same
 * meaning (the 8 axes) — softer, more inviting, on-brand.
 *
 * "Begin with the Wheel" routes to /(onboarding)/wheel-of-life. The
 * "Take me straight in" link skips it but still drops the user into Today.
 * Either way we mark the welcome flow seen.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { useOnboardingStore } from '@/store/useOnboardingStore';

import { WelcomeProgress } from './_components';
import { EightPetalBloom } from './_illustrations';

// The eight axes of the Wheel of Life, in the order they appear on the
// existing /(onboarding)/wheel-of-life screen. Used only as static
// preview labels here.
const WHEEL_AXES = [
  'Body',
  'Mind',
  'Spirit',
  'Work',
  'Love',
  'Money',
  'Joy',
  'Purpose',
] as const;

export default function WelcomeFirstStep() {
  const router = useRouter();
  const markWelcomeSeen = useOnboardingStore((s) => s.markWelcomeSeen);
  const markWheelTaken = useOnboardingStore((s) => s.markWheelTaken);

  function beginWithWheel() {
    // Mark the welcome flow seen *and* route into the Wheel. The Wheel
    // screen has its own completion logic that further advances the
    // path store; we don't duplicate that here.
    markWheelTaken();
    router.replace('/(onboarding)/wheel-of-life' as never);
  }

  function takeMeStraightIn() {
    markWelcomeSeen();
    router.replace('/(tabs)' as never);
  }

  function goBack() {
    router.back();
  }

  return (
    <View style={styles.root}>
      {/* pointerEvents="none" so the SVG doesn't intercept button taps on web */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg
          style={StyleSheet.absoluteFill}
          viewBox="0 0 100 200"
          preserveAspectRatio="none"
        >
          <Defs>
            <RadialGradient id="warmGlow" cx="50%" cy="60%" r="60%">
              <Stop offset="0%" stopColor="#FFF6E6" stopOpacity={0.5} />
              <Stop offset="100%" stopColor={tokens.palette.coralPink} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect x={0} y={0} width={100} height={80} fill={tokens.palette.peach} />
          <Rect x={0} y={80} width={100} height={70} fill={tokens.palette.coralPink} />
          <Rect x={0} y={150} width={100} height={50} fill={tokens.palette.goldenPeach} />
          <Rect x={0} y={0} width={100} height={200} fill="url(#warmGlow)" />
        </Svg>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeProgress step={4} total={4} />

        <Text style={styles.eyebrow}>YOUR FIRST STEP</Text>
        <Text style={styles.h1}>
          Begin where{'\n'}you actually are.
        </Text>
        <Text style={styles.body}>
          A 4-minute Wheel of Life tells the app where to start you on the
          path. No quiz feel. Honest seeing.
        </Text>

        {/* 8-petal bloom — symbolic of the 8 life axes */}
        <View style={styles.bloomWrap}>
          <EightPetalBloom size={220} />
        </View>

        <View style={styles.axisRow}>
          {WHEEL_AXES.map((axis) => (
            <Text key={axis} style={styles.axisText}>
              {axis}
            </Text>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={10}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Pressable
          onPress={beginWithWheel}
          accessibilityRole="button"
          accessibilityLabel="Begin with the Wheel"
          style={({ pressed }) => [
            styles.primaryBtn,
            pressed && { opacity: 0.92, transform: [{ scale: 0.995 }] },
          ]}
        >
          <Text style={styles.primaryBtnText}>Begin with the Wheel</Text>
        </Pressable>
        <Pressable
          onPress={takeMeStraightIn}
          accessibilityRole="button"
          accessibilityLabel="Skip the Wheel and take me straight in"
          hitSlop={10}
          style={({ pressed }) => [styles.skipLink, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.skipLinkText}>Or take me straight in →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: tokens.semantic.bgBase },
  content: {
    paddingHorizontal: 26,
    paddingTop: 56,
    paddingBottom: 240,
  },

  eyebrow: {
    marginTop: 18,
    marginBottom: 14,
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 13,
    letterSpacing: 2,
    color: tokens.semantic.accent,
  },
  h1: {
    fontFamily: tokens.fonts.display,
    fontSize: 38,
    lineHeight: 46,
    color: tokens.semantic.textPrimary,
    marginBottom: 16,
  },
  body: {
    fontFamily: tokens.fonts.body,
    fontSize: 17,
    lineHeight: 26,
    color: tokens.semantic.textSecondary,
    marginBottom: 30,
  },

  bloomWrap: {
    alignItems: 'center',
    marginBottom: 18,
  },

  axisRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  axisText: {
    fontFamily: tokens.fonts.body,
    fontStyle: 'italic',
    fontSize: 15,
    color: tokens.semantic.textTertiary,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 26,
    paddingTop: 16,
    paddingBottom: 36,
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255, 252, 250, 0.6)',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  backText: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    color: tokens.semantic.textTertiary,
  },
  primaryBtn: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: tokens.radii.pill,
    backgroundColor: tokens.semantic.accent,
    alignItems: 'center',
    ...tokens.shadows.gold,
  },
  primaryBtnText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 18,
    letterSpacing: 0.5,
    color: tokens.semantic.textInverse,
  },
  skipLink: {
    paddingVertical: 8,
  },
  skipLinkText: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    color: tokens.semantic.textTertiary,
  },
});
