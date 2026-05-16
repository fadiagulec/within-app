/**
 * Within — Dictation (speech-to-text).
 *
 * Thin wrapper around the browser's Web Speech Recognition API.
 *
 *   - Chrome / Edge / Safari → window.webkitSpeechRecognition or SpeechRecognition
 *   - Firefox → not supported (returns null, MicButton hides itself)
 *   - Native (React Native iOS/Android) → not wired yet
 *
 * Free. No API key. Runs in the browser. Most modern browsers do the
 * recognition on-device (Chrome on macOS, Safari iOS); a few still call
 * cloud STT. Either way the user is unaware — they just tap and speak.
 *
 * Returns a small handle: start() begins listening, stop() ends and
 * yields the final transcript. Interim transcripts stream via onInterim
 * so the input can show "live" text while the user is mid-sentence.
 */

import { Platform } from 'react-native';

interface SpeechRecognitionEventLike {
  results: ArrayLike<{
    isFinal: boolean;
    [index: number]: { transcript: string };
  }>;
  resultIndex: number;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
}

export interface DictationHandle {
  /** True while the mic is open. */
  isListening: () => boolean;
  /** Stop the recognizer. Returns the final transcript. */
  stop: () => string;
  /** Abort without emitting a final result. */
  abort: () => void;
}

export function isDictationSupported(): boolean {
  if (Platform.OS !== 'web') return false;
  if (typeof window === 'undefined') return false;
  const w = window as any;
  return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
}

interface StartOptions {
  /** Called with the live (interim) transcript as the user speaks. */
  onInterim?: (text: string) => void;
  /** Called once when recognition ends, with the final transcript. */
  onFinal?: (text: string) => void;
  /** Called on permission denied / no-speech / network error. */
  onError?: (err: string) => void;
  /** Language tag. Defaults to user's browser language or 'en-US'. */
  lang?: string;
}

/**
 * Begin a dictation session. Returns a handle for stop/abort, or null
 * if the browser doesn't support speech recognition.
 *
 * The session auto-stops on silence (~3-5s depending on browser). If
 * you want to keep listening indefinitely until the user taps Stop,
 * call this in `continuous: true` mode by stopping + restarting when
 * the result fires — but for journal/gratitude single-input use, the
 * default behavior is what you want.
 */
export function startDictation(opts: StartOptions = {}): DictationHandle | null {
  if (!isDictationSupported()) return null;

  const w = window as any;
  const Ctor = (w.SpeechRecognition ?? w.webkitSpeechRecognition) as new () => SpeechRecognitionLike;
  const rec = new Ctor();

  rec.continuous = true;
  rec.interimResults = true;
  rec.lang = opts.lang ?? (typeof navigator !== 'undefined' ? navigator.language || 'en-US' : 'en-US');

  let finalText = '';
  let listening = true;

  rec.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const result = e.results[i]!;
      const text = result[0]?.transcript ?? '';
      if (result.isFinal) {
        finalText += (finalText ? ' ' : '') + text.trim();
      } else {
        interim += text;
      }
    }
    if (interim && opts.onInterim) {
      opts.onInterim(finalText ? `${finalText} ${interim}`.trim() : interim.trim());
    }
  };

  rec.onerror = (e: any) => {
    const code = e?.error ?? 'unknown';
    if (opts.onError) opts.onError(String(code));
  };

  rec.onend = () => {
    listening = false;
    if (opts.onFinal) opts.onFinal(finalText.trim());
  };

  try {
    rec.start();
  } catch {
    // Some browsers throw if already running — abort + retry once
    try {
      rec.abort();
      rec.start();
    } catch {
      return null;
    }
  }

  return {
    isListening: () => listening,
    stop: () => {
      try {
        rec.stop();
      } catch {
        // ignore
      }
      listening = false;
      return finalText.trim();
    },
    abort: () => {
      try {
        rec.abort();
      } catch {
        // ignore
      }
      listening = false;
    },
  };
}
