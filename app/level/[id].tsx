import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { LevelBadge } from '@/components/LevelBadge';
import { ChakraColorDot } from '@/components/ChakraColorDot';
import { tokens } from '@/theme/tokens';
import { getLevel } from '@/data/levels';
import { getChakra } from '@/data/chakras';
import { useProgressStore } from '@/store/useProgressStore';
import type { ChakraKey } from '@/types';

export default function LevelDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const levelId = Number(id);
  const level = getLevel(levelId);
  const unlockedLevels = useProgressStore((s) => s.progress.unlockedLevels);
  const unlockLevel = useProgressStore((s) => s.unlockLevel);

  if (!level) {
    return (
      <Screen>
        <Text variant="heading2">Level not found.</Text>
        <Button variant="ghost" onPress={() => router.back()}>
          Back
        </Button>
      </Screen>
    );
  }

  const chakraKey: ChakraKey | undefined =
    level.chakra !== 'foundation' && level.chakra !== 'integration' && level.chakra !== 'certification'
      ? level.chakra
      : undefined;
  const chakra = chakraKey ? getChakra(chakraKey) : undefined;
  const accent = chakra?.color ?? tokens.semantic.accent;
  const unlocked = unlockedLevels.includes(level.id);

  function onUnlock() {
    if (level?.priceUSD === 'free') {
      unlockLevel(level.id);
      router.back();
    } else {
      router.push('/paywall-get-unstuck');
    }
  }

  return (
    <Screen padded={false}>
      <LinearGradient
        colors={[`${accent}55`, 'transparent']}
        style={[StyleSheet.absoluteFill, { height: 400 }]}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text variant="body" color={tokens.semantic.textSecondary}>
              ← Back
            </Text>
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: 24 }}>
          <LevelBadge level={level.id} locked={!unlocked} />
          <Text variant="hero" style={{ marginTop: 14, fontSize: 48 }}>
            {level.name}
          </Text>
          <Text
            variant="displayItalic"
            style={{ marginTop: 8, color: accent, fontSize: 20 }}
          >
            {level.title}
          </Text>
          {chakra ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 14 }}>
              <ChakraColorDot chakra={chakra.key} size={14} />
              <Text variant="eyebrow">
                {chakra.sanskrit.toUpperCase()} · {chakra.mantra}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text
            variant="bodyLarge"
            style={{ lineHeight: 24 }}
            color={tokens.semantic.textSecondary}
          >
            {level.blurb}
          </Text>
        </View>

        <View style={[styles.card, { marginTop: 16 }]}>
          <Text variant="eyebrow">INCLUDED</Text>
          <View style={{ marginTop: 12, gap: 12 }}>
            {level.included.map((item) => (
              <View key={item} style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <Text variant="body" color={accent}>
                  ·
                </Text>
                <Text variant="body" style={{ flex: 1 }}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, { marginTop: 16 }]}>
          <Text variant="eyebrow">AND UNLOCKS</Text>
          <View style={{ marginTop: 12, gap: 8 }}>
            {level.unlocks.map((item) => (
              <Text key={item} variant="bodySmall" color={tokens.semantic.textSecondary}>
                → {item}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {unlocked ? (
          <Button block size="lg" onPress={() => router.back()}>
            Continue
          </Button>
        ) : (
          <View style={{ gap: 6 }}>
            <Text variant="mono" align="center" color={tokens.semantic.textTertiary}>
              {level.priceUSD === 'free' ? 'FREE' : `$${level.priceUSD} ONE-TIME`}
            </Text>
            <Button block size="lg" onPress={onUnlock}>
              {level.priceUSD === 'free' ? 'Start now' : 'Unlock this layer'}
            </Button>
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  card: {
    marginHorizontal: 20,
    marginTop: 28,
    padding: 20,
    borderRadius: tokens.radii.xl,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgBase,
  },
});
