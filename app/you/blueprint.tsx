/**
 * Energy Blueprint screen — REAL computation.
 *
 * Soma's name for the Human Design layer (kept off the page intentionally:
 * "Human Design" is Jovian Archive's trademark; calling it Energy Blueprint
 * + redrawing visuals = no IP issue, identical math).
 *
 * Reads birth data, geocodes, computes both conscious + unconscious sides,
 * derives Type / Strategy / Authority / Profile / defined centres.
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { useUserStore } from '@/store/useUserStore';
import { computeBlueprint, type EnergyBlueprint } from '@/astro/blueprint';
import { geocodeCity, type GeocodeResult } from '@/astro/geocode';
import type { CentreId } from '@/astro/blueprint/gates';

const ACCENT = '#9B5BA1';

const CENTRE_LABELS: Record<CentreId, string> = {
  head: 'Head',
  ajna: 'Ajna',
  throat: 'Throat',
  g: 'G Centre',
  heart: 'Heart (Ego)',
  'solar-plexus': 'Solar Plexus',
  sacral: 'Sacral',
  spleen: 'Spleen',
  root: 'Root',
};

const CENTRE_ORDER: CentreId[] = [
  'head',
  'ajna',
  'throat',
  'g',
  'heart',
  'solar-plexus',
  'sacral',
  'spleen',
  'root',
];

export default function BlueprintScreen() {
  const router = useRouter();
  const birthData = useUserStore((s) => s.user.birthData);

  const [blueprint, setBlueprint] = useState<EnergyBlueprint | null>(null);
  const [geocode, setGeocode] = useState<GeocodeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!birthData) return;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        let loc: GeocodeResult | null = null;
        if (birthData.city) {
          loc = await geocodeCity(birthData.city);
        }
        if (!loc) {
          loc = {
            lat: 51.4769,
            lng: -0.0005,
            displayName: 'Greenwich (default)',
            timezoneOffsetHours: 0,
          };
        }
        if (cancelled) return;
        setGeocode(loc);

        const result = computeBlueprint({
          date: birthData.date,
          time: birthData.timeUnknown ? undefined : birthData.time,
          lat: loc.lat,
          lng: loc.lng,
          timezoneOffsetHours: loc.timezoneOffsetHours,
        });
        if (cancelled) return;
        setBlueprint(result);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Blueprint computation failed');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [birthData]);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/you' as never);
  }

  // ─── No birth data ───────────────────────────────────────────────
  if (!birthData) {
    return (
      <Screen padded={false}>
        <View style={styles.header}>
          <Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Go back" hitSlop={10}>
            <Text variant="body" color={tokens.semantic.textSecondary}>← Back</Text>
          </Pressable>
        </View>
        <View style={styles.intro}>
          <Text variant="eyebrow" color={ACCENT}>ENERGY BLUEPRINT</Text>
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
            Computing your blueprint…
          </Text>
        </View>
      </Screen>
    );
  }

  // ─── Error ───────────────────────────────────────────────────────
  if (error || !blueprint) {
    return (
      <Screen padded={false}>
        <View style={styles.header}>
          <Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Go back" hitSlop={10}>
            <Text variant="body" color={tokens.semantic.textSecondary}>← Back</Text>
          </Pressable>
        </View>
        <View style={styles.intro}>
          <Text variant="heading2">Blueprint could not be calculated.</Text>
          <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 8 }}>
            {error ?? 'Try editing your birth data.'}
          </Text>
        </View>
      </Screen>
    );
  }

  const definedCount = Object.values(blueprint.definedCentres).filter(Boolean).length;
  const undefCount = 9 - definedCount;

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

        {/* Type hero */}
        <View style={[styles.hero, { borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}1A` }]}>
          <Text variant="eyebrow" color={ACCENT}>YOUR TYPE</Text>
          <Text variant="heading1" style={{ marginTop: 6, fontSize: 32 }}>
            {blueprint.type}
          </Text>
          <Text variant="displayItalic" color={tokens.semantic.textPrimary} style={{ marginTop: 10, fontSize: 18 }}>
            Strategy: {blueprint.strategy}
          </Text>
          <Text variant="displayItalic" color={tokens.semantic.textSecondary} style={{ marginTop: 6, fontSize: 16 }}>
            Profile {blueprint.profile}
          </Text>
        </View>

        {/* Authority */}
        <View style={styles.section}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.sectionLabel}>
            HOW YOU MAKE DECISIONS
          </Text>
          <View style={[styles.authCard, { borderColor: `${ACCENT}55`, backgroundColor: `${ACCENT}10` }]}>
            <Text variant="heading2" color={tokens.semantic.textPrimary} style={{ fontSize: 22 }}>
              {blueprint.authority}
            </Text>
            <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 8, fontSize: 14, lineHeight: 21 }}>
              {authorityBlurb(blueprint.authority)}
            </Text>
          </View>
        </View>

        {/* Centres */}
        <View style={styles.section}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.sectionLabel}>
            YOUR CENTRES · {definedCount} DEFINED · {undefCount} OPEN
          </Text>
          <View style={styles.centreGrid}>
            {CENTRE_ORDER.map((c) => {
              const isDefined = blueprint.definedCentres[c];
              return (
                <View
                  key={c}
                  style={[
                    styles.centreCell,
                    {
                      borderColor: isDefined ? ACCENT : `${ACCENT}33`,
                      backgroundColor: isDefined ? `${ACCENT}33` : 'transparent',
                    },
                  ]}
                >
                  <Text
                    variant="mono"
                    color={isDefined ? tokens.semantic.textPrimary : tokens.semantic.textTertiary}
                    style={{ fontSize: 12 }}
                  >
                    {CENTRE_LABELS[c].toUpperCase()}
                  </Text>
                  <Text
                    variant="mono"
                    color={isDefined ? ACCENT : tokens.semantic.textTertiary}
                    style={{ fontSize: 10, marginTop: 4, letterSpacing: 1.2 }}
                  >
                    {isDefined ? 'DEFINED' : 'OPEN'}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text variant="bodySmall" color={tokens.semantic.textTertiary} style={{ marginTop: 14, fontSize: 12, lineHeight: 18, paddingHorizontal: 4 }}>
            Defined centres are consistent — they are who you are. Open centres are where you take in (and amplify) other people's energy. Both are useful.
          </Text>
        </View>

        {/* Activations */}
        <View style={styles.section}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.sectionLabel}>
            YOUR ACTIVATED GATES ({blueprint.activations.length})
          </Text>
          {blueprint.activations.slice(0, 26).map((a, i) => (
            <View key={i} style={styles.gateRow}>
              <View style={{ flex: 1 }}>
                <Text variant="body" color={tokens.semantic.textPrimary} style={{ fontSize: 14 }}>
                  Gate {a.gate}.{a.line} · {a.planet}
                </Text>
                <Text variant="bodySmall" color={tokens.semantic.textTertiary} style={{ marginTop: 2, fontSize: 12 }}>
                  {CENTRE_LABELS[a.centre]} · {a.side === 'personality' ? 'Personality (conscious)' : 'Design (unconscious)'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {geocode ? (
          <View style={{ paddingHorizontal: 20, paddingTop: 18 }}>
            <Text variant="bodySmall" color={tokens.semantic.textTertiary} style={{ fontSize: 11, lineHeight: 17, textAlign: 'center' }}>
              Computed from {birthData.date}
              {birthData.time && !birthData.timeUnknown ? ` ${birthData.time}` : ' (time unknown)'}
              {' · '}{geocode.displayName.split(',')[0]}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

function authorityBlurb(a: string): string {
  switch (a) {
    case 'Emotional (Solar Plexus)':
      return 'Wait through the wave before deciding. Clarity comes after the emotional weather has passed — give yourself sleep before the yes.';
    case 'Sacral':
      return 'Listen for the gut response — the spontaneous yes/no in the body. Trust the sound it makes.';
    case 'Splenic':
      return 'In-the-moment intuition. Quiet, instant, never repeats itself. If you missed it, wait for the next prompt.';
    case 'Ego (Heart)':
      return 'Decide from what your willpower wants — what you genuinely have the heart to do, not what you think you should.';
    case 'Self-Projected (G Centre)':
      return 'Talk it out. The right answer arrives when you hear yourself say it out loud to someone you trust.';
    case 'Mental (Outer)':
      return 'Use your environment as a sounding board — bounce decisions off the right people. Wait for clarity over time.';
    case 'Lunar (Reflector)':
      return 'Wait one lunar cycle (~28 days) before any major decision. The right answer reveals itself across the moon\'s full transit.';
    default:
      return '';
  }
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
  section: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1.8,
    marginBottom: 12,
  },
  authCard: {
    padding: 18,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
  },
  centreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  centreCell: {
    width: '31%',
    flexGrow: 1,
    minWidth: 100,
    padding: 12,
    borderRadius: tokens.radii.md,
    borderWidth: 1.5,
    alignItems: 'center',
    minHeight: 70,
    justifyContent: 'center',
  },
  gateRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: tokens.semantic.borderSubtle,
  },
});
