/**
 * +html.tsx — Expo Router custom HTML root.
 *
 * Wraps every web-rendered page. Injects a branded boot splash so the
 * user sees the Within mark IMMEDIATELY while the JS bundle parses + boots,
 * and surfaces any uncaught error visibly instead of a white screen.
 *
 * The pulsing-dot splash lives here in source so `expo export` regenerates
 * it reproducibly — no more hand-patching dist/index.html after every build.
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
        <style id="wm-boot-style" dangerouslySetInnerHTML={{ __html: SAFE_CSS }} />
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        {/* Pre-React fallback. Removed by the boot script once React mounts. */}
        <div id="wm-boot">
          <div className="wm-dot" />
          <div className="wm-mark">WITHIN</div>
          <div id="wm-err" />
        </div>
        {children}
      </body>
    </html>
  );
}

// Branded boot splash + body styles. Survives expo export reproducibly.
const SAFE_CSS = `
html, body { height: 100%; margin: 0; padding: 0; }
body {
  overflow: hidden;
  background: linear-gradient(180deg, #DCE6EC 0%, #EDE4E2 35%, #F1E1D5 70%, #E8D2D2 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #3A3540;
}
#root { display: flex; height: 100%; flex: 1; min-height: 100%; }
#wm-boot {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
  z-index: 1;
  flex-direction: column; gap: 14px;
  text-align: center; padding: 24px;
}
#wm-boot .wm-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: #9DBFB2; opacity: 0.6;
  animation: wm-pulse 1.4s ease-in-out infinite;
}
#wm-boot .wm-mark {
  font-size: 14px; opacity: 0.65; letter-spacing: 1.5px; color: #9DBFB2;
}
@keyframes wm-pulse {
  0%, 100% { opacity: 0.3; transform: scale(0.9); }
  50% { opacity: 0.95; transform: scale(1.1); }
}
#wm-err {
  display: none; max-width: 560px;
  background: rgba(255, 252, 250, 0.95);
  border-left: 4px solid #D8A0A0;
  padding: 18px 20px; border-radius: 12px;
  text-align: left; font-size: 13px; line-height: 19px;
  color: #3A3540; white-space: pre-wrap; word-break: break-word;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
`;

// Boot script — synchronous in <head>. Watches #root via MutationObserver
// and removes the splash the moment React mounts its first child. Captures
// uncaught errors and surfaces them in #wm-err instead of leaving a blank.
const BOOT_SCRIPT = `
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var bootEl = document.getElementById('wm-boot');
    var errEl  = document.getElementById('wm-err');
    var rootEl = document.getElementById('root');

    function showErr(msg) {
      if (!errEl) return;
      errEl.style.display = 'block';
      errEl.textContent = (errEl.textContent ? errEl.textContent + '\\n\\n' : '') + msg;
    }

    if (rootEl) {
      var observer = new MutationObserver(function () {
        if (rootEl.childNodes && rootEl.childNodes.length > 0) {
          if (bootEl && bootEl.parentNode) bootEl.parentNode.removeChild(bootEl);
          observer.disconnect();
        }
      });
      observer.observe(rootEl, { childList: true });
    }

    window.addEventListener('error', function (e) {
      var m = (e && e.error && e.error.stack) ? e.error.stack : (e && e.message) ? e.message : 'unknown';
      showErr('Boot error: ' + m);
    });
    window.addEventListener('unhandledrejection', function (e) {
      var r = e && e.reason;
      var m = (r && r.stack) ? r.stack : (r && r.message) ? r.message : String(r || 'unknown');
      showErr('Boot promise rejected: ' + m);
    });
  });
})();
`;
