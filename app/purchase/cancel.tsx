/**
 * SOMA — Stripe Purchase Cancel Handler
 * Deep link: soma://purchase/cancel
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';

export default function PurchaseCancel() {
  const router = useRouter();

  return (
    <Screen backgroundColor={tokens.semantic.bgBase}>
      <View style={styles.body}>
        <Text variant="eyebrow" color={tokens.semantic.textSecondary} align="center">
          PURCHASE CANCELLED
        </Text>
        <Text variant="heading2" align="center" style={styles.title}>
          No problem.
        </Text>
        <Text variant="body" align="center" color={tokens.semantic.textSecondary} style={styles.note}>
          Your card was not charged. The work is here whenever you are ready.
        </Text>
      </View>

      <View style={styles.cta}>
        <Button block size="lg" onPress={() => router.replace('/(tabs)')}>
          Continue
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  title: { marginTop: 12 },
  note: { marginTop: 16, lineHeight: 24 },
  cta: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
});
