/**
 * Astrology natal chart screen — REAL computation.
 *
 * Reads birth data from useUserStore, geocodes the city via Nominatim,
 * computes the chart in-browser via circular-natal-horoscope-js, displays
 * the result. Zero recurring cost, no API keys.
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { useUserStore } from '@/store/useUserStore';
import { computeChart, type NatalChart } from '@/astro/chart';
import { geocodeCity, type GeocodeResult } from '@/astro/geocode';

const ACCENT = '#5645A6'; // third-eye indigo

export default function ChartScreen() {
  const router = useRouter();
  const birthData = useUserStore((s) => s.user.birthData);

  const [chart, setChart] = useState<NatalChart | null>(null);
  const [geocode, setGeocode] = useState<GeocodeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Compute chart whenever birthData changes
  useEffect(() => {
    let cancelled = false;
    if (!birthData) return;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        // 1. Geocode the city (cached)
        let loc: GeocodeResult | null = null;
        if (birthData.city) {
          loc = await geocodeCity(birthData.city);
        }
        if (!loc) {
          // Fallback to Greenwich if no city given — chart still works at noon UTC
          loc = {
            lat: 51.4769,
            lng: -0.0005,
            displayName: 'Greenwich (default)',
            timezoneOffsetHours: 0,
          };
        }
        if (cancelled) return;
        setGeocode(loc);

        // 2. Compute the chart
        const result = computeChart({
          date: birthData.date,
          time: birthData.timeUnknown ? undefined : birthData.time,
          lat: loc.lat,
          lng: loc.lng,
          timezoneOffsetHours: loc.timezoneOffsetHours,
        });
        if (cancelled) return;
        setChart(result);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Chart computation failed');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [birthData]);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/you' as never);
  }

  // ─── No birth data yet ───────────────────────────────────────────
  if (!birthData) {
    return (
      <Screen padded={false}>
        <View style={styles.header}>
          <Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Go back" hitSlop={10}>
            <Text variant="body" color={tokens.semantic.textSecondary}>← Back</Text>
          </Pressable>
        </View>
        <View style={styles.intro}>
          <Text variant="eyebrow" color={ACCENT}>ASTROLOGY</Text>
          <Text variant="heading1" style={{ marginTop: 6, fontSize: 32 }}>
            We need three things first.
          </Text>
          <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 12, fontSize: 16, lineHeight: 24 }}>
            Date, time, and place of birth. Used for both your astrology chart and your Energy Blueprint. Saved on this device only.
          </Text>
          <Button
            block size="lg" style={{ marginTop: 28 }}
            onPress={() => router.push('/you/birth-data' as never)}
            accessibilityLabel="Enter birth data"
          >
            Enter birth data →
          </Button>
        </View>
      </Screen>
    );
  }

  // ─── Loading ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <Screen padded={false}>
        <View style={styles.header}>
          <Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Go back" hitSlop={10}>
            <Text variant="body" color={tokens.semantic.textSecondary}>← Back</Text>
          </Pressable>
        </View>
        <View style={[styles.intro, { alignItems: 'center', paddingTop: 60 }]}>
          <ActivityIndicator color={ACCENT} size="large" />
          <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 16, fontSize: 15 }}>
            Calculating your chart…
          </Text>
        </View>
      </Screen>
    );
  }

  // ─── Error ───────────────────────────────────────────────────────
  if (error || !chart) {
    return (
      <Screen padded={false}>
        <View style={styles.header}>
          <Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Go back" hitSlop={10}>
            <Text variant="body" color={tokens.semantic.textSecondary}>← Back</Text>
          </Pressable>
        </View>
        <View style={styles.intro}>
          <Text variant="heading2">Chart could not be calculated.</Text>
          <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 8 }}>
            {error ?? 'Try editing your birth data.'}
          </Text>
          <Button
            block size="lg" style={{ marginTop: 24 }}
            onPress={() => router.push('/you/birth-data' as never)}
            accessibilityLabel="Edit birth data"
          >
            Edit birth data
          </Button>
        </View>
      </Screen>
    );
  }

  // ─── Real chart rendered ─────────────────────────────────────────
  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.header}>
          <Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Go back" hitSlop={10}>
            <Text variant="body" color={tokens.semantic.textSecondary}>← Back</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/you/birth-data' as never)} accessibilityRole="button" accessibilityLabel="Edit birth data">
            <Text variant="body" color={ACCENT} style={{ fontSize: 14 }}>Edit</Text>
          </Pressable>
        </View>

        <View style={[styles.hero, { borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}1A` }]}>
          <Text variant="eyebrow" color={ACCENT}>YOUR CHART</Text>
          <Text variant="heading1" style={{ marginTop: 6, fontSize: 32 }}>
            {chart.sun.sign} Sun · {chart.moon.sign} Moon
            {chart.rising ? ` · ${chart.rising.sign} Rising` : ''}
          </Text>
          <Text variant="displayItalic" color={tokens.semantic.textSecondary} style={{ marginTop: 8, fontSize: 16 }}>
            {birthData.date}
            {birthData.time && !birthData.timeUnknown ? ` · ${birthData.time}` : ' · time unknown'}
            {geocode ? ` · ${geocode.displayName.split(',')[0]}` : ''}
          </Text>
        </View>

        {/* Big three */}
        <View style={styles.bigThree}>
          <BigThreeCard label="SUN" sublabel="Core identity" sign={chart.sun.sign} degrees={chart.sun.degreesInSign} accent={ACCENT} />
          <BigThreeCard label="MOON" sublabel="Emotional landscape" sign={chart.moon.sign} degrees={chart.moon.degreesInSign} accent={ACCENT} />
          {chart.rising ? (
            <BigThreeCard label="RISING" sublabel="How others meet you" sign={chart.rising.sign} degrees={chart.rising.degreesInSign} accent={ACCENT} />
          ) : (
            <View style={[styles.bigCard, { borderColor: `${ACCENT}33`, backgroundColor: `${ACCENT}08` }]}>
              <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.5 }}>
                RISING
              </Text>
              <Text variant="bodySmall" color={tokens.semantic.textTertiary} style={{ marginTop: 8, fontSize: 13, lineHeight: 19 }}>
                Need exact birth time to compute. Add it to see your rising sign.
              </Text>
            </View>
          )}
        </View>

        {/* All planets */}
        <View style={styles.section}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.sectionLabel}>
            ALL PLANETS
          </Text>
          {chart.planets.map((p) => (
            <View key={p.name} style={styles.planetRow}>
              <View style={{ flex: 1 }}>
                <Text variant="body" color={tokens.semantic.textPrimary} style={{ fontSize: 15 }}>
                  {p.label}
                </Text>
                {p.house ? (
                  <Text variant="bodySmall" color={tokens.semantic.textTertiary} style={{ fontSize: 12, marginTop: 2 }}>
                    House {p.house}
                  </Text>
                ) : null}
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text variant="mono" color={ACCENT} style={{ fontSize: 14 }}>
                  {p.sign}
                </Text>
                <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11, marginTop: 2 }}>
                  {p.degreesInSign.toFixed(1)}°
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Top aspects */}
        {chart.aspects.length > 0 ? (
          <View style={styles.section}>
            <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.sectionLabel}>
              TIGHTEST ASPECTS
            </Text>
            {chart.aspects.slice(0, 8).map((a, i) => (
              <View key={i} style={styles.planetRow}>
                <Text variant="body" color={tokens.semantic.textPrimary} style={{ flex: 1, fontSize: 14 }}>
                  {a.pointA} {a.type.toLowerCase()} {a.pointB}
                </Text>
                <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11 }}>
                  {a.orb.toFixed(1)}° orb
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

function BigThreeCard({
  label,
  sublabel,
  sign,
  degrees,
  accent,
}: {
  label: string;
  sublabel: string;
  sign: string;
  degrees: number;
  accent: string;
}) {
  return (
    <View style={[styles.bigCard, { borderColor: `${accent}66`, backgroundColor: `${accent}14` }]}>
      <Text variant="mono" color={accent} style={{ fontSize: 11, letterSpacing: 1.5 }}>
        {label}
      </Text>
      <Text variant="heading1" color={tokens.semantic.textPrimary} style={{ marginTop: 6, fontSize: 26 }}>
        {sign}
      </Text>
      <Text variant="mono" color={tokens.semantic.textSecondary} style={{ marginTop: 2, fontSize: 12 }}>
        {degrees.toFixed(1)}°
      </Text>
      <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 8, fontSize: 12, lineHeight: 17 }}>
        {sublabel}
      </Text>
    </View>
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
    paddingTop: 12,
  },
  hero: {
    marginHorizontal: 20,
    padding: 22,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
  },
  bigThree: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 18,
  },
  bigCard: {
    width: '31%',
    minWidth: 100,
    flexGrow: 1,
    padding: 14,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    minHeight: 120,
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1.8,
    marginBottom: 12,
  },
  planetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: tokens.semantic.borderSubtle,
  },
});
