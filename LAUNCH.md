# Within — Launch Activation Steps

Everything that requires YOUR action to flip on. The code is all shipped.
Each step is independent — do them in any order, or skip any you're not
ready for. The web app already works at https://dist-sage-ten-11.vercel.app
without any of these.

---

## 1. Activate Vercel KV for production rate limiting (2 minutes)

**Why:** The current rate limiter is per-Vercel-instance (in-memory), so
a distributed attacker can spread requests across regions to drain
ElevenLabs credits. Vercel KV gives one shared counter across all
instances.

**Steps:**

1. Go to https://vercel.com/dashboard → your `app` project
2. **Storage** tab → **Create Database** → **KV**
3. Region: pick the one closest to your users (US-East is fine default)
4. **Connect to Project** → select `app` → all environments
5. Done. Vercel auto-injects `KV_REST_API_URL` + `KV_REST_API_TOKEN`
6. Trigger a redeploy: `cd app && vercel deploy --prod --yes && vercel alias set <new-url> dist-sage-ten-11.vercel.app`

**Verify it's live:**
```bash
# Hit /api/tts 22 times in a burst — the 21st request should now return 429
for i in {1..22}; do curl -s -o /dev/null -w "%{http_code}\n" -X POST https://dist-sage-ten-11.vercel.app/api/tts -H "Content-Type: application/json" -d "{\"text\":\"test $i\"}"; done
```

**Cost:** Free tier covers ~30k requests/day. Plenty for launch.

---

## 2. Initialize EAS for mobile builds (5 minutes)

**Why:** Required before `eas build` can produce iOS/Android binaries
for TestFlight / Play Console.

**Prerequisites:**
- Free Expo account at https://expo.dev
- Apple Developer account ($99/yr) for iOS builds
- Google Play Console account ($25 one-time) for Android builds

**Steps:**

```bash
cd app
npx eas-cli@latest login           # log in with your Expo account
npm run eas:init                   # populates app.json extra.eas.projectId
npm run eas:build:preview          # builds preview .ipa / .apk for testing
```

The `eas:init` will overwrite the `REPLACE_WITH_EAS_PROJECT_ID`
placeholder with a real UUID. Commit that change.

**Submitting to stores** (after build succeeds):
```bash
npm run eas:submit:ios       # uploads .ipa to App Store Connect
npm run eas:submit:android   # uploads .aab to Play Console
```

Before `eas:submit:ios` works, fill in `eas.json`:
- `appleId` — your Apple ID email
- `ascAppId` — App Store Connect numeric app ID (from a created App Store Connect record)
- `appleTeamId` — your 10-char Apple developer team ID

Before `eas:submit:android` works:
- Generate `google-play-service-account.json` from Play Console →
  Setup → API access → Create service account
- Save it in the project root (already gitignored)

---

## 3. Wire the within.app domain (15-30 minutes once domain purchased)

**Why:** Cleaner URL for sharing, enables universal links / app links
so tapping a within.app link in iMessage / Gmail opens the app instead
of the browser.

**Steps:**

### A. Buy the domain
Namecheap, Cloudflare Registrar, Google Domains, etc.

### B. Point it at Vercel
1. Vercel dashboard → project `app` → **Settings** → **Domains**
2. Add `within.app` and `www.within.app`
3. Vercel shows you the DNS records to add at your registrar:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
4. Add those at your registrar. Propagation: 5-60 min.
5. SSL certs auto-issue once DNS resolves.

### C. Universal Links + Android App Links
The verification files are already in place — they ship to
`dist/.well-known/apple-app-site-association` and
`dist/.well-known/assetlinks.json` on every build, with the right
Content-Type headers via `vercel.json`.

You still need to fill in the placeholders:

**`public/.well-known/apple-app-site-association`:**
- Replace `REPLACE_WITH_APPLE_TEAM_ID` with your 10-char Apple Team ID
  (Apple Developer → Membership → Team ID)
- That gives Apple a string like `K1L2M3N4P5.com.within.app`

**`public/.well-known/assetlinks.json`:**
- Replace `REPLACE_WITH_SHA256_FROM_PLAY_CONSOLE_APP_SIGNING_PAGE`
  with your release signing cert SHA-256 fingerprint
- Get it from Play Console → your app → Setup → App integrity →
  App signing → "App signing key certificate" → SHA-256 certificate fingerprint
- Format must be uppercase colon-separated, e.g.
  `AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99`

### D. Verify
After deploy, check:
```bash
curl -s https://within.app/.well-known/apple-app-site-association | jq .
curl -s https://within.app/.well-known/assetlinks.json | jq .
```
Both must serve `Content-Type: application/json` (no `.json` extension on the AASA file — Apple is picky).

---

## 4. Optional: tighten production hardening

These are nice-to-haves that aren't blocking but matter at scale:

| Item | When to do | Effort |
|---|---|---|
| Add Sentry/Bugsnag for crash analytics | When you have >100 daily actives | 1h |
| Hook `api/log-error.ts` to a Slack/Discord webhook | Now if you want real-time alerts | 15 min |
| Set `TTS_ALLOWED_ORIGINS` env var | When you launch within.app domain | 30 sec |
| Image-optimize the splash assets | Before App Store submission | 30 min |
| Add an error-budget dashboard | When you have a real user base | 2h |

---

## What's already done

- Web app live: https://dist-sage-ten-11.vercel.app
- Public GitHub repo: https://github.com/fadiagulec/within-app
- ElevenLabs voice + Web Speech fallback
- All 21 journey days unlocked
- All 10 breathwork scripts + 8 chakra healing scripts
- Voice dictation on journal + gratitude
- Onboarding flow + welcome flow + paywall
- Branded splash + SEO meta + robots.txt + sitemap.xml
- Crash reporting to `/api/log-error` (logs to Vercel function logs)
- Rate-limit code (in-memory now, KV-backed once activated above)
- ErrorBoundary at root + global error handlers
- Zustand persist with version + migrate + defensive merge on all 12 stores
- 33 audit findings closed across 4 audit cycles
