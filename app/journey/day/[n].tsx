/**
 * Individual journey day detail.
 *
 * "Preview Day 1 Free" mode:
 *   - If the user has NOT purchased Get Unstuck and n === 1, the day is
 *     shown fully (prompts, both sessions, integration), the morning
 *     breathwork plays free, but the evening chakra session is gated
 *     (tap → paywall) and a sticky upgrade CTA replaces "complete day".
 *   - If they own it, OR n > 1 without purchase, behavior is unchanged.
 */
import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens, chakraColors } from '@/theme/tokens';
import { getDay, referenceToSessionId } from '@/data/journey';
import { useProgressStore } from '@/store/useProgressStore';
import { usePurchaseStore } from '@/features/payments/PurchaseStore';
import { GET_UNSTUCK_PROGRAM } from '@/data/get-unstuck-program';

export default function JourneyDayDetail() {
  const router = useRouter();
  const { n } = useLocalSearchParams<{ n: string }>();
  const dayNum = Number(n);
  const day = getDay(dayNum);

  const completedSessions = useProgressStore((s) => s.progress.completedSessionIds);
  const journeyDaysCompleted = useProgressStore((s) => s.progress.journeyDaysCompleted);
  const completeDayN = useProgressStore((s) => s.completeDayN);
  const hasGetUnstuck = usePurchaseStore((s) => s.hasGetUnstuck());

  if (!day) {
    return (
      <Screen>
        <Text variant="heading2">Day not found.</Text>
        <Button variant="ghost" onPress={() => router.back()}>
          Back
        </Button>
      </Screen>
    );
  }

  const accent = chakraColors[day.chakra];
  const morningId = referenceToSessionId(day.morningPractice);
  const eveningId = referenceToSessionId(day.eveningSession);
  const morningDone = completedSessions.includes(morningId);
  const eveningDone = completedSessions.includes(eveningId);
  const dayDone = journeyDaysCompleted.includes(dayNum);

  // Preview mode: free Day 1 with the evening session gated.
  const isFreePreview = !hasGetUnstuck && dayNum === 1;
  const eveningLocked = isFreePreview;
  const canComplete = !isFreePreview && morningDone && eveningDone && !dayDone;

  function openSession(sid: string) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    router.push({
      pathname: '/session/[id]',
      params: { id: sid, journeyDay: String(dayNum) },
    });
  }

  function openPaywall() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    router.push('/paywall-get-unstuck');
  }

  function markDayComplete() {
    if (!canComplete) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );
    completeDayN(dayNum);
  }

  return (
    <Screen padded={false}>
      <LinearGradient
        colors={[`${accent}44`, 'transparent']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Journey
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          DAY {day.day} / 21
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: 200 }}
      >
        {/* Free preview banner — only when previewing Day 1 */}
        {isFreePreview ? (
          <View
            style={[
              styles.previewBanner,
              { borderColor: `${tokens.semantic.accent}55` },
            ]}
          >
            <Text variant="eyebrow" color={tokens.semantic.accent}>
              FREE PREVIEW · DAY 1
            </Text>
            <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 6, lineHeight: 18 }}>
              The morning breath is on us. To go deeper — the evening session, the rest of the 14 days — unlock the full reset.
            </Text>
          </View>
        ) : null}

        <Text variant="eyebrow" color={accent}>
          WEEK {day.week} · {day.weekTheme} · {day.chakra.toUpperCase()}
        </Text>
        <Text variant="heading1" style={{ marginTop: 10 }}>
          {day.dayTitle}
        </Text>
        <Text
          variant="displayItalic"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 14 }}
        >
          {day.hook}
        </Text>

        <View style={styles.sectionSep} />

        <Text variant="eyebrow">MANTRA</Text>
        <Text variant="heading2" style={{ marginTop: 4 }} color={accent}>
          {day.mantra}
        </Text>

        <View style={styles.sectionSep} />

        <Text variant="eyebrow">MORNING PRACTICE · {day.morningPractice.duration} MIN</Text>
        <Pressable onPress={() => openSession(morningId)} style={styles.sessionRow}>
          <View
            style={[
              styles.sessionCheck,
              morningDone && { backgroundColor: accent, borderColor: accent },
            ]}
          >
            {morningDone ? (
              <Text variant="body" color={tokens.semantic.textOnGold}>
                ✓
              </Text>
            ) : (
              <Text variant="body" color={accent}>
                ▶
              </Text>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="bodyLarge">{day.morningPractice.title}</Text>
            <Text variant="bodySmall" color={tokens.semantic.textTertiary}>
              {day.morningPractice.type.toUpperCase()} · {day.morningPractice.duration} min
              {isFreePreview ? ' · FREE' : ''}
            </Text>
          </View>
          <Text variant="mono" color={tokens.semantic.textTertiary}>
            {morningDone ? 'DONE' : 'PLAY'}
          </Text>
        </Pressable>

        <View style={styles.sectionSep} />

        <Text variant="eyebrow">EVENING SESSION · {day.eveningSession.duration} MIN</Text>
        <Pressable
          onPress={() => (eveningLocked ? openPaywall() : openSession(eveningId))}
          style={[
            styles.sessionRow,
            eveningLocked && { borderColor: `${tokens.semantic.accent}66` },
          ]}
        >
          <View
            style={[
              styles.sessionCheck,
              eveningDone && { backgroundColor: accent, borderColor: accent },
              eveningLocked && {
                backgroundColor: tokens.semantic.bgRaised,
                borderColor: tokens.semantic.accent,
              },
            ]}
          >
            {eveningLocked ? (
              <Text variant="body" color={tokens.semantic.accent}>
                ◔
              </Text>
            ) : eveningDone ? (
              <Text variant="body" color={tokens.semantic.textOnGold}>
                ✓
              </Text>
            ) : (
              <Text variant="body" color={accent}>
                ▶
              </Text>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="bodyLarge">{day.eveningSession.title}</Text>
            <Text variant="bodySmall" color={tokens.semantic.textTertiary}>
              {day.eveningSession.type.toUpperCase()} · {day.eveningSession.duration} min
              {eveningLocked ? ' · LOCKED' : ''}
            </Text>
          </View>
          <Text variant="mono" color={eveningLocked ? tokens.semantic.accent : tokens.semantic.textTertiary}>
            {eveningLocked ? 'UNLOCK' : eveningDone ? 'DONE' : 'PLAY'}
          </Text>
        </Pressable>

        <View style={styles.sectionSep} />

        <Text variant="eyebrow">JOURNALING</Text>
        <Text variant="displayItalic" style={{ marginTop: 6, fontSize: 18 }}>
          {day.journalingPrompt}
        </Text>
        <Pressable
          onPress={() => router.push('/journal/write')}
          style={styles.linkRow}
        >
          <Text variant="body" color={tokens.semantic.accent}>
            Open journal →
          </Text>
        </Pressable>

        <View style={styles.sectionSep} />

        <Text variant="eyebrow">INTEGRATION · TODAY</Text>
        <Text variant="body" style={{ marginTop: 8, lineHeight: 22 }}>
          {day.integrationAction}
        </Text>

        <View style={styles.sectionSep} />

        <Text variant="eyebrow">REFLECTION</Text>
        <Text variant="displayItalic" style={{ marginTop: 6, fontSize: 18 }}>
          {day.reflectionQuestion}
        </Text>

        <View style={styles.sectionSep} />

        <Text variant="eyebrow">SCIENCE NOTE</Text>
        <Text
          variant="bodySmall"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 6, lineHeight: 20 }}
        >
          {day.scienceNote}
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        {isFreePreview ? (
          <View>
            <Text
              variant="bodySmall"
              color={tokens.semantic.textSecondary}
              align="center"
              style={{ marginBottom: 10 }}
            >
              Continue your reset — unlock all 21 days.
            </Text>
            <Button block size="lg" onPress={openPaywall}>
              {`Unlock the full 21 days · $${GET_UNSTUCK_PROGRAM.priceUSD}`}
            </Button>
          </View>
        ) : dayDone ? (
          <View style={styles.doneChip}>
            <Text variant="body" color={accent}>
              ✓ Day {dayNum} complete
            </Text>
          </View>
        ) : (
          <Button
            block
            size="lg"
            disabled={!canComplete}
            onPress={markDayComplete}
          >
            {canComplete ? `Mark Day ${dayNum} complete` : 'Complete both sessions to finish day'}
          </Button>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  previewBanner: {
    padding: 14,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.accentSoft,
    borderWidth: 1,
    marginBottom: 22,
  },
  sectionSep: {
    height: 1,
    backgroundColor: tokens.semantic.borderSubtle,
    marginVertical: 22,
  },
  sessionRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  sessionCheck: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: tokens.semantic.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkRow: {
    marginTop: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: tokens.semantic.bgBase,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
  doneChip: {
    padding: 16,
    borderRadius: tokens.radii.pill,
    alignItems: 'center',
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
  },
});
