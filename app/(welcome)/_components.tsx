/**
 * Within — Welcome flow internal components.
 *
 * Components that are ONLY used inside (welcome). Co-located here so the
 * top-level src/components/ tree stays focused on app-wide pieces.
 *
 * Expo Router treats files starting with "_" as private (not turned into
 * routes), so this file is safe to live inside the (welcome) group.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { tokens } from '@/theme/tokens';

interface WelcomeProgressProps {
  /** 1-indexed current step. */
  step: number;
  /** Total steps in the flow (defaults to 4). */
  total?: number;
}

/**
 * Tiny pagination indicator at the top of each story screen.
 * Current step is a short capsule; the rest are dots. Style matches
 * the dots used on the Path tab so the visual vocabulary is consistent.
 */
export function WelcomeProgress({ step, total = 4 }: WelcomeProgressProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => {
        const isCurrent = i + 1 === step;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              isCurrent && styles.dotCurrent,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 5,
    marginBottom: 8,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: tokens.semantic.textTertiary,
    opacity: 0.35,
  },
  dotCurrent: {
    width: 18,
    height: 5,
    borderRadius: 3,
    backgroundColor: tokens.semantic.accent,
    opacity: 1,
  },
});
