/**
 * FrequencyPlayer — per-chakra healing tone player.
 *
 * Reads CHAKRA_SPINE entry and renders the frequency info + a duration
 * picker + a play button. When `frequencyAudio` is wired (audio asset
 * uploaded into the spine), the play button uses expo-av to loop the tone.
 * Until then, shows a calm "audio is being prepared" state and offers
 * the chakra's primary breathwork as an alternative.
 *
 * Drops into any screen — currently used in app/chakra/[id].tsx.
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { CHAKRA_SPINE, SpineChakraId } from '@/data/chakra-spine';

// ─── Web Audio fallback (web only) ─────────────────────────────
// When no MP3 is uploaded for a chakra, we generate the actual healing
// tone in-browser via the Web Audio API. Sine wave at the chakra's Hz
// with gentle fade-in/out so it doesn't click on start/stop.

interface WebToneHandles {
  ctx: AudioContext;
  osc: OscillatorNode;
  gain: GainNode;
}

function startWebTone(hz: number): WebToneHandles | null {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return null;
  const ctx = new Ctx();
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = hz;
  const gain = ctx.createGain();
  // Fade-in over 0.6s — soft, no click
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.6);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  return { ctx, osc, gain };
}

function stopWebTone(handles: WebToneHandles | null) {
  if (!handles) return;
  const { ctx, osc, gain } = handles;
  try {
    // Fade-out over 0.4s, then stop + close
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    setTimeout(() => {
      try {
        osc.stop();
        osc.disconnect();
        gain.disconnect();
        ctx.close().catch(() => {});
      } catch {
        // already closed
      }
    }, 450);
  } catch {
    // ignore
  }
}

interface Props {
  chakraId: SpineChakraId;
}

const DURATION_OPTIONS = [5, 10, 15] as const;
type Duration = (typeof DURATION_OPTIONS)[number];

export function FrequencyPlayer({ chakraId }: Props) {
  const router = useRouter();
  const chakra = CHAKRA_SPINE[chakraId];
  const accent = chakra.color;

  const [duration, setDuration] = useState<Duration>(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingSec, setRemainingSec] = useState(duration * 60);

  const soundRef = useRef<Audio.Sound | null>(null);
  const webToneRef = useRef<WebToneHandles | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      const s = soundRef.current;
      if (s) {
        s.setOnPlaybackStatusUpdate(null);
        s.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
      stopWebTone(webToneRef.current);
      webToneRef.current = null;
    };
  }, []);

  // Reset remaining when duration changes (and not currently playing)
  useEffect(() => {
    if (!isPlaying) setRemainingSec(duration * 60);
  }, [duration, isPlaying]);

  async function start() {
    // Three-tier playback strategy:
    //   1. If a real audio asset exists, use expo-av (best quality, native + web)
    //   2. Else if we're on web with a known frequency, generate the tone live
    //      via Web Audio API (works in any browser, no asset upload needed)
    //   3. Else (native + no asset) — caller never reaches this branch; the
    //      placeholder UI shows instead.

    if (chakra.frequencyAudio) {
      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          allowsRecordingIOS: false,
          playThroughEarpieceAndroid: false,
        });
      } catch {
        // ignore on web
      }
      const { sound } = await Audio.Sound.createAsync(
        { uri: chakra.frequencyAudio },
        { shouldPlay: true, isLooping: true, volume: 0.6 }
      );
      soundRef.current = sound;
    } else if (Platform.OS === 'web' && chakra.frequencyHz) {
      webToneRef.current = startWebTone(chakra.frequencyHz);
      if (!webToneRef.current) return; // browser doesn't support Web Audio
    } else {
      return; // nothing playable
    }

    setIsPlaying(true);
    setRemainingSec(duration * 60);
    tickRef.current = setInterval(() => {
      setRemainingSec((prev) => {
        if (prev <= 1) {
          void stop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function stop() {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    const s = soundRef.current;
    if (s) {
      s.setOnPlaybackStatusUpdate(null);
      await s.unloadAsync().catch(() => {});
      soundRef.current = null;
    }
    stopWebTone(webToneRef.current);
    webToneRef.current = null;
    setIsPlaying(false);
  }

  // Audio is "ready" if EITHER a real asset exists OR we're on web with a
  // known frequency we can synthesize. Soul Star (frequencyHz === null) on
  // web with no asset shows the placeholder.
  const audioReady =
    Boolean(chakra.frequencyAudio) ||
    (Platform.OS === 'web' && chakra.frequencyHz !== null);

  function fmt(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  return (
    <View
      style={[
        styles.card,
        { borderColor: `${accent}66`, backgroundColor: `${accent}14` },
      ]}
    >
      {/* Header — frequency display */}
      <View style={styles.header}>
        <View>
          <Text variant="mono" color={accent} style={{ fontSize: 11, letterSpacing: 2 }}>
            HEALING FREQUENCY
          </Text>
          <Text
            variant="heading1"
            color={tokens.semantic.textPrimary}
            style={{ marginTop: 6, fontSize: 36 }}
          >
            {chakra.frequencyHz ? `${chakra.frequencyHz} Hz` : 'Silence'}
          </Text>
          <Text
            variant="displayItalic"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 2, fontSize: 18 }}
          >
            {chakra.syllable}
          </Text>
        </View>
        {isPlaying ? (
          <Text variant="mono" color={accent} style={{ fontSize: 22 }}>
            {fmt(remainingSec)}
          </Text>
        ) : null}
      </View>

      {/* Duration picker */}
      <View style={styles.durationRow}>
        {DURATION_OPTIONS.map((d) => {
          const active = d === duration;
          return (
            <Pressable
              key={d}
              onPress={() => !isPlaying && setDuration(d)}
              accessibilityRole="button"
              accessibilityLabel={`Set duration to ${d} minutes`}
              accessibilityState={{ selected: active, disabled: isPlaying }}
              style={[
                styles.durationCell,
                active && {
                  backgroundColor: `${accent}33`,
                  borderColor: accent,
                },
                isPlaying && { opacity: 0.5 },
              ]}
            >
              <Text
                variant="mono"
                color={active ? tokens.semantic.textPrimary : tokens.semantic.textSecondary}
                style={{ fontSize: 14 }}
              >
                {d} min
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Play / Stop button */}
      {audioReady ? (
        <Pressable
          onPress={isPlaying ? stop : start}
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Stop frequency' : `Play ${chakra.frequencyHz}Hz tone`}
          style={[styles.playBtn, { backgroundColor: accent }]}
        >
          <Text variant="body" color={tokens.semantic.textOnGold} style={{ fontSize: 15 }}>
            {isPlaying ? 'Stop' : `Play · ${duration} min`}
          </Text>
        </Pressable>
      ) : (
        // Audio not yet uploaded — show calm placeholder + alternative
        <View style={[styles.placeholder, { borderColor: `${accent}55` }]}>
          <Text variant="mono" color={accent} style={{ fontSize: 11, letterSpacing: 1.5 }}>
            AUDIO PREPARING
          </Text>
          <Text
            variant="body"
            color={tokens.semantic.textPrimary}
            style={{ marginTop: 6, fontSize: 14, lineHeight: 21 }}
          >
            The {chakra.frequencyHz ? `${chakra.frequencyHz}Hz tone` : 'silent practice'} for this
            chakra is being added. Until then, use the breath below.
          </Text>
          {chakra.breathworkIds[0] ? (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/breathwork/[id]',
                  params: { id: chakra.breathworkIds[0]! },
                })
              }
              accessibilityRole="button"
              accessibilityLabel="Open recommended breath"
              style={{ marginTop: 12 }}
            >
              <Text variant="body" color={accent} style={{ fontSize: 14 }}>
                Open recommended breath →
              </Text>
            </Pressable>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 20,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  durationRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 8,
  },
  durationCell: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
    backgroundColor: tokens.semantic.bgElevated,
    alignItems: 'center',
  },
  playBtn: {
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: tokens.radii.pill,
    alignItems: 'center',
  },
  placeholder: {
    marginTop: 16,
    padding: 14,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
  },
});
