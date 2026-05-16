/**
 * PaywallModal — reusable modal shown anywhere a user hits a locked level/journey.
 * Props: levelId (number) or price/title overrides.
 *
 * ▶ INTEGRATION: replace `purchaseLevel()` call with RevenueCat/Stripe (see README.md).
 */
import React, { useState } from 'react';
import { View, StyleSheet, Modal, Pressable, ActivityIndicator } from 'react-native';
import * as Haptics from '@/lib/haptic';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { levels, getLevel } from '@/data/levels';
import { usePurchaseStore } from './PurchaseStore';
import { useProgressStore } from '@/store/useProgressStore';

interface Props {
  visible: boolean;
  levelId: number;
  onClose: () => void;
  onPurchased?: (levelId: number) => void;
  /** Optional eyebrow override shown above the level name. */
  eyebrow?: string;
  /** Optional override title, for journey paywalls etc. */
  titleOverride?: string;
  /** Optional override price (used for journey bundles outside of levels). */
  priceOverride?: number;
  /** Optional override blurb. */
  blurbOverride?: string;
}

export function PaywallModal({
  visible,
  levelId,
  onClose,
  onPurchased,
  eyebrow,
  titleOverride,
  priceOverride,
  blurbOverride,
}: Props) {
  const level = getLevel(levelId) ?? (levels[0] as (typeof levels)[number]);
  const purchaseLevel = usePurchaseStore((s) => s.purchaseLevel);
  const unlockLevel = useProgressStore((s) => s.unlockLevel);

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const price =
    priceOverride ??
    (typeof level.priceUSD === 'number' ? level.priceUSD : 0);
  const title = titleOverride ?? level.name;
  const blurb = blurbOverride ?? level.blurb;

  async function doPurchase() {
    if (busy) return;
    setBusy(true);
    setErr(null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    const res = await purchaseLevel(levelId, {
      productId: `level_${levelId}`,
      priceUSD: price,
    });
    if (res.ok) {
      unlockLevel(levelId);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {}
      );
      onPurchased?.(levelId);
      setBusy(false);
      onClose();
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(
        () => {}
      );
      setErr(res.error);
      setBusy(false);
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <LinearGradient
          colors={[tokens.semantic.accentSoft, 'transparent']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.header}>
          <Pressable onPress={onClose} hitSlop={12}>
            <Text variant="body" color={tokens.semantic.textSecondary}>
              Close
            </Text>
          </Pressable>
        </View>

        <View style={styles.body}>
          <Text variant="eyebrow" color={tokens.semantic.accent} align="center">
            {eyebrow ?? `UNLOCK LEVEL ${level.id}`}
          </Text>
          <Text
            variant="hero"
            align="center"
            style={{ fontSize: 48, marginTop: 12 }}
          >
            {title}
          </Text>
          <Text
            variant="displayItalic"
            align="center"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 14, maxWidth: 320 }}
          >
            {level.title}
          </Text>

          <Text
            variant="body"
            align="center"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 24, maxWidth: 320, lineHeight: 22 }}
          >
            {blurb}
          </Text>

          <View style={styles.includedBox}>
            <Text variant="eyebrow">WHAT YOU UNLOCK</Text>
            <View style={{ marginTop: 12, gap: 8 }}>
              {level.included.map((item, i) => (
                <View key={i} style={{ flexDirection: 'row', gap: 10 }}>
                  <Text variant="body" color={tokens.semantic.accent}>
                    ◦
                  </Text>
                  <Text variant="body" style={{ flex: 1 }}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <Text
            variant="bodySmall"
            color={tokens.semantic.textTertiary}
            align="center"
            style={{ marginTop: 20, lineHeight: 20 }}
          >
            One-time purchase. Yours for life. No subscription.
          </Text>
        </View>

        {err ? (
          <Text
            variant="bodySmall"
            color={tokens.semantic.errorRust}
            align="center"
            style={{ marginBottom: 8 }}
          >
            {err}
          </Text>
        ) : null}

        <View style={styles.footer}>
          <Button block size="lg" onPress={doPurchase} disabled={busy}>
            {busy ? (
              <ActivityIndicator color={tokens.semantic.textOnGold} />
            ) : (
              `Unlock · $${price}`
            )}
          </Button>
          <Pressable onPress={onClose} style={{ padding: 10, marginTop: 6 }}>
            <Text
              variant="bodySmall"
              align="center"
              color={tokens.semantic.textTertiary}
            >
              Not now
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: tokens.semantic.bgBase,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    alignItems: 'center',
  },
  includedBox: {
    marginTop: 32,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    width: '100%',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
});
