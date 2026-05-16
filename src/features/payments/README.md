# SOMA · Payments Setup

Two providers, clean split:

- **RevenueCat** handles in-app purchases on iOS + Android (required by Apple/Google).
  Products ≤ $297 go through here. Works in-app, no browser exit.
- **Stripe Payment Links** handle high-ticket ($997+) and all retreat bookings.
  Opens external in-app browser. Returns to app via deep link on success.

MVP mode: if env vars are not set, the purchase flow falls back to a local stub
so dev/testing continues working without accounts configured.

---

## 1. RevenueCat Setup (Apple + Google mobile purchases)

### One-time account setup

1. Sign up at https://app.revenuecat.com
2. Create a new project: "SOMA"
3. Under **Apps**, add iOS + Android apps matching your bundle IDs
4. Copy the two **Public SDK Keys** (one per platform) — these go into `.env`

### Create products in Apple + Google

**Apple App Store Connect** → My Apps → SOMA → Monetization → In-App Purchases:

| Product ID | Type | Price Tier |
|---|---|---|
| `soma_get_unstuck_47` | Non-Consumable | $46.99 |
| `soma_burnout_97` | Non-Consumable | $96.99 |
| `soma_chakra_deep_19` | Non-Consumable | $18.99 |
| `soma_chakra_bundle_97` | Non-Consumable | $96.99 |
| `soma_elevation_297` | Non-Consumable | $296.99 |
| `soma_inner_circle_monthly` | Auto-Renewable Sub | $18.99 / month |
| `soma_full_library_monthly` | Auto-Renewable Sub | $28.99 / month |

**Google Play Console** → SOMA → Monetize → Products: same IDs, same prices.

### Wire in RevenueCat

1. RevenueCat → **Products** → import/create each of the seven
2. **Entitlements** → create one per product (see `PRODUCT_TO_ENTITLEMENT` in `revenueCat.ts`)
3. **Offerings** → create a default offering with all products as packages
4. Save.

### Test

1. Sandbox tester accounts in App Store Connect
2. Sign in on a dev device with sandbox account
3. Tap any paywall → complete purchase
4. Verify `Purchases.getCustomerInfo().entitlements.active` contains the key

---

## 2. Stripe Payment Links (high-ticket + retreats)

### Create five Payment Links

Stripe Dashboard → **Payment Links** → Create one per product:

| Product | Price | Type |
|---|---|---|
| 1:1 Breathwork Coaching | $997 | One-time |
| 1:1 Theta Healing | $1,497 | One-time |
| SOMA Pulse (3-day) | $2,000 | One-time |
| SOMA Reset (7-day) | $4,000 | One-time |
| SOMA Private | Custom | Invoice flow |

### Configure each link

- **Success URL:** `soma://purchase/success?product=KEY` (swap product key per link)
- **Cancel URL:** `soma://purchase/cancel`
- **Collect:** Name, Email, Phone
- `client_reference_id` flows through automatically (app sets it to user ID)

### Copy URLs to `.env`

Paste each Payment Link URL into the matching var in `.env.example` → `.env`.

### Deep link handling

Stripe redirects to `soma://purchase/success?product=...` on completion.
App handles it in `app/purchase/success.tsx` — unlocks locally + shows confirmation.

### Webhook (V2 recommendation)

For authoritative unlock in production:
1. Stripe → Developers → Webhooks
2. Small backend (Supabase Edge Function or Cloudflare Worker)
3. On `checkout.session.completed` → mark entitlement in DB
4. App reads entitlements from DB on sign-in

MVP local deep-link unlock is acceptable for launch.

---

## 3. Deep Link Configuration

In `app.json`:

```json
{
  "expo": {
    "scheme": "soma",
    "ios": { "associatedDomains": ["applinks:soma.app"] },
    "android": {
      "intentFilters": [{
        "action": "VIEW",
        "data": [{ "scheme": "soma" }],
        "category": ["BROWSABLE", "DEFAULT"]
      }]
    }
  }
}
```

Handled routes:
- `soma://purchase/success?product=KEY` → unlock entitlement
- `soma://purchase/cancel` → cancel message

---

## 4. Files in this folder

| File | Purpose |
|---|---|
| `revenueCat.ts` | RevenueCat SDK wrapper — init, offerings, purchase, restore, listener |
| `stripe.ts` | Payment Link builder + in-app browser checkout |
| `PurchaseStore.ts` | Zustand store tracking local purchases (offline-safe) |
| `PaywallModal.tsx` | Reusable modal paywall for in-context upsells |
| `LockedContent.tsx` | Blur wrapper for gated content with unlock CTA |

---

## 5. Routing Logic

`getCheckoutRouteForLevel(levelId)` in `stripe.ts`:

- Levels 1–5 → RevenueCat (mobile in-app)
- Levels 6–7 → Stripe Payment Link (external)
- Retreats → Stripe (application-based)
- Subscriptions → RevenueCat

---

## 6. Troubleshooting

**"Product not found in offerings"** → add product to default Offering in RevenueCat.

**Purchase succeeds but entitlement missing** → product not attached to its entitlement in RC.

**Stripe redirect doesn't open app** → scheme not registered, rebuild with EAS.

**Dev shows "stub" source** → expected. Env vars not set → stub mode. Ships normally on production build.

---

## 7. Recommended Analytics Events

Fire on:

- `paywall_viewed` — productId, source
- `purchase_started` — productId
- `purchase_completed` — productId, priceUSD
- `purchase_failed` — productId, reason
- `purchase_restored` — count
- `paywall_dismissed` — productId

RevenueCat dashboard has this natively. Sufficient for MVP.
