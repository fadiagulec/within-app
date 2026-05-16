/**
 * SOMA — Generate PNG assets from SVG sources.
 *
 *   node scripts/generate-assets.js
 *
 * Produces: assets/icon.png (1024×1024), adaptive-icon.png (1024×1024),
 * splash.png (1242×2688), favicon.png (48×48).
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS = path.join(__dirname, '..', 'assets');

async function main() {
  const iconSvg = fs.readFileSync(path.join(ASSETS, 'icon.svg'));
  const splashSvg = fs.readFileSync(path.join(ASSETS, 'splash.svg'));

  await sharp(iconSvg).resize(1024, 1024).png().toFile(path.join(ASSETS, 'icon.png'));
  console.log('  ✓ icon.png (1024×1024)');

  await sharp(iconSvg).resize(1024, 1024).png().toFile(path.join(ASSETS, 'adaptive-icon.png'));
  console.log('  ✓ adaptive-icon.png (1024×1024)');

  await sharp(splashSvg).resize(1242, 2688).png().toFile(path.join(ASSETS, 'splash.png'));
  console.log('  ✓ splash.png (1242×2688)');

  await sharp(iconSvg).resize(48, 48).png().toFile(path.join(ASSETS, 'favicon.png'));
  console.log('  ✓ favicon.png (48×48)');

  console.log('\nAll assets generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
