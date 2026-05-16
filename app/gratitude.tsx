import React, { useState, useMemo, useRef } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { MicButton } from '@/components/MicButton';
import { tokens } from '@/theme/tokens';
import { useGratitudeStore, GratitudeTime } from '@/store/useGratitudeStore';

const MORNING_PROMPT = {
  title: 'Morning Gratitude',
  subtitle: 'Start the day anchored in what is already good.',
  invitation: 'What are three things you are grateful for this morning?',
  guidance:
    'Let them be small. The warmth of the bed. A safe home. A breath, taken freely. The smaller the noticing, the deeper the rewiring.',
};

const EVENING_PROMPT = {
  title: 'Evening Gratitude',
  subtitle: 'End the day by noticing what went right.',
  invitation: 'What three moments did you appreciate today?',
  guidance:
    'Not achievements. Moments. A kind exchange. A meal enjoyed. A task completed. The way the light looked at a certain hour.',
};

const DEEPER_PROMPTS = [
  'Who is one person you are grateful for today — and one specific thing about them?',
  'What is working in your life that you have stopped noticing?',
  'What is one challenge today teaching you?',
  'What did your body do for you today that you rarely thank?',
  'What is one small thing that made you smile?',
];

/**
 * Daily Gratitude Journal — morning + evening practice.
 * Core teaching: attention increases what it touches.
 * Small gratitudes rewire the baseline faster than big ones.
 */
export default function GratitudeScreen() {
  const router = useRouter();
  const addEntry = useGratitudeStore((s) => s.addEntry);
  const entries = useGratitudeStore((s) => s.entries);
  const streak = useGratitudeStore((s) => s.getStreak());
  const todayComplete = useGratitudeStore((s) => s.getTodayComplete());

  const hour = new Date().getHours();
  const defaultTime: GratitudeTime = hour < 14 ? 'morning' : 'evening';

  const [mode, setMode] = useState<'today' | 'history'>('today');
  const [time, setTime] = useState<GratitudeTime>(defaultTime);
  const [items, setItems] = useState<string[]>(['', '', '']);
  const [reflection, setReflection] = useState('');
  const [deeperPrompt, setDeeperPrompt] = useState(
    DEEPER_PROMPTS[Math.floor(Math.random() * DEEPER_PROMPTS.length)] ?? DEEPER_PROMPTS[0]!
  );

  const prompt = time === 'morning' ? MORNING_PROMPT : EVENING_PROMPT;
  const alreadyLoggedThisTime = todayComplete[time];

  const canSave = items.filter((i) => i.trim().length > 0).length >= 1;

  const updateItem = (idx: number, val: string) => {
    setItems((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  const addMoreItem = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems((prev) => [...prev, '']);
  };

  // Submit-debounce: prevent rapid double-tap from creating duplicate entries.
  const savingRef = useRef(false);
  const handleSave = () => {
    if (savingRef.current) return;
    const cleanItems = items.map((i) => i.trim()).filter((i) => i.length > 0);
    if (cleanItems.length === 0) return;
    savingRef.current = true;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addEntry({
      time,
      items: cleanItems,
      ...(reflection.trim().length > 0 ? { reflection: reflection.trim() } : {}),
    });
    setItems(['', '', '']);
    setReflection('');
    setMode('history');
    // Release the lock after the next event-loop tick — long enough to
    // cover the synchronous double-tap, short enough to never block a
    // legitimate retry.
    setTimeout(() => { savingRef.current = false; }, 800);
  };

  const newPrompt = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    let next = DEEPER_PROMPTS[Math.floor(Math.random() * DEEPER_PROMPTS.length)];
    // avoid repeating
    let tries = 0;
    while (next === deeperPrompt && tries < 5) {
      next = DEEPER_PROMPTS[Math.floor(Math.random() * DEEPER_PROMPTS.length)];
      tries++;
    }
    setDeeperPrompt(next ?? DEEPER_PROMPTS[0]!);
  };

  const historyByDate = useMemo(() => {
    const grouped: Record<string, typeof entries> = {};
    for (const e of entries) {
      if (!grouped[e.date]) grouped[e.date] = [];
      grouped[e.date]!.push(e);
    }
    return Object.entries(grouped).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [entries]);

  return (
    <Screen backgroundColor={tokens.semantic.bgBase}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>← Back</Text>
          </Pressable>

          {/* Hero */}
          <LinearGradient colors={[`${tokens.semantic.accent}30`, 'transparent']} style={styles.hero}>
            <Text variant="eyebrow" style={{ color: tokens.semantic.accent }}>
              Daily Practice
            </Text>
            <Text variant="heading1" style={styles.heroTitle}>
              Gratitude Journal
            </Text>
            <Text variant="body" style={styles.heroTagline}>
              When you are grateful for what you have, no matter how small, those things begin to increase.
            </Text>

            {/* Streak + today status */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text variant="heading1" style={{ color: tokens.semantic.accent, fontFamily: tokens.fonts.mono }}>
                  {streak}
                </Text>
                <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>
                  DAY STREAK
                </Text>
              </View>
              <View style={styles.statCard}>
                <View style={styles.checkRow}>
                  <Text variant="body">☀ Morning</Text>
                  <Text variant="body" style={{ color: todayComplete.morning ? tokens.semantic.accent : tokens.semantic.textSecondary }}>
                    {todayComplete.morning ? '✓' : '—'}
                  </Text>
                </View>
                <View style={styles.checkRow}>
                  <Text variant="body">☾ Evening</Text>
                  <Text variant="body" style={{ color: todayComplete.evening ? tokens.semantic.accent : tokens.semantic.textSecondary }}>
                    {todayComplete.evening ? '✓' : '—'}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Mode Tabs */}
          <View style={styles.tabs}>
            <Pressable
              onPress={() => { void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setMode('today'); }}
              style={[styles.tab, mode === 'today' && { borderBottomColor: tokens.semantic.accent, borderBottomWidth: 2 }]}
            >
              <Text variant="label" style={{ color: mode === 'today' ? tokens.semantic.textPrimary : tokens.semantic.textSecondary }}>
                TODAY
              </Text>
            </Pressable>
            <Pressable
              onPress={() => { void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setMode('history'); }}
              style={[styles.tab, mode === 'history' && { borderBottomColor: tokens.semantic.accent, borderBottomWidth: 2 }]}
            >
              <Text variant="label" style={{ color: mode === 'history' ? tokens.semantic.textPrimary : tokens.semantic.textSecondary }}>
                HISTORY
              </Text>
            </Pressable>
          </View>

          {mode === 'today' && (
            <View style={styles.content}>
              {/* Morning / Evening toggle */}
              <View style={styles.timeToggle}>
                <Pressable
                  onPress={() => { void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setTime('morning'); }}
                  style={[
                    styles.timeBtn,
                    time === 'morning' && { backgroundColor: tokens.semantic.accent },
                  ]}
                >
                  <Text variant="label" style={{ color: time === 'morning' ? tokens.semantic.bgBase : tokens.semantic.textPrimary }}>
                    ☀ MORNING
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => { void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setTime('evening'); }}
                  style={[
                    styles.timeBtn,
                    time === 'evening' && { backgroundColor: tokens.semantic.accent },
                  ]}
                >
                  <Text variant="label" style={{ color: time === 'evening' ? tokens.semantic.bgBase : tokens.semantic.textPrimary }}>
                    ☾ EVENING
                  </Text>
                </Pressable>
              </View>

              {/* Prompt */}
              <Text variant="heading2" style={styles.promptTitle}>
                {prompt.title}
              </Text>
              <Text variant="body" style={styles.promptSubtitle}>
                {prompt.subtitle}
              </Text>
              <Text variant="displayItalic" style={styles.invitation}>
                {prompt.invitation}
              </Text>
              <Text variant="body" style={styles.guidance}>
                {prompt.guidance}
              </Text>

              {alreadyLoggedThisTime && (
                <View style={styles.alreadyLogged}>
                  <Text variant="label" style={{ color: tokens.semantic.accent }}>
                    ✓ ALREADY LOGGED TODAY
                  </Text>
                  <Text variant="body" style={{ marginTop: 4, color: tokens.semantic.textSecondary, fontStyle: 'italic' }}>
                    Feel free to add more. There is no limit to gratitude.
                  </Text>
                </View>
              )}

              {/* Entry fields */}
              <View style={styles.entryFields}>
                {items.map((item, i) => (
                  <View key={i} style={styles.entryRow}>
                    <Text variant="heading3" style={styles.entryNumber}>
                      {i + 1}.
                    </Text>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        value={item}
                        onChangeText={(v) => updateItem(i, v)}
                        placeholder="Something you are grateful for..."
                        placeholderTextColor={tokens.semantic.textSecondary}
                        style={styles.entryInput}
                        multiline
                      />
                      <View style={{ marginTop: 8 }}>
                        <MicButton
                          value={item}
                          onChange={(v) => updateItem(i, v)}
                          accent={tokens.semantic.accent}
                          size="sm"
                          label="SPEAK INSTEAD"
                        />
                      </View>
                    </View>
                  </View>
                ))}
                <Pressable onPress={addMoreItem} style={styles.addMore}>
                  <Text variant="label" style={{ color: tokens.semantic.accent, fontSize: 14, letterSpacing: 0.5 }}>
                    + Add another
                  </Text>
                </Pressable>
              </View>

              {/* Deeper reflection (optional) */}
              <View style={styles.deeperSection}>
                <View style={styles.deeperHeader}>
                  <Text variant="label" style={{ color: tokens.semantic.accent }}>
                    DEEPER REFLECTION (OPTIONAL)
                  </Text>
                  <Pressable onPress={newPrompt}>
                    <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>
                      ↻ new prompt
                    </Text>
                  </Pressable>
                </View>
                <Text variant="body" style={styles.deeperPromptText}>
                  {deeperPrompt}
                </Text>
                <TextInput
                  value={reflection}
                  onChangeText={setReflection}
                  placeholder="Write or speak as much as you like..."
                  placeholderTextColor={tokens.semantic.textSecondary}
                  style={styles.reflectionInput}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                <View style={{ marginTop: 10 }}>
                  <MicButton
                    value={reflection}
                    onChange={setReflection}
                    accent={tokens.semantic.accent}
                    size="md"
                    label="SPEAK INSTEAD"
                  />
                </View>
              </View>

              <View style={{ marginTop: tokens.spacing.s8 }}>
                <Button
                  variant="primary"
                  onPress={handleSave}
                  disabled={!canSave}
                >
                  {`Save ${time === 'morning' ? 'Morning' : 'Evening'} Gratitude`}
                </Button>
              </View>

              <Text variant="label" style={styles.footerNote}>
                The smaller the gratitude, the more powerful the rewiring.
              </Text>
            </View>
          )}

          {mode === 'history' && (
            <View style={styles.content}>
              {historyByDate.length === 0 ? (
                <View style={styles.empty}>
                  <Text variant="heading3" style={{ color: tokens.semantic.textSecondary }}>
                    No entries yet.
                  </Text>
                  <Text variant="body" style={{ color: tokens.semantic.textSecondary, marginTop: tokens.spacing.s2, textAlign: 'center' }}>
                    Start with today — even one small thing.
                  </Text>
                </View>
              ) : (
                historyByDate.map(([date, dateEntries]) => (
                  <View key={date} style={styles.historyGroup}>
                    <Text variant="eyebrow" style={{ color: tokens.semantic.accent }}>
                      {formatDate(date)}
                    </Text>
                    {dateEntries.map((e) => (
                      <View key={e.id} style={styles.historyCard}>
                        <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>
                          {e.time === 'morning' ? '☀ MORNING' : '☾ EVENING'}
                        </Text>
                        {e.items.map((item, i) => (
                          <View key={i} style={styles.historyItemRow}>
                            <Text variant="body" style={{ color: tokens.semantic.accent, marginRight: tokens.spacing.s2 }}>
                              •
                            </Text>
                            <Text variant="body" style={{ flex: 1 }}>{item}</Text>
                          </View>
                        ))}
                        {e.reflection && (
                          <Text variant="body" style={styles.historyReflection}>
                            {e.reflection}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                ))
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function formatDate(isoDate: string): string {
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const [y, m, d] = parts;
  if (!y || !m || !d) return isoDate;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return 'TODAY';
  if (date.toDateString() === yesterday.toDateString()) return 'YESTERDAY';
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase();
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: tokens.spacing.s12 },
  backBtn: { padding: tokens.spacing.s3 },
  hero: {
    padding: tokens.spacing.s5,
    paddingBottom: tokens.spacing.s8,
  },
  heroTitle: { marginTop: tokens.spacing.s2 },
  heroTagline: {
    marginTop: tokens.spacing.s3,
    fontStyle: 'italic',
    color: tokens.semantic.textSecondary,
    fontSize: 17,
    lineHeight: 26,
  },
  statsRow: {
    flexDirection: 'row',
    gap: tokens.spacing.s3,
    marginTop: tokens.spacing.s5,
  },
  statCard: {
    flex: 1,
    padding: tokens.spacing.s3,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  checkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 2,
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
  content: { padding: tokens.spacing.s5 },
  timeToggle: {
    flexDirection: 'row',
    gap: tokens.spacing.s2,
    marginBottom: tokens.spacing.s8,
  },
  timeBtn: {
    flex: 1,
    paddingVertical: tokens.spacing.s3,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
    alignItems: 'center',
  },
  promptTitle: {
    marginTop: tokens.spacing.s2,
    fontSize: 28,
    lineHeight: 36,
  },
  promptSubtitle: {
    color: tokens.semantic.textSecondary,
    marginTop: tokens.spacing.s2,
    fontStyle: 'italic',
    fontSize: 17,
    lineHeight: 25,
  },
  invitation: {
    marginTop: tokens.spacing.s5,
    color: tokens.semantic.accent,
    fontSize: 24,
    lineHeight: 34,
  },
  guidance: {
    marginTop: tokens.spacing.s3,
    color: tokens.semantic.textSecondary,
    fontSize: 17,
    lineHeight: 26,
  },
  alreadyLogged: {
    marginTop: tokens.spacing.s5,
    padding: tokens.spacing.s3,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.sm,
    borderLeftWidth: 3,
    borderLeftColor: tokens.semantic.accent,
  },
  entryFields: {
    marginTop: tokens.spacing.s8,
    gap: tokens.spacing.s3,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tokens.spacing.s2,
  },
  entryNumber: {
    color: tokens.semantic.accent,
    width: 32,
    paddingTop: tokens.spacing.s4,
    fontSize: 22,
  },
  entryInput: {
    padding: tokens.spacing.s4,
    minHeight: 72,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
    color: tokens.semantic.textPrimary,
    fontSize: 19,
    lineHeight: 28,
    fontFamily: tokens.fonts.body,
  },
  addMore: {
    paddingVertical: tokens.spacing.s2,
    alignItems: 'flex-start',
  },
  deeperSection: {
    marginTop: tokens.spacing.s8,
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
  },
  deeperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deeperPromptText: {
    marginTop: tokens.spacing.s2,
    fontStyle: 'italic',
    fontSize: 17,
    lineHeight: 26,
  },
  reflectionInput: {
    marginTop: tokens.spacing.s3,
    padding: tokens.spacing.s4,
    minHeight: 140,
    backgroundColor: tokens.semantic.bgBase,
    borderRadius: tokens.radii.sm,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
    color: tokens.semantic.textPrimary,
    fontSize: 18,
    lineHeight: 27,
    fontFamily: tokens.fonts.body,
  },
  footerNote: {
    marginTop: tokens.spacing.s5,
    textAlign: 'center',
    color: tokens.semantic.textSecondary,
    fontStyle: 'italic',
  },
  historyGroup: {
    marginBottom: tokens.spacing.s8,
  },
  historyCard: {
    marginTop: tokens.spacing.s2,
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderLeftWidth: 3,
    borderLeftColor: tokens.semantic.accent,
  },
  historyItemRow: {
    flexDirection: 'row',
    marginTop: tokens.spacing.s2,
  },
  historyReflection: {
    marginTop: tokens.spacing.s3,
    paddingTop: tokens.spacing.s3,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderDefault,
    fontStyle: 'italic',
    color: tokens.semantic.textSecondary,
  },
  empty: {
    padding: tokens.spacing.s12,
    alignItems: 'center',
  },
});
