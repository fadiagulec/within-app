/**
 * SpeechPlayer — small play/stop button that narrates a string of text
 * using the browser's built-in text-to-speech.
 *
 * Auto-stops on unmount. Cancels any other in-progress speech when started
 * (so two of these can't talk over each other). Hides itself entirely on
 * platforms without speech support — caller doesn't need to feature-detect.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { isSpeechSupported, speak, type SpeechHandle } from '@/lib/speech';
import {
  isElevenLabsSupported,
  speakViaElevenLabs,
} from '@/lib/speech-elevenlabs';

interface Props {
  text: string;
  /** Hex color used for the button accent. */
  accent?: string;
  /** Pre-button label. Default "Read aloud". */
  label?: string;
  /** Speaking rate (1.0 = normal). Default 0.92 — slightly slow for guided. */
  rate?: number;
  /** Visual size. */
  size?: 'sm' | 'md';
  /** Override the ElevenLabs voice id (e.g. COACH_VOICE_ID for the
   *  coaching-session experience). Defaults to the app voice. */
  voiceId?: string;
}

export function SpeechPlayer({
  text,
  accent,
  label,
  rate = 0.92,
  size = 'md',
  voiceId,
}: Props) {
  const a = accent ?? tokens.semantic.accent;
  const handleRef = useRef<SpeechHandle | null>(null);
  const [playing, setPlaying] = useState(false);
  // IMPORTANT: declare ALL hooks before any conditional return. React enforces
  // hook order across renders, and an early-return between hooks throws
  // "Rendered fewer hooks than expected" if `supported` ever flips.
  const [supported] = useState(() => isSpeechSupported());
  const [loading, setLoading] = useState(false);

  // Stop on unmount + when text changes
  useEffect(() => {
    return () => {
      handleRef.current?.stop();
      handleRef.current = null;
    };
  }, []);

  // Stop if the text changes mid-play (e.g. user advances to next step)
  useEffect(() => {
    if (handleRef.current && handleRef.current.isPlaying()) {
      handleRef.current.stop();
      setPlaying(false);
    }
  }, [text]);

  // Poll the handle's playing state — Web Speech API doesn't fire a stop event
  // we can hook into reliably across browsers. Cheap polling solves this.
  useEffect(() => {
    if (!playing) return;
    const i = setInterval(() => {
      if (!handleRef.current?.isPlaying()) {
        setPlaying(false);
      }
    }, 400);
    return () => clearInterval(i);
  }, [playing]);

  // Conditional render — safe AFTER every hook above has run.
  if (!supported && !isElevenLabsSupported()) return null;

  async function toggle() {
    if (playing) {
      handleRef.current?.stop();
      handleRef.current = null;
      setPlaying(false);
      return;
    }

    // Try ElevenLabs first (web only, falls back if proxy returns 503 or
    // network error). This is awaitable because the API call has latency
    // — usually ~1-3s for short text, longer for full healing scripts.
    if (isElevenLabsSupported()) {
      setLoading(true);
      const h = await speakViaElevenLabs(text, voiceId);
      setLoading(false);
      if (h) {
        handleRef.current = h;
        setPlaying(true);
        return;
      }
      // Fell through — try Web Speech API as fallback.
    }

    const h = speak(text, { rate });
    if (h) {
      handleRef.current = h;
      setPlaying(true);
    }
  }

  const dims = size === 'sm'
    ? { padHoriz: 10, padVert: 6, fontSize: 11, iconSize: 12 }
    : { padHoriz: 14, padVert: 8, fontSize: 12, iconSize: 14 };

  return (
    <Pressable
      onPress={toggle}
      accessibilityRole="button"
      accessibilityLabel={playing ? 'Stop narration' : 'Read aloud'}
      style={[
        styles.btn,
        {
          paddingHorizontal: dims.padHoriz,
          paddingVertical: dims.padVert,
          borderColor: a,
          backgroundColor: playing ? `${a}33` : `${a}14`,
        },
      ]}
    >
      <View style={styles.row}>
        <Text variant="mono" color={a} style={{ fontSize: dims.iconSize }}>
          {loading ? '◌' : playing ? '◼' : '▶'}
        </Text>
        <Text variant="mono" color={a} style={{ fontSize: dims.fontSize, letterSpacing: 1.4 }}>
          {loading ? 'PREPARING…' : playing ? 'STOP' : (label ?? 'READ ALOUD')}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-start',
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
