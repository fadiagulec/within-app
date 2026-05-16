# Within Me — UI Review

**Date:** 2026-05-12
**Auditor:** gsd-ui-auditor (code-only — no live screenshots)
**Scope:** 10 key screens + theme system + shared components

## Score: 14 / 24

| Pillar | Score | Headline finding |
|---|---|---|
| Copywriting | 4 / 4 | On-voice. Verb-led. Zero "embark on your sacred journey." |
| Visuals | 3 / 4 | Home, Plans, Unblocking, Chakra detail are strong. Library / You / Plan-day / Onboarding still text-only with no imagery. |
| Color | 1 / 4 | New gradient backgrounds are only wired on 6 screens. Every other route still paints the solid `bgBase #E8D4D0`. Half the app is the wrong colour. |
| Typography | 3 / 4 | Serif/sans split is correct. But >5 different H1 sizes (28/30/32/36/40/44) across screens — no single hierarchy. |
| Spacing | 2 / 4 | Each screen has internally consistent spacing. Across screens, scroll padding swings 16 / 20 / 22 / 24, and card padding ranges 14 / 16 / 18 / 20 / 22 with no system. |
| Experience Design | 1 / 4 | Tab bar still 4 tabs (Today / Library / Plans / You), but Home points users to Tips and Insights as standalone routes — they live nowhere in the nav. Plans tab and Unblocking Process have no loading or error states. |

---

## Top 5 fixes (ranked by impact)

1. **Wire `InsideBackground` into every inside screen, not just 5.** — `app/_layout.tsx:79,87,95` paints `bgBase #E8D4D0` as the global Stack background, then ~28 individual screens (`app/(tabs)/library.tsx`, `app/(tabs)/you.tsx`, `app/plan/[id]/day/[n].tsx`, `app/about.tsx`, `app/retreats.tsx`, `app/chakra-wheel.tsx`, `app/unblock/[id].tsx`, all of `app/(onboarding)/*`, `app/journey/day/[n].tsx`, etc.) repaint that same solid pink via `<Screen>`. That means every page outside Home/Plans/Tips/Insights/Chakra/Unblocking-process is a flat block of muted coral — not the sky→cream gradient described. This is the biggest single regression and obvious the second you tap anything off Home.

2. **Reconcile the tab bar with the navigation the app actually expects.** — `app/(tabs)/_layout.tsx:80-107` registers `Today / Library / Plans / You`. But Home (`app/(tabs)/index.tsx:157-162`) routes users to `Tips` and `Insights`, and both have full tab screens (`tips.tsx`, `insights.tsx`) that are hidden because they aren't declared. A user tapping the Tips button gets pushed onto a route that has no tab membership and no obvious way back via the bar. Either declare 5 tabs (Today / Library / Plans / Tips / You) and put Insights inside You, or remove the Tips/Insights buttons from Home until they're real destinations.

3. **Lock H1 sizing to two values.** — Currently: 28/46 on Home (`index.tsx:188,195`), 36 on Plans (`plans.tsx:106`), 30 on Tips/Insights (`tips.tsx:88`, `insights.tsx:138`), 32 on About (`about.tsx:427`), 44 on About hero (`about.tsx:384`), 32 on Retreats (`retreats.tsx:124`), 40 on Chakra hero (`chakra/[id].tsx:87`), 30 on Plan day hero (`plan/[id]/day/[n].tsx:163`). Pick two: **40** for primary hero (Home name, About hero), **30** for inside-page H1 — everything else compresses. Right now each screen feels like a different designer.

4. **Standardize card padding to 20 across all translucent cards.** — Plans card is `22` (`plans.tsx:137`), Tips card is `18` (`tips.tsx:105`), Insights big card is `22` (`insights.tsx:146`), Insights small card is `16` (`insights.tsx:161`), Unblocking step card is `16` (`unblocking-process.tsx:352`), Unblocking dual card is `14` (`unblocking-process.tsx:320`), Home briefing is `18 vert / 22 horiz` (`index.tsx:272`), Home buttons are `20 vert / 24 horiz` (`index.tsx:251`). Eight different values. Pick one (20) and use `tokens.spacing.s5` everywhere.

5. **The Chakra-detail page is broken-looking on the new palette.** — `app/chakra/[id].tsx:265-268` still uses `tokens.semantic.bgElevated` (translucent white) for `affirmCard` and `sessionCard`, but the rest of the page sits on the chakra-coloured `ChakraBackground` gradient. Translucent-white cards over a saturated chakra-red gradient pull the surface into a muddy lavender. Replace `bgElevated` with `cream50` (more opaque), or use the chakra-tinted card style already used in the unblocking-process page (`step.accent + "1A"`).

---

## Pillar-by-pillar findings

### 1. Copywriting — 4 / 4

The voice rule is alive in code:

- `app/about.tsx:55-66` — "Stop using five wellness apps. This is one." Verb-led, plain, sharp.
- `app/about.tsx:187-191` — Brand voice is literally pinned in a quote section, on purpose.
- `app/(tabs)/plans.tsx:31-34` — "Three weeks. One arc. … 15-20 minutes. You finish — you do not just 'do it forever.'"
- `app/(tabs)/insights.tsx:39` — "What the app sees about you." Crisp.
- `app/about.tsx:353-365` — Plan taglines are exemplary: "Stop dragging it. Start fresh." / "Stop earning it. Start receiving it." / "Stop chasing it. Become the kind of person it comes to."
- `app/retreats.tsx:125-126` — "The work that does not happen on a screen." Hook + product positioning in 8 words.
- `app/(tabs)/index.tsx:97-99` — Home flagship sub: "7-step Quantum Unblocking Timeline — open it →" leads with verb.

Zero hits for "embark", "sacred journey", "cosmic dance", "trust the universe" in the app folder. The only matches are in `about.tsx:187` (anti-pattern quoted on purpose) and inline comments in `src/coach/index.ts:194` and `src/components/coach/DailyBriefing.tsx:7` that explicitly forbid the phrase. The team is policing itself.

One tiny softening to consider:

- `app/(tabs)/tips.tsx:31-33` — "Each chakra has one short mantra and one practical instruction" reads slightly textbook. Voice would be: "One mantra. One thing to do. Per centre."

Score is a clean 4. This is the strongest pillar in the app.

### 2. Visuals — 3 / 4

**Working:**
- Home flagship card is the strongest visual moment in the app — image-backed, hierarchy clean, two accent colours (`#E8C9C2` on "1", `#C9B7E5` on "7") quietly previewing the chakra-rainbow arc. (`app/(tabs)/index.tsx:88-101`)
- Plans cards lift the listing from text-list to magazine cover (`app/(tabs)/plans.tsx:53-77`).
- Unblocking-process hero pairs the dawn-mountains image with the same two-accent typographic move — visually consistent with Home. (`unblocking-process.tsx:60-78`)
- `ChakraSymbol size={140}` is a real focal point on chakra detail (`chakra/[id].tsx:81`).

**Missing imagery / weak hierarchy:**
- `app/(tabs)/library.tsx` — entirely text and dot+gradient cards. No imagery. On Home the user is taught "everything has a cover photo"; Library breaks that promise.
- `app/(tabs)/you.tsx` — a 12-row link list with `→` arrows. No icon, no photo, no visual differentiator besides a 1-pixel coloured border. The "Rooted Through 1, Pulled Through 7" entry sits between Wheel of Life and Astrology Chart with no special treatment — the flagship product is rendered as a row.
- `app/(tabs)/tips.tsx` — 8 stacked cards, no chakra symbol, no imagery. Just left-border colour and a number. After two scrolls it reads as a list view of strings.
- `app/(tabs)/insights.tsx` — pure numeric cards. Wheel-of-Life delta with no chart, no wheel illustration. The literal Wheel is named in the kicker but not drawn. Massive missed moment.
- `app/retreats.tsx` — application-based, premium product, **no retreat imagery**. Just coloured borders on cards.
- Icon-only buttons: settings gear (`index.tsx:48-65`) has `accessibilityLabel="Settings"` — good. But the `→` arrows on `you.tsx:193-195` and the `+ / −` toggles on `unblocking-process.tsx:135` have no aria label.

### 3. Color — 1 / 4

This is the audit's most serious finding.

**The intent:** Home uses SkyBackground (sunset). Every other inside page uses InsideBackground (sky → cream, no pink). Chakra pages use ChakraBackground. Cards are translucent white floating on the gradient.

**Reality:** only 6 screens actually wrap themselves in one of the three backgrounds:
```
app/(tabs)/index.tsx          SkyBackground   ✓
app/(tabs)/plans.tsx          InsideBackground ✓
app/(tabs)/tips.tsx           InsideBackground ✓
app/(tabs)/insights.tsx       InsideBackground ✓
app/chakra/[id].tsx           ChakraBackground ✓
app/unblocking-process.tsx    InsideBackground ✓
```

Everything else — Library, You, About, Retreats, Plan day runner, Plan overview, Chakra-wheel, Unblock script, all of `(onboarding)`, all of `journey/`, `gratitude.tsx`, `check-in.tsx`, `coaching.tsx`, the breathwork library, `level/[id]`, `burnout-result`, `wheel-result`, `quiz-result`, `connecting-to-light`, `protecting-your-light`, `birth-data` — uses `<Screen>` which paints **the solid `bgBase #E8D4D0`** (`Screen.tsx:28,70`). And on top of that, `app/_layout.tsx:79,87,95` paints `bgBase` as the global Stack contentStyle, so even if a child screen tries to be transparent, the Stack underneath is solid muted-coral.

That means: tap *anything* off Home, you're looking at a flat block of dusty pink for as long as that screen is on top. Cards over it are still translucent white over a solid coral — so the "floating on a sunset gradient" feel is dead on at least 25 routes.

**Other color issues:**
- `Screen.tsx:72` sets `<StatusBar barStyle="light-content" />` — so on iOS the status bar text is white. On the new light backgrounds that means white text on cream → unreadable. The global layout fixed this in `_layout.tsx:91` (`<StatusBar style="dark" />`), but `<Screen>` then overrides it every time it mounts.
- Hardcoded chakra accents are scattered across `you.tsx:55-114` (e.g. `#5645A6`, `#9B5BA1`, `#3F8A5F`, `#E07A2C`, `#3D9DC4`, `#CFB57E`) — these don't all map to `chakraColors` in `tokens.ts`. The chart route uses `#5645A6`, blueprint also `#9B5BA1`, but the Crown chakra in tokens is `#8A7AA8`. Same colour family, but different value. Pick one.
- `tokens.semantic.accent` is `#C9A07A`, but `you.tsx:85` and `about.tsx` references `#CFB57E` as the retreats accent. `#CFB57E` is the legacy `brandGold` — keep one gold.
- The legacy `obsidian` / `charcoal` / `bone` aliases are still exported from `tokens.ts:34-42`. Hard to grade without grepping callers, but every alias that survives is a future re-introduction of dark-theme drift.

### 4. Typography — 3 / 4

**Working:**
- Display = Cormorant Garamond, body = Inter, mono = JetBrains. Consistent throughout `Text.tsx:47-119`.
- The italic-display variant (`displayItalic`) is used in exactly the right places — affirmation card, sub-tagline, journal prompt.
- The kicker pattern (uppercase 10-11px Inter Medium, letter-spacing 1.5-3) is a strong house style.

**Sizing chaos:**
- Greeting on Home: 28 + 46 (`index.tsx:188,195`). Plans H1: 36 (`plans.tsx:106`). Tips H1: 30 (`tips.tsx:88`). Insights H1: 30 (`insights.tsx:138`). About sectionH: 32 (`about.tsx:427`). About hero h1: 44 (`about.tsx:384`). Retreats H1: 32 (`retreats.tsx:124`). Plan day title: 30 (`plan/[id]/day/[n].tsx:163`). Chakra title: 40 (`chakra/[id].tsx:87`). Unblocking sectionHeader: 26 (`unblocking-process.tsx:339`). That is **9 distinct H1 sizes** across 10 screens. There's no system.
- `fontSizes` in `tokens.ts:137-146` ships a clean scale (12/14/16/20/24/32/48/64) — but the screens ignore it and inline arbitrary values (15, 17, 18, 22, 26, 28, 30, 36, 40, 44, 46).
- `displayItalic` is hardcoded to fontSize 22 in `Text.tsx:78`, then overridden inline to 15, 16, 17, 19, 22, 24 across consumers. Same problem.

**Hierarchy is mostly intact within a screen** — Home reads top-to-bottom with no ambiguity, the unblocking page's step heading is clearly larger than the action bullet. That's why this isn't a 2. But pull two screens side by side and they don't feel like the same product.

### 5. Spacing — 2 / 4

**Problems are systemic, not catastrophic:**
- Scroll padding: 20 (Plans, Tips, Insights, Unblocking), 22 (Home), 24 (About) — three values.
- Card padding: 14, 16, 18, 20, 22 — see top fix #4 for the audit. Eight values across roughly 30 card patterns.
- Card border radius: 16 (Tips, Unblocking dual), 18 (Tips card, Insights small), 22 (Plans, Home buttons, Insights big), 24 (Home flagship, Unblocking hero), 26 (Home flagship outer) — five values. `radii` token offers `lg=16, xl=20, r2xl=24` — pick three.
- Gap between cards in a stack: 10 (Unblocking steps), 12 (You menu), 14 (Insights row, Plans, Tips, Home buttons), 18 (Plans list) — three values.
- The Unblocking-process page is also internally inconsistent: `gap: 10` between steps (`unblocking-process.tsx:347`), `gap: 12` between dual-col cards (`unblocking-process.tsx:313`), `marginBottom: 14` between anchor cards (`unblocking-process.tsx:455`).

**Tap targets:** Most pressables clear the 44px floor (Home buttons are `paddingVertical: 20` so ~64px high, You menu items are `padding: 18` = ~58px high, Plans cards are 240px tall). The settings gear (`index.tsx:174-180`) is `padding: 6` on a 26px svg = ~38px, mitigated by `hitSlop={10}` → effective ~58px. Fine.

**Generosity is right** — nothing feels cramped, the breathing room around the Home greeting and Plans cards is excellent. The issue is purely consistency.

### 6. Experience Design — 1 / 4

This is the second-most-serious finding.

**Navigation is broken:**
- Bottom tabs: `Today / Library / Plans / You`. Home then routes users to `Tips` (`/(tabs)/tips`) and `Insights` (`/(tabs)/insights`) as if they were tabs (`index.tsx:160-161`). They aren't — they're hidden under `<Tabs.Screen href={null}>` patterns the user must back out of.
- The Home page heroes "Rooted Through 1, Pulled Through 7" as the flagship, sending users to `/unblocking-process`. But `unblocking-process.tsx` is a one-off detail route, not a tab. To get back to it the user has to scroll Home OR open `You` and find row #1 of a 12-row list. The signature product has weak surface area.
- `you.tsx:35-123` is a flat list of 12 destinations with zero visual grouping. "Profile & Settings" and "Rooted Through 1, Pulled Through 7" are weighted identically. The single most important entry (the flagship process) is buried.
- Library tab still renders its old horizontal scroll-rows pattern (`library.tsx:191-334`) which doesn't match the visual language of the Plans / Tips / Insights tabs. Library feels like a different app.

**State coverage:**
- `Plans` tab — no loading, no empty state. `PLANS` is static so today it's fine, but the moment plans come from backend this breaks.
- `Insights` tab — has one empty state for missing wheel (`insights.tsx:64-71`). Good. No loading or error.
- `chakra/[id].tsx:30-36` — has a `Chakra not found` fallback. Good. No loading state for `PaywallModal`.
- `plan/[id]/day/[n].tsx:48-57` — has a `Day not found` fallback. Good. No completion state shown after `markDone()` — it just navigates.
- `about.tsx:241-243` — waitlist has a `done` state. Good. No error path (`joinWaitlist` swallows errors silently in the `finally`).
- Tips tab — pure static, no state coverage needed.

**Other interaction risk:**
- Home flagship card press-state: `opacity: 0.92, scale: 0.99` (`index.tsx:80`). Visible but subtle — fine.
- Chakra-detail tab switcher (`chakra/[id].tsx:138-159`) — visually it's `borderBottom`, which is the right pattern, but the accent shifts per chakra so the visited-tab indicator can clash with the chakra hero colour (root: `#6B1F1F` on `#6B1F1F` ≈ invisible).
- Settings gear opens `/(tabs)/profile` which is hidden (`_layout.tsx:111`). Works, but if anything in profile pushes another route, the back behaviour is muddy because the tab the user was on (`index`) is the same tab that hosts `profile`.

---

## Screen-by-screen notes

### Home tab — `app/(tabs)/index.tsx`

Strongest screen in the app. The greeting + flagship + 4 buttons + briefing layout reads like a real product. Two concrete polish items:
- `greetingName` is lowercased (`{friendlyName.toLowerCase()}` line 70). Fine for "friend" but if a user enters "Fadia" they get "fadia" — feels like an iMessage handle, not a greeting. Either leave the case alone or commit fully and lowercase the whole greeting.
- The flagship card hardcodes `#E8C9C2` and `#C9B7E5` as the 1/7 accents (lines 92-95) — these aren't in the token system. Move them to `chakraColors.root` (gives a redder 1) and `chakraColors.crown` (gives a richer 7) — they're already used identically on the unblocking-process hero (lines 69-72), so it'll be DRYer.
- The cosmic note kicker is 10px (`briefingKicker:282`). On a white-translucent card over the sunset that's borderline legible. Bump to 11.

### Unblocking Process — `app/unblocking-process.tsx`

Solid. Two issues:
- Step card border-left colour is the chakra accent. Six of the seven chakras hit fine on translucent white; root red `#6B1F1F` is so deep it reads almost-black and breaks rhythm.
- "ENERGETIC ANCHOR" + "KEY REMINDERS" + "CLOSING STATEMENT" all use the same card style (`anchorCard`) with the same kicker style — the visual rhythm is repetitive. Closing statement gets a dark inverted card (`closingCard:485`) which works. The middle two could swap to a left-bordered card to break monotony.
- `tagline` at the bottom (line 506) is small italic centre-aligned and floats with no card — looks orphaned. Either delete or tuck inside the closing card.

### Chakra detail — `app/chakra/[id].tsx`

The chakra-coloured top is a strong call. But the page mixes three visual languages:
1. The `colorHero` block (your new style)
2. The Frequency player and Unblock CTA (chakra-tinted translucent cards — OK)
3. `affirmCard` and `sessionCard` (`styles.affirmCard:484` and `styles.sessionCard:489`) — these still use `tokens.semantic.bgElevated` which is the legacy translucent surface, designed for the old sunset palette, not the saturated chakra gradient.

Also — `Section` titles (`chakra/[id].tsx:372`) render with `variant="heading3"` (20px Cormorant) — but the chakra hero title is 40px. Below it the next-largest text is 20. That's a 2x jump. Add an intermediate 28-30 for section heads.

### Plans tab — `app/(tabs)/plans.tsx`

Cleanest tab in the app. Two items:
- `coverUri ?? ''` (line 54) — empty string fed to HeroImage means the network image source is invalid and the gradient fallback shows. If a plan ever has no cover, it falls back to a generic sunset — visually OK but every plan card looks identical. Either guarantee covers in data or add a per-plan fallback gradient using `plan.coverColor`.
- `tint={plan.coverColor}` + `overlayStrength={0.60}` — 0.60 is aggressive when the cover is already a moody photo. Drop to 0.45 and the photo breathes.

### Plan day runner — `app/plan/[id]/day/[n].tsx`

Paints `tokens.semantic.bgBase` (`styles.footer:309`) — solid muted coral. The hero card is chakra-tinted, the affirmation card is chakra-tinted, the 3 steps are chakra-tinted. So you get four nearly-identical tinted cards on a flat coral background. Visually monotone.

- The bottom `markDone` button is on a coloured `footer` strip with a `borderTopWidth: 1` — looks like a sticky toolbar, which is correct, but the `bgBase` and `borderSubtle` token combo makes the strip nearly invisible on the new palette.
- Add an InsideBackground wrapper. Reduce the chakra-tint on the hero so the affirmation pops against it.

### Tips tab — `app/(tabs)/tips.tsx`

Crisp content, weak visuals. Adding the `ChakraSymbol` (it already exists — used on chakra detail) inside each card head would solve the "list-of-strings" feeling instantly. Number `01` (line 47) is the right move but Cormorant at 26px is heavier than the chakra label at 11px — it dominates and pulls attention away from the mantra.

### Insights tab — `app/(tabs)/insights.tsx`

`bigNumber` at 56pt Cormorant (`insights.tsx:185`) is gorgeous as the focal stat. But:
- The page never draws the wheel. The data is here, the LIFE_AREAS are imported, the lowest-area name is rendered — but no chart, no wedge graphic. The whole point of "the Wheel" is to *see* it. Add a small 8-wedge SVG.
- "YOUR CURRENT FOCUS" card uses `body` paragraph with `bodyBold` inline (`insights.tsx:104-110`). The chakra name in gold accent inside a paragraph is fine for English but breaks if anyone localises. Move it to a separate `kicker + value` row.

### You tab — `app/(tabs)/you.tsx`

This is the weakest visual page. 12 link rows in a list. The flagship process is row 1, profile is row 12, gratitude is row 9 — but visually nothing tells the user that. Group into three blocks: **The Map** (Wheel of Life, Chart, Blueprint, Chakra Map), **The Practice** (Rooted Through 1/7, Vision, Gratitude, Journal, Journey), **Other** (Relationships, Retreats, Profile). Use section eyebrows.

- Also: this screen uses `Screen` (line 126), which means the solid `bgBase` paints behind it. Confirmed the colour-pillar problem.

### About / sales page — `app/about.tsx`

The strongest copy in the app — the feature grid is well-typed, the brand-voice quote is a clever inclusion. Visual flaws:
- Hero h1 is 44px (line 384) — the only place in the app at this size. If you commit to 44 as "marketing hero", great. Otherwise pull to 40 for consistency.
- `featCard` uses `width: '48%'` + `flexGrow: 1` + `minWidth: 200` (lines 444-447) — on narrow viewports this gives ragged grid behaviour. Lock to `width: '100%'` below 480 with a single-column fallback.
- No InsideBackground — see the colour-pillar finding.

### Retreats — `app/retreats.tsx`

Cards are well-structured but visually they're 4 nearly-identical coloured rectangles. Add cover imagery for each (founder photo for signature, candid couple shot for soulmate, etc.) — the premium price point earns the image budget.
- "Location announced to waitlist" is repeated 4 times. Compress to a single footer note or kill it.
- No InsideBackground.

---

## What's working well

- **Brand voice is uniformly excellent.** Better than 95% of wellness apps. The "Stop X. Start Y." pattern in plan taglines is sticky and memorable.
- **Home + Plans + Tips + Insights + Unblocking-process + Chakra-detail look like a real, considered product.** When the new visual system is applied, it's strong.
- **The flagship card on Home is a genuine landing-page-quality moment.** Most apps don't have one. This one does.
- **The Cormorant + Inter pairing is correct for the niche** — feels editorial without going precious.
- **`HeroImage` with gradient fallback** is the right primitive. Reliable.
- **Per-chakra accent colours are mathematically blended into the sunset palette** (`ChakraBackground.tsx:64-71`). Sophisticated, easy to miss, exactly the right call.
- **Accessibility labels are mostly present** on Pressables (`accessibilityLabel`, `accessibilityRole="button"` — consistent in Home, Plans, Tips, Unblocking, Chakra detail).
- **Empty states exist where they matter most** (Insights wheel, Chakra detail, Plan day fallback).
- **The 21-day plan tagline copy ("Stop dragging it. Start fresh.") is the brand voice in two sentences.** Keep that on every plan cover.

---

## What's still missing structurally

- **5-tab nav not delivered.** Bottom bar is still 4 tabs (`Today / Library / Plans / You`). Home links to Tips and Insights as if they were tabs — they aren't. Pick one architecture and ship it.
- **`<Screen>` wraps the whole app in `bgBase` solid coral.** The three new gradient backgrounds (`SkyBackground`, `InsideBackground`, `ChakraBackground`) are only opted into by 6 screens. Either deprecate `<Screen>`'s background or make `<Screen>` default to `<InsideBackground>` for any route outside Home/Chakra.
- **`StatusBar barStyle="light-content"` inside `Screen.tsx:72`** contradicts the global `style="dark"` from `_layout.tsx:91`. On iOS the status bar will be white text against a cream background → invisible.
- **Library tab has not been re-skinned.** It still uses horizontal scroll-rows and the old "card-on-dark" patterns — it sticks out hard against the new tabs.
- **Onboarding (`(onboarding)/*`) is entirely on the old palette.** First-time users land on the muted pink and never see the sunset until after the Wheel.
- **Chakra-detail's affirmation and session cards use the old `bgElevated` translucent-white** over the chakra gradient — muddy.
- **Insights tab references "the wheel" but never draws it.** Missing visualisation.
- **You tab is a flat list of 12 menu items.** No grouping, no visual hierarchy, no surfacing of the flagship process.
- **Legacy palette aliases (`obsidian`, `charcoal`, `bone*`) still exported from `tokens.ts:34-42`.** Tech debt that will quietly re-introduce dark-theme drift if not removed soon.
- **Hardcoded hex colours in `you.tsx:55-114` and `about.tsx:298-346`** don't map back to `chakraColors`. Move them or commit them to a `featureAccents` token block.
- **Retreats has no imagery for a premium product.** Cards alone don't sell a 5-day in-person event.
