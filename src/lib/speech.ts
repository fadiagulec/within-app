/**
 * SOMA — Browser text-to-speech wrapper.
 *
 * Uses the standard Web Speech API (`speechSynthesis`) — built into every
 * modern browser. No API key, no recurring cost, no audio file required.
 *
 * Voice quality varies by OS:
 *   - macOS / iOS Safari: highest (Samantha, Karen, Daniel, etc.)
 *   - Windows: good (David, Zira, Hazel)
 *   - Android: decent (Google voices)
 *
 * Native (RN iOS/Android) fallback: graceful no-op for now. When real audio
 * recordings are uploaded into /assets/audio/, native AudioPlayer takes over
 * and this module is bypassed entirely on those screens.
 */

import { Platform } from 'react-native';

export interface VoicePreference {
  /** Preferred speaking rate. 1.0 = normal. We default a touch slow for guided meditation. */
  rate: number;
  /** Preferred pitch. 1.0 = normal. */
  pitch: number;
  /** Preferred volume 0-1. */
  volume: number;
  /** Preferred language. Empty → auto. */
  lang: string;
  /** Preferred voice URI (browser-specific). Empty → first available for `lang`. */
  voiceURI?: string;
}

export const DEFAULT_VOICE: VoicePreference = {
  rate: 0.82,    // slow — guided / meditative, not chirpy
  pitch: 0.92,   // slightly lower — calmer
  volume: 0.7,   // softer — so the fallback voice doesn't feel like shouting
  lang: 'en-US',
};

/**
 * Heuristic list of "calm" voice URI substrings we prefer when picking
 * a Web Speech voice. Falls back to first English voice if none match.
 * (When ElevenLabs is configured we don't hit this code path at all.)
 */
const PREFERRED_VOICE_HINTS = [
  // Apple — soft / measured
  'samantha',
  'karen',
  'moira',
  'fiona',
  'tessa',
  // Google — warmer female voices
  'google uk english female',
  'google us english',
  // Microsoft natural — much gentler than the legacy SAPI voices
  'aria',
  'jenny',
  'sonia',
  'libby',
];

export interface SpeechHandle {
  /** True while audio is actively being spoken. */
  isPlaying: () => boolean;
  /** Stop immediately + cancel any queued utterances. */
  stop: () => void;
  /** Pause (resume with .resume()). */
  pause: () => void;
  resume: () => void;
}

/**
 * True if the current platform supports text-to-speech via Web Speech API.
 * On native (iOS/Android) we return false — there are RN libraries we could
 * use later (expo-speech) but for the web preview this is enough.
 */
export function isSpeechSupported(): boolean {
  if (Platform.OS !== 'web') return false;
  if (typeof window === 'undefined') return false;
  return typeof window.speechSynthesis !== 'undefined';
}

/**
 * Speak a string. Returns a handle for stop/pause control. Cancels any
 * currently-speaking utterance first so you can't stack overlapping voices.
 */
export function speak(
  text: string,
  voice: Partial<VoicePreference> = {}
): SpeechHandle | null {
  if (!isSpeechSupported() || !text) return null;
  const synth = window.speechSynthesis;

  // Cancel anything in progress so two plays never overlap
  try {
    synth.cancel();
  } catch {
    // ignore
  }

  const u = new SpeechSynthesisUtterance(text);
  const cfg = { ...DEFAULT_VOICE, ...voice };
  u.rate = cfg.rate;
  u.pitch = cfg.pitch;
  u.volume = cfg.volume;
  u.lang = cfg.lang;

  // Pick a voice matching lang preference if available.
  // We try, in order:
  //   1. An explicit voiceURI override
  //   2. One of the preferred calm voices (Samantha / Aria / Google UK female / etc.)
  //   3. Any English voice that doesn't sound chirpy (no 'Microsoft Zira', no default Mac novelty voices)
  //   4. First English voice
  const voices = synth.getVoices();
  if (voices.length > 0) {
    let chosen: SpeechSynthesisVoice | undefined;
    if (cfg.voiceURI) {
      chosen = voices.find((v) => v.voiceURI === cfg.voiceURI);
    }
    if (!chosen) {
      const lc = (v: SpeechSynthesisVoice) => `${v.name} ${v.voiceURI}`.toLowerCase();
      // Prefer the calm-voice hints, in priority order.
      for (const hint of PREFERRED_VOICE_HINTS) {
        chosen = voices.find((v) => lc(v).includes(hint));
        if (chosen) break;
      }
    }
    if (!chosen) {
      // Avoid the loud / robotic ones explicitly.
      const bad = ['zira', 'novelty', 'whisper', 'shouting', 'cellos'];
      chosen = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('en') &&
          !bad.some((b) => v.name.toLowerCase().includes(b))
      );
    }
    if (!chosen) {
      chosen = voices.find((v) => v.lang.startsWith(cfg.lang.split('-')[0] ?? 'en'));
    }
    if (chosen) u.voice = chosen;
  }

  let speaking = true;
  u.onend = () => {
    speaking = false;
  };
  u.onerror = () => {
    speaking = false;
  };

  synth.speak(u);

  return {
    isPlaying: () => speaking && synth.speaking,
    stop: () => {
      speaking = false;
      try {
        synth.cancel();
      } catch {
        // ignore
      }
    },
    pause: () => {
      try {
        synth.pause();
      } catch {
        // ignore
      }
    },
    resume: () => {
      try {
        synth.resume();
      } catch {
        // ignore
      }
    },
  };
}

/**
 * Stop any active speech globally — useful from cleanup hooks.
 */
export function stopAllSpeech(): void {
  if (!isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    // ignore
  }
}

/**
 * Return all available voices on the current platform. May be empty on first
 * call (some browsers load voices async); call again after a short delay or
 * after the `voiceschanged` event fires.
 */
export function listVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return [];
  return window.speechSynthesis.getVoices();
}
