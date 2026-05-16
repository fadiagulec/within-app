# Soma — App Architecture

**Generated:** 2026-04-27
**Source:** the full vision conversation + the chakra/Wheel of Life PDFs you shared
**Voice rule (your words):** *"Astrology can talk a lot to say nothing. Ours needs to be sharp, easy to understand, save time, be practical."* Every sentence in every screen has to pass this test.

---

## 1. The product in one sentence

**Soma is your in-pocket energy coach. You tell it how you feel. It tells you exactly what to do — breath, meditation, frequency, ritual — pulled from your chart, your Human Design, your chakra map, and what you've already done this week.**

Not "explore wellness." Not "your healing journey awaits." Sharp. Practical. Tell-me-what-to-do.

---

## 2. The unifying metaphor: the 8-chakra spine

Every piece of content in the app is tagged to one of 8 energy centres. The Wheel of Life maps 1:1 to chakras (this is your existing model — I'm just naming it explicitly):

| # | Chakra | Sanskrit | Frequency | Life area (Wheel) | Blocked by |
|---|---|---|---|---|---|
| 1 | Root | Muladhara | LAM 396Hz | Physical Health | Fear (100) |
| 2 | Sacral | Svadhisthana | VAM 417Hz | Mental & Emotional State | Guilt (30) |
| 3 | Solar Plexus | Manipura | RAM 528Hz | Financial Wellbeing | Shame (20) |
| 4 | Heart | Anahata | YAM 528Hz | Relationships | Grief (75) |
| 5 | Throat | Vishuddha | HAM 741Hz | Personal Development | Lies (125) |
| 6 | Third Eye | Ajna | UMM 852Hz | Business / Career / Vocation | Illusion of separation |
| 7 | Crown | Sahasrara | OMM 963Hz | Spiritual Fulfillment / Purpose | Earthly addictions / 3D world |
| 8 | Soul Star | Viyapini | Silence | Time & Presence | Illusion & limitation of space and time |

This table IS the spine. Wheel of Life score on "Financial Wellbeing" = 3/10 → app routes to Solar Plexus content (RAM 528Hz tone + Solar Plexus unblocking script + Manipura affirmations + a journal prompt about shame). One score → a complete protocol pulled from one column.

**This is what makes Soma different from every other wellness app: one coherent system, not five disconnected modules.**

---

## 3. The user journey (the arc you described)

```
Day 0:    User downloads. Onboards in 90 seconds. Birth data + Wheel of Life self-score.
          Outcome: app knows their chart, HD type, chakra weakness map.

Day 1:    "Today" tab opens to a Daily Briefing.
          "Your Sacral is low this week. Today: 8 min Diaphragm Release →
           5 min Sacral unblocking script → 1 journal prompt."
          User taps Begin. Done in 15 minutes.

Day 7:    They've done 5 of 7 daily protocols. App suggests their first 21-Day Plan.
          "Letting Go of the Past" — paywall here. They subscribe.

Month 3:  They book the in-person retreat. They become magnetic. Etc.
```

**Three coach surfaces, all routing to the same content engine:**

1. **Daily Briefing** (Today tab, every day) — passive, opens-and-knows-what-you-need
2. **Symptom Wizard** (anywhere — "I feel ___") — active, user-initiated
3. **21-Day Plan** (paid) — structured, weeks-long arc

---

## 4. Information architecture (4 tabs, nothing more)

```
┌─────────────────────────────────────────────────────────┐
│  TODAY        LIBRARY        YOU         PLANS          │
└─────────────────────────────────────────────────────────┘
```

### TAB 1 — Today
The single most important screen. What you see when you open the app.
- **Daily briefing card:** "Sacral 3/10 + tired check-in → 4-7-8 breath, then this affirmation, then 1 journal line."
- **Current 21-day plan progress** (if enrolled): Day 7 of 21, today's prompt
- **Cosmic note** (if astro enabled): "Mercury retrograde tomorrow. Slow down on contracts."
- **Big "I feel ___" button** → opens the Symptom Wizard

### TAB 2 — Library
All the practices, organized by chakra (because chakras are the spine).
- Filter by: chakra / energy effect (calming/activating/balancing) / time available / blockage type (fear/guilt/shame/grief/lies/illusion)
- Each chakra has: breathwork sessions · meditations · unblocking script · sound frequency · affirmations · journal prompts · short-guide PDF
- Search: "I need help with money" → shows Solar Plexus column content
- Quick chips: Anxious / Tired / Angry / Stuck / Can't sleep (you already have these — keep them)

### TAB 3 — You
Personalization layer. Owned by the user.
- **Wheel of Life** — current scores, history, retake button (re-score any time)
- **Chakra map** — body diagram with current state of each chakra (driven by Wheel + check-ins)
- **Your chart** (when astro is built) — natal chart, current transits hitting it
- **Your blueprint** (when HD is built — note IP issue below) — type, strategy, authority
- **Streaks, completed sessions, journal entries**

### TAB 4 — Plans
Paid arcs. Where the money is.
- **21-Day Plans** (your invention — sells well, builds habit, completable)
- **3-Month Courses** (your "Letting Go of the Past" Jan–Mar idea)
- **Retreats** (in-person — bookings page)
- **Collaborations** (Ayurveda with Barbara, etc. — guest practitioner content)

### Removed from tabs
Move to destinations only (reachable from Today / Library / a Plan):
- Breath, Journal, Journey, Vision, Profile (currently tabs) → fold into the 4-tab structure above
- Profile → menu icon top-right of Today
- Vision board → inside You tab
- Journey → becomes the 21-day plan engine inside Plans
- Journal → quick-action button on Today + history inside You

**Why fewer tabs:** every time a tab gets added, the user has to choose what they want. The app's job is to choose for them. Four tabs. Today does the choosing.

---

## 5. The Coach Engine (the routing layer)

This is the new component that ties everything together. It lives in `src/coach/` (new directory).

```
INPUTS                         COACH ENGINE                     OUTPUTS
──────                         ────────────                     ───────
- Wheel of Life scores      ┌──────────────────┐               - Daily briefing
- Today's check-in          │                  │               - Today's protocol (3-step)
- Recent completions        │   1. Score gap    │               - 21-day plan
- Time of day               │   2. Match chakra │   ───────►    - "I feel ___" suggestions
- Astrology transits        │   3. Pull content │               - Adaptive affirmation
- HD type/authority         │   4. Sequence it  │               - Cosmic note
- "I feel ___" input        │                  │
                            └──────────────────┘
```

**v1 implementation = rule-based, not LLM.** Deterministic. Cheap. Predictable.
- "Lowest Wheel score → that chakra's content pool → 3-step protocol (breath + practice + journal)"
- This is 200 lines of TypeScript. Ships in a day.

**v2 = LLM synthesis layer on top.** When the user types something the rules don't handle, an LLM call wraps the rule-based pull in a personalized narrative. Adds cost + latency, but answers anything.

**v3 = full chat coach.** Stretch.

You already have the seed of v1: [`getQuickRecommendation()`](src/data/breathwork-nervous-system.ts) maps moods to breath patterns. Generalize that to all 8 chakras × all 5 content types and you have the engine.

---

## 6. Content model (what every chakra needs)

For each of the 8 chakras, the data file should contain:

```ts
type ChakraSpine = {
  id: 'root' | 'sacral' | 'solar-plexus' | 'heart' | 'throat' | 'third-eye' | 'crown' | 'soul-star';
  name: string;             // "Root Energy Centre"
  sanskrit: string;         // "Muladhara"
  color: string;            // tokens
  frequencyHz: number;      // 396
  syllable: string;         // "LAM"
  bodyLocation: string;     // "Base of spine"
  lifeArea: string;         // "Physical Health"
  blockedBy: { name: string; weight: number }; // Fear (100)
  attributes: string[];     // material world, vitality, survival, ...
  balanced: string[];       // 20-ish balanced characteristics
  unbalanced: string[];     // 20-ish unbalanced characteristics
  
  // Practice content
  breathworkIds: string[];  // → src/data/breathwork.ts
  meditationIds: string[];  // → src/data/meditations.ts
  unblockingScriptId: string; // → src/data/unblocking-scripts/{root}.txt (NEW)
  affirmations: string[];   // 30+ short, sharp, in your voice
  journalPrompts: string[]; // weekly audit + vision board prompts
  frequencyAudio: string;   // path to LAM-396Hz.mp3 (when uploaded)
  shortGuide: string;       // 200-word "what is this chakra & how it shows up"
};
```

**You already have most of this scattered across:** [`chakras.ts`](src/data/chakras.ts), [`chakra-content.ts`](src/data/chakra-content.ts), [`chakra-states.ts`](src/data/chakra-states.ts), [`chakra-short-guides.ts`](src/data/chakra-short-guides.ts), [`soul-chakra.ts`](src/data/soul-chakra.ts). **Consolidate into one canonical `src/data/chakra-spine.ts`** that has all 8 entries with all fields. Everything else references it.

The PDFs you shared today populate the `attributes`, `balanced`, `unbalanced`, `blockedBy`, `frequencyHz`, `syllable`, `bodyLocation` fields exactly. I can transcribe all 8 chakras from your screenshots into this canonical file in one pass.

---

## 7. The 21-Day Plan format

This is the **most ship-shaped paid product in your vision**. Concrete spec:

```
Day 1-7   "OPEN"        — chakra opening + body work (breath + frequencies + light scripts)
Day 8-14  "RELEASE"     — meditation + belief work + journaling
Day 15-21 "INTEGRATE"   — manifestation + affirmations + lock-in rituals

Daily structure (every day, same shape):
  ▸ 1 affirmation (adapts to yesterday's completion / mood)
  ▸ 1 breath (3-12 min)
  ▸ 1 practice (meditation OR script OR frequency listen — varies by week)
  ▸ 1 journal prompt (1-3 lines, not an essay)

Total daily commitment: 15-20 minutes. Completable. Habit-forming.
```

**Three v1 plans (sells separately, $X each, or $Y for all 3):**
1. **Letting Go of the Past** (Jan launch — your idea — Heart + Sacral + Throat focus)
2. **Build Abundance** (Solar Plexus + Heart + Crown)
3. **Magnetic Self** (Soul Star + Third Eye + Crown — the "becoming a master" arc)

Each plan = a JSON schedule + 21 affirmations + 21 daily-tip strings. ~3 days of content design work, ~1 day of code.

---

## 8. Sound / frequencies

You said this is a UX gap — going to YouTube and typing in 528Hz is friction. Solve it in-app.

**v1 = simple tone player.**
- One looped audio file per chakra (you'll upload them).
- "Play Root frequency for 5 min" button on the chakra page.
- Background-audio enabled (already configured in [`AudioPlayer.tsx`](src/components/player/AudioPlayer.tsx)).
- Combinable with any other practice (run frequency under a meditation).

**v2 = layered soundscapes.** Frequency + binaural + ambient nature loop. Like a real sound bath.

---

## 9. Astrology + Human Design (the personalization layer)

This is the v2 layer. Don't build for v1 launch — but design data shapes now so they're not bolted on later.

### Inputs (collect once at onboarding)
```
- Full birth date
- Birth time (with "I don't know" path → fall back to noon, label results "approximate")
- Birth city (geocoded → lat/lng/timezone)
```

### Astrology
- **Library:** Swiss Ephemeris (AGPL — viral, may not work for closed-source mobile) OR commercial API (AstroDienst, Astro Seek). **Decision needed.**
- **Computed once at onboarding:** sun, moon, rising, planet positions, houses
- **Computed daily on-device or server:** today's transits to natal chart
- **Surfaced as:** Today's "cosmic note" + You tab's chart view

### Human Design
- **IP risk: real.** "Human Design" is Jovian Archive's trademark. The BodyGraph visual is theirs. Calculations themselves (gates, channels, type) draw from public-domain I-Ching + astrology.
- **Recommendation:** call it **"Energy Blueprint"** in-app. Show your own re-drawn chart visual. Use the underlying calculation logic. Get a lawyer to confirm before launch. (Several apps have done this — e.g. "MyBodyGraph" was one of the first; "Human Design America" got pressure.)

### Lunar / transit feed (the small concrete win)
- Compute next 30 days of: full moons, new moons, Mercury / Venus / Mars retrogrades, eclipses
- Show on Today as a one-line note when relevant ("Full moon in Scorpio tomorrow → release ritual queued")
- Add a "Tonight's ritual" to the daily briefing on full / new moons
- This ships **without** needing per-user chart data — universal events. Easy v1 win.

---

## 10. Brand voice rules (non-negotiable)

Your words, formalized:

✅ **DO**
- Tell the user what to do, in plain English.
- Lead with the verb. "Slow your breath." not "We invite you to..."
- Say what each thing IS for. "For when your chest is tight." not "An ancient pranayama practice."
- Use numbers. "5 minutes." "3 rounds." "Day 7 of 21."
- Use everyday words for everything except the 8 chakra Sanskrit names (those stay).

❌ **DON'T**
- Use phrases like "vagal output," "HPA axis," "controlled hyperventilation," "modulates the autonomic nervous system." Clinically right, brand-voice wrong.
- Use phrases like "embark on your sacred journey," "align with your highest self," "the universe is conspiring." Astrology word salad.
- Write paragraphs when one line works.
- Use the word "journey" more than once per screen.

### Example rewrite (the science copy I shipped last night)

❌ **OLD** (in [`src/data/breathwork.ts`](src/data/breathwork.ts) right now):
*"The long, controlled exhale lengthens vagal output and slows heart rate within minutes — one of the fastest ways to down-shift the nervous system."*

✅ **NEW** (under your voice rule):
*"Slows you down fast. Best when your chest is tight or your mind won't stop."*

**Action item: rewrite all 7 `science` fields in `breathwork.ts` under this voice. 10 minutes of work. Want me to do it now? See "Open decisions" at the bottom.**

---

## 11. What's already in your codebase that we leverage

You don't need a from-scratch rebuild. Most of the spine exists:

| Need | Already exists |
|---|---|
| 8-chakra data | [`chakras.ts`](src/data/chakras.ts), [`chakra-content.ts`](src/data/chakra-content.ts), [`chakra-states.ts`](src/data/chakra-states.ts), [`chakra-short-guides.ts`](src/data/chakra-short-guides.ts), [`soul-chakra.ts`](src/data/soul-chakra.ts) — needs consolidation into one canonical file |
| Wheel of Life | [`wheel-of-life.ts`](src/data/wheel-of-life.ts), [`useWheelStore`](src/store/useWheelStore.ts) |
| Breathwork | [`breathwork.ts`](src/data/breathwork.ts) (7 sessions, with `science` + `chips` I added last night), [`breathwork-nervous-system.ts`](src/data/breathwork-nervous-system.ts) (the routing seed) |
| Meditations | [`meditations.ts`](src/data/meditations.ts) |
| Unblocking process | [`unblocking-process.ts`](src/data/unblocking-process.ts) (data) + [`unblocking-process.tsx`](app/unblocking-process.tsx) (screen) — ready to load your PDF scripts |
| Audio playback | [`AudioPlayer.tsx`](src/components/player/AudioPlayer.tsx) — already does background audio + scrub-lock |
| Journaling | [`journaling.ts`](src/data/journaling.ts), [`useJournalStore`](src/store/useJournalStore.ts) |
| Levels / paywall | [`levels.ts`](src/data/levels.ts), [`PaywallModal.tsx`](src/features/payments/PaywallModal.tsx) (Stripe wiring TODO — see launch punch list) |
| Check-in flow | [`check-in.tsx`](app/check-in.tsx) |
| Burnout assessment | [`burnout-quiz.tsx`](app/burnout-quiz.tsx), [`burnout-result.tsx`](app/burnout-result.tsx) |
| Symptom routing primitive | `getQuickRecommendation()` in [`breathwork-nervous-system.ts`](src/data/breathwork-nervous-system.ts) |
| Multiple specialized programs | [`get-unstuck-program.ts`](src/data/get-unstuck-program.ts), [`connecting-to-light.ts`](src/data/connecting-to-light.ts), [`protecting-your-light.ts`](src/data/protecting-your-light.ts) |

---

## 12. What needs to be built (the deltas)

### v1 (ship to launch — the core promise)
1. **Consolidate chakra data** into `src/data/chakra-spine.ts` (one canonical 8-entry file, populated from your PDFs)
2. **Coach engine** — `src/coach/` — rule-based v1
3. **Today tab** — daily briefing UI
4. **Chakra-tagged Library** — restructure existing library around the spine
5. **Frequency player** — wire your uploaded audio files to chakra pages
6. **Brand voice sweep** — rewrite the breathwork science copy + audit all screen copy
7. **The 3 launch 21-Day Plans** (content + simple plan-runner UI)
8. **PaywallModal Stripe wiring** (already on launch punch list)
9. **AudioPlayer crash fixes** (already on launch punch list)

### v1.5 (immediately after launch — small wins)
10. Lunar feed (universal, no per-user astro needed)
11. Bedtime mode / sleep frequency loop
12. Brand-voice copy sweep across all 30+ screens

### v2 (post-launch, paid feature unlocks)
13. Astrology natal chart (decide: Swiss Ephemeris vs commercial API)
14. Energy Blueprint (re-named HD)
15. LLM synthesis on top of coach engine
16. Personalized 21-day plans (AI-generated based on chart + Wheel + history)

### v3 (the moat)
17. Your proprietary technique (breath + energy work fusion) — formalized as a named method
18. Retreat booking integration
19. Course platform (3-month structured courses with cohorts)
20. Practitioner collab platform (Ayurveda with Barbara → frame for any future collab)

### Out of scope until at least v2
21. Kids app (separate product — you got cut off explaining; come back to this)
22. AI-entrepreneurship coaching (separate product, separate audience — your "leverage AI to build" thesis is a different movement)

---

## 13. Recommendations from me (you didn't ask, but you said to)

These are things you didn't say but I think make Soma best-in-class:

**A. Audio-first, not text-first.** Most wellness apps lose users at the reading-blocks-of-text step. You already have `AudioPlayer`. Lean into it: every script, every meditation, every affirmation should have a "press play" path. Reading is opt-in.

**B. Privacy-first onboarding.** Birth time + chart data + journal entries = sensitive. Make the onboarding promise explicit ("This stays on your device. We never sell it. We never share it."). Wellness app users are increasingly burned by data sales (Headspace data leak, Calm metrics, etc.). Your differentiator can include this.

**C. Streak counter, but gentle.** Don't punish breaks. "You did 5 days last week. Want to do 5 today too?" Not "You broke your streak. 0 days."

**D. One affirmation per day, persistent.** Lock screen widget showing today's affirmation. iOS 16+ supports this trivially. Massive retention impact for ~1 day of work.

**E. Apple Watch breath widget.** Users hit the breath practice from the wrist. The Watch can vibrate the inhale/exhale rhythm. ~3 days of work. Makes Soma the breath app for Apple users.

**F. Don't promise outcomes. Promise practice.** "Tools to feel grounded" beats "Become magnetic." The first is true and ships. The second is the dream, but written badly it triggers wellness-skepticism. Reserve the strong outcome language for your in-person stage / retreat marketing where context carries it.

**G. The retreat product needs a separate brand layer.** Soma the app and Soma the retreat are different commitments ($10/mo vs $3,000). Same name, but the retreat needs its own micro-site, application form, vetting flow. App is the funnel. Retreat is the conversion.

**H. The proprietary technique needs a name.** "Letting go" is a 21-day plan. Your fusion of breath + energy work needs to be named like Holotropic, Wim Hof, EFT, Reiki — a single term. Once named, every retreat / certification / book / workshop carries it. **The name is the long-term moat.** Worth its own brainstorm session.

---

## 14. Open decisions for you

Before I build any of this, you need to decide:

1. **Brand voice rewrite of `breathwork.ts` `science` field — yes or no?** (10 minutes)
2. **v1 coach engine surface — Daily Briefing, Symptom Wizard, or both?** (Daily Briefing is highest leverage; both is fine.)
3. **Tab restructure — go to 4 tabs (Today / Library / You / Plans) or keep current?** (Bigger change but it's the right shape for the vision.)
4. **First 21-Day Plan — "Letting Go of the Past" for Jan launch?** (Locks the December content production deadline.)
5. **HD naming — "Energy Blueprint" OK?** (Or another name that avoids Jovian Archive IP.)
6. **Astrology data source — Swiss Ephemeris (AGPL risk) vs commercial API ($)?** (v2 question, but design now.)
7. **Proprietary technique name?** (Long-term, but blocks retreat branding.)
8. **AudioPlayer crash bugs + Stripe wiring from the original launch punch list — fix before all this, or in parallel?** (My strong rec: fix first. They block everything else.)

---

## 15. The order I'd ship in

**Week 1 (this week):**
- Fix the AudioPlayer crash bugs from `LAUNCH_REVIEW.md`
- Wire Stripe in `PaywallModal`
- Brand-voice sweep on `breathwork.ts` science copy
- Consolidate the 8-chakra data into `chakra-spine.ts` (transcribe your PDFs)
- Wire the unblocking script PDFs as audio (not text-walls)

**Week 2:**
- Build Today tab with rule-based daily briefing
- Restructure to 4-tab nav
- Frequency player on each chakra page

**Week 3-4:**
- Build the 21-Day Plan engine (generic — runs any plan from a JSON schedule)
- Author content for "Letting Go of the Past"
- Soft launch to a private beta (10-20 people)

**Month 2:**
- Lunar feed
- "Build Abundance" + "Magnetic Self" plans
- Public launch

**Month 3 onwards:**
- Astrology / Energy Blueprint
- LLM coach
- Retreat booking
- Course platform
- Proprietary technique formalized

---

This is the architecture. Pick which of the 8 open decisions you want to make first and I'll build from there.
