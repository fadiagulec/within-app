/**
 * Full 21-day journey map: 3 weeks × 7 days grid.
 */
import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { tokens, chakraColors } from '@/theme/tokens';
import { getWeek, getWeekMeta, journeyProgram } from '@/data/journey';
import { useProgressStore } from '@/store/useProgressStore';

export default function JourneyOverview() {
  const router = useRouter();
  const progress = useProgressStore((s) => s.progress);
  const currentDay = progress.currentJourneyDay || 1;

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Back
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          THE 21 DAYS
        </Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <Text variant="heading1">{journeyProgram.title}</Text>
        <Text
          variant="displayItalic"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 10, maxWidth: 320 }}
        >
          {journeyProgram.subtitle}
        </Text>
        <Text
          variant="body"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 16, lineHeight: 22 }}
        >
          {journeyProgram.description}
        </Text>

        {[1, 2, 3].map((w) => {
          const weekNum = w as 1 | 2 | 3;
          const meta = getWeekMeta(weekNum);
          const days = getWeek(weekNum);
          if (!meta) return null;
          return (
            <View key={w} style={styles.week}>
              <View style={styles.weekHeader}>
                <View
                  style={[
                    styles.weekOrb,
                    { backgroundColor: meta.color },
                  ]}
                />
                <View>
                  <Text variant="eyebrow" color={tokens.semantic.textSecondary}>
                    WEEK {meta.week}
                  </Text>
                  <Text variant="heading2" style={{ marginTop: 2 }}>
                    {meta.theme} · {meta.focus}
                  </Text>
                </View>
              </View>

              <View style={styles.grid}>
                {days.map((d) => {
                  const done = progress.journeyDaysCompleted.includes(d.day);
                  const isCurrent = d.day === currentDay;
                  const future = !done && !isCurrent && d.day > currentDay;
                  return (
                    <Pressable
                      key={d.day}
                      onPress={() =>
                        future
                          ? undefined
                          : router.push({
                              pathname: '/journey/day/[n]',
                              params: { n: String(d.day) },
                            })
                      }
                      style={[
                        styles.dayCard,
                        {
                          borderColor: isCurrent
                            ? tokens.semantic.accent
                            : `${chakraColors[d.chakra]}55`,
                          opacity: future ? 0.45 : 1,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.dayDot,
                          { backgroundColor: chakraColors[d.chakra] },
                        ]}
                      />
                      <Text variant="mono" color={tokens.semantic.textTertiary}>
                        DAY {d.day}
                      </Text>
                      <Text
                        variant="body"
                        style={{ marginTop: 4, fontSize: 13 }}
                        numberOfLines={2}
                      >
                        {d.dayTitle}
                      </Text>
                      {done ? (
                        <Text
                          variant="bodySmall"
                          color={tokens.semantic.accent}
                          style={{ marginTop: 6 }}
                        >
                          ✓ done
                        </Text>
                      ) : isCurrent ? (
                        <Text
                          variant="bodySmall"
                          color={tokens.semantic.accent}
                          style={{ marginTop: 6 }}
                        >
                          · today
                        </Text>
                      ) : future ? (
                        <Text
                          variant="bodySmall"
                          color={tokens.semantic.textTertiary}
                          style={{ marginTop: 6 }}
                        >
                          locked
                        </Text>
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
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
  week: {
    marginTop: 28,
  },
  weekHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
  },
  weekOrb: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  dayCard: {
    width: '31.5%',
    padding: 12,
    minHeight: 112,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
  },
  dayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
});
