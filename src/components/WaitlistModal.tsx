/**
 * WaitlistModal — captures email + optional name for a waitlist signup.
 *
 * Usage:
 *   <WaitlistModal
 *     visible={open}
 *     onClose={() => setOpen(false)}
 *     itemId="signature-fusion"
 *     itemTitle="The Signature Retreat"
 *     accent="#CFB57E"
 *   />
 */

import React, { useState } from 'react';
import { View, StyleSheet, Modal, Pressable, TextInput } from 'react-native';

import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { useWaitlistStore } from '@/store/useWaitlistStore';

interface Props {
  visible: boolean;
  onClose: () => void;
  itemId: string;
  itemTitle: string;
  accent?: string;
}

export function WaitlistModal({ visible, onClose, itemId, itemTitle, accent }: Props) {
  const a = accent ?? tokens.semantic.accent;
  const add = useWaitlistStore((s) => s.add);
  const isOnWaitlist = useWaitlistStore((s) => s.isOnWaitlist);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const alreadyOn = isOnWaitlist(itemId);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = validEmail && !submitting;

  async function submit() {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await add({
        itemId,
        itemTitle,
        email: email.trim(),
        name: name.trim() || undefined,
      });
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  function close() {
    setEmail('');
    setName('');
    setDone(false);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={close}
    >
      <View style={[styles.root, { borderTopColor: a }]}>
        <View style={styles.header}>
          <Pressable
            onPress={close}
            hitSlop={14}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Text variant="body" color={tokens.semantic.textSecondary}>
              Close
            </Text>
          </Pressable>
          <Text variant="mono" color={a} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            WAITLIST
          </Text>
          <View style={{ width: 50 }} />
        </View>

        {/* Content */}
        {done || alreadyOn ? (
          <View style={styles.body}>
            <View style={[styles.successCard, { borderColor: a, backgroundColor: `${a}1F` }]}>
              <Text variant="mono" color={a} style={{ fontSize: 11, letterSpacing: 1.8 }}>
                {alreadyOn && !done ? 'ALREADY ON' : 'YOU ARE ON'}
              </Text>
              <Text variant="heading2" color={tokens.semantic.textPrimary} style={{ marginTop: 8, fontSize: 26 }}>
                {itemTitle}
              </Text>
              <Text
                variant="body"
                color={tokens.semantic.textPrimary}
                style={{ marginTop: 16, fontSize: 15, lineHeight: 23 }}
              >
                When the next cohort opens, you will be one of the first to know.
                Application links go out to the waitlist before they go anywhere
                else.
              </Text>
              <Text
                variant="bodySmall"
                color={tokens.semantic.textSecondary}
                style={{ marginTop: 16, fontSize: 13, lineHeight: 20 }}
              >
                Your email is stored on this device. Nothing is sent anywhere
                automatically — until we have a backend, the founder is exporting
                signups manually.
              </Text>
            </View>
            <Button
              block
              size="lg"
              variant="ghost"
              style={{ marginTop: 28 }}
              onPress={close}
              accessibilityLabel="Done"
            >
              Done
            </Button>
          </View>
        ) : (
          <View style={styles.body}>
            <Text variant="eyebrow" color={a}>
              JOIN THE WAITLIST
            </Text>
            <Text variant="heading1" style={{ marginTop: 6, fontSize: 28 }}>
              {itemTitle}
            </Text>
            <Text
              variant="body"
              color={tokens.semantic.textSecondary}
              style={{ marginTop: 12, fontSize: 15, lineHeight: 22 }}
            >
              Drop your email — when the next cohort is announced, you will be
              the first to know.
            </Text>

            <View style={{ marginTop: 24 }}>
              <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.label}>
                YOUR EMAIL
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={tokens.semantic.textTertiary}
                style={styles.input}
                accessibilityLabel="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={{ marginTop: 18 }}>
              <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.label}>
                YOUR NAME (OPTIONAL)
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="What should we call you?"
                placeholderTextColor={tokens.semantic.textTertiary}
                style={styles.input}
                accessibilityLabel="Your name"
              />
            </View>

            <Button
              block
              size="lg"
              style={{ marginTop: 32 }}
              onPress={submit}
              disabled={!canSubmit}
              loading={submitting}
              accessibilityLabel="Join the waitlist"
            >
              {validEmail ? 'Join the waitlist' : 'Enter a valid email'}
            </Button>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: tokens.semantic.bgBase,
    borderTopWidth: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 11,
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
    borderRadius: tokens.radii.md,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 17,
    color: tokens.semantic.textPrimary,
    fontFamily: tokens.fonts.body,
  },
  successCard: {
    padding: 22,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
  },
});
