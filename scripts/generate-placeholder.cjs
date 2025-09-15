const fs = require('fs');
const path = require('path');

// Small neutral SVG as a blurred placeholder
const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='10' viewBox='0 0 16 10'><rect width='16' height='10' rx='2' fill='%23FFF6EB' /></svg>`;
const b64 = Buffer.from(svg).toString('base64');
const data = `export const placeholderBlurDataURL = "data:image/svg+xml;base64,${b64}";\n`;

const outDir = path.join(process.cwd(), 'lib');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'placeholder-blur.ts'), data);
console.log('Wrote lib/placeholder-blur.ts');
