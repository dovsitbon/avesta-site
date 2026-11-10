// Affichette A5 imprimable (PDF) avec QR code vers le site, pour la vitrine ou le comptoir.
//   npm run affichette   →   print/affichette-avesta-a5.pdf
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const site = JSON.parse(await readFile(path.join(ROOT, "data/site.json"), "utf8"));
const url = `${site.url}/fr`;

const hex = (h) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const NIGHT = hex("#1D2A44");
const SAFFRON = hex("#E3A21A");
const CREAM = hex("#F7F1E6");

const pdf = await PDFDocument.create();
pdf.setTitle("Avesta : affichette A5");
pdf.setAuthor("Avesta");
const W = 419.53;
const H = 595.28;
const page = pdf.addPage([W, H]);
const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
const sans = await pdf.embedFont(StandardFonts.Helvetica);
const serif = await pdf.embedFont(StandardFonts.TimesRoman);

page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: NIGHT });
page.drawRectangle({ x: 16, y: 16, width: W - 32, height: H - 32, borderColor: SAFFRON, borderWidth: 0.8 });

// Logo (rasterisé : pdf-lib ne lit pas le SVG)
const logoW = 250;
const logo = await sharp(path.join(ROOT, "public/logo.svg"), { density: 400 }).resize(1500).png().toBuffer();
const logoImg = await pdf.embedPng(logo);
const logoH = (logoW * logoImg.height) / logoImg.width;
page.drawImage(logoImg, { x: (W - logoW) / 2, y: H - 80 - logoH, width: logoW, height: logoH });

const center = (text, font, size, y, color = CREAM) => page.drawText(text, { x: (W - font.widthOfTextAtSize(text, size)) / 2, y, size, font, color });

let y = H - 80 - logoH - 48;
center("Ouvert jusqu'à 5 h du matin", serif, 26, y);
y -= 22;
center("TOUS LES JOURS, DE 11 H À 5 H", bold, 9.5, y, SAFFRON);

const qrS = 132;
y -= 36 + qrS;
page.drawRectangle({ x: (W - qrS) / 2 - 12, y: y - 12, width: qrS + 24, height: qrS + 24, color: CREAM });
const qrPng = await QRCode.toBuffer(url, { margin: 0, width: 600, color: { dark: "#1D2A44", light: "#F7F1E6" }, errorCorrectionLevel: "M" });
page.drawImage(await pdf.embedPng(qrPng), { x: (W - qrS) / 2, y, width: qrS, height: qrS });
y -= 38;
center("Scannez : la carte, les prix, la commande", bold, 11, y);
y -= 16;
center(url.replace(/^https?:\/\//, ""), sans, 9, y, SAFFRON);

y -= 38;
center("Spécialités perses  ·  Tacos  ·  Assiettes  ·  Sandwichs", sans, 10, y);
y -= 16;
center("Sur place  ·  À emporter  ·  Commande par téléphone", sans, 10, y);

y -= 38;
center(`${site.address.street}, ${site.address.postalCode} ${site.address.city}`, bold, 10, y);
y -= 18;
center(site.phone, bold, 14, y, SAFFRON);

await mkdir(path.join(ROOT, "print"), { recursive: true });
const file = path.join(ROOT, "print/affichette-avesta-a5.pdf");
await writeFile(file, await pdf.save());
console.log("affichette prête :", file, url);
