import type { CSSProperties } from "react";
import logo from "@/lib/logo-paths.json";

// Logo typographique d'Avesta (scripts/logo.mjs) : l'étoile à huit branches au trait safran et « AVESTA » en Fraunces.
// Pour le remplacer par un vrai logo : remplacer ce composant, public/logo.svg et app/icon.svg.

/** Logo complet ; le mot prend la couleur du texte (currentColor), l'étoile reste safran. word: le mot seul. */
export function Logo({ className = "w-32", word = false }: { className?: string; word?: boolean }) {
  const x0 = word ? Number(logo.wordTransform.match(/translate\(([\d.]+)/)?.[1] ?? 0) - 4 : 0;
  return (
    <svg viewBox={`${x0} 0 ${logo.width - x0} ${logo.height}`} className={className} role="img" aria-label="Avesta">
      {!word && (
        <>
          <path d={logo.star} fill="none" stroke="var(--color-saffron)" strokeWidth={logo.strokeWidth} strokeLinejoin="round" />
          <path d={logo.octo} fill="none" stroke="var(--color-saffron)" strokeWidth={logo.strokeWidth} strokeLinejoin="round" />
        </>
      )}
      <path d={logo.word} transform={logo.wordTransform} fill="currentColor" />
    </svg>
  );
}

const at = (d: number, t: number) => ({ "--d": `${d}s`, "--t": `${t}s` }) as CSSProperties;

/** L'étoile à huit branches seule (khatam : deux carrés croisés et un octogone au centre), au trait. draw : se dessine. */
export function Star({ className = "h-6 w-6", strokeWidth = 2.4, draw = false }: { className?: string; strokeWidth?: number; draw?: boolean }) {
  const p = (d: number, t: number) => (draw ? { pathLength: 1, className: "intro-draw", style: at(d, t) } : {});
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" aria-hidden="true">
      <path {...p(0, 0.4)} d="M50 6 94 50 50 94 6 50Z" />
      <path {...p(0.1, 0.4)} d="M18.9 18.9H81.1V81.1H18.9Z" />
      <path {...p(0.3, 0.22)} d="M50 34 61.3 38.7 66 50 61.3 61.3 50 66 38.7 61.3 34 50 38.7 38.7Z" />
    </svg>
  );
}
