/**
 * Within — Welcome 03 · What you'll do.
 *
 * The concrete-proof screen. Names the actual practices the user will do
 * here — breathwork, body wisdom, chakra letters, quantum unblocking,
 * chart & blueprint. Each row uses a thin line glyph (from
 * _illustrations) so the visual vocabulary feels like a family instead
 * of a dot legend.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { useOnboardingStore } from '@/store/useOnboardingStore';

import { WelcomeProgress } from './_components';
import { LineGlyph, type GlyphName } from './_illustrations';

interface Practice {
  glyph: GlyphName;
  title: string;
  sub: string;
  color: string;
}

const PRACTICES: Practice[] = [
  {
    glyph: 'breath',
    title: 'Breathwork',
    sub: '9 patterns · nervous-system reset',
    color: tokens.chakraColors.heart,
  },
  {
    glyph: 'body',
    title: 'Body Wisdom',
    sub: '50-symptom map · hear the message',
    color: tokens.chakraColors.throat,
  },
  {
    glyph: 'letter',
    title: '8 Chakra Letters',
    sub: 'Structured release through each centre',
    color: tokens.chakraColors.thirdEye,
  },
  {
    glyph: 'unblock',
    title: 'Quantum Unblocking',
    sub: '7-step timeline process',
    color: tokens.chakraColors.solar,
  },
  {
    glyph: 'chart',
    title: 'Chart & Blueprint',
    sub: 'Astrology + Energy Blueprint',
    color: tokens.chakraColors.crown,
  },
];

export default function WelcomeWhatYoullDo() {
  const router = useRouter();
  const markWelcomeSeen = useOnboardingStore((s) => s.markWelcomeSeen);

  function continueStory() {
    router.push('/(welcome)/first-step' as never);
  }

  function skipEntirely() {
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
            <RadialGradient id="centerGlow" cx="50%" cy="50%" r="60%">
              <Stop offset="0%" stopColor="#FFF6E6" stopOpacity={0.5} />
              <Stop offset="100%" stopColor={tokens.palette.peach} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect x={0} y={0} width={100} height={70} fill={tokens.palette.skyMid} />
          <Rect x={0} y={70} width={100} height={70} fill={tokens.palette.peach} />
          <Rect x={0} y={140} width={100} height={60} fill={tokens.palette.coralPink} />
          <Rect x={0} y={0} width={100} height={200} fill="url(#centerGlow)" />
        </Svg>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeProgress step={3} total={4} />

        <Text style={styles.eyebrow}>WHAT YOU'LL DO HERE</Text>
        <Text style={styles.h1}>
          Practices that{'\n'}change you.
        </Text>

        <View style={styles.list}>
          {PRACTICES.map((p) => (
            <View key={p.glyph} style={styles.row}>
              <View style={[styles.glyphWrap, { borderColor: `${p.color}55`, backgroundColor: `${p.color}14` }]}>
                <LineGlyph name={p.glyph} color={p.color} size={26} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{p.title}</Text>
                <Text style={styles.rowSub}>{p.sub}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.quote}>
          "Most people skip Ground.{'\n'}Do not skip Ground."
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={10}
          style={({ pressed }) => [pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.skipText}>← Back</Text>
        </Pressable>
        <Pressable
          onPress={skipEntirely}
          accessibilityRole="button"
          accessibilityLabel="Skip welcome"
          hitSlop={10}
          style={({ pressed }) => [pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
        <Pressable
          onPress={continueStory}
          accessibilityRole="button"
          accessibilityLabel="Continue"
          style={({ pressed }) => [
            styles.primaryBtn,
            pressed && { opacity: 0.92, transform: [{ scale: 0.995 }] },
          ]}
        >
          <Text style={styles.primaryBtnText}>Continue →</Text>
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
    paddingBottom: 120,
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
    fontSize: 40,
    lineHeight: 48,
    color: tokens.semantic.textPrimary,
    marginBottom: 26,
  },

  list: {
    gap: 12,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.palette.cream100,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  glyphWrap: {
    width: 54,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1, minWidth: 0 },
  rowTitle: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 18,
    color: tokens.semantic.textPrimary,
    marginBottom: 4,
  },
  rowSub: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 21,
    color: tokens.semantic.textSecondary,
  },

  quote: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 20,
    lineHeight: 30,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
    marginTop: 12,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 26,
    paddingTop: 16,
    paddingBottom: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: 'rgba(255, 252, 250, 0.55)',
  },
  skipText: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    color: tokens.semantic.textTertiary,
  },
  primaryBtn: {
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: tokens.radii.pill,
    backgroundColor: tokens.semantic.accent,
    ...tokens.shadows.gold,
  },
  primaryBtnText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 17,
    letterSpacing: 0.4,
    color: tokens.semantic.textInverse,
  },
});
