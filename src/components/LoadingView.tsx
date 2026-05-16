import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { tokens } from '@/theme/tokens';
import { Text } from './Text';

interface Props {
  message?: string;
}

export function LoadingView({ message }: Props) {
  return (
    <View style={styles.root}>
      <ActivityIndicator color={tokens.semantic.accent} size="small" />
      {message ? (
        <Text variant="bodySmall" color={tokens.semantic.textTertiary} style={{ marginTop: 12 }}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.semantic.bgBase,
  },
});
