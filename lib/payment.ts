import site from "@/data/site.json";
import { orderTotal, type Order } from "@/lib/order";
import { getDict, type Locale } from "@/lib/i18n";
import { lineLabel } from "@/lib/order";

// Paiement en ligne (Stripe Checkout), prévu mais DÉSACTIVÉ par défaut.
// Pour l'activer : data/site.json → payment.enabled = true, et variable Vercel STRIPE_SECRET_KEY.
// Seules les commandes dont tous les prix sont connus passent par le paiement ; les autres restent « à régler au comptoir ».
// Appel direct à l'API Stripe (pas de SDK) : https://docs.stripe.com/api/checkout/sessions/create

export const paymentEnabled = () => site.payment.enabled && !!process.env.STRIPE_SECRET_KEY;

export async function createCheckout(q: Order, lang: Locale, origin: string): Promise<string | null> {
  if (!paymentEnabled()) return null;
  const { sum, partial } = orderTotal(q.lines);
  if (partial || sum <= 0) return null;
  const d = getDict(lang);
  const form = new URLSearchParams({
    mode: "payment",
    success_url: `${origin}/${lang}?paiement=ok#commander`,
    cancel_url: `${origin}/${lang}?paiement=annule#commander`,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": site.payment.currency,
    "line_items[0][price_data][unit_amount]": String(Math.round(sum * 100)),
    "line_items[0][price_data][product_data][name]": `${site.name} · ${q.lines.map((l) => lineLabel(l, d)).join(", ")}`.slice(0, 250),
    "metadata[name]": q.name,
    "metadata[phone]": q.phone,
    "metadata[time]": `${q.day} ${q.time}`,
  });
  if (q.email) form.set("customer_email", q.email);
  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, "content-type": "application/x-www-form-urlencoded" },
    body: form,
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { url?: string };
  return json.url ?? null;
}
