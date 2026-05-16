/**
 * Within — Welcome flow illustrations.
 *
 * All SVG art for the 4 welcome screens lives here. Pure line-and-fill
 * compositions, no external icon family, no raster assets. Each piece is
 * drawn from the existing palette tokens so the welcome flow stays
 * visually consistent with the rest of the app.
 *
 * Exports:
 *   SeatedFigureMoon   — meditating silhouette under a moon (screen 01)
 *   HorizonPathArc     — distant horizon with an arcing path (screen 02)
 *   LineGlyph          — one per practice row (screen 03), keyed by name
 *   EightPetalBloom    — 8-petal mandala for the Wheel of Life (screen 04)
 *
 * Naming and prop shape are stable — screens import the symbols by name
 * and pass only a `size` prop; the palette is baked in.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Line,
  Path,
  G,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Ellipse,
} from 'react-native-svg';
import { tokens } from '@/theme/tokens';

// ──────────────────────────────────────────────────────────────
// 01 — Seated figure + moon
// A loose, single-stroke meditator below a thin crescent.
// Symbolises: arrival, sitting still, the inward turn.
// ──────────────────────────────────────────────────────────────

interface SizeProp {
  size?: number;
}

export function SeatedFigureMoon({ size = 220 }: SizeProp) {
  return (
    <View accessible={false} style={{ width: size, height: size * 1.1 }}>
      <Svg viewBox="0 0 200 220" width="100%" height="100%">
        <Defs>
          <RadialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#FFF6E6" stopOpacity={0.55} />
            <Stop offset="100%" stopColor="#FFF6E6" stopOpacity={0} />
          </RadialGradient>
          <LinearGradient id="figureGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={tokens.palette.ink900} stopOpacity={0.78} />
            <Stop offset="100%" stopColor={tokens.palette.ink900} stopOpacity={0.55} />
          </LinearGradient>
        </Defs>

        {/* Moon glow halo (very soft) */}
        <Circle cx={100} cy={48} r={48} fill="url(#moonGlow)" />

        {/* Crescent moon — drawn as the difference between two arcs */}
        <Path
          d="M 118 28 A 22 22 0 1 0 118 70 A 16 16 0 1 1 118 28 Z"
          fill={tokens.palette.ink900}
          opacity={0.85}
        />

        {/* Ground line — a single horizon stroke under the figure */}
        <Line
          x1={32}
          y1={196}
          x2={168}
          y2={196}
          stroke={tokens.palette.ink900}
          strokeOpacity={0.25}
          strokeWidth={0.7}
        />

        {/* Seated meditator — symmetric, lotus-like */}
        <G stroke="url(#figureGrad)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Head */}
          <Circle cx={100} cy={120} r={9} fill={tokens.palette.ink900} opacity={0.78} stroke="none" />
          {/* Torso */}
          <Path d="M 100 129 C 96 145 96 162 100 174" />
          {/* Shoulders + arms folded into lap */}
          <Path d="M 88 144 C 76 152 70 168 84 178 C 92 184 108 184 116 178 C 130 168 124 152 112 144" />
          {/* Folded legs (lotus crescent) */}
          <Path d="M 64 192 C 70 178 84 172 100 174 C 116 172 130 178 136 192" />
          <Path d="M 64 192 Q 100 200 136 192" />
        </G>
      </Svg>
    </View>
  );
}

// ──────────────────────────────────────────────────────────────
// 02 — Horizon + path arc
// Distant horizon line with a soft curved path leading toward it.
// Symbolises: the 7-stage journey ahead.
// ──────────────────────────────────────────────────────────────

export function HorizonPathArc({ size = 280 }: SizeProp) {
  return (
    <View accessible={false} style={{ width: size, height: size * 0.55 }}>
      <Svg viewBox="0 0 280 154" width="100%" height="100%">
        <Defs>
          <LinearGradient id="horizonSky" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={tokens.palette.skyTop} stopOpacity={0.7} />
            <Stop offset="100%" stopColor={tokens.palette.peach} stopOpacity={0.4} />
          </LinearGradient>
          <RadialGradient id="sunGlow" cx="50%" cy="60%" r="40%">
            <Stop offset="0%" stopColor="#FFF6E6" stopOpacity={0.9} />
            <Stop offset="100%" stopColor="#FFF6E6" stopOpacity={0} />
          </RadialGradient>
        </Defs>

        {/* Soft sky band */}
        <Path d="M 0 0 H 280 V 80 H 0 Z" fill="url(#horizonSky)" />
        {/* Sun glow centred on the horizon */}
        <Circle cx={140} cy={82} r={64} fill="url(#sunGlow)" />

        {/* Horizon line */}
        <Line
          x1={0}
          y1={84}
          x2={280}
          y2={84}
          stroke={tokens.palette.ink900}
          strokeOpacity={0.28}
          strokeWidth={0.8}
        />

        {/* Distant sun — a thin circle on the horizon */}
        <Circle
          cx={140}
          cy={82}
          r={11}
          fill="none"
          stroke={tokens.palette.gold}
          strokeOpacity={0.9}
          strokeWidth={1}
        />

        {/* The path arc — comes from foreground bottom, curves up to the sun */}
        <Path
          d="M 38 148 C 70 132 110 110 140 92"
          stroke={tokens.palette.ink900}
          strokeOpacity={0.65}
          strokeWidth={1.4}
          strokeLinecap="round"
          fill="none"
          strokeDasharray="2 4"
        />

        {/* Seven path markers along the arc — chakra-coloured */}
        {[
          { t: 0.04, color: tokens.chakraColors.root },
          { t: 0.18, color: tokens.chakraColors.sacral },
          { t: 0.33, color: tokens.chakraColors.solar },
          { t: 0.50, color: tokens.chakraColors.heart },
          { t: 0.66, color: tokens.chakraColors.throat },
          { t: 0.82, color: tokens.chakraColors.thirdEye },
          { t: 0.96, color: tokens.chakraColors.crown },
        ].map((m, i) => {
          // Sample the cubic Bezier at t for marker positions.
          const { x, y } = sampleCubic(38, 148, 70, 132, 110, 110, 140, 92, m.t);
          return (
            <G key={i}>
              <Circle cx={x} cy={y} r={3.2} fill={m.color} opacity={0.95} />
              <Circle cx={x} cy={y} r={6} fill={m.color} opacity={0.18} />
            </G>
          );
        })}

        {/* Ground line under the start of the path */}
        <Line
          x1={20}
          y1={150}
          x2={92}
          y2={150}
          stroke={tokens.palette.ink900}
          strokeOpacity={0.18}
          strokeWidth={0.7}
        />
      </Svg>
    </View>
  );
}

// Internal — sample a cubic Bezier curve at t in [0, 1].
function sampleCubic(
  x0: number, y0: number,
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
  t: number
): { x: number; y: number } {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x: mt3 * x0 + 3 * mt2 * t * x1 + 3 * mt * t2 * x2 + t3 * x3,
    y: mt3 * y0 + 3 * mt2 * t * y1 + 3 * mt * t2 * y2 + t3 * y3,
  };
}

// ──────────────────────────────────────────────────────────────
// 03 — Line glyphs per practice row
// One small symbolic glyph per practice. Drawn in a single thin
// stroke so they read as a family. Sized for a 32px container.
// ──────────────────────────────────────────────────────────────

export type GlyphName =
  | 'breath'
  | 'body'
  | 'letter'
  | 'unblock'
  | 'chart';

interface LineGlyphProps {
  name: GlyphName;
  /** Hex color for the stroke. */
  color: string;
  size?: number;
}

export function LineGlyph({ name, color, size = 28 }: LineGlyphProps) {
  const stroke = color;
  const sw = 1.4;
  switch (name) {
    case 'breath':
      // Three rising breath waves
      return (
        <Svg width={size} height={size} viewBox="0 0 28 28">
          <Path
            d="M 4 18 Q 9 12 14 18 T 24 18"
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
          <Path
            d="M 4 13 Q 9 7 14 13 T 24 13"
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
            opacity={0.6}
          />
          <Circle cx={14} cy={22} r={1.2} fill={stroke} />
        </Svg>
      );
    case 'body':
      // Tiny standing figure
      return (
        <Svg width={size} height={size} viewBox="0 0 28 28">
          <Circle cx={14} cy={7} r={2.6} fill="none" stroke={stroke} strokeWidth={sw} />
          <Path
            d="M 14 10 V 18 M 9 13 H 19 M 14 18 L 10 24 M 14 18 L 18 24"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      );
    case 'letter':
      // An envelope opening
      return (
        <Svg width={size} height={size} viewBox="0 0 28 28">
          <Path
            d="M 5 9 L 14 16 L 23 9 M 5 9 H 23 V 21 H 5 Z"
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            d="M 14 16 V 21"
            stroke={stroke}
            strokeWidth={sw}
            opacity={0.5}
          />
        </Svg>
      );
    case 'unblock':
      // Spiral — timeline / release
      return (
        <Svg width={size} height={size} viewBox="0 0 28 28">
          <Path
            d="M 14 14 m -1 0 a 1 1 0 1 1 2 0 a 2 2 0 1 1 -4 0 a 3.5 3.5 0 1 1 7 0 a 5.5 5.5 0 1 1 -11 0 a 8 8 0 1 1 16 0"
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'chart':
      // 8-pointed star — your chart / blueprint
      return (
        <Svg width={size} height={size} viewBox="0 0 28 28">
          <Path
            d="M 14 3 V 25 M 3 14 H 25 M 6.5 6.5 L 21.5 21.5 M 21.5 6.5 L 6.5 21.5"
            stroke={stroke}
            strokeWidth={sw * 0.85}
            strokeLinecap="round"
            opacity={0.85}
          />
          <Circle cx={14} cy={14} r={2} fill={stroke} />
        </Svg>
      );
    default:
      return null;
  }
}

// ──────────────────────────────────────────────────────────────
// 04 — 8-petal bloom
// A symmetric 8-petal mandala for the Wheel of Life. Each petal a
// chakra-adjacent pastel. Centre pulses very softly.
// ──────────────────────────────────────────────────────────────

const PETAL_COLORS = [
  tokens.chakraColors.root,
  tokens.chakraColors.sacral,
  tokens.chakraColors.solar,
  tokens.chakraColors.heart,
  tokens.chakraColors.throat,
  tokens.chakraColors.thirdEye,
  tokens.chakraColors.crown,
  tokens.palette.mint,
];

export function EightPetalBloom({ size = 220 }: SizeProp) {
  // One teardrop petal centred at top, rotated 8 times around the centre.
  // Drawn in a 200x200 viewBox; centre at (100, 100).
  const cx = 100;
  const cy = 100;
  // Petal as a quadratic-curved teardrop, tip up at (100, 32), base at (100, 100).
  const petalPath = `M ${cx} ${cy} Q ${cx - 22} ${cy - 30} ${cx} ${cy - 68} Q ${cx + 22} ${cy - 30} ${cx} ${cy} Z`;

  return (
    <View accessible={false} style={{ width: size, height: size }}>
      <Svg viewBox="0 0 200 200" width="100%" height="100%">
        <Defs>
          <RadialGradient id="bloomCore" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#FFF6E6" stopOpacity={0.95} />
            <Stop offset="100%" stopColor={tokens.palette.peach} stopOpacity={0.4} />
          </RadialGradient>
        </Defs>

        {/* Outer ring */}
        <Circle
          cx={cx}
          cy={cy}
          r={86}
          fill="none"
          stroke={tokens.palette.ink900}
          strokeOpacity={0.12}
          strokeWidth={0.6}
        />

        {/* 8 petals */}
        <G>
          {PETAL_COLORS.map((color, i) => {
            const angle = (360 / 8) * i;
            return (
              <Path
                key={i}
                d={petalPath}
                fill={color}
                fillOpacity={0.4}
                stroke={color}
                strokeOpacity={0.85}
                strokeWidth={1}
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
            );
          })}
        </G>

        {/* Inner ring */}
        <Circle
          cx={cx}
          cy={cy}
          r={22}
          fill="url(#bloomCore)"
          stroke={tokens.palette.gold}
          strokeOpacity={0.7}
          strokeWidth={1}
        />
        {/* Centre dot */}
        <Circle cx={cx} cy={cy} r={3.5} fill={tokens.palette.gold} opacity={0.95} />
      </Svg>
    </View>
  );
}

// Re-export a single styles object so callers can pull layout helpers
// without re-declaring the wrap.
export const illustrationStyles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
