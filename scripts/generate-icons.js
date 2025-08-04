// Script to generate placeholder PWA icons
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple SVG icon that can be used as placeholder
const createSVGIcon = (size) => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#2563eb"/>
  <rect x="${size * 0.2}" y="${size * 0.2}" width="${size * 0.6}" height="${size * 0.6}" fill="white" rx="${size * 0.05}"/>
  <text x="${size * 0.5}" y="${size * 0.58}" font-family="Arial, sans-serif" font-size="${size * 0.25}" font-weight="bold" text-anchor="middle" fill="#2563eb">HRM</text>
</svg>`;
};

// Icon sizes needed for PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Ensure icons directory exists
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons for each size
iconSizes.forEach(size => {
  const svgContent = createSVGIcon(size);
  const filename = `icon-${size}x${size}.svg`;
  fs.writeFileSync(path.join(iconsDir, filename), svgContent);
  console.log(`Generated ${filename}`);
});

// Create a simple README for the icons
const iconReadme = `# PWA Icons

This directory contains PWA icons for the HRM SaaS application.

## Icon Sizes
${iconSizes.map(size => `- ${size}x${size}px`).join('\n')}

## Usage
These icons are referenced in the manifest.json file and used for:
- App icons on mobile devices
- Splash screen icons
- Browser tab favicons
- App shortcuts

## Customization
To replace these placeholder icons:
1. Create PNG versions of your custom icons in the required sizes
2. Name them as icon-{size}x{size}.png
3. Update the manifest.json file if needed
`;

fs.writeFileSync(path.join(iconsDir, 'README.md'), iconReadme);

console.log('Icon generation complete!');
console.log('Note: For production, consider replacing SVG icons with optimized PNG versions.');