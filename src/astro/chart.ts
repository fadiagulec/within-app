/**
 * Natal chart computation.
 *
 * Wraps `circular-natal-horoscope-js` (MIT, pure JS, browser-friendly)
 * with a small typed surface that returns exactly what the chart screen
 * needs to render.
 *
 * Inputs: birth date + (optional) time + lat/lng + timezone offset.
 * Outputs: planet positions (sign + degrees), Ascendant (rising), Midheaven,
 *          12 house cusps, major aspects.
 *
 * If birth time is unknown, we use noon and skip rising / houses (those
 * depend on time-of-day) — sun + moon + sign positions are still meaningful.
 */

// We deliberately do NOT statically import the natal-horoscope library here.
// It's a webpack-prebundled CommonJS bundle that historically crashed the
// whole app at module-init when loaded via Metro/webpack. Lazy-loading via
// require() inside the function — not the top of the file — means the
// library only runs when computeChart() is actually called (i.e. when the
// user navigates to /you/chart or /you/blueprint), and a crash in the
// library can be caught by the screen's error boundary instead of taking
// the rest of the app down with it.
//
// Type any at the boundary — the library has no real types anyway.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _libCache: { Origin: any; Horoscope: any } | null = null;

function loadLib(): { Origin: any; Horoscope: any } {
  if (_libCache) return _libCache;
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const lib = require('circular-natal-horoscope-js/dist/index');
  _libCache = { Origin: lib.Origin, Horoscope: lib.Horoscope };
  return _libCache;
}

// ============ TYPES ============

export interface ChartInput {
  /** YYYY-MM-DD */
  date: string;
  /** "HH:MM" 24h, or undefined if unknown. */
  time?: string;
  lat: number;
  lng: number;
  /** Hours offset from UTC (e.g. +3 for Turkey). */
  timezoneOffsetHours: number;
}

export interface PlanetPosition {
  /** "Sun" / "Moon" / "Mercury" / etc. */
  name: string;
  /** Display label suitable for users. Same as name for now. */
  label: string;
  /** Zodiac sign — capitalized ("Aries"). */
  sign: string;
  /** Degree within the sign (0–29.999). */
  degreesInSign: number;
  /** Absolute position around the 360° wheel. */
  absoluteDegrees: number;
  /** Optional house number (1-12) if computable. */
  house?: number;
}

export interface ChartAspect {
  /** Planet on one side of the aspect. */
  pointA: string;
  pointB: string;
  /** Aspect name: "conjunction" | "opposition" | "trine" | "square" | "sextile". */
  type: string;
  /** Orb in degrees — how exact the aspect is (smaller = stronger). */
  orb: number;
}

export interface NatalChart {
  /** True iff the chart was computed with a known birth time (rising/houses valid). */
  hasBirthTime: boolean;
  sun: PlanetPosition;
  moon: PlanetPosition;
  /** Rising sign — only present if hasBirthTime. */
  rising?: PlanetPosition;
  midheaven?: PlanetPosition;
  /** All planets (Sun through Pluto + Chiron when available). */
  planets: PlanetPosition[];
  /** 12 house cusps in order — only present if hasBirthTime. */
  houses?: PlanetPosition[];
  /** Major aspects between planets — sorted by tightness (orb ascending). */
  aspects: ChartAspect[];
}

// ============ HELPERS ============

const PLANET_LABELS: Record<string, string> = {
  sun: 'Sun',
  moon: 'Moon',
  mercury: 'Mercury',
  venus: 'Venus',
  mars: 'Mars',
  jupiter: 'Jupiter',
  saturn: 'Saturn',
  uranus: 'Uranus',
  neptune: 'Neptune',
  pluto: 'Pluto',
  chiron: 'Chiron',
};

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/**
 * Pull the standardized PlanetPosition shape out of the library's
 * untyped CelestialBody / Angle objects.
 */
function bodyToPosition(body: unknown, fallbackName: string): PlanetPosition {
  // The library returns objects with shape:
  //   { key, label, Sign: { label }, ChartPosition: { Ecliptic: { DecimalDegrees, ArcDegreesFormatted30 } }, House: { id }? }
  const b = body as {
    key?: string;
    label?: string;
    Sign?: { label?: string; key?: string };
    ChartPosition?: {
      Ecliptic?: {
        DecimalDegrees?: number;
        ArcDegrees?: { degrees?: number; minutes?: number };
      };
    };
    House?: { id?: number };
  };

  const absolute = b.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0;
  const sign =
    b.Sign?.label ?? b.Sign?.key ?? signFromDegrees(absolute);
  const degreesInSign = absolute % 30;
  const name = b.key ?? fallbackName;

  return {
    name,
    label: b.label ?? PLANET_LABELS[name] ?? capitalize(name),
    sign: capitalize(sign),
    degreesInSign,
    absoluteDegrees: absolute,
    house: b.House?.id,
  };
}

const ZODIAC_ORDER = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

function signFromDegrees(deg: number): string {
  const idx = Math.floor((((deg % 360) + 360) % 360) / 30);
  return ZODIAC_ORDER[idx] ?? 'Aries';
}

// ============ MAIN ============

export function computeChart(input: ChartInput): NatalChart {
  const [yearStr, monthStr, dayStr] = input.date.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr) - 1; // library expects 0-based
  const day = Number(dayStr);

  let hour = 12;
  let minute = 0;
  const hasBirthTime = Boolean(input.time);
  if (hasBirthTime && input.time) {
    const [h, m] = input.time.split(':');
    hour = Number(h);
    minute = Number(m);
  }

  // The library expects local time + lat/lng. It does its own UTC conversion
  // using its internal timezone lookup OR — if we don't pass a tz — falls
  // back to longitude-based estimation. Passing lat/lng is enough for the
  // accuracy we need here.
  const { Origin, Horoscope } = loadLib();

  const origin = new Origin({
    year,
    month,
    date: day,
    hour,
    minute,
    latitude: input.lat,
    longitude: input.lng,
  });

  const horoscope = new Horoscope({
    origin,
    houseSystem: 'placidus',
    zodiac: 'tropical',
    aspectPoints: ['bodies', 'points'],
    aspectWithPoints: ['bodies', 'points'],
    aspectTypes: ['major'],
    customOrbs: {},
  });

  // Convert planets
  const bodies = horoscope.CelestialBodies.all ?? [];
  const planets: PlanetPosition[] = bodies.map((b: unknown, i: number) =>
    bodyToPosition(b, `planet-${i}`)
  );

  const sun = planets.find((p) => p.name === 'sun') ?? planets[0]!;
  const moon = planets.find((p) => p.name === 'moon') ?? planets[1]!;

  // Rising / Midheaven only valid with birth time
  let rising: PlanetPosition | undefined;
  let midheaven: PlanetPosition | undefined;
  let houses: PlanetPosition[] | undefined;
  if (hasBirthTime) {
    rising = bodyToPosition(horoscope.Ascendant, 'ascendant');
    midheaven = bodyToPosition(horoscope.Midheaven, 'midheaven');
    const housesList = horoscope.Houses ?? [];
    houses = housesList.map((h: unknown, i: number) =>
      bodyToPosition(h, `house-${i + 1}`)
    );
  }

  // Aspects
  const allAspects = (horoscope.Aspects?.all ?? []) as Array<{
    point1Key?: string;
    point2Key?: string;
    aspectKey?: string;
    aspectLevelName?: string;
    orb?: number;
  }>;
  const aspects: ChartAspect[] = allAspects
    .filter((a) => typeof a.orb === 'number')
    .map((a) => ({
      pointA: PLANET_LABELS[a.point1Key ?? ''] ?? capitalize(a.point1Key ?? ''),
      pointB: PLANET_LABELS[a.point2Key ?? ''] ?? capitalize(a.point2Key ?? ''),
      type: capitalize(a.aspectKey ?? ''),
      orb: a.orb ?? 0,
    }))
    .sort((a, b) => a.orb - b.orb);

  return {
    hasBirthTime,
    sun,
    moon,
    rising,
    midheaven,
    planets,
    houses,
    aspects,
  };
}
