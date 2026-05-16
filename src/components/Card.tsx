import React from 'react';
import { View, ViewStyle, StyleSheet, Pressable } from 'react-native';
import { tokens } from '@/theme/tokens';

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
  elevated?: boolean;
  bordered?: boolean;
  padded?: boolean;
  children: React.ReactNode;
}

export function Card({ onPress, style, elevated, bordered = true, padded = true, children }: Props) {
  const content = [
    styles.base,
    bordered && styles.bordered,
    padded && styles.padded,
    elevated && tokens.shadows.s2,
    style,
  ];
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [...content, pressed && { opacity: 0.85 }]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={content}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.lg,
  },
  bordered: {
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  padded: {
    padding: tokens.spacing.s5,
  },
});
