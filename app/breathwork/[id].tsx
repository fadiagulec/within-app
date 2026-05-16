import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import { tokens } from '@/theme/tokens';
import { findBreathworkById } from '@/data/breathwork';
import { getLevel } from '@/data/levels';
import { useProgressStore } from '@/store/useProgressStore';
import { PaywallModal } from '@/features/payments/PaywallModal';

export default function BreathworkDetail() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const unlockedLevels = useProgressStore((s) => s.progress.unlockedLevels);
  const [paywallOpen, setPaywallOpen] = useState(false);

  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/breathwork-library');
    }
  }

  if (!id) {
    return (
      <Screen>
        <Text variant="heading2">Breathwork not found.</Text>
        <Button onPress={goBack} style={{ marginTop: 24 }}>
          Back to library
        </Button>
      </Screen>
    );
  }

  const session = findBreathworkById(id);
  if (!session) {
    return (
      <Screen>
        <Text variant="heading2">Breathwork not found.</Text>
        <Button onPress={goBack} style={{ marginTop: 24 }}>
          Back to library
        </Button>
      </Screen>
    );
  }

  const unlocked = unlockedLevels.includes(session.levelRequired);
  const level = getLevel(session.levelRequired);
  const priceLabel =
    level && level.priceUSD !== 'free' ? `$${level.priceUSD}` : 'see price';

  function play() {
    if (!unlocked) {
      setPaywallOpen(true);
      return;
    }
    router.push({ pathname: '/session/[id]', params: { id: session!.id } });
  }

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Pressable
          onPress={goBack}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Back
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          BREATHWORK · {session.durationMin} MIN
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
        <Text variant="eyebrow" color={tokens.semantic.accent}>
          · TECHNIQUE · {session.technique.toUpperCase()}
        </Text>
        <Text variant="heading1" style={{ marginTop: 10 }}>
          {session.title}
        </Text>
        <Text
          variant="displayItalic"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 14 }}
        >
          {session.subtitle}
        </Text>

        <Text
          variant="body"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 22, lineHeight: 22 }}
        >
          {session.theme}
        </Text>

        <View style={styles.chipRow}>
          {session.chips.map((c) => (
            <View key={c} style={styles.chip}>
              <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 11 }}>
                {c.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>

        {session.safetyWarning ? (
          <View style={styles.safetyBox}>
            <Text variant="eyebrow" color={tokens.semantic.warningAmber}>
              SAFETY NOTE
            </Text>
            <Text
              variant="bodySmall"
              style={{ marginTop: 8, lineHeight: 20 }}
              color={tokens.semantic.textSecondary}
            >
              {session.safetyWarning}
            </Text>
          </View>
        ) : null}

        <View style={styles.scienceBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <Text variant="eyebrow">THE SCIENCE</Text>
            <SpeechPlayer
              text={`${session.title}. ${session.subtitle}. ${session.theme}. ${session.technique}. ${session.science}`}
              accent={tokens.semantic.accent}
              label="LISTEN"
              size="sm"
            />
          </View>
          <Text
            variant="bodySmall"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 8, lineHeight: 20 }}
          >
            {session.science}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button block size="lg" onPress={play}>
          {unlocked ? `Begin · ${session.durationMin} min` : `Unlock · ${priceLabel}`}
        </Button>
      </View>

      <PaywallModal
        visible={paywallOpen}
        levelId={session.levelRequired}
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
  chipRow: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: tokens.radii.pill,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  safetyBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: tokens.radii.lg,
    backgroundColor: `${tokens.semantic.warningAmber}15`,
    borderWidth: 1,
    borderColor: `${tokens.semantic.warningAmber}55`,
  },
  scienceBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
});
