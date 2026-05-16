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
  rate: 0.92,    // a touch slow — guided / meditative
  pitch: 1.0,
  volume: 0.95,
  lang: 'en-US',
};

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

  // Pick a voice matching lang preference if available
  const voices = synth.getVoices();
  if (voices.length > 0) {
    let chosen: SpeechSynthesisVoice | undefined;
    if (cfg.voiceURI) {
      chosen = voices.find((v) => v.voiceURI === cfg.voiceURI);
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
