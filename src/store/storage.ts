/**
 * Hardened AsyncStorage adapter for Zustand `persist`.
 *
 * Wraps every method in try/catch so the app never crashes when:
 *   - Mobile Safari private browsing throws QuotaExceededError on write
 *   - Storage is disabled entirely (some embedded WebViews)
 *   - A stored JSON payload was corrupted (parse fails downstream → null)
 *   - Native I/O fails on Android cold-start (rare, but does happen)
 *
 * Failed reads return `null` — Zustand `persist` will then hydrate from the
 * store's default state instead of crashing on unhandled rejection. Failed
 * writes are swallowed (logged in __DEV__) so the action that triggered the
 * write doesn't tear down (e.g. saving a journal entry on quota exceeded).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware';

const isDev = typeof __DEV__ !== 'undefined' && __DEV__;

export const zustandAsyncStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(name);
      return value ?? null;
    } catch (err) {
      if (isDev) console.warn(`[storage] getItem(${name}) failed:`, err);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (err) {
      // Swallow — caller (a store action) must continue. Storage failure
      // shouldn't tear down the user's session.
      if (isDev) console.warn(`[storage] setItem(${name}) failed:`, err);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (err) {
      if (isDev) console.warn(`[storage] removeItem(${name}) failed:`, err);
    }
  },
};
