/**
 * Within — Wheel of Life result
 *
 * Shows the completed wheel as a radial SVG (8 segments), the score summary,
 * the lowest-area healing invitation, and CTAs to either begin chakra work
 * or jump into the 21-day Journey.
 */

import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Circle, G, Line, Path, Text as SvgText } from 'react-native-svg';
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
import { WHEEL_VOICE_ID } from '@/coach/voiceConfig';
import {
  LIFE_AREAS,
  LifeArea,
  interpretAverage,
  interpretImbalance,
  WheelResult,
} from '@/data/wheel-of-life';
import { useWheelStore } from '@/store/useWheelStore';
import { useUserStore } from '@/store/useUserStore';
// completeOnboarding is destructured below — needed so the welcome→wheel
// path doesn't trap returning users in re-onboarding.
import { chakraIdToKey } from '@/data/chakra-id-mapping';
import { CHAKRA_CONTENT } from '@/data/chakra-content';

// ============ Radial wheel SVG ============

interface WheelRadialProps {
  result: WheelResult;
  size?: number;
}

function WheelRadial({ result, size = 280 }: WheelRadialProps) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 16;
  const areas = LIFE_AREAS;
  const segCount = areas.length;

  // Each segment spans 360 / 8 = 45° around a center point.
  // Pre-compute segment path for each area — radial pie slice length = score/10 * outerR.
  function slicePath(i: number, score: number): string {
    const radius = (score / 10) * outerR;
    const angleStart = -Math.PI / 2 + (i * 2 * Math.PI) / segCount;
    const angleEnd = angleStart + (2 * Math.PI) / segCount;
    const x1 = cx + radius * Math.cos(angleStart);
    const y1 = cy + radius * Math.sin(angleStart);
    const x2 = cx + radius * Math.cos(angleEnd);
    const y2 = cy + radius * Math.sin(angleEnd);
    const largeArc = 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  }

  return (
    <Svg width={size} height={size}>
      {/* Faded outer ring — the "10 across the board" goal */}
      <Circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke={tokens.semantic.borderStrong}
        strokeWidth={1}
        strokeDasharray="2 4"
      />
      <Circle
        cx={cx}
        cy={cy}
        r={outerR * 0.66}
        fill="none"
        stroke={tokens.semantic.borderSubtle}
        strokeWidth={1}
      />
      <Circle
        cx={cx}
        cy={cy}
        r={outerR * 0.33}
        fill="none"
        stroke={tokens.semantic.borderSubtle}
        strokeWidth={1}
      />

      {/* Segments */}
      <G>
        {areas.map((a, i) => {
          const score = result.scores[a.id] ?? 0;
          return (
            <Path
              key={a.id}
              d={slicePath(i, score)}
              fill={a.color}
              fillOpacity={0.38}
              stroke={a.color}
              strokeOpacity={0.9}
              strokeWidth={1}
            />
          );
        })}
      </G>

      {/* Radial dividers */}
      {areas.map((_, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / segCount;
        const x = cx + outerR * Math.cos(angle);
        const y = cy + outerR * Math.sin(angle);
        return (
          <Line
            key={`div-${i}`}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke={tokens.semantic.borderSubtle}
            strokeWidth={0.5}
          />
        );
      })}

      {/* Center anchor */}
      <Circle cx={cx} cy={cy} r={3} fill={tokens.semantic.accent} />

      {/* Labels just outside the ring */}
      {areas.map((a, i) => {
        const angle = -Math.PI / 2 + ((i + 0.5) * 2 * Math.PI) / segCount;
        const labelR = outerR + 4;
        const lx = cx + labelR * Math.cos(angle);
        const ly = cy + labelR * Math.sin(angle);
        return (
          <SvgText
            key={`l-${a.id}`}
            x={lx}
            y={ly}
            fill={tokens.semantic.textTertiary}
            fontSize={9}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {a.icon}
          </SvgText>
        );
      })}
    </Svg>
  );
}

// ============ Page ============

export default function WheelResultScreen() {
  const router = useRouter();
  const getLatest = useWheelStore((s) => s.getLatest);
  const setPrimaryChakra = useUserStore((s) => s.setPrimaryChakra);
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);
  const result = getLatest();

  const fadeIn = useSharedValue(0);
  useEffect(() => {
    fadeIn.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
  }, [fadeIn]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [
      {
        translateY: (1 - fadeIn.value) * 12,
      },
    ],
  }));

  const lowArea: LifeArea | undefined = useMemo(
    () => (result ? LIFE_AREAS.find((a) => a.id === result.lowestArea) : undefined),
    [result]
  );
  const highArea: LifeArea | undefined = useMemo(
    () => (result ? LIFE_AREAS.find((a) => a.id === result.highestArea) : undefined),
    [result]
  );

  if (!result || !lowArea || !highArea) {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text variant="heading2">No wheel recorded yet.</Text>
          <View style={{ height: 16 }} />
          <Button onPress={() => router.replace('/(onboarding)/wheel-of-life')}>
            Rate your wheel
          </Button>
        </View>
      </Screen>
    );
  }

  const avg = interpretAverage(result.average);
  const imbalance = interpretImbalance(result.imbalanceScore);
  const lowChakraId = lowArea.healingPath.chakra;
  const lowChakra = CHAKRA_CONTENT[lowChakraId];
  const lowChakraName = lowChakra?.name ?? 'Root';
  const lowChakraKey = chakraIdToKey(lowChakraId);

  function beginChakraWork() {
    // Remember the direction the wheel pointed to — user's primary chakra.
    setPrimaryChakra(lowChakraKey);
    // Mark onboarding done so the user isn't bounced back here on next visit.
    completeOnboarding();
    router.push({
      pathname: '/chakra/[id]',
      params: { id: lowChakraId },
    });
  }

  function goGetUnstuck() {
    completeOnboarding();
    router.push('/(tabs)/journey' as never);
  }

  function skipForNow() {
    // Don't complete onboarding here — chakra-quiz is the next step, and
    // its own completion handler should flip the flag once the user
    // actually finishes (or skips from) the quiz.
    router.replace('/(onboarding)/chakra-quiz');
  }

  return (
    <Screen scroll padded={false} edges={['top', 'left', 'right']}>
      <Animated.View style={[{ paddingBottom: 240 }, fadeStyle]}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            variant="eyebrow"
            color={tokens.semantic.accent}
            align="center"
            style={{ marginTop: 8 }}
          >
            YOUR WHEEL
          </Text>
          <Text
            variant="heading1"
            align="center"
            style={{ marginTop: 8 }}
          >
            This is the{' '}
            <Text variant="heading1" italic color={tokens.semantic.accent}>
              shape
            </Text>
            {'\n'}of your life.
          </Text>
        </View>

        <View style={styles.wheelWrap}>
          <WheelRadial result={result} size={300} />
        </View>

        {/* Narrated reveal — the facilitator reflects on the wheel */}
        <View style={styles.revealPlayer}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.8, marginBottom: 10 }}>
            LET ME READ YOUR WHEEL BACK TO YOU
          </Text>
          <SpeechPlayer
            text={[
              `Here is your wheel. Look at it gently.`,
              ``,
              `This is not a verdict. It is a map — a map of where your life is asking for your attention.`,
              ``,
              `The areas that are full: let yourself feel grateful for them. You built those.`,
              ``,
              `The areas that are low are not failures. They are simply the places that are ready for your care next.`,
              ``,
              `Your average today is ${result.average.toFixed(1)} out of ten. ${avg.body}`,
              ``,
              `And the area asking for your attention first is ${lowArea.name}. Not because you have failed there. Because it is ready.`,
              ``,
              `This is where we begin. Gently. Together.`,
            ].join('\n')}
            voiceId={WHEEL_VOICE_ID}
            accent={tokens.semantic.accent}
            label="HEAR YOUR REFLECTION"
          />
        </View>

        {/* Score summary */}
        <View style={styles.summary}>
          <View style={styles.summaryLeft}>
            <Text
              variant="mono"
              color={tokens.semantic.textTertiary}
              style={{ letterSpacing: 2 }}
            >
              AVERAGE
            </Text>
            <Text
              variant="hero"
              style={{ fontSize: 72, lineHeight: 72 }}
              color={tokens.semantic.accent}
            >
              {result.average.toFixed(1)}
            </Text>
            <Text
              variant="bodySmall"
              color={tokens.semantic.textTertiary}
            >
              out of 10
            </Text>
          </View>
          <View style={styles.summaryRight}>
            <Text variant="eyebrow" color={tokens.semantic.textSecondary}>
              {avg.label.toUpperCase()}
            </Text>
            <Text
              variant="bodySmall"
              color={tokens.semantic.textSecondary}
              style={{ marginTop: 8, lineHeight: 20 }}
            >
              {avg.body}
            </Text>
          </View>
        </View>

        {/* Imbalance */}
        <View style={styles.imbalance}>
          <Text variant="eyebrow" color={tokens.semantic.textSecondary}>
            BALANCE · {imbalance.label.toUpperCase()}
          </Text>
          <Text
            variant="bodySmall"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 8, lineHeight: 20 }}
          >
            {imbalance.body}
          </Text>
        </View>

        {/* Lowest area — the invitation */}
        <View
          style={[
            styles.lowCard,
            { borderColor: `${lowArea.color}66` },
          ]}
        >
          <Text variant="eyebrow" color={lowArea.color}>
            YOUR ATTENTION IS NEEDED HERE
          </Text>
          <Text variant="heading1" style={{ marginTop: 8 }}>
            {lowArea.name}
          </Text>

          {/* THE CHAIN — Life area → Chakra → Shadow Feeling */}
          <View style={styles.chainContainer}>
            <View style={styles.chainRow}>
              <View style={styles.chainStep}>
                <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.chainLabel}>
                  AREA
                </Text>
                <Text variant="bodySmall" style={styles.chainValue}>
                  {lowArea.name.split(' & ')[0]}
                </Text>
              </View>
              <Text variant="body" color={lowArea.color} style={styles.chainArrow}>
                →
              </Text>
              <View style={styles.chainStep}>
                <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.chainLabel}>
                  CHAKRA
                </Text>
                <Text variant="bodySmall" color={lowArea.color} style={styles.chainValue}>
                  {lowChakra?.name ?? ''}
                </Text>
              </View>
              <Text variant="body" color={lowArea.color} style={styles.chainArrow}>
                →
              </Text>
              <View style={styles.chainStep}>
                <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.chainLabel}>
                  SHADOW
                </Text>
                <Text variant="bodySmall" color={lowArea.color} style={styles.chainValue}>
                  {lowChakra?.shadowFeeling ?? ''}
                </Text>
              </View>
            </View>
            <Text
              variant="bodySmall"
              color={tokens.semantic.textTertiary}
              style={{ marginTop: 12, fontStyle: 'italic', lineHeight: 20 }}
            >
              Your {(lowArea.name.split(' & ')[0] ?? lowArea.name).toLowerCase()} is low because{' '}
              {lowChakra?.name ?? 'this center'} is blocked. The shadow here is{' '}
              <Text variant="bodySmall" color={lowArea.color} style={{ fontWeight: '600' }}>
                {lowChakra?.shadowFeeling?.toLowerCase() ?? 'this pattern'}
              </Text>
              . Meet it here — move it through — and this life area opens.
            </Text>
          </View>

          <Text
            variant="displayItalic"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 16, lineHeight: 28 }}
          >
            {lowArea.healingPath.invitation}
          </Text>
          <View style={styles.startingPractice}>
            <Text variant="mono" color={tokens.semantic.textTertiary}>
              WHERE TO BEGIN
            </Text>
            <Text
              variant="bodySmall"
              color={tokens.semantic.textSecondary}
              style={{ marginTop: 6, lineHeight: 20 }}
            >
              {lowArea.healingPath.startingPractice}
            </Text>
          </View>
        </View>

        {/* Highest area — strength note */}
        <View style={styles.highNote}>
          <Text variant="eyebrow" color={tokens.semantic.successSage}>
            YOUR STRENGTH
          </Text>
          <Text variant="heading3" style={{ marginTop: 6 }}>
            {highArea.name}
          </Text>
          <Text
            variant="bodySmall"
            color={tokens.semantic.textTertiary}
            style={{ marginTop: 6 }}
          >
            Keep returning here. This is an anchor while you tend the rest.
          </Text>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <Button block size="lg" onPress={beginChakraWork}>
          Begin with {lowChakraName} work →
        </Button>
        <Pressable onPress={goGetUnstuck} style={styles.secondary}>
          <Text variant="body" color={tokens.semantic.accent}>
            Start the 21-day Journey instead
          </Text>
        </Pressable>
        <Pressable onPress={skipForNow} style={styles.tertiary}>
          <Text variant="bodySmall" color={tokens.semantic.textTertiary}>
            Skip for now
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wheelWrap: {
    alignItems: 'center',
    marginTop: 24,
  },
  revealPlayer: {
    marginTop: 24,
    marginHorizontal: 20,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: `${tokens.semantic.accent}44`,
    alignItems: 'center',
  },
  summary: {
    marginTop: 32,
    marginHorizontal: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderRadius: tokens.radii.xl,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  summaryLeft: {
    alignItems: 'flex-start',
  },
  summaryRight: {
    flex: 1,
  },
  imbalance: {
    marginTop: 12,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  lowCard: {
    marginTop: 24,
    marginHorizontal: 20,
    padding: 24,
    borderRadius: tokens.radii.xl,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
  },
  startingPractice: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
  chainContainer: {
    marginTop: 16,
    paddingTop: 16,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
  chainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  chainStep: {
    flex: 1,
    alignItems: 'center',
  },
  chainLabel: {
    letterSpacing: 1.5,
    fontSize: 10,
    marginBottom: 4,
  },
  chainValue: {
    fontWeight: '500',
    textAlign: 'center',
  },
  chainArrow: {
    fontSize: 18,
    paddingHorizontal: 4,
  },
  highNote: {
    marginTop: 16,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
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
    gap: 10,
  },
  secondary: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  tertiary: {
    alignItems: 'center',
    paddingVertical: 4,
  },
});
