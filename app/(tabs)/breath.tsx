import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { BreathOrb } from '@/components/BreathOrb';
import { tokens } from '@/theme/tokens';
import { breathwork } from '@/data/breathwork';
import { useProgressStore } from '@/store/useProgressStore';

export default function BreathTab() {
  const router = useRouter();
  const unlockedLevels = useProgressStore((s) => s.progress.unlockedLevels);
  const [selectedId, setSelectedId] = useState<string | undefined>(
    breathwork[0]?.id
  );

  const selected =
    breathwork.find((b) => b.id === selectedId) ?? breathwork[0];

  if (!selected) {
    return (
      <Screen>
        <Text variant="heading2">No breath practices available.</Text>
      </Screen>
    );
  }

  const unlocked = unlockedLevels.includes(selected.levelRequired);

  return (
    <Screen scroll padded={false} edges={['top']}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
        <Text variant="eyebrow" color={tokens.semantic.accent}>
          BREATH
        </Text>
        <Text variant="heading1" style={{ marginTop: 6 }}>
          One breath{'\n'}at a time.
        </Text>

        <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 40 }}>
          {/* TODO: animate with Reanimated 3 (in-flight) — orb with the pattern */}
          <BreathOrb size={240} phaseLabel={selected.technique.split(' ')[0]} />
        </View>

        <View style={styles.card}>
          <Text variant="eyebrow">SELECTED</Text>
          <Text variant="heading2" style={{ marginTop: 6 }}>
            {selected.title}
          </Text>
          <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 8 }}>
            {selected.theme}
          </Text>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={{ marginTop: 12 }}>
            {selected.technique}
          </Text>
          {selected.safetyWarning ? (
            <Text
              variant="bodySmall"
              color={tokens.semantic.warningAmber}
              style={{ marginTop: 10 }}
            >
              Note: {selected.safetyWarning}
            </Text>
          ) : null}
          <Button
            block
            size="lg"
            style={{ marginTop: 20 }}
            onPress={() => {
              if (!unlocked) {
                router.push({ pathname: '/level/[id]', params: { id: String(selected.levelRequired) } });
                return;
              }
              router.push({ pathname: '/session/[id]', params: { id: selected.id } });
            }}
          >
            {unlocked ? 'Begin practice' : `Unlock Level ${selected.levelRequired}`}
          </Button>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillRow}
      >
        {breathwork.map((b) => {
          const active = b.id === selectedId;
          return (
            <Pressable
              key={b.id}
              onPress={() => setSelectedId(b.id)}
              accessibilityRole="button"
              accessibilityLabel={`Select ${b.title}, ${b.durationMin} minutes`}
              accessibilityState={{ selected: active }}
              style={[
                styles.pill,
                active && {
                  backgroundColor: tokens.semantic.accentSoft,
                  borderColor: tokens.semantic.accent,
                },
              ]}
            >
              <Text
                variant="bodySmall"
                color={active ? tokens.semantic.accent : tokens.semantic.textSecondary}
              >
                {b.title}
              </Text>
              <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 10, marginTop: 2 }}>
                {b.durationMin} MIN
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: tokens.radii.xl,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
  },
  pillRow: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
    backgroundColor: tokens.semantic.bgElevated,
  },
});
