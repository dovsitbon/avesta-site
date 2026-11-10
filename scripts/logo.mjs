// Logo typographique d'Avesta (pas de logo officiel connu : à remplacer par le vrai s'il en a un).
//   npm run logo
//
// « AVESTA » en Fraunces (capitales, graisse 560, approche large), converti en tracés pour ne dépendre d'aucune police,
// et une étoile perse à huit branches (khatam : deux carrés croisés) au trait safran.
// Écrit :
//   lib/logo-paths.json      tracés utilisés par components/Logo.tsx (couleurs pilotées par le CSS)
//   public/logo.svg          logo complet (crème + safran) pour fond sombre
//   public/logo-dark.svg     logo complet (bleu nuit + safran) pour fond clair
//   app/icon.svg             favicon : l'étoile safran sur bleu nuit
//   app/apple-icon.png       icône iOS 180 × 180
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import * as fontkit from "fontkit";
import sharp from "sharp";
import wawoff2 from "wawoff2";

const ROOT = path.resolve(import.meta.dirname, "..");
const NIGHT = "#1D2A44";
const SAFFRON = "#E3A21A";
const CREAM = "#F7F1E6";

// Étoile à huit branches (khatam) : deux carrés croisés, l'un tourné de 45°, dont on voit les deux tracés
export function starPath(cx, cy, R) {
  const sq = (rot) => {
    const pts = [0, 1, 2, 3].map((i) => {
      const a = rot + (i * Math.PI) / 2;
      return `${(cx + R * Math.cos(a)).toFixed(2)} ${(cy + R * Math.sin(a)).toFixed(2)}`;
    });
    return `M${pts.join("L")}Z`;
  };
  return sq(-Math.PI / 2) + sq(-Math.PI / 4);
}
// Petit octogone au cœur de l'étoile
export function octoPath(cx, cy, R) {
  const pts = [];
  for (let i = 0; i < 8; i++) {
    const a = -Math.PI / 2 + Math.PI / 8 + (i * Math.PI) / 4;
    pts.push(`${(cx + R * Math.cos(a)).toFixed(2)} ${(cy + R * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

const fontBuf = await readFile(path.join(ROOT, "public/fonts/fraunces-latin-wght-normal.woff2"));
// fontkit ne sait pas instancier une graisse depuis du WOFF2 : on repasse d'abord en TTF
const ttf = Buffer.from(await wawoff2.decompress(fontBuf));
const font = fontkit.create(ttf).getVariation({ wght: 480 });

const TEXT = "AVESTA";
const SIZE = 100;
const scale = SIZE / font.unitsPerEm;
const tracking = 0.12 * SIZE;
const run = font.layout(TEXT);
let x = 0;
const parts = [];
run.glyphs.forEach((g, i) => {
  const d = g.path
    .scale(scale, -scale)
    .translate(x, 0)
    .toSVG();
  parts.push(d);
  x += run.positions[i].xAdvance * scale + (i < run.glyphs.length - 1 ? tracking : 0);
});
const capH = font.capHeight * scale;
const textW = x;

// Mise en page : étoile (hauteur = 1,25 × capitale) à gauche, puis le mot, centrés verticalement
const pad = 6;
const starR = capH * 0.66;
const gap = capH * 0.55;
const H = capH + pad * 2 + capH * 0.36;
const cy = H / 2;
const starCx = pad + starR;
const textX = starCx + starR + gap;
const W = textX + textW + pad;
const textY = cy + capH / 2;
const word = parts.join("");
const star = starPath(starCx, cy, starR);
const octo = octoPath(starCx, cy, starR * 0.3);
const sw = (starR * 0.11).toFixed(2);

const data = { width: +W.toFixed(1), height: +H.toFixed(1), word, wordTransform: `translate(${textX.toFixed(2)} ${textY.toFixed(2)})`, star, octo, strokeWidth: +sw };
await writeFile(path.join(ROOT, "lib/logo-paths.json"), JSON.stringify(data, null, 1) + "\n");

const svg = (ink) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${data.width} ${data.height}" width="${data.width * 3}" height="${data.height * 3}">
<title>Avesta</title>
<path d="${star}" fill="none" stroke="${SAFFRON}" stroke-width="${sw}" stroke-linejoin="round"/>
<path d="${octo}" fill="none" stroke="${SAFFRON}" stroke-width="${sw}" stroke-linejoin="round"/>
<path d="${word}" transform="${data.wordTransform}" fill="${ink}"/>
</svg>
`;
await writeFile(path.join(ROOT, "public/logo.svg"), svg(CREAM));
await writeFile(path.join(ROOT, "public/logo-dark.svg"), svg(NIGHT));

// Favicon : l'étoile seule, safran sur bleu nuit
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="${NIGHT}"/>
<path d="${starPath(32, 32, 24)}" fill="none" stroke="${SAFFRON}" stroke-width="3.4" stroke-linejoin="round"/>
<path d="${octoPath(32, 32, 7)}" fill="none" stroke="${SAFFRON}" stroke-width="3.4" stroke-linejoin="round"/>
</svg>
`;
await writeFile(path.join(ROOT, "app/icon.svg"), icon);
await sharp(Buffer.from(icon.replace('rx="14"', 'rx="0"')), { density: 400 }).resize(180, 180).png().toFile(path.join(ROOT, "app/apple-icon.png"));
console.log("logo prêt", data.width, "×", data.height);
