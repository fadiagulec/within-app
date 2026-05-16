/**
 * LockedContent — wraps paid content with a blurred preview + unlock CTA.
 * Uses useProgressStore.unlockedLevels as the gate.
 */
import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { useProgressStore } from '@/store/useProgressStore';
import { PaywallModal } from '@/features/payments/PaywallModal';
import { getLevel } from '@/data/levels';

interface Props {
  levelRequired: number;
  title?: string;
  teaser?: string;
  children: React.ReactNode;
  /** If provided, shown above the unlock CTA as an eyebrow. */
  eyebrow?: string;
}

export function LockedContent({
  levelRequired,
  title,
  teaser,
  eyebrow,
  children,
}: Props) {
  const unlockedLevels = useProgressStore((s) => s.progress.unlockedLevels);
  const unlocked = unlockedLevels.includes(levelRequired);
  const [paywallOpen, setPaywallOpen] = useState(false);

  if (unlocked) return <>{children}</>;

  const level = getLevel(levelRequired);
  const price = level && typeof level.priceUSD === 'number' ? level.priceUSD : 0;

  return (
    <View style={styles.root}>
      <View style={styles.childrenWrap} pointerEvents="none">
        <View style={{ opacity: 0.25 }}>{children}</View>
      </View>
      <LinearGradient
        colors={['rgba(11,11,13,0.0)', 'rgba(11,11,13,0.96)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.85 }}
      />
      <View style={styles.overlay}>
        <Text variant="eyebrow" color={tokens.semantic.accent}>
          {eyebrow ?? `LOCKED · LEVEL ${levelRequired}`}
        </Text>
        <Text
          variant="heading3"
          align="center"
          style={{ marginTop: 6, maxWidth: 280 }}
        >
          {title ?? level?.name ?? 'This layer is still closed.'}
        </Text>
        {teaser ? (
          <Text
            variant="bodySmall"
            color={tokens.semantic.textSecondary}
            align="center"
            style={{ marginTop: 8, maxWidth: 280 }}
          >
            {teaser}
          </Text>
        ) : null}
        <Pressable
          onPress={() => setPaywallOpen(true)}
          style={styles.cta}
        >
          <Text variant="body" color={tokens.semantic.textOnGold}>
            Unlock · ${price}
          </Text>
        </Pressable>
      </View>

      <PaywallModal
        visible={paywallOpen}
        levelId={levelRequired}
        onClose={() => setPaywallOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: tokens.radii.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  childrenWrap: {
    // eslint-disable-next-line react-native/no-inline-styles
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cta: {
    marginTop: 14,
    backgroundColor: tokens.semantic.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: tokens.radii.pill,
  },
});
