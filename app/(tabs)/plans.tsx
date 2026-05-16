/**
 * Plans tab — list of all 21-day plans + active plan progress.
 *
 * Aesthetic upgrade: each plan is a full-image cover card on the sunset sky
 * background. Headline serif typography. Generous spacing.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { InsideBackground } from '@/components/InsideBackground';
import { HeroImage } from '@/components/HeroImage';
import { PLANS } from '@/data/plans';
import { usePlanStore } from '@/store/usePlanStore';
import { PLAN_IMAGERY } from '@/data/imagery';

export default function PlansTab() {
  const router = useRouter();
  const isEnrolled = usePlanStore((s) => s.isEnrolled);
  const getCurrentDay = usePlanStore((s) => s.getCurrentDay);

  return (
    <InsideBackground>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>21-DAY PLANS</Text>
          <Text style={styles.h1}>Three weeks.{'\n'}One arc.</Text>
          <Text style={styles.lead}>
            A structured path with one practice a day. 15–20 minutes. You finish — you
            do not just "do it forever."
          </Text>
        </View>

        <View style={styles.list}>
          {PLANS.map((plan) => {
            const enrolled = isEnrolled(plan.id);
            const currentDay = enrolled ? getCurrentDay(plan.id) : 0;
            const coverUri = PLAN_IMAGERY[plan.id];
            return (
              <Pressable
                key={plan.id}
                onPress={() => router.push({ pathname: '/plan/[id]', params: { id: plan.id } } as never)}
                accessibilityRole="button"
                accessibilityLabel={`${plan.title}, ${plan.durationDays} days. ${plan.tagline}`}
                style={({ pressed }) => [
                  styles.cardWrap,
                  pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] },
                ]}
              >
                <HeroImage
                  uri={coverUri ?? ''}
                  tint={plan.coverColor}
                  overlayStrength={0.60}
                  style={styles.card}
                >
                  <View style={styles.cardInner}>
                    <View style={styles.cardTopRow}>
                      <View style={[styles.dayBadge, { backgroundColor: 'rgba(255,255,255,0.18)', borderColor: 'rgba(255,255,255,0.4)' }]}>
                        <Text style={styles.dayBadgeText}>{plan.durationDays} DAYS</Text>
                      </View>
                      {enrolled ? (
                        <Text style={styles.progressText}>
                          DAY {Math.min(currentDay, plan.durationDays)} OF {plan.durationDays}
                        </Text>
                      ) : null}
                    </View>

                    <View style={{ flex: 1 }} />

                    <Text style={styles.cardTitle}>{plan.title}</Text>
                    <Text style={styles.cardTagline}>{plan.tagline}</Text>
                  </View>
                </HeroImage>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </InsideBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 26,
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
    fontSize: 36,
    lineHeight: 44,
    color: tokens.semantic.textPrimary,
    textAlign: 'center',
  },
  lead: {
    marginTop: 14,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
    maxWidth: 380,
  },
  list: {
    gap: 18,
  },
  cardWrap: {
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  card: {
    height: 240,
    borderRadius: 22,
    overflow: 'hidden',
  },
  cardInner: {
    flex: 1,
    padding: 22,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  dayBadgeText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.5,
    color: '#FFFFFF',
  },
  progressText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.5,
    color: '#F5E8DC',
  },
  cardTitle: {
    fontFamily: tokens.fonts.display,
    fontSize: 30,
    color: '#FFFFFF',
    lineHeight: 36,
    letterSpacing: 0.5,
  },
  cardTagline: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 16,
    color: '#F5E8DC',
    marginTop: 6,
    opacity: 0.95,
  },
});
