/**
 * ChakraWheel — interactive 7-chakra mandala built with react-native-svg
 * and animated via Reanimated 3.
 *
 * Design notes
 * ------------
 * - Geometry: 7 equal donut-style segments around a circle, drawn as wedge
 *   `Path`s using the SVG arc command. Root sits at 6-o'clock and the
 *   sequence walks clockwise (root → sacral → solar-plexus → heart → throat
 *   → third-eye → crown). With 7 segments crown lands near the top — the
 *   accepted approximation for a 7-chakra wheel.
 * - Mount entrance: each segment is rendered through an Animated `<G>` that
 *   rotates from -10° to 0° around the wheel centre, staggered 50ms, eased
 *   with `Easing.out(Easing.cubic)` for a soft settle.
 * - Selection: the active segment scales to 1.08× and breathes between 1.0
 *   and 1.05 over 2.4s with a smooth bezier (CSS `ease-in-out`-equivalent).
 *   Unselected segments fade to opacity 0.65. A halo ring is rendered behind
 *   the selected segment using the chakra glow colour for a soft bloom.
 * - Tap target: each segment has a transparent hit-circle Pressable overlay
 *   sized to the wedge centre for ergonomic tapping; tap fires haptic +
 *   `onSelect`.
 * - Centre dot uses the brand accent (gold). Mantra labels are opt-in via
 *   `showLabels` so the wheel reads as a clean mandala by default.
 */
import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import * as Haptics from '@/lib/haptic';
import { tokens, chakraColors, chakraGlow } from '@/theme/tokens';
import type { ChakraId } from '@/data/chakra-content';

const AnimatedG = Animated.createAnimatedComponent(G);

export type ChakraWheelSize = 'small' | 'medium' | 'large';

export interface ChakraWheelProps {
  size?: ChakraWheelSize;
  selectedChakra?: ChakraId;
  onSelect?: (id: ChakraId) => void;
  showLabels?: boolean;
}

const SIZE_PX: Record<ChakraWheelSize, number> = {
  small: 120,
  medium: 240,
  large: 320,
};

interface ChakraSpec {
  id: ChakraId;
  color: string;
  glow: string;
  mantra: string;
}

// Order matters — root at bottom, walking clockwise.
const CHAKRA_ORDER: ChakraSpec[] = [
  { id: 'root', color: chakraColors.root, glow: chakraGlow.root, mantra: 'LAM' },
  { id: 'sacral', color: chakraColors.sacral, glow: chakraGlow.sacral, mantra: 'VAM' },
  { id: 'solar-plexus', color: chakraColors.solar, glow: chakraGlow.solar, mantra: 'RAM' },
  { id: 'heart', color: chakraColors.heart, glow: chakraGlow.heart, mantra: 'YAM' },
  { id: 'throat', color: chakraColors.throat, glow: chakraGlow.throat, mantra: 'HAM' },
  { id: 'third-eye', color: chakraColors.thirdEye, glow: chakraGlow.thirdEye, mantra: 'OM' },
  { id: 'crown', color: chakraColors.crown, glow: chakraGlow.crown, mantra: 'OM' },
];

/**
 * Build the SVG path for an annular sector (donut wedge).
 * angles in degrees, SVG-math convention (0 = right, +90 = down).
 */
function annularSectorPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startDeg: number,
  endDeg: number,
): string {
  const startRad = (startDeg * Math.PI) / 180;
  const endRad = (endDeg * Math.PI) / 180;

  const x0 = cx + rOuter * Math.cos(startRad);
  const y0 = cy + rOuter * Math.sin(startRad);
  const x1 = cx + rOuter * Math.cos(endRad);
  const y1 = cy + rOuter * Math.sin(endRad);

  const x2 = cx + rInner * Math.cos(endRad);
  const y2 = cy + rInner * Math.sin(endRad);
  const x3 = cx + rInner * Math.cos(startRad);
  const y3 = cy + rInner * Math.sin(startRad);

  const largeArc = endDeg - startDeg > 180 ? 1 : 0;

  return [
    `M ${x0} ${y0}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x1} ${y1}`,
    `L ${x2} ${y2}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${x3} ${y3}`,
    'Z',
  ].join(' ');
}

interface SegmentProps {
  spec: ChakraSpec;
  index: number;
  cx: number;
  cy: number;
  rOuter: number;
  rInner: number;
  startDeg: number;
  endDeg: number;
  isSelected: boolean;
  hasSelection: boolean;
  showLabel: boolean;
}

/**
 * One animated wedge. Owns its own scale + rotate shared values so that
 * mount stagger and selection-pulse can run independently per-segment.
 */
function ChakraSegment({
  spec,
  index,
  cx,
  cy,
  rOuter,
  rInner,
  startDeg,
  endDeg,
  isSelected,
  hasSelection,
  showLabel,
}: SegmentProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(-10);
  const opacity = useSharedValue(1);

  // Mount entrance — staggered settle from -10° to 0°.
  useEffect(() => {
    rotation.value = withDelay(
      index * 50,
      withTiming(0, {
        duration: 520,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [index, rotation]);

  // Selection target + pulse loop.
  useEffect(() => {
    cancelAnimation(scale);
    cancelAnimation(opacity);
    if (isSelected) {
      // Snap to the selected scale (1.08), then breathe to 1.05–1.13.
      scale.value = withSequence(
        withTiming(1.08, { duration: 280, easing: Easing.out(Easing.cubic) }),
        withRepeat(
          withSequence(
            withTiming(1.13, {
              duration: 1200,
              easing: Easing.bezierFn(0.4, 0, 0.6, 1),
            }),
            withTiming(1.08, {
              duration: 1200,
              easing: Easing.bezierFn(0.4, 0, 0.6, 1),
            }),
          ),
          -1,
          false,
        ),
      );
      opacity.value = withTiming(1, { duration: 280 });
    } else if (hasSelection) {
      scale.value = withTiming(1, { duration: 280, easing: Easing.out(Easing.cubic) });
      opacity.value = withTiming(0.65, { duration: 280 });
    } else {
      scale.value = withTiming(1, { duration: 280, easing: Easing.out(Easing.cubic) });
      opacity.value = withTiming(1, { duration: 280 });
    }
  }, [isSelected, hasSelection, scale, opacity]);

  // SVG transforms compose right-to-left in matrix order. To scale a wedge
  // around the wheel centre we translate to centre, scale, translate back —
  // wrapped by the entrance rotation also pivoted on the centre.
  const animatedProps = useAnimatedProps(() => {
    const s = scale.value;
    return {
      transform: `rotate(${rotation.value} ${cx} ${cy}) translate(${cx} ${cy}) scale(${s} ${s}) translate(${-cx} ${-cy})`,
      opacity: opacity.value,
    };
  });

  // Compose the path once geometry is fixed.
  const segPath = useMemo(
    () => annularSectorPath(cx, cy, rOuter, rInner, startDeg, endDeg),
    [cx, cy, rOuter, rInner, startDeg, endDeg],
  );

  // Halo (slightly larger wedge in glow colour, only when selected).
  const haloPath = useMemo(
    () => annularSectorPath(cx, cy, rOuter + 6, rInner - 4, startDeg, endDeg),
    [cx, cy, rOuter, rInner, startDeg, endDeg],
  );

  // Mid-arc point for label placement.
  const midDeg = (startDeg + endDeg) / 2;
  const midRad = (midDeg * Math.PI) / 180;
  const labelR = (rOuter + rInner) / 2;
  const labelX = cx + labelR * Math.cos(midRad);
  const labelY = cy + labelR * Math.sin(midRad);

  return (
    <AnimatedG animatedProps={animatedProps}>
      {isSelected ? (
        <Path d={haloPath} fill={spec.glow} opacity={0.9} />
      ) : null}
      <Path d={segPath} fill={spec.color} />
      {showLabel ? (
        <SvgText
          x={labelX}
          y={labelY}
          fill={tokens.semantic.bone}
          fontSize={Math.max(8, (rOuter - rInner) * 0.22)}
          fontFamily={tokens.fonts.mono}
          textAnchor="middle"
          alignmentBaseline="middle"
          opacity={0.85}
        >
          {spec.mantra}
        </SvgText>
      ) : null}
    </AnimatedG>
  );
}

export function ChakraWheel({
  size = 'medium',
  selectedChakra,
  onSelect,
  showLabels = false,
}: ChakraWheelProps) {
  const sizePx = SIZE_PX[size];
  const cx = sizePx / 2;
  const cy = sizePx / 2;
  const rOuter = sizePx / 2 - sizePx * 0.04; // breathing room for halo
  const rInner = sizePx * 0.18;
  const segCount = CHAKRA_ORDER.length;
  const segArc = 360 / segCount;

  // Root starts at 6 o'clock (SVG +90°). Each segment is centred on its
  // canonical angle and spans `segArc` total. Root is index 0 and the
  // sequence proceeds clockwise (= increasing SVG angle).
  const rootCenterDeg = 90;
  const segments = useMemo(() => {
    return CHAKRA_ORDER.map((spec, i) => {
      const centerDeg = rootCenterDeg + i * segArc;
      const startDeg = centerDeg - segArc / 2;
      const endDeg = centerDeg + segArc / 2;
      return { spec, startDeg, endDeg, centerDeg, index: i };
    });
  }, [segArc]);

  const handleSelect = (id: ChakraId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelect?.(id);
  };

  // Tap-target overlays — small Pressables placed at each wedge's centroid.
  // The visible SVG handles all the fancy painting; these handle gestures.
  // Hit-circle size scales with the wheel so larger wheels get fatter targets.
  const hitR = (rOuter + rInner) / 2;
  const hitSize = Math.max(36, sizePx * 0.18);

  return (
    <View
      style={[styles.root, { width: sizePx, height: sizePx }]}
      pointerEvents="box-none"
    >
      <Svg width={sizePx} height={sizePx} viewBox={`0 0 ${sizePx} ${sizePx}`}>
        {/* Background ring (subtle frame) */}
        <Circle
          cx={cx}
          cy={cy}
          r={rOuter + 1}
          stroke={tokens.semantic.borderSubtle}
          strokeWidth={1}
          fill="transparent"
        />

        {segments.map(({ spec, startDeg, endDeg, index }) => (
          <ChakraSegment
            key={spec.id}
            spec={spec}
            index={index}
            cx={cx}
            cy={cy}
            rOuter={rOuter}
            rInner={rInner}
            startDeg={startDeg}
            endDeg={endDeg}
            isSelected={selectedChakra === spec.id}
            hasSelection={!!selectedChakra}
            showLabel={showLabels}
          />
        ))}

        {/* Inner aperture — soft hollow that frames the centre */}
        <Circle
          cx={cx}
          cy={cy}
          r={rInner}
          fill={tokens.semantic.bgBase}
        />

        {/* Centre dot — accent gold */}
        <Circle
          cx={cx}
          cy={cy}
          r={Math.max(4, sizePx * 0.022)}
          fill={tokens.semantic.accent}
          opacity={0.95}
        />
      </Svg>

      {/* Tap targets — invisible hit circles at each wedge centroid */}
      {onSelect
        ? segments.map(({ spec, centerDeg }) => {
            const rad = (centerDeg * Math.PI) / 180;
            const px = cx + hitR * Math.cos(rad) - hitSize / 2;
            const py = cy + hitR * Math.sin(rad) - hitSize / 2;
            return (
              <Pressable
                key={`hit-${spec.id}`}
                accessibilityRole="button"
                accessibilityLabel={`${spec.id} chakra`}
                onPress={() => handleSelect(spec.id)}
                style={[
                  styles.hit,
                  {
                    left: px,
                    top: py,
                    width: hitSize,
                    height: hitSize,
                    borderRadius: hitSize / 2,
                  },
                ]}
              />
            );
          })
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hit: {
    position: 'absolute',
  },
});
