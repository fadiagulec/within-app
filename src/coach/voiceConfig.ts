/**
 * Within — Voice configuration.
 *
 * Single source of truth for the ElevenLabs voice used to narrate all
 * guided practice across the app — chakra letters, foundations briefs,
 * body inquiry steps, the full guided healing sessions, etc.
 *
 * The voice ID lives here. The API KEY is held server-side in the
 * /api/tts Vercel function (read from process.env.ELEVENLABS_API_KEY).
 * Shipping a key in the client bundle would be a security incident.
 */

/** ElevenLabs voice id supplied by the founder. */
export const ELEVENLABS_VOICE_ID = 'kHL7MFWSwpF69uhr0qwj';

/** ElevenLabs model used for narration. Turbo v2.5 = good quality, fast. */
export const ELEVENLABS_MODEL_ID = 'eleven_turbo_v2_5';

/** Default voice settings — gentle and grounded for guided work. */
export const ELEVENLABS_VOICE_SETTINGS = {
  stability: 0.55,
  similarity_boost: 0.85,
  style: 0.25,
  use_speaker_boost: true,
} as const;

/** Path the client posts to. Implemented at /api/tts on Vercel. */
export const TTS_PROXY_PATH = '/api/tts';
