/**
 * Within — Imagery catalog.
 *
 * Curated, on-brand photo URLs (Unsplash, free, attribution-friendly) used
 * across the app for hero / card backgrounds. We pass query params so each
 * request gets a sensibly-sized JPG (≤ 800px wide, q=72 — sharp on retina
 * but small bytes over the wire).
 *
 * The HeroImage component falls back to a sunset gradient if any image
 * fails to load — so the app is resilient if a URL ever goes stale.
 */

const BASE = 'https://images.unsplash.com/photo-';
const COMMON = '?w=900&q=72&fm=jpg&auto=format&fit=crop';

/** Per-chakra hero imagery — picked for color + symbolic resonance. */
export const CHAKRA_IMAGERY: Record<string, string> = {
  // Root — earth, grounded, deep red soil / mountain at sunset
  root: `${BASE}1500530855697-b586d89ba3ee${COMMON}`,
  // Sacral — water, ocean wave, orange sunset reflection
  sacral: `${BASE}1507525428034-b723cf961d3e${COMMON}`,
  // Solar Plexus — golden sun, fire, dawn light
  'solar-plexus': `${BASE}1495344517868-8ebaf0a2044a${COMMON}`,
  // Heart — green forest light, soft & open
  heart: `${BASE}1448375240586-882707db888b${COMMON}`,
  // Throat — open sky, blue, breath
  throat: `${BASE}1419242902214-272b3f66ee7a${COMMON}`,
  // Third Eye — indigo cosmos, deep purple sky
  'third-eye': `${BASE}1462331940025-496dfbfc7564${COMMON}`,
  // Crown — violet galaxy, light from above
  crown: `${BASE}1444703686981-a3abbc4d4fe3${COMMON}`,
  // Soul Star — white luminous space, transcendent
  'soul-star': `${BASE}1502134249126-9f3755a50d78${COMMON}`,
};

/** Hero / featured imagery. */
export const HERO_IMAGERY = {
  /** Soft pastel sunset clouds — perfect for the Home featured card. */
  sunsetClouds: `${BASE}1500534314209-a25ddb2bd429${COMMON}`,
  /** Dawn over mountains — for the signature Process screen. */
  dawnMountains: `${BASE}1418065460487-3e41a6c84dc5${COMMON}`,
  /** Ocean horizon at dusk — relationships / heart-themed pages. */
  oceanDusk: `${BASE}1502082553048-f009c37129b9${COMMON}`,
  /** Star-filled night — astrology / chart pages. */
  starsCosmos: `${BASE}1419242902214-272b3f66ee7a${COMMON}`,
  /** Soft pink sunset gradient — generic. */
  pinkSunset: `${BASE}1495344517868-8ebaf0a2044a${COMMON}`,
};

/** Per-21-day-plan cover imagery. */
export const PLAN_IMAGERY: Record<string, string> = {
  // Letting Go — water releasing into the horizon
  'letting-go-of-the-past': `${BASE}1502082553048-f009c37129b9${COMMON}`,
  // Build Abundance — golden field at sunset
  'build-abundance': `${BASE}1500382017468-9049fed747ef${COMMON}`,
  // Magnetic Self — silhouette + cosmic backdrop
  'magnetic-self': `${BASE}1530908295418-a12e326966ba${COMMON}`,
};

/** Practice category imagery — for use on Library or grouped surfaces. */
export const CATEGORY_IMAGERY = {
  breathwork: `${BASE}1518607692857-9b14e3df9434${COMMON}`,
  meditation: `${BASE}1506126613408-eca07ce68773${COMMON}`,
  journal: `${BASE}1455390582262-044cdead277a${COMMON}`,
  frequency: `${BASE}1454944338482-a69bb95894af${COMMON}`,
};
