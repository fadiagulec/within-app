/**
 * HeroImage — full-bleed image background with overlay gradient and graceful
 * fallback to the sunset palette if the network image fails to load.
 *
 * Use cases:
 *   - Featured card on Home
 *   - Hero of a chakra / plan detail screen
 *   - Cover imagery anywhere we want a real photograph behind text
 *
 * The overlay gradient ensures text on top is always readable regardless of
 * what the underlying photo looks like — sky always reads, text always pops.
 */

import React, { useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { palette } from '@/theme/tokens';

interface Props {
  /** URL of the network image. If load fails, fallback gradient renders. */
  uri: string;
  /** Optional dominant tint color — used in the overlay if specified. */
  tint?: string;
  /** Children render on top of the image + overlay. */
  children?: React.ReactNode;
  /** Container style — usually a height + borderRadius. */
  style?: ViewStyle | ViewStyle[];
  /** How dark the bottom-of-image overlay should be (0–1). Defaults 0.5. */
  overlayStrength?: number;
}

export function HeroImage({
  uri,
  tint,
  children,
  style,
  overlayStrength = 0.5,
}: Props) {
  const [failed, setFailed] = useState(false);

  const overlayBottom = tint
    ? `${tint}${Math.round(overlayStrength * 255).toString(16).padStart(2, '0')}`
    : `rgba(45, 41, 53, ${overlayStrength})`;

  return (
    <View style={[styles.root, style]}>
      {/* If image fails or while it loads, gradient is the background */}
      <LinearGradient
        colors={[palette.skyTop, palette.peach, palette.coralPink]}
        style={StyleSheet.absoluteFill}
      />

      {!failed ? (
        <Image
          source={{ uri }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onError={() => setFailed(true)}
          accessibilityIgnoresInvertColors
        />
      ) : null}

      {/* Bottom-to-top dark overlay so text stays readable */}
      <LinearGradient
        colors={['transparent', overlayBottom]}
        locations={[0.35, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>{children}</View>
    </View>
  );
}

/**
 * Variant — same image-with-fallback, but no overlay (e.g. for small thumb
 * cards). Children render in normal flow above the image.
 */
export function ImageBackgroundPlain({
  uri,
  children,
  style,
}: {
  uri: string;
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <View style={[styles.root, style]}>
        <LinearGradient
          colors={[palette.skyTop, palette.peach]}
          style={StyleSheet.absoluteFill}
        />
        {children}
      </View>
    );
  }
  return (
    <ImageBackground
      source={{ uri }}
      style={[styles.root, style]}
      resizeMode="cover"
      onError={() => setFailed(true)}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
});
