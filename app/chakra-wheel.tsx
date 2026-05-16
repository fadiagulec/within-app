import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { ChakraWheel } from '@/components/ChakraWheel';
import { ChakraColorDot } from '@/components/ChakraColorDot';
import { tokens } from '@/theme/tokens';
import { chakras } from '@/data/chakras';
import type { ChakraKey } from '@/types';
import { chakraIdToKey, chakraKeyToId } from '@/data/chakra-id-mapping';

export default function ChakraWheelScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<ChakraKey>('root');
  const active = chakras.find((c) => c.key === selected)!;

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Close
          </Text>
        </Pressable>
        <Text variant="eyebrow">THE WHEEL</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={{ alignItems: 'center', marginTop: 12 }}>
        <ChakraWheel
          size="large"
          selectedChakra={chakraKeyToId(selected)}
          onSelect={(id) => setSelected(chakraIdToKey(id))}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dotRow}
      >
        {chakras.map((c) => {
          const on = c.key === selected;
          return (
            <Pressable
              key={c.key}
              onPress={() => setSelected(c.key)}
              style={[
                styles.dotPill,
                on && { borderColor: c.color, backgroundColor: `${c.color}22` },
              ]}
            >
              <ChakraColorDot chakra={c.key} size={10} withGlow={false} />
              <Text
                variant="bodySmall"
                color={on ? c.color : tokens.semantic.textSecondary}
                style={{ marginLeft: 8 }}
              >
                {c.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <Text variant="eyebrow" color={tokens.semantic.textSecondary}>
          {active.sanskrit.toUpperCase()} · {active.mantra}
        </Text>
        <Text variant="heading1" style={{ marginTop: 6 }} color={active.color}>
          {active.name}
        </Text>
        <Text
          variant="displayItalic"
          style={{ marginTop: 10 }}
          color={tokens.semantic.textSecondary}
        >
          {active.theme}
        </Text>

        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Text variant="eyebrow">ELEMENT</Text>
            <Text variant="body">{active.element}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text variant="eyebrow">LOCATION</Text>
            <Text variant="body">{active.bodyLocation}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text variant="eyebrow">SHADOW</Text>
            <Text variant="body" style={{ flex: 1, textAlign: 'right' }}>
              {active.shadow}
            </Text>
          </View>
        </View>

        <Text variant="eyebrow" style={{ marginTop: 24 }}>
          SESSIONS
        </Text>
        <View style={{ marginTop: 12, gap: 10 }}>
          {active.sessions.map((s) => (
            <Pressable
              key={s.id}
              onPress={() =>
                router.push({ pathname: '/session/[id]', params: { id: s.id } })
              }
              style={styles.sessionRow}
            >
              <View style={{ flex: 1 }}>
                <Text variant="bodyLarge">{s.title}</Text>
                <Text variant="bodySmall" color={tokens.semantic.textTertiary}>
                  {s.theme}
                </Text>
              </View>
              <Text variant="mono" color={tokens.semantic.textSecondary}>
                {s.durationMin} MIN
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          block
          onPress={() =>
            router.push({
              pathname: '/level/[id]',
              params: { id: String(active.index) },
            })
          }
        >
          See Level {active.index}
        </Button>
      </View>
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
  dotRow: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 8,
  },
  dotPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
  },
  metaCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: tokens.radii.xl,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    gap: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: tokens.semantic.bgBase,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
});
