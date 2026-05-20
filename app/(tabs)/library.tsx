import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { LevelBadge } from '@/components/LevelBadge';
import { ChakraColorDot } from '@/components/ChakraColorDot';
import { tokens, chakraColors } from '@/theme/tokens';
import { chakras } from '@/data/chakras';
import { breathwork } from '@/data/breathwork';
import { meditations } from '@/data/meditations';
import { useProgressStore } from '@/store/useProgressStore';
import { getCurrentDay } from '@/data/journey';
import type { Session, ChakraKey } from '@/types';

function Row({
  eyebrow,
  title,
  children,
  rightAction,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: 28 }}>
      <View style={styles.rowHead}>
        <View style={{ flex: 1 }}>
          <Text variant="eyebrow">{eyebrow}</Text>
          <Text variant="heading2" style={{ marginTop: 4 }}>
            {title}
          </Text>
        </View>
        {rightAction}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20, gap: 12 }}
      >
        {children}
      </ScrollView>
    </View>
  );
}

function SessionCard({
  session,
  unlocked,
  color,
  onPress,
  pricePreview,
}: {
  session: Session;
  unlocked: boolean;
  color?: string;
  onPress: () => void;
  pricePreview?: string;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.card, !unlocked && { opacity: 0.7 }]}>
      <View style={styles.cardTop}>
        <LevelBadge level={session.levelRequired} locked={!unlocked} />
        <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11 }}>
          {session.durationMin} MIN
        </Text>
      </View>
      {color && session.chakraKey ? (
        <View style={{ marginTop: 14 }}>
          <ChakraColorDot chakra={session.chakraKey} size={18} />
        </View>
      ) : null}
      <Text variant="heading3" style={{ marginTop: 14 }} numberOfLines={2}>
        {session.title}
      </Text>
      <Text
        variant="bodySmall"
        color={tokens.semantic.textTertiary}
        numberOfLines={2}
        style={{ marginTop: 6 }}
      >
        {session.subtitle ?? session.theme}
      </Text>
      <View style={{ flex: 1 }} />
      <View style={styles.cardFooter}>
        {unlocked ? (
          <Text variant="eyebrow" color={tokens.semantic.accent}>
            · PREVIEW 30s
          </Text>
        ) : (
          <Text variant="eyebrow" color={tokens.semantic.accent}>
            · LOCKED {pricePreview ?? ''}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

function ChakraCard({
  keyName,
  name,
  mantra,
  theme,
  unlocked,
  onPress,
}: {
  keyName: ChakraKey;
  name: string;
  mantra: string;
  theme: string;
  unlocked: boolean;
  onPress: () => void;
}) {
  const color = chakraColors[keyName];
  return (
    <Pressable onPress={onPress} style={[styles.chakraCard, { borderColor: `${color}77` }]}>
      <LinearGradient
        colors={[`${color}44`, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={[styles.chakraDot, { backgroundColor: color }]} />
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          {mantra}
        </Text>
      </View>
      <Text variant="heading2" style={{ marginTop: 16 }}>
        {name}
      </Text>
      <Text
        variant="displayItalic"
        color={tokens.semantic.textSecondary}
        style={{ marginTop: 8, fontSize: 15 }}
        numberOfLines={2}
      >
        {theme}
      </Text>
      <View style={{ flex: 1 }} />
      <Text
        variant="eyebrow"
        color={unlocked ? color : tokens.semantic.textTertiary}
      >
        {unlocked ? 'OPEN →' : 'LOCKED'}
      </Text>
    </Pressable>
  );
}

export default function Library() {
  const router = useRouter();
  const unlockedLevels = useProgressStore((s) => s.progress.unlockedLevels);
  const currentJourneyDay = useProgressStore((s) => s.progress.currentJourneyDay);
  const journeyStarted = currentJourneyDay > 0;
  const day = getCurrentDay({ currentJourneyDay: Math.max(1, currentJourneyDay) });

  function openSession(s: Session) {
    if (!unlockedLevels.includes(s.levelRequired)) {
      router.push({
        pathname: '/level/[id]',
        params: { id: String(s.levelRequired) },
      });
      return;
    }
    router.push({ pathname: '/session/[id]', params: { id: s.id } });
  }

  const quickRelief = [
    breathwork.find((b) => b.id === 'breath-4-7-8'),
    breathwork.find((b) => b.id === 'breath-box'),
    breathwork.find((b) => b.id === 'breath-diaphragm'),
  ].filter(Boolean) as Session[];

  return (
    <Screen scroll padded={false} edges={['top']}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
        <Text variant="eyebrow" color={tokens.semantic.accent}>
          LIBRARY
        </Text>
        <Text variant="heading1" style={{ marginTop: 6 }}>
          Every layer,{'\n'}in one place.
        </Text>
      </View>

      {/* Row 1 — Journey hero */}
      <View style={{ paddingHorizontal: 20, marginTop: 24, marginBottom: 28 }}>
        <Text variant="eyebrow">YOUR 21-DAY JOURNEY</Text>
        <Pressable
          onPress={() => router.push('/(tabs)/journey')}
          style={[styles.journeyHero, { borderColor: `${chakraColors[day.chakra]}aa` }]}
        >
          <LinearGradient
            colors={[`${chakraColors[day.chakra]}55`, 'transparent']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Text variant="mono" color={tokens.semantic.textSecondary}>
            {journeyStarted ? `DAY ${day.day} · ${day.weekTheme}` : 'NOT STARTED · 21 DAYS'}
          </Text>
          <Text variant="heading2" style={{ marginTop: 8, maxWidth: 260 }}>
            {journeyStarted ? day.dayTitle : 'Burnout Recovery'}
          </Text>
          <Text
            variant="displayItalic"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 10, maxWidth: 300 }}
            numberOfLines={2}
          >
            {journeyStarted
              ? day.hook
              : 'Come back to yourself. In three weeks.'}
          </Text>
          <View style={styles.journeyCta}>
            <Text variant="body" color={tokens.semantic.textOnGold}>
              {journeyStarted ? `Continue Day ${day.day} →` : 'Start the journey →'}
            </Text>
          </View>
        </Pressable>
      </View>

      <View style={{ paddingLeft: 20 }}>
        {/* Row 2 — Quick Relief */}
        <Row
          eyebrow="QUICK RELIEF"
          title="For the spike right now"
        >
          {quickRelief.map((s) => (
            <SessionCard
              key={s.id}
              session={s}
              unlocked={unlockedLevels.includes(s.levelRequired)}
              onPress={() => openSession(s)}
              pricePreview="· free"
            />
          ))}
        </Row>

        {/* Row 3 — Chakra journeys */}
        <Row eyebrow="CHAKRA JOURNEYS" title="Seven doors home">
          {chakras.map((c) => (
            <ChakraCard
              key={c.key}
              keyName={c.key}
              name={c.name}
              mantra={c.mantra}
              theme={c.theme}
              unlocked={unlockedLevels.includes(c.index)}
              onPress={() =>
                router.push({ pathname: '/chakra/[id]', params: { id: c.key } })
              }
            />
          ))}
        </Row>

        {/* Row 4 — Breathwork */}
        <Row eyebrow="BREATHWORK" title="Move energy through the body">
          {breathwork.map((b) => (
            <SessionCard
              key={b.id}
              session={b}
              unlocked={unlockedLevels.includes(b.levelRequired)}
              onPress={() =>
                router.push({
                  pathname: '/breathwork/[id]',
                  params: { id: b.id },
                })
              }
            />
          ))}
        </Row>

        {/* Row 5 — Meditations */}
        <Row eyebrow="MEDITATIONS" title="For specific moments in life">
          {meditations.map((m) => (
            <SessionCard
              key={m.id}
              session={m}
              unlocked={unlockedLevels.includes(m.levelRequired)}
              onPress={() =>
                router.push({
                  pathname: '/meditation/[id]',
                  params: { id: m.id },
                })
              }
            />
          ))}
        </Row>

        {/* Row 5b — Companion */}
        <Row eyebrow="COMPANION" title="Think out loud with the app">
          <Pressable
            onPress={() => router.push('/companion' as never)}
            style={[styles.card, { width: 240, borderColor: '#9DBFB266', borderWidth: 1 }]}
            accessibilityRole="button"
            accessibilityLabel="Open AI companion chat"
          >
            <Text variant="eyebrow" color="#9DBFB2">
              · AI GUIDE
            </Text>
            <Text variant="heading3" style={{ marginTop: 12, fontSize: 17 }}>
              A Quiet Place
            </Text>
            <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 8, lineHeight: 19 }}>
              Talk through what&apos;s alive. She knows your journey, your recent journal, your last tarot pull. She holds space — and points you to what helps.
            </Text>
            <Text variant="body" color="#9DBFB2" style={{ marginTop: 12, fontSize: 13 }}>
              Begin →
            </Text>
          </Pressable>
        </Row>

        {/* Row 6 — Hypnotherapy */}
        <Row eyebrow="HYPNOTHERAPY" title="Rewire what thinking cannot reach">
          <Pressable
            onPress={() => router.push('/hypnotherapy' as never)}
            style={[styles.card, { width: 240, borderColor: '#5645A666', borderWidth: 1 }]}
            accessibilityRole="button"
            accessibilityLabel="Open hypnotherapy section"
          >
            <Text variant="eyebrow" color="#5645A6">
              · NRM 28-DAY + SESSIONS
            </Text>
            <Text variant="heading3" style={{ marginTop: 12, fontSize: 17 }}>
              The Subconscious
            </Text>
            <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 8, lineHeight: 19 }}>
              The 28-day Neuro-Reprogramming arc plus five standalone hypnotherapies for specific moments — confidence, sleep, anxiety, decision, inner critic.
            </Text>
            <Text variant="body" color="#5645A6" style={{ marginTop: 12, fontSize: 13 }}>
              Open →
            </Text>
          </Pressable>
        </Row>

        {/* Row 7 — Tarot */}
        <Row eyebrow="TAROT" title="What today wants you to see">
          <Pressable
            onPress={() => router.push('/tarot' as never)}
            style={[styles.card, { width: 240, borderColor: '#D4AF6E66', borderWidth: 1 }]}
            accessibilityRole="button"
            accessibilityLabel="Open tarot section"
          >
            <Text variant="eyebrow" color="#D4AF6E">
              · DAILY PULL · SPREADS
            </Text>
            <Text variant="heading3" style={{ marginTop: 12, fontSize: 17 }}>
              The Cards
            </Text>
            <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 8, lineHeight: 19 }}>
              78-card RWS deck. One card a day, or a three-card spread when you need depth. Each card connects to a journal prompt.
            </Text>
            <Text variant="body" color="#D4AF6E" style={{ marginTop: 12, fontSize: 13 }}>
              Open →
            </Text>
          </Pressable>
        </Row>

        {/* Row 7 — Manifestation */}
        <Row eyebrow="MANIFESTATION" title="Vision, activation, return">
          <Pressable
            onPress={() => router.push('/(tabs)/vision')}
            style={[styles.card, { width: 220 }]}
          >
            <Text variant="eyebrow" color={tokens.semantic.accent}>
              · VISION BOARD
            </Text>
            <Text variant="heading3" style={{ marginTop: 10 }}>
              Build your board
            </Text>
            <Text
              variant="bodySmall"
              color={tokens.semantic.textTertiary}
              style={{ marginTop: 6 }}
            >
              Intentions across love, health, wealth, purpose.
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(tabs)/vision')}
            style={[styles.card, { width: 220 }]}
          >
            <Text variant="eyebrow" color={tokens.semantic.accent}>
              · MORNING ACTIVATION
            </Text>
            <Text variant="heading3" style={{ marginTop: 10 }}>
              The 3-breath ritual
            </Text>
            <Text
              variant="bodySmall"
              color={tokens.semantic.textTertiary}
              style={{ marginTop: 6 }}
            >
              Before your feet touch the floor.
            </Text>
          </Pressable>
        </Row>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  rowHead: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
    paddingRight: 20,
  },
  card: {
    width: 220,
    minHeight: 220,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardFooter: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chakraCard: {
    width: 240,
    minHeight: 220,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    overflow: 'hidden',
  },
  chakraDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  journeyHero: {
    marginTop: 10,
    padding: 20,
    minHeight: 180,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgElevated,
    overflow: 'hidden',
  },
  journeyCta: {
    marginTop: 18,
    alignSelf: 'flex-start',
    backgroundColor: tokens.semantic.accent,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: tokens.radii.pill,
  },
});
