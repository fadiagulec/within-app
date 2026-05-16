/**
 * BreathOrb — animated breathing visual for guided breathwork.
 *
 * Design notes
 * ------------
 * - Built with react-native-svg + Reanimated 3 so the same component runs
 *   on iOS / Android / web (Reanimated 3 supports web).
 * - Resting state is a slow 1s pulse between 0.85 and 0.95 — a hint of
 *   life so the orb doesn't feel dead before practice begins.
 * - Active state runs the chosen breath pattern as a `withRepeat` loop of
 *   `withSequence` phases. Each phase scales the orb with the appropriate
 *   easing (ease-out for inhale so the lungs feel "filled", ease-in for
 *   exhale so the contraction feels released, linear for holds).
 * - Phase transitions emit a web-safe haptic and call `onPhaseChange` via
 *   `runOnJS`. Phase label below the orb cross-fades.
 * - Visual: a glow ring (radial-feel via SVG opacity layers) + an inner
 *   solid orb. Both pulse together via a single shared `scale` value so
 *   they breathe as one body.
 * - `phaseLabel` prop is kept for backwards compatibility with the existing
 *   AudioPlayer call-site, which passes a static phase string.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from '@/lib/haptic';
import { tokens } from '@/theme/tokens';
import { Text } from './Text';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type BreathPattern = '4-7-8' | 'box' | 'coherent' | 'fire';
export type BreathPhase = 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

export interface BreathOrbProps {
  pattern?: BreathPattern;
  isActive?: boolean;
  chakraColor?: string;
  size?: number;
  onPhaseChange?: (phase: BreathPhase) => void;
  /**
   * Optional label override — used by the audio player to display a static
   * phase string ("Inhale" / "Soon" / etc.) when not running an active
   * breath pattern. When `isActive` is true the internal phase wins.
   */
  phaseLabel?: string;
}

interface PhaseStep {
  phase: BreathPhase;
  /** Target scale at the end of this step. */
  toScale: number;
  /** Duration in ms. */
  duration: number;
  /** Ease curve appropriate to the phase. */
  easing: (t: number) => number;
}

const SCALE_REST_LOW = 0.85;
const SCALE_REST_HIGH = 0.95;
const SCALE_INHALE = 1.2;

function buildPattern(pattern: BreathPattern): PhaseStep[] {
  switch (pattern) {
    case '4-7-8':
      return [
        { phase: 'inhale', toScale: SCALE_INHALE, duration: 4000, easing: Easing.out(Easing.cubic) },
        { phase: 'hold-in', toScale: SCALE_INHALE, duration: 7000, easing: Easing.linear },
        { phase: 'exhale', toScale: SCALE_REST_LOW, duration: 8000, easing: Easing.in(Easing.cubic) },
      ];
    case 'box':
      return [
        { phase: 'inhale', toScale: SCALE_INHALE, duration: 4000, easing: Easing.out(Easing.cubic) },
        { phase: 'hold-in', toScale: SCALE_INHALE, duration: 4000, easing: Easing.linear },
        { phase: 'exhale', toScale: SCALE_REST_LOW, duration: 4000, easing: Easing.in(Easing.cubic) },
        { phase: 'hold-out', toScale: SCALE_REST_LOW, duration: 4000, easing: Easing.linear },
      ];
    case 'coherent':
      return [
        { phase: 'inhale', toScale: SCALE_INHALE, duration: 5000, easing: Easing.bezierFn(0.4, 0, 0.6, 1) },
        { phase: 'exhale', toScale: SCALE_REST_LOW, duration: 5000, easing: Easing.bezierFn(0.4, 0, 0.6, 1) },
      ];
    case 'fire':
      // Six rapid pulses (3s on) then a 1s rest, all at half-second cadence.
      return [
        { phase: 'inhale', toScale: SCALE_INHALE, duration: 250, easing: Easing.out(Easing.cubic) },
        { phase: 'exhale', toScale: SCALE_REST_LOW, duration: 250, easing: Easing.in(Easing.cubic) },
        { phase: 'inhale', toScale: SCALE_INHALE, duration: 250, easing: Easing.out(Easing.cubic) },
        { phase: 'exhale', toScale: SCALE_REST_LOW, duration: 250, easing: Easing.in(Easing.cubic) },
        { phase: 'inhale', toScale: SCALE_INHALE, duration: 250, easing: Easing.out(Easing.cubic) },
        { phase: 'exhale', toScale: SCALE_REST_LOW, duration: 250, easing: Easing.in(Easing.cubic) },
        { phase: 'inhale', toScale: SCALE_INHALE, duration: 250, easing: Easing.out(Easing.cubic) },
        { phase: 'exhale', toScale: SCALE_REST_LOW, duration: 250, easing: Easing.in(Easing.cubic) },
        { phase: 'inhale', toScale: SCALE_INHALE, duration: 250, easing: Easing.out(Easing.cubic) },
        { phase: 'exhale', toScale: SCALE_REST_LOW, duration: 250, easing: Easing.in(Easing.cubic) },
        { phase: 'inhale', toScale: SCALE_INHALE, duration: 250, easing: Easing.out(Easing.cubic) },
        { phase: 'exhale', toScale: SCALE_REST_LOW, duration: 250, easing: Easing.in(Easing.cubic) },
        { phase: 'hold-out', toScale: SCALE_REST_LOW, duration: 1000, easing: Easing.linear },
      ];
  }
}

const PHASE_LABELS: Record<BreathPhase, string> = {
  inhale: 'Inhale',
  'hold-in': 'Hold',
  exhale: 'Exhale',
  'hold-out': 'Rest',
};

export function BreathOrb({
  pattern = 'coherent',
  isActive = false,
  chakraColor = tokens.semantic.accent,
  size = 200,
  onPhaseChange,
  phaseLabel,
}: BreathOrbProps) {
  const scale = useSharedValue(SCALE_REST_LOW);
  const labelOpacity = useSharedValue(1);

  const [activePhase, setActivePhase] = useState<BreathPhase>('exhale');
  // Keep a stable JS-side ref so worklets can call without recreating callbacks.
  const onPhaseChangeRef = useRef(onPhaseChange);
  onPhaseChangeRef.current = onPhaseChange;

  const handlePhase = (phase: BreathPhase) => {
    setActivePhase(phase);
    onPhaseChangeRef.current?.(phase);
    Haptics.impactAsync(
      phase === 'inhale' || phase === 'exhale'
        ? Haptics.ImpactFeedbackStyle.Soft
        : Haptics.ImpactFeedbackStyle.Light,
    );
    // Cross-fade the label.
    labelOpacity.value = withSequence(
      withTiming(0, { duration: 180, easing: Easing.in(Easing.cubic) }),
      withTiming(1, { duration: 320, easing: Easing.out(Easing.cubic) }),
    );
  };

  // Drive the breath loop. Re-runs when isActive or pattern changes.
  useEffect(() => {
    cancelAnimation(scale);

    if (!isActive) {
      // Resting state: slow 1s pulse between 0.85 ↔ 0.95.
      scale.value = withRepeat(
        withSequence(
          withTiming(SCALE_REST_HIGH, {
            duration: 1000,
            easing: Easing.inOut(Easing.quad),
          }),
          withTiming(SCALE_REST_LOW, {
            duration: 1000,
            easing: Easing.inOut(Easing.quad),
          }),
        ),
        -1,
        false,
      );
      return () => {
        cancelAnimation(scale);
      };
    }

    const steps = buildPattern(pattern);
    if (steps.length === 0) return;

    // Announce the very first phase before the first step begins.
    // Defer with setTimeout(0) so we never set state during render.
    const initialPhase = steps[0]!.phase;
    const t = setTimeout(() => handlePhase(initialPhase), 0);

    // Each step's withTiming callback fires when THAT step finishes, which
    // is when the NEXT step is about to begin → use it to announce the next
    // phase. We loop the indices so the last step announces step 0 again.
    const sequenced = steps.map((step, i) => {
      const nextPhase = steps[(i + 1) % steps.length]!.phase;
      return withTiming(
        step.toScale,
        {
          duration: step.duration,
          easing: step.easing,
        },
        (finished) => {
          'worklet';
          if (finished) {
            runOnJS(handlePhase)(nextPhase);
          }
        },
      );
    });

    const first = sequenced[0]!;
    const rest = sequenced.slice(1);
    scale.value = withRepeat(
      withSequence(first, ...rest),
      -1,
      false,
    );

    return () => {
      clearTimeout(t);
      cancelAnimation(scale);
    };
  }, [isActive, pattern, scale]);

  // SVG geometry — viewBox stays a fixed 100×100 unit space; we scale via SVG
  // size prop. The radial gradient is faked through stacked circles with
  // decreasing opacity at increasing radii so it works on every renderer
  // (including web) without depending on RadialGradient quirks.
  const cx = 50;
  const cy = 50;
  const innerR = 22;
  const midR = 30;
  const glowR = 44;

  const innerProps = useAnimatedProps(() => ({
    r: innerR * scale.value,
  }));
  const midProps = useAnimatedProps(() => ({
    r: midR * scale.value,
  }));
  const glowProps = useAnimatedProps(() => ({
    r: glowR * scale.value,
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
  }));

  const displayedLabel = useMemo(() => {
    if (!isActive && phaseLabel) return phaseLabel;
    return PHASE_LABELS[activePhase];
  }, [isActive, phaseLabel, activePhase]);

  return (
    <View style={[styles.root, { width: size, height: size + 36 }]}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
      >
        <Defs>
          <RadialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={chakraColor} stopOpacity={0.3} />
            <Stop offset="100%" stopColor={chakraColor} stopOpacity={0} />
          </RadialGradient>
        </Defs>

        {/* Outer glow — radial gradient ring */}
        <AnimatedCircle
          cx={cx}
          cy={cy}
          fill="url(#orbGrad)"
          animatedProps={glowProps}
        />

        {/* Mid layer — softens transition */}
        <AnimatedCircle
          cx={cx}
          cy={cy}
          fill={chakraColor}
          fillOpacity={0.18}
          animatedProps={midProps}
        />

        {/* Inner solid orb — chakraColor at 60% */}
        <AnimatedCircle
          cx={cx}
          cy={cy}
          fill={chakraColor}
          fillOpacity={0.6}
          animatedProps={innerProps}
        />
      </Svg>

      <Animated.View style={[styles.labelWrap, labelStyle]}>
        <Text variant="label" align="center" color={tokens.semantic.bone}>
          {displayedLabel}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
