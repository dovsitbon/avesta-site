"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Logo, Star } from "@/components/Logo";

const KEY = "avesta-intro";

/**
 * Ouverture (1,2 s, une fois par session), tout en CSS (globals.css) : fond bleu nuit, l'étoile à huit branches
 * se dessine au trait safran, « AVESTA » apparaît, puis « OUVERT JUSQU'À 5 H », puis fondu sur le hero.
 * Bouton « Passer » ; ignorée si l'utilisateur préfère réduire les animations.
 */
export function Intro({ skipLabel, openLabel }: { skipLabel: string; openLabel: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      document.documentElement.classList.add("intro-seen");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="intro-curtain flex flex-col items-center justify-center text-cream">
      <Star draw className="h-24 w-24 text-saffron md:h-28 md:w-28" strokeWidth={2.6} />
      <div className="intro-word mt-7" style={{ "--d": "0.45s" } as CSSProperties} aria-hidden="true">
        <Logo word className="w-44 md:w-52" />
      </div>
      <p className="intro-word mt-4 text-[0.75rem] font-semibold tracking-[0.3em] text-saffron uppercase" style={{ "--d": "0.68s" } as CSSProperties} aria-hidden="true">
        {openLabel}
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          document.documentElement.classList.add("intro-seen");
          setGone(true);
        }}
        className="absolute end-4 bottom-4 min-h-11 rounded-full px-4 font-semibold text-cream/70 transition-colors hover:text-cream"
      >
        {skipLabel}
      </button>
    </div>
  );
}
