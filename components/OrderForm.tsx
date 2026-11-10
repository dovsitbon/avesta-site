"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import site from "@/data/site.json";
import { ORDER_EVENT, type OrderIntent } from "@/components/OrderLink";
import { CheckIcon, CloseIcon, MinusIcon, PhoneIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { fill } from "@/lib/i18n";
import { formatDay, formatTime, isoDay, price } from "@/lib/format";
import { addDays, pickupTimes } from "@/lib/hours";
import { categories, ITEMS, OPTIONS, orderable, unitPrice, type ItemId, type OptionGroup } from "@/lib/carte";
import { emptyLine, isEmail, isPhone, MODES, orderText, orderTotal, pickupDays, waLink, type Mode, type Order, type OrderLine } from "@/lib/order";

type Errors = Partial<Record<"lines" | "day" | "time" | "name" | "phone" | "email" | "send", string>>;
type Sent = { notified: boolean; confirmed: boolean; text: string; email: string };

// Plats commandables en ligne, par catégorie (les spécialités perses à confirmer restent au téléphone)
const GROUPS = categories()
  .map((c) => ({ ...c, items: c.items.filter(orderable) }))
  .filter((c) => c.items.length);

export function OrderForm() {
  const { lang, d } = useLocale();
  const t = d.order;
  const [lines, setLines] = useState<OrderLine[]>([emptyLine()]);
  const touched = useRef(false);
  const [mode, setMode] = useState<Mode>("emporter");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  // Heures recalculées chaque minute : seuls les créneaux encore possibles restent proposés
  useEffect(() => {
     
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const days = useMemo(() => (now ? pickupDays(now) : []), [now]);
  const times = useMemo(() => (now && day ? pickupTimes(day, now, site.order.stepMinutes, site.order.minutesAhead) : []), [now, day]);

  useEffect(() => {
    if (!days.length) return;
     
    if (!day || !days.includes(day)) setDay(days[0]);
  }, [days, day]);
  useEffect(() => {
     
    if (time && !times.includes(time)) setTime("");
  }, [times, time]);

  useEffect(() => {
    const apply = (intent: OrderIntent) => {
      if (!orderable(intent.item)) return;
      const line = emptyLine(intent.item);
      const keep = touched.current;
      touched.current = true;
      setLines((ls) => {
        if (!keep) return [line];
        const same = ls.findIndex((l) => l.item === line.item && JSON.stringify(l.opts) === JSON.stringify(line.opts) && l.size === line.size);
        if (same >= 0) return ls.map((l, i) => (i === same ? { ...l, qty: Math.min(l.qty + 1, site.order.maxPerLine) } : l));
        return [...ls, line];
      });
    };
    try {
      const saved = sessionStorage.getItem(ORDER_EVENT);
      if (saved) {
        sessionStorage.removeItem(ORDER_EVENT);
        apply(JSON.parse(saved) as OrderIntent);
      }
    } catch {}
    const onIntent = (e: Event) => apply((e as CustomEvent<OrderIntent>).detail);
    window.addEventListener(ORDER_EVENT, onIntent);
    return () => window.removeEventListener(ORDER_EVENT, onIntent);
  }, []);

  const update = (i: number, patch: Partial<OrderLine>) => {
    touched.current = true;
    setLines((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));
  };
  const setOpt = (i: number, g: OptionGroup, v: string) => update(i, { opts: { ...lines[i].opts, [g]: v } });
  const changeItem = (i: number, item: ItemId) => update(i, { ...emptyLine(item), qty: lines[i].qty });

  const total = orderTotal(lines);

  function validate(): Errors {
    const e: Errors = {};
    if (!lines.length) e.lines = t.errors.lines;
    if (!day) e.day = t.errors.day;
    if (!time) e.time = t.errors.time;
    if (!name.trim()) e.name = t.errors.name;
    if (!isPhone(phone)) e.phone = t.errors.phone;
    if (email.trim() && !isEmail(email)) e.email = t.errors.email;
    return e;
  }

  async function submit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.querySelector<HTMLElement>(`[data-err="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    const order: Order = { lines, mode, day, time, name: name.trim(), phone: phone.trim(), email: email.trim(), message: message.trim() };
    setSending(true);
    try {
      const res = await fetch("/api/order", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lang, order }) });
      const json = (await res.json()) as { ok: boolean; notified?: boolean; confirmed?: boolean; checkoutUrl?: string };
      if (!res.ok || !json.ok) throw new Error("send");
      // Paiement en ligne (désactivé par défaut : data/site.json → payment.enabled) : redirection vers la page de paiement
      if (json.checkoutUrl) {
        window.location.href = json.checkoutUrl;
        return;
      }
      setSent({ notified: !!json.notified, confirmed: !!json.confirmed, text: orderText(order, lang, d), email: order.email });
      document.getElementById("commander")?.scrollIntoView({ block: "start" });
    } catch {
      setErrors({ send: t.errors.send });
    } finally {
      setSending(false);
    }
  }

  const call = (
    <a href={`tel:${site.phoneIntl}`} className="btn">
      <PhoneIcon className="h-5 w-5" />
      {t.callCta} · {site.phone}
    </a>
  );

  if (sent) {
    const wa = waLink(sent.text);
    return (
      <div className="fade-in rounded-[24px] bg-paper p-6 text-ink ring-1 ring-line md:p-10" role="status">
        <span className={`flex h-12 w-12 items-center justify-center rounded-full ${sent.notified ? "bg-turquoise text-cream" : "bg-saffron text-night"}`}>{sent.notified ? <CheckIcon className="h-6 w-6" /> : <PhoneIcon className="h-6 w-6" />}</span>
        <h3 className="display mt-5 text-[2rem]">{sent.notified ? t.done.title : t.done.pendingTitle}</h3>
        <p className="lead mt-2">{sent.notified ? t.done.text : t.done.pendingText}</p>
        {sent.confirmed && <p className="mt-2 text-muted">{fill(t.done.mail, { email: sent.email })}</p>}
        <pre className="mt-6 rounded-2xl bg-cream-deep p-5 font-[family-name:var(--font-body)] text-[0.9375rem] leading-relaxed whitespace-pre-wrap text-ink">{sent.text}</pre>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {call}
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-line">
              <WhatsAppIcon className="h-5 w-5" />
              {t.whatsapp}
            </a>
          )}
          <button
            type="button"
            className="link-line ms-1 min-h-11 font-semibold text-muted"
            onClick={() => {
              setSent(null);
              setLines([emptyLine()]);
              touched.current = false;
              setTime("");
              setMessage("");
            }}
          >
            {t.done.again}
          </button>
        </div>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`err-${k}`} className="mt-2 text-sm font-semibold text-grenade">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `err-${k}` : undefined, "data-err": k });
  const dayLabel = (x: string) => {
    if (!now) return x;
    const today = isoDay(now);
    if (x === addDays(today, -1)) return t.tonight;
    return x === today ? t.today : x === addDays(today, 1) ? t.tomorrow : formatDay(x, lang, { weekday: "long", day: "numeric" });
  };
  const legend = (n: number, label: string) => (
    <legend className="display mb-4 flex items-center gap-3 text-[1.375rem]">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-night font-[family-name:var(--font-body)] text-[0.875rem] font-semibold text-saffron">{n}</span>
      {label}
    </legend>
  );
  const sel = (i: number, g: OptionGroup, value: string) => (
    <label key={g} className="block">
      <span className="label">{d.optionTitles[g]}</span>
      <select className="field" value={value} onChange={(e) => setOpt(i, g, e.target.value)}>
        {OPTIONS[g].map((o) => (
          <option key={o} value={o}>
            {(d.options[g] as Record<string, string>)[o]}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-10 rounded-[24px] bg-paper p-5 text-ink ring-1 ring-line md:p-8">
      {/* 1. Plats */}
      <fieldset>
        {legend(1, t.itemsTitle)}
        <ul className="space-y-3">
          {lines.map((l, i) => {
            const it = ITEMS[l.item];
            const unit = unitPrice(l.item, l.size);
            return (
              <li key={i} className="relative rounded-[16px] bg-cream p-4 md:p-5">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                  <label className="block">
                    <span className="label">{t.dish}</span>
                    <select className="field" value={l.item} onChange={(e) => changeItem(i, e.target.value as ItemId)} {...(i === 0 ? aria("lines") : {})}>
                      {GROUPS.map((g) => (
                        <optgroup key={g.id} label={d.carte.tabs[g.id]}>
                          {g.items.map((id) => (
                            <option key={id} value={id}>
                              {d.products[id].name}
                              {ITEMS[id].price !== null ? ` · ${price(ITEMS[id].price ?? 0, lang)}` : ""}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </label>
                  <div>
                    <span className="label" id={`qty-${i}`}>
                      {t.quantity}
                    </span>
                    <div className="flex h-12 w-fit items-center rounded-full border-[1.5px] border-line bg-paper" role="group" aria-labelledby={`qty-${i}`}>
                      <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-deep disabled:opacity-30" onClick={() => update(i, { qty: Math.max(1, l.qty - 1) })} disabled={l.qty <= 1} aria-label="−1">
                        <MinusIcon />
                      </button>
                      <output className="w-8 text-center font-semibold tabular-nums" aria-live="polite">
                        {l.qty}
                      </output>
                      <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-deep disabled:opacity-30" onClick={() => update(i, { qty: Math.min(site.order.maxPerLine, l.qty + 1) })} disabled={l.qty >= site.order.maxPerLine} aria-label="+1">
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                </div>
                {(it.sizes || it.options) && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {it.sizes && (
                      <label className="block">
                        <span className="label">{d.optionTitles.size}</span>
                        <select className="field" value={l.size} onChange={(e) => update(i, { size: e.target.value })}>
                          {it.sizes.map((s) => (
                            <option key={s.id} value={s.id}>
                              {d.sizes[s.id]}
                              {s.price !== null ? ` · ${price(s.price, lang)}` : ` · ${d.carte.priceOnSite.toLowerCase()}`}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                    {(it.options ?? []).map((g) => sel(i, g, l.opts[g] ?? OPTIONS[g][0]))}
                  </div>
                )}
                <p className="mt-3 text-end text-[0.9375rem] font-semibold text-muted tabular-nums">{unit !== null ? price(unit * l.qty, lang) : d.carte.priceOnSite}</p>
                {lines.length > 1 && (
                  <button type="button" onClick={() => setLines((ls) => ls.filter((_, j) => j !== i))} className="absolute end-2 top-2 flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-cream-deep hover:text-ink" aria-label={t.removeLine}>
                    <CloseIcon className="h-4 w-4" />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        {lines.length < 12 && (
          <button
            type="button"
            onClick={() => {
              touched.current = true;
              setLines((ls) => [...ls, emptyLine("assiette-kebab")]);
            }}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-semibold text-turquoise-ink hover:bg-cream-deep"
          >
            <PlusIcon />
            {t.addLine}
          </button>
        )}
        <p className="mt-2 text-[0.8125rem] text-muted">{t.phoneOnly}</p>
        {err("lines")}
      </fieldset>

      {/* 2. Sur place ou à emporter */}
      <fieldset>
        {legend(2, t.modeTitle)}
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <label key={m} className="chip">
              <input type="radio" name="mode" value={m} checked={mode === m} onChange={() => setMode(m)} className="sr-only" />
              {t.modes[m]}
            </label>
          ))}
        </div>
      </fieldset>

      {/* 3. Heure : seulement aux heures d'ouverture, la nuit comprise */}
      <fieldset>
        {legend(3, t.pickupTitle)}
        <div role="radiogroup" aria-label={t.day} aria-describedby={errors.day ? "err-day" : undefined} className="flex flex-wrap gap-2">
          {days.map((x, i) => (
            <label key={x} className="chip">
              <input type="radio" name="day" value={x} checked={day === x} onChange={() => setDay(x)} className="sr-only" {...(i === 0 ? { "data-err": "day" } : {})} />
              <span className="first-letter:uppercase">{dayLabel(x)}</span>
            </label>
          ))}
        </div>
        {err("day")}
        <label className="mt-5 block sm:w-1/2">
          <span className="label">{t.time}</span>
          <select className="field" value={time} onChange={(e) => setTime(e.target.value)} required {...aria("time")}>
            <option value="">—</option>
            {times.map((x) => (
              <option key={x} value={x}>
                {formatTime(x, lang)}
              </option>
            ))}
          </select>
          {day && now && !times.length && <span className="mt-2 block text-sm text-muted">{t.noSlots}</span>}
          {err("time")}
        </label>
      </fieldset>

      {/* 4. Coordonnées */}
      <fieldset>
        {legend(4, t.contactTitle)}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="label">{t.name}</span>
            <input className="field" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required {...aria("name")} />
            {err("name")}
          </label>
          <label className="block">
            <span className="label">{t.phone}</span>
            <input className="field" name="tel" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required {...aria("phone")} />
            {err("phone")}
          </label>
          <label className="block sm:col-span-2">
            <span className="label">{t.email}</span>
            <input className="field" name="email" type="email" spellCheck={false} inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} {...aria("email")} />
            <span className="mt-1.5 block text-[0.875rem] text-muted">{t.emailHint}</span>
            {err("email")}
          </label>
          <label className="block sm:col-span-2">
            <span className="label">{t.message}</span>
            <textarea name="message" className="field min-h-20 resize-y" maxLength={1000} placeholder={t.messagePh} value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
        </div>
      </fieldset>

      <div className="rounded-[16px] bg-night p-5 text-cream">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-semibold">{t.total}</span>
          <span className="display text-[1.75rem] tabular-nums">{price(total.sum, lang)}</span>
        </div>
        {total.partial && <p className="mt-1 text-sm text-cream/75">{t.totalNote}</p>}
        <button type="submit" className="btn mt-5 w-full" disabled={sending}>
          {sending ? t.sending : site.payment.enabled ? t.payOnline : t.submit}
        </button>
        {!site.payment.enabled && <p className="mt-3 text-center text-[0.875rem] text-cream/75">{t.payNote}</p>}
        {errors.send && (
          <div className="mt-5 space-y-4" role="alert">
            <p className="font-semibold text-saffron">{errors.send}</p>
            {call}
          </div>
        )}
      </div>
    </form>
  );
}
