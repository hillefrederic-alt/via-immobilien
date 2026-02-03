/**
 * Generate Open Graph image for social media sharing
 *
 * Run with: node scripts/generate-og-image.mjs
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// OG Image dimensions (recommended: 1200x630)
const WIDTH = 1200;
const HEIGHT = 630;

// Brand colors
const NAVY = '#142333';
const CREAM = '#F5F0EA';
const GOLD = '#D1B787';

async function generateOGImage() {
  const portraitPath = join(projectRoot, 'src/assets/images/denise-portrait.jpg');
  const outputPath = join(projectRoot, 'public/og-default.jpg');

  // Load and resize portrait
  const portrait = await sharp(portraitPath)
    .resize(400, 500, { fit: 'cover', position: 'top' })
    .toBuffer();

  // Create SVG overlay with text
  const svgOverlay = `
    <svg width="${WIDTH}" height="${HEIGHT}">
      <style>
        .title { font-family: Georgia, serif; font-size: 64px; font-weight: bold; fill: ${CREAM}; }
        .subtitle { font-family: Arial, sans-serif; font-size: 32px; fill: ${GOLD}; }
        .tagline { font-family: Arial, sans-serif; font-size: 24px; fill: ${CREAM}; opacity: 0.9; }
      </style>

      <!-- Right side text -->
      <text x="520" y="220" class="title">Via Immobilien</text>
      <text x="520" y="280" class="subtitle">Denise Semmel</text>
      <text x="520" y="360" class="tagline">Ihre Immobilienmaklerin</text>
      <text x="520" y="400" class="tagline">in der Rhein-Main-Region</text>

      <!-- Gold accent line -->
      <rect x="520" y="440" width="120" height="4" fill="${GOLD}" />

      <!-- Website URL -->
      <text x="520" y="520" class="tagline">via-immobilien.com</text>
    </svg>
  `;

  // Create base image with navy background
  const baseImage = await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 3,
      background: NAVY
    }
  })
    .jpeg()
    .toBuffer();

  // Composite portrait and text overlay
  const finalImage = await sharp(baseImage)
    .composite([
      {
        input: portrait,
        left: 60,
        top: 65
      },
      {
        input: Buffer.from(svgOverlay),
        left: 0,
        top: 0
      }
    ])
    .jpeg({ quality: 90 })
    .toBuffer();

  writeFileSync(outputPath, finalImage);
  console.log(`✅ OG image created: ${outputPath}`);
}

generateOGImage().catch(console.error);
