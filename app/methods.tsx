/**
 * Within — Healing Methods hub.
 *
 * One screen that surfaces every healing modality the app contains.
 * Browseable by category. The purpose: anyone opening this screen
 * understands in 10 seconds what the app actually does.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { InsideBackground } from '@/components/InsideBackground';
import { CHAKRA_SPINE_ORDERED } from '@/data/chakra-spine';
import { breathwork } from '@/data/breathwork';
import { meditations } from '@/data/meditations';
import { BODY_WISDOM } from '@/data/body-wisdom';
import { PLANS } from '@/data/plans';

interface MethodCard {
  id: string;
  kicker: string;
  title: string;
  body: string;
  count?: string;
  accent: string;
  href: string;
}

export default function MethodsScreen() {
  const router = useRouter();

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)' as never);
  }

  const flagshipCard: MethodCard = {
    id: 'rooted-pulled',
    kicker: 'THE SIGNATURE PROCESS',
    title: 'Rooted Through 1, Pulled Through 7',
    body: '7-step Quantum Unblocking Timeline Process. Goes to the root cause, then pulls high-frequency energy through the crown to heal, align, and elevate.',
    count: '7 steps · ~25 min',
    accent: tokens.semantic.accent,
    href: '/unblocking-process',
  };

  const methodCards: MethodCard[] = [
    {
      id: 'foundations',
      kicker: 'EDUCATIONAL LAYER',
      title: 'Foundations — read the why',
      body: 'Twenty-four short briefs: 12 healing modalities + 12 lifestyle pillars for an aligned soul journey. Read in order, or read the one you are drawn to today.',
      count: '24 briefs · ~6 min each',
      accent: '#5645A6',
      href: '/foundations',
    },
    {
      id: 'energy-hygiene',
      kicker: 'DAILY PRACTICE',
      title: 'Energy Hygiene',
      body: 'A 7-step daily ritual to clean your field, protect your peace, and stay aligned. Where the Quantum Process heals the past, this clears the present — every day.',
      count: '7 steps · ~18 min',
      accent: '#5645A6',
      href: '/energy-hygiene',
    },
    {
      id: 'letters',
      kicker: 'WRITTEN PRACTICE',
      title: 'The 8 Chakra Letters',
      body: 'A 6-step structured Letter per chakra — gratitude, forgiveness, self-worth, love, truth, clarity, release, expansion. Choose a chakra, walk the Letter, install the closing.',
      count: '8 letters · 6 steps each',
      accent: '#9B5BA1',
      href: '/letter/heart',
    },
    {
      id: 'chakras',
      kicker: 'ENERGY CENTRES',
      title: 'The 8 Chakras',
      body: 'Root → Soul Star. Each centre with its bija mantra, frequency, balanced & blocked expressions, body map, and recommended breath + meditation.',
      count: '8 centres',
      accent: '#E07A2C',
      href: '/chakra/heart',
    },
    {
      id: 'body-wisdom',
      kicker: 'BODY MESSAGES',
      title: 'Body Wisdom',
      body: 'What your body is trying to say. 50 physical symptoms decoded — emotional reading, mapped chakra, affirmation, and protocol. Synthesizes Hay and Lincoln in our voice.',
      count: '50 symptoms · 14 regions',
      accent: '#B33B3B',
      href: '/body',
    },
    {
      id: 'body-inquiry',
      kicker: 'DEPTH PRACTICE',
      title: 'Body Inquiry — the 7-step practice',
      body: 'A guided 22-min protocol for hearing what one specific symptom has been carrying. Land in the body, get specific, open the conversation, trace the origin, grieve, self-parent, install. Lincoln-inspired depth work in our voice.',
      count: '7 steps · ~22 min',
      accent: '#B33B3B',
      href: '/body-inquiry',
    },
    {
      id: 'breathwork',
      kicker: 'BREATH',
      title: 'Breathwork Library',
      body: 'Breath patterns from Kapalabhati (fire) to Nadi Shodhana (alternate nostril) to 4-7-8 (sleep). Each with a "what it does" and a duration. Routed to the right one for your state.',
      count: `${breathwork.length} practices`,
      accent: '#3F8A5F',
      href: '/breathwork-library',
    },
    {
      id: 'frequencies',
      kicker: 'SOUND HEALING',
      title: 'Chakra Frequencies',
      body: 'Eight healing tones — LAM 396Hz, VAM 417, RAM 528, YAM 639, HAM 741, OM 852, AUM 963, AH 1110. Real audible tones generated in-browser.',
      count: '8 frequencies',
      accent: '#E8B83E',
      href: '/chakra/heart',
    },
    {
      id: 'plans',
      kicker: 'STRUCTURED ARCS',
      title: '21-Day Plans',
      body: 'Three weeks. One arc. Letting Go of the Past · Build Abundance · Magnetic Self. 15 minutes a day. Open → Release → Integrate. You finish.',
      count: `${PLANS.length} plans · 21 days each`,
      accent: '#5645A6',
      href: '/(tabs)/plans',
    },
    {
      id: 'meditations',
      kicker: 'GUIDED PRACTICE',
      title: 'Meditations',
      body: 'Abundance, Body Temple, Money Clearing, Deep Rest, Super Performance, Relationship Magic, Morning, Evening. Each chakra has its own recommended set.',
      count: `${meditations.length} meditations`,
      accent: '#3D9DC4',
      href: '/(tabs)/library',
    },
    {
      id: 'wheel',
      kicker: 'YOUR MAP',
      title: 'Wheel of Life',
      body: 'Score 8 life areas. The app uses your lowest score to route every daily protocol — chakra, breath, journal prompt. Retake any time.',
      count: '8 areas · 1-10 each',
      accent: '#CFB57E',
      href: '/(onboarding)/wheel-of-life',
    },
    {
      id: 'chart',
      kicker: 'ASTROLOGY',
      title: 'Birth Chart',
      body: 'Sun, Moon, Rising, all planets, tightest aspects. Computed in your browser — no subscription, no API. Just date, time, city.',
      count: 'Full natal chart',
      accent: '#5645A6',
      href: '/you/chart',
    },
    {
      id: 'blueprint',
      kicker: 'HOW YOU ARE WIRED',
      title: 'Energy Blueprint',
      body: 'Your Type, Strategy, Authority, and Profile. The operating instructions for how to make decisions you do not regret. Computed from the same birth data.',
      count: '5 types · 7 authorities',
      accent: '#9B5BA1',
      href: '/you/blueprint',
    },
    {
      id: 'gratitude',
      kicker: 'DAILY RITUAL',
      title: 'Gratitude',
      body: 'Three things, twice a day. Morning and evening. Trains the brain to look for what is working. Streak tracked, never punished.',
      count: 'Daily, AM + PM',
      accent: '#3F8A5F',
      href: '/gratitude',
    },
    {
      id: 'check-in',
      kicker: 'CHAKRA STATE',
      title: 'Daily Check-In',
      body: 'Pick the chakra calling for attention — balanced, underactive, overactive. The app reads your state and routes you to the matching practice.',
      count: '60 seconds',
      accent: '#3D9DC4',
      href: '/check-in',
    },
    {
      id: 'mirror',
      kicker: 'PERCEPTION INQUIRY',
      title: 'Mirror Mode',
      body: 'A 6-step reflection flow for the moment you notice a charged reaction in someone else. What you see in them is what is asking to be seen in you.',
      count: '6 steps · ~10 min',
      accent: '#9B5BA1',
      href: '/mirror',
    },
    {
      id: 'connecting-light',
      kicker: 'SELF-CARE PILLAR',
      title: 'Connecting to Light',
      body: 'The four foundations — sleep, hydration, nourishment, grounding — that hold every other practice up. Self-care is not luxury. It is necessity.',
      count: '4 foundations',
      accent: '#E8B83E',
      href: '/connecting-to-light',
    },
    {
      id: 'protecting-light',
      kicker: 'ENERGY HYGIENE PILLAR',
      title: 'Protecting Your Light',
      body: 'Clear what is not yours. Untether from cords. Set the field. Daily protocols for the empath who comes home heavier than they left.',
      count: '5 protocols',
      accent: '#5645A6',
      href: '/protecting-your-light',
    },
    {
      id: 'learn',
      kicker: 'EDUCATION',
      title: 'Learn',
      body: 'Plain-language explainers across basics, chakras, breathwork, meditation, burnout, journaling, and manifestation. Start here if anything in the app feels unfamiliar.',
      count: '7 categories',
      accent: '#A09784',
      href: '/learn',
    },
    {
      id: 'cosmic',
      kicker: 'COSMIC AWARENESS',
      title: 'Lunar & Retrograde Notes',
      body: 'New moon. Full moon. Mercury and Venus retrogrades. Surfaced on the Home tab the day they matter — with one sharp practical note.',
      count: 'Daily auto-feed',
      accent: '#A09784',
      href: '/(tabs)',
    },
  ];

  return (
    <InsideBackground>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Back */}
        <Pressable
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={10}
          style={styles.back}
        >
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>HEALING METHODS</Text>
          <Text style={styles.h1}>Everything{'\n'}this app does.</Text>
          <Text style={styles.lead}>
            Every healing modality under one roof. Choose the one your body
            is asking for today.
          </Text>
        </View>

        {/* Flagship — the proprietary 7-step process */}
        <Pressable
          onPress={() => router.push(flagshipCard.href as never)}
          accessibilityRole="button"
          accessibilityLabel={flagshipCard.title}
          style={({ pressed }) => [
            styles.flagshipCard,
            pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] },
          ]}
        >
          <Text style={styles.flagshipKicker}>{flagshipCard.kicker}</Text>
          <Text style={styles.flagshipTitle}>
            Rooted Through <Text style={{ color: '#B33B3B' }}>1</Text>,{' '}
            Pulled Through <Text style={{ color: '#9B5BA1' }}>7</Text>
          </Text>
          <Text style={styles.flagshipBody}>{flagshipCard.body}</Text>
          <Text style={styles.flagshipMeta}>{flagshipCard.count} →</Text>
        </Pressable>

        {/* Letters block — special call-out */}
        <Pressable
          onPress={() => router.push('/letter/heart' as never)}
          accessibilityRole="button"
          accessibilityLabel="Browse the 8 chakra Letters"
          style={({ pressed }) => [
            styles.lettersBlock,
            pressed && { opacity: 0.92 },
          ]}
        >
          <Text style={styles.lettersKicker}>THE 8 CHAKRA LETTERS</Text>
          <Text style={styles.lettersHeadline}>One letter per chakra.</Text>
          <Text style={styles.lettersSub}>
            Six steps. Four journal prompts. One closing line to install. The
            most structured written-practice tool in the app.
          </Text>
          <View style={styles.lettersChips}>
            {CHAKRA_SPINE_ORDERED.map((c) => (
              <Pressable
                key={c.id}
                onPress={() => router.push({ pathname: '/letter/[chakraId]', params: { chakraId: c.id } } as never)}
                accessibilityRole="button"
                accessibilityLabel={`Open ${c.name} Letter`}
                style={[
                  styles.letterChip,
                  { backgroundColor: `${c.color}22`, borderColor: c.color },
                ]}
              >
                <Text style={[styles.letterChipText, { color: tokens.semantic.textPrimary }]}>
                  {c.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>

        {/* Section label */}
        <Text style={styles.sectionLabel}>EVERY OTHER MODALITY</Text>

        {/* Cards */}
        <View style={styles.cardsCol}>
          {methodCards.filter((c) => c.id !== 'letters').map((card) => (
            <Pressable
              key={card.id}
              onPress={() => router.push(card.href as never)}
              accessibilityRole="button"
              accessibilityLabel={card.title}
              style={({ pressed }) => [
                styles.card,
                { borderLeftColor: card.accent },
                pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] },
              ]}
            >
              <Text style={[styles.cardKicker, { color: card.accent }]}>
                {card.kicker}
              </Text>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardBody}>{card.body}</Text>
              {card.count ? (
                <Text style={styles.cardCount}>{card.count} →</Text>
              ) : null}
            </Pressable>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>One body. One mind. Many ways back to yourself.</Text>
      </ScrollView>
    </InsideBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 60,
  },
  back: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  backText: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    color: tokens.semantic.textSecondary,
  },
  header: {
    alignItems: 'center',
    marginBottom: 22,
  },
  eyebrow: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 3,
    color: tokens.semantic.accent,
    marginBottom: 12,
  },
  h1: {
    fontFamily: tokens.fonts.display,
    fontSize: 30,
    lineHeight: 38,
    color: tokens.semantic.textPrimary,
    textAlign: 'center',
  },
  lead: {
    marginTop: 14,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
    maxWidth: 380,
  },

  // Flagship card — strongest visual
  flagshipCard: {
    backgroundColor: 'rgba(45, 41, 53, 0.94)',
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6,
  },
  flagshipKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2.4,
    color: '#F5E8DC',
    marginBottom: 14,
  },
  flagshipTitle: {
    fontFamily: tokens.fonts.displayBold,
    fontSize: 24,
    color: '#FFFFFF',
    lineHeight: 32,
    letterSpacing: 0.5,
  },
  flagshipBody: {
    fontFamily: tokens.fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: '#F5E8DC',
    marginTop: 12,
    opacity: 0.95,
  },
  flagshipMeta: {
    marginTop: 16,
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1.5,
    color: tokens.semantic.accent,
  },

  // Letters call-out
  lettersBlock: {
    backgroundColor: 'rgba(255, 250, 245, 0.94)',
    borderRadius: 22,
    padding: 22,
    marginBottom: 28,
  },
  lettersKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2.4,
    color: tokens.semantic.accent,
    marginBottom: 12,
  },
  lettersHeadline: {
    fontFamily: tokens.fonts.display,
    fontSize: 26,
    lineHeight: 32,
    color: tokens.semantic.textPrimary,
  },
  lettersSub: {
    marginTop: 8,
    fontFamily: tokens.fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: tokens.semantic.textSecondary,
  },
  lettersChips: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  letterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  letterChipText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 0.3,
  },

  sectionLabel: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2.2,
    color: tokens.semantic.textTertiary,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  cardsCol: {
    gap: 12,
    marginBottom: 28,
  },
  card: {
    backgroundColor: 'rgba(255, 250, 245, 0.88)',
    borderRadius: 16,
    borderLeftWidth: 5,
    padding: 18,
  },
  cardKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: tokens.fonts.display,
    fontSize: 22,
    color: tokens.semantic.textPrimary,
    lineHeight: 28,
  },
  cardBody: {
    fontFamily: tokens.fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: tokens.semantic.textSecondary,
    marginTop: 6,
  },
  cardCount: {
    marginTop: 10,
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.5,
    color: tokens.semantic.textTertiary,
  },

  footer: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 15,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
    marginTop: 6,
  },
});
