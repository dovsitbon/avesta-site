import hours from "@/data/horaires.json";
import { isoDay } from "@/lib/format";

// Les créneaux peuvent passer minuit : ["11:00", "05:00"] = de 11 h à 5 h le lendemain.
// Un « jour de service » est le jour où le créneau commence : la nuit de lundi à mardi appartient au service du lundi.

export type Slot = [string, string];
type Week = Record<string, Slot[]>;
type Exception = { date: string; closed?: boolean; slots?: Slot[] };

const week = hours.week as unknown as Week;
const exceptions = hours.exceptions as Exception[];

/** Jour ISO (1 = lundi … 7 = dimanche) d'une date AAAA-MM-JJ. */
export const weekday = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return ((new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7) + 1;
};

export const addDays = (iso: string, n: number) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
};

const dayDiff = (a: string, b: string) => Math.round((Date.parse(`${a}T00:00:00Z`) - Date.parse(`${b}T00:00:00Z`)) / 86_400_000);

/** Créneaux d'ouverture d'un jour de service (fermetures exceptionnelles comprises). */
export function slotsOn(iso: string): Slot[] {
  const ex = exceptions.find((e) => e.date === iso);
  if (ex) return ex.closed ? [] : (ex.slots ?? []);
  return week[String(weekday(iso))] ?? [];
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (n: number) => {
  const x = ((n % 1440) + 1440) % 1440;
  return `${String(Math.floor(x / 60)).padStart(2, "0")}:${String(x % 60).padStart(2, "0")}`;
};
/** Début et fin d'un créneau en minutes depuis le début du jour de service (fin > 1440 si on passe minuit). */
const span = ([a, b]: Slot) => {
  const s = toMin(a);
  let e = toMin(b);
  if (e <= s) e += 1440;
  return [s, e] as const;
};

/** Heure de Paris « HH:MM ». */
const parisTime = (date: Date) => new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit", hour12: false }).format(date);

export type Status = { open: true; until: string } | { open: false; nextDay: string | null; at: string | null };

/** Ouvert / fermé en ce moment (y compris la nuit, sur le service de la veille), et prochaine ouverture. */
export function statusAt(date: Date): Status {
  const today = isoDay(date);
  const now = toMin(parisTime(date));
  for (const [day, offset] of [
    [addDays(today, -1), 1440],
    [today, 0],
  ] as const) {
    for (const slot of slotsOn(day)) {
      const [s, e] = span(slot);
      if (now + offset >= s && now + offset < e) return { open: true, until: slot[1] };
    }
  }
  const later = slotsOn(today).find(([a]) => toMin(a) > now);
  if (later) return { open: false, nextDay: today, at: later[0] };
  for (let i = 1; i <= 14; i++) {
    const day = addDays(today, i);
    const s = slotsOn(day);
    if (s.length) return { open: false, nextDay: day, at: s[0][0] };
  }
  return { open: false, nextDay: null, at: null };
}

/** Horaires de la semaine, du lundi au dimanche, pour l'affichage et le schema.org. */
export const weekHours = () => [1, 2, 3, 4, 5, 6, 7].map((n) => week[String(n)] ?? []);

/** Vrai si tous les jours ont les mêmes horaires (affichage « Tous les jours »). */
export const sameEveryDay = () => {
  const w = weekHours().map((s) => JSON.stringify(s));
  return w.every((x) => x === w[0]) && weekHours()[0].length > 0;
};

/**
 * Heures de retrait possibles pour un jour de service : toutes les 15 min pendant l'ouverture, jusqu'à 15 min avant
 * la fermeture (la nuit comprise), et pas avant « maintenant + 20 min » (data/site.json → order).
 */
export function pickupTimes(day: string, now: Date, step = 15, ahead = 20): string[] {
  const nowRel = toMin(parisTime(now)) + 1440 * dayDiff(isoDay(now), day);
  const earliest = nowRel + ahead;
  return slotsOn(day).flatMap((slot) => {
    const [s, e] = span(slot);
    const out: string[] = [];
    const first = Math.max(s, Math.ceil(earliest / step) * step);
    for (let t = first; t <= e - step; t += step) out.push(toHHMM(t));
    return out;
  });
}

/** Date réelle d'un retrait : après minuit, c'est le lendemain du jour de service. */
export function pickupDate(day: string, time: string) {
  const first = slotsOn(day)[0];
  return first && toMin(time) < toMin(first[0]) ? addDays(day, 1) : day;
}
