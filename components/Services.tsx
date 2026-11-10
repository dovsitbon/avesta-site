import { Illus, type IllusName } from "@/components/Illus";
import type { Dict } from "@/lib/i18n";

const ICONS: IllusName[] = ["moon", "bag", "seat", "phone"];

/** Bande de services en 4 pictos : ouvert jusqu'à 5 h, à emporter, sur place, commande par téléphone. */
export function Services({ d }: { d: Dict }) {
  return (
    <section aria-label={d.services.title} className="px-4 pt-6 md:px-8">
      <h2 className="sr-only">{d.services.title}</h2>
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-8 border-y border-line py-8 md:grid-cols-4 md:py-10">
        {d.services.items.map((s, i) => (
          <li key={s.t} className="flex flex-col items-center px-2 text-center">
            <Illus name={ICONS[i]} className="h-10 w-10 text-turquoise-ink" strokeWidth={3.4} />
            <p className="display mt-3 text-[1.25rem]">{s.t}</p>
            <p className="mt-1 max-w-[16rem] text-[0.875rem] leading-relaxed text-muted">{s.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
