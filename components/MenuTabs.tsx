"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/components/providers";
import { OrderLink } from "@/components/OrderLink";
import { Photo, type Tint } from "@/components/Photo";
import { categories, ITEMS, OPTIONS, orderable, type CategoryId, type ItemId } from "@/lib/carte";
import { fill } from "@/lib/i18n";
import { price } from "@/lib/format";
import { firstImg } from "@/lib/media";

export const TAB_EVENT = "avesta:tab";

const TINT: Partial<Record<CategoryId, Tint>> = { perses: "turquoise", tacos: "night", assiettes: "deep", sandwichs: "night", menus: "deep", "desserts-boissons": "cream" };

/** Ouvre un onglet de la carte depuis une tuile, puis descend jusqu'à la carte. */
export function openTab(id: CategoryId) {
  window.dispatchEvent(new CustomEvent<CategoryId>(TAB_EVENT, { detail: id }));
  const el = document.getElementById("carte");
  if (!el) return false;
  el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  return true;
}

function Price({ id }: { id: ItemId }) {
  const { lang, d } = useLocale();
  const it = ITEMS[id];
  if (it.price === null) return <span className="text-[0.875rem] font-medium text-muted">{d.carte.priceOnSite}</span>;
  return <span>{it.from ? fill(d.carte.from, { price: price(it.price, lang) }) : price(it.price, lang)}</span>;
}

function Dish({ id, cat, wide = false }: { id: ItemId; cat: CategoryId; wide?: boolean }) {
  const { lang, d } = useLocale();
  const it = ITEMS[id];
  const p = d.products[id];
  const big = cat !== "assiettes" && cat !== "desserts-boissons";
  const choices = (it.options ?? []).filter((g) => g !== "sauce");

  return (
    <li className={`group flex flex-col overflow-hidden rounded-[20px] bg-paper ring-1 ring-line ${wide ? "md:col-span-full md:grid md:grid-cols-[1.2fr_1fr]" : big ? "" : "sm:flex-row"}`}>
      {(big || firstImg(it.photo)) && (
        <Photo paths={it.photo} alt={p.name} illus={it.illus} tint={TINT[cat]} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className={wide ? "aspect-[4/3] md:aspect-[16/10]" : big ? "aspect-[4/3]" : "aspect-[4/3] sm:aspect-square sm:w-32 sm:shrink-0"} illusClassName="h-16 w-16 md:h-20 md:w-20" />
      )}
      <div className={`flex flex-1 flex-col p-5 ${wide ? "md:justify-center md:p-10" : ""}`}>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display text-[1.375rem] !leading-tight">{p.name}</h3>
          <p className="shrink-0 text-[1.0625rem] font-semibold whitespace-nowrap tabular-nums">
            <Price id={id} />
          </p>
        </div>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{p.desc}</p>
        {choices.length > 0 && (
          <p className="mt-2 text-[0.8125rem] text-muted">
            <span className="font-semibold text-ink">{d.carte.choicesTitle} :</span> {choices.map((g) => OPTIONS[g].map((o) => (d.options[g] as Record<string, string>)[o]).join(", ")).join(" · ")}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
          <ul className="flex flex-wrap gap-1.5">
            {it.tags.map((t) => (
              <li key={t} className={`tag tag-${t}`}>
                {d.tags[t]}
              </li>
            ))}
          </ul>
          {orderable(id) ? (
            <OrderLink href={`/${lang}#commander`} intent={{ item: id }} label={fill(d.carte.addLabel, { name: p.name })} className="btn !min-h-10 !px-5 !text-[0.9375rem]">
              {d.carte.add}
            </OrderLink>
          ) : (
            <span className="text-[0.8125rem] font-medium text-muted">{d.carte.askOnSite}</span>
          )}
        </div>
      </div>
    </li>
  );
}

/** La carte, en une seule page avec onglets. */
export function MenuTabs({ initial = "tacos" }: { initial?: CategoryId }) {
  const { d } = useLocale();
  const cats = categories();
  const [tab, setTab] = useState<CategoryId>(initial);
  const reduce = useReducedMotion();
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const on = (e: Event) => setTab((e as CustomEvent<CategoryId>).detail);
    window.addEventListener(TAB_EVENT, on);
    return () => window.removeEventListener(TAB_EVENT, on);
  }, []);

  const current = cats.find((c) => c.id === tab) ?? cats[0];

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!n) return;
    e.preventDefault();
    const j = (i + n + cats.length) % cats.length;
    setTab(cats[j].id);
    refs.current[j]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={d.carte.tabsLabel} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
        {cats.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${c.id}`}
            aria-selected={tab === c.id}
            aria-controls={`${uid}-panel`}
            tabIndex={tab === c.id ? 0 : -1}
            onClick={() => setTab(c.id)}
            onKeyDown={(e) => onKey(e, i)}
            className="relative min-h-11 shrink-0 rounded-full px-5 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors aria-selected:text-cream"
          >
            {tab === c.id && <motion.span layoutId={`${uid}-pill`} className="absolute inset-0 rounded-full bg-night" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }} />}
            {tab !== c.id && <span className="absolute inset-0 rounded-full ring-1 ring-line ring-inset" aria-hidden="true" />}
            <span className="relative">{d.carte.tabs[c.id]}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${current.id}`} className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={current.id} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.18 }}>
            {current.id === "perses" && <p className="mb-6 max-w-2xl rounded-2xl bg-saffron-soft/60 px-5 py-4 text-[0.9375rem] leading-relaxed">{d.carte.persesNote}</p>}
            <ul className={`grid gap-4 ${current.items.length > 3 ? "md:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {current.items.map((id) => (
                <Dish key={id} id={id} cat={current.id} wide={current.items.length === 1} />
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-6 text-[0.875rem] text-muted">{d.carte.allergens}</p>
    </div>
  );
}
