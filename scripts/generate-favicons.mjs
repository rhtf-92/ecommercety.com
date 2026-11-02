// Genera los favicons de las 5 variantes de logo desde los vectores
// EXACTOS de LogoMark (src/components/Logo.tsx). Si cambia un path o un
// color en Logo.tsx, hay que reflejarlo aquí y volver a ejecutar:
//
//   node scripts/generate-favicons.mjs
//
// Salidas:
//   public/favicons/<variante>.svg        — SVG autónomo (viewBox 48×48)
//   public/favicons/<variante>-32.png     — 32×32  (renderizado con sharp)
//   public/favicons/<variante>-180.png    — 180×180 (apple touch)
//   src/app/favicon.ico                   — ICO clásico multiformato
//     (16/32/48, entradas PNG) desde la variante "badge", el default del
//     sistema: es el icono del panel /admin y el respaldo sin base.
//
// El layout del sitio público (src/app/(site)/layout.tsx) declara los
// iconos de la variante activa (SiteSetting.logoVariant) apuntando a
// /favicons/<variante>.* — ver docs/images.md.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "favicons");

// Contenido interno de cada variante, traducido 1:1 desde LogoMark
// (JSX → SVG: strokeWidth→stroke-width, etc.). viewBox "0 0 48 48".
const VARIANTS = {
  badge: `
  <rect width="48" height="48" rx="13" fill="#14594a"/>
  <text x="24" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="#ffffff">T&amp;F</text>
  <circle cx="37" cy="11" r="3.2" fill="#f59e0b"/>`,
  tag: `
  <path d="M8 6h18l14 14-18 18L8 24z" fill="#14594a" transform="rotate(0 24 24)"/>
  <circle cx="16" cy="14" r="3" fill="#fafaf8"/>
  <path d="M19 27l4 4 8-9" stroke="#f59e0b" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  arrow: `
  <rect width="48" height="48" rx="12" fill="#0d1220"/>
  <text x="24" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="15" fill="#ffffff">T&amp;F</text>
  <path d="M11 37 L29 37" stroke="#1f8a70" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M29 37 L37 29" stroke="#f59e0b" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M30.5 29.5 H37 V36" stroke="#f59e0b" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  seal: `
  <circle cx="24" cy="24" r="21" fill="#14594a"/>
  <circle cx="24" cy="24" r="16.5" fill="none" stroke="#fafaf8" stroke-width="1.6" stroke-dasharray="3 3"/>
  <path d="M16.5 24.5l5.5 5.5L32 19" stroke="#ffffff" stroke-width="3.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="36.5" cy="11.5" r="4" fill="#f59e0b"/>`,
  wordmark: `
  <path d="M24 5l2.6 6.2L33 12l-4.9 4.3 1.5 6.7L24 19.4 18.4 23l1.5-6.7L15 12l6.4-.8z" fill="#f59e0b"/>
  <text x="24" y="40" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="13" fill="#14594a">T&amp;F</text>`,
};

const svgDoc = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${inner}\n</svg>\n`;

async function renderPng(svgBuffer, size) {
  return sharp(svgBuffer, { density: 288 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

// Contenedor ICO con entradas PNG (soportado desde Windows Vista y por
// todos los navegadores modernos): ICONDIR + ICONDIRENTRY[] + PNGs.
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);
  const dir = [];
  let offset = 6 + entries.length * 16;
  for (const { size, png } of entries) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette colors
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bit count
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    dir.push(e);
  }
  return Buffer.concat([header, ...dir, ...entries.map((x) => x.png)]);
}

await mkdir(outDir, { recursive: true });

for (const [id, inner] of Object.entries(VARIANTS)) {
  const svg = svgDoc(inner);
  const svgBuffer = Buffer.from(svg, "utf8");
  await writeFile(path.join(outDir, `${id}.svg`), svgBuffer);
  await writeFile(path.join(outDir, `${id}-32.png`), await renderPng(svgBuffer, 32));
  await writeFile(path.join(outDir, `${id}-180.png`), await renderPng(svgBuffer, 180));
  console.log(`favicons: ${id}.svg, ${id}-32.png, ${id}-180.png`);
}

// ICO clásico desde la variante por defecto ("badge").
const badgeSvg = Buffer.from(svgDoc(VARIANTS.badge), "utf8");
const icoEntries = [];
for (const size of [16, 32, 48]) {
  icoEntries.push({ size, png: await renderPng(badgeSvg, size) });
}
const icoPath = path.join(root, "src", "app", "favicon.ico");
await writeFile(icoPath, buildIco(icoEntries));
console.log("favicons: src/app/favicon.ico (badge, 16/32/48 PNG)");
