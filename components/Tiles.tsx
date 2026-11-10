"use client";

import { useLocale } from "@/components/providers";
import { openTab } from "@/components/MenuTabs";
import { Photo, type Tint } from "@/components/Photo";
import type { IllusName } from "@/components/Illus";
import type { CategoryId } from "@/lib/carte";

type Tile = { id: CategoryId; paths: string[]; illus: IllusName; tint: Tint };

// Une tuile par catégorie, nom en capitales sur la photo. Tant que la photo manque (assets/plats/tuile-<catégorie>.jpg),
// un panneau aux couleurs de la charte la remplace.
const TILES: Tile[] = [
  { id: "perses", paths: ["/media/specialites-perses/tuile-perses.jpg", "/media/specialites-perses/kabab-koobideh.jpg"], illus: "skewer", tint: "turquoise" },
  { id: "tacos", paths: ["/media/plats/tuile-tacos.jpg", "/media/plats/tacos.jpg"], illus: "tacos", tint: "night" },
  { id: "assiettes", paths: ["/media/plats/tuile-assiettes.jpg", "/media/plats/assiette-kebab.jpg"], illus: "plate", tint: "deep" },
  { id: "sandwichs", paths: ["/media/plats/tuile-sandwichs.jpg", "/media/plats/sandwich.jpg"], illus: "sandwich", tint: "night" },
  { id: "menus", paths: ["/media/plats/tuile-menus.jpg", "/media/plats/box.jpg"], illus: "box", tint: "deep" },
  { id: "desserts-boissons", paths: ["/media/plats/tuile-desserts-boissons.jpg", "/media/plats/dessert.jpg"], illus: "glass", tint: "grenade" },
];

export function Tiles() {
  const { lang, d } = useLocale();
  return (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 xl:grid-cols-6">
      {TILES.map((t) => (
        <li key={t.id}>
          <a
            href={`/${lang}#carte`}
            onClick={(e) => {
              if (openTab(t.id)) e.preventDefault();
            }}
            className="group relative block aspect-[4/5] overflow-hidden rounded-[18px]"
          >
            <Photo paths={t.paths} alt="" illus={t.illus} tint={t.tint} sizes="(min-width: 1280px) 16vw, (min-width: 768px) 32vw, 50vw" className="absolute inset-0 h-full w-full" illusClassName="h-[38%] w-[38%] -translate-y-5 opacity-90 transition-transform duration-500 group-hover:-translate-y-7" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-deep/85 to-transparent px-3 pt-10 pb-4 text-center text-[0.8125rem] font-semibold tracking-[0.14em] text-cream uppercase md:text-[0.875rem]">
              {d.tiles.items[t.id]}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
