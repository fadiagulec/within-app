/**
 * You tab — personalization hub.
 *
 * v1: a clean menu of "things about you" — Wheel of Life, Chakra map, Vision board,
 * Profile/settings.
 * v2: add Astrology natal chart + Energy Blueprint (Human Design) once those layers ship.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { useWheelStore } from '@/store/useWheelStore';
import { useUserStore } from '@/store/useUserStore';
import { CHAKRA_SPINE_ORDERED } from '@/data/chakra-spine';

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  href: string;
  status?: string;
}

export default function YouTab() {
  const router = useRouter();
  const name = useUserStore((s) => s.user.name);
  const latestWheel = useWheelStore((s) => s.getLatest());
  const wheelHistory = useWheelStore((s) => s.history);

  const items: MenuItem[] = [
    {
      id: 'unblocking-process',
      title: 'Rooted Through 1, Pulled Through 7',
      subtitle: 'The 7-step Quantum Unblocking Timeline Process.',
      accent: tokens.semantic.accent,
      href: '/unblocking-process',
    },
    {
      id: 'foundations',
      title: 'Foundations — read the why',
      subtitle: '24 briefs: 12 healing modalities + 12 lifestyle pillars for an aligned soul journey.',
      accent: '#5645A6',
      href: '/foundations',
      status: '24 briefs',
    },
    {
      id: 'body-wisdom',
      title: 'Body Wisdom',
      subtitle: 'What your body is trying to say. 50+ symptoms → chakra → protocol.',
      accent: '#B33B3B',
      href: '/body',
    },
    {
      id: 'body-inquiry',
      title: 'Body Inquiry — the 7-step practice',
      subtitle: 'A guided 22-min inquiry for hearing what one symptom is carrying. Lincoln-inspired depth work.',
      accent: '#B33B3B',
      href: '/body-inquiry',
      status: '~22 min',
    },
    {
      id: 'energy-hygiene',
      title: 'Energy Hygiene',
      subtitle: 'Daily 7-step practice. Ground, clear, protect, return to love.',
      accent: '#5645A6',
      href: '/energy-hygiene',
    },
    {
      id: 'methods',
      title: 'The Library — every healing method',
      subtitle: 'Every modality the app contains. Letters, breath, body, frequencies, plans, chart, meditations.',
      accent: '#5645A6',
      href: '/methods',
      status: 'BROWSE ALL',
    },
    {
      id: 'breathwork-library',
      title: 'Breathwork Library',
      subtitle: 'All 10 breath practices — Fire, Box, 4-7-8, Buteyko, Aham Prakasha, and more.',
      accent: '#3F8A5F',
      href: '/breathwork-library',
      status: '10 practices',
    },
    {
      id: 'meditations',
      title: 'Meditations Library',
      subtitle: 'Guided meditations — abundance, body temple, deep rest, super performance, morning, evening.',
      accent: '#3D9DC4',
      href: '/(tabs)/library',
    },
    {
      id: 'plans',
      title: '21-Day Plans',
      subtitle: 'Letting Go of the Past · Build Abundance · Magnetic Self. 15 min a day.',
      accent: '#5645A6',
      href: '/(tabs)/plans',
    },
    {
      id: 'check-in',
      title: 'Daily Check-In',
      subtitle: 'Pick the chakra calling for attention. 60 seconds.',
      accent: '#3D9DC4',
      href: '/check-in',
    },
    {
      id: 'mirror',
      title: 'Mirror Mode',
      subtitle: 'A 6-step reflection flow for when you notice a charged reaction in someone else.',
      accent: '#9B5BA1',
      href: '/mirror',
    },
    {
      id: 'connecting-light',
      title: 'Connecting to Light',
      subtitle: 'The 4 foundations — sleep, hydration, nourishment, grounding.',
      accent: '#E8B83E',
      href: '/connecting-to-light',
    },
    {
      id: 'protecting-light',
      title: 'Protecting Your Light',
      subtitle: 'Energy hygiene for the empath. Clear cords. Set the field.',
      accent: '#5645A6',
      href: '/protecting-your-light',
    },
    {
      id: 'learn',
      title: 'Learn',
      subtitle: 'Plain-language explainers across basics, chakras, breath, burnout, manifestation.',
      accent: '#A09784',
      href: '/learn',
    },
    {
      id: 'letters',
      title: 'The 8 Chakra Letters',
      subtitle: 'A 6-step written protocol per chakra — gratitude, forgiveness, truth, love, presence.',
      accent: '#9B5BA1',
      href: '/letter/heart',
    },
    {
      id: 'wheel',
      title: 'Wheel of Life',
      subtitle: latestWheel
        ? `Last completed ${new Date(latestWheel.completedAt).toLocaleDateString()} · ${wheelHistory.length} total`
        : 'Score 8 areas of your life. The app reads from this.',
      accent: tokens.semantic.accent,
      href: '/(onboarding)/wheel-of-life',
      status: latestWheel ? `${Math.round(latestWheel.average * 10) / 10}/10 avg` : 'Not taken yet',
    },
    {
      id: 'chart',
      title: 'Astrology Chart',
      subtitle: 'Your sun, moon, rising, transits — based on your birth data.',
      accent: '#5645A6',
      href: '/you/chart',
    },
    {
      id: 'blueprint',
      title: 'Energy Blueprint',
      subtitle: 'Your type, strategy, and authority — how you are wired.',
      accent: '#9B5BA1',
      href: '/you/blueprint',
    },
    {
      id: 'chakra-wheel',
      title: 'Chakra Map',
      subtitle: 'See all 8 energy centres and their current state.',
      accent: '#9B5BA1',
      href: '/chakra-wheel',
    },
    {
      id: 'relationships',
      title: 'Relationships',
      subtitle: 'Heart-anchored hub for love, grief, and intimacy work.',
      accent: '#3F8A5F',
      href: '/relationships',
    },
    {
      id: 'retreats',
      title: 'Retreats',
      subtitle: 'In-person experiences. Small groups. Application-based.',
      accent: '#CFB57E',
      href: '/retreats',
    },
    {
      id: 'vision',
      title: 'Vision',
      subtitle: 'What you are calling in.',
      accent: '#3F8A5F',
      href: '/(tabs)/vision',
    },
    {
      id: 'gratitude',
      title: 'Gratitude',
      subtitle: 'Three things, twice a day. Trains the brain to look for what is working.',
      accent: '#3F8A5F',
      href: '/gratitude',
    },
    {
      id: 'journal',
      title: 'Journal',
      subtitle: 'Everything you have written, by date.',
      accent: '#3D9DC4',
      href: '/(tabs)/journal',
    },
    {
      id: 'journey',
      title: 'Journey',
      subtitle: 'Your existing 21-day get-unstuck program.',
      accent: '#E07A2C',
      href: '/(tabs)/journey',
    },
    {
      id: 'profile',
      title: 'Profile & Settings',
      subtitle: 'Name, preferences, data, sign out.',
      accent: tokens.semantic.textTertiary,
      href: '/(tabs)/profile',
    },
  ];

  return (
    <Screen scroll padded={false} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text variant="eyebrow" color={tokens.semantic.accent}>
            YOU
          </Text>
          <Text variant="heading1" style={{ marginTop: 6 }}>
            {name ? `${name}.` : 'Your inner map.'}
          </Text>
          <Text
            variant="body"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 10, fontSize: 16, lineHeight: 24 }}
          >
            Everything the app personalizes from. The more honest the input, the sharper
            the recommendation.
          </Text>
        </View>

        {/* Quick chakra row — current state at a glance */}
        <View style={styles.chakraStrip}>
          {CHAKRA_SPINE_ORDERED.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => router.push({ pathname: '/chakra/[id]', params: { id: c.id } } as never)}
              accessibilityRole="button"
              accessibilityLabel={`Open ${c.name} chakra`}
              style={[
                styles.chakraPill,
                { borderColor: `${c.color}55`, backgroundColor: `${c.color}1A` },
              ]}
            >
              <View style={[styles.chakraDot, { backgroundColor: c.color }]} />
              <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 11 }}>
                {c.name.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          {items.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => router.push(item.href as never)}
              accessibilityRole="button"
              accessibilityLabel={`${item.title}. ${item.subtitle}`}
              style={[
                styles.menuItem,
                { borderColor: `${item.accent}44` },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text variant="heading3" color={tokens.semantic.textPrimary} style={{ fontSize: 17 }}>
                  {item.title}
                </Text>
                <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 4, fontSize: 13 }}>
                  {item.subtitle}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                {item.status ? (
                  <Text variant="mono" color={item.accent} style={{ fontSize: 11, marginBottom: 2 }}>
                    {item.status}
                  </Text>
                ) : null}
                <Text variant="heading3" color={item.accent} style={{ fontSize: 22 }}>
                  →
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  chakraStrip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chakraPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  chakraDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  menu: {
    marginTop: 12,
    paddingHorizontal: 20,
    gap: 12,
  },
  menuItem: {
    padding: 18,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgElevated,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
