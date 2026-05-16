/**
 * +html.tsx — Expo Router custom HTML root.
 *
 * Wraps every web-rendered page. We use this to inject a tiny diagnostic
 * layer:
 *
 *   1. A visible "Loading Within…" splash that the user sees IMMEDIATELY
 *      while the JS bundle parses + boots. If they ever see this for more
 *      than 5 seconds, JS isn't running — and we surface that.
 *
 *   2. A window.onerror handler that catches uncaught errors at module-init
 *      time (BEFORE React's ErrorBoundary can mount) and writes them
 *      visibly to the screen.
 *
 * This way, "blank page" is impossible. Either the app renders, or the
 * user sees a real diagnostic with the error.
 */

import { ScrollViewStyleReset } from 'expo-router/html';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Root({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Within</title>
        <ScrollViewStyleReset />
        <link rel="shortcut icon" href="/favicon.ico" />
        <style dangerouslySetInnerHTML={{ __html: SAFE_CSS }} />
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        {/* Pre-React fallback. Removed by the boot script once React mounts. */}
        <div id="wm-boot" style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #DCE6EC 0%, #EDE4E2 35%, #F1E1D5 70%, #E8D2D2 100%)', zIndex: 1, fontFamily: 'system-ui, -apple-system, sans-serif', color: '#3A3540' }}>
          <div style={{ textAlign: 'center', maxWidth: 480, padding: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, marginBottom: 16, color: '#9DBFB2' }}>WITHIN</div>
            <div style={{ fontSize: 22, lineHeight: 1.4, fontWeight: 500 }}>Loading…</div>
            <div id="wm-slow-msg" style={{ marginTop: 28, fontSize: 13, lineHeight: 1.6, opacity: 0, transition: 'opacity 0.4s' }}>
              Taking longer than usual. If this stays here for more than 30 seconds, something is wrong — open the browser console (F12) and share what you see.
            </div>
            <div id="wm-error" style={{ marginTop: 20, padding: 16, background: '#1A201D', color: '#E5D9BD', borderRadius: 8, textAlign: 'left', fontSize: 12, lineHeight: 1.5, fontFamily: 'monospace', display: 'none', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}></div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}

// Plain CSS to make the body full-height + reset for react-native-web
const SAFE_CSS = `
html, body { height: 100%; margin: 0; padding: 0; }
body { overflow: hidden; }
#root { display: flex; height: 100%; flex: 1; min-height: 100%; }
`;

// Boot script — runs synchronously in <head>. Sets up:
//   - 5-second slow-loading hint
//   - 30-second "really stuck" message
//   - window.onerror handler that prints to #wm-error
//   - removes the boot splash once #root has any child element
const BOOT_SCRIPT = `
(function () {
  var slowTimer = setTimeout(function () {
    var s = document.getElementById('wm-slow-msg');
    if (s) s.style.opacity = '1';
  }, 5000);

  function showError(msg) {
    var box = document.getElementById('wm-error');
    if (!box) return;
    box.style.display = 'block';
    box.textContent = (box.textContent ? box.textContent + '\\n\\n' : '') + msg;
  }

  window.addEventListener('error', function (e) {
    var m = (e && e.error && e.error.stack) ? e.error.stack : (e.message || 'Unknown error');
    showError('UNCAUGHT ERROR\\n' + m);
    var s = document.getElementById('wm-slow-msg');
    if (s) s.style.opacity = '1';
  });

  window.addEventListener('unhandledrejection', function (e) {
    var m = (e && e.reason && e.reason.stack) ? e.reason.stack : (e && e.reason && e.reason.message) ? e.reason.message : String(e.reason || 'Unknown rejection');
    showError('UNHANDLED PROMISE\\n' + m);
  });

  // Watch for React mounting — once #root has children, hide the splash
  function checkMounted() {
    var root = document.getElementById('root');
    if (root && root.children && root.children.length > 0) {
      var splash = document.getElementById('wm-boot');
      if (splash) splash.parentNode && splash.parentNode.removeChild(splash);
      clearTimeout(slowTimer);
      return true;
    }
    return false;
  }

  // Poll for ~30s, then give up the polling and leave the splash + diagnostic
  var startTs = Date.now();
  var pollId = setInterval(function () {
    if (checkMounted() || Date.now() - startTs > 30000) {
      clearInterval(pollId);
    }
  }, 200);
})();
`;
