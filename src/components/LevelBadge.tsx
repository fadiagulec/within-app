import React from 'react';
import { View, StyleSheet } from 'react-native';
import { tokens } from '@/theme/tokens';
import { Text } from './Text';

interface Props {
  level: number;
  locked?: boolean;
}

export function LevelBadge({ level, locked }: Props) {
  return (
    <View
      style={[
        styles.base,
        locked ? styles.locked : styles.unlocked,
      ]}
    >
      <Text
        variant="mono"
        style={{
          fontSize: 10,
          color: locked ? tokens.semantic.textTertiary : tokens.semantic.accent,
          letterSpacing: 1,
        }}
      >
        {locked ? `LVL ${level} ·` : `LVL ${level}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  unlocked: {
    borderColor: tokens.semantic.accent,
    backgroundColor: tokens.semantic.accentSoft,
  },
  locked: {
    borderColor: tokens.semantic.borderDefault,
    backgroundColor: 'transparent',
  },
});
