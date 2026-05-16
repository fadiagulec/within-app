/**
 * Within — Welcome 02 · What this is.
 *
 * The "differentiator" screen. Tells the user this isn't a meditation app
 * or a content feed — it's a structured 7-stage path. Opens with a
 * horizon + path arc illustration (showing the journey visually), then
 * names the stages as soft pills so the user can SEE the shape.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { PATH_STAGES } from '@/data/path';
import { useOnboardingStore } from '@/store/useOnboardingStore';

import { WelcomeProgress } from './_components';
import { HorizonPathArc } from './_illustrations';

export default function WelcomeWhatThisIs() {
  const router = useRouter();
  const markWelcomeSeen = useOnboardingStore((s) => s.markWelcomeSeen);

  function continueStory() {
    router.push('/(welcome)/what-youll-do' as never);
  }

  function skipEntirely() {
    markWelcomeSeen();
    router.replace('/(tabs)' as never);
  }

  return (
    <View style={styles.root}>
      <Svg
        style={StyleSheet.absoluteFill}
        viewBox="0 0 100 200"
        preserveAspectRatio="none"
      >
        <Defs>
          <RadialGradient id="topGlow" cx="50%" cy="0%" r="80%" fx="50%" fy="0%">
            <Stop offset="0%" stopColor={tokens.palette.skyTop} stopOpacity={1} />
            <Stop offset="100%" stopColor={tokens.palette.peach} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={100} height={120} fill={tokens.palette.skyMid} />
        <Rect x={0} y={120} width={100} height={80} fill={tokens.palette.peach} />
        <Rect x={0} y={0} width={100} height={200} fill="url(#topGlow)" />
      </Svg>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeProgress step={2} total={4} />

        {/* Illustration — horizon + arcing path */}
        <View style={styles.illustrationWrap}>
          <HorizonPathArc size={300} />
        </View>

        <Text style={styles.eyebrow}>WHAT WITHIN IS</Text>
        <Text style={styles.h1}>
          Not another{'\n'}meditation app.
        </Text>

        <Text style={styles.bodyPrimary}>
          Within is a structured path for healing — not a feed, not a library
          you scroll until something lands.
        </Text>
        <Text style={styles.bodySecondary}>
          Seven stages, walked in order. Body before mind. Safety before depth.
          The next step is always one tap away.
        </Text>

        <Text style={styles.quote}>
          "You can't heal what you haven't named."
        </Text>

        <Text style={styles.sectionLabel}>THE PATH</Text>
        <View style={styles.stageRow}>
          {PATH_STAGES.map((stage) => (
            <View key={stage.id} style={styles.stagePill}>
              <View style={[styles.stagePillDot, { backgroundColor: stage.color }]} />
              <Text style={styles.stagePillText}>{stage.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer CTA bar */}
      <View style={styles.footer}>
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

  illustrationWrap: {
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 8,
  },

  eyebrow: {
    marginTop: 8,
    marginBottom: 14,
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 2,
    color: tokens.semantic.accent,
  },
  h1: {
    fontFamily: tokens.fonts.display,
    fontSize: 32,
    lineHeight: 40,
    color: tokens.semantic.textPrimary,
    marginBottom: 24,
  },

  bodyPrimary: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: tokens.semantic.textPrimary,
    marginBottom: 12,
  },
  bodySecondary: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: tokens.semantic.textSecondary,
    marginBottom: 22,
  },

  quote: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 18,
    lineHeight: 26,
    color: tokens.semantic.textPrimary,
    marginBottom: 30,
  },

  sectionLabel: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 2,
    color: tokens.semantic.textTertiary,
    marginBottom: 10,
  },
  stageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  stagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: tokens.radii.pill,
    backgroundColor: tokens.palette.cream100,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  stagePillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  stagePillText: {
    fontFamily: tokens.fonts.body,
    fontSize: 11,
    color: tokens.semantic.textPrimary,
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
    backgroundColor: 'rgba(255, 252, 250, 0.55)',
  },
  skipText: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    color: tokens.semantic.textTertiary,
  },
  primaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: tokens.radii.pill,
    backgroundColor: tokens.semantic.accent,
    ...tokens.shadows.gold,
  },
  primaryBtnText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 14,
    letterSpacing: 0.4,
    color: tokens.semantic.textInverse,
  },
});
