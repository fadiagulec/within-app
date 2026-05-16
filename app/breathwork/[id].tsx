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
import { getGuidedBreathScript } from '@/data/guided-breathwork-scripts';

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
  const guided = getGuidedBreathScript(session.id);

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
        <Text variant="eyebrow" color={tokens.semantic.accent} style={{ fontSize: 13, letterSpacing: 2 }}>
          · TECHNIQUE · {session.technique.toUpperCase()}
        </Text>
        <Text variant="heading1" style={{ marginTop: 12, fontSize: 38, lineHeight: 46 }}>
          {session.title}
        </Text>
        <Text
          variant="displayItalic"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 14, fontSize: 19, lineHeight: 28 }}
        >
          {session.subtitle}
        </Text>

        <Text
          variant="body"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 22, fontSize: 17, lineHeight: 26 }}
        >
          {session.theme}
        </Text>

        <View style={styles.chipRow}>
          {session.chips.map((c) => (
            <View key={c} style={styles.chip}>
              <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 13, letterSpacing: 1.2 }}>
                {c.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>

        {session.safetyWarning ? (
          <View style={styles.safetyBox}>
            <Text variant="eyebrow" color={tokens.semantic.warningAmber} style={{ fontSize: 13, letterSpacing: 2 }}>
              SAFETY NOTE
            </Text>
            <Text
              variant="bodySmall"
              style={{ marginTop: 10, fontSize: 16, lineHeight: 24 }}
              color={tokens.semantic.textSecondary}
            >
              {session.safetyWarning}
            </Text>
          </View>
        ) : null}

        <View style={styles.scienceBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <Text variant="eyebrow" style={{ fontSize: 13, letterSpacing: 2 }}>THE SCIENCE</Text>
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
            style={{ marginTop: 10, fontSize: 16, lineHeight: 24 }}
          >
            {session.science}
          </Text>
        </View>

        {/* Guided practice — voice walks the user through every breath */}
        {guided ? (
          <View style={styles.guidedCard}>
            <Text variant="mono" style={styles.guidedKicker}>
              GUIDED PRACTICE · {guided.durationMin} MIN · {guided.rounds} ROUNDS
            </Text>
            <Text variant="heading2" style={styles.guidedTitle}>
              {guided.title}
            </Text>
            <Text variant="body" style={styles.guidedBlurb}>
              {guided.blurb}
            </Text>
            <Text variant="bodySmall" style={styles.guidedHowTo}>
              Sit upright. Eyes closed if you can. Tap LISTEN below and just
              follow the voice. Every breath is counted for you.
            </Text>
            <View style={{ marginTop: 14, alignSelf: 'flex-start' }}>
              <SpeechPlayer
                text={guided.body}
                accent="#FFFFFF"
                label="LISTEN — BEGIN GUIDED PRACTICE"
              />
            </View>
          </View>
        ) : null}
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
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: tokens.radii.pill,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  guidedCard: {
    marginTop: 24,
    padding: 22,
    borderRadius: tokens.radii.xl,
    backgroundColor: tokens.semantic.accent,
    gap: 6,
  },
  guidedKicker: {
    fontSize: 11,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.9)',
  },
  guidedTitle: {
    marginTop: 6,
    fontSize: 26,
    lineHeight: 32,
    color: '#FFFFFF',
  },
  guidedBlurb: {
    marginTop: 6,
    fontSize: 17,
    lineHeight: 25,
    color: 'rgba(255,255,255,0.95)',
  },
  guidedHowTo: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.85)',
    fontStyle: 'italic',
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
