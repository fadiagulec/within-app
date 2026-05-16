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
 * Setup:
 *   1. In Vercel project settings → Environment Variables
 *   2. Add key: ELEVENLABS_API_KEY = <your key>
 *   3. Apply to Production (and Preview if you want)
 *   4. Redeploy (env-var changes only apply to new deployments)
 *
 * Without the env var, this endpoint returns 503 and the client falls
 * back to the browser's built-in speech synthesis. Nothing breaks.
 *
 * Caching:
 *   - Cache-Control set to 7 days. Identical text+voice → same audio.
 *   - Vercel's edge cache will short-circuit repeat requests at no cost.
 */

// Vercel auto-resolves /api/*.ts as Node 18+ functions. No deps required.
// Using `any` for req/res to avoid pulling in @vercel/node as a dep.

const DEFAULT_VOICE = 'kHL7MFWSwpF69uhr0qwj';
const DEFAULT_MODEL = 'eleven_turbo_v2_5';

interface Body {
  text?: string;
  voiceId?: string;
  modelId?: string;
}

export default async function handler(req: any, res: any) {
  // CORS — same-origin only, but be explicit for clarity.
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST.' });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error:
        'ElevenLabs not configured. Set ELEVENLABS_API_KEY in Vercel env vars.',
    });
  }

  // Vercel's Node runtime auto-parses JSON when Content-Type is application/json.
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
      const errText = await upstream.text();
      return res
        .status(upstream.status)
        .json({ error: `ElevenLabs error ${upstream.status}: ${errText.slice(0, 400)}` });
    }

    const arrayBuf = await upstream.arrayBuffer();
    const audio = Buffer.from(arrayBuf);

    res.setHeader('Content-Type', 'audio/mpeg');
    // Cache the same text+voice for 7 days — most repeats hit the edge.
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    res.setHeader('Content-Length', String(audio.length));
    return res.status(200).send(audio);
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: `Proxy failed: ${err?.message ?? 'unknown'}` });
  }
}

function safeParse(s: string): Body {
  try {
    return JSON.parse(s) as Body;
  } catch {
    return {};
  }
}
