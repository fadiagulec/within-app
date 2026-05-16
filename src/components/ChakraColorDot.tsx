import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ChakraKey } from '@/types';
import { chakraColors, chakraGlow } from '@/theme/tokens';

interface Props {
  chakra: ChakraKey;
  size?: number;
  withGlow?: boolean;
}

export function ChakraColorDot({ chakra, size = 14, withGlow = true }: Props) {
  const color = chakraColors[chakra];
  const glow = chakraGlow[chakra];
  return (
    <View
      style={[
        styles.dot,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        withGlow && {
          shadowColor: glow,
          shadowOpacity: 1,
          shadowRadius: size,
          shadowOffset: { width: 0, height: 0 },
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {},
});
