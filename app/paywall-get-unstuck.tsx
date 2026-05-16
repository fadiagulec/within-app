/**
 * SOMA — Get Unstuck Paywall
 *
 * The flagship conversion screen.
 * Shown after Wheel of Life + (optional) Burnout Assessment complete.
 * $47 one-time. Target conversion 5-8% from free users within 30 days.
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { GET_UNSTUCK_PROGRAM } from '@/data/get-unstuck-program';
import { purchaseProduct } from '@/features/payments/revenueCat';
import { usePurchaseStore } from '@/features/payments/PurchaseStore';
import { useUserStore } from '@/store/useUserStore';

const PHASES = [
  { days: 'Days 1-3', label: 'STABILISE', body: 'Regulate the nervous system. Get safe in the body.' },
  { days: 'Days 4-7', label: 'RELEASE', body: 'Move the emotion that has been stuck.' },
  { days: 'Days 8-11', label: 'CLARITY', body: 'See what is yours. See what is next.' },
  { days: 'Days 12-14', label: 'REBUILD', body: 'Embody the new self through daily practice.' },
];

const PROMISES = [
  'Feel calmer — not overwhelmed',
  'Reduce emotional noise',
  'Regain clarity on what you want',
  'Feel back in control',
];

const WHAT_YOU_GET = [
  '14 guided daily sessions (10-20 min each)',
  'Breathwork + journaling + embodied practice',
  'Full access to core breath library',
  'Progress tracking + integration prompts',
  'Lifetime access — revisit anytime',
];

export default function GetUnstuckPaywall() {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const unlockLocally = usePurchaseStore((s) => s.purchaseLevel);
  const userId = useUserStore((s) => s.user?.id ?? 'anonymous');

  const handlePurchase = async () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setProcessing(true);

    try {
      const result = await purchaseProduct('soma_get_unstuck_47');

      if (result.ok) {
        // Also persist locally for stub mode + offline state
        unlockLocally(1);
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.replace('/(tabs)/journey');
      } else if (result.cancelled) {
        // silent — user chose to cancel
      } else {
        Alert.alert('Purchase failed', result.error ?? 'Please try again.');
      }
    } catch (err: any) {
      Alert.alert('Purchase failed', err?.message ?? 'Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleNotNow = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/(tabs)');
  };

  return (
    <Screen backgroundColor={tokens.semantic?.bgBase ?? '#0B0B0D'}>
      <StatusBar style="light" animated />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Close */}
        <Pressable
          onPress={handleNotNow}
          style={styles.closeBtn}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Text
            variant="heading3"
            style={{ color: tokens.semantic.textSecondary }}
          >
            ✕
          </Text>
        </Pressable>

        {/* Hero */}
        <LinearGradient
          colors={[`${tokens.semantic?.accent ?? '#C9A96E'}25`, 'transparent']}
          style={styles.hero}
        >
          <Text variant="eyebrow" style={{ color: tokens.semantic?.accent ?? '#C9A96E' }}>
            THE SHIFT METHOD · FLAGSHIP PROGRAM
          </Text>
          <Text
            variant="heading1"
            style={[styles.heroTitle, { color: tokens.semantic?.textPrimary ?? '#F3EFE7' }]}
          >
            Get Unstuck.
          </Text>
          <Text
            variant="displayItalic"
            style={[styles.heroSubtitle, { color: tokens.semantic?.textSecondary ?? '#6B6B6F' }]}
          >
            A 14-day SOMA reset.
          </Text>
          <Text
            variant="body"
            style={[styles.heroBody, { color: tokens.semantic?.textPrimary ?? '#F3EFE7' }]}
          >
            Fourteen days. Ten to twenty minutes per day. You arrive overwhelmed, scattered, foggy.
            You leave calm, clear, and in control.
          </Text>
        </LinearGradient>

        {/* The 4 phases */}
        <View style={styles.section}>
          <Text variant="eyebrow" style={styles.sectionLabel}>
            THE ARC
          </Text>
          <View style={styles.phaseList}>
            {PHASES.map((p, i) => (
              <View key={i} style={styles.phaseRow}>
                <View style={styles.phaseDot} />
                <View style={{ flex: 1 }}>
                  <Text variant="label" style={{ color: tokens.semantic?.accent ?? '#C9A96E' }}>
                    {p.days.toUpperCase()} · {p.label}
                  </Text>
                  <Text
                    variant="body"
                    style={{ marginTop: 4, color: tokens.semantic?.textPrimary ?? '#F3EFE7' }}
                  >
                    {p.body}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Promises */}
        <View style={styles.section}>
          <Text variant="eyebrow" style={styles.sectionLabel}>
            BY DAY 14 YOU WILL
          </Text>
          {PROMISES.map((p, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={{ color: tokens.semantic?.accent ?? '#C9A96E' }}>•</Text>
              <Text
                variant="body"
                style={{ flex: 1, marginLeft: 12, color: tokens.semantic?.textPrimary ?? '#F3EFE7' }}
              >
                {p}
              </Text>
            </View>
          ))}
        </View>

        {/* What you get */}
        <View style={styles.section}>
          <Text variant="eyebrow" style={styles.sectionLabel}>
            WHAT YOU GET
          </Text>
          {WHAT_YOU_GET.map((p, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={{ color: tokens.semantic?.textSecondary ?? '#6B6B6F' }}>—</Text>
              <Text
                variant="body"
                style={{
                  flex: 1,
                  marginLeft: 12,
                  color: tokens.semantic?.textSecondary ?? '#6B6B6F',
                }}
              >
                {p}
              </Text>
            </View>
          ))}
        </View>

        {/* Quote block */}
        <View style={styles.quoteBlock}>
          <Text
            variant="displayItalic"
            style={{
              textAlign: 'center',
              lineHeight: 32,
              color: tokens.semantic?.textPrimary ?? '#F3EFE7',
            }}
          >
            You are not lazy. You are dysregulated.
          </Text>
        </View>

        {/* Price + CTA */}
        <View style={styles.ctaBlock}>
          <View style={styles.priceRow}>
            <Text
              variant="heading1"
              style={{ color: tokens.semantic?.accent ?? '#C9A96E' }}
            >
              ${GET_UNSTUCK_PROGRAM.priceUSD}
            </Text>
            <Text
              variant="label"
              style={{
                marginLeft: 8,
                color: tokens.semantic?.textSecondary ?? '#6B6B6F',
              }}
            >
              one-time · lifetime access
            </Text>
          </View>

          <Button
            block
            size="lg"
            onPress={handlePurchase}
            disabled={processing}
          >
            {processing ? 'Processing…' : 'Begin the Reset'}
          </Button>

          <Pressable onPress={handleNotNow} style={styles.notNow} disabled={processing}>
            <Text
              variant="bodySmall"
              style={{ color: tokens.semantic?.textSecondary ?? '#6B6B6F' }}
            >
              Not now
            </Text>
          </Pressable>

          <Text variant="bodySmall" style={styles.terms}>
            Purchased through {__DEV__ ? 'dev mode' : 'the App Store / Play Store'}. Refund policy available on request.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 60,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 11, 13, 0.45)',
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    zIndex: 10,
  },
  hero: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  heroTitle: {
    marginTop: 12,
  },
  heroSubtitle: {
    marginTop: 8,
  },
  heroBody: {
    marginTop: 20,
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 28,
  },
  sectionLabel: {
    color: '#C9A96E',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  phaseList: {
    gap: 16,
  },
  phaseRow: {
    flexDirection: 'row',
    gap: 14,
  },
  phaseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C9A96E',
    marginTop: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  quoteBlock: {
    marginTop: 40,
    marginHorizontal: 24,
    padding: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2A2A2E',
  },
  ctaBlock: {
    marginTop: 40,
    paddingHorizontal: 24,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 20,
  },
  notNow: {
    alignSelf: 'center',
    padding: 16,
    marginTop: 8,
  },
  terms: {
    marginTop: 12,
    textAlign: 'center',
    color: '#6B6B6F',
    fontSize: 11,
    lineHeight: 16,
  },
});
