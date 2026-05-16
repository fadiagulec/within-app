/**
 * Within — ElevenLabs client.
 *
 * Web-only client that POSTs to /api/tts (our Vercel proxy) and plays the
 * returned MP3 in the browser. Returns the same SpeechHandle shape as
 * the Web Speech wrapper, so SpeechPlayer can swap between providers
 * transparently.
 *
 * If the proxy returns 503 (no API key configured) or any other error,
 * this returns `null` and the caller (SpeechPlayer) falls back to the
 * browser's built-in speechSynthesis. Nothing breaks if the env var
 * isn't set.
 *
 * Tiny in-memory cache so repeat plays of the same text (re-render,
 * re-open) reuse the same blob URL instead of refetching.
 */

import { Platform } from 'react-native';
import type { SpeechHandle } from './speech';
import {
  ELEVENLABS_VOICE_ID,
  ELEVENLABS_MODEL_ID,
  TTS_PROXY_PATH,
} from '@/coach/voiceConfig';

interface CacheEntry {
  url: string;
  refs: number;
}

const cache = new Map<string, CacheEntry>();

function cacheKey(text: string, voiceId: string): string {
  return `${voiceId}::${text}`;
}

/**
 * Returns true only on web (where we have fetch + HTMLAudioElement).
 * Native uses Web Speech (no) or expo-av (not wired here yet).
 */
export function isElevenLabsSupported(): boolean {
  return Platform.OS === 'web' && typeof window !== 'undefined' && typeof Audio !== 'undefined';
}

/**
 * Speak text via ElevenLabs proxy. Returns a SpeechHandle on success, or
 * `null` if the proxy refused (e.g. missing env var) — caller should
 * then fall back to the Web Speech wrapper.
 */
export async function speakViaElevenLabs(
  text: string,
  voiceId: string = ELEVENLABS_VOICE_ID,
  modelId: string = ELEVENLABS_MODEL_ID
): Promise<SpeechHandle | null> {
  if (!isElevenLabsSupported() || !text) return null;

  const key = cacheKey(text, voiceId);
  let entry = cache.get(key);

  if (!entry) {
    try {
      const resp = await fetch(TTS_PROXY_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceId, modelId }),
      });

      if (!resp.ok) {
        // 503 = no API key configured. Anything else = upstream/network error.
        return null;
      }

      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      entry = { url, refs: 0 };
      cache.set(key, entry);
    } catch {
      return null;
    }
  }

  entry.refs += 1;

  const audio = new Audio(entry.url);
  audio.preload = 'auto';

  let ended = false;
  let playing = false;

  audio.addEventListener('ended', () => {
    ended = true;
    playing = false;
  });
  audio.addEventListener('pause', () => {
    if (!ended) playing = false;
  });
  audio.addEventListener('play', () => {
    playing = true;
  });
  audio.addEventListener('error', () => {
    ended = true;
    playing = false;
  });

  // Try to play. Browsers may block autoplay without a gesture — but
  // SpeechPlayer is always behind a user tap, so this should succeed.
  try {
    await audio.play();
    playing = true;
  } catch {
    // Couldn't start — drop the ref + bail.
    releaseEntry(key);
    return null;
  }

  const handle: SpeechHandle = {
    isPlaying: () => playing && !ended,
    stop: () => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {
        // ignore
      }
      ended = true;
      playing = false;
      releaseEntry(key);
    },
    pause: () => {
      try {
        audio.pause();
      } catch {
        // ignore
      }
    },
    resume: () => {
      try {
        void audio.play();
      } catch {
        // ignore
      }
    },
  };

  return handle;
}

function releaseEntry(key: string) {
  const entry = cache.get(key);
  if (!entry) return;
  entry.refs -= 1;
  // Keep the URL alive while any active handle still holds a ref.
  // We never revoke aggressively — letting subsequent plays reuse the
  // same blob is far better than revoking + refetching the same audio.
  if (entry.refs < 0) entry.refs = 0;
}

/**
 * Drop everything in the cache. Useful for sign-out / dev reset. Revokes
 * all blob URLs so the browser can reclaim the memory.
 */
export function clearElevenLabsCache(): void {
  for (const entry of cache.values()) {
    try {
      URL.revokeObjectURL(entry.url);
    } catch {
      // ignore
    }
  }
  cache.clear();
}
