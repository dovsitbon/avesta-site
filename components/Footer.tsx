import Link from "next/link";
import site from "@/data/site.json";
import { Logo } from "@/components/Logo";
import { HoursTable } from "@/components/HoursTable";
import { PhoneIcon, PinIcon } from "@/components/icons";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { pagePath } from "@/lib/pages";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const links = [
    [pagePath("carte", lang), d.footer.menu],
    [pagePath("nuit", lang), d.footer.nuit],
    [pagePath("tacos", lang), d.footer.tacos],
    [pagePath("legal", lang), d.footer.legal],
  ];
  return (
    <footer className="on-night bg-night pb-24 text-cream md:pb-0">
      <div className="frieze mx-auto max-w-7xl opacity-40" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_1fr_1.1fr] md:px-10 md:py-20">
        <div>
          <Logo className="w-44" />
          <p className="mt-5 max-w-xs leading-relaxed text-cream/75">{d.footer.tagline}</p>
        </div>
        <div className="leading-relaxed">
          <p className="eyebrow mb-3">{d.infos.address}</p>
          <address className="text-lg not-italic">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <div className="mt-3 flex flex-col items-start">
            <a href={`tel:${site.phoneIntl}`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-saffron hover:underline">
              <PhoneIcon className="h-4 w-4" />
              {site.phone}
            </a>
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-cream/85 hover:underline">
              <PinIcon className="h-4 w-4" />
              {d.infos.route}
            </a>
          </div>
          <ul className="mt-5 space-y-0.5 text-cream/75">
            {links.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-9 items-center hover:text-cream hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="[&_tr]:border-cream/15">
          <p className="eyebrow mb-3">{d.infos.hours}</p>
          <HoursTable lang={lang} d={d} compact />
          <p className="mt-4 text-[0.875rem] text-cream/65">{d.infos.services}</p>
        </div>
      </div>
      <p className="border-t border-cream/10 px-6 py-6 text-center text-sm text-cream/60">{fill(d.footer.rights, { year: new Date().getFullYear() })}</p>
    </footer>
  );
}
