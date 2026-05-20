/**
 * Companion — AI conversation page.
 *
 * The healing-aware conversational guide. Threads through the user's
 * recent journal entries, tarot pull, and journey progress so the
 * conversation feels personal.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { MicButton } from '@/components/MicButton';
import { useCompanionStore, type CompanionUserContext } from '@/store/useCompanionStore';
import { useJournalStore } from '@/store/useJournalStore';
import { useTarotStore } from '@/store/useTarotStore';
import { useProgressStore } from '@/store/useProgressStore';
import { usePlanStore } from '@/store/usePlanStore';
import { useEmotionStore } from '@/store/useEmotionStore';
import { getCardById } from '@/data/tarot/deck';

const QUICK_PROMPTS = [
  'My chest is tight today.',
  'I keep undercharging — why?',
  'Help me decide between two paths.',
  'I can\'t sleep — racing mind.',
  'Why am I sabotaging this?',
];

export default function CompanionChat() {
  const router = useRouter();
  const messages = useCompanionStore((s) => s.messages);
  const sending = useCompanionStore((s) => s.sending);
  const sendMessage = useCompanionStore((s) => s.sendMessage);
  const clearConversation = useCompanionStore((s) => s.clear);

  // Gather user context from existing stores — passed to API for personalization
  const journalEntries = useJournalStore((s) => s.entries);
  const dailyTarotCardId = useTarotStore((s) => s.dailyPullCardId);
  const dailyTarotReversed = useTarotStore((s) => s.dailyPullReversed);
  const progress = useProgressStore((s) => s.progress);
  const nrmDay = usePlanStore((s) => s.getCurrentDay('nrm-28-day'));
  const isEnrolledNrm = usePlanStore((s) => s.isEnrolled('nrm-28-day'));
  const lastEmotion = useEmotionStore((s) => s.entries[0]);

  const userContext: CompanionUserContext = React.useMemo(() => {
    const ctx: CompanionUserContext = {};
    if (progress.currentJourneyDay > 0) {
      ctx.currentJourneyDay = progress.currentJourneyDay;
    }
    if (isEnrolledNrm) {
      ctx.currentNrmDay = nrmDay;
    }
    if (dailyTarotCardId) {
      const card = getCardById(dailyTarotCardId);
      if (card) {
        ctx.lastTarot = `${card.name}${dailyTarotReversed ? ' (reversed)' : ''}`;
      }
    }
    if (journalEntries.length > 0) {
      ctx.recentJournal = journalEntries.slice(0, 3).map((e) =>
        e.body.slice(0, 200)
      );
    }
    if (lastEmotion?.colorKey) {
      ctx.mood = lastEmotion.colorKey;
    }
    return ctx;
  }, [progress.currentJourneyDay, isEnrolledNrm, nrmDay, dailyTarotCardId, dailyTarotReversed, journalEntries, lastEmotion]);

  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView | null>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const t = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 60);
    return () => clearTimeout(t);
  }, [messages.length, sending]);

  async function send(content?: string) {
    const text = (content ?? input).trim();
    if (!text || sending) return;
    setInput('');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    await sendMessage(text, userContext);
  }

  return (
    <Screen padded={false} avoidKeyboard>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Back
          </Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <View style={styles.statusDot} />
          <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 12 }}>
            COMPANION
          </Text>
        </View>
        <Pressable
          onPress={() => {
            clearConversation();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
          }}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Start a new conversation"
        >
          <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11 }}>
            NEW
          </Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={20}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.length === 0 ? (
            <View style={styles.welcomeBlock}>
              <Text variant="eyebrow" color="#9DBFB2" style={{ fontSize: 12, letterSpacing: 2.2 }}>
                A QUIET PLACE TO THINK OUT LOUD
              </Text>
              <Text variant="heading1" style={{ marginTop: 12, fontSize: 34, lineHeight: 42 }}>
                What did you walk{'\n'}in here carrying?
              </Text>
              <Text
                variant="displayItalic"
                color={tokens.semantic.textSecondary}
                style={{ marginTop: 14, fontSize: 16, lineHeight: 24 }}
              >
                Tell me anything. I&apos;ll meet you where you are. This isn&apos;t therapy — it&apos;s a contemplative space that knows your practice.
              </Text>

              <View style={styles.quickPromptsBlock}>
                <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.8, marginBottom: 10 }}>
                  OR START WITH ONE OF THESE
                </Text>
                {QUICK_PROMPTS.map((p) => (
                  <Pressable
                    key={p}
                    onPress={() => send(p)}
                    style={styles.quickPrompt}
                    accessibilityRole="button"
                    accessibilityLabel={p}
                  >
                    <Text variant="body" color={tokens.semantic.textPrimary} style={{ fontSize: 14 }}>
                      {p}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {Object.keys(userContext).length > 0 ? (
                <View style={styles.contextChipsBlock}>
                  <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 10, letterSpacing: 1.5, marginBottom: 8 }}>
                    SHE KNOWS
                  </Text>
                  <View style={styles.contextChipsRow}>
                    {userContext.lastTarot ? (
                      <View style={styles.contextChip}>
                        <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ fontSize: 12 }}>
                          🜃 Today&apos;s card: {userContext.lastTarot}
                        </Text>
                      </View>
                    ) : null}
                    {userContext.currentNrmDay ? (
                      <View style={styles.contextChip}>
                        <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ fontSize: 12 }}>
                          NRM Day {userContext.currentNrmDay}
                        </Text>
                      </View>
                    ) : null}
                    {userContext.currentJourneyDay ? (
                      <View style={styles.contextChip}>
                        <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ fontSize: 12 }}>
                          Journey Day {userContext.currentJourneyDay}
                        </Text>
                      </View>
                    ) : null}
                    {userContext.recentJournal && userContext.recentJournal.length > 0 ? (
                      <View style={styles.contextChip}>
                        <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ fontSize: 12 }}>
                          Recent journal entries
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              ) : null}
            </View>
          ) : (
            <View style={{ gap: 12 }}>
              {messages.map((m) => (
                <View
                  key={m.id}
                  style={[
                    styles.bubble,
                    m.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant,
                  ]}
                >
                  <Text
                    variant="body"
                    color={m.role === 'user' ? tokens.semantic.textOnGold : tokens.semantic.textPrimary}
                    style={{ fontSize: 15, lineHeight: 23 }}
                  >
                    {m.content}
                  </Text>
                </View>
              ))}
              {sending ? (
                <View style={[styles.bubble, styles.bubbleAssistant]}>
                  <ActivityIndicator size="small" color="#9DBFB2" />
                </View>
              ) : null}
            </View>
          )}
        </ScrollView>

        <View style={styles.inputWrap}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Say what&apos;s alive..."
            placeholderTextColor={tokens.semantic.textTertiary}
            style={styles.input}
            multiline
            editable={!sending}
            onSubmitEditing={() => send()}
            blurOnSubmit={false}
          />
          <View style={styles.inputActions}>
            <MicButton
              value={input}
              onChange={setInput}
              accent="#9DBFB2"
              size="sm"
              label=""
            />
            <Pressable
              onPress={() => send()}
              disabled={sending || !input.trim()}
              style={[
                styles.sendBtn,
                (sending || !input.trim()) && { opacity: 0.4 },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Send message"
            >
              <Text variant="body" color={tokens.semantic.textOnGold} style={{ fontSize: 14 }}>
                Send
              </Text>
            </Pressable>
          </View>
        </View>

        <Text
          variant="bodySmall"
          color={tokens.semantic.textTertiary}
          align="center"
          style={{ paddingHorizontal: 20, paddingBottom: 12, fontSize: 11, lineHeight: 16 }}
        >
          The companion is an AI guide. Not a therapist. For crisis support: 988 (US) · 116 123 (UK Samaritans).
        </Text>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: tokens.semantic.borderSubtle,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9DBFB2',
  },
  scroll: {
    padding: 20,
    paddingBottom: 30,
    flexGrow: 1,
  },
  welcomeBlock: {
    paddingTop: 12,
  },
  quickPromptsBlock: {
    marginTop: 32,
    gap: 8,
  },
  quickPrompt: {
    padding: 14,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  contextChipsBlock: {
    marginTop: 28,
    padding: 16,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: '#9DBFB266',
  },
  contextChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  contextChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: tokens.radii.pill,
    backgroundColor: tokens.semantic.bgBase,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  bubble: {
    maxWidth: '85%',
    padding: 14,
    borderRadius: 18,
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: tokens.semantic.accent,
    borderBottomRightRadius: 6,
  },
  bubbleAssistant: {
    alignSelf: 'flex-start',
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: '#9DBFB266',
    borderBottomLeftRadius: 6,
  },
  inputWrap: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgBase,
  },
  input: {
    minHeight: 48,
    maxHeight: 140,
    padding: 12,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgElevated,
    color: tokens.semantic.textPrimary,
    fontFamily: tokens.fonts.body,
    fontSize: 16,
    lineHeight: 23,
    textAlignVertical: 'top',
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  sendBtn: {
    backgroundColor: tokens.semantic.accent,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: tokens.radii.pill,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
