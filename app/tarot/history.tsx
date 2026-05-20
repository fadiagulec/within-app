/**
 * Tarot reading history — list of past readings.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { useTarotStore } from '@/store/useTarotStore';
import { getCardById } from '@/data/tarot/deck';
import { SPREADS } from '@/data/tarot/spreads';

export default function TarotHistory() {
  const router = useRouter();
  const history = useTarotStore((s) => s.history);

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Back">
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Tarot
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 12 }}>
          READINGS · {history.length}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60, gap: 14 }}>
        {history.length === 0 ? (
          <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 24, fontSize: 15, lineHeight: 23 }}>
            No readings yet. When you draw cards, they will be saved here as a record you can come back to.
          </Text>
        ) : (
          history.map((r) => {
            const spread = SPREADS[r.spreadId];
            return (
              <View key={r.id} style={styles.entry}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.5 }}>
                    {r.date}
                  </Text>
                  <Text variant="mono" color="#D4AF6E" style={{ fontSize: 11, letterSpacing: 1.5 }}>
                    {spread.name.toUpperCase()}
                  </Text>
                </View>

                {r.question ? (
                  <Text variant="displayItalic" color={tokens.semantic.textPrimary} style={{ marginTop: 10, fontSize: 17, lineHeight: 25 }}>
                    “{r.question}”
                  </Text>
                ) : null}

                <View style={{ marginTop: 12, gap: 8 }}>
                  {r.cards.map((c) => {
                    const card = getCardById(c.cardId);
                    if (!card) return null;
                    const position = spread.positions.find((p) => p.index === c.position);
                    return (
                      <Pressable
                        key={c.cardId + c.position}
                        onPress={() =>
                          router.push({
                            pathname: '/tarot/card/[id]',
                            params: { id: card.id, reversed: c.reversed ? '1' : '0' },
                          } as never)
                        }
                        style={[styles.cardRow, { borderColor: `${card.color}55` }]}
                        accessibilityRole="button"
                        accessibilityLabel={`${card.name}${c.reversed ? ' reversed' : ''}`}
                      >
                        <Text style={{ fontSize: 28, color: card.color }}>{card.glyph}</Text>
                        <View style={{ flex: 1 }}>
                          {position ? (
                            <Text variant="mono" color={card.color} style={{ fontSize: 10, letterSpacing: 1.5 }}>
                              {position.label}
                            </Text>
                          ) : null}
                          <Text variant="body" color={tokens.semantic.textPrimary} style={{ marginTop: 4, fontSize: 15 }}>
                            {card.name}
                            {c.reversed ? (
                              <Text variant="mono" color={card.color} style={{ fontSize: 10 }}>
                                {' '}
                                · REV
                              </Text>
                            ) : null}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
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
  entry: {
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 12,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgBase,
  },
});
