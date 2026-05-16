import React from 'react';
import { View, StyleSheet } from 'react-native';
import { tokens } from '@/theme/tokens';
import { Text } from './Text';

interface Props {
  days: { label: string; done?: boolean; today?: boolean }[];
}

export function ProgressDots({ days }: Props) {
  return (
    <View style={styles.row}>
      {days.map((d) => (
        <View key={d.label} style={styles.col}>
          <View
            style={[
              styles.dot,
              d.done && styles.done,
              d.today && styles.today,
            ]}
          />
          <Text
            variant="eyebrow"
            align="center"
            style={{ marginTop: 6, fontSize: 10 }}
          >
            {d.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  col: {
    flex: 1,
    alignItems: 'center',
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: tokens.semantic.bgRaised,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  done: {
    backgroundColor: tokens.semantic.accent,
    borderColor: tokens.semantic.accent,
  },
  today: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: tokens.semantic.accent,
    shadowColor: tokens.semantic.accent,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
});
