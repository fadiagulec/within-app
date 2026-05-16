/**
 * Journal tab — hub for prompts + history + insights.
 */
import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import {
  getDailyPrompt,
  getChakraPrompt,
  JOURNAL_CATEGORIES,
  journalCategoryDescriptions,
  type JournalCategory,
} from '@/data/journaling';
import { useJournalStore } from '@/store/useJournalStore';
import { useEmotionStore } from '@/store/useEmotionStore';
import { useUserStore } from '@/store/useUserStore';
import { emotionColors } from '@/data/feelings';

const WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function iso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function JournalTab() {
  const router = useRouter();
  const entries = useJournalStore((s) => s.entries);
  const emotions = useEmotionStore((s) => s.entries);
  const primaryChakra = useUserStore((s) => s.user.primaryChakra);

  // Pick today's prompt: chakra-aware if user has a primary.
  const todayPrompt = useMemo(() => {
    if (primaryChakra) {
      const pool = getChakraPrompt(primaryChakra);
      if (pool.length > 0) {
        // Deterministic per day so it doesn't rotate mid-day.
        const d = new Date();
        const seed = d.getFullYear() * 1000 + d.getMonth() * 50 + d.getDate();
        const picked = pool[seed % pool.length];
        if (picked) return picked;
      }
    }
    return getDailyPrompt();
  }, [primaryChakra]);

  // Build week grid: 7 days ending today, each with whether there's an entry.
  const weekGrid = useMemo(() => {
    const todayIdx = (new Date().getDay() + 6) % 7; // Mon=0
    const monday = new Date();
    monday.setDate(monday.getDate() - todayIdx);
    return WEEK_LABELS.map((label, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const date = iso(d);
      const hasEntry = entries.some(
        (e) => iso(new Date(e.timestamp)) === date
      );
      const dayEmotion = emotions.find(
        (e) => iso(new Date(e.timestamp)) === date
      );
      const emoHex = dayEmotion
        ? emotionColors.find((c) => c.key === dayEmotion.colorKey)?.hex
        : undefined;
      return {
        label,
        date,
        hasEntry,
        emoHex,
        today: i === todayIdx,
      };
    });
  }, [entries, emotions]);

  // Streak: count consecutive days with journal entries ending today.
  const streak = useMemo(() => {
    let s = 0;
    const d = new Date();
    while (true) {
      const key = iso(d);
      if (entries.some((e) => iso(new Date(e.timestamp)) === key)) {
        s += 1;
        d.setDate(d.getDate() - 1);
      } else {
        if (s === 0 && iso(d) === iso(new Date())) {
          d.setDate(d.getDate() - 1);
          continue;
        }
        break;
      }
    }
    return s;
  }, [entries]);

  // Dominant emotion this week
  const weekDominant = useMemo(() => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const counts: Record<string, number> = {};
    emotions
      .filter((e) => e.timestamp >= weekStart.getTime())
      .forEach((e) => {
        counts[e.colorKey] = (counts[e.colorKey] ?? 0) + 1;
      });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) return null;
    const firstEntry = sorted[0];
    if (!firstEntry) return null;
    const [topKey] = firstEntry;
    return emotionColors.find((c) => c.key === topKey);
  }, [emotions]);

  return (
    <Screen scroll padded={false} edges={['top']}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
        <Text variant="eyebrow" color={tokens.semantic.accent}>
          JOURNAL
        </Text>
        <Text variant="heading1" style={{ marginTop: 6 }}>
          The pen moves{'\n'}
          <Text variant="heading1" italic color={tokens.semantic.accent}>
            before the mind
          </Text>
          .
        </Text>

        {/* Today's prompt */}
        <View style={styles.promptCard}>
          <Text variant="eyebrow" color={tokens.semantic.accent}>
            TODAY
          </Text>
          <Text variant="heading2" style={{ marginTop: 8 }}>
            {todayPrompt.prompt}
          </Text>
          {todayPrompt.followUp ? (
            <Text
              variant="bodySmall"
              color={tokens.semantic.textSecondary}
              style={{ marginTop: 10 }}
            >
              {todayPrompt.followUp}
            </Text>
          ) : null}
          <Button
            size="lg"
            block
            style={{ marginTop: 16 }}
            onPress={() =>
              router.push({
                pathname: '/journal/write',
                params: {
                  promptId: todayPrompt.id,
                  prompt: todayPrompt.prompt,
                },
              })
            }
          >
            Write
          </Button>
        </View>

        {/* Week grid */}
        <View style={styles.weekRow}>
          {weekGrid.map((d, i) => (
            <View key={i} style={styles.weekCell}>
              <Text variant="mono" color={tokens.semantic.textTertiary}>
                {d.label}
              </Text>
              <View
                style={[
                  styles.weekDot,
                  {
                    backgroundColor:
                      d.emoHex ??
                      (d.hasEntry
                        ? tokens.semantic.accent
                        : tokens.semantic.borderDefault),
                    borderColor: d.today
                      ? tokens.semantic.accent
                      : 'transparent',
                  },
                ]}
              />
            </View>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statRow}>
          <Stat label="STREAK" value={`${streak} d`} />
          <Stat label="ENTRIES" value={String(entries.length)} />
          <Stat
            label="WEEK MOOD"
            value={weekDominant?.label ?? '—'}
            color={weekDominant?.hex}
          />
        </View>

        <Pressable
          onPress={() => router.push('/journal/insights')}
          style={styles.insightsLink}
        >
          <View style={{ flex: 1 }}>
            <Text variant="body">See all insights</Text>
            <Text variant="bodySmall" color={tokens.semantic.textTertiary}>
              Emotions, chakras, weekly trends
            </Text>
          </View>
          <Text variant="heading3" color={tokens.semantic.accent}>
            →
          </Text>
        </Pressable>

        {/* Categories */}
        <Text variant="eyebrow" style={{ marginTop: 28 }}>
          BROWSE PROMPTS
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 4,
          gap: 10,
        }}
      >
        {JOURNAL_CATEGORIES.map((c) => (
          <CategoryChip key={c} cat={c} />
        ))}
      </ScrollView>

      {/* Recent entries */}
      <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
        <Text variant="eyebrow">RECENT</Text>
        {entries.length === 0 ? (
          <Text
            variant="bodySmall"
            color={tokens.semantic.textTertiary}
            style={{ marginTop: 14, lineHeight: 20 }}
          >
            The first entry is the hardest. Pick up the pen above.
          </Text>
        ) : (
          <View style={{ marginTop: 12, gap: 10 }}>
            {entries.slice(0, 6).map((e) => {
              const emo = e.emotionKey
                ? emotionColors.find((c) => c.key === e.emotionKey)
                : undefined;
              return (
                <Pressable
                  key={e.id}
                  onPress={() =>
                    router.push({
                      pathname: '/journal/entry/[id]',
                      params: { id: e.id },
                    })
                  }
                  style={styles.entry}
                >
                  <View
                    style={[
                      styles.entryDot,
                      {
                        backgroundColor:
                          emo?.hex ?? tokens.semantic.borderStrong,
                      },
                    ]}
                  />
                  <View style={{ flex: 1 }}>
                    {e.promptText ? (
                      <Text
                        variant="bodySmall"
                        color={tokens.semantic.textSecondary}
                        numberOfLines={1}
                      >
                        {e.promptText}
                      </Text>
                    ) : null}
                    <Text
                      variant="body"
                      numberOfLines={2}
                      style={{ marginTop: 2 }}
                    >
                      {e.body || '(no body)'}
                    </Text>
                  </View>
                  <Text variant="mono" color={tokens.semantic.textTertiary}>
                    {new Date(e.timestamp).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>
    </Screen>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <View style={styles.stat}>
      <Text variant="eyebrow" color={tokens.semantic.textSecondary}>
        {label}
      </Text>
      <Text
        variant="heading2"
        style={{ marginTop: 4 }}
        color={color ?? tokens.semantic.textPrimary}
      >
        {value}
      </Text>
    </View>
  );
}

function CategoryChip({ cat }: { cat: JournalCategory }) {
  const router = useRouter();
  const desc = journalCategoryDescriptions[cat] ?? '';
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/journal/write',
          params: { category: cat },
        })
      }
      style={styles.catChip}
    >
      <Text variant="eyebrow" color={tokens.semantic.accent}>
        {cat.toUpperCase()}
      </Text>
      <Text
        variant="bodySmall"
        color={tokens.semantic.textSecondary}
        style={{ marginTop: 6 }}
        numberOfLines={2}
      >
        {desc}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  promptCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: tokens.radii.xl,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.accentSoft,
  },
  weekRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  weekCell: {
    alignItems: 'center',
    gap: 6,
  },
  weekDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
  },
  statRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
  },
  stat: {
    flex: 1,
    padding: 14,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  insightsLink: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  catChip: {
    width: 180,
    padding: 14,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  entryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
