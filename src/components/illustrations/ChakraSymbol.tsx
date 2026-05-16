/**
 * SOMA - Original Chakra Symbol Illustrations
 *
 * DESIGN PHILOSOPHY: Sacred geometry × art-deco × editorial minimalism.
 * These are NEW geometric compositions — not the traditional yantra,
 * not a copy of Dr. Espen's or any other brand's visual style.
 *
 * Each symbol uses the chakra's number of petals/segments as a subtle
 * nod to tradition, but rendered as original geometric art.
 */
import React from 'react';
import Svg, { Circle, Line, Path, Polygon, G, Defs, RadialGradient, Stop } from 'react-native-svg';
import { ChakraId } from '@/data/chakra-content';

export interface ChakraSymbolProps {
  chakraId: ChakraId;
  size?: number;
  color?: string;       // override chakra color
  glow?: boolean;       // add glow gradient
  strokeWidth?: number;
}

const CHAKRA_COLORS: Record<ChakraId, string> = {
  root: '#6B1F1F',
  sacral: '#C2712C',
  'solar-plexus': '#D9B24C',
  heart: '#6B8F71',
  throat: '#3E6A8C',
  'third-eye': '#3B3564',
  crown: '#8A7AA8',
};

/**
 * Generate N points evenly distributed around a circle
 */
function polygonPoints(cx: number, cy: number, radius: number, sides: number, rotation = -90): string {
  const points: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = ((rotation + i * (360 / sides)) * Math.PI) / 180;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return points.join(' ');
}

export function ChakraSymbol({
  chakraId,
  size = 120,
  color,
  glow = true,
  strokeWidth = 1.5,
}: ChakraSymbolProps) {
  const fill = color ?? CHAKRA_COLORS[chakraId];
  const cx = size / 2;
  const cy = size / 2;
  const gradId = `glow-${chakraId}`;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {glow && (
        <Defs>
          <RadialGradient id={gradId} cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={fill} stopOpacity="0.4" />
            <Stop offset="60%" stopColor={fill} stopOpacity="0.1" />
            <Stop offset="100%" stopColor={fill} stopOpacity="0" />
          </RadialGradient>
        </Defs>
      )}
      {glow && <Circle cx={cx} cy={cy} r={size / 2} fill={`url(#${gradId})`} />}
      {renderChakraGeometry(chakraId, cx, cy, size, fill, strokeWidth)}
    </Svg>
  );
}

/**
 * Each chakra has a unique geometric interpretation.
 * The "sacred math" below is original composition — inspired by sacred geometry
 * principles but not copying any traditional yantra or branded illustration.
 */
function renderChakraGeometry(
  id: ChakraId,
  cx: number,
  cy: number,
  size: number,
  fill: string,
  stroke: number,
): React.ReactNode {
  const r = size * 0.38;

  switch (id) {
    case 'root':
      // Design note: 4 descending triangles forming a grounded diamond (earth / base)
      return (
        <G>
          <Circle cx={cx} cy={cy} r={r} fill="none" stroke={fill} strokeWidth={stroke} />
          <Polygon
            points={polygonPoints(cx, cy, r * 0.85, 4, -90)}
            fill="none"
            stroke={fill}
            strokeWidth={stroke}
          />
          <Polygon
            points={polygonPoints(cx, cy, r * 0.55, 4, 45)}
            fill={fill}
            fillOpacity={0.15}
            stroke={fill}
            strokeWidth={stroke}
          />
          <Circle cx={cx} cy={cy} r={3} fill={fill} />
        </G>
      );

    case 'sacral':
      // Design note: 6 overlapping circles (vesica piscis x3) — water/flow
      return (
        <G>
          <Circle cx={cx} cy={cy} r={r} fill="none" stroke={fill} strokeWidth={stroke} />
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i * 60 * Math.PI) / 180;
            const ox = cx + r * 0.5 * Math.cos(angle);
            const oy = cy + r * 0.5 * Math.sin(angle);
            return (
              <Circle
                key={i}
                cx={ox}
                cy={oy}
                r={r * 0.5}
                fill="none"
                stroke={fill}
                strokeWidth={stroke}
                strokeOpacity={0.7}
              />
            );
          })}
          <Circle cx={cx} cy={cy} r={3} fill={fill} />
        </G>
      );

    case 'solar-plexus':
      // Design note: 10-point star (sun rays) within a circle — fire/radiance
      return (
        <G>
          <Circle cx={cx} cy={cy} r={r} fill="none" stroke={fill} strokeWidth={stroke} />
          {Array.from({ length: 10 }).map((_, i) => {
            const angle1 = ((i * 36 - 90) * Math.PI) / 180;
            const angle2 = (((i + 1) * 36 - 90) * Math.PI) / 180;
            const midAngle = (angle1 + angle2) / 2;
            const outerX = cx + r * 0.95 * Math.cos(midAngle);
            const outerY = cy + r * 0.95 * Math.sin(midAngle);
            const innerX1 = cx + r * 0.4 * Math.cos(angle1);
            const innerY1 = cy + r * 0.4 * Math.sin(angle1);
            const innerX2 = cx + r * 0.4 * Math.cos(angle2);
            const innerY2 = cy + r * 0.4 * Math.sin(angle2);
            return (
              <G key={i}>
                <Line
                  x1={innerX1}
                  y1={innerY1}
                  x2={outerX}
                  y2={outerY}
                  stroke={fill}
                  strokeWidth={stroke}
                />
                <Line
                  x1={outerX}
                  y1={outerY}
                  x2={innerX2}
                  y2={innerY2}
                  stroke={fill}
                  strokeWidth={stroke}
                />
              </G>
            );
          })}
          <Circle cx={cx} cy={cy} r={r * 0.4} fill={fill} fillOpacity={0.2} stroke={fill} strokeWidth={stroke} />
          <Circle cx={cx} cy={cy} r={3} fill={fill} />
        </G>
      );

    case 'heart':
      // Design note: Star of David (two intersecting triangles) — air / union of opposites
      return (
        <G>
          <Circle cx={cx} cy={cy} r={r} fill="none" stroke={fill} strokeWidth={stroke} />
          <Polygon
            points={polygonPoints(cx, cy, r * 0.8, 3, -90)}
            fill="none"
            stroke={fill}
            strokeWidth={stroke}
          />
          <Polygon
            points={polygonPoints(cx, cy, r * 0.8, 3, 90)}
            fill="none"
            stroke={fill}
            strokeWidth={stroke}
          />
          <Polygon
            points={polygonPoints(cx, cy, r * 0.35, 6, 0)}
            fill={fill}
            fillOpacity={0.2}
            stroke={fill}
            strokeWidth={stroke}
          />
        </G>
      );

    case 'throat':
      // Design note: 16-petaled radial pattern — ether / voice vibration
      return (
        <G>
          <Circle cx={cx} cy={cy} r={r} fill="none" stroke={fill} strokeWidth={stroke} />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = ((i * 22.5 - 90) * Math.PI) / 180;
            const x1 = cx + r * 0.55 * Math.cos(angle);
            const y1 = cy + r * 0.55 * Math.sin(angle);
            const x2 = cx + r * 0.95 * Math.cos(angle);
            const y2 = cy + r * 0.95 * Math.sin(angle);
            return (
              <Line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={fill}
                strokeWidth={stroke}
                strokeOpacity={0.6}
              />
            );
          })}
          <Circle cx={cx} cy={cy} r={r * 0.5} fill="none" stroke={fill} strokeWidth={stroke} />
          <Circle cx={cx} cy={cy} r={r * 0.25} fill={fill} fillOpacity={0.25} />
          <Circle cx={cx} cy={cy} r={3} fill={fill} />
        </G>
      );

    case 'third-eye':
      // Design note: Almond/vesica (eye) with inner crescent — intuition / inner sight
      return (
        <G>
          <Circle cx={cx} cy={cy} r={r} fill="none" stroke={fill} strokeWidth={stroke} />
          {/* Eye shape (vesica piscis) */}
          <Path
            d={`M ${cx - r * 0.7} ${cy} Q ${cx} ${cy - r * 0.5} ${cx + r * 0.7} ${cy} Q ${cx} ${cy + r * 0.5} ${cx - r * 0.7} ${cy} Z`}
            fill="none"
            stroke={fill}
            strokeWidth={stroke}
          />
          {/* Inner pupil */}
          <Circle cx={cx} cy={cy} r={r * 0.2} fill={fill} fillOpacity={0.3} stroke={fill} strokeWidth={stroke} />
          <Circle cx={cx} cy={cy} r={4} fill={fill} />
          {/* Crescent above and below */}
          <Path
            d={`M ${cx - r * 0.5} ${cy - r * 0.65} Q ${cx} ${cy - r * 0.35} ${cx + r * 0.5} ${cy - r * 0.65}`}
            fill="none"
            stroke={fill}
            strokeWidth={stroke}
            strokeOpacity={0.6}
          />
          <Path
            d={`M ${cx - r * 0.5} ${cy + r * 0.65} Q ${cx} ${cy + r * 0.35} ${cx + r * 0.5} ${cy + r * 0.65}`}
            fill="none"
            stroke={fill}
            strokeWidth={stroke}
            strokeOpacity={0.6}
          />
        </G>
      );

    case 'crown':
      // Design note: Concentric rings expanding outward with radiating lines — infinite consciousness
      return (
        <G>
          {[0.95, 0.75, 0.55, 0.35].map((factor, i) => (
            <Circle
              key={i}
              cx={cx}
              cy={cy}
              r={r * factor}
              fill="none"
              stroke={fill}
              strokeWidth={stroke}
              strokeOpacity={0.3 + i * 0.2}
            />
          ))}
          {/* 12 radial lines outward from center */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = ((i * 30 - 90) * Math.PI) / 180;
            const x1 = cx + r * 0.95 * Math.cos(angle);
            const y1 = cy + r * 0.95 * Math.sin(angle);
            const x2 = cx + r * 1.1 * Math.cos(angle);
            const y2 = cy + r * 1.1 * Math.sin(angle);
            return (
              <Line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={fill}
                strokeWidth={stroke}
                strokeOpacity={0.4}
              />
            );
          })}
          <Circle cx={cx} cy={cy} r={r * 0.15} fill={fill} fillOpacity={0.5} />
        </G>
      );

    default:
      return <Circle cx={cx} cy={cy} r={r} fill="none" stroke={fill} strokeWidth={stroke} />;
  }
}

/**
 * Minimalist body silhouette with one highlighted chakra location.
 * Original design — stylized, genderless, line-art only.
 */
export interface BodySilhouetteProps {
  highlightChakra?: ChakraId;
  size?: number;
  lineColor?: string;
}

const CHAKRA_BODY_POSITIONS: Record<ChakraId, { x: number; y: number }> = {
  root: { x: 50, y: 88 },          // base of spine (pelvic region)
  sacral: { x: 50, y: 75 },        // lower belly
  'solar-plexus': { x: 50, y: 60 }, // upper belly
  heart: { x: 50, y: 46 },          // center of chest
  throat: { x: 50, y: 28 },         // throat
  'third-eye': { x: 50, y: 18 },    // between brows
  crown: { x: 50, y: 8 },           // top of head
};

export function BodySilhouette({
  highlightChakra,
  size = 160,
  lineColor = '#F3EFE7',
}: BodySilhouetteProps) {
  const w = size * 0.55;
  const h = size;
  const pos = highlightChakra ? CHAKRA_BODY_POSITIONS[highlightChakra] : null;
  const glowColor = highlightChakra ? CHAKRA_COLORS[highlightChakra] : undefined;

  return (
    <Svg width={w} height={h} viewBox="0 0 100 100">
      <Defs>
        {glowColor && (
          <RadialGradient id="bodyGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={glowColor} stopOpacity="0.7" />
            <Stop offset="60%" stopColor={glowColor} stopOpacity="0.3" />
            <Stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </RadialGradient>
        )}
      </Defs>

      {/* Head */}
      <Circle cx="50" cy="12" r="8" fill="none" stroke={lineColor} strokeWidth="0.8" />
      {/* Neck */}
      <Line x1="50" y1="20" x2="50" y2="24" stroke={lineColor} strokeWidth="0.8" />
      {/* Shoulders / torso outline — minimal line art */}
      <Path
        d="M 32 30 Q 30 45 34 60 L 38 85 Q 40 90 42 92 M 68 30 Q 70 45 66 60 L 62 85 Q 60 90 58 92"
        fill="none"
        stroke={lineColor}
        strokeWidth="0.8"
      />
      {/* Shoulders line */}
      <Path d="M 32 30 Q 50 24 68 30" fill="none" stroke={lineColor} strokeWidth="0.8" />
      {/* Waist hint */}
      <Path d="M 38 65 Q 50 67 62 65" fill="none" stroke={lineColor} strokeWidth="0.4" strokeOpacity="0.5" />
      {/* Arms */}
      <Path
        d="M 32 32 Q 26 45 24 60 M 68 32 Q 74 45 76 60"
        fill="none"
        stroke={lineColor}
        strokeWidth="0.6"
        strokeOpacity="0.7"
      />

      {/* Glow aura for highlighted chakra */}
      {pos && glowColor && (
        <>
          <Circle cx={pos.x} cy={pos.y} r="18" fill="url(#bodyGlow)" />
          <Circle cx={pos.x} cy={pos.y} r="4" fill={glowColor} />
          <Circle cx={pos.x} cy={pos.y} r="2" fill="#FFFFFF" fillOpacity="0.8" />
        </>
      )}
    </Svg>
  );
}
