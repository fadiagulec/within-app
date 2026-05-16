/**
 * SkyBackground — full-screen pastel gradient (Home tab).
 *
 * Soft, airy, low-saturation: pale dusty sky → cream → soft blush.
 * Reads as wellness pastel, not dramatic sunset. Inspired by the
 * pale dusty pink "wall" + soft pastel cards aesthetic.
 *
 * Drops in as a wrapper: <SkyBackground>{children}</SkyBackground>.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { palette } from '@/theme/tokens';

interface Props {
  children: React.ReactNode;
}

export function SkyBackground({ children }: Props) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[palette.skyTop, palette.skyMid, palette.peach, palette.coralPink]}
        locations={[0, 0.4, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
