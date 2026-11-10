// Photos du site.
//   npm run media
//
// 1. Prépare pour le web toutes les photos de assets/hero, plats, specialites-perses, salle et facade
//    dans public/media/<catégorie>/ (next/image sert ensuite AVIF/WebP à la bonne taille),
//    et note leurs dimensions dans data/media-sizes.json.
// 2. Fabrique l'image de partage public/og.jpg (1200 × 630) : la photo du hero si elle existe, sinon le logo sur bleu nuit.
// Les noms attendus sont listés dans assets/A-PHOTOGRAPHIER.md. Les originaux bruts (Google Maps…) vont dans assets/raw/.
import { mkdir, readdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const CATS = ["hero", "plats", "specialites-perses", "salle", "facade"];
const exists = (f) => access(f).then(() => true, () => false);

const sizes = {};
for (const cat of CATS) {
  const dir = path.join(ROOT, "assets", cat);
  await mkdir(dir, { recursive: true });
  await mkdir(path.join(ROOT, "public/media", cat), { recursive: true });
  for (const f of (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f))) {
    const name = f.replace(/\.\w+$/, "").toLowerCase();
    const max = cat === "hero" ? 2400 : 1600;
    const info = await sharp(path.join(dir, f))
      .rotate()
      .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(path.join(ROOT, "public/media", cat, `${name}.jpg`));
    sizes[`/media/${cat}/${name}.jpg`] = [info.width, info.height];
  }
}

// Image de partage : bleu nuit, logo, promesse ; la photo du hero à droite si elle existe
const logo = await sharp(path.join(ROOT, "public/logo.svg"), { density: 220 }).resize({ width: 520 }).png().toBuffer();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <text x="80" y="340" font-family="Georgia, serif" font-size="46" fill="#F7F1E6">Ouvert jusqu'à 5 h du matin</text>
  <text x="80" y="392" font-family="Arial, sans-serif" font-size="25" letter-spacing="3" fill="#E3A21A">SPÉCIALITÉS PERSES · TACOS · ASSIETTES</text>
  <text x="80" y="520" font-family="Arial, sans-serif" font-size="24" fill="#F7F1E6" fill-opacity="0.8">49 rue des Augustins · Amiens · 03 75 50 82 02</text>
</svg>`);
const heroFile = path.join(ROOT, "assets/hero/hero.jpg");
const layers = [];
if (await exists(heroFile)) layers.push({ input: await sharp(heroFile).rotate().resize(460, 630, { fit: "cover" }).toBuffer(), left: 740, top: 0 });
layers.push({ input: logo, left: 80, top: 150 }, { input: text, left: 0, top: 0 });
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#1D2A44" } })
  .composite(layers)
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");
console.log(`${Object.keys(sizes).length} photos prêtes, og.jpg écrit`);
