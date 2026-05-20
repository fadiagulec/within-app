/**
 * Tarot card detail — full meaning, reflection, journal hook.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { TarotCardView } from '@/components/TarotCardView';
import { getCardById, SUIT_META } from '@/data/tarot/deck';

export default function TarotCardDetail() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; reversed?: string; source?: string }>();
  const card = params.id ? getCardById(String(params.id)) : undefined;
  const reversed = params.reversed === '1';

  if (!card) {
    return (
      <Screen>
        <Text variant="heading2">Card not found.</Text>
        <Button onPress={() => router.back()} style={{ marginTop: 16 }} accessibilityLabel="Back">
          Back
        </Button>
      </Screen>
    );
  }

  // Narrow for closures — TS loses the !card guard inside callbacks below.
  const cardRef = card;
  const suitMeta = SUIT_META[cardRef.suit];
  const meaningText = reversed ? cardRef.meaning.reversed : cardRef.meaning.upright;
  const keywords = reversed ? cardRef.keywords.reversed : cardRef.keywords.upright;

  function openJournal() {
    router.push({
      pathname: '/journal/write',
      params: {
        prompt: cardRef.journalPrompt,
        promptId: `tarot-${cardRef.id}`,
      },
    });
  }

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <Text variant="body" color={tokens.semantic.textSecondary}>
              ← Back
            </Text>
          </Pressable>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 12 }}>
            {suitMeta.label.toUpperCase()}
          </Text>
        </View>

        <View style={styles.cardWrap}>
          <TarotCardView card={card} reversed={reversed} size="lg" />
        </View>

        <View style={styles.section}>
          <Text variant="mono" color={cardRef.color} style={{ fontSize: 11, letterSpacing: 2 }}>
            {reversed ? 'REVERSED' : 'UPRIGHT'} · {keywords.map((k) => k.toUpperCase()).join(' · ')}
          </Text>
          <Text variant="heading2" style={{ marginTop: 14, fontSize: 26, lineHeight: 34 }}>
            {cardRef.name}
          </Text>
          <Text variant="bodySmall" color={tokens.semantic.textTertiary} style={{ marginTop: 6 }}>
            {suitMeta.element.toUpperCase()} · {suitMeta.description}
          </Text>
        </View>

        <View style={[styles.meaningCard, { borderColor: `${cardRef.color}55`, backgroundColor: `${cardRef.color}10` }]}>
          <Text variant="eyebrow" color={cardRef.color} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            MEANING
          </Text>
          <Text variant="body" style={{ marginTop: 12, fontSize: 17, lineHeight: 27 }}>
            {meaningText}
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="eyebrow" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            SIT WITH THIS
          </Text>
          <Text variant="displayItalic" style={{ marginTop: 10, fontSize: 21, lineHeight: 30 }}>
            {cardRef.reflection}
          </Text>
        </View>

        <View style={[styles.journalCard, { borderColor: `${cardRef.color}55` }]}>
          <Text variant="eyebrow" color={cardRef.color} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            JOURNAL PROMPT
          </Text>
          <Text variant="body" style={{ marginTop: 12, fontSize: 16, lineHeight: 25 }}>
            {cardRef.journalPrompt}
          </Text>
          <Button
            variant="ghost"
            onPress={openJournal}
            style={{ marginTop: 14, alignSelf: 'flex-start' }}
            accessibilityLabel="Write in journal"
          >
            Open journal →
          </Button>
        </View>

        {cardRef.chakra ? (
          <View style={styles.section}>
            <Text variant="eyebrow" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.8 }}>
              CHAKRA RESONANCE
            </Text>
            <Text variant="body" style={{ marginTop: 8, fontSize: 15 }}>
              This card resonates with the{' '}
              <Text variant="body" color={cardRef.color} style={{ fontSize: 15 }}>
                {chakraLabel(cardRef.chakra)}
              </Text>
              .
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

function chakraLabel(key: string): string {
  return (
    {
      root: 'Root chakra',
      sacral: 'Sacral chakra',
      solar: 'Solar plexus',
      heart: 'Heart chakra',
      throat: 'Throat chakra',
      thirdEye: 'Third eye',
      crown: 'Crown chakra',
      soulStar: 'Soul star',
    } as Record<string, string>
  )[key] ?? key;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  cardWrap: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  meaningCard: {
    marginHorizontal: 20,
    marginTop: 24,
    padding: 22,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
  },
  journalCard: {
    marginHorizontal: 20,
    marginTop: 24,
    padding: 22,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgElevated,
  },
});
