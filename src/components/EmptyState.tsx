import React from 'react';
import { View, StyleSheet } from 'react-native';
import { tokens } from '@/theme/tokens';
import { Text } from './Text';

interface Props {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function EmptyState({ title, description, children }: Props) {
  return (
    <View style={styles.root}>
      <Text variant="heading3" align="center">
        {title}
      </Text>
      {description ? (
        <Text
          variant="bodySmall"
          align="center"
          color={tokens.semantic.textTertiary}
          style={{ marginTop: 8, maxWidth: 280 }}
        >
          {description}
        </Text>
      ) : null}
      {children ? <View style={{ marginTop: 20 }}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacing.s6,
  },
});
