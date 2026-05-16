# Launch Review — Overnight Audit Punch List

**Generated:** overnight 2026-04-26 → 2026-04-27
**Scope:** breathwork flow + immediate dependencies. **Not** a full-app audit.
**TypeScript:** clean (`tsc --noEmit` passes)
**Dev server:** running at http://localhost:8081

---

## ✅ Already applied (low-risk same-pattern fixes)

### `src/types/index.ts`
- Added required `science: string` and `chips: string[]` to `BreathworkSession`.

### `src/data/breathwork.ts`
- Added technique-accurate `science` copy to all 7 sessions. **Replaced the prior one-size-fits-all paragraph that incorrectly claimed every breath downregulates the HPA axis** — Fire Breath and Activation Breath now describe sympathetic activation / controlled hyperventilation truthfully.
- Added `chips` to all 7 sessions (moved out of the screen file).

### `src/components/Button.tsx`
- Added optional `accessibilityLabel`/`accessibilityHint` props. Default `accessibilityRole="button"`. Added `accessibilityState` for `disabled`/`busy`. Purely additive — no behaviour change for existing call sites.

### `app/breathwork/[id].tsx` (the original audit target)
- Type-narrow `useLocalSearchParams` (string | string[] case)
- Recoverable "not found" state with back-to-library button
- `router.canGoBack()` guard with fallback to `/breathwork-library`
- a11y label on back button
- Locked CTA shows real price (`Unlock · $X`) via `getLevel(...).priceUSD`
- `BENEFIT_CHIPS` map removed; reads `session.chips` from data
- Per-session `science` copy from data
- Renamed local `b` → `session`

### `app/session/[id].tsx`
- Type-narrow `useLocalSearchParams` (`id`, `journeyDay`)
- New `exit()` helper: `canGoBack()` → fallback to `/(tabs)/breath`. Used by all 3 prior `router.back()` callsites.
- a11y label on "Session not found" back button

### `app/(tabs)/breath.tsx`
- Replaced two non-null assertions (`breathwork[0]!.id`, `find(...)!`) with safe lookups + an empty-state branch
- a11y on the horizontal session pills: `accessibilityRole="button"`, `accessibilityLabel`, `accessibilityState={{selected}}`

### `app/breathwork-library.tsx`
- `goBack()` helper with `canGoBack()` guard
- a11y on back button, quick-feeling chips, filter tabs (with `selected` state), and PracticeCard items
- Empty-state message when a filter returns zero results

---

## 🔴 Needs your judgment (DO NOT ship until you decide)

### 1. Science copy — your review required
File: [`src/data/breathwork.ts`](src/data/breathwork.ts)
I rewrote the `science` field for all 7 sessions to match the actual physiology of each technique. **Read each one and confirm the tone matches the rest of the app.** Particularly:
- Fire Breath now mentions "controlled stress dose" — wellness audiences sometimes recoil from the word "stress"
- Activation Breath now mentions "controlled hyperventilation" — clinically accurate, but you may want softer wording
- Box Breath references Navy SEALs — common pop-science framing, may or may not fit your brand voice

### 2. Should the new `science`/`chips` fields surface anywhere else?
Currently only the detail screen ([`app/breathwork/[id].tsx`](app/breathwork/%5Bid%5D.tsx)) renders them. The breath tab ([`app/(tabs)/breath.tsx`](app/(tabs)/breath.tsx)) shows the selected practice in a card and could naturally show the chips, and possibly a 1-line `science` excerpt. **I did not add these — that's a UX/design decision.**

### 3. Two parallel breathwork data sources
There are **two** breathwork data files:
- [`src/data/breathwork.ts`](src/data/breathwork.ts) — used by the detail screen, the breath tab, and the home library section
- [`src/data/breathwork-nervous-system.ts`](src/data/breathwork-nervous-system.ts) — used only by [`app/breathwork-library.tsx`](app/breathwork-library.tsx) (the dedicated library screen)

These overlap in concept (sessions with techniques) but have different shapes. **This is a footgun: editing one won't update the other, and the user can navigate to the same session with different metadata depending on which entry point they used.** Likely needs consolidation before launch. Did not touch — too much scope without your direction.

### 4. `FILTERS` and `FilterEducation` in `breathwork-library.tsx`
Lines 18–23 hardcode filter labels; lines 141–167 hardcode the education banner copy. The agent flagged this as "should reference src/data" but those would be a nontrivial restructure. **Punt to you** — fine as-is for v1, but the copy should probably get a content review.

### 5. PaywallModal integration is stubbed
[`src/features/payments/PaywallModal.tsx`](src/features/payments/PaywallModal.tsx) line 5 says: *"INTEGRATION: replace `purchaseLevel()` call with RevenueCat/Stripe (see README.md)"* — **the paywall doesn't actually take payment.** This is the single biggest launch blocker if monetization is part of MVP. Did not touch — you need to make the RevenueCat/Stripe call yourself with the right API keys.

### 6. "SELECTED" eyebrow label on breath tab
[`app/(tabs)/breath.tsx`](app/(tabs)/breath.tsx) line 37 — hardcoded "SELECTED". Probably intentional UX, but the agent flagged it as a magic string. Confirm or replace.

---

## ⚠️ Out of scope tonight (suggested follow-ups)

- **Audit of audio player** ([`src/components/player/AudioPlayer.tsx`](src/components/player/AudioPlayer.tsx)) — not touched. This is the actual session-experience component and the highest-leverage thing to audit before launch. Suggest a dedicated pass.
- **Audit of PostSessionModal** — same as above.
- **Audit of all tab screens** — only `breath.tsx` was reviewed. There are likely similar non-null assertions in other tabs.
- **No tests** — project has no test suite. tsc is the only safety net. Pre-launch, at least one E2E happy-path test (open library → pick session → play → complete) would catch a lot.
- **`expo-haptics` on web** — `PaywallModal` and `breathwork-library` import the haptics shim. If it doesn't no-op cleanly on web, the web build will throw. I haven't tested the web build interactively — please verify when you wake up.

---

## Files changed tonight (summary)

```
src/types/index.ts                  ← added science, chips to BreathworkSession
src/data/breathwork.ts              ← added science + chips to all 7 entries
src/components/Button.tsx           ← added optional a11y props
app/breathwork/[id].tsx             ← (already done before bed)
app/session/[id].tsx                ← type narrow + canGoBack + a11y
app/(tabs)/breath.tsx               ← defensive guards + a11y on pills
app/breathwork-library.tsx          ← canGoBack + a11y everywhere + empty state
LAUNCH_REVIEW.md                    ← this file
```

No git operations performed (this isn't a git repo).

---

# Extended audit findings (read-only sweep)

After the initial bounded fix pass, I dispatched three more **read-only** audits to surface what else needs attention before launch. **No code changes were made for any of these** — they're for your triage.

## 🔴 CRITICAL — likely crash or data-corruption risks

### A. AudioPlayer: `setOnPlaybackStatusUpdate` listener leaks ✅ FIXED 2026-05-03
[`src/components/player/AudioPlayer.tsx`](src/components/player/AudioPlayer.tsx)
Cleanup now calls `sound.setOnPlaybackStatusUpdate(null)` before `unloadAsync()` and nulls `soundRef.current` so subsequent renders can't reference a torn-down sound. `simTimer.current` is also nulled after `clearInterval`.

### B. AudioPlayer: `onMarkComplete` can fire twice ✅ FIXED 2026-05-03
[`src/components/player/AudioPlayer.tsx`](src/components/player/AudioPlayer.tsx)
Added a `completedRef = useRef(false)` guard via a `fireCompleteOnce()` helper. All three completion paths (audio `didJustFinish`, sim-timer end, manual button) route through it. Subsequent calls no-op.

### C. PostSessionModal: unguarded `getDailyPrompt()` return ✅ FIXED 2026-05-03
[`src/components/player/PostSessionModal.tsx`](src/components/player/PostSessionModal.tsx)
Added a `FALLBACK` prompt and explicit truthy checks on `daily.id` and `daily.prompt` before returning. Crash path closed.

### D. Home screen non-null assertions — ALREADY SAFE
[`app/(tabs)/index.tsx`](app/(tabs)/index.tsx)
On re-inspection, the home screen does NOT use non-null assertions. `todayUnstuckDay` and `lowArea` are typed as `| undefined` with proper guard branches. The audit flag was incorrect. No change needed.

---

## ⚠️ WARNING — pervasive accessibility debt

The tab sweep confirmed **~80 `Pressable` elements across the tab screens have no `accessibilityRole`/`accessibilityLabel`**. This is the single biggest a11y gap in the app. Concrete counts:

| Screen | Pressables missing a11y |
|---|---|
| `app/(tabs)/index.tsx` (home) | ~14 (state meter, focus card, 3 practice items, 4 quick links, upsell, etc.) |
| `app/(tabs)/library.tsx` | ~25 (3 quick-relief cards, 7 chakra cards, 6+ breathwork cards, 6+ meditation cards, 2 vision items) |
| `app/(tabs)/journey.tsx` | ~25 (hero, 2 session tiles, write-journal, see-map, 21 day cards) |
| `app/(tabs)/journal.tsx` | ~9 (insights, 6 entry items, category chips) |
| `app/(tabs)/profile.tsx` | ~10 (state card, wheel, 6 settings rows, more) |
| `app/(tabs)/vision.tsx` | ~12 (activation card, 5 filter chips, 6+ grid items) |

**Recommendation:** since I added `accessibilityLabel`/`accessibilityHint` props to [`Button.tsx`](src/components/Button.tsx) earlier tonight and they default `accessibilityRole="button"`, the cheapest path is to (1) replace bare `Pressable` with the project `Button` where reasonable, OR (2) do a single mechanical pass adding role+label to every onPress'd Pressable. Either is a bounded follow-up, not a launch blocker for sighted users — but **iOS App Store review increasingly cites a11y issues for rejections**, so worth doing.

## ⚠️ WARNING — non-null finds in library.tsx
[`app/(tabs)/library.tsx:175-177`](app/(tabs)/library.tsx) — three `breathwork.find(...)` calls without nullish handling. They're inside a `.filter(Boolean)` cast which is safer than a bare `!`, but still relies on those exact ids existing in the data file. If anyone renames `breath-4-7-8` etc., the home library section silently goes blank.
**Fix sketch:** assert via test, or use a constants module so renames break compile.

## ✅ FIXED 2026-05-03 — AudioPlayer Pressables a11y
Close, play/pause, rewind, forward, and the Mark Complete button now all have `accessibilityRole="button"` and dynamic `accessibilityLabel` (play/pause label flips with `isPlaying`; complete-button label reflects `canMarkComplete`).

## ✅ FIXED 2026-05-03 — PostSessionModal a11y
TextInput labeled. Skip button has role + label.

---

## Status as of 2026-05-03

**All 3 originally-listed CRITICAL bugs are now fixed and type-clean.** The home-screen non-null flag (D) was a false positive from the audit — code was already safe.

### What's still genuinely a launch blocker

1. **PaywallModal Stripe / RevenueCat wiring.** The paywall still doesn't take money. This needs your API keys, account setup, and a real account at RevenueCat or Stripe — I can't do it without those. **You** have to set up the payment provider; once you do, wiring it in is ~1 hour of code on my end.
2. **Two parallel breathwork data sources** ([`src/data/breathwork.ts`](src/data/breathwork.ts) and [`src/data/breathwork-nervous-system.ts`](src/data/breathwork-nervous-system.ts)). Footgun. Editing one doesn't update the other. Consolidation is on the v1 list in [`APP_ARCHITECTURE.md`](APP_ARCHITECTURE.md) — folds into `chakra-spine.ts` work.

### Lower priority but still on the list

3. **Mass a11y label sweep across the tab screens** (~80 Pressables across home, library, journey, journal, profile, vision). Not a runtime blocker; matters for App Store review.
4. **All other items in this doc that aren't checked above.**

The bigger work (4-tab restructure, chakra-spine.ts consolidation, Today tab + coach engine, 21-day plan engine, frequency player, lunar feed, astro/HD layer) lives in [`APP_ARCHITECTURE.md`](APP_ARCHITECTURE.md). That's the v1/v2/v3 roadmap.
