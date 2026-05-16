# SOMA — Mobile App

The foundation, theme, navigation, state, and all 15 MVP screens for the SOMA healing app. Built in Expo (React Native) with TypeScript.

## Quick start

```bash
cd soma/app
npm install
npx expo start
```

Then:

- Scan the QR code with the Expo Go app (iOS / Android), **or**
- Press `i` to open the iOS simulator (requires Xcode)
- Press `a` to open the Android emulator (requires Android Studio)
- Press `w` to open in the web browser

## Tech stack

- **Expo ~52** with **Expo Router v4** (file-based routing under `app/`)
- **TypeScript** strict mode
- **Zustand** for state (persisted via AsyncStorage)
- **React Native Reanimated 3**, **react-native-svg**, **expo-haptics**, **expo-av**, **expo-linear-gradient**
- Google Fonts — Cormorant Garamond (display), Inter (body), JetBrains Mono (numerics)
- `@tanstack/react-query` ready for future API work

## Folder structure

```
app/                     # expo-router routes (file-based)
  _layout.tsx            # root: fonts, providers, stack
  index.tsx              # entry redirect (onboarding or tabs)
  (onboarding)/
    _layout.tsx
    welcome.tsx          # 1. Hero + "Begin"
    feeling-selector.tsx # 2. 6 feeling cards
    chakra-quiz.tsx      # 3. 21 questions
    quiz-result.tsx      # 4. animated wheel + CTA
  (tabs)/
    _layout.tsx          # 5 bottom tabs
    index.tsx            # Home dashboard  (screen 5)
    library.tsx          # Library         (screen 10)
    breath.tsx           # Breath orb      (screen 8)
    journal.tsx          # Emotion journal (screen 9)
    profile.tsx          # Profile + meter (screen 14 + 12)
  session/[id].tsx       # 7. Session player (stub for Agent 3)
  level/[id].tsx         # 11. Level detail / preview
  chakra-wheel.tsx       # 6. Full-screen explorer
  vision-board.tsx       # 13. Intentions grid
  paywall.tsx            # 15. Reusable modal

src/
  theme/                 # tokens (from design/tokens.css) + ThemeProvider
  components/            # Button, Card, Screen, Text, ProgressDots, etc.
                         #   + stubs: ChakraWheel, BreathOrb, VibrationMeter
  data/                  # chakras, breathwork, meditations, levels, feelings, quiz
  store/                 # useUserStore, useProgressStore, useEmotionStore (persisted)
  types/                 # all TypeScript types
```

## 15 screens — which file builds what

| # | Screen | File |
|---|---|---|
| 1 | Welcome | `app/(onboarding)/welcome.tsx` |
| 2 | Feeling Selector | `app/(onboarding)/feeling-selector.tsx` |
| 3 | Chakra Quiz | `app/(onboarding)/chakra-quiz.tsx` |
| 4 | Quiz Result | `app/(onboarding)/quiz-result.tsx` |
| 5 | Home Dashboard | `app/(tabs)/index.tsx` |
| 6 | Chakra Wheel Explorer | `app/chakra-wheel.tsx` |
| 7 | Session Player | `app/session/[id].tsx` |
| 8 | Breath Orb | `app/(tabs)/breath.tsx` |
| 9 | Emotion Journal | `app/(tabs)/journal.tsx` |
| 10 | Library | `app/(tabs)/library.tsx` |
| 11 | Level Detail | `app/level/[id].tsx` |
| 12 | Vibration Meter | rendered inside `app/(tabs)/profile.tsx` + home |
| 13 | Vision Board | `app/vision-board.tsx` |
| 14 | Profile | `app/(tabs)/profile.tsx` |
| 15 | Paywall | `app/paywall.tsx` |

## Integration points — TODO for Agents 3 & 4

The stubs below are deliberately minimal — they render correctly, match the visual language, and expose a clear prop surface, but the real behavior lands with the specialist agents.

### Agent 3 (audio + payments)

- `app/session/[id].tsx` — audio player UI skeleton. Wire:
  - `expo-av` playback of `session.filePath`
  - Progress bar, play/pause/skip 15s, background audio mode
  - On complete: call `useProgressStore.markSessionComplete(id, minutes)`
- `app/paywall.tsx` — level purchase flow. Wire:
  - Stripe / RevenueCat purchase
  - On success: `useProgressStore.unlockLevel(level.id)` then `router.back()`

### Agent 4 (motion + interactive visuals)

- `src/components/ChakraWheel.tsx` — turn the static SVG into an animated, tappable wheel.
- `src/components/BreathOrb.tsx` — animate expand / contract with the breath pattern.
- `src/components/VibrationMeter.tsx` — animate the arc on value change; add region labels.

All three stubs already accept the props they will need and fit the screens' layouts. Swap the internals, not the interfaces.

## Scripts

```bash
npm start           # expo start
npm run ios         # iOS simulator
npm run android     # Android emulator
npm run web         # web
npm run typecheck   # tsc --noEmit
```

## Design source of truth

- `design/tokens.css` — every color, spacing, shadow, easing is mirrored in `src/theme/tokens.ts`
- `design/screens/*.html` — interactive prototypes (one per screen) used as visual reference
- `design/components.html` — component library

## Content source of truth

Scripts used by session player (Agent 3 will read these):

- `content/chakras/` — 21 chakra scripts (3 per chakra × 7)
- `content/breathwork/` — 7 breathwork practices
- `content/meditations/` — 8 themed meditations

Each file has a plain-text header with title, duration, and mantra.

## Copy voice

Grounded, warm, unhurried. Not airy-fairy, not clinical. Serif for feeling, sans for function, mono for numerics. Whitespace is part of the message.

---

Foundation status: **built, typechecked, ready for the specialist agents.**
