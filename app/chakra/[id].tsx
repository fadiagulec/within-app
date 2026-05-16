import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import { tokens, chakraColors } from '@/theme/tokens';
import { getChakra } from '@/data/chakras';
import { getChakraContent, ChakraId } from '@/data/chakra-content';
import { ChakraSymbol } from '@/components/illustrations/ChakraSymbol';
import { useProgressStore } from '@/store/useProgressStore';
import { PaywallModal } from '@/features/payments/PaywallModal';
import { FrequencyPlayer } from '@/components/coach/FrequencyPlayer';
import { ChakraBackground } from '@/components/ChakraBackground';
import type { SpineChakraId } from '@/data/chakra-spine';
import type { ChakraKey } from '@/types';
import { getScriptByChakra, type UnblockingScript, type ScriptStep } from '@/data/unblocking-scripts';
import { getChakraAffirmations } from '@/data/chakra-affirmations';
import { getFullHealingScript } from '@/data/full-healing-scripts';

type Phase = 'learn' | 'affirm' | 'heal';

export default function ChakraDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const unlockedLevels = useProgressStore((s) => s.progress.unlockedLevels);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>('heal');

  if (!id) {
    return (
      <Screen>
        <Text variant="heading2">Chakra not found.</Text>
      </Screen>
    );
  }

  // Two parallel chakra identifiers:
  //   ChakraId  ('solar-plexus', 'third-eye')   - used in URL routes + content
  //   ChakraKey ('solar', 'thirdEye')           - used in chakras.ts data file + stores
  // We accept either form and normalize to both.
  const normalizedId = (() => {
    const s = String(id);
    if (s === 'solar') return 'solar-plexus';
    if (s === 'thirdEye' || s === 'third_eye') return 'third-eye';
    return s;
  })() as ChakraId;

  const chakraKey: ChakraKey = (() => {
    const s = String(id);
    if (s === 'solar-plexus') return 'solar';
    if (s === 'third-eye' || s === 'third_eye') return 'thirdEye';
    return s as ChakraKey;
  })();

  // Guard against invalid ids (/chakra/banana). getChakra and
  // getChakraContent will throw or return undefined for unknown keys —
  // we'd rather show a polite "not found" than whitescreen the page.
  let chakra, content;
  try {
    chakra = getChakra(chakraKey);
    content = getChakraContent(normalizedId);
  } catch {
    chakra = undefined;
    content = undefined;
  }
  if (!chakra || !content) {
    return (
      <Screen>
        <Text variant="heading2" style={{ marginBottom: 12 }}>
          Chakra not found.
        </Text>
        <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginBottom: 24 }}>
          That energy centre doesn&apos;t exist in our library.
        </Text>
        <Button variant="ghost" onPress={() => router.back()}>
          ← Back
        </Button>
      </Screen>
    );
  }
  const unlocked = unlockedLevels.includes(chakra.index);
  const accent = content.color;

  const switchPhase = (next: Phase) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPhase(next);
  };

  return (
    <ChakraBackground chakraId={normalizedId as SpineChakraId} colorOverride={accent}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Chakra-color hero — gradient runs through the whole screen, this is just the visual focal point */}
        <View style={styles.colorHero}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backBtnOnImage}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text variant="label" style={{ color: '#FFFFFF', fontSize: 16, letterSpacing: 0.5 }}>← Back</Text>
          </Pressable>
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <ChakraSymbol chakraId={normalizedId} size={140} />
          </View>
          <View style={{ marginTop: 28, alignItems: 'center' }}>
            <Text variant="eyebrow" style={{ color: '#FFFFFF', letterSpacing: 2.5, opacity: 0.95, fontSize: 14 }}>
              CHAKRA {content.number} · {content.sanskritName.toUpperCase()}
            </Text>
            <Text variant="heading1" style={[styles.heroTitle, { color: '#FFFFFF', textAlign: 'center', fontSize: 52, lineHeight: 60, marginTop: 8 }]}>
              {content.name}
            </Text>
            <Text variant="body" style={[styles.heroSubtitle, { color: '#FFFFFF', textAlign: 'center', fontStyle: 'italic', fontSize: 19, lineHeight: 28, maxWidth: 360, marginTop: 14 }]}>
              {content.simpleDefinition}
            </Text>
          </View>
        </View>

        {/* Frequency Player — per-chakra healing tone */}
        <FrequencyPlayer chakraId={normalizedId as SpineChakraId} />

        {/* 3-Phase Tab Switcher — Learn (the chakra), Affirm (mantras), Heal (the script) */}
        <View style={styles.tabs}>
          {(['learn', 'affirm', 'heal'] as Phase[]).map((p) => (
            <Pressable
              key={p}
              onPress={() => switchPhase(p)}
              style={[
                styles.tab,
                phase === p && { borderBottomColor: accent, borderBottomWidth: 2 },
              ]}
            >
              <Text
                variant="label"
                style={{
                  color: phase === p ? tokens.semantic.textPrimary : tokens.semantic.textSecondary,
                  textTransform: 'uppercase',
                  fontSize: 14,
                  letterSpacing: 1.2,
                }}
              >
                {p === 'learn' ? '1. Learn' : p === 'affirm' ? '2. Affirm' : '3. Heal'}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Phase content */}
        <View style={styles.phaseContent}>
          {phase === 'learn' && <LearnPhase content={content} accent={accent} />}
          {phase === 'affirm' && <AffirmPhase content={content} accent={accent} chakraId={normalizedId as SpineChakraId} />}
          {phase === 'heal' && (
            <HealPhase
              content={content}
              accent={accent}
              chakraId={normalizedId as SpineChakraId}
              onBeginScript={() =>
                router.push({
                  pathname: '/unblock/[id]',
                  params: { id: normalizedId },
                } as never)
              }
              onOpenFullSession={() =>
                router.push({
                  pathname: '/full-healing/[id]',
                  params: { id: normalizedId },
                } as never)
              }
            />
          )}
        </View>
      </ScrollView>

      <PaywallModal
        visible={paywallOpen}
        levelId={chakra.index}
        onClose={() => setPaywallOpen(false)}
      />
    </ChakraBackground>
  );
}

// ============ LEARN PHASE ============
function LearnPhase({ content, accent }: { content: ReturnType<typeof getChakraContent>; accent: string }) {
  return (
    <View style={{ gap: tokens.spacing.s8 }}>
      <InfoRow label="Location" value={content.location} />
      <InfoRow label="Element" value={content.element} />
      <InfoRow label="Mantra" value={content.mantra} />
      <InfoRow label="Sense" value={content.sense} />

      <Section title="What This Chakra Governs">
        <Text variant="body" style={{ fontSize: 17, lineHeight: 26 }}>
          {content.whatItGoverns}
        </Text>
      </Section>

      <Section title={`The Shadow: ${content.shadowFeeling}`} accent={accent}>
        <Text variant="body" style={{ fontStyle: 'italic', fontSize: 17, lineHeight: 26 }}>
          {content.shadowDescription}
        </Text>
      </Section>

      <Section title="Signs of Balance">
        {content.signsOfBalance.map((s, i) => (
          <BulletLine key={i} text={s} color={accent} />
        ))}
      </Section>

      <Section title="Signs of Imbalance">
        {content.signsOfImbalance.map((s, i) => (
          <BulletLine key={i} text={s} color={tokens.semantic.textSecondary} />
        ))}
      </Section>

      <Section title="The Science">
        <Text variant="body" style={{ color: tokens.semantic.textSecondary, fontSize: 16, lineHeight: 25 }}>
          {content.scienceNote}
        </Text>
      </Section>
    </View>
  );
}

// ============ AFFIRM PHASE ============
// Uses the founder's curated affirmations from chakra-affirmations.ts.
// Falls back to chakra-content.ts affirmations only if the new set is
// missing for some id (defensive — all 8 are populated today).
function AffirmPhase({
  content,
  accent,
  chakraId,
}: {
  content: ReturnType<typeof getChakraContent>;
  accent: string;
  chakraId: SpineChakraId;
}) {
  const affirmSet = getChakraAffirmations(chakraId);
  const affirmations = affirmSet?.affirmations ?? content.affirmations;
  const shiftLabel = affirmSet?.shiftLabel;
  const lifeArea = affirmSet?.lifeArea;

  const [received, setReceived] = useState<boolean[]>(
    Array(affirmations.length).fill(false)
  );

  const toggle = (i: number) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setReceived((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const completed = received.filter(Boolean).length;

  return (
    <View style={{ gap: tokens.spacing.s5 }}>
      <Section title="Affirmation Practice">
        {shiftLabel ? (
          <Text variant="mono" style={{ color: accent, fontSize: 11, letterSpacing: 1.6, marginBottom: 6 }}>
            {shiftLabel.toUpperCase()}{lifeArea ? ` · ${lifeArea.toUpperCase()}` : ''}
          </Text>
        ) : null}
        <Text variant="body" style={{ color: tokens.semantic.textSecondary }}>
          Read each affirmation slowly. Let it land. When it does, tap "I receive this."
          Notice which land easily and which resist — the resistant ones are where the healing is.
        </Text>
        <Text variant="label" style={{ color: accent, marginTop: tokens.spacing.s3 }}>
          {completed} / {affirmations.length} received today
        </Text>
      </Section>

      {affirmations.map((aff, i) => (
        <Pressable
          key={i}
          onPress={() => toggle(i)}
          style={[
            styles.affirmCard,
            {
              borderColor: received[i] ? accent : tokens.semantic.borderDefault,
              backgroundColor: received[i] ? `${accent}15` : tokens.semantic.bgElevated,
            },
          ]}
        >
          <Text variant="heading3" style={{ fontStyle: 'italic', fontSize: 22, lineHeight: 32 }}>
            "{aff}"
          </Text>
          <Text
            variant="label"
            style={{
              marginTop: tokens.spacing.s3,
              fontSize: 13,
              letterSpacing: 1,
              color: received[i] ? accent : tokens.semantic.textSecondary,
            }}
          >
            {received[i] ? '✓ Received' : 'Tap when it lands'}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

// ============ HEAL PHASE ============
// Renders the per-chakra unblocking script. The 7-step Soma arc:
// arrive → name → breathe → witness → release → activate → seal.
//
// This was previously a paywalled session list. Now it IS the healing —
// the actual script, free, surfaced inline.
function HealPhase({
  content,
  accent,
  chakraId,
  onBeginScript,
  onOpenFullSession,
}: {
  content: ReturnType<typeof getChakraContent>;
  accent: string;
  chakraId: SpineChakraId;
  onBeginScript: () => void;
  onOpenFullSession: () => void;
}) {
  const script: UnblockingScript | undefined = getScriptByChakra(chakraId);
  const fullSession = getFullHealingScript(chakraId);

  if (!script) {
    // Soft fallback — should never happen since all 8 scripts exist.
    return (
      <View style={{ gap: tokens.spacing.s5 }}>
        <Section title={`Release the ${content.shadowFeeling}`} accent={accent}>
          <Text variant="body">{content.healingInvitation}</Text>
        </Section>
      </View>
    );
  }

  return (
    <View style={{ gap: tokens.spacing.s5 }}>
      {/* Healing invitation — the why */}
      <Section title={`Release the ${content.shadowFeeling}`} accent={accent}>
        <Text variant="body">{content.healingInvitation}</Text>
      </Section>

      {/* FULL GUIDED HEALING SESSION — the primary CTA, founder-voiced */}
      {fullSession ? (
        <Pressable
          onPress={onOpenFullSession}
          accessibilityRole="button"
          accessibilityLabel={`Begin the full guided healing session — ${fullSession.title}`}
          style={({ pressed }) => [
            {
              padding: 22,
              borderRadius: tokens.radii.xl,
              backgroundColor: accent,
              gap: 8,
            },
            pressed && { opacity: 0.92 },
          ]}
        >
          <Text variant="mono" style={{ color: '#FFFFFF', fontSize: 11, letterSpacing: 2, opacity: 0.9 }}>
            FULL GUIDED HEALING · {fullSession.durationMin} MIN · {fullSession.bijaSound}
          </Text>
          <Text variant="heading2" style={{ color: '#FFFFFF', marginTop: 4, fontSize: 24 }}>
            {fullSession.subtitle}
          </Text>
          <Text variant="body" style={{ color: 'rgba(255,255,255,0.92)', marginTop: 6, fontSize: 14, lineHeight: 21 }}>
            A long-form session, voice-guided. Timeline travel, journal prompts,
            sound activation. Sit or lie down. Eyes closed if you can.
          </Text>
          <View style={{ marginTop: 12, alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.18)' }}>
            <Text variant="label" style={{ color: '#FFFFFF', fontSize: 13, letterSpacing: 0.5 }}>
              ▶  Begin guided session
            </Text>
          </View>
        </Pressable>
      ) : null}

      {/* The script — title + tagline + LISTEN + Begin guided walkthrough */}
      <View style={[styles.scriptHero, { borderColor: `${accent}55`, backgroundColor: `${accent}12` }]}>
        <Text variant="mono" style={{ color: accent, fontSize: 11, letterSpacing: 1.8 }}>
          UNBLOCKING SCRIPT · {script.totalMinutes} MIN · {script.steps.length} STEPS
        </Text>
        <Text variant="heading2" style={{ marginTop: 8, fontSize: 26 }}>
          {script.title}
        </Text>
        <Text
          variant="displayItalic"
          style={{ marginTop: 6, fontSize: 16, color: tokens.semantic.textSecondary }}
        >
          {script.tagline}
        </Text>
        <View style={{ marginTop: 14, flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Pressable
            onPress={onBeginScript}
            accessibilityRole="button"
            accessibilityLabel="Begin guided walkthrough of the script"
            style={({ pressed }) => [
              styles.beginScriptBtn,
              { backgroundColor: accent },
              pressed && { opacity: 0.9 },
            ]}
          >
            <Text variant="label" style={{ color: '#FFFFFF', fontSize: 14, letterSpacing: 0.5 }}>
              ▶  Begin guided walkthrough
            </Text>
          </Pressable>
          <SpeechPlayer
            text={`${script.title}. ${script.tagline} The seven steps: ${script.steps
              .map((s, i) => `Step ${i + 1}, ${s.label}. ${s.body}`)
              .join(' ')}`}
            accent={accent}
            label="LISTEN TO FULL SCRIPT"
            size="sm"
          />
        </View>
      </View>

      {/* All 7 steps inline — readable preview */}
      <Section title="The 7 steps">
        <Text variant="bodySmall" style={{ color: tokens.semantic.textSecondary, marginBottom: tokens.spacing.s3 }}>
          You can read the steps here, or open the guided walkthrough above to be
          taken through one step at a time.
        </Text>
      </Section>

      <View style={{ gap: tokens.spacing.s3 }}>
        {script.steps.map((step, i) => (
          <UnblockStepCard
            key={i}
            step={step}
            stepNumber={i + 1}
            accent={accent}
          />
        ))}
      </View>
    </View>
  );
}

// One step card — kind, label, duration, body, LISTEN.
function UnblockStepCard({
  step,
  stepNumber,
  accent,
}: {
  step: ScriptStep;
  stepNumber: number;
  accent: string;
}) {
  return (
    <View style={[styles.unblockStepCard, { borderLeftColor: accent }]}>
      <View style={styles.unblockStepHead}>
        <View style={[styles.unblockStepNum, { backgroundColor: accent }]}>
          <Text variant="label" style={{ color: '#FFFFFF', fontSize: 12 }}>
            {stepNumber}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="mono" style={{ color: accent, fontSize: 10, letterSpacing: 1.5 }}>
            {step.kind.toUpperCase()} · ~{Math.ceil(step.durationSec / 60)} MIN
          </Text>
          <Text variant="heading3" style={{ marginTop: 2, fontSize: 17 }}>
            {step.label}
          </Text>
        </View>
      </View>
      <Text
        variant="body"
        style={{
          marginTop: 10,
          fontSize: 15,
          lineHeight: 24,
          color: tokens.semantic.textPrimary,
        }}
      >
        {step.body}
      </Text>
      <View style={{ marginTop: 10, alignSelf: 'flex-start' }}>
        <SpeechPlayer
          text={`Step ${stepNumber}: ${step.label}. ${step.body}`}
          accent={accent}
          label="LISTEN TO STEP"
          size="sm"
        />
      </View>
    </View>
  );
}

// ============ REUSABLE ============
function Section({ title, children, accent }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <View>
      <Text
        variant="heading3"
        style={{
          color: accent ?? tokens.semantic.textPrimary,
          marginBottom: tokens.spacing.s3,
          fontSize: 22,
          lineHeight: 28,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text variant="label" style={{ color: tokens.semantic.textSecondary, flex: 1, fontSize: 13, letterSpacing: 1 }}>
        {label.toUpperCase()}
      </Text>
      <Text variant="body" style={{ flex: 2, fontSize: 17, lineHeight: 25 }}>
        {value}
      </Text>
    </View>
  );
}

function BulletLine({ text, color }: { text: string; color: string }) {
  return (
    <View style={styles.bulletRow}>
      <View style={[styles.bulletDot, { backgroundColor: color }]} />
      <Text variant="body" style={{ flex: 1, fontSize: 17, lineHeight: 25 }}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: tokens.spacing.s12,
  },
  hero: {
    paddingHorizontal: tokens.spacing.s5,
    paddingTop: tokens.spacing.s5,
    paddingBottom: tokens.spacing.s8,
  },
  colorHero: {
    padding: 22,
    paddingTop: 60,
    paddingBottom: 36,
  },
  heroInner: {
    flex: 1,
    padding: 22,
    paddingTop: 50,
  },
  backBtnOnImage: {
    paddingVertical: tokens.spacing.s2,
  },
  backBtn: {
    paddingVertical: tokens.spacing.s2,
  },
  heroTitle: {
    marginTop: tokens.spacing.s2,
  },
  heroSubtitle: {
    marginTop: tokens.spacing.s3,
    fontStyle: 'italic',
    color: tokens.semantic.textSecondary,
  },
  heroVisual: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: tokens.spacing.s8,
  },
  symbolWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: tokens.semantic.borderDefault,
    marginHorizontal: tokens.spacing.s5,
  },
  tab: {
    flex: 1,
    paddingVertical: tokens.spacing.s3,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  phaseContent: {
    padding: tokens.spacing.s5,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: tokens.spacing.s2,
    borderBottomWidth: 1,
    borderBottomColor: tokens.semantic.borderDefault,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 6,
    gap: tokens.spacing.s2,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  affirmCard: {
    padding: tokens.spacing.s5,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
  },
  sessionCard: {
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderLeftWidth: 3,
  },
  bundleCta: {
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.accent,
  },

  // ── Unblocking script (HEAL phase) ──
  scriptHero: {
    padding: 18,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
  },
  beginScriptBtn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  unblockStepCard: {
    padding: 16,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderLeftWidth: 4,
  },
  unblockStepHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  unblockStepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
