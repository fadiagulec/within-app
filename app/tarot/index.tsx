/**
 * Tarot hub — entry point. Daily pull + spread options + history link.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { TarotCardView } from '@/components/TarotCardView';
import { useTarotStore } from '@/store/useTarotStore';
import { useUserStore } from '@/store/useUserStore';

export default function TarotHub() {
  const router = useRouter();
  const getOrCreateDailyPull = useTarotStore((s) => s.getOrCreateDailyPull);
  const history = useTarotStore((s) => s.history);
  const userId = useUserStore((s) => s.user?.id);

  const daily = React.useMemo(() => getOrCreateDailyPull(userId), [getOrCreateDailyPull, userId]);

  return (
    <Screen scroll padded={false} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Back
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          TAROT
        </Text>
      </View>

      <View style={styles.intro}>
        <Text variant="eyebrow" color="#D4AF6E" style={{ fontSize: 13, letterSpacing: 2.2 }}>
          THE CARDS
        </Text>
        <Text variant="heading1" style={{ marginTop: 8, fontSize: 38, lineHeight: 46 }}>
          What does today{'\n'}want you to see?
        </Text>
        <Text
          variant="displayItalic"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 14, fontSize: 17, lineHeight: 26 }}
        >
          These cards don&apos;t predict your future. They mirror what is already alive inside you.
        </Text>
      </View>

      {/* Today's pull — hero */}
      <Pressable
        onPress={() =>
          router.push({ pathname: '/tarot/card/[id]', params: { id: daily.card.id, reversed: daily.reversed ? '1' : '0', source: 'daily' } } as never)
        }
        style={styles.dailyHero}
        accessibilityRole="button"
        accessibilityLabel={`Today's card: ${daily.card.name}${daily.reversed ? ' reversed' : ''}`}
      >
        <LinearGradient
          colors={[`${daily.card.color}33`, 'transparent']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
          <TarotCardView card={daily.card} reversed={daily.reversed} size="sm" />
          <View style={{ flex: 1 }}>
            <Text variant="mono" color={daily.card.color} style={{ fontSize: 11, letterSpacing: 1.8 }}>
              TODAY&apos;S PULL
            </Text>
            <Text variant="heading2" style={{ marginTop: 8, fontSize: 24, lineHeight: 32 }}>
              {daily.card.name}
            </Text>
            {daily.reversed ? (
              <Text variant="mono" color={daily.card.color} style={{ marginTop: 4, fontSize: 11 }}>
                REVERSED
              </Text>
            ) : null}
            <Text
              variant="body"
              color={tokens.semantic.textSecondary}
              style={{ marginTop: 12, fontSize: 14, lineHeight: 21 }}
              numberOfLines={3}
            >
              {daily.reversed ? daily.card.meaning.reversed : daily.card.meaning.upright}
            </Text>
            <Text variant="body" color={daily.card.color} style={{ marginTop: 10, fontSize: 13 }}>
              Open card →
            </Text>
          </View>
        </View>
      </Pressable>

      {/* Spread options */}
      <View style={styles.section}>
        <Text variant="eyebrow" color={tokens.semantic.textTertiary} style={{ fontSize: 12, letterSpacing: 1.8 }}>
          DEEPER READING
        </Text>
        <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 6, fontSize: 14, lineHeight: 21 }}>
          When you need more than a single card. Each spread is its own contemplation.
        </Text>

        <Pressable
          onPress={() => router.push({ pathname: '/tarot/spread', params: { spread: 'three-card' } } as never)}
          style={styles.spreadCard}
          accessibilityRole="button"
          accessibilityLabel="Three-card past, present, future spread"
        >
          <Text variant="heading3" style={{ fontSize: 19 }}>
            Past · Present · Future
          </Text>
          <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 6 }}>
            Three cards. The arc of a situation across time.
          </Text>
          <Text variant="body" color="#D4AF6E" style={{ marginTop: 10, fontSize: 13 }}>
            Draw →
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push({ pathname: '/tarot/spread', params: { spread: 'situation' } } as never)}
          style={styles.spreadCard}
          accessibilityRole="button"
          accessibilityLabel="Situation, obstacle, action spread"
        >
          <Text variant="heading3" style={{ fontSize: 19 }}>
            Situation · Obstacle · Action
          </Text>
          <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 6 }}>
            Three cards for a specific question or decision.
          </Text>
          <Text variant="body" color="#D4AF6E" style={{ marginTop: 10, fontSize: 13 }}>
            Draw →
          </Text>
        </Pressable>
      </View>

      {/* History */}
      <View style={styles.section}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text variant="eyebrow" color={tokens.semantic.textTertiary} style={{ fontSize: 12, letterSpacing: 1.8 }}>
            YOUR READINGS
          </Text>
          {history.length > 0 ? (
            <Pressable
              onPress={() => router.push('/tarot/history' as never)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="See all readings"
            >
              <Text variant="mono" color="#D4AF6E" style={{ fontSize: 11, letterSpacing: 1.5 }}>
                ALL ({history.length}) →
              </Text>
            </Pressable>
          ) : null}
        </View>
        {history.length === 0 ? (
          <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 12, fontSize: 14, lineHeight: 21 }}>
            Your readings will be saved here. Each one a checkpoint.
          </Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, marginTop: 12, paddingRight: 20 }}>
            {history.slice(0, 5).map((r) => {
              const first = r.cards[0];
              return (
                <Pressable
                  key={r.id}
                  onPress={() => router.push({ pathname: '/tarot/history' } as never)}
                  style={styles.historyChip}
                  accessibilityRole="button"
                  accessibilityLabel={`Reading from ${r.date}`}
                >
                  <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11 }}>
                    {r.date}
                  </Text>
                  <Text variant="body" color={tokens.semantic.textPrimary} style={{ marginTop: 4, fontSize: 14 }} numberOfLines={1}>
                    {r.spreadId === 'daily' ? 'Daily Pull' : r.spreadId === 'three-card' ? 'Past · Present · Future' : 'Situation Spread'}
                  </Text>
                  <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 4 }} numberOfLines={1}>
                    {first ? `${r.cards.length} card${r.cards.length === 1 ? '' : 's'}` : ''}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
      </View>

      <View style={{ height: 60 }} />
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
  intro: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  dailyHero: {
    margin: 20,
    padding: 18,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
    borderColor: '#D4AF6E66',
    backgroundColor: tokens.semantic.bgElevated,
    overflow: 'hidden',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 12,
    gap: 12,
  },
  spreadCard: {
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  historyChip: {
    width: 180,
    padding: 14,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
});
