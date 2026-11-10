import site from "@/data/site.json";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { formatDay, formatTime, isoDay, price } from "@/lib/format";
import { ITEMS, isItem, OPTIONS, orderable, unitPrice, type ItemId, type OptionGroup } from "@/lib/carte";
import { addDays, pickupDate, pickupTimes } from "@/lib/hours";

export const MODES = ["emporter", "surPlace"] as const;
export type Mode = (typeof MODES)[number];

export type OrderLine = { item: ItemId; qty: number; size: string; opts: Partial<Record<OptionGroup, string>> };
export type Order = { lines: OrderLine[]; mode: Mode; day: string; time: string; name: string; phone: string; email: string; message: string };

export function emptyLine(item: ItemId = "tacos"): OrderLine {
  const it = ITEMS[item];
  const opts: OrderLine["opts"] = {};
  for (const g of it.options ?? []) opts[g] = OPTIONS[g][0];
  return { item, qty: 1, size: it.sizes?.[0].id ?? "", opts };
}

export const isPhone = (v: string) => /^[+\d][\d\s\-().]{7,19}$/.test(v.trim());
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** Jours de service proposés : la nuit en cours (service de la veille), aujourd'hui, puis les jours suivants avec un créneau. */
export function pickupDays(now: Date) {
  const today = isoDay(now);
  return Array.from({ length: site.order.daysAhead + 2 }, (_, i) => addDays(today, i - 1)).filter((day) => pickupTimes(day, now, site.order.stepMinutes, site.order.minutesAhead).length > 0);
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Nettoie une commande reçue côté serveur : null si elle est incomplète ou hors des heures d'ouverture. */
export function parseOrder(v: unknown, now = new Date()): Order | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const lines = (Array.isArray(o.lines) ? o.lines : []).slice(0, 20).flatMap((l): OrderLine[] => {
    if (!l || typeof l !== "object") return [];
    const x = l as Record<string, unknown>;
    if (!isItem(x.item) || !orderable(x.item)) return [];
    const it = ITEMS[x.item];
    const qty = Math.min(Math.max(Math.round(Number(x.qty) || 1), 1), site.order.maxPerLine);
    const size = it.sizes?.some((s) => s.id === x.size) ? (x.size as string) : (it.sizes?.[0].id ?? "");
    const raw = (x.opts && typeof x.opts === "object" ? x.opts : {}) as Record<string, unknown>;
    const opts: OrderLine["opts"] = {};
    for (const g of it.options ?? []) opts[g] = OPTIONS[g].includes(raw[g] as string) ? (raw[g] as string) : OPTIONS[g][0];
    return [{ item: x.item, qty, size, opts }];
  });
  const day = ISO.test(str(o.day, 10)) ? str(o.day, 10) : "";
  const q: Order = {
    lines,
    mode: MODES.includes(o.mode as Mode) ? (o.mode as Mode) : "emporter",
    day,
    time: str(o.time, 5),
    name: str(o.name, 120),
    phone: str(o.phone, 30),
    email: str(o.email, 160),
    message: str(o.message, 1000),
  };
  // Marge de 10 minutes : le client a pu choisir son heure juste avant qu'elle ne sorte de la liste
  const graceNow = new Date(now.getTime() - 10 * 60_000);
  if (!q.lines.length || !day || !pickupTimes(day, graceNow, site.order.stepMinutes, site.order.minutesAhead).includes(q.time) || !q.name || !isPhone(q.phone)) return null;
  if (q.email && !isEmail(q.email)) q.email = "";
  return q;
}

/** Total estimé ; « partial » si un des plats n'a pas encore de prix. */
export function orderTotal(lines: OrderLine[]) {
  let sum = 0;
  let partial = false;
  for (const l of lines) {
    const p = unitPrice(l.item, l.size);
    if (p === null) partial = true;
    else sum += p * l.qty;
  }
  return { sum, partial };
}

/** Une ligne en clair : « 2 × Tacos (L, Poulet, Algérienne) ». */
export function lineLabel(l: OrderLine, d: Dict) {
  const extra = [l.size ? d.sizes[l.size as keyof Dict["sizes"]] : "", ...Object.entries(l.opts).map(([g, v]) => (d.options as Record<string, Record<string, string>>)[g]?.[v as string] ?? "")].filter(Boolean);
  return `${l.qty} × ${d.products[l.item].name}${extra.length ? ` (${extra.join(", ")})` : ""}`;
}

/** Récapitulatif texte de la commande (e-mail, WhatsApp). */
export function orderText(q: Order, lang: Locale, d: Dict, withContact = true) {
  const m = d.order.mail;
  const c = lang === "fr" ? " :" : ":";
  const { sum, partial } = orderTotal(q.lines);
  const when = `${formatDay(pickupDate(q.day, q.time), lang, { weekday: "long", day: "numeric", month: "long" })}, ${formatTime(q.time, lang)}`;
  const blocks = [
    [`${m.lines}${c}`, ...q.lines.map((l) => `– ${lineLabel(l, d)}`)].join("\n"),
    `${m.mode}${c} ${d.order.modes[q.mode]}`,
    `${m.pickup}${c} ${when}`,
    `${m.total}${c} ${price(sum, lang)}${partial ? ` + ${d.carte.priceOnSite.toLowerCase()}` : ""}`,
    withContact ? [`${m.name}${c} ${q.name}`, `${m.phone}${c} ${q.phone}`, q.email ? `${m.email}${c} ${q.email}` : ""].filter(Boolean).join("\n") : "",
    q.message ? `${m.message}${c}\n${q.message}` : "",
  ];
  return blocks.filter(Boolean).join("\n\n");
}

/** Lien WhatsApp (vide tant que le restaurant n'a pas donné de portable : data/site.json → whatsapp). */
export const waLink = (text: string) => (site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "");
