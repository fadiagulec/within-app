/**
 * VibrationMeter — Hawkins-Scale-inspired half-circle gauge.
 *
 * Design notes
 * ------------
 * - SVG half-circle (180° from 9-o'clock to 3-o'clock, bottom-anchored)
 *   drawn as two overlaid arc paths: a static background arc plus an
 *   animated foreground arc whose `strokeDashoffset` reveals the fill in
 *   sync with `value`.
 * - The foreground arc uses an SVG `LinearGradient` from terracotta →
 *   amber → gold so the colour itself reports altitude on the scale.
 * - A needle rendered as a `Line` rotates around the gauge centre via
 *   `useAnimatedProps` returning `transform="rotate(...)"`. Every value
 *   change runs `withTiming` 900ms with the spec's bezier (0.4,0,0.2,1)
 *   so the needle drifts rather than snaps.
 * - When `value` changes by more than a token amount we fire a soft
 *   web-safe haptic — perceptible but not disruptive.
 * - Below the gauge: a large mono number plus an arrow + delta when
 *   `previousValue` is provided. Tiny mono labels at 0 / 50 / 100 sit
 *   just above the arc endpoints and apex.
 */
import React, { useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from '@/lib/haptic';
import { tokens } from '@/theme/tokens';
import { Text } from './Text';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedLine = Animated.createAnimatedComponent(Line);

export type VibrationMeterSize = 'small' | 'medium';

export interface VibrationMeterProps {
  /** 0–100 scalar of where the user's field sits today. */
  value: number;
  /** Optional previous reading so we can render a ↑/↓ delta. */
  previousValue?: number;
  size?: VibrationMeterSize;
}

const SIZE_PX: Record<VibrationMeterSize, number> = {
  small: 160,
  medium: 240,
};

const ARC_GRADIENT_ID = 'vmGrad';

/**
 * Build a half-circle arc path from `startDeg` to `endDeg` at radius `r`
 * around (cx, cy). Angles in SVG-math degrees (0 = right, +90 = down).
 */
function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
): string {
  const startRad = (startDeg * Math.PI) / 180;
  const endRad = (endDeg * Math.PI) / 180;
  const x0 = cx + r * Math.cos(startRad);
  const y0 = cy + r * Math.sin(startRad);
  const x1 = cx + r * Math.cos(endRad);
  const y1 = cy + r * Math.sin(endRad);
  const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  const sweep = endDeg > startDeg ? 1 : 0;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${largeArc} ${sweep} ${x1} ${y1}`;
}

export function VibrationMeter({
  value,
  previousValue,
  size = 'medium',
}: VibrationMeterProps) {
  const sizePx = SIZE_PX[size];

  // viewBox uses a fixed coordinate system so geometry math is stable.
  const VB = 200;
  const cx = VB / 2;
  const cy = VB * 0.62; // pivot sits in the lower-third so the half-arc fills the frame
  const r = VB * 0.36;
  const strokeW = size === 'small' ? 10 : 12;

  // Half-circle from 180° (9 o'clock) sweeping clockwise to 360°/0° (3 o'clock).
  const startDeg = 180;
  const endDeg = 360;
  const arcLengthDeg = endDeg - startDeg;

  const bgPath = useMemo(() => arcPath(cx, cy, r, startDeg, endDeg), [cx, cy, r]);

  // Foreground: same arc geometry, rendered with strokeDasharray = arc length
  // so we animate strokeDashoffset to reveal the fill.
  // Arc length = πr (half circumference).
  const arcLen = Math.PI * r;

  const clamped = Math.max(0, Math.min(100, value));
  const targetPct = clamped / 100;

  // Shared values: animated percent (0..1) and previous value tracker.
  const pct = useSharedValue(targetPct);
  const lastValueRef = useRef<number>(value);

  useEffect(() => {
    pct.value = withTiming(targetPct, {
      duration: 900,
      easing: Easing.bezierFn(0.4, 0, 0.2, 1),
    });

    // Soft haptic on a meaningful change — guard against tiny float noise.
    if (Math.abs((lastValueRef.current ?? value) - value) >= 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }
    lastValueRef.current = value;
  }, [targetPct, value, pct]);

  // strokeDashoffset reveals the fill from start to current pct.
  const fgArcProps = useAnimatedProps(() => {
    const offset = arcLen * (1 - pct.value);
    return {
      strokeDashoffset: offset,
    };
  });

  // Needle rotates around (cx, cy). Map pct → angle along the arc.
  const needleProps = useAnimatedProps(() => {
    const deg = startDeg + arcLengthDeg * pct.value;
    return {
      transform: `rotate(${deg} ${cx} ${cy})`,
    };
  });

  // Needle geometry — a horizontal line from cx to cx+r (right of pivot)
  // pre-rotation; rotating by `deg` puts the tip on the arc at the right pct.
  // Slight inset so the tip sits just inside the arc track.
  const needleInset = strokeW + 4;
  const needleX1 = cx;
  const needleY1 = cy;
  const needleX2 = cx + r - needleInset / 2;
  const needleY2 = cy;

  // Label positions just above arc endpoints + apex.
  const labelOffset = strokeW + 12;
  const labelLeft = {
    x: cx - r,
    y: cy + 4,
  };
  const labelRight = {
    x: cx + r,
    y: cy + 4,
  };
  const labelMid = {
    x: cx,
    y: cy - r - labelOffset * 0.4,
  };

  // Trend computation
  const delta =
    typeof previousValue === 'number'
      ? Math.round((value - previousValue) * 10) / 10
      : null;
  const trendArrow = delta == null ? '' : delta > 0 ? '↑' : delta < 0 ? '↓' : '·';
  const trendColor =
    delta == null
      ? tokens.semantic.textTertiary
      : delta > 0
      ? tokens.palette.successSage
      : delta < 0
      ? tokens.palette.errorRust
      : tokens.semantic.textTertiary;

  const numberSize = size === 'small' ? 28 : 40;
  const labelFontSize = size === 'small' ? 8 : 9;

  return (
    <View style={[styles.root, { width: sizePx }]}>
      <Svg
        width={sizePx}
        height={sizePx * 0.7}
        viewBox={`0 0 ${VB} ${VB * 0.7}`}
      >
        <Defs>
          <LinearGradient id={ARC_GRADIENT_ID} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor="#A05A3E" />
            <Stop offset="50%" stopColor="#C2712C" />
            <Stop offset="100%" stopColor={tokens.semantic.accent} />
          </LinearGradient>
        </Defs>

        {/* Background arc */}
        <Path
          d={bgPath}
          stroke={tokens.semantic.borderDefault}
          strokeWidth={strokeW}
          strokeLinecap="round"
          fill="none"
        />

        {/* Foreground gradient arc — clipped via dashoffset */}
        <AnimatedPath
          d={bgPath}
          stroke={`url(#${ARC_GRADIENT_ID})`}
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={`${arcLen} ${arcLen}`}
          fill="none"
          animatedProps={fgArcProps}
        />

        {/* Tick labels at 0 / 50 / 100 */}
        <SvgText
          x={labelLeft.x}
          y={labelLeft.y}
          fill={tokens.semantic.textTertiary}
          fontSize={labelFontSize}
          fontFamily={tokens.fonts.mono}
          textAnchor="middle"
        >
          0
        </SvgText>
        <SvgText
          x={labelMid.x}
          y={labelMid.y}
          fill={tokens.semantic.textTertiary}
          fontSize={labelFontSize}
          fontFamily={tokens.fonts.mono}
          textAnchor="middle"
        >
          50
        </SvgText>
        <SvgText
          x={labelRight.x}
          y={labelRight.y}
          fill={tokens.semantic.textTertiary}
          fontSize={labelFontSize}
          fontFamily={tokens.fonts.mono}
          textAnchor="middle"
        >
          100
        </SvgText>

        {/* Needle */}
        <G>
          <AnimatedLine
            x1={needleX1}
            y1={needleY1}
            x2={needleX2}
            y2={needleY2}
            stroke={tokens.semantic.bone}
            strokeWidth={size === 'small' ? 2 : 2.5}
            strokeLinecap="round"
            animatedProps={needleProps}
          />
        </G>

        {/* Pivot cap */}
        <Circle
          cx={cx}
          cy={cy}
          r={size === 'small' ? 4 : 5}
          fill={tokens.semantic.accent}
        />
        <Circle
          cx={cx}
          cy={cy}
          r={size === 'small' ? 1.5 : 2}
          fill={tokens.semantic.bgBase}
        />
      </Svg>

      <View style={styles.readout}>
        <Text
          variant="mono"
          style={{ fontSize: numberSize, color: tokens.semantic.accent }}
        >
          {Math.round(clamped)}
        </Text>
        {delta != null ? (
          <View style={styles.trendRow}>
            <Text
              variant="mono"
              style={{ color: trendColor, fontSize: labelFontSize + 4 }}
            >
              {trendArrow}
            </Text>
            <Text
              variant="mono"
              style={{
                color: trendColor,
                fontSize: labelFontSize + 2,
                marginLeft: 2,
              }}
            >
              {Math.abs(delta).toFixed(1)}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  readout: {
    marginTop: -6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginLeft: 8,
  },
});
