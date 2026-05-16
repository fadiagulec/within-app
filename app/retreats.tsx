/**
 * Retreats listing — in-person retreat offerings.
 *
 * v1: hardcoded placeholder retreats with "Join the waitlist" CTA.
 * v2: backend-fed listings with cohort dates, deposits, vetting form.
 *
 * The 4 retreats here are the founder-confirmed concepts from the
 * vision conversation: soulmate, letting-go, abundance, and the
 * facilitator-fusion (breath + energy work) signature retreat.
 */

import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { WaitlistModal } from '@/components/WaitlistModal';
import { useWaitlistStore } from '@/store/useWaitlistStore';

interface Retreat {
  id: string;
  title: string;
  subtitle: string;
  blurb: string;
  duration: string;
  location: string;
  windowLabel: string;
  accent: string;
  pillarChakras: string[];
}

const RETREATS: Retreat[] = [
  {
    id: 'signature-fusion',
    title: 'The Signature Retreat',
    subtitle: 'Breathwork + energy work, facilitated together.',
    blurb:
      'Our founder-led, in-person fusion of breath and energy work. Six days. Small group. The work that does not happen on a screen.',
    duration: '6 days',
    location: 'Location announced to waitlist',
    windowLabel: 'NEXT COHORT · TBA',
    accent: '#CFB57E',
    pillarChakras: ['Heart', 'Soul Star', 'Crown'],
  },
  {
    id: 'soulmate',
    title: 'Soulmate Retreat',
    subtitle: 'For people ready to meet someone with the same intent.',
    blurb:
      'Ten women, ten men, one weekend. Same purpose: to find connection without performance. Curated, vetted, intentional. Not a singles event — a meeting place for people who have done the work.',
    duration: '3 days',
    location: 'Location announced to applicants',
    windowLabel: 'NEXT COHORT · TBA',
    accent: '#3F8A5F',
    pillarChakras: ['Heart', 'Sacral', 'Throat'],
  },
  {
    id: 'letting-go',
    title: 'Letting Go Retreat',
    subtitle: 'The 21-day plan, lived in person over five days.',
    blurb:
      'For people who finished — or want to start — the Letting Go arc with full immersion. Released, not just understood.',
    duration: '5 days',
    location: 'Location announced to waitlist',
    windowLabel: 'NEXT COHORT · TBA',
    accent: '#E07A2C',
    pillarChakras: ['Sacral', 'Heart', 'Throat'],
  },
  {
    id: 'abundance',
    title: 'Build Abundance Retreat',
    subtitle: 'For clearing the inherited money story in person.',
    blurb:
      'Five days of solar-plexus work plus practical abundance practice. The room itself is the rewiring.',
    duration: '5 days',
    location: 'Location announced to waitlist',
    windowLabel: 'NEXT COHORT · TBA',
    accent: '#E8B83E',
    pillarChakras: ['Solar Plexus', 'Heart', 'Crown'],
  },
];

export default function RetreatsScreen() {
  const router = useRouter();
  const isOnWaitlist = useWaitlistStore((s) => s.isOnWaitlist);
  const [openModal, setOpenModal] = useState<{
    id: string;
    title: string;
    accent: string;
  } | null>(null);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/you' as never);
  }

  function joinWaitlist(retreat: Retreat) {
    setOpenModal({ id: retreat.id, title: retreat.title, accent: retreat.accent });
  }

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.header}>
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={10}
          >
            <Text variant="body" color={tokens.semantic.textSecondary}>
              ← Back
            </Text>
          </Pressable>
        </View>

        <View style={styles.intro}>
          <Text variant="eyebrow" color={tokens.semantic.accent}>
            RETREATS
          </Text>
          <Text variant="heading1" style={{ marginTop: 6, fontSize: 32 }}>
            The work that does not{'\n'}happen on a screen.
          </Text>
          <Text
            variant="body"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 12, fontSize: 16, lineHeight: 24 }}
          >
            Some shifts only land in person — in a small room with people on the
            same path. These are the in-person experiences we run. Vetted, small
            groups, intentional.
          </Text>
        </View>

        <View style={styles.list}>
          {RETREATS.map((r) => (
            <View
              key={r.id}
              style={[
                styles.card,
                { borderColor: `${r.accent}55`, backgroundColor: `${r.accent}14` },
              ]}
            >
              <View style={styles.cardHead}>
                <View
                  style={[
                    styles.windowChip,
                    { backgroundColor: `${r.accent}33`, borderColor: r.accent },
                  ]}
                >
                  <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 11, letterSpacing: 1.5 }}>
                    {r.windowLabel}
                  </Text>
                </View>
                <Text variant="mono" color={r.accent} style={{ fontSize: 11, letterSpacing: 1.5 }}>
                  {r.duration.toUpperCase()}
                </Text>
              </View>

              <Text variant="heading2" style={{ marginTop: 14, fontSize: 24 }}>
                {r.title}
              </Text>
              <Text
                variant="displayItalic"
                color={tokens.semantic.textSecondary}
                style={{ marginTop: 6, fontSize: 17 }}
              >
                {r.subtitle}
              </Text>

              <Text
                variant="body"
                color={tokens.semantic.textPrimary}
                style={{ marginTop: 14, fontSize: 14, lineHeight: 22 }}
              >
                {r.blurb}
              </Text>

              <View style={styles.pillarRow}>
                {r.pillarChakras.map((c) => (
                  <View
                    key={c}
                    style={[
                      styles.pillar,
                      { borderColor: `${r.accent}88`, backgroundColor: `${r.accent}22` },
                    ]}
                  >
                    <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 10, letterSpacing: 1.2 }}>
                      {c.toUpperCase()}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.locationRow}>
                <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.2 }}>
                  ⌖ {r.location.toUpperCase()}
                </Text>
              </View>

              <Button
                block
                size="md"
                style={{ marginTop: 16 }}
                onPress={() => joinWaitlist(r)}
                accessibilityLabel={`Join the waitlist for ${r.title}`}
              >
                {isOnWaitlist(r.id) ? 'On the waitlist · view' : 'Join the waitlist'}
              </Button>
            </View>
          ))}
        </View>

        {openModal ? (
          <WaitlistModal
            visible={Boolean(openModal)}
            onClose={() => setOpenModal(null)}
            itemId={openModal.id}
            itemTitle={openModal.title}
            accent={openModal.accent}
          />
        ) : null}

        <View style={styles.footnote}>
          <Text variant="bodySmall" color={tokens.semantic.textTertiary} style={{ fontSize: 13, lineHeight: 21, textAlign: 'center' }}>
            All retreats are application-based. Small groups, careful curation, no big-room energy.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  intro: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  list: {
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    padding: 20,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  windowChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  pillarRow: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  pillar: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  locationRow: {
    marginTop: 12,
  },
  footnote: {
    paddingHorizontal: 40,
    paddingTop: 28,
  },
});
