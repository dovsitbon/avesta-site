import Image from "next/image";
import { firstImg } from "@/lib/media";
import { Illus, type IllusName } from "@/components/Illus";
import { Star } from "@/components/Logo";

const TINTS = {
  night: "bg-night text-saffron",
  deep: "bg-night-deep text-saffron",
  turquoise: "bg-[#1f6f66] text-cream",
  grenade: "bg-grenade text-cream",
  cream: "bg-cream-deep text-night",
} as const;
export type Tint = keyof typeof TINTS;

/**
 * Emplacement photo (plat, façade, salle…). Tant que la photo n'existe pas dans public/media, un panneau sobre la remplace :
 * fond de la charte, illustration au trait et, si demandé, le nom de la photo attendue. Aucune fausse photo.
 * Pour la remplir : déposer la photo dans assets/<dossier>/ sous le nom attendu, puis npm run media.
 */
export function Photo({
  paths,
  alt,
  illus,
  tint = "night",
  sizes,
  className = "",
  imgClassName = "",
  priority = false,
  label,
  illusClassName = "h-1/3 w-1/3 max-h-28 max-w-28",
}: {
  paths: readonly string[];
  alt: string;
  illus?: IllusName;
  tint?: Tint;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  label?: string;
  illusClassName?: string;
}) {
  const p = firstImg(paths);
  if (p)
    return (
      <div className={`zoom bg-night ${className}`}>
        <Image src={p.src} alt={alt} width={p.width} height={p.height} sizes={sizes} quality={75} priority={priority} fetchPriority={priority ? "high" : undefined} className={`h-full w-full object-cover ${imgClassName}`} />
      </div>
    );
  return (
    <div className={`relative flex flex-col items-center justify-center gap-4 ${TINTS[tint]} ${className}`} data-photo-slot={paths[0]} role="img" aria-label={alt}>
      {illus ? <Illus name={illus} className={illusClassName} strokeWidth={2.4} /> : <Star className={illusClassName} strokeWidth={1.6} />}
      {label && <span className="px-4 text-center text-[0.75rem] font-semibold tracking-[0.12em] uppercase opacity-80">{label}</span>}
    </div>
  );
}
