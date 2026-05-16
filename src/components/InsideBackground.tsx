/**
 * InsideBackground — gradient for "inside" pages (everything except Home).
 *
 * Soft, airy, washed pastel — pale sky at the top, fading into pale dusty
 * mauve/cream that holds most of the screen. No drama. Reads as clean,
 * minimal, wellness — matches the pale-pink-wall aesthetic of the
 * reference designs.
 *
 * Visual order (top → bottom):
 *   #DCE6EC   ← pale dusty sky (small slice at the top, ~12%)
 *   #EDE4E2   ← softest pale mauve transition
 *   #F4ECE6   ← almost-cream mid (most of the screen, where content sits)
 *   #F8F0EA   ← softest cream-mauve bottom
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  children: React.ReactNode;
}

export function InsideBackground({ children }: Props) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#DCE6EC', '#EDE4E2', '#F4ECE6', '#F8F0EA']}
        locations={[0, 0.18, 0.55, 1]}
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
