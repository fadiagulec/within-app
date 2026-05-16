/**
 * SOMA — Lunar / cosmic feed.
 *
 * Pure-math moon-phase calculation (no API needed) + a small registry of
 * Mercury / Venus / Mars retrograde windows for the year.
 *
 * Returned shape feeds the Today-tab CosmicNote widget. Universal events
 * — no per-user astro data needed yet, so this works for everyone day one.
 *
 * v2 (when astrology lands): also surface transits hitting the user's
 * natal chart. That requires the ephemeris API call. This file stays as
 * the universal layer.
 */

// ============ MOON PHASE MATH ============
// Reference: known new moon at 2000-01-06 18:14 UTC, synodic month = 29.530588 days.
// Accuracy: ±1 day, which is plenty for a "tonight's note" widget.

const KNOWN_NEW_MOON = new Date('2000-01-06T18:14:00Z').getTime();
const SYNODIC_MONTH_MS = 29.530588 * 24 * 60 * 60 * 1000;

export type MoonPhase =
  | 'new'
  | 'waxing-crescent'
  | 'first-quarter'
  | 'waxing-gibbous'
  | 'full'
  | 'waning-gibbous'
  | 'last-quarter'
  | 'waning-crescent';

export interface MoonState {
  phase: MoonPhase;
  /** 0–1 — how far through the cycle (0 = new, 0.5 = full, 1 = next new). */
  cycleFraction: number;
  /** 0–1 — illumination (0 = new, 1 = full). */
  illumination: number;
  /** Days until next NEW moon (rounded). */
  daysToNextNew: number;
  /** Days until next FULL moon (rounded). */
  daysToNextFull: number;
}

export function moonStateFor(date: Date = new Date()): MoonState {
  const ms = date.getTime() - KNOWN_NEW_MOON;
  const cycles = ms / SYNODIC_MONTH_MS;
  const cycleFraction = ((cycles % 1) + 1) % 1; // [0, 1)

  // Illumination: 0 at new (0/1), 1 at full (0.5)
  const illumination = (1 - Math.cos(2 * Math.PI * cycleFraction)) / 2;

  let phase: MoonPhase;
  if (cycleFraction < 0.03 || cycleFraction > 0.97) phase = 'new';
  else if (cycleFraction < 0.22) phase = 'waxing-crescent';
  else if (cycleFraction < 0.28) phase = 'first-quarter';
  else if (cycleFraction < 0.47) phase = 'waxing-gibbous';
  else if (cycleFraction < 0.53) phase = 'full';
  else if (cycleFraction < 0.72) phase = 'waning-gibbous';
  else if (cycleFraction < 0.78) phase = 'last-quarter';
  else phase = 'waning-crescent';

  const fractionToNextNew = (1 - cycleFraction + 1) % 1;
  const daysToNextNew = Math.round((fractionToNextNew * SYNODIC_MONTH_MS) / (24 * 60 * 60 * 1000));

  const fractionToNextFull = ((0.5 - cycleFraction + 1) % 1);
  const daysToNextFull = Math.round((fractionToNextFull * SYNODIC_MONTH_MS) / (24 * 60 * 60 * 1000));

  return {
    phase,
    cycleFraction,
    illumination,
    daysToNextNew,
    daysToNextFull,
  };
}

// ============ RETROGRADE WINDOWS ============
// Approximate retrograde dates for the next ~18 months. Update annually.
// Sources vetted across multiple ephemeris references.

export interface RetrogradeWindow {
  planet: 'Mercury' | 'Venus' | 'Mars';
  start: string; // ISO date
  end: string;   // ISO date
}

export const RETROGRADES: RetrogradeWindow[] = [
  // 2026 Mercury retrogrades (~3x/year)
  { planet: 'Mercury', start: '2026-02-26', end: '2026-03-20' },
  { planet: 'Mercury', start: '2026-06-29', end: '2026-07-23' },
  { planet: 'Mercury', start: '2026-10-24', end: '2026-11-13' },
  // 2027 Mercury retrogrades
  { planet: 'Mercury', start: '2027-02-09', end: '2027-03-03' },
  { planet: 'Mercury', start: '2027-06-10', end: '2027-07-04' },
  { planet: 'Mercury', start: '2027-10-07', end: '2027-10-28' },

  // 2026 Venus retrograde (~once every 18 months)
  { planet: 'Venus', start: '2026-09-30', end: '2026-11-11' },

  // 2026 Mars retrograde (~once every 26 months — none in 2026)
  // Next Mars retrograde: late 2027 — populate when known.
];

export function activeRetrogrades(date: Date = new Date()): RetrogradeWindow[] {
  const t = date.getTime();
  return RETROGRADES.filter((w) => {
    const s = new Date(w.start).getTime();
    const e = new Date(w.end).getTime();
    return t >= s && t <= e;
  });
}

export function upcomingRetrogrades(
  date: Date = new Date(),
  withinDays = 14
): RetrogradeWindow[] {
  const t = date.getTime();
  const cutoff = t + withinDays * 24 * 60 * 60 * 1000;
  return RETROGRADES.filter((w) => {
    const s = new Date(w.start).getTime();
    return s > t && s <= cutoff;
  });
}

// ============ TODAY'S COSMIC NOTE ============
// Returns the single most relevant note for "tonight" — sorted by salience:
//   1. Active retrograde wins
//   2. New / full moon today or in next 2 days
//   3. Upcoming retrograde within 7 days
//   4. Otherwise the moon's current phase as a quiet ambient note

export interface CosmicNote {
  /** Short headline — for the chip / eyebrow. */
  headline: string;
  /** Plain-English explanation — sharp, brand voice. */
  body: string;
  /** Severity for visual styling: 'event' = strong, 'soft' = ambient. */
  tone: 'event' | 'soft';
  /** Optional hex color hint to tint the note card. */
  accent?: string;
}

export function todaysCosmicNote(date: Date = new Date()): CosmicNote {
  const moon = moonStateFor(date);
  const active = activeRetrogrades(date);
  const upcoming = upcomingRetrogrades(date, 7);

  // 1. Active retrograde
  if (active.length > 0 && active[0]) {
    const r = active[0];
    if (r.planet === 'Mercury') {
      return {
        headline: 'MERCURY RETROGRADE',
        body: 'Slow down on contracts, signed agreements, and sent emails. Re-check before you press send. Good window for re-doing, re-thinking, re-connecting.',
        tone: 'event',
        accent: '#A09784',
      };
    }
    if (r.planet === 'Venus') {
      return {
        headline: 'VENUS RETROGRADE',
        body: 'Old relationship patterns may surface for review. Not the best window for new commitments — great window for honest conversation about existing ones.',
        tone: 'event',
        accent: '#CCBBA8',
      };
    }
    return {
      headline: `${r.planet.toUpperCase()} RETROGRADE`,
      body: 'Energy turns inward. Use the pause.',
      tone: 'event',
      accent: '#A09784',
    };
  }

  // 2. New / full moon today or next 2 days
  if (moon.daysToNextNew <= 2) {
    return {
      headline: moon.daysToNextNew === 0 ? 'NEW MOON TONIGHT' : `NEW MOON IN ${moon.daysToNextNew} DAYS`,
      body: 'Set intentions. Plant the seed. The new moon is the quiet beginning — write down what you are calling in.',
      tone: 'event',
      accent: '#2D3833',
    };
  }
  if (moon.daysToNextFull <= 2) {
    return {
      headline: moon.daysToNextFull === 0 ? 'FULL MOON TONIGHT' : `FULL MOON IN ${moon.daysToNextFull} DAYS`,
      body: 'Release what no longer fits. The full moon is for letting go — write what you are ready to let leave.',
      tone: 'event',
      accent: '#CFB57E',
    };
  }

  // 3. Upcoming retrograde
  if (upcoming.length > 0 && upcoming[0]) {
    const r = upcoming[0];
    const days = Math.ceil((new Date(r.start).getTime() - date.getTime()) / (24 * 60 * 60 * 1000));
    return {
      headline: `${r.planet.toUpperCase()} RETROGRADE IN ${days}D`,
      body: `Heads up: ${r.planet} goes retrograde on ${formatDate(r.start)}. Wrap loose ends now.`,
      tone: 'soft',
      accent: '#A09784',
    };
  }

  // 4. Ambient — current moon phase
  const phaseLabels: Record<MoonPhase, { headline: string; body: string }> = {
    'new': { headline: 'NEW MOON', body: 'Quiet beginning. Plant the seed.' },
    'waxing-crescent': {
      headline: 'WAXING CRESCENT',
      body: 'Light is returning. Build momentum.',
    },
    'first-quarter': {
      headline: 'FIRST QUARTER',
      body: 'Decision point. Push through resistance.',
    },
    'waxing-gibbous': {
      headline: 'WAXING GIBBOUS',
      body: 'Almost full. Refine. Adjust.',
    },
    'full': { headline: 'FULL MOON', body: 'Release what no longer fits.' },
    'waning-gibbous': {
      headline: 'WANING GIBBOUS',
      body: 'Integrate what the full moon revealed.',
    },
    'last-quarter': {
      headline: 'LAST QUARTER',
      body: 'Let go of what is finished. Make space.',
    },
    'waning-crescent': {
      headline: 'WANING CRESCENT',
      body: 'Rest. Compost. Prepare for the next seed.',
    },
  };
  const p = phaseLabels[moon.phase];
  return {
    headline: p.headline,
    body: p.body,
    tone: 'soft',
    accent: '#A8AB7F',
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
