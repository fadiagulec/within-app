/**
 * SOMA — Subscription Paywall
 *
 * Recurring revenue layer. Two plans:
 *   Inner Circle      $19/mo — full daily-practice library
 *   Full Library Pass $29/mo — everything, all programs included
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
import { purchaseProduct, type ProductId } from '@/features/payments/revenueCat';

type PlanId = 'inner-circle' | 'full-library';

interface Plan {
  id: PlanId;
  productId: ProductId;
  name: string;
  tagline: string;
  monthlyUSD: number;
  features: string[];
  recommended?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'inner-circle',
    productId: 'soma_inner_circle_monthly',
    name: 'Inner Circle',
    tagline: 'The daily practice baseline.',
    monthlyUSD: 19,
    features: [
      'Unlimited breathwork library (15 practices)',
      'All themed meditations',
      'Mirror Mode + Gratitude Journal',
      'Daily check-ins + streak tracking',
      'New content monthly',
    ],
  },
  {
    id: 'full-library',
    productId: 'soma_full_library_monthly',
    name: 'Full Library',
    tagline: 'Everything. All programs. All future releases.',
    monthlyUSD: 29,
    recommended: true,
    features: [
      'Everything in Inner Circle',
      'All chakra deep-dive programs',
      'Get Unstuck + Burnout Recovery',
      '90-Day Elevation program',
      'Early access to new programs',
      'Priority for retreat applications',
    ],
  },
];

export default function SubscribeScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<PlanId>('full-library');
  const [processing, setProcessing] = useState(false);

  const plan = PLANS.find((p) => p.id === selected) ?? PLANS[1]!;

  const select = (id: PlanId) => {
    void Haptics.selectionAsync();
    setSelected(id);
  };

  const handleSubscribe = async () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setProcessing(true);
    try {
      const result = await purchaseProduct(plan.productId);
      if (result.ok) {
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.replace('/(tabs)');
      } else if (!result.cancelled) {
        Alert.alert('Subscription failed', result.error ?? 'Please try again.');
      }
    } catch (err: any) {
      Alert.alert('Subscription failed', err?.message ?? 'Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const dismiss = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <Screen backgroundColor={tokens.semantic.bgBase}>
      <StatusBar style="light" animated />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={dismiss}
          style={styles.closeBtn}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Text variant="heading3" color={tokens.semantic.textSecondary}>
            ✕
          </Text>
        </Pressable>

        <LinearGradient
          colors={[`${tokens.semantic.accent}25`, 'transparent']}
          style={styles.hero}
        >
          <Text variant="eyebrow" color={tokens.semantic.accent}>
            SUBSCRIPTION · DAILY PRACTICE
          </Text>
          <Text variant="heading1" style={styles.heroTitle}>
            Keep the practice alive.
          </Text>
          <Text variant="displayItalic" color={tokens.semantic.textSecondary} style={styles.heroBody}>
            One session a day. A new baseline in two weeks.
          </Text>
        </LinearGradient>

        {/* Plan cards */}
        <View style={styles.plans}>
          {PLANS.map((p) => {
            const active = selected === p.id;
            return (
              <Pressable
                key={p.id}
                onPress={() => select(p.id)}
                style={[
                  styles.planCard,
                  active && {
                    borderColor: tokens.semantic.accent,
                    backgroundColor: tokens.semantic.bgElevated,
                  },
                ]}
              >
                {p.recommended && (
                  <View style={styles.recommendedBadge}>
                    <Text variant="label" color={tokens.semantic.bgBase}>
                      RECOMMENDED
                    </Text>
                  </View>
                )}
                <View style={styles.planHeader}>
                  <View style={{ flex: 1 }}>
                    <Text variant="heading2">{p.name}</Text>
                    <Text variant="body" color={tokens.semantic.textSecondary}>
                      {p.tagline}
                    </Text>
                  </View>
                  <View style={styles.priceBlock}>
                    <Text variant="heading1" color={tokens.semantic.accent}>
                      ${p.monthlyUSD}
                    </Text>
                    <Text variant="label" color={tokens.semantic.textSecondary}>
                      / month
                    </Text>
                  </View>
                </View>

                <View style={styles.features}>
                  {p.features.map((f, i) => (
                    <View key={i} style={styles.featureRow}>
                      <Text style={{ color: tokens.semantic.accent }}>✓</Text>
                      <Text variant="bodySmall" style={{ flex: 1, marginLeft: 10 }}>
                        {f}
                      </Text>
                    </View>
                  ))}
                </View>

                <View
                  style={[
                    styles.radio,
                    active && {
                      backgroundColor: tokens.semantic.accent,
                      borderColor: tokens.semantic.accent,
                    },
                  ]}
                />
              </Pressable>
            );
          })}
        </View>

        {/* CTA */}
        <View style={styles.cta}>
          <Button block size="lg" onPress={handleSubscribe} disabled={processing}>
            {processing ? 'Processing…' : `Start ${plan.name} — $${plan.monthlyUSD}/mo`}
          </Button>
          <Pressable onPress={dismiss} style={{ alignSelf: 'center', padding: 16 }}>
            <Text variant="bodySmall" color={tokens.semantic.textSecondary}>
              Not now
            </Text>
          </Pressable>
          <Text variant="bodySmall" style={styles.terms}>
            Cancel anytime. Recurring billing through your app store account.
            Subscription auto-renews unless cancelled at least 24 hours before period end.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 60 },
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
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  heroTitle: { marginTop: 12 },
  heroBody: { marginTop: 12, lineHeight: 28 },
  plans: {
    paddingHorizontal: 24,
    marginTop: 8,
    gap: 16,
  },
  planCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(243, 239, 231, 0.14)',
    position: 'relative',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: '#C9A96E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  priceBlock: {
    alignItems: 'flex-end',
  },
  features: {
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(243, 239, 231, 0.08)',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  radio: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'rgba(243, 239, 231, 0.24)',
  },
  cta: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  terms: {
    marginTop: 12,
    color: '#6B6B6F',
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 16,
  },
});
