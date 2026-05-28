/**
 * Guided Energy Centre Unblocking Session — Dr Espen method.
 *
 * Walks the user through the 11-step unblocking arc for one energy
 * centre, voice-guided by the facilitator (COACH_VOICE_ID), with
 * interactive checkpoints (emotion scores, permissions, reflection,
 * Law-of-Polarity work, gratitude letter, embodied declaration, sound
 * activation) and a before/after emotion contrast as proof of shift.
 */

import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import { MicButton } from '@/components/MicButton';
import { tokens } from '@/theme/tokens';
import { COACH_VOICE_ID } from '@/coach/voiceConfig';
import { getUnblockSession, type UnblockStep } from '@/data/espen-unblocking';
import { useUnblockSessionStore } from '@/store/useUnblockSessionStore';
import { useJournalStore } from '@/store/useJournalStore';

// 1–10 tap scale for the emotion check.
function EmotionScale({
  value,
  onChange,
  color,
}: {
  value: number | null;
  onChange: (n: number) => void;
  color: string;
}) {
  return (
    <View style={styles.scaleRow}>
      {Array.from({ length: 10 }).map((_, i) => {
        const n = i + 1;
        const on = value === n;
        return (
          <Pressable
            key={n}
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              onChange(n);
            }}
            style={[
              styles.scaleCell,
              on && { backgroundColor: color, borderColor: color },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Rate ${n}`}
          >
            <Text variant="mono" color={on ? '#FFFFFF' : tokens.semantic.textPrimary} style={{ fontSize: 14 }}>
              {n}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function UnblockSessionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ chakra: string | string[] }>();
  const chakraId = Array.isArray(params.chakra) ? params.chakra[0] : params.chakra;
  const session = chakraId ? getUnblockSession(String(chakraId)) : undefined;

  const recordSession = useUnblockSessionStore((s) => s.recordSession);
  const addJournal = useJournalStore((s) => s.addEntry);

  const [stepIdx, setStepIdx] = useState(0);
  const [beforeScore, setBeforeScore] = useState<number | null>(null);
  const [afterScore, setAfterScore] = useState<number | null>(null);
  const [permits, setPermits] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const [reflection, setReflection] = useState('');
  const [drawbacks, setDrawbacks] = useState('');
  const [benefits, setBenefits] = useState('');
  const [letter, setLetter] = useState('');
  const [declUsed, setDeclUsed] = useState('');
  const [declNow, setDeclNow] = useState('');
  const savedRef = useRef(false);

  const accent = session?.color ?? tokens.semantic.accent;
  const step: UnblockStep | undefined = session?.steps[stepIdx];

  const canAdvance = useMemo(() => {
    if (!step) return false;
    switch (step.kind) {
      case 'emotion-before':
        return beforeScore !== null;
      case 'permissions':
        return permits[0] && permits[1] && permits[2];
      case 'reflection':
        return reflection.trim().length > 0;
      case 'declaration':
        return declUsed.trim().length > 0 && declNow.trim().length > 0;
      case 'close':
        return afterScore !== null;
      default:
        return true;
    }
  }, [step, beforeScore, permits, reflection, declUsed, declNow, afterScore]);

  if (!session || !step) {
    return (
      <Screen>
        <Text variant="heading2">Session not found.</Text>
        <Button onPress={() => router.back()} style={{ marginTop: 16 }} accessibilityLabel="Back">
          Back
        </Button>
      </Screen>
    );
  }

  const sessionRef = session;
  const total = sessionRef.steps.length;
  const isLast = stepIdx === total - 1;

  function finish() {
    if (savedRef.current) return;
    savedRef.current = true;
    const declaration =
      declUsed.trim() && declNow.trim()
        ? `My biggest ${sessionRef.emotion.toLowerCase()} used to be ${declUsed.trim()}. But now I know ${declNow.trim()}.`
        : undefined;
    recordSession({
      chakraId: sessionRef.chakraId,
      beforeScore: beforeScore ?? 0,
      afterScore: afterScore ?? 0,
      declaration,
    });
    // Save the declaration + letter into the journal so it lives in their practice.
    if (declaration) {
      addJournal({
        promptText: `${sessionRef.name} unblocking — new truth`,
        body: declaration + (letter.trim() ? `\n\nGratitude letter:\n${letter.trim()}` : ''),
        chakra: undefined,
      });
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    router.replace({ pathname: '/full-healing/[id]', params: { id: sessionRef.chakraId } } as never);
  }

  function next() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    if (isLast) {
      finish();
      return;
    }
    setStepIdx((i) => i + 1);
  }

  function back() {
    if (stepIdx === 0) {
      router.back();
      return;
    }
    setStepIdx((i) => i - 1);
  }

  return (
    <Screen padded={false} avoidKeyboard>
      <View style={styles.header}>
        <Pressable onPress={back} hitSlop={10} accessibilityRole="button" accessibilityLabel="Back">
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ←
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.5 }}>
          {sessionRef.name.toUpperCase()} · {stepIdx + 1}/{total}
        </Text>
        <View style={{ width: 16 }} />
      </View>

      {/* Progress */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${((stepIdx + 1) / total) * 100}%`, backgroundColor: accent }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text variant="eyebrow" color={accent} style={{ fontSize: 12, letterSpacing: 1.8 }}>
          {sessionRef.emotion.toUpperCase()} → {sessionRef.transformation.toUpperCase()}
        </Text>
        <Text variant="heading2" style={{ marginTop: 8, fontSize: 24 }}>
          {step.title}
        </Text>

        {/* Facilitator voice */}
        <View style={{ marginTop: 16 }}>
          <SpeechPlayer
            key={`${sessionRef.chakraId}-${stepIdx}`}
            text={step.narration}
            voiceId={COACH_VOICE_ID}
            accent={accent}
            label="LISTEN — I'LL GUIDE YOU"
          />
        </View>

        {/* Narration text */}
        <Text variant="body" style={{ marginTop: 18, fontSize: 16, lineHeight: 26 }}>
          {step.narration}
        </Text>

        {step.instruction ? (
          <View style={[styles.instruction, { borderColor: `${accent}55`, backgroundColor: `${accent}12` }]}>
            <Text variant="bodySmall" color={accent} style={{ fontSize: 13, lineHeight: 20 }}>
              {step.instruction}
            </Text>
          </View>
        ) : null}

        {/* ── Interactive checkpoint by step kind ── */}
        {step.kind === 'emotion-before' ? (
          <View style={{ marginTop: 22 }}>
            <EmotionScale value={beforeScore} onChange={setBeforeScore} color={accent} />
            <View style={styles.scaleLegend}>
              <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11 }}>NONE</Text>
              <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11 }}>OVERWHELMING</Text>
            </View>
          </View>
        ) : null}

        {step.kind === 'permissions' ? (
          <View style={{ marginTop: 22, gap: 10 }}>
            {[
              'Conscious mind — yes',
              'Subconscious mind — yes',
              'You may guide me — yes',
            ].map((label, i) => {
              const on = permits[i];
              return (
                <Pressable
                  key={label}
                  onPress={() => {
                    Haptics.selectionAsync().catch(() => {});
                    setPermits((p) => {
                      const next = [...p] as [boolean, boolean, boolean];
                      next[i] = !next[i];
                      return next;
                    });
                  }}
                  style={[
                    styles.permit,
                    {
                      borderColor: on ? accent : tokens.semantic.borderSubtle,
                      backgroundColor: on ? `${accent}1F` : tokens.semantic.bgElevated,
                    },
                  ]}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: on }}
                >
                  <View style={[styles.permitDot, { borderColor: accent, backgroundColor: on ? accent : 'transparent' }]} />
                  <Text variant="body" style={{ fontSize: 15 }}>{label}</Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}

        {step.kind === 'reflection' ? (
          <View style={{ marginTop: 18 }}>
            <TextInput
              value={reflection}
              onChangeText={setReflection}
              placeholder={`My biggest ${sessionRef.emotion.toLowerCase()} is…`}
              placeholderTextColor={tokens.semantic.textTertiary}
              style={styles.input}
              multiline
            />
            <View style={{ marginTop: 10 }}>
              <MicButton value={reflection} onChange={setReflection} accent={accent} size="md" label="SPEAK IT" />
            </View>
          </View>
        ) : null}

        {step.kind === 'polarity' ? (
          <View style={{ marginTop: 18, gap: 14 }}>
            <View>
              <Text variant="mono" color={accent} style={{ fontSize: 11, letterSpacing: 1.5, marginBottom: 8 }}>
                THREE DRAWBACKS
              </Text>
              <TextInput
                value={drawbacks}
                onChangeText={setDrawbacks}
                placeholder={'1.\n2.\n3.'}
                placeholderTextColor={tokens.semantic.textTertiary}
                style={styles.input}
                multiline
              />
            </View>
            <View>
              <Text variant="mono" color={accent} style={{ fontSize: 11, letterSpacing: 1.5, marginBottom: 8 }}>
                TWENTY BENEFITS — HOW IT SERVED YOU
              </Text>
              <TextInput
                value={benefits}
                onChangeText={setBenefits}
                placeholder={'List as many as you can. Aim for twenty.'}
                placeholderTextColor={tokens.semantic.textTertiary}
                style={[styles.input, { minHeight: 160 }]}
                multiline
              />
              <View style={{ marginTop: 10 }}>
                <MicButton value={benefits} onChange={setBenefits} accent={accent} size="md" label="SPEAK THEM" />
              </View>
            </View>
          </View>
        ) : null}

        {step.kind === 'letter' ? (
          <View style={{ marginTop: 18 }}>
            <TextInput
              value={letter}
              onChangeText={setLetter}
              placeholder={'Dear…'}
              placeholderTextColor={tokens.semantic.textTertiary}
              style={[styles.input, { minHeight: 200 }]}
              multiline
            />
            <View style={{ marginTop: 10 }}>
              <MicButton value={letter} onChange={setLetter} accent={accent} size="md" label="SPEAK YOUR LETTER" />
            </View>
          </View>
        ) : null}

        {step.kind === 'declaration' ? (
          <View style={{ marginTop: 18, gap: 12 }}>
            <View>
              <Text variant="mono" color={accent} style={{ fontSize: 11, letterSpacing: 1.5, marginBottom: 8 }}>
                MY BIGGEST {sessionRef.emotion.toUpperCase()} USED TO BE…
              </Text>
              <TextInput
                value={declUsed}
                onChangeText={setDeclUsed}
                placeholder={'the old story…'}
                placeholderTextColor={tokens.semantic.textTertiary}
                style={styles.input}
                multiline
              />
            </View>
            <View>
              <Text variant="mono" color={accent} style={{ fontSize: 11, letterSpacing: 1.5, marginBottom: 8 }}>
                BUT NOW I KNOW…
              </Text>
              <TextInput
                value={declNow}
                onChangeText={setDeclNow}
                placeholder={'the truth…'}
                placeholderTextColor={tokens.semantic.textTertiary}
                style={styles.input}
                multiline
              />
            </View>
            {declUsed.trim() && declNow.trim() ? (
              <View style={[styles.declarationPreview, { borderColor: `${accent}66`, backgroundColor: `${accent}14` }]}>
                <Text variant="displayItalic" style={{ fontSize: 18, lineHeight: 27 }}>
                  &ldquo;My biggest {sessionRef.emotion.toLowerCase()} used to be {declUsed.trim()}. But now I know {declNow.trim()}.&rdquo;
                </Text>
                <Text variant="bodySmall" color={accent} style={{ marginTop: 10, fontSize: 13 }}>
                  Stand tall. Read it aloud, level-10 energy.
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}

        {step.kind === 'close' ? (
          <View style={{ marginTop: 22 }}>
            <Text variant="mono" color={accent} style={{ fontSize: 11, letterSpacing: 1.5, marginBottom: 10 }}>
              YOUR {sessionRef.emotion.toUpperCase()} NOW — 1 TO 10
            </Text>
            <EmotionScale value={afterScore} onChange={setAfterScore} color={accent} />
            {beforeScore !== null && afterScore !== null ? (
              <View style={[styles.contrast, { borderColor: `${accent}66`, backgroundColor: `${accent}14` }]}>
                <Text variant="heading1" color={accent} style={{ fontSize: 40 }}>
                  {beforeScore} → {afterScore}
                </Text>
                <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 6, fontSize: 14 }}>
                  {afterScore < beforeScore
                    ? 'That shift is real. That is the proof your body just changed something.'
                    : 'Honour wherever you are. The work continues, gently.'}
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <Button block size="lg" disabled={!canAdvance} onPress={next}>
          {isLast ? 'Complete the session' : 'Continue'}
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  progressTrack: {
    height: 3,
    marginHorizontal: 20,
    backgroundColor: tokens.semantic.borderSubtle,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: '100%' },
  scroll: { padding: 20, paddingBottom: 40 },
  instruction: {
    marginTop: 18,
    padding: 14,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
  },
  scaleRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 4 },
  scaleCell: {
    flex: 1,
    height: 42,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgElevated,
  },
  scaleLegend: { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between' },
  permit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
  },
  permitDot: { width: 20, height: 20, borderRadius: 10, borderWidth: 2 },
  input: {
    padding: 14,
    minHeight: 64,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgElevated,
    color: tokens.semantic.textPrimary,
    fontFamily: tokens.fonts.body,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  declarationPreview: {
    marginTop: 6,
    padding: 18,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
  },
  contrast: {
    marginTop: 18,
    padding: 20,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgBase,
  },
});
