// Génère CONTENU.md : tous les textes du site en français et en anglais, et la carte, pour validation par Avesta.
//   npm run contenu
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = async (f) => JSON.parse(await readFile(path.join(ROOT, f), "utf8"));
const fr = await read("locales/fr.json");
const en = await read("locales/en.json");
const carte = await read("data/carte.json");
const site = await read("data/site.json");
const horaires = await read("data/horaires.json");

const euro = (n) => (n === null ? "**à confirmer**" : `${n.toFixed(2).replace(".", ",")} €`);
const SKIP = new Set(["alt", "products", "pages", "meta", "carte", "tags", "sizes", "options", "optionTitles"]);
const out = [];
const p = (s = "") => out.push(s);

p("# Avesta : contenu du site (à valider)");
p();
p("Généré depuis `locales/fr.json`, `locales/en.json` et `data/*.json`. Pour modifier un texte, modifiez ces fichiers puis relancez `npm run contenu`.");
p();
p("## Titre du hero : 3 propositions");
p();
p(`1. **${fr.hero.title}** (en ligne) · EN : ${en.hero.title}`);
p("2. De la Perse à la rue des Augustins.");
p("3. Jusqu'à 5 h, tous les jours.");
p();
p("## À faire valider en priorité");
p();
p("- **Les spécialités perses** : aucune n'apparaît sur Deliveroo ni Uber Eats. Les 4 plats en ligne (kabab koobideh, joojeh kabab, riz au safran et tahdig, doogh) sont des **propositions** marquées « À confirmer », non commandables en ligne et absentes des données envoyées à Google. À remplacer par les vrais plats et leurs prix.");
p(`- **Les prix** : relevés sur Deliveroo le ${carte.checked} (souvent un peu plus chers que sur place). Prix des tacos L et XL inconnus.`);
p("- **Composition des assiettes** (« viande, frites et salade ») et **liste des sauces** : supposées, à confirmer.");
p("- **Menu étudiant** et **desserts** : rien de connu, emplacements prêts.");
p(`- **Horaires** : 11 h – 5 h tous les jours (Google, Mappy). Note Google affichée : ${String(site.rating.value).replace(".", ",")}/5 sur ${site.rating.count} avis, relevée le ${site.rating.checked}.`);
p("- **Moyens de paiement** acceptés, et viande halal ou non (Uber Eats classe Avesta en « Halal » : à confirmer avant de l'écrire).");
p("- **Directeur de la publication** pour les mentions légales.");
p();

p("## Référencement (balises title / description)");
p();
for (const [lang, d] of [["FR", fr], ["EN", en]]) {
  p(`**${lang}** · ${d.meta.title}`);
  p();
  p(`> ${d.meta.description}`);
  p();
}

p("## Horaires (data/horaires.json)");
p();
for (let i = 1; i <= 7; i++) {
  const s = horaires.week[String(i)];
  p(`- ${fr.infos.days[i - 1]} : ${s.length ? s.map(([a, b]) => `${a} – ${b}`).join(", ") : "fermé"}`);
}
p();

p("## La carte et les prix (data/carte.json)");
p();
p(`- Viandes au choix : ${carte.options.viande.map((x) => fr.options.viande[x]).join(", ")}`);
p(`- Sauces : ${carte.options.sauce.map((x) => fr.options.sauce[x]).join(", ")}`);
p(`- Base des box : ${carte.options.base.map((x) => fr.options.base[x]).join(", ")}`);
p();
for (const c of carte.categories) {
  p(`### ${fr.carte.tabs[c.id]} / ${en.carte.tabs[c.id]}`);
  p();
  p("| Plat (FR) | Dish (EN) | Prix | Pastilles | Description FR | Description EN |");
  p("|---|---|---|---|---|---|");
  for (const id of c.items) {
    const it = carte.items[id];
    const prix = it.sizes ? it.sizes.map((s) => `${fr.sizes[s.id]} ${euro(s.price)}`).join(", ") : `${it.from ? "à partir de " : ""}${euro(it.price)}`;
    p(`| ${fr.products[id].name} | ${en.products[id].name} | ${prix} | ${it.tags.map((t) => fr.tags[t]).join(", ")} | ${fr.products[id].desc} | ${en.products[id].desc} |`);
  }
  p();
}

const walk = (a, b, prefix) => {
  for (const k of Object.keys(a)) {
    const key = prefix ? `${prefix}.${k}` : k;
    const va = a[k];
    const vb = b?.[k];
    if (typeof va === "string") {
      p(`- \`${key}\``);
      p(`  - FR : ${va.replace(/\n/g, " ↵ ")}`);
      p(`  - EN : ${(vb ?? "").replace(/\n/g, " ↵ ")}`);
    } else if (Array.isArray(va)) {
      va.forEach((x, i) => (typeof x === "string" ? (p(`- \`${key}[${i}]\``), p(`  - FR : ${x}`), p(`  - EN : ${vb?.[i] ?? ""}`)) : walk(x, vb?.[i], `${key}[${i}]`)));
    } else if (va && typeof va === "object") walk(va, vb, key);
  }
};

p("## Textes du site");
p();
for (const section of Object.keys(fr)) {
  if (SKIP.has(section)) continue;
  p(`### ${section}`);
  p();
  walk(fr[section], en[section], section);
  p();
}
p("### carte (textes autour de la carte)");
p();
walk(fr.carte, en.carte, "carte");
p();
p("## Pages");
p();
for (const id of Object.keys(fr.pages)) {
  p(`### ${fr.pages[id].title} / ${en.pages[id].title}`);
  p();
  walk(fr.pages[id], en.pages[id], `pages.${id}`);
  p();
}

await writeFile(path.join(ROOT, "CONTENU.md"), out.join("\n"));
console.log("CONTENU.md écrit");
