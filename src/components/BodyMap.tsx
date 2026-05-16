/**
 * BodyMap — soft pastel SVG silhouette of the human body.
 *
 * Two layers of interactivity:
 *   1. Chakra dots along the spine (8 dots, traditional colors, decorative
 *      orientation aid — tap opens that chakra page).
 *   2. Tappable region zones overlaid on the body — head, throat, chest,
 *      belly, hips, legs, etc. Tap a zone → fires onRegionPress(regionId)
 *      so the parent screen (Body Wisdom) can scroll/expand the matching
 *      section in the accordion.
 *
 * Visual approach: low-saturation washed silhouette, matches the
 * pale-pastel app palette. Not anatomically detailed — symbolic.
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Svg, {
  Path,
  Circle,
  Ellipse,
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import type { BodyRegion } from '@/data/body-wisdom';
import { CHAKRA_SPINE_ORDERED, type SpineChakraId } from '@/data/chakra-spine';

interface Zone {
  /** Region id that this hit zone maps to. */
  regionId: BodyRegion;
  /** Pixel-space (SVG viewBox) bounding box for the tappable rectangle. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Where the label sits relative to the zone. */
  labelSide: 'left' | 'right';
  /** Optional override of the label position. */
  labelX?: number;
  labelY?: number;
  /** Short label shown next to the body. */
  label: string;
  /** Accent color (matches the region color in body-wisdom data). */
  color: string;
}

// SVG viewBox is 300 wide × 600 tall. Coordinates below are in that space.
const ZONES: Zone[] = [
  {
    regionId: 'head',
    x: 110, y: 12, w: 80, h: 90,
    labelSide: 'right',
    label: 'Head & Mind',
    color: '#9B5BA1',
  },
  {
    regionId: 'throat',
    x: 130, y: 105, w: 40, h: 28,
    labelSide: 'left',
    label: 'Throat',
    color: '#3D9DC4',
  },
  {
    regionId: 'neck-shoulders',
    x: 85, y: 130, w: 130, h: 30,
    labelSide: 'right',
    label: 'Neck & Shoulders',
    color: '#3D9DC4',
  },
  {
    regionId: 'chest-heart',
    x: 100, y: 160, w: 100, h: 55,
    labelSide: 'left',
    label: 'Chest & Heart',
    color: '#3F8A5F',
  },
  {
    regionId: 'lungs',
    x: 100, y: 165, w: 100, h: 55,
    labelSide: 'right',
    labelY: 195,
    label: 'Lungs',
    color: '#3F8A5F',
  },
  {
    regionId: 'stomach-digestive',
    x: 105, y: 220, w: 90, h: 55,
    labelSide: 'left',
    label: 'Stomach & Digestion',
    color: '#E8B83E',
  },
  {
    regionId: 'hips-pelvis',
    x: 95, y: 280, w: 110, h: 45,
    labelSide: 'right',
    label: 'Hips & Pelvis',
    color: '#E07A2C',
  },
  {
    regionId: 'knees-legs-feet',
    x: 95, y: 330, w: 110, h: 240,
    labelSide: 'left',
    labelY: 450,
    label: 'Knees, Legs & Feet',
    color: '#6B1F1F',
  },
];

// Chakra dots along the spine. Positions tuned to match the silhouette.
const CHAKRA_DOTS: Array<{ id: SpineChakraId; cy: number; r: number }> = [
  { id: 'soul-star', cy: 0, r: 8 },        // floats above the head
  { id: 'crown', cy: 18, r: 7 },
  { id: 'third-eye', cy: 50, r: 7 },
  { id: 'throat', cy: 118, r: 7 },
  { id: 'heart', cy: 185, r: 7 },
  { id: 'solar-plexus', cy: 245, r: 7 },
  { id: 'sacral', cy: 295, r: 7 },
  { id: 'root', cy: 325, r: 7 },
];

interface Props {
  /** Called when the user taps a body region. */
  onRegionPress?: (regionId: BodyRegion) => void;
  /** Called when the user taps a chakra dot. */
  onChakraPress?: (chakraId: SpineChakraId) => void;
  /** Currently highlighted region (drawn with stronger fill). */
  activeRegion?: BodyRegion | null;
}

export function BodyMap({ onRegionPress, onChakraPress, activeRegion }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.svgWrap}>
        <Svg viewBox="0 0 300 600" width="100%" height="100%">
          <Defs>
            <LinearGradient id="bodyFill" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#E8DEDF" stopOpacity="0.95" />
              <Stop offset="1" stopColor="#F1E1D5" stopOpacity="0.95" />
            </LinearGradient>
            <LinearGradient id="bodyStroke" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#C5A88A" stopOpacity="0.55" />
              <Stop offset="1" stopColor="#9DBFB2" stopOpacity="0.55" />
            </LinearGradient>
          </Defs>

          {/* Silhouette: head + neck + torso + arms + legs */}
          {/* Head */}
          <Ellipse cx="150" cy="55" rx="38" ry="46" fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.5" />
          {/* Neck */}
          <Rect x="135" y="98" width="30" height="22" rx="6" fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.5" />
          {/* Torso */}
          <Path
            d="M 80 125 Q 80 122 84 122 L 216 122 Q 220 122 220 125 L 210 220 Q 207 250 210 280 Q 213 300 205 318 L 95 318 Q 87 300 90 280 Q 93 250 90 220 Z"
            fill="url(#bodyFill)"
            stroke="url(#bodyStroke)"
            strokeWidth="1.5"
          />
          {/* Left arm */}
          <Path
            d="M 78 130 Q 65 135 60 160 L 50 280 Q 48 295 58 298 L 70 298 Q 78 295 80 280 L 88 175 Q 90 145 88 130 Z"
            fill="url(#bodyFill)"
            stroke="url(#bodyStroke)"
            strokeWidth="1.5"
          />
          {/* Right arm */}
          <Path
            d="M 222 130 Q 235 135 240 160 L 250 280 Q 252 295 242 298 L 230 298 Q 222 295 220 280 L 212 175 Q 210 145 212 130 Z"
            fill="url(#bodyFill)"
            stroke="url(#bodyStroke)"
            strokeWidth="1.5"
          />
          {/* Hands */}
          <Ellipse cx="64" cy="312" rx="10" ry="14" fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.5" />
          <Ellipse cx="236" cy="312" rx="10" ry="14" fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.5" />
          {/* Left leg */}
          <Path
            d="M 100 315 Q 105 380 110 460 Q 113 520 122 565 Q 130 580 142 575 Q 148 530 146 460 Q 144 380 146 315 Z"
            fill="url(#bodyFill)"
            stroke="url(#bodyStroke)"
            strokeWidth="1.5"
          />
          {/* Right leg */}
          <Path
            d="M 200 315 Q 195 380 190 460 Q 187 520 178 565 Q 170 580 158 575 Q 152 530 154 460 Q 156 380 154 315 Z"
            fill="url(#bodyFill)"
            stroke="url(#bodyStroke)"
            strokeWidth="1.5"
          />
          {/* Feet */}
          <Ellipse cx="132" cy="582" rx="14" ry="8" fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.5" />
          <Ellipse cx="168" cy="582" rx="14" ry="8" fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.5" />

          {/* Chakra dots along the spine */}
          {CHAKRA_DOTS.map((d) => {
            const chakra = CHAKRA_SPINE_ORDERED.find((c) => c.id === d.id);
            if (!chakra) return null;
            return (
              <Circle
                key={d.id}
                cx={150}
                cy={d.cy}
                r={d.r}
                fill={chakra.color}
                opacity={0.85}
                stroke="#FFFFFF"
                strokeWidth={1.5}
              />
            );
          })}

          {/* Region highlight halos — only the active one */}
          {activeRegion
            ? ZONES.filter((z) => z.regionId === activeRegion).map((z) => (
                <Rect
                  key={`halo-${z.regionId}`}
                  x={z.x - 4}
                  y={z.y - 4}
                  width={z.w + 8}
                  height={z.h + 8}
                  rx={14}
                  fill={`${z.color}33`}
                  stroke={z.color}
                  strokeWidth={1.2}
                />
              ))
            : null}
        </Svg>

        {/* Tappable overlays — separate pressables sit above the SVG. */}
        <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
          {ZONES.map((z) => (
            <Pressable
              key={z.regionId}
              accessibilityRole="button"
              accessibilityLabel={`Open ${z.label}`}
              onPress={() => onRegionPress?.(z.regionId)}
              style={({ pressed }) => ({
                position: 'absolute',
                left: `${(z.x / 300) * 100}%`,
                top: `${(z.y / 600) * 100}%`,
                width: `${(z.w / 300) * 100}%`,
                height: `${(z.h / 600) * 100}%`,
                backgroundColor: pressed ? `${z.color}30` : 'transparent',
                borderRadius: 12,
              })}
            />
          ))}

          {/* Chakra dot taps */}
          {CHAKRA_DOTS.map((d) => (
            <Pressable
              key={`tap-${d.id}`}
              accessibilityRole="button"
              accessibilityLabel={`Open ${d.id} chakra`}
              onPress={() => onChakraPress?.(d.id)}
              style={{
                position: 'absolute',
                left: `${((150 - 14) / 300) * 100}%`,
                top: `${((d.cy - 14) / 600) * 100}%`,
                width: `${(28 / 300) * 100}%`,
                height: `${(28 / 600) * 100}%`,
              }}
            />
          ))}
        </View>
      </View>

      {/* Label legend below — labels live outside the body for clarity */}
      <View style={styles.legend}>
        {ZONES.map((z) => (
          <Pressable
            key={`leg-${z.regionId}`}
            onPress={() => onRegionPress?.(z.regionId)}
            accessibilityRole="button"
            accessibilityLabel={`Open ${z.label}`}
            style={({ pressed }) => [
              styles.legendChip,
              { borderColor: `${z.color}55`, backgroundColor: `${z.color}14` },
              activeRegion === z.regionId && { backgroundColor: `${z.color}30`, borderColor: z.color },
              pressed && { opacity: 0.85 },
            ]}
          >
            <View style={[styles.legendDot, { backgroundColor: z.color }]} />
            <Text style={styles.legendLabel}>{z.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  svgWrap: {
    width: '88%',
    aspectRatio: 0.5, // 300:600
    maxWidth: 320,
    alignSelf: 'center',
  },
  legend: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  legendChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 999,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendLabel: {
    fontFamily: tokens.fonts.body,
    fontSize: 12,
    color: tokens.semantic.textPrimary,
  },
});
