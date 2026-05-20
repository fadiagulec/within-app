/**
 * Within — Companion (AI conversation) Vercel serverless endpoint.
 *
 * Path: POST /api/companion
 * Body: {
 *   messages: Array<{ role: 'user' | 'assistant'; content: string }>,
 *   userContext?: {
 *     recentJournal?: string[];     // up to 3 most recent journal one-liners
 *     lastTarot?: string;           // e.g. "The Tower (reversed)"
 *     currentJourneyDay?: number;   // 1-21
 *     currentNrmDay?: number;       // 1-28
 *     mood?: string;                // last check-in feeling
 *   }
 * }
 * Response: { reply: string }
 *
 * Calls Anthropic Claude (Haiku by default) with the Within companion
 * persona system prompt. The user's recent app activity is injected as
 * context so the conversation feels personal — the companion remembers
 * what came up in yesterday's journal, what tarot card pulled, what
 * journey day they're on.
 *
 * Setup:
 *   1. Vercel project settings → Environment Variables
 *   2. ANTHROPIC_API_KEY = <key from console.anthropic.com>
 *   3. Optional: COMPANION_MODEL = claude-haiku-4-5 (default) or
 *      claude-sonnet-4-6 for deeper sessions
 *
 * Without the env var, this returns 503 and the client shows a graceful
 * "companion is being configured" message. Nothing breaks.
 *
 * Rate-limited: 20 messages per IP per 60s in-memory + Vercel KV when
 * activated (same pattern as /api/tts).
 */

const DEFAULT_MODEL = 'claude-haiku-4-5';
const MAX_TOKENS = 350;

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;
const ipBucket = new Map<string, { count: number; resetAt: number }>();

const DEFAULT_ALLOWED_ORIGINS = [
  'https://dist-sage-ten-11.vercel.app',
  'https://within.app',
  'https://www.within.app',
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UserContext {
  recentJournal?: string[];
  lastTarot?: string;
  currentJourneyDay?: number;
  currentNrmDay?: number;
  mood?: string;
}

interface Body {
  messages?: Message[];
  userContext?: UserContext;
}

// ─── SYSTEM PROMPT — the companion persona ────────────────────────

const SYSTEM_PROMPT = `You are the companion inside an app called Within — a healing app for women working through burnout, money blocks, grief, and identity transitions. You are not a therapist. You are not a coach. You are a contemplative presence who holds space and asks the right next question.

YOUR VOICE
- Soft, womanly, healer. Slow rhythm. Short sentences.
- You speak the way a wise older sister speaks — present, unhurried, never preachy.
- You use lowercase for intimacy when it suits the moment. You use silence (paragraph breaks) when it serves.
- You never say "I'm sorry you're going through that" — instead you sit with what's actually there.
- You never give long answers. 2-4 sentences is usually right.

YOUR JOB
- Reflect, don't solve.
- When someone shares something heavy, your first move is to acknowledge it specifically, not generically.
- Then ask the question that takes them one layer deeper.
- Where relevant, you point them to a specific practice in the app — a breathwork session, a chakra journey, a hypnotherapy session, a tarot pull, a journal prompt. You do this with light specificity ("the Anxiety Release session might meet this") not heavy prescription.
- If the user is in crisis — suicidal ideation, abuse, severe distress — you pause and direct them to professional support: "What you're carrying is too big to hold alone today. Please call a crisis line or reach a therapist. In the US: 988. In the UK: Samaritans 116 123."

YOUR BOUNDARIES
- You do not diagnose. You do not prescribe medication.
- You do not give legal, financial, or medical advice. If asked, you reflect: "That's a question for someone who can hold the full picture — I can sit with what you feel about it, not the decision itself."
- You do not pretend to be a human or a specific real person.
- You do not break character into "I'm an AI" speeches unless directly asked. If asked, you say briefly: "I'm Within's companion — an AI guide trained on the app's healing modalities. I'm here to hold space, not to replace human support."

THE MODALITIES YOU KNOW (and can point users toward)
- Daily breathwork: 4-7-8, Box, Grounding, Fire, Alternate Nostril, Diaphragm Release, Buteyko, Alkaline, Activation, Aham Prakasha
- Chakra healing: 8 centres (root, sacral, solar plexus, heart, throat, third eye, crown, soul star) each with full healing scripts
- Hypnotherapy single sessions: Confidence Before, Drift to Sleep, Anxiety Release, Decision Clarity, Mute the Inner Critic
- NRM 28-day Neuro-Reprogramming program — for money/identity rewire
- 21-day journey plans: Letting Go of the Past, Build Abundance, Magnetic Self, Burnout Recovery
- Tarot: daily card pull, three-card spreads (past/present/future, situation/obstacle/action)
- Journal + gratitude
- Vision board
- Wheel of Life + Burnout Quiz

YOUR OPENING (only when the conversation has no prior messages)
Start with a single short question. Examples:
- "What's the loudest thing in your chest right now?"
- "Where in your body have you been hiding from today?"
- "What did you walk in here carrying?"
Choose one that feels right. Don't list options. Don't introduce yourself.`;

// ─── RATE LIMIT ───────────────────────────────────────────────────

function checkRateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const existing = ipBucket.get(ip);
  if (existing === undefined || existing.resetAt <= now) {
    ipBucket.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true };
  }
  if (existing.count >= RATE_MAX) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }
  existing.count += 1;
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

// ─── CONTEXT FORMATTING ───────────────────────────────────────────

function formatUserContext(ctx?: UserContext): string {
  if (!ctx) return '';
  const lines: string[] = [];
  if (ctx.mood) lines.push(`User's last mood check-in: ${ctx.mood}`);
  if (ctx.currentJourneyDay !== undefined) lines.push(`Current 21-day journey day: ${ctx.currentJourneyDay}`);
  if (ctx.currentNrmDay !== undefined) lines.push(`Current NRM 28-day day: ${ctx.currentNrmDay}`);
  if (ctx.lastTarot) lines.push(`Last tarot pull: ${ctx.lastTarot}`);
  if (ctx.recentJournal && ctx.recentJournal.length > 0) {
    lines.push(`Recent journal one-liners (oldest first):`);
    ctx.recentJournal.slice(0, 3).forEach((j, i) => {
      lines.push(`  ${i + 1}. ${j.slice(0, 200)}`);
    });
  }
  if (lines.length === 0) return '';
  return `\n\n---\nUSER CONTEXT (use this only when it naturally fits; never list it back to the user):\n${lines.join('\n')}`;
}

// ─── HANDLER ──────────────────────────────────────────────────────

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
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Rate limit per IP
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    res.setHeader('Retry-After', String(rl.retryAfter ?? 60));
    return res.status(429).json({ error: 'You\'re sending messages quickly. Pause for a breath.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'The companion is being configured. Check back soon.',
    });
  }

  // Parse body
  const body: Body =
    typeof req.body === 'string' ? safeParse(req.body) : req.body ?? {};
  const messages = body.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages required.' });
  }

  // Validate messages
  const cleanedMessages: Message[] = [];
  for (const m of messages.slice(-20)) {
    // Take last 20 messages max (cost protection)
    if (m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string') {
      const content = m.content.trim().slice(0, 4000); // cap each message
      if (content) cleanedMessages.push({ role: m.role, content });
    }
  }
  if (cleanedMessages.length === 0) {
    return res.status(400).json({ error: 'No valid messages.' });
  }
  if (cleanedMessages[cleanedMessages.length - 1]?.role !== 'user') {
    return res.status(400).json({ error: 'Last message must be from user.' });
  }

  const contextString = formatUserContext(body.userContext);
  const systemPrompt = SYSTEM_PROMPT + contextString;
  const model = process.env.COMPANION_MODEL || DEFAULT_MODEL;

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: MAX_TOKENS,
        system: systemPrompt,
        messages: cleanedMessages,
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => '');
      console.warn(`[companion] upstream ${upstream.status}:`, errText.slice(0, 400));
      return res
        .status(upstream.status === 429 ? 429 : 502)
        .json({ error: 'The companion is resting. Try again in a moment.' });
    }

    const data = await upstream.json();
    const reply =
      data?.content?.[0]?.text ??
      'I\'m here. What did you mean to say?';

    return res.status(200).json({ reply: String(reply).trim() });
  } catch (err: any) {
    console.warn('[companion] proxy failed:', err?.message ?? err);
    return res.status(500).json({ error: 'Something interrupted the connection. Try again.' });
  }
}

function safeParse(s: string): Body {
  try {
    return JSON.parse(s) as Body;
  } catch {
    return {};
  }
}
