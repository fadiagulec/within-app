import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { feelings } from '@/data/feelings';
import { useUserStore } from '@/store/useUserStore';
import type { FeelingKey } from '@/types';

export default function FeelingSelector() {
  const router = useRouter();
  const setFeelings = useUserStore((s) => s.setFeelings);
  const [selected, setSelected] = useState<FeelingKey[]>([]);

  function toggle(key: FeelingKey) {
    Haptics.selectionAsync().catch(() => {});
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function next() {
    setFeelings(selected);
    router.push('/(onboarding)/wheel-of-life');
  }

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ paddingTop: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Text variant="eyebrow" color={tokens.semantic.accent} style={{ marginBottom: 6 }}>
          STEP 1 OF 4
        </Text>
        <Text variant="heading1">How are you, actually?</Text>
        <Text
          variant="bodySmall"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 8, maxWidth: 320 }}
        >
          Choose all that feel true. There are no wrong answers here.
        </Text>

        <View style={styles.grid}>
          {feelings.map((f) => {
            const on = selected.includes(f.key);
            return (
              <Pressable
                key={f.key}
                onPress={() => toggle(f.key)}
                style={[
                  styles.card,
                  on && { borderColor: f.color, backgroundColor: `${f.color}18` },
                ]}
              >
                <View style={[styles.dot, { backgroundColor: f.color }]} />
                <Text variant="heading3" style={{ marginTop: 14 }}>
                  {f.label}
                </Text>
                <Text
                  variant="bodySmall"
                  color={tokens.semantic.textTertiary}
                  style={{ marginTop: 4 }}
                >
                  {f.description}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          block
          size="lg"
          disabled={selected.length === 0}
          onPress={next}
        >
          Continue
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '48%',
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    marginBottom: 4,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: tokens.semantic.bgBase,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
});
