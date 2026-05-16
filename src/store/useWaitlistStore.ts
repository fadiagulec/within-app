/**
 * SOMA — Waitlist signups (retreats + courses).
 *
 * v1: stores signups locally on device. Admin can export the list as CSV
 *     from /admin/waitlist.
 * v2: when a real backend exists (Formspree / your Vercel function /
 *     Mailchimp), POST the entry on submit and keep the local copy as
 *     a fallback. Add the endpoint URL to ENDPOINT below — the store
 *     already wires the network call, it just no-ops while ENDPOINT is null.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';

/**
 * Set this to your Formspree (or other) endpoint to start collecting
 * waitlist emails server-side. Until then, signups are stored locally.
 *   Example: 'https://formspree.io/f/abcd1234'
 */
const ENDPOINT: string | null = null;

export interface WaitlistEntry {
  /** Stable id of the retreat or course they signed up for. */
  itemId: string;
  /** Display name of the item — for the admin export. */
  itemTitle: string;
  email: string;
  name?: string;
  timestamp: number;
  /** Was this entry successfully POSTed to the server? */
  syncedToServer: boolean;
}

interface WaitlistState {
  entries: WaitlistEntry[];
  add: (entry: Omit<WaitlistEntry, 'timestamp' | 'syncedToServer'>) => Promise<void>;
  isOnWaitlist: (itemId: string) => boolean;
  clear: () => void;
  /** Returns CSV string of all entries. */
  exportCSV: () => string;
}

export const useWaitlistStore = create<WaitlistState>()(
  persist(
    (set, get) => ({
      entries: [],

      add: async (entry) => {
        // De-dupe — don't store the same email for the same item twice
        const existing = get().entries.find(
          (e) =>
            e.itemId === entry.itemId &&
            e.email.toLowerCase() === entry.email.toLowerCase()
        );
        if (existing) return;

        let synced = false;
        if (ENDPOINT) {
          try {
            const res = await fetch(ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({
                itemId: entry.itemId,
                itemTitle: entry.itemTitle,
                email: entry.email,
                name: entry.name,
              }),
            });
            synced = res.ok;
          } catch {
            // network error — keep local copy, will retry on next add (v2)
          }
        }

        set((state) => ({
          entries: [
            ...state.entries,
            { ...entry, timestamp: Date.now(), syncedToServer: synced },
          ],
        }));
      },

      isOnWaitlist: (itemId) =>
        get().entries.some((e) => e.itemId === itemId),

      clear: () => set({ entries: [] }),

      exportCSV: () => {
        const rows = [
          'timestamp,iso_date,item_id,item_title,name,email,synced',
        ];
        for (const e of get().entries) {
          const iso = new Date(e.timestamp).toISOString();
          // Escape commas/quotes in fields
          const esc = (v: string | undefined) =>
            v ? `"${v.replace(/"/g, '""')}"` : '';
          rows.push(
            [
              e.timestamp,
              iso,
              esc(e.itemId),
              esc(e.itemTitle),
              esc(e.name),
              esc(e.email),
              e.syncedToServer ? '1' : '0',
            ].join(',')
          );
        }
        return rows.join('\n');
      },
    }),
    {
      name: 'soma:waitlist',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
      migrate: (state) => state as WaitlistState,
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        const p = persisted as Partial<WaitlistState>;
        return {
          ...current,
          ...p,
          entries: Array.isArray(p.entries) ? p.entries : current.entries,
        };
      },
    }
  )
);
