import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';

/**
 * 1:1 Coaching page — the premium tier above the app content.
 * Two modalities offered:
 *   - Breathwork Coaching (nervous-system-level work)
 *   - Theta Healing (subconscious belief rewiring)
 */

export default function Coaching() {
  const router = useRouter();

  const bookDiscovery = () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Placeholder URL — update to real Calendly / booking link
    void Linking.openURL('mailto:hello@soma.app?subject=Discovery Call Request');
  };

  return (
    <Screen backgroundColor={tokens.semantic.bgBase}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>← Back</Text>
        </Pressable>

        <LinearGradient
          colors={[`${tokens.semantic.accent}30`, 'transparent']}
          style={styles.hero}
        >
          <Text variant="eyebrow" style={{ color: tokens.semantic.accent }}>
            Work With Me · 1:1
          </Text>
          <Text variant="heading1" style={styles.heroTitle}>
            When the app is not enough,{'\n'}and you need someone to hold space.
          </Text>
          <Text variant="body" style={styles.heroBody}>
            Some healing happens in solitude. Some needs a skilled witness. If you've been doing the self-led work and feel ready to go deeper, I offer two modalities of private coaching.
          </Text>
        </LinearGradient>

        {/* MODALITY 1: BREATHWORK */}
        <View style={styles.offerCard}>
          <Text variant="eyebrow" style={{ color: tokens.semantic.accent }}>
            Modality 1
          </Text>
          <Text variant="heading2" style={styles.offerTitle}>
            Private Breathwork Coaching
          </Text>
          <Text variant="body" style={styles.offerLead}>
            Six 60-minute live sessions. Breath-led nervous-system work, tailored to what your body is holding.
          </Text>

          <View style={styles.section}>
            <Text variant="label" style={styles.sectionLabel}>IS THIS FOR YOU?</Text>
            <BulletLine text="You've used the app and want to go deeper than self-led practice allows" />
            <BulletLine text="Stored emotion needs witnessing — not a meditation button" />
            <BulletLine text="You're ready for conscious-connected breathwork (sometimes called rebirthing)" />
            <BulletLine text="Chronic anxiety, burnout, or grief that isn't shifting on its own" />
          </View>

          <View style={styles.section}>
            <Text variant="label" style={styles.sectionLabel}>WHAT YOU GET</Text>
            <BulletLine text="6 × 60-min live sessions (Zoom)" />
            <BulletLine text="Custom breath protocols for your body and story" />
            <BulletLine text="Between-session support by message" />
            <BulletLine text="Recordings of your sessions to revisit" />
            <BulletLine text="One integration session 2 weeks after the final call" />
          </View>

          <View style={styles.priceRow}>
            <Text variant="displayItalic" style={{ color: tokens.semantic.accent }}>
              $997
            </Text>
            <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>
              payment plans available
            </Text>
          </View>

          <Button variant="primary" onPress={bookDiscovery} >Book a Discovery Call</Button>
        </View>

        {/* MODALITY 2: THETA HEALING */}
        <View style={[styles.offerCard, { marginTop: tokens.spacing.s8 }]}>
          <Text variant="eyebrow" style={{ color: tokens.semantic.accent }}>
            Modality 2
          </Text>
          <Text variant="heading2" style={styles.offerTitle}>
            Theta Healing Sessions
          </Text>
          <Text variant="body" style={styles.offerLead}>
            Six 75-minute sessions of subconscious belief rewiring. For what self-work alone cannot reach.
          </Text>

          <View style={styles.section}>
            <Text variant="label" style={styles.sectionLabel}>WHAT IS THETA HEALING?</Text>
            <Text variant="body" style={styles.paragraph}>
              Theta Healing is a modality that works in the theta brainwave state (the state just before sleep, and during deep meditation). In this state, the subconscious mind becomes accessible.
            </Text>
            <Text variant="body" style={styles.paragraph}>
              Together, we identify the beliefs that have been running your life without you knowing — often inherited from family, culture, or early experiences — and gently clear them. New, supportive beliefs are installed in their place.
            </Text>
            <Text variant="body" style={styles.paragraph}>
              Clients often describe the shift as "suddenly easier" — patterns that felt unsolvable begin to dissolve.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="label" style={styles.sectionLabel}>IS THIS FOR YOU?</Text>
            <BulletLine text="Patterns that keep repeating no matter how much you work on them" />
            <BulletLine text="Inherited money, love, or self-worth wounds" />
            <BulletLine text="Limiting beliefs you intellectually know are false but can't shake" />
            <BulletLine text="You feel ready to work at the subconscious level" />
          </View>

          <View style={styles.section}>
            <Text variant="label" style={styles.sectionLabel}>WHAT YOU GET</Text>
            <BulletLine text="6 × 75-min live Theta Healing sessions (Zoom)" />
            <BulletLine text="Identification and clearing of inherited beliefs" />
            <BulletLine text="Installation of new, supportive core beliefs" />
            <BulletLine text="Integration practices between sessions" />
            <BulletLine text="Session recordings + notes" />
          </View>

          <View style={styles.priceRow}>
            <Text variant="displayItalic" style={{ color: tokens.semantic.accent }}>
              $1,497
            </Text>
            <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>
              payment plans available
            </Text>
          </View>

          <Button variant="primary" onPress={bookDiscovery} >Book a Discovery Call</Button>
        </View>

        {/* DISCOVERY CALL EXPLAINER */}
        <View style={styles.discoveryCard}>
          <Text variant="heading3" style={{ textAlign: 'center' }}>
            Not sure which is right for you?
          </Text>
          <Text variant="body" style={{ textAlign: 'center', color: tokens.semantic.textSecondary, marginTop: tokens.spacing.s2 }}>
            A discovery call is a free 20-min conversation to understand what you're carrying and which modality will serve you best. No pressure. We only work together if it's the right fit.
          </Text>
          <View style={{ marginTop: tokens.spacing.s3 }}>
            <Button variant="primary" onPress={bookDiscovery} >Book Free Discovery Call</Button>
          </View>
        </View>

        {/* SMALL DISCLAIMER */}
        <Text variant="label" style={styles.disclaimer}>
          1:1 coaching is not a substitute for medical or psychiatric care. If you are in crisis, please reach out to a qualified mental-health professional or emergency service.
        </Text>
      </ScrollView>
    </Screen>
  );
}

function BulletLine({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bulletDot} />
      <Text variant="body" style={{ flex: 1 }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: tokens.spacing.s12,
  },
  backBtn: {
    padding: tokens.spacing.s3,
  },
  hero: {
    padding: tokens.spacing.s5,
    paddingBottom: tokens.spacing.s8,
  },
  heroTitle: {
    marginTop: tokens.spacing.s2,
  },
  heroBody: {
    marginTop: tokens.spacing.s3,
    color: tokens.semantic.textSecondary,
  },
  offerCard: {
    margin: tokens.spacing.s5,
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
  },
  offerTitle: {
    marginTop: tokens.spacing.s1,
  },
  offerLead: {
    marginTop: tokens.spacing.s2,
    fontStyle: 'italic',
    color: tokens.semantic.textSecondary,
  },
  section: {
    marginTop: tokens.spacing.s5,
  },
  sectionLabel: {
    color: tokens.semantic.accent,
    marginBottom: tokens.spacing.s2,
    letterSpacing: 1.5,
  },
  paragraph: {
    marginBottom: tokens.spacing.s2,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 5,
    gap: tokens.spacing.s2,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginTop: 8,
    backgroundColor: tokens.semantic.accent,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: tokens.spacing.s5,
    marginBottom: tokens.spacing.s3,
  },
  discoveryCard: {
    margin: tokens.spacing.s5,
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgBase,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    borderColor: tokens.semantic.accent,
  },
  disclaimer: {
    paddingHorizontal: tokens.spacing.s5,
    marginTop: tokens.spacing.s5,
    color: tokens.semantic.textSecondary,
    fontStyle: 'italic',
    lineHeight: 18,
  },
});
