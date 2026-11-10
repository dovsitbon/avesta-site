import { formatTime } from "@/lib/format";
import { sameEveryDay, weekHours } from "@/lib/hours";
import type { Dict, Locale } from "@/lib/i18n";

/** Horaires (data/horaires.json). Mêmes horaires tous les jours : une seule ligne « Tous les jours ». */
export function HoursTable({ lang, d, compact = false }: { lang: Locale; d: Dict; compact?: boolean }) {
  const week = weekHours();
  const fmt = (i: number) => (week[i].length ? week[i].map(([a, b]) => `${formatTime(a, lang)} – ${formatTime(b, lang)}`).join(" · ") : d.infos.closed);
  const rows: [string, string, boolean][] = sameEveryDay() ? [[d.infos.everyDay, fmt(0), true]] : week.map((s, i) => [d.infos.days[i], fmt(i), s.length > 0]);
  return (
    <table className={`w-full ${compact ? "text-[0.9375rem]" : "text-base"}`}>
      <tbody>
        {rows.map(([day, hours, open]) => (
          <tr key={day} className="border-b border-line/70 last:border-0">
            <th scope="row" className="py-2 pe-4 text-start font-normal">
              {day}
            </th>
            <td className={`py-2 text-end font-semibold tabular-nums ${open ? "" : "text-muted"}`}>{hours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
