/**
 * Within — ElevenLabs TTS proxy (Vercel Node serverless function).
 *
 * Path: POST /api/tts
 * Body: { text: string, voiceId?: string, modelId?: string }
 * Response: audio/mpeg bytes (the generated narration)
 *
 * Why this proxy exists:
 *   - The ElevenLabs API key is a secret. It MUST live server-side.
 *   - Shipping it in the client bundle would let anyone burn the credits.
 *   - The proxy reads `process.env.ELEVENLABS_API_KEY` at request time.
 *
 * Hardening (pre-launch):
 *   1. Origin allowlist — reject requests not coming from a known domain.
 *      Server-to-server abusers can spoof the header but this still blocks
 *      drive-by browser abuse.
 *   2. In-memory IP rate limit — 20 req/min/IP. Each Vercel function
 *      instance keeps its own counter, so concurrent instances let through
 *      more, but it's a meaningful brake. For production-grade limiting
 *      add Vercel KV / Upstash here.
 *   3. Generic upstream errors — never echo ElevenLabs's response body back
 *      to the client (it sometimes includes voice IDs / request metadata).
 *   4. 5000-char input cap — matches ElevenLabs per-call limit.
 *
 * Caching:
 *   - Cache-Control 7 days. Identical text+voice → same audio.
 *   - Vercel's edge cache short-circuits repeat requests at no cost.
 *
 * Setup:
 *   1. Vercel project settings → Environment Variables
 *   2. Add ELEVENLABS_API_KEY = <your key> (Production + Preview)
 *   3. Optional: TTS_ALLOWED_ORIGINS = comma-separated list of allowed origins
 *      Default allowlist below covers the current Vercel alias.
 *   4. Redeploy (env-var changes only apply to new deployments)
 */

// Vercel auto-resolves /api/*.ts as Node 18+ functions. No deps required.
// Using `any` for req/res to avoid pulling in @vercel/node as a dep.

const DEFAULT_VOICE = 'kHL7MFWSwpF69uhr0qwj';
const DEFAULT_MODEL = 'eleven_turbo_v2_5';

// Default origin allowlist. Override at runtime via TTS_ALLOWED_ORIGINS env var.
const DEFAULT_ALLOWED_ORIGINS = [
  'https://dist-sage-ten-11.vercel.app',
  'https://within.app',
  'https://www.within.app',
];

// Rate-limit config: 20 requests per 60 seconds per IP.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;
const ipBucket = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const existing = ipBucket.get(ip);
  if (existing === undefined || existing.resetAt <= now) {
    ipBucket.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true };
  }
  // existing is guaranteed defined here — narrow it explicitly for TS.
  const e = existing;
  if (e.count >= RATE_MAX) {
    return { ok: false, retryAfter: Math.ceil((e.resetAt - now) / 1000) };
  }
  e.count += 1;
  return { ok: true };
}

function getClientIp(req: any): string {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length > 0) {
    return (xff.split(',')[0] ?? '').trim();
  }
  if (Array.isArray(xff) && xff.length > 0) {
    return (String(xff[0] ?? '').split(',')[0] ?? '').trim();
  }
  return (req.headers['x-real-ip'] as string) || req.socket?.remoteAddress || 'unknown';
}

function getAllowedOrigins(): string[] {
  const fromEnv = process.env.TTS_ALLOWED_ORIGINS;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return DEFAULT_ALLOWED_ORIGINS;
}

interface Body {
  text?: string;
  voiceId?: string;
  modelId?: string;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Vary', 'Origin');

  // Preflight
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin;
    const allowed = getAllowedOrigins();
    if (origin && allowed.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST.' });
  }

  // Origin check — only enforced when an Origin header is present.
  // Browsers always send it for cross-origin XHR. Same-origin XHR may omit
  // it, in which case we trust the request (it came from our HTML).
  const origin = req.headers.origin;
  const allowed = getAllowedOrigins();
  if (origin && !allowed.includes(origin)) {
    return res.status(403).json({ error: 'Origin not allowed.' });
  }
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Rate limit per IP
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    res.setHeader('Retry-After', String(rl.retryAfter ?? 60));
    return res.status(429).json({ error: 'Too many requests. Try again shortly.' });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'ElevenLabs not configured. Set ELEVENLABS_API_KEY in Vercel env vars.',
    });
  }

  // Vercel auto-parses JSON when Content-Type is application/json
  const body: Body =
    typeof req.body === 'string' ? safeParse(req.body) : req.body ?? {};
  const text = (body.text ?? '').toString().trim();
  const voiceId = (body.voiceId ?? DEFAULT_VOICE).toString();
  const modelId = (body.modelId ?? DEFAULT_MODEL).toString();

  if (!text) {
    return res.status(400).json({ error: 'text is required.' });
  }
  if (text.length > 5000) {
    return res.status(413).json({
      error: 'text too long — split into chunks (max 5000 chars per call).',
    });
  }

  try {
    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify({
          text,
          model_id: modelId,
          voice_settings: {
            stability: 0.55,
            similarity_boost: 0.85,
            style: 0.25,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!upstream.ok) {
      // Log the real upstream body server-side for debugging; return a
      // generic error to the client so we don't echo ElevenLabs internals.
      const errText = await upstream.text().catch(() => '');
      console.warn(`[tts] upstream ${upstream.status}:`, errText.slice(0, 400));
      return res
        .status(upstream.status === 429 ? 429 : 502)
        .json({ error: 'TTS upstream error', status: upstream.status });
    }

    const arrayBuf = await upstream.arrayBuffer();
    const audio = Buffer.from(arrayBuf);

    res.setHeader('Content-Type', 'audio/mpeg');
    // Cache the same text+voice for 7 days — most repeats hit the edge.
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    res.setHeader('Content-Length', String(audio.length));
    return res.status(200).send(audio);
  } catch (err: any) {
    console.warn('[tts] proxy failed:', err?.message ?? err);
    return res.status(500).json({ error: 'Proxy failed.' });
  }
}

function safeParse(s: string): Body {
  try {
    return JSON.parse(s) as Body;
  } catch {
    return {};
  }
}
