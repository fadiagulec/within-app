/**
 * SOMA — Daily Chakra-State Check-In
 *
 * "How are you, actually?"
 *
 * The user picks one chakra's current state — balanced / underactive / overactive
 * — and the app records it + routes them to the practice that meets it.
 *
 * Underactive (collapsed, core emotion present)  → Release session for that chakra
 * Overactive  (over-defended, compensation)      → Grounding + Activate session
 * Balanced    (open, flowing)                    → Affirm + maintenance
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens, chakraColors } from '@/theme/tokens';
import { CHAKRA_STATES, type ChakraStates } from '@/data/chakra-states';
import { CHAKRA_CONTENT, type ChakraId } from '@/data/chakra-content';
import { useProgressStore } from '@/store/useProgressStore';
import { chakraIdToKey } from '@/data/chakra-id-mapping';

type StateKind = 'balanced' | 'underactive' | 'overactive';

const ORDER: ChakraId[] = [
  'root',
  'sacral',
  'solar-plexus',
  'heart',
  'throat',
  'third-eye',
  'crown',
];

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function CheckIn() {
  const router = useRouter();
  const checkIn = useProgressStore((s) => s.checkIn);

  const [selected, setSelected] = useState<{ chakra: ChakraId; state: StateKind } | null>(null);

  const pick = (chakra: ChakraId, state: StateKind) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected({ chakra, state });
  };

  const goToPractice = () => {
    if (!selected) return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Record the check-in (re-uses progress store)
    const vibration =
      selected.state === 'balanced' ? 8 : selected.state === 'underactive' ? 3 : 5;
    checkIn(todayIso(), 'arrival-check', vibration);

    // Route based on state
    if (selected.state === 'underactive') {
      // Underactive → open the release session (the heal phase)
      router.push({
        pathname: '/chakra/[id]',
        params: { id: selected.chakra },
      });
    } else if (selected.state === 'overactive') {
      // Overactive → ground first, then chakra
      router.push({
        pathname: '/breathwork/[id]',
        params: { id: 'four-seven-eight' },
      });
    } else {
      // Balanced → affirm phase to maintain
      router.push({
        pathname: '/chakra/[id]',
        params: { id: selected.chakra },
      });
    }
  };

  const skip = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/(tabs)');
  };

  return (
    <Screen backgroundColor={tokens.semantic.bgBase}>
      <StatusBar style="light" animated />
      <Pressable
        onPress={skip}
        style={styles.closeBtn}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Close"
      >
        <Text variant="heading3" color={tokens.semantic.textSecondary}>
          ✕
        </Text>
      </Pressable>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient
          colors={[`${tokens.semantic.accent}25`, 'transparent']}
          style={styles.hero}
        >
          <Text variant="eyebrow" color={tokens.semantic.accent}>
            DAILY CHECK-IN
          </Text>
          <Text variant="heading1" style={styles.heroTitle}>
            How are you,{' '}
            <Text variant="heading1" italic color={tokens.semantic.accent}>
              actually?
            </Text>
          </Text>
          <Text variant="body" color={tokens.semantic.textSecondary} style={styles.heroBody}>
            Scan your body. Pick the one that lands today. We'll meet you where you are.
          </Text>
        </LinearGradient>

        {/* Chakra rows */}
        <View style={styles.chakraList}>
          {ORDER.map((id) => {
            const state = CHAKRA_STATES[id];
            const meta = CHAKRA_CONTENT[id];
            const accent = meta.color;
            const isOpen = selected?.chakra === id;

            return (
              <View
                key={id}
                style={[
                  styles.chakraCard,
                  isOpen && { borderColor: accent, borderWidth: 1.5 },
                ]}
              >
                {/* Header */}
                <View style={styles.cardHeader}>
                  <View style={[styles.chakraDot, { backgroundColor: accent }]} />
                  <View style={{ flex: 1 }}>
                    <Text variant="heading3">{state.name}</Text>
                    <Text variant="bodySmall" color={tokens.semantic.textSecondary}>
                      {state.domain}
                    </Text>
                  </View>
                  <Text variant="label" color={tokens.semantic.textTertiary}>
                    {state.coreEmotion.toUpperCase()}
                  </Text>
                </View>

                {/* 3-state row */}
                <View style={styles.statesRow}>
                  <StateChip
                    label="Balanced"
                    items={state.balanced}
                    accent={tokens.semantic.successSage}
                    active={isOpen && selected?.state === 'balanced'}
                    onPress={() => pick(id, 'balanced')}
                  />
                  <StateChip
                    label="Under"
                    items={state.underactive}
                    accent={accent}
                    active={isOpen && selected?.state === 'underactive'}
                    onPress={() => pick(id, 'underactive')}
                  />
                  <StateChip
                    label="Over"
                    items={state.overactive}
                    accent={tokens.semantic.warningAmber}
                    active={isOpen && selected?.state === 'overactive'}
                    onPress={() => pick(id, 'overactive')}
                  />
                </View>

                {/* Diagnostic prompt — visible only when this chakra is selected */}
                {isOpen && (
                  <View style={styles.diagnostic}>
                    <Text
                      variant="bodySmall"
                      color={tokens.semantic.textSecondary}
                      style={{ fontStyle: 'italic', lineHeight: 20 }}
                    >
                      {state.diagnosticPrompt}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Selection summary */}
        {selected && (
          <View style={styles.summary}>
            <Text variant="eyebrow" color={tokens.semantic.accent}>
              YOUR ARRIVAL
            </Text>
            <Text variant="heading3" style={{ marginTop: 8 }}>
              {CHAKRA_STATES[selected.chakra].name} · {labelForState(selected.state)}
            </Text>
            <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 8, lineHeight: 22 }}>
              {recommendationFor(selected.state, CHAKRA_STATES[selected.chakra])}
            </Text>
          </View>
        )}

        {/* CTA */}
        <View style={styles.cta}>
          <Button block size="lg" onPress={goToPractice} disabled={!selected}>
            {selected ? 'Open the practice' : 'Tap a state to continue'}
          </Button>
          <Pressable onPress={skip} style={{ alignSelf: 'center', padding: 16 }}>
            <Text variant="bodySmall" color={tokens.semantic.textSecondary}>
              Skip for now
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}

// ============ COMPONENTS ============

function StateChip({
  label,
  items,
  accent,
  active,
  onPress,
}: {
  label: string;
  items: string[];
  accent: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.stateChip,
        active && {
          backgroundColor: `${accent}25`,
          borderColor: accent,
        },
      ]}
    >
      <Text
        variant="label"
        style={{
          color: active ? accent : tokens.semantic.textTertiary,
          letterSpacing: 1.2,
        }}
      >
        {label.toUpperCase()}
      </Text>
      <Text
        variant="bodySmall"
        style={{
          marginTop: 4,
          lineHeight: 18,
          color: active ? tokens.semantic.textPrimary : tokens.semantic.textSecondary,
        }}
      >
        {items.slice(0, 2).join(' · ')}
      </Text>
    </Pressable>
  );
}

// ============ HELPERS ============

function labelForState(s: StateKind): string {
  if (s === 'balanced') return 'Balanced';
  if (s === 'underactive') return 'Under-active';
  return 'Over-active';
}

function recommendationFor(s: StateKind, state: ChakraStates): string {
  if (s === 'balanced') {
    return `Open. Stay in it. A short ${state.name} affirmation practice will reinforce what is already working.`;
  }
  if (s === 'underactive') {
    return `The shadow here is ${state.coreEmotion.toLowerCase()}. We will meet it through the body — release work for ${state.name}.`;
  }
  return `Over-defended. Before opening, regulate. Start with breath, then return to ${state.name} grounding.`;
}

// ============ STYLES ============

const styles = StyleSheet.create({
  scroll: { paddingBottom: 60 },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 11, 13, 0.45)',
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    zIndex: 10,
  },
  hero: {
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 24,
  },
  heroTitle: { marginTop: 8 },
  heroBody: { marginTop: 12, lineHeight: 22 },

  chakraList: {
    paddingHorizontal: 16,
    marginTop: 8,
    gap: 12,
  },
  chakraCard: {
    padding: 16,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  chakraDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  stateChip: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgBase,
    minHeight: 64,
  },
  diagnostic: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
  summary: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 14,
    backgroundColor: tokens.semantic.bgElevated,
    borderLeftWidth: 3,
    borderLeftColor: tokens.semantic.accent,
  },
  cta: {
    marginTop: 28,
    paddingHorizontal: 24,
  },
});
