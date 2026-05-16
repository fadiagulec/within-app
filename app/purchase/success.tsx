/**
 * SOMA — Stripe Purchase Success Handler
 *
 * Deep link: soma://purchase/success?product=KEY&level=N
 * Stripe redirects here after a successful Payment Link checkout.
 * This screen unlocks the entitlement locally and confirms.
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { usePurchaseStore } from '@/features/payments/PurchaseStore';
import { STRIPE_PRODUCTS, type StripeProductKey } from '@/features/payments/stripe';

const STRIPE_TO_LEVEL: Record<StripeProductKey, number> = {
  coaching_breathwork_997: 6,
  coaching_theta_1497: 7,
  retreat_pulse: 100, // arbitrary high IDs for retreats so they don't collide
  retreat_reset: 101,
  retreat_private: 102,
};

export default function PurchaseSuccess() {
  const router = useRouter();
  const params = useLocalSearchParams<{ product?: string; session_id?: string }>();
  const unlock = usePurchaseStore((s) => s.purchaseLevel);
  const [unlocked, setUnlocked] = useState(false);

  const productKey = params.product as StripeProductKey | undefined;
  const product = productKey ? STRIPE_PRODUCTS[productKey] : undefined;

  useEffect(() => {
    if (!productKey) return;
    const levelId = STRIPE_TO_LEVEL[productKey];
    if (levelId !== undefined) {
      unlock(levelId);
      setUnlocked(true);
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [productKey, unlock]);

  return (
    <Screen backgroundColor={tokens.semantic.bgBase}>
      <LinearGradient
        colors={[`${tokens.semantic.accent}40`, 'transparent']}
        style={styles.hero}
      >
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
        <Text variant="eyebrow" color={tokens.semantic.accent} align="center">
          PURCHASE COMPLETE
        </Text>
        <Text variant="heading1" align="center" style={styles.title}>
          You are in.
        </Text>
        {product && (
          <Text variant="body" align="center" color={tokens.semantic.textSecondary} style={styles.subtitle}>
            {product.title} confirmed.
          </Text>
        )}
      </LinearGradient>

      <View style={styles.body}>
        <Text variant="body" align="center" color={tokens.semantic.textSecondary} style={styles.note}>
          Your access is now active. We've sent a confirmation to your email with next steps and a discovery call link if applicable.
        </Text>
        <Text variant="bodySmall" align="center" color={tokens.semantic.textTertiary} style={styles.unlockNote}>
          {unlocked ? 'Entitlement saved on this device.' : ''}
        </Text>
      </View>

      <View style={styles.cta}>
        <Button block size="lg" onPress={() => router.replace('/(tabs)')}>
          Begin
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  checkmark: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#C9A96E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  checkmarkText: {
    color: '#C9A96E',
    fontSize: 36,
    fontWeight: '600',
    lineHeight: 40,
  },
  title: { marginTop: 8 },
  subtitle: { marginTop: 8, fontStyle: 'italic' },
  body: {
    paddingHorizontal: 32,
    marginTop: 24,
  },
  note: { lineHeight: 24 },
  unlockNote: { marginTop: 16, fontSize: 11 },
  cta: {
    paddingHorizontal: 24,
    marginTop: 'auto',
    marginBottom: 32,
  },
});
