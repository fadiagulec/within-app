/**
 * CosmicNote — small Today-tab widget showing the most relevant cosmic
 * event right now (active retrograde, new/full moon, upcoming event,
 * or ambient moon phase).
 *
 * Pure UI. Reads from src/data/lunar.ts which does the math.
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { todaysCosmicNote } from '@/data/lunar';

export function CosmicNote() {
  const note = useMemo(() => todaysCosmicNote(), []);
  const accent = note.accent ?? tokens.semantic.accent;

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: `${accent}55`,
          backgroundColor: note.tone === 'event' ? `${accent}1F` : `${accent}10`,
          borderWidth: note.tone === 'event' ? 1.5 : 1,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Text variant="mono" color={accent} style={{ fontSize: 11, letterSpacing: 1.8 }}>
          ☾ {note.headline}
        </Text>
      </View>
      <Text
        variant="body"
        color={tokens.semantic.textPrimary}
        style={{ marginTop: 8, fontSize: 14, lineHeight: 21 }}
      >
        {note.body}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    marginTop: 0,
    padding: 14,
    borderRadius: tokens.radii.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
