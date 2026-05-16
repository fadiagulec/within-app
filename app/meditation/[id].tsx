import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { findMeditationById } from '@/data/meditations';
import { useProgressStore } from '@/store/useProgressStore';
import { PaywallModal } from '@/features/payments/PaywallModal';

export default function MeditationDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const unlockedLevels = useProgressStore((s) => s.progress.unlockedLevels);
  const [paywallOpen, setPaywallOpen] = useState(false);

  if (!id) return null;
  const med = findMeditationById(id);
  if (!med) {
    return (
      <Screen>
        <Text variant="heading2">Meditation not found.</Text>
      </Screen>
    );
  }
  const unlocked = unlockedLevels.includes(med.levelRequired);

  function play() {
    if (!unlocked) {
      setPaywallOpen(true);
      return;
    }
    router.push({ pathname: '/session/[id]', params: { id: med!.id } });
  }

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Back
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          MEDITATION · {med.durationMin} MIN
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
        <Text variant="eyebrow" color={tokens.semantic.accent}>
          · GUIDED MEDITATION
        </Text>
        <Text variant="heading1" style={{ marginTop: 10 }}>
          {med.title}
        </Text>
        <Text
          variant="displayItalic"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 14 }}
        >
          {med.subtitle}
        </Text>

        <Text
          variant="body"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 24, lineHeight: 22 }}
        >
          {med.theme}
        </Text>

        {med.bestTimeToUse ? (
          <View style={styles.metaBox}>
            <Text variant="eyebrow" color={tokens.semantic.textSecondary}>
              BEST TIME TO USE
            </Text>
            <Text variant="body" style={{ marginTop: 6 }}>
              {med.bestTimeToUse}
            </Text>
          </View>
        ) : null}

        {unlocked ? (
          <Pressable onPress={play} style={styles.previewChip}>
            <Text variant="eyebrow" color={tokens.semantic.accent}>
              ▶ PREVIEW 30s
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <Button block size="lg" onPress={play}>
          {unlocked ? `Begin · ${med.durationMin} min` : 'Unlock · see price'}
        </Button>
      </View>

      <PaywallModal
        visible={paywallOpen}
        levelId={med.levelRequired}
        onClose={() => setPaywallOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  metaBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  previewChip: {
    marginTop: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
    borderColor: tokens.semantic.accent,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
});
