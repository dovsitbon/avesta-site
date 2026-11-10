import Image from "next/image";
import Link from "next/link";
import site from "@/data/site.json";
import { getDict, fill, isLocale, type Dict, type Locale } from "@/lib/i18n";
import { formatDay } from "@/lib/format";
import { firstImg } from "@/lib/media";
import { pagePath } from "@/lib/pages";
import { homeJsonLd } from "@/lib/jsonld";
import { Reveal } from "@/components/Reveal";
import { OpenStatus } from "@/components/OpenStatus";
import { OrderLink } from "@/components/OrderLink";
import { Tiles } from "@/components/Tiles";
import { Services } from "@/components/Services";
import { MenuTabs } from "@/components/MenuTabs";
import { OrderForm } from "@/components/OrderForm";
import { HoursTable } from "@/components/HoursTable";
import { Photo, type Tint } from "@/components/Photo";
import { Star } from "@/components/Logo";
import type { IllusName } from "@/components/Illus";
import { PhoneIcon, PinIcon, PlusIcon, StarIcon } from "@/components/icons";

// Statut « ouvert » et bandeau calculés côté navigateur ; la page est régénérée chaque heure.
export const revalidate = 3600;

const HERO = ["/media/hero/hero.jpg", "/media/facade/facade-nuit.jpg"];

function Rating({ lang, d, className = "" }: { lang: Locale; d: Dict; className?: string }) {
  const value = new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-GB", { minimumFractionDigits: 1 }).format(site.rating.value);
  return (
    <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-6 items-center gap-2 font-medium hover:underline ${className}`} title={fill(d.hero.ratingNote, { date: formatDay(site.rating.checked, lang, { day: "numeric", month: "long", year: "numeric" }) })}>
      <span className="flex text-saffron" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} className="h-4 w-4" />
        ))}
      </span>
      <span>
        {fill(d.hero.rating, { value })} · {fill(d.hero.ratingCount, { count: site.rating.count })}
      </span>
    </a>
  );
}

function SectionHead({ eyebrow, title, intro, center = false }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display mt-3 text-[2.3rem] md:text-[3.4rem]">{title}</h2>
      {intro && <p className="lead mt-4">{intro}</p>}
    </Reveal>
  );
}

/** Bloc alterné : une photo, un texte court, un seul bouton. */
function Block({ id, eyebrow, title, text, cta, photo, flip = false, night = false }: { id?: string; eyebrow: string; title: string; text: string; cta: React.ReactNode; photo: { paths: string[]; label: string; illus?: IllusName; tint: Tint }; flip?: boolean; night?: boolean }) {
  return (
    <section id={id} className={`scroll-mt-20 px-4 md:px-8 ${night ? "on-night bg-night py-20 text-cream md:py-28" : "pt-20 md:pt-28"}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal className={flip ? "md:order-2" : ""}>
          <Photo paths={photo.paths} alt={photo.label} label={photo.label} illus={photo.illus} tint={photo.tint} sizes="(min-width: 768px) 46vw, 100vw" className="aspect-[4/5] rounded-[24px] md:aspect-[5/6]" />
        </Reveal>
        <Reveal delay={0.05} className="px-1 md:max-w-md">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display mt-3 text-[2.3rem] md:text-[3.2rem]">{title}</h2>
          <p className="lead mt-5">{text}</p>
          <div className="mt-8">{cta}</div>
        </Reveal>
      </div>
    </section>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const d = getDict(lang);
  const order = `/${lang}#commander`;
  const hero = firstImg(HERO);
  const b = d.blocks;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(lang)) }} />

      {/* 1. Hero plein écran : la photo la plus forte (façade la nuit), un titre court, deux boutons, la note Google et le statut */}
      <section className="on-night relative overflow-hidden bg-night text-cream md:min-h-[calc(100svh-6.5rem)]">
        {hero ? (
          <>
            <Image src={hero.src} alt={d.slots.hero} width={hero.width} height={hero.height} sizes="100vw" quality={80} priority fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-night/60" aria-hidden="true" />
          </>
        ) : (
          <Star className="pointer-events-none absolute -end-40 -top-24 h-[42rem] w-[42rem] text-saffron/[0.07] md:-end-24 md:h-[56rem] md:w-[56rem]" strokeWidth={0.5} />
        )}
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pt-14 pb-14 md:min-h-[calc(100svh-6.5rem)] md:grid-cols-[1.25fr_1fr] md:items-center md:px-8 md:py-16">
          <div>
            <p className="eyebrow rise">{d.hero.eyebrow}</p>
            <h1 className="display rise mt-5 text-[3.3rem] !leading-[0.95] md:text-[5.2rem] lg:text-[6.2rem]" style={{ animationDelay: "0.05s" }}>
              {d.hero.title}
            </h1>
            <p className="lead rise mt-6 max-w-md text-[1.125rem]" style={{ animationDelay: "0.1s" }}>
              {d.hero.sub}
            </p>
            <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "0.15s" }}>
              <OrderLink href={order} className="btn">
                {d.hero.ctaOrder}
              </OrderLink>
              <a href={`/${lang}#carte`} className="btn-line">
                {d.hero.ctaMenu}
              </a>
            </div>
            <div className="rise mt-7 flex flex-col gap-2 text-[0.9375rem] sm:flex-row sm:flex-wrap sm:gap-x-6" style={{ animationDelay: "0.2s" }}>
              <Rating lang={lang} d={d} />
              <OpenStatus className="font-medium" />
            </div>
          </div>
          {!hero && (
            <div className="rise relative hidden md:block" style={{ animationDelay: "0.2s" }}>
              <Photo paths={HERO} alt={d.slots.hero} label={`${d.slots.soon} · ${d.slots.hero}`} illus="facade" tint="deep" sizes="40vw" className="aspect-[4/5] rounded-[28px] ring-1 ring-saffron/25" illusClassName="h-24 w-24" />
            </div>
          )}
        </div>
      </section>

      {/* 2. Tuiles de catégories, en capitales, juste après le hero */}
      <section aria-label={d.tiles.title} className="px-4 pt-6 md:px-8 md:pt-8">
        <h2 className="sr-only">{d.tiles.title}</h2>
        <div className="mx-auto max-w-7xl">
          <Tiles />
        </div>
      </section>

      {/* 3. Bande de services en 4 pictos */}
      <Services d={d} />

      {/* 4. La carte : une seule page à onglets, prix en HTML, ajout direct à la commande */}
      <section id="carte" className="scroll-mt-20 px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 px-1 md:flex-row md:items-end">
            <SectionHead eyebrow={d.carte.eyebrow} title={d.carte.title} intro={d.carte.intro} />
            <Link href={pagePath("carte", lang)} className="link-line shrink-0 self-start font-semibold md:self-auto">
              {d.carte.seeFull}
            </Link>
          </div>
          <MenuTabs />
        </div>
      </section>

      {/* 5. Trois blocs alternés : spécialités perses, la nuit, les menus étudiants */}
      <Block id="perses" {...b.perses} photo={{ paths: ["/media/specialites-perses/bloc-perses.jpg", "/media/specialites-perses/kabab-koobideh.jpg"], label: b.perses.photo, illus: "rice", tint: "turquoise" }} cta={<a href={`/${lang}#carte`} className="btn-line">{b.perses.cta}</a>} />
      <div className="pt-20 md:pt-28" />
      <Block
        night
        flip
        {...b.nuit}
        photo={{ paths: ["/media/facade/facade-nuit.jpg", "/media/facade/facade.jpg"], label: b.nuit.photo, illus: "moon", tint: "deep" }}
        cta={
          <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn">
            <PinIcon className="h-5 w-5" />
            {b.nuit.cta}
          </a>
        }
      />
      <Block
        {...b.etudiants}
        photo={{ paths: ["/media/plats/bloc-etudiants.jpg", "/media/plats/tacos.jpg"], label: b.etudiants.photo, illus: "tacos", tint: "night" }}
        cta={
          <OrderLink href={order} intent={{ item: "tacos" }} className="btn">
            {b.etudiants.cta}
          </OrderLink>
        }
      />

      {/* 6. Commande (sur place ou à emporter) */}
      <section id="commander" className="scroll-mt-20 px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[32px] bg-cream-deep p-4 py-10 md:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:p-14">
          <div className="px-2 md:px-0 lg:sticky lg:top-24 lg:self-start">
            <SectionHead eyebrow={d.order.eyebrow} title={d.order.title} intro={d.order.intro} />
            <Reveal delay={0.05} className="on-night mt-8 rounded-[20px] bg-night p-6 text-cream">
              <p className="display text-[1.5rem]">{d.order.callTitle}</p>
              <p className="mt-1 text-cream/75">{d.order.callText}</p>
              <a href={`tel:${site.phoneIntl}`} className="btn mt-5">
                <PhoneIcon className="h-5 w-5" />
                {d.order.callCta} · {site.phone}
              </a>
              <div className="mt-4 text-[0.9375rem]">
                <OpenStatus />
              </div>
            </Reveal>
          </div>
          <OrderForm />
        </div>
      </section>

      {/* 7. Avis : uniquement de vrais avis, avec l'accord du restaurant. Aucun avis inventé. */}
      <section id="avis" className="px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal className="text-center md:text-start">
            <p className="eyebrow">{d.reviews.eyebrow}</p>
            <p className="display mt-4 text-[6rem] !leading-none md:text-[8rem]">{new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-GB", { minimumFractionDigits: 1 }).format(site.rating.value)}</p>
            <div className="mt-3 flex justify-center text-saffron md:justify-start" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} className="h-6 w-6" />
              ))}
            </div>
            <p className="mt-3 text-muted">
              {fill(d.hero.ratingCount, { count: site.rating.count })} Google · {fill(d.hero.ratingNote, { date: formatDay(site.rating.checked, lang, { day: "numeric", month: "long", year: "numeric" }) })}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[2.3rem] md:text-[3.2rem]">{d.reviews.title}</h2>
            <p className="lead mt-4">{d.reviews.text}</p>
            <div hidden dangerouslySetInnerHTML={{ __html: "<!-- À REMPLIR avec de vrais avis clients (avec l'accord d'Avesta) --><!-- À REMPLIR avec de vrais avis clients --><!-- À REMPLIR avec de vrais avis clients -->" }} />
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-line mt-8">
              {d.reviews.cta}
            </a>
          </Reveal>
        </div>
      </section>

      {/* 8. Infos pratiques */}
      <section id="infos" className="scroll-mt-20 px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 px-1">
            <SectionHead eyebrow={d.infos.eyebrow} title={d.infos.title} />
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
            <Reveal className="space-y-7 rounded-[24px] bg-paper p-6 ring-1 ring-line md:p-9">
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <p className="eyebrow mb-2">{d.infos.address}</p>
                  <address className="text-lg font-semibold not-italic">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </address>
                </div>
                <div>
                  <p className="eyebrow mb-2">{d.infos.phone}</p>
                  <a href={`tel:${site.phoneIntl}`} className="link-line text-lg font-semibold">
                    {site.phone}
                  </a>
                </div>
              </div>
              <div>
                <p className="eyebrow mb-2">{d.infos.hours}</p>
                <HoursTable lang={lang} d={d} />
                <div className="mt-3 font-medium">
                  <OpenStatus />
                </div>
              </div>
              <div>
                <p className="eyebrow mb-2">{d.infos.access}</p>
                <p className="leading-relaxed text-muted">{d.infos.accessText}</p>
                <p className="mt-3 font-semibold">{d.infos.services}</p>
                <p className="mt-1 text-[0.9375rem] text-muted">{d.infos.delivery}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn">
                  <PinIcon className="h-5 w-5" />
                  {d.infos.route}
                </a>
                <a href={`tel:${site.phoneIntl}`} className="btn-line">
                  <PhoneIcon className="h-5 w-5" />
                  {d.nav.call}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.05} className="flex min-h-96 flex-col overflow-hidden rounded-[24px] bg-cream-deep">
              {firstImg(["/media/facade/facade.jpg"]) && <Photo paths={["/media/facade/facade.jpg"]} alt={d.slots.facade} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/9]" />}
              <iframe title={d.infos.mapTitle} src={site.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="min-h-96 w-full flex-1 border-0" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="px-1">
            <SectionHead eyebrow={d.faq.eyebrow} title={d.faq.title} />
          </div>
          <Reveal delay={0.05}>
            <div className="divide-y divide-line border-y border-line">
              {d.faq.items.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex min-h-16 items-center justify-between gap-6 py-5 font-[family-name:var(--font-display)] text-[1.25rem]">
                    {f.q}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ring-line">
                      <PlusIcon className="faq-plus h-4 w-4" />
                    </span>
                  </summary>
                  <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
