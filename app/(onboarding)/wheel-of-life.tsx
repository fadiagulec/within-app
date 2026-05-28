/**
 * SOMA — Wheel of Life onboarding
 *
 * The app's new front door. Rate each of 8 life areas 1–10.
 * One area per screen. Draft stored in useWheelStore. On final area,
 * commit and auto-navigate to wheel-result.
 */

import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from '@/lib/haptic';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import { tokens } from '@/theme/tokens';
import { LIFE_AREAS, LifeAreaId } from '@/data/wheel-of-life';
import { useWheelStore } from '@/store/useWheelStore';
import { WHEEL_VOICE_ID } from '@/coach/voiceConfig';

// The coaching arrival — spoken by the facilitator voice before the
// life audit begins. Turns the assessment into a held, intentional
// moment rather than a form.
const ARRIVAL_NARRATION = `Welcome.

Before we look at your life, let us arrive together. There is no rush here.

Take one slow breath with me. In through the nose… and all the way out through the mouth. Again. In… and out. Good.

What you are about to do is not a test. It is a mirror. We will move through eight areas of your life, one at a time.

Rate each one — not by where you wish you were, but by where you honestly are today. There are no wrong answers here. Nothing you find is wasted. Honesty is the medicine.

When you are ready, we begin.`;

/** The facilitator's spoken coaching line for a given area. */
function coachLineForArea(name: string, question: string): string {
  return `${name}. ${question} Take a breath before you answer. Notice what your body says, before your mind does.`;
}

// ============ Rating scale (1–10) ============

interface RatingScaleProps {
  value: number | undefined;
  onChange: (value: number) => void;
  color: string;
}

function RatingScale({ value, onChange, color }: RatingScaleProps) {
  const [trackWidth, setTrackWidth] = useState(0);

  function onLayout(e: LayoutChangeEvent) {
    setTrackWidth(e.nativeEvent.layout.width);
  }

  function updateFromX(x: number) {
    if (trackWidth <= 0) return;
    const clamped = Math.max(0, Math.min(trackWidth, x));
    const ratio = clamped / trackWidth;
    const raw = Math.round(ratio * 9) + 1; // 1..10
    const next = Math.max(1, Math.min(10, raw));
    if (next !== value) {
      Haptics.selectionAsync().catch(() => {});
      onChange(next);
    }
  }

  function handlePress(e: GestureResponderEvent) {
    updateFromX(e.nativeEvent.locationX);
  }

  const fillPct = useMemo(() => {
    if (!value) return 0;
    return ((value - 1) / 9) * 100;
  }, [value]);

  return (
    <View>
      {/* Track with tap / drag */}
      <Pressable
        onPress={handlePress}
        onTouchMove={(e) => {
          updateFromX(e.nativeEvent.locationX);
        }}
        onLayout={onLayout}
        style={styles.track}
        accessibilityRole="adjustable"
        accessibilityValue={{
          min: 1,
          max: 10,
          now: value ?? 0,
        }}
      >
        <View style={styles.trackBar} />
        <View
          style={[
            styles.trackFill,
            {
              width: `${fillPct}%`,
              backgroundColor: color,
            },
          ]}
        />
        {value ? (
          <View
            style={[
              styles.thumb,
              {
                left: `${fillPct}%`,
                borderColor: color,
              },
            ]}
          />
        ) : null}
      </Pressable>

      {/* Numeric tap scale */}
      <View style={styles.numberRow}>
        {Array.from({ length: 10 }).map((_, i) => {
          const n = i + 1;
          const on = value === n;
          return (
            <Pressable
              key={n}
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                onChange(n);
              }}
              style={[
                styles.numberCell,
                on && {
                  backgroundColor: color,
                  borderColor: color,
                },
              ]}
              accessibilityLabel={`Rate ${n}`}
            >
              <Text
                variant="mono"
                color={
                  on
                    ? tokens.semantic.textOnGold
                    : tokens.semantic.textPrimary
                }
                style={{ fontSize: 16 }}
              >
                {n}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.scaleLegend}>
        <Text variant="mono" color={tokens.semantic.textSecondary} style={{ fontSize: 12, letterSpacing: 1.5 }}>
          STRUGGLING
        </Text>
        <Text variant="mono" color={tokens.semantic.textSecondary} style={{ fontSize: 12, letterSpacing: 1.5 }}>
          THRIVING
        </Text>
      </View>
    </View>
  );
}

// ============ Main onboarding flow ============

export default function WheelOfLifeOnboarding() {
  const router = useRouter();
  const draft = useWheelStore((s) => s.currentDraft);
  const setDraftScore = useWheelStore((s) => s.setDraftScore);
  const commitDraft = useWheelStore((s) => s.commitDraft);

  const [idx, setIdx] = useState(0);
  // The journey opens with a cinematic, voice-coached arrival before
  // the first life area. This is what turns it from a questionnaire
  // into a held coaching experience.
  const [arrived, setArrived] = useState(false);

  const area = LIFE_AREAS[idx]!;
  const total = LIFE_AREAS.length;
  const value = draft[area.id];

  // Animated progress indicator
  const progress = useSharedValue(0);
  React.useEffect(() => {
    progress.value = withTiming((idx + 1) / total, {
      duration: 320,
      easing: Easing.out(Easing.cubic),
    });
  }, [idx, total, progress]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%` as `${number}%`,
  }));

  function onRate(n: number) {
    setDraftScore(area.id, n);
  }

  function goNext() {
    if (!value) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    if (idx === total - 1) {
      const result = commitDraft();
      if (result) {
        router.replace('/(onboarding)/wheel-result');
      }
      return;
    }
    setIdx(idx + 1);
  }

  function goBack() {
    if (idx === 0) {
      router.back();
      return;
    }
    setIdx(idx - 1);
  }

  const scoreMeaningLine = useMemo(() => {
    if (!value) return null;
    if (value <= 3) return area.scoreMeaning.low;
    if (value <= 6) return area.scoreMeaning.medium;
    return area.scoreMeaning.high;
  }, [value, area]);

  // ── Cinematic arrival — voice-coached intro before the life audit ──
  if (!arrived) {
    return (
      <Screen scroll padded={false} edges={['top', 'left', 'right']}>
        <View style={styles.arrivalWrap}>
          <Text
            variant="eyebrow"
            color={tokens.semantic.accent}
            style={{ letterSpacing: 2.4, fontSize: 13 }}
          >
            THE WHEEL OF LIFE
          </Text>
          <Text variant="heading1" style={{ marginTop: 14, fontSize: 40, lineHeight: 48 }}>
            Let&apos;s begin{'\n'}where you are.
          </Text>
          <Text
            variant="displayItalic"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 18, fontSize: 19, lineHeight: 29 }}
          >
            This is not a test. It is a mirror. Eight areas of your life — rated honestly, held gently.
          </Text>

          <View style={styles.arrivalPlayer}>
            <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.8, marginBottom: 12 }}>
              PRESS PLAY · LET ME GUIDE YOU IN
            </Text>
            <SpeechPlayer
              text={ARRIVAL_NARRATION}
              voiceId={WHEEL_VOICE_ID}
              accent={tokens.semantic.accent}
              label="ARRIVE WITH ME"
            />
            <Text
              variant="bodySmall"
              color={tokens.semantic.textTertiary}
              style={{ marginTop: 14, fontSize: 13, lineHeight: 20 }}
            >
              Take a breath. When you&apos;re ready, begin the audit below — there&apos;s no rush.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            block
            size="lg"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
              setArrived(true);
            }}
          >
            I&apos;m ready · begin
          </Button>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll padded={false} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Top: back + progress */}
        <View style={styles.topRow}>
          <Pressable onPress={goBack} style={styles.backBtn} hitSlop={8}>
            <Text variant="heading3" color={tokens.semantic.textSecondary}>
              ←
            </Text>
          </Pressable>
          <View style={styles.stepLabel}>
            <Text
              variant="mono"
              color={tokens.semantic.textTertiary}
              style={{ letterSpacing: 2, fontSize: 11 }}
            >
              AREA {idx + 1} OF {total}
            </Text>
          </View>
          <View style={{ width: 32 }} />
        </View>

        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                { backgroundColor: area.color },
                progressStyle,
              ]}
            />
          </View>
        </View>

        {/* Hero (first area only) */}
        {idx === 0 ? (
          <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
            <Text
              variant="eyebrow"
              color={tokens.semantic.accent}
              style={{ marginBottom: 6 }}
            >
              WHEEL OF LIFE
            </Text>
            <Text variant="heading1">Where are you,{'\n'}right now?</Text>
            <Text
              variant="bodyLarge"
              color={tokens.semantic.textSecondary}
              style={{ marginTop: 10, maxWidth: 320 }}
            >
              Rate each area of your life 1–10. Be honest.{' '}
              <Text
                variant="bodyLarge"
                italic
                color={tokens.semantic.accent}
              >
                Nothing is wasted here.
              </Text>
            </Text>
          </View>
        ) : null}

        {/* Area card — soft tint of the area's own color, brighter type */}
        <View
          style={[
            styles.areaCard,
            {
              backgroundColor: `${area.color}1A`, // ~10% tint
              borderColor: `${area.color}55`,
            },
          ]}
        >
          <View style={styles.areaHead}>
            <View style={[styles.iconWrap, { borderColor: `${area.color}88`, backgroundColor: `${area.color}22` }]}>
              <Text variant="heading2" style={{ fontSize: 32 }}>
                {area.icon}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                variant="eyebrow"
                color={area.color}
                style={{ letterSpacing: 2, fontSize: 13 }}
              >
                {area.id.toUpperCase()}
              </Text>
              <Text variant="heading2" style={{ marginTop: 4, fontSize: 26 }}>
                {area.name}
              </Text>
            </View>
          </View>

          {/* Question — bigger, primary text color so it doesn't fade */}
          <Text
            variant="displayItalic"
            color={tokens.semantic.textPrimary}
            style={{ marginTop: 22, fontSize: 26, lineHeight: 34 }}
          >
            {area.question}
          </Text>
          <Text
            variant="body"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 12, fontSize: 16, lineHeight: 24 }}
          >
            {area.subPrompt}
          </Text>

          {/* Voice coaching — the facilitator asks the question aloud */}
          <View style={{ marginTop: 16 }}>
            <SpeechPlayer
              key={area.id}
              text={coachLineForArea(area.name, area.question)}
              voiceId={WHEEL_VOICE_ID}
              accent={area.color}
              label="HEAR THIS REFLECTION"
              size="sm"
            />
          </View>

          {/* Why it matters — ALWAYS visible. No more tap-to-reveal. */}
          <View
            style={[
              styles.whyCard,
              {
                backgroundColor: `${area.color}14`,
                borderColor: `${area.color}44`,
              },
            ]}
          >
            <Text
              variant="mono"
              color={area.color}
              style={{ fontSize: 11, letterSpacing: 2, marginBottom: 8 }}
            >
              WHY IT MATTERS
            </Text>
            <Text
              variant="body"
              color={tokens.semantic.textPrimary}
              style={{ fontSize: 15, lineHeight: 23 }}
            >
              {area.whyItMatters}
            </Text>
          </View>

          <View style={{ marginTop: 28 }}>
            <RatingScale value={value} onChange={onRate} color={area.color} />
          </View>

          {scoreMeaningLine ? (
            <View
              style={[
                styles.meaningCard,
                {
                  borderColor: `${area.color}66`,
                  backgroundColor: `${area.color}14`,
                },
              ]}
            >
              <Text
                variant="body"
                color={tokens.semantic.textPrimary}
                style={{ fontSize: 15, lineHeight: 23 }}
              >
                {scoreMeaningLine}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          block
          size="lg"
          disabled={!value}
          onPress={goNext}
        >
          {idx === total - 1 ? 'See your wheel' : 'Next'}
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 140,
  },
  arrivalWrap: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 140,
  },
  arrivalPlayer: {
    marginTop: 36,
    padding: 22,
    borderRadius: tokens.radii.xl,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: `${tokens.semantic.accent}44`,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  stepLabel: {
    alignItems: 'center',
  },
  progressWrap: {
    paddingHorizontal: 20,
    marginTop: 14,
  },
  progressTrack: {
    height: 3,
    backgroundColor: tokens.semantic.borderSubtle,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  areaCard: {
    marginTop: 28,
    marginHorizontal: 20,
    padding: 24,
    borderRadius: tokens.radii.xl,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  areaHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.semantic.bgRaised,
  },
  // Slider
  track: {
    height: 44,
    justifyContent: 'center',
    paddingVertical: 16,
  },
  trackBar: {
    height: 3,
    borderRadius: 2,
    backgroundColor: tokens.semantic.borderDefault,
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    top: 20,
    height: 3,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    top: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    marginLeft: -11,
    backgroundColor: tokens.semantic.bone,
    borderWidth: 2,
  },
  numberRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  numberCell: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgRaised,
  },
  whyCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
  },
  scaleLegend: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meaningCard: {
    marginTop: 22,
    padding: 16,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: tokens.semantic.bgBase,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
});
