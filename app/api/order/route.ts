import { Resend } from "resend";
import { orderText, parseOrder } from "@/lib/order";
import { fill, getDict, isLocale, type Locale } from "@/lib/i18n";
import { createCheckout } from "@/lib/payment";

// Commande (sur place ou à emporter). Le restaurant n'a qu'une ligne fixe : la commande part par e-mail (Resend).
//  1. notification au restaurant (en français, avec la langue du client) ;
//  2. confirmation au client, dans sa langue, s'il a donné son e-mail ;
//  3. paiement en ligne si activé (lib/payment.ts, désactivé par défaut).
// Variables Vercel : RESEND_API_KEY, ORDER_NOTIFY_EMAIL (adresse du restaurant), RESEND_FROM (domaine vérifié dans Resend,
// ex. « Avesta <commandes@mondomaine.fr> » ; sans domaine vérifié, Resend n'envoie qu'à l'adresse du compte).
// Sans ces variables, la route répond { notified: false } et le site invite le client à appeler pour confirmer.

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function html(title: string, text: string) {
  const body = escapeHtml(text)
    .split("\n\n")
    .map((p) => `<p style="margin:0 0 18px">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
  return `<div style="background:#F7F1E6;padding:32px 16px"><div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;border:1px solid #E2D6BF;overflow:hidden;font-family:Helvetica,Arial,sans-serif;color:#1D2A44;font-size:15px;line-height:1.65">
<div style="background:#1D2A44;padding:22px 28px"><p style="margin:0;font-family:Georgia,serif;font-size:22px;letter-spacing:6px;color:#F7F1E6">AVESTA</p><p style="margin:4px 0 0;font-size:12px;letter-spacing:2px;color:#E3A21A">OUVERT JUSQU'À 5 H · 49 RUE DES AUGUSTINS</p></div>
<div style="padding:28px"><h1 style="margin:0 0 22px;font-size:22px">${escapeHtml(title)}</h1>${body}</div></div></div>`;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const lang: Locale = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : "fr";
  const q = parseOrder(body.order);
  if (!q) return Response.json({ ok: false }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  let notified = false;
  let confirmed = false;

  if (key && to) {
    const resend = new Resend(key);
    const from = process.env.RESEND_FROM ?? "Avesta <onboarding@resend.dev>";
    const fr = getDict("fr");
    const d = getDict(lang);
    const frText = orderText(q, "fr", fr);
    const text = lang === "fr" ? frText : `${frText}\n\n${fr.order.mail.lang} : ${lang.toUpperCase()}`;
    try {
      const r = await resend.emails.send({ from, to, replyTo: q.email || undefined, subject: `${fr.order.mail.subject} · ${fr.order.modes[q.mode]} · ${q.name} · ${q.time}`, html: html(fr.order.mail.title, text), text });
      notified = !r.error;
    } catch {}

    if (q.email && notified) {
      const m = d.order.mail;
      const msg = `${fill(m.confirmIntro, { name: q.name })}\n\n${orderText(q, lang, d, false)}\n\n${m.confirmOutro}`;
      try {
        const r = await resend.emails.send({ from, to: q.email, replyTo: to, subject: m.confirmSubject, html: html(m.confirmSubject, msg), text: msg });
        confirmed = !r.error;
      } catch {}
    }
  }

  const checkoutUrl = notified ? await createCheckout(q, lang, new URL(req.url).origin) : null;
  return Response.json({ ok: true, notified, confirmed, ...(checkoutUrl ? { checkoutUrl } : {}) });
}
