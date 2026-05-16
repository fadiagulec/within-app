/**
 * Within — client error reporter.
 *
 * Posts uncaught errors and ErrorBoundary catches to /api/log-error,
 * which logs them to Vercel function logs so the founder has visibility
 * into real-user crashes without needing Sentry/Bugsnag/Crashlytics.
 *
 * Failure-safe — if the report POST fails, swallow silently. We never
 * want the error reporter to itself produce more errors.
 *
 * Forward-compatible — when ready to plug in Sentry, just change
 * api/log-error.ts to forward to Sentry's REST API. No client changes.
 */

import { Platform } from 'react-native';

interface ReportContext {
  componentStack?: string;
  [key: string]: unknown;
}

const ENDPOINT = '/api/log-error';

// Web-only — native crash reporting needs a real SDK (Sentry / Bugsnag).
// For native we just log to the console; when the user is ready, swap
// this for the Sentry SDK.
function isReportable(): boolean {
  return Platform.OS === 'web' && typeof fetch !== 'undefined' && typeof window !== 'undefined';
}

/**
 * Report a caught error to the server-side sink.
 *
 *   try { riskyThing(); }
 *   catch (e) { reportError(e, { tag: 'risky-thing' }); throw e; }
 *
 * Always console.error in dev so the developer sees it immediately.
 */
export function reportError(err: unknown, context: ReportContext = {}): void {
  // Always log to console — dev sees it locally; prod surfaces in
  // browser DevTools for whoever's debugging.
  if (typeof console !== 'undefined' && console.error) {
    console.error('[reportError]', err, context);
  }

  if (!isReportable()) return;

  try {
    const e = err as any;
    const payload = {
      message: e?.message ? String(e.message) : String(err),
      stack: e?.stack ? String(e.stack) : undefined,
      url: typeof window !== 'undefined' && window.location ? window.location.href : undefined,
      ua: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      componentStack: context.componentStack,
      context: stripContext(context),
    };

    // Fire-and-forget. Use keepalive so navigation away doesn't cancel
    // the request mid-flight.
    void fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Silent — the reporter must never throw.
    });
  } catch {
    // Silent — see above.
  }
}

function stripContext(ctx: ReportContext): Record<string, unknown> {
  const { componentStack: _ignore, ...rest } = ctx;
  // Best-effort serializable subset; skip functions / circular refs.
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(rest)) {
    if (typeof v === 'function') continue;
    try {
      JSON.stringify(v);
      out[k] = v;
    } catch {
      // skip non-serializable
    }
  }
  return out;
}

/**
 * One-shot install of global handlers. Call from app root.
 * Idempotent — safe to call multiple times.
 */
let installed = false;
export function installGlobalErrorReporter(): void {
  if (installed || !isReportable()) return;
  installed = true;

  window.addEventListener('error', (e: ErrorEvent) => {
    reportError(e.error ?? new Error(e.message || 'window.error'), {
      tag: 'window.error',
      filename: e.filename,
      line: e.lineno,
      col: e.colno,
    });
  });

  window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
    const reason = e.reason;
    const err =
      reason instanceof Error ? reason : new Error(typeof reason === 'string' ? reason : 'unhandledrejection');
    reportError(err, { tag: 'unhandledrejection' });
  });
}
