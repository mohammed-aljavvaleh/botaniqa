/**
 * Botaniqa Image Optimizer
 * Converts and compresses all static public images to WebP using sharp.
 * Run once: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Map of: [inputPath, outputPath, width, quality, notes]
const images = [
  // ── Hero / Landing ─────────────────────────────────────────────────
  ['hero_coffee.jpg',      'hero_coffee.webp',      1920, 82, 'Hero fallback - full width'],
  ['cafe_interior.jpg',    'cafe_interior.webp',    1280, 80, 'About primary image'],
  ['gallery_1.jpg',        'gallery_1.webp',        1200, 78, 'Gallery slot 1 + About secondary'],
  ['gallery_2.jpg',        'gallery_2.webp',        1200, 78, 'Gallery slot 2'],
  ['gallery_3.jpg',        'gallery_3.webp',        1200, 78, 'Gallery slot 3'],
  ['gallery_4.jpg',        'gallery_4.webp',        1200, 78, 'Gallery slot 4'],
  ['gallery_5.jpg',        'gallery_5.webp',        1200, 78, 'Gallery slot 5'],
  // botaniqa-logo.jpg is used in EVERY menu card as placeholder background
  // Keep it tiny - it only needs to be ~300px square visible
  ['botaniqa-logo.jpg',    'botaniqa-logo.webp',     400, 75, 'Menu card placeholder - keep small!'],

  // ── Menu Teaser Cards (shown at 25vw desktop / 50vw mobile) ────────
  ['images/menu/coffee.jpg',      'images/menu/coffee.webp',      600, 78, 'Menu card teaser'],
  ['images/menu/pastries.jpg',    'images/menu/pastries.webp',    600, 78, 'Menu card teaser'],
  ['images/menu/cold-drinks.jpg', 'images/menu/cold-drinks.webp', 600, 78, 'Menu card teaser'],
  ['images/menu/nargile.jpg',     'images/menu/nargile.webp',     600, 78, 'Menu card teaser'],
];

let totalSaved = 0;

console.log('\n🌿 Botaniqa Image Optimizer\n' + '-'.repeat(50));

for (const [input, output, width, quality, note] of images) {
  const inputPath  = join(publicDir, input);
  const outputPath = join(publicDir, output);

  if (!existsSync(inputPath)) {
    console.warn(`  SKIP  ${input} - file not found`);
    continue;
  }

  // Ensure output directory exists
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

  try {
    const meta = await sharp(inputPath).metadata();
    const originalSize = meta.size || 0;

    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality, effort: 6 })
      .toFile(outputPath);

    const outMeta = await sharp(outputPath).metadata();
    const newSize = outMeta.size || 0;
    const saved = originalSize - newSize;
    totalSaved += saved;

    const pct = originalSize > 0 ? Math.round((saved / originalSize) * 100) : 0;
    const origKB = Math.round(originalSize / 1024);
    const newKB  = Math.round(newSize / 1024);

    console.log(`  OK ${input.padEnd(32)} ${origKB}KB -> ${newKB}KB  (${pct}% saved)  ${note}`);
  } catch (err) {
    console.error(`  FAIL  ${input}:`, err.message);
  }
}

console.log('\n' + '-'.repeat(50));
console.log(`  Total saved: ${Math.round(totalSaved / 1024)}KB (${(totalSaved / 1024 / 1024).toFixed(2)}MB)`);
console.log('\n  Next: install ffmpeg (brew install ffmpeg) to compress hero_video.webm\n');
