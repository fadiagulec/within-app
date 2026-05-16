/**
 * Within — minimal client error sink (Vercel Node serverless function).
 *
 * Path: POST /api/log-error
 * Body: { message: string, stack?: string, url?: string, context?: object }
 *
 * Lightweight observability: client-side ErrorBoundary + global error
 * handler POST here, and the payload is logged to Vercel's function logs.
 * That gives the founder visibility into real-user crashes without
 * needing to wire up Sentry / Bugsnag / Crashlytics / etc.
 *
 * When ready to upgrade:
 *   - Pipe to Sentry (forward the body to https://sentry.io/api/<dsn>)
 *   - Pipe to PostHog / LogSnag / Discord webhook
 *   - All without touching client code — just edit this function
 *
 * Hardened against abuse:
 *   - POST only (405 otherwise)
 *   - Body capped at 8KB
 *   - 1-hour same-origin rate limit (60 reports/min/IP)
 *   - Strips suspicious fields before logging
 */

const MAX_BODY_BYTES = 8 * 1024;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 60;
const ipBucket = new Map<string, { count: number; resetAt: number }>();

const DEFAULT_ALLOWED_ORIGINS = [
  'https://dist-sage-ten-11.vercel.app',
  'https://within.app',
  'https://www.within.app',
];

function getAllowedOrigins(): string[] {
  const fromEnv = process.env.TTS_ALLOWED_ORIGINS;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return DEFAULT_ALLOWED_ORIGINS;
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

function checkRate(ip: string): boolean {
  const now = Date.now();
  const existing = ipBucket.get(ip);
  if (!existing || existing.resetAt <= now) {
    ipBucket.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (existing.count >= RATE_MAX) return false;
  existing.count += 1;
  return true;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Vary', 'Origin');
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

  const origin = req.headers.origin;
  const allowed = getAllowedOrigins();
  if (origin && !allowed.includes(origin)) {
    return res.status(403).json({ error: 'Origin not allowed.' });
  }
  if (origin) res.setHeader('Access-Control-Allow-Origin', origin);

  const ip = getClientIp(req);
  if (!checkRate(ip)) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'Rate limit.' });
  }

  // Parse + size-cap
  const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});
  if (raw.length > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Report too large.' });
  }
  let body: any = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {};
  } catch {
    return res.status(400).json({ error: 'Bad JSON.' });
  }

  // Whitelist only the fields we care about — never blindly log
  // arbitrary client-supplied data.
  const safe = {
    message: String(body.message ?? '').slice(0, 1000),
    stack: typeof body.stack === 'string' ? body.stack.slice(0, 4000) : undefined,
    url: typeof body.url === 'string' ? body.url.slice(0, 500) : undefined,
    ua: typeof body.ua === 'string' ? body.ua.slice(0, 200) : undefined,
    componentStack:
      typeof body.componentStack === 'string'
        ? body.componentStack.slice(0, 2000)
        : undefined,
    context:
      body.context && typeof body.context === 'object'
        ? JSON.stringify(body.context).slice(0, 1000)
        : undefined,
    when: new Date().toISOString(),
    ip,
  };

  // Visible in Vercel function logs. When ready, forward to Sentry / etc.
  console.warn('[client-error]', JSON.stringify(safe));

  return res.status(204).end();
}
