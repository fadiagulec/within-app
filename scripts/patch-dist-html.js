#!/usr/bin/env node
/**
 * Within — post-export dist/index.html patcher.
 *
 * The Expo web build (`output: "single"`) emits a minimal HTML shell that
 * doesn't run our app/+html.tsx custom root. Until that's fixed upstream
 * (would require flipping to `output: "static"` which is a bigger lift),
 * we re-write dist/index.html here to inject:
 *
 *   - The branded pulsing-dot splash (so users see "WITHIN" instantly
 *     while the JS bundle parses)
 *   - The pastel gradient background + body styles
 *   - A visible error surface (#wm-err) for uncaught boot errors
 *
 * The script auto-resolves the bundle filename by reading the dist dir,
 * so the next expo export's hashed bundle is picked up automatically.
 *
 * Run AFTER `npx expo export -p web`. Wired into `npm run build:web`.
 */

const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, '..', 'dist');
const INDEX = path.join(DIST, 'index.html');
const BUNDLE_DIR = path.join(DIST, '_expo', 'static', 'js', 'web');

function main() {
  if (!fs.existsSync(INDEX)) {
    console.error(`[patch-dist] dist/index.html not found at ${INDEX}`);
    process.exit(1);
  }
  if (!fs.existsSync(BUNDLE_DIR)) {
    console.error(`[patch-dist] bundle dir not found at ${BUNDLE_DIR}`);
    process.exit(1);
  }

  const bundles = fs
    .readdirSync(BUNDLE_DIR)
    .filter((f) => /^entry-[a-f0-9]+\.js$/.test(f));
  if (bundles.length === 0) {
    console.error('[patch-dist] no entry-*.js bundle found');
    process.exit(1);
  }
  if (bundles.length > 1) {
    console.warn(
      `[patch-dist] multiple bundles found (${bundles.join(', ')}). Using first.`
    );
  }
  const bundle = bundles[0];

  const html = renderHtml(bundle);
  fs.writeFileSync(INDEX, html, 'utf8');
  console.log(`[patch-dist] dist/index.html patched (bundle: ${bundle})`);
}

function renderHtml(bundle) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>Within</title>
    <style id="wm-shell">
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
    </style>
    <link rel="shortcut icon" href="/favicon.ico" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>

    <div id="wm-boot">
      <div class="wm-dot"></div>
      <div class="wm-mark">WITHIN</div>
      <div id="wm-err"></div>
    </div>

    <script>
      (function () {
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
      })();
    </script>

    <script src="/_expo/static/js/web/${bundle}" defer></script>
  </body>
</html>
`;
}

main();
