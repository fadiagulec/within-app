/**
 * Tarot spread reading — three-card spreads.
 *
 * Flow:
 *   1. Optional question entry
 *   2. Three face-down cards. Tap each to reveal.
 *   3. When all revealed: full reading view with position guidance
 *   4. Save → enters history
 */

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { TarotCardView } from '@/components/TarotCardView';
import { SPREADS, drawCards, type DrawnCard, type SpreadId } from '@/data/tarot/spreads';
import { useTarotStore } from '@/store/useTarotStore';

export default function TarotSpread() {
  const router = useRouter();
  const params = useLocalSearchParams<{ spread?: string }>();
  const spreadId = (params.spread === 'situation' ? 'situation' : 'three-card') as SpreadId;
  const spread = SPREADS[spreadId];
  const recordReading = useTarotStore((s) => s.recordReading);

  const [step, setStep] = useState<'question' | 'draw'>('question');
  const [question, setQuestion] = useState('');
  const [drawn, setDrawn] = useState<DrawnCard[] | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const [savedId, setSavedId] = useState<string | null>(null);

  function beginDraw() {
    setDrawn(drawCards(spread.cardCount));
    setRevealedCount(0);
    setStep('draw');
  }

  function revealNext() {
    setRevealedCount((n) => Math.min(n + 1, spread.cardCount));
  }

  const allRevealed = drawn && revealedCount === spread.cardCount;

  function saveReading() {
    if (!drawn) return;
    const id = recordReading(spreadId, drawn, question);
    setSavedId(id);
  }

  // QUESTION STEP
  if (step === 'question') {
    return (
      <Screen padded={false}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Back">
            <Text variant="body" color={tokens.semantic.textSecondary}>
              ← Back
            </Text>
          </Pressable>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 12 }}>
            {spread.name.toUpperCase()}
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 140 }}>
          <Text variant="eyebrow" color="#D4AF6E" style={{ fontSize: 13, letterSpacing: 2 }}>
            BEFORE YOU DRAW
          </Text>
          <Text variant="heading1" style={{ marginTop: 8, fontSize: 32, lineHeight: 40 }}>
            {spread.name}
          </Text>
          <Text variant="displayItalic" color={tokens.semantic.textSecondary} style={{ marginTop: 12, fontSize: 17, lineHeight: 26 }}>
            {spread.subtitle}
          </Text>

          <View style={styles.questionCard}>
            <Text variant="eyebrow" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.8 }}>
              YOUR QUESTION · OPTIONAL
            </Text>
            <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 6, lineHeight: 19 }}>
              You can hold a question in your mind as you draw — or simply ask the cards what wants to be seen.
            </Text>
            <TextInput
              value={question}
              onChangeText={setQuestion}
              placeholder="What am I missing about ___?"
              placeholderTextColor={tokens.semantic.textTertiary}
              multiline
              style={styles.input}
            />
          </View>

          <View style={styles.positionsPreview}>
            {spread.positions.map((p) => (
              <View key={p.index} style={styles.positionRow}>
                <Text variant="mono" color="#D4AF6E" style={{ fontSize: 11, letterSpacing: 1.5, width: 110 }}>
                  {p.label}
                </Text>
                <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ flex: 1, lineHeight: 20 }}>
                  {p.guidance}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button block size="lg" onPress={beginDraw}>
            Draw the cards
          </Button>
        </View>
      </Screen>
    );
  }

  // DRAW STEP — three cards face-down → reveal one by one → save
  if (!drawn) return null;

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Back">
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Back
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 12 }}>
          {allRevealed ? 'YOUR READING' : `REVEAL ${revealedCount + 1} / ${spread.cardCount}`}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 160, paddingHorizontal: 20 }}>
        {question.trim().length > 0 ? (
          <View style={styles.questionEcho}>
            <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.5 }}>
              YOU ASKED
            </Text>
            <Text variant="displayItalic" style={{ marginTop: 6, fontSize: 17, lineHeight: 25 }}>
              {question.trim()}
            </Text>
          </View>
        ) : null}

        {!allRevealed ? (
          <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginVertical: 18, fontSize: 15, lineHeight: 23, textAlign: 'center' }}>
            Tap each card to reveal it. Sit with it before turning the next.
          </Text>
        ) : null}

        {/* Cards row */}
        <View style={styles.cardsRow}>
          {drawn.map((d, idx) => {
            const isRevealed = idx < revealedCount;
            const isNext = idx === revealedCount;
            const position = spread.positions[idx]!;
            return (
              <View key={idx} style={styles.cardSlot}>
                {isRevealed ? (
                  <TarotCardView
                    card={d.card}
                    reversed={d.reversed}
                    size="sm"
                    positionLabel={position.label}
                    onPress={() =>
                      router.push({
                        pathname: '/tarot/card/[id]',
                        params: { id: d.card.id, reversed: d.reversed ? '1' : '0' },
                      } as never)
                    }
                  />
                ) : (
                  <TarotCardView
                    card={d.card}
                    size="sm"
                    faceDown
                    positionLabel={position.label}
                    onPress={isNext ? revealNext : undefined}
                  />
                )}
              </View>
            );
          })}
        </View>

        {/* Position guidance — shown for revealed cards */}
        {allRevealed ? (
          <View style={{ marginTop: 28, gap: 18 }}>
            {drawn.map((d, idx) => {
              const position = spread.positions[idx]!;
              return (
                <Pressable
                  key={idx}
                  onPress={() =>
                    router.push({
                      pathname: '/tarot/card/[id]',
                      params: { id: d.card.id, reversed: d.reversed ? '1' : '0' },
                    } as never)
                  }
                  style={[styles.readingRow, { borderColor: `${d.card.color}55` }]}
                  accessibilityRole="button"
                  accessibilityLabel={`${position.label}: ${d.card.name}`}
                >
                  <Text variant="mono" color={d.card.color} style={{ fontSize: 11, letterSpacing: 1.8 }}>
                    {position.label}
                  </Text>
                  <Text variant="heading3" style={{ marginTop: 6, fontSize: 19 }}>
                    {d.card.name}
                    {d.reversed ? (
                      <Text variant="mono" color={d.card.color} style={{ fontSize: 11 }}>
                        {' '}
                        · REV
                      </Text>
                    ) : null}
                  </Text>
                  <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 6, lineHeight: 20 }}>
                    {position.guidance}
                  </Text>
                  <Text variant="body" style={{ marginTop: 12, fontSize: 15, lineHeight: 23 }}>
                    {d.reversed ? d.card.meaning.reversed : d.card.meaning.upright}
                  </Text>
                  <Text variant="body" color={d.card.color} style={{ marginTop: 10, fontSize: 13 }}>
                    Open card →
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </ScrollView>

      {allRevealed ? (
        <View style={styles.footer}>
          {savedId ? (
            <Button block size="lg" variant="ghost" onPress={() => router.replace('/tarot' as never)}>
              Saved. Back to tarot →
            </Button>
          ) : (
            <Button block size="lg" onPress={saveReading}>
              Save this reading
            </Button>
          )}
        </View>
      ) : null}
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
  questionCard: {
    marginTop: 22,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  input: {
    marginTop: 14,
    minHeight: 80,
    padding: 12,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgBase,
    color: tokens.semantic.textPrimary,
    fontFamily: tokens.fonts.body,
    fontSize: 16,
    lineHeight: 23,
    textAlignVertical: 'top',
  },
  positionsPreview: {
    marginTop: 28,
    gap: 14,
  },
  positionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  questionEcho: {
    marginTop: 10,
    padding: 14,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 14,
  },
  cardSlot: {
    flex: 1,
    alignItems: 'center',
  },
  readingRow: {
    padding: 18,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgElevated,
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
