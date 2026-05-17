#!/usr/bin/env node
/**
 * Within — post-export dist patcher.
 *
 * Runs AFTER `npx expo export -p web` to:
 *   1. Inject the branded pulsing-dot splash + boot error overlay into
 *      dist/index.html (Expo's default shell doesn't include this)
 *   2. Inject OG/Twitter/description meta tags so share links to the app
 *      render rich previews on WhatsApp / iMessage / Slack / Twitter
 *   3. Auto-resolve the hashed bundle filename so the patched HTML stays
 *      reproducible across builds — no more hand-editing after each export
 *   4. Write a permissive robots.txt and minimal sitemap.xml
 *
 * Wired into `npm run build:web` so every web deploy is fully reproducible.
 */

const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, '..', 'dist');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const INDEX = path.join(DIST, 'index.html');
const BUNDLE_DIR = path.join(DIST, '_expo', 'static', 'js', 'web');
const ROBOTS = path.join(DIST, 'robots.txt');
const SITEMAP = path.join(DIST, 'sitemap.xml');
const WELL_KNOWN_SRC = path.join(PUBLIC_DIR, '.well-known');
const WELL_KNOWN_DST = path.join(DIST, '.well-known');

// Canonical public URL — used in OG meta + sitemap. If you alias to a
// custom domain later, change this in one place.
const SITE_URL = process.env.WITHIN_SITE_URL || 'https://dist-sage-ten-11.vercel.app';
const SITE_TITLE = 'Within — Come back to yourself';
const SITE_DESCRIPTION =
  'A 21-day burnout recovery journey. Voice-guided breathwork, chakra healing, and somatic practice — to soften what is holding, and remember what is beneath it.';

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

  fs.writeFileSync(INDEX, renderHtml(bundle), 'utf8');
  fs.writeFileSync(ROBOTS, renderRobotsTxt(), 'utf8');
  fs.writeFileSync(SITEMAP, renderSitemapXml(), 'utf8');
  copyWellKnown();

  console.log(`[patch-dist] dist/index.html patched (bundle: ${bundle})`);
  console.log(`[patch-dist] dist/robots.txt written`);
  console.log(`[patch-dist] dist/sitemap.xml written`);
}

/**
 * Copy public/.well-known/* into dist/.well-known/ so iOS Universal
 * Links and Android App Links can fetch the verification JSON from
 * /.well-known/apple-app-site-association and /.well-known/assetlinks.json
 * respectively. Vercel headers (see vercel.json) ensure these are served
 * with the correct Content-Type: application/json.
 */
function copyWellKnown() {
  if (!fs.existsSync(WELL_KNOWN_SRC)) {
    console.log('[patch-dist] no public/.well-known/ found — skipping');
    return;
  }
  fs.mkdirSync(WELL_KNOWN_DST, { recursive: true });
  const files = fs.readdirSync(WELL_KNOWN_SRC);
  for (const f of files) {
    const src = path.join(WELL_KNOWN_SRC, f);
    const dst = path.join(WELL_KNOWN_DST, f);
    fs.copyFileSync(src, dst);
    console.log(`[patch-dist] copied .well-known/${f}`);
  }
}

function renderHtml(bundle) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>${escapeHtml(SITE_TITLE)}</title>
    <meta name="description" content="${escapeHtml(SITE_DESCRIPTION)}" />
    <meta name="theme-color" content="#EFE5E2" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Within" />
    <meta property="og:title" content="${escapeHtml(SITE_TITLE)}" />
    <meta property="og:description" content="${escapeHtml(SITE_DESCRIPTION)}" />
    <meta property="og:url" content="${SITE_URL}" />
    <meta property="og:image" content="${SITE_URL}/favicon.ico" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(SITE_TITLE)}" />
    <meta name="twitter:description" content="${escapeHtml(SITE_DESCRIPTION)}" />
    <meta name="twitter:image" content="${SITE_URL}/favicon.ico" />

    <link rel="canonical" href="${SITE_URL}" />
    <link rel="shortcut icon" href="/favicon.ico" />

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

function renderRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function renderSitemapXml() {
  // Minimal: only list the canonical public URL. The app is an SPA so
  // all real navigation happens client-side; deep-link routes don't need
  // sitemap entries for indexing.
  const lastmod = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

main();
