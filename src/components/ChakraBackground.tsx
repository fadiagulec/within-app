/**
 * ChakraBackground — full-screen gradient anchored at a chakra's actual color.
 *
 * Inverse of SkyBackground: instead of sky-blue → peach → coral, the TOP
 * of this gradient is the specific chakra's signature color (red for Root,
 * orange for Sacral, yellow for Solar Plexus, etc.), flowing down into the
 * sunset palette (peach → coral cream) so it stays visually consistent
 * with the rest of the app.
 *
 *   Root         deep red → peach → coral
 *   Sacral       warm orange → peach → coral
 *   Solar Plexus golden yellow → peach → coral
 *   Heart        forest green → peach → coral
 *   Throat       sky blue → peach → coral
 *   Third Eye    indigo → peach → coral
 *   Crown        violet → peach → coral
 *   Soul Star    soft lilac → peach → coral
 *
 * Used on chakra-specific pages (chakra detail, chakra-tagged breathwork
 * detail). All other screens use SkyBackground.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { palette } from '@/theme/tokens';
import { CHAKRA_SPINE, SpineChakraId } from '@/data/chakra-spine';

interface Props {
  chakraId: SpineChakraId;
  /** Optional override color, used when caller has a non-spine chakra (e.g. legacy ChakraKey form). */
  colorOverride?: string;
  children: React.ReactNode;
}

export function ChakraBackground({ chakraId, colorOverride, children }: Props) {
  const chakra = CHAKRA_SPINE[chakraId];
  const chakraColor = colorOverride ?? chakra?.color ?? '#6B1F1F';

  return (
    <View style={styles.root}>
      <LinearGradient
        // 4-stop gradient: SOFTENED chakra color at top (blended with cream so
        // it reads as pastel, not saturated), fading into the new pale-pastel
        // palette at the bottom so chakra pages stay airy and on-brand.
        colors={[
          blendWith(chakraColor, '#FFFFFF', 0.55),  // washed chakra tint
          blendWith(chakraColor, palette.peach, 0.78),
          palette.peach,
          palette.coralPink,
        ]}
        locations={[0, 0.32, 0.66, 1]}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

/**
 * Mix two hex colors using a 0..1 weight. weight=0 → all colorA, weight=1 → all colorB.
 * Safe with 6-char hex; ignores alpha.
 */
function blendWith(colorA: string, colorB: string, weight: number): string {
  const a = parseHex(colorA);
  const b = parseHex(colorB);
  if (!a || !b) return colorA;
  const r = Math.round(a.r * (1 - weight) + b.r * weight);
  const g = Math.round(a.g * (1 - weight) + b.g * weight);
  const bl = Math.round(a.b * (1 - weight) + b.b * weight);
  return `#${[r, g, bl].map((n) => n.toString(16).padStart(2, '0')).join('')}`;
}

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace('#', '').match(/^([0-9a-fA-F]{6})$/);
  if (!m || !m[1]) return null;
  const v = m[1];
  return {
    r: parseInt(v.slice(0, 2), 16),
    g: parseInt(v.slice(2, 4), 16),
    b: parseInt(v.slice(4, 6), 16),
  };
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
