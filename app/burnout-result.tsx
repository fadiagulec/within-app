/**
 * Burnout Assessment — result screen with animated score + tier CTA.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import {
  burnoutCategories,
  scoreBurnout,
  burnoutSafetyDisclaimer,
  type BurnoutResult,
} from '@/data/burnout';
import { useProgressStore } from '@/store/useProgressStore';
import { PaywallModal } from '@/features/payments/PaywallModal';

function tierColor(tier: BurnoutResult['tier']): string {
  switch (tier) {
    case 'mild':
      return tokens.semantic.successSage;
    case 'moderate':
      return tokens.semantic.accent;
    case 'severe':
      return tokens.semantic.warningAmber;
    case 'critical':
      return tokens.semantic.errorRust;
  }
}

export default function BurnoutResultScreen() {
  const router = useRouter();
  const answers = useProgressStore((s) => s.progress.burnoutAnswers);
  const startJourney = useProgressStore((s) => s.startJourney);

  const result: BurnoutResult = useMemo(
    () => scoreBurnout(answers ?? {}),
    [answers]
  );

  const [paywallLevel, setPaywallLevel] = useState<number | null>(null);

  // Animated score counter (0 -> score).
  const score = useSharedValue(0);
  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    score.value = withTiming(result.score, {
      duration: 1400,
      easing: Easing.out(Easing.cubic),
    });
    const start = Date.now();
    const iv = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / 1400);
      const v = result.score * (1 - Math.pow(1 - t, 3));
      setDisplayScore(Math.round(v * 10) / 10);
      if (t >= 1) clearInterval(iv);
    }, 32);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.score]);

  const tierCol = tierColor(result.tier);

  const barFills = useMemo(() => {
    return {
      emotional: Math.round(result.categoryScores.emotional_exhaustion.pct * 100),
      cynicism: Math.round(result.categoryScores.cynicism.pct * 100),
      accomplishment: Math.round(
        result.categoryScores.reduced_accomplishment.pct * 100
      ),
      somatic: Math.round(result.categoryScores.somatic.pct * 100),
    };
  }, [result]);

  function beginJourney() {
    startJourney();
    router.replace('/(tabs)/journey');
  }

  return (
    <Screen padded={false}>
      <LinearGradient
        colors={[`${tierCol}22`, 'transparent']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <Pressable onPress={() => router.replace('/(tabs)')} hitSlop={10}>
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Home
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          RESULT
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 140 }}>
        <Text variant="eyebrow" color={tokens.semantic.accent}>
          YOUR BURNOUT CHECK-IN
        </Text>
        <Text variant="heading1" style={{ marginTop: 12 }}>
          {result.tierInfo.title}
        </Text>

        {/* Score + tier */}
        <View style={styles.scoreCard}>
          <ScoreCircle
            value={displayScore}
            max={result.maxScore}
            color={tierCol}
          />
          <View style={{ flex: 1 }}>
            <Text variant="eyebrow" color={tokens.semantic.textSecondary}>
              SCORE · OUT OF {result.maxScore}
            </Text>
            <Text variant="heading2" style={{ marginTop: 6 }}>
              {result.tierInfo.level}
            </Text>
            <View
              style={[
                styles.tierBadge,
                { borderColor: tierCol, backgroundColor: `${tierCol}22` },
              ]}
            >
              <View style={[styles.tierDot, { backgroundColor: tierCol }]} />
              <Text variant="eyebrow" color={tierCol}>
                {result.tier.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        <Text
          variant="body"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 20, lineHeight: 22 }}
        >
          {result.tierInfo.message}
        </Text>

        {/* Category breakdown */}
        <View style={{ marginTop: 28 }}>
          <Text variant="eyebrow">WHERE IT'S SHOWING UP</Text>
          <View style={{ marginTop: 12, gap: 12 }}>
            <CategoryBar
              label={burnoutCategories.emotional_exhaustion.name}
              pct={barFills.emotional}
            />
            <CategoryBar
              label={burnoutCategories.cynicism.name}
              pct={barFills.cynicism}
            />
            <CategoryBar
              label={burnoutCategories.reduced_accomplishment.name}
              pct={barFills.accomplishment}
            />
            <CategoryBar
              label={burnoutCategories.somatic.name}
              pct={barFills.somatic}
            />
          </View>
        </View>

        {/* Supporting actions */}
        <View style={{ marginTop: 28 }}>
          <Text variant="eyebrow">WHILE YOU'RE HERE</Text>
          <View style={{ marginTop: 10, gap: 8 }}>
            {result.recommendation.supporting.map((s, i) => (
              <View key={i} style={styles.supportingRow}>
                <Text variant="body" color={tokens.semantic.accent}>
                  ◦
                </Text>
                <Text variant="body" style={{ flex: 1, lineHeight: 22 }}>
                  {s}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {result.tier === 'critical' ? (
          <View style={styles.safetyCard}>
            <Text variant="eyebrow" color={tokens.semantic.errorRust}>
              PLEASE READ
            </Text>
            <Text variant="bodySmall" style={{ marginTop: 8, lineHeight: 20 }}>
              {burnoutSafetyDisclaimer}
            </Text>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        {result.tier === 'mild' ? (
          <Button block size="lg" onPress={() => setPaywallLevel(1)}>
            Start 7-Day Reset · $39
          </Button>
        ) : null}
        {result.tier === 'moderate' ? (
          <Button block size="lg" onPress={beginJourney}>
            Begin 21-Day Recovery · $97
          </Button>
        ) : null}
        {result.tier === 'severe' ? (
          <>
            <Button block size="lg" onPress={beginJourney}>
              Begin Journey + Book Coaching · $997
            </Button>
            <Pressable
              onPress={() => setPaywallLevel(7)}
              style={{ padding: 10, marginTop: 6 }}
            >
              <Text
                variant="bodySmall"
                align="center"
                color={tokens.semantic.textTertiary}
              >
                See coaching details
              </Text>
            </Pressable>
          </>
        ) : null}
        {result.tier === 'critical' ? (
          <>
            <Button block size="lg" variant="secondary" onPress={() => router.replace('/(tabs)')}>
              Please connect with a medical professional
            </Button>
            <Pressable
              onPress={() => router.replace('/(tabs)')}
              style={{ padding: 10, marginTop: 6 }}
            >
              <Text
                variant="bodySmall"
                align="center"
                color={tokens.semantic.textTertiary}
              >
                Daily practices stay free · use the gentlest ones
              </Text>
            </Pressable>
          </>
        ) : null}
      </View>

      {paywallLevel !== null ? (
        <PaywallModal
          visible
          levelId={paywallLevel}
          onClose={() => setPaywallLevel(null)}
          onPurchased={() => {
            setPaywallLevel(null);
            if (result.tier !== 'mild') beginJourney();
          }}
        />
      ) : null}
    </Screen>
  );
}

function ScoreCircle({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <View style={[styles.scoreCircle, { borderColor: `${color}55` }]}>
      <View
        style={[
          styles.scoreFill,
          { backgroundColor: `${color}22`, height: `${pct * 100}%` },
        ]}
      />
      <View style={styles.scoreInner}>
        <Text variant="hero" color={color} style={{ fontSize: 40 }}>
          {Math.round(value)}
        </Text>
        <Text
          variant="mono"
          color={tokens.semantic.textTertiary}
          style={{ fontSize: 10 }}
        >
          / {max}
        </Text>
      </View>
    </View>
  );
}

function CategoryBar({ label, pct }: { label: string; pct: number }) {
  const color =
    pct < 25
      ? tokens.semantic.successSage
      : pct < 55
        ? tokens.semantic.accent
        : pct < 80
          ? tokens.semantic.warningAmber
          : tokens.semantic.errorRust;
  const width = useSharedValue(0);
  useEffect(() => {
    width.value = withTiming(pct, { duration: 900 });
  }, [pct, width]);
  const animStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));
  return (
    <View>
      <View style={styles.catHead}>
        <Text variant="body" color={tokens.semantic.textPrimary}>
          {label}
        </Text>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          {pct}%
        </Text>
      </View>
      <View style={styles.barTrack}>
        <Animated.View
          style={[styles.barFill, { backgroundColor: color }, animStyle]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  scoreCard: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    padding: 20,
    borderRadius: tokens.radii.xl,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  scoreCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.semantic.bgBase,
  },
  scoreFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  scoreInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierBadge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  tierDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  catHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  barTrack: {
    height: 8,
    backgroundColor: tokens.semantic.borderSubtle,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
  },
  safetyCard: {
    marginTop: 28,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: `${tokens.semantic.errorRust}15`,
    borderWidth: 1,
    borderColor: `${tokens.semantic.errorRust}55`,
  },
  supportingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    borderRadius: tokens.radii.sm,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgBase,
  },
});
