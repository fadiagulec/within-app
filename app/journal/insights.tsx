/**
 * Journal Insights dashboard.
 */
import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Circle, G } from 'react-native-svg';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { tokens, chakraColors } from '@/theme/tokens';
import { useJournalStore } from '@/store/useJournalStore';
import { useEmotionStore } from '@/store/useEmotionStore';
import { emotionColors } from '@/data/feelings';
import type { ChakraKey } from '@/types';

function iso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function JournalInsights() {
  const router = useRouter();
  const entries = useJournalStore((s) => s.entries);
  const emotions = useEmotionStore((s) => s.entries);

  const emotionCounts = useMemo(() => {
    const m: Record<string, number> = {};
    emotions.forEach((e) => {
      m[e.colorKey] = (m[e.colorKey] ?? 0) + 1;
    });
    return Object.entries(m)
      .map(([key, count]) => {
        const meta = emotionColors.find((c) => c.key === key);
        return { key, count, hex: meta?.hex ?? '#888', label: meta?.label ?? key };
      })
      .sort((a, b) => b.count - a.count);
  }, [emotions]);

  const totalEmo = emotionCounts.reduce((a, b) => a + b.count, 0) || 1;

  const chakraCounts = useMemo(() => {
    const m: Partial<Record<ChakraKey, number>> = {};
    entries.forEach((e) => {
      if (e.chakra) m[e.chakra] = (m[e.chakra] ?? 0) + 1;
    });
    return (Object.entries(m) as [ChakraKey, number][])
      .map(([key, count]) => ({
        key,
        count,
        hex: chakraColors[key],
      }))
      .sort((a, b) => b.count - a.count);
  }, [entries]);

  // Streak calendar: last 28 days
  const calendar = useMemo(() => {
    const days: { date: string; has: boolean; hex?: string }[] = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = iso(d);
      const entry = entries.find((e) => iso(new Date(e.timestamp)) === key);
      const emo = emotions.find((e) => iso(new Date(e.timestamp)) === key);
      days.push({
        date: key,
        has: !!entry,
        hex: emo
          ? emotionColors.find((c) => c.key === emo.colorKey)?.hex
          : undefined,
      });
    }
    return days;
  }, [entries, emotions]);

  // Weekly trend: last 4 weeks count
  const weeklyTrend = useMemo(() => {
    const now = Date.now();
    const week = 7 * 24 * 60 * 60 * 1000;
    return [3, 2, 1, 0].map((i) => {
      const start = now - (i + 1) * week;
      const end = now - i * week;
      const count = entries.filter(
        (e) => e.timestamp >= start && e.timestamp < end
      ).length;
      return { label: `−${i}w`, count };
    });
  }, [entries]);
  const maxCount = Math.max(1, ...weeklyTrend.map((w) => w.count));

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Back
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          INSIGHTS
        </Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
        <Text variant="heading1">What the pen said.</Text>
        <Text
          variant="displayItalic"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 10 }}
        >
          A map of your inner weather.
        </Text>

        {/* Emotion distribution */}
        <View style={styles.block}>
          <Text variant="eyebrow">EMOTION DISTRIBUTION</Text>
          {emotionCounts.length === 0 ? (
            <Text
              variant="bodySmall"
              color={tokens.semantic.textTertiary}
              style={{ marginTop: 8 }}
            >
              No entries yet.
            </Text>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 12 }}>
              <PieChart data={emotionCounts} />
              <View style={{ flex: 1, gap: 6 }}>
                {emotionCounts.slice(0, 5).map((e) => (
                  <View
                    key={e.key}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <View style={[styles.legendDot, { backgroundColor: e.hex }]} />
                    <Text variant="body" style={{ flex: 1 }}>
                      {e.label}
                    </Text>
                    <Text variant="mono" color={tokens.semantic.textTertiary}>
                      {Math.round((e.count / totalEmo) * 100)}%
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Streak calendar */}
        <View style={styles.block}>
          <Text variant="eyebrow">LAST 28 DAYS</Text>
          <View style={styles.calGrid}>
            {calendar.map((d) => (
              <View
                key={d.date}
                style={[
                  styles.calDot,
                  {
                    backgroundColor:
                      d.hex ??
                      (d.has
                        ? tokens.semantic.accent
                        : tokens.semantic.borderSubtle),
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Entries by chakra */}
        <View style={styles.block}>
          <Text variant="eyebrow">ENTRIES BY CHAKRA</Text>
          {chakraCounts.length === 0 ? (
            <Text
              variant="bodySmall"
              color={tokens.semantic.textTertiary}
              style={{ marginTop: 8 }}
            >
              Tag a chakra when you write to see this map.
            </Text>
          ) : (
            <View style={{ marginTop: 12, gap: 10 }}>
              {chakraCounts.map((c) => (
                <View key={c.key} style={styles.chkLine}>
                  <View style={[styles.chkDot, { backgroundColor: c.hex }]} />
                  <Text variant="body" style={{ flex: 1 }}>
                    {c.key}
                  </Text>
                  <Text variant="mono">{c.count}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Weekly trend */}
        <View style={styles.block}>
          <Text variant="eyebrow">WEEKLY TREND</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 14, alignItems: 'flex-end', height: 120 }}>
            {weeklyTrend.map((w) => (
              <View key={w.label} style={{ flex: 1, alignItems: 'center' }}>
                <View
                  style={{
                    width: '80%',
                    backgroundColor: tokens.semantic.accent,
                    height: `${(w.count / maxCount) * 100}%`,
                    minHeight: 3,
                    borderRadius: 4,
                  }}
                />
                <Text
                  variant="mono"
                  color={tokens.semantic.textTertiary}
                  style={{ marginTop: 6 }}
                >
                  {w.label}
                </Text>
                <Text variant="mono">{w.count}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function PieChart({
  data,
}: {
  data: { hex: string; count: number }[];
}) {
  const size = 120;
  const r = 52;
  const cx = size / 2;
  const cy = size / 2;
  const total = data.reduce((a, b) => a + b.count, 0) || 1;
  let cum = 0;
  const segments = data.map((d) => {
    const frac = d.count / total;
    const startAngle = cum * Math.PI * 2 - Math.PI / 2;
    cum += frac;
    const endAngle = cum * Math.PI * 2 - Math.PI / 2;
    return { ...d, startAngle, endAngle, frac };
  });
  return (
    <Svg width={size} height={size}>
      <G>
        {segments.map((s, i) => {
          if (s.frac === 0) return null;
          const x1 = cx + r * Math.cos(s.startAngle);
          const y1 = cy + r * Math.sin(s.startAngle);
          const x2 = cx + r * Math.cos(s.endAngle);
          const y2 = cy + r * Math.sin(s.endAngle);
          const large = s.frac > 0.5 ? 1 : 0;
          const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
          return <PiePath key={i} d={d} fill={s.hex} />;
        })}
        <Circle cx={cx} cy={cy} r={22} fill={tokens.semantic.bgBase} />
      </G>
    </Svg>
  );
}

function PiePath({ d, fill }: { d: string; fill: string }) {
  // Lazy import to avoid top-of-file mess.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Path } = require('react-native-svg');
  return <Path d={d} fill={fill} />;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  block: {
    marginTop: 24,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  calGrid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  calDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  chkLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  chkDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
