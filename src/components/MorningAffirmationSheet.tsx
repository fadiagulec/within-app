/**
 * MorningAffirmationSheet — the daily-blessing modal.
 *
 * Appears on first app open of each new day (driven by the
 * useMorningAffirmationStore.shouldShowToday() check inside _layout).
 * Three actions: Receive (dismiss), Save to journal, Listen (TTS).
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from '@/lib/haptic';

import { Text } from '@/components/Text';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import { tokens } from '@/theme/tokens';
import {
  getDailyAffirmation,
  CATEGORY_META,
} from '@/data/morning-affirmations';
import { useMorningAffirmationStore } from '@/store/useMorningAffirmationStore';
import { useJournalStore } from '@/store/useJournalStore';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function MorningAffirmationSheet({ visible, onClose }: Props) {
  const router = useRouter();
  const markShownToday = useMorningAffirmationStore((s) => s.markShownToday);
  const addJournalEntry = useJournalStore((s) => s.addEntry);

  const affirmation = React.useMemo(() => getDailyAffirmation(), []);
  const meta = CATEGORY_META[affirmation.category];

  // Soft fade-in animation when the sheet appears
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    if (visible) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {}
      );
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      opacity.setValue(0);
      translateY.setValue(40);
    }
  }, [visible, opacity, translateY]);

  function dismiss() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    markShownToday();
    onClose();
  }

  function saveToJournal() {
    addJournalEntry({
      promptId: `morning-affirmation-${affirmation.id}`,
      promptText: 'Today\'s blessing',
      body: affirmation.text,
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );
    markShownToday();
    onClose();
    // Soft hand-off to journal so the user can extend the reflection
    setTimeout(() => {
      router.push({
        pathname: '/journal/write',
        params: {
          prompt: `Today's affirmation: "${affirmation.text}". What in your day will this touch?`,
          promptId: `morning-affirmation-${affirmation.id}`,
        },
      });
    }, 250);
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={dismiss}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={dismiss} />
        <Animated.View
          style={[
            styles.sheet,
            { opacity, transform: [{ translateY }] },
          ]}
        >
          <LinearGradient
            colors={[`${meta.color}22`, 'transparent']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          {/* Close X */}
          <Pressable
            onPress={dismiss}
            style={styles.closeBtn}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Close affirmation"
          >
            <Text variant="body" color={tokens.semantic.textTertiary} style={{ fontSize: 18 }}>
              ✕
            </Text>
          </Pressable>

          {/* Eyebrow */}
          <View style={styles.eyebrowRow}>
            <View style={[styles.dot, { backgroundColor: meta.color }]} />
            <Text
              variant="mono"
              color={meta.color}
              style={{ fontSize: 11, letterSpacing: 2 }}
            >
              TODAY · {meta.label.toUpperCase()}
            </Text>
          </View>

          {/* The affirmation itself */}
          <Text
            variant="displayItalic"
            color={tokens.semantic.textPrimary}
            style={styles.affirmationText}
          >
            {affirmation.text}
          </Text>

          {/* Soft instruction */}
          <Text
            variant="body"
            color={tokens.semantic.textSecondary}
            style={styles.instruction}
          >
            Read it once. Then again. Let it land in the body before the day asks anything of you.
          </Text>

          {/* TTS — listen in the practitioner voice */}
          <View style={styles.listenWrap}>
            <SpeechPlayer
              text={affirmation.text}
              accent={meta.color}
              label="LISTEN"
              size="sm"
            />
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable
              onPress={dismiss}
              style={[styles.action, styles.actionSecondary]}
              accessibilityRole="button"
              accessibilityLabel="Receive — close the affirmation"
            >
              <Text variant="body" color={tokens.semantic.textSecondary} style={{ fontSize: 14 }}>
                Receive
              </Text>
            </Pressable>
            <Pressable
              onPress={saveToJournal}
              style={[styles.action, { backgroundColor: meta.color }]}
              accessibilityRole="button"
              accessibilityLabel="Save this affirmation to journal"
            >
              <Text variant="body" color="#FFFFFF" style={{ fontSize: 14 }}>
                Anchor in journal →
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(58, 53, 64, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  sheet: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.xl,
    padding: 28,
    paddingTop: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  affirmationText: {
    fontSize: 26,
    lineHeight: 38,
    letterSpacing: 0.2,
  },
  instruction: {
    marginTop: 18,
    fontSize: 14,
    lineHeight: 22,
  },
  listenWrap: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  actions: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 10,
  },
  action: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: tokens.radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  actionSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
  },
});
