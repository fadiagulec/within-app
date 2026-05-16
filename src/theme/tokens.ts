/**
 * SOMA — DESIGN TOKENS
 * Mirrors design/tokens.css — single source of truth.
 */

/**
 * Within — Soft pastel palette.
 * Pale dusty sky → cream → soft blush. Airy, low-saturation, washed.
 * Inspired by the soft-pastel wellness aesthetic — pale blue, cream,
 * dusty rose, butter, lavender, mint as the accent vocabulary.
 */
export const palette = {
  // ──────── Pastel gradient stops (much softer than the old sunset) ────────
  skyTop: '#DCE6EC',         // pale dusty sky blue — almost a tinted white
  skyMid: '#E8DEDF',         // pale dusty mauve transition
  peach: '#F1E1D5',           // soft cream peach
  coralPink: '#E8D2D2',       // pale dusty rose — barely there pink
  goldenPeach: '#F2DDC8',     // soft butter peach for accents

  // Wellness pastel accents (used for category cards / pills)
  pastelBlue: '#C8D8E0',      // pale washed blue
  pastelPeach: '#EFD4C2',     // soft peach
  pastelBlush: '#E8C8C5',     // dusty blush pink
  pastelButter: '#EDD8A8',    // soft butter yellow
  pastelSage: '#C5D2BD',      // pale mint sage
  pastelLavender: '#D6CEE2',  // dusty lavender
  pastelMint: '#9DBFB2',      // mint accent (CTAs)

  // ──────── Translucent surface levels ────────
  // Cards "float" on the gradient — tinted whites with slight opacity
  // so the pastel shows through.
  cream50: 'rgba(255, 252, 250, 0.94)',   // most opaque — highest priority cards
  cream100: 'rgba(252, 248, 244, 0.82)',  // primary cards
  cream200: 'rgba(252, 248, 244, 0.66)',  // softer cards
  cream300: 'rgba(248, 232, 222, 0.58)',  // tinted (warmer) cards

  // ──────── Text — soft dark warm grey ────────
  ink900: '#3A3540',         // primary — slightly softer than near-black
  ink700: '#6B6470',         // secondary
  ink500: '#9A93A0',         // tertiary / muted

  // ──────── Legacy aliases (kept so existing code that imports
  // palette.obsidian / palette.bone / etc. keeps working) ────────
  obsidian: '#2D3833',
  obsidian800: '#34403A',
  charcoal: '#3F4D45',
  charcoal700: '#4F5C53',
  ash: '#9CA295',
  ash400: '#BCC0B5',
  bone: '#F2EBD6',
  bone200: '#E5DCC4',
  bone50: '#F8F2E4',

  // ──────── Soft pastel accent (replaces the old saturated gold) ────────
  // The reference uses a soft mint as its primary CTA; we pair it with a
  // warm dusty rose-gold so we still have a warm/cool pairing.
  gold: '#C5A88A',           // softer dusty rose-gold — washed
  goldHover: '#D2B89C',
  goldMuted: '#8E7660',
  goldSoft: 'rgba(197, 168, 138, 0.18)',
  mint: '#9DBFB2',           // soft mint — primary CTA color
  mintHover: '#AECDC2',
  mintSoft: 'rgba(157, 191, 178, 0.18)',

  // ──────── Status colors ────────
  successSage: '#9DB698',    // muted sage that reads on the sky bg
  errorRust: '#B07258',
  warningAmber: '#C2712C',
  clay: '#B89074',
  moss: '#7A9577',
  mossDeep: '#5C7559',

  // ──────── Legacy aliases (kept so existing code keeps compiling) ────────
  brandSage: '#A8AB7F',
  brandGold: '#C9A07A',
  brandTaupe: '#A09784',
  brandCream: '#F0D4BC',
} as const;

export const chakraColors = {
  root: '#6B1F1F',
  sacral: '#C2712C',
  solar: '#D9B24C',
  heart: '#6B8F71',
  throat: '#3E6A8C',
  thirdEye: '#3B3564',
  crown: '#8A7AA8',
} as const;

export const chakraGlow = {
  root: 'rgba(107, 31, 31, 0.35)',
  sacral: 'rgba(194, 113, 44, 0.35)',
  solar: 'rgba(217, 178, 76, 0.35)',
  heart: 'rgba(107, 143, 113, 0.35)',
  throat: 'rgba(62, 106, 140, 0.35)',
  thirdEye: 'rgba(59, 53, 100, 0.35)',
  crown: 'rgba(138, 122, 168, 0.35)',
} as const;

export const semantic = {
  // ──────── SOFT PASTEL THEME ────────
  // bgBase is a SOLID fallback (used when no gradient is rendered) — pulled
  // from the middle of the new pastel gradient so screens without their own
  // gradient background still feel right.
  bgBase: '#EFE5E2',              // dusty pale mauve-cream — solid fallback
  bgElevated: palette.cream100,   // translucent white cards
  bgRaised: palette.cream50,      // most-prominent translucent white
  bgSurfaceLight: palette.cream50,
  bgSurfaceWarm: palette.cream300,

  // Dark text reads well on translucent white over the sky gradient
  textPrimary: palette.ink900,
  textSecondary: palette.ink700,
  textTertiary: palette.ink500,
  textInverse: '#FFFFFF',
  textOnGold: '#FFFFFF',

  // Subtle borders — soft enough not to fight the translucent cards
  borderSubtle: 'rgba(45, 41, 53, 0.08)',
  borderDefault: 'rgba(45, 41, 53, 0.14)',
  borderStrong: 'rgba(45, 41, 53, 0.24)',
  borderGold: palette.gold,

  // Accent stays gold (= brandGold #CFB57E)
  accent: palette.gold,
  accentHover: palette.goldHover,
  accentMuted: palette.goldMuted,
  accentSoft: palette.goldSoft,

  // Lighter scrims for light theme — modals etc. don't need to go fully dark
  overlayScrim: 'rgba(45, 56, 51, 0.55)',
  overlayLight: 'rgba(45, 56, 51, 0.18)',

  successSage: palette.brandSage,
  errorRust: palette.errorRust,
  warningAmber: palette.warningAmber,
  bone: palette.cream100,
} as const;

export const fonts = {
  display: 'CormorantGaramond_500Medium',
  displayRegular: 'CormorantGaramond_400Regular',
  displayBold: 'CormorantGaramond_600SemiBold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
  mono: 'JetBrainsMono_400Regular',
  monoMedium: 'JetBrainsMono_500Medium',
} as const;

export const fontSizes = {
  fs12: 12,
  fs14: 14,
  fs16: 16,
  fs20: 20,
  fs24: 24,
  fs32: 32,
  fs48: 48,
  fs64: 64,
} as const;

export const lineHeights = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.7,
} as const;

export const letterSpacing = {
  tight: -0.02,
  snug: -0.01,
  normal: 0,
  wide: 0.04,
  label: 0.08,
} as const;

export const spacing = {
  s0: 0,
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
  s8: 32,
  s12: 48,
  s16: 64,
  s24: 96,
} as const;

export const radii = {
  r0: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  r2xl: 24,
  pill: 999,
} as const;

export const shadows = {
  s1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.28,
    shadowRadius: 2,
    elevation: 2,
  },
  s2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 12,
    elevation: 4,
  },
  s3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.42,
    shadowRadius: 32,
    elevation: 8,
  },
  s4: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.55,
    shadowRadius: 64,
    elevation: 16,
  },
  gold: {
    shadowColor: palette.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },
  goldStrong: {
    shadowColor: palette.gold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 12,
  },
} as const;

export const easings = {
  outSoft: [0.22, 1, 0.36, 1] as const,
  outQuint: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  elastic: [0.68, -0.55, 0.27, 1.55] as const,
  standard: [0.4, 0, 0.2, 1] as const,
};

export const durations = {
  fast: 120,
  base: 220,
  slow: 400,
  breath: 4000,
} as const;

export const layout = {
  viewportMobile: 375,
  headerHeight: 56,
  tabbarHeight: 72,
} as const;

export const tokens = {
  palette,
  chakraColors,
  chakraGlow,
  semantic,
  fonts,
  fontSizes,
  lineHeights,
  letterSpacing,
  spacing,
  radii,
  shadows,
  easings,
  durations,
  layout,
} as const;

export type Tokens = typeof tokens;
