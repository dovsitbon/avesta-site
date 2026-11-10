import type { IllusKind } from "@/lib/carte";

// Petites illustrations au trait (viewBox 0 0 120 120, trait = currentColor). Elles tiennent la place des photos
// tant que le restaurant n'en a pas fourni (voir assets/A-PHOTOGRAPHIER.md). Aucune fausse photo.

export type IllusName = IllusKind | "facade" | "room" | "moon" | "bag" | "seat" | "phone";

const P: Record<IllusName, string[]> = {
  skewer: ["M14 98 104 22", "M34 70a10 10 0 1 1 14 0", "M50 56a10 10 0 1 1 14 0", "M66 42a10 10 0 1 1 14 0", "M30 76c-4 6-8 8-12 8M84 32c4-4 8-6 12-6"],
  rice: ["M14 62H106C106 86 86 102 60 102S14 86 14 62Z", "M24 62C26 44 42 32 60 32S94 44 96 62", "M40 50h2M52 44h2M66 46h2M78 52h2M58 56h2"],
  glass: ["M38 24H82L76 104H44Z", "M41 48H79", "M52 60l4 6M64 72l4 6M50 84l4 6"],
  tacos: ["M14 86C14 50 34 26 60 26S106 50 106 86Z", "M14 86H106", "M30 60c8-6 14 4 22-2s14 4 22-2 14 4 18 0", "M26 74h68"],
  plate: ["M60 104a44 44 0 1 0 0-88 44 44 0 0 0 0 88Z", "M60 88a28 28 0 1 0 0-56 28 28 0 0 0 0 56Z", "M44 54h18M48 64h22M52 74h12", "M76 44l6 6M80 40l6 6"],
  sandwich: ["M12 66C12 50 34 40 60 40S108 50 108 66", "M12 66H108", "M16 76c8-6 14 4 22-2s14 4 22-2 14 4 22-2 14 4 22-2", "M12 86H108C108 92 104 96 98 96H22C16 96 12 92 12 86Z"],
  burger: ["M18 56C18 36 38 24 60 24S102 36 102 56Z", "M14 66H106", "M18 76c8-5 14 3 21-1s14 3 21-1 14 3 21-1 14 3 21-1", "M18 86H102C102 94 96 100 88 100H32C24 100 18 94 18 86Z", "M48 38h2M62 34h2M74 40h2"],
  box: ["M18 44H102V100H18Z", "M18 44 30 24H90L102 44", "M44 44V66H76V44", "M18 76H102"],
  dessert: ["M30 50H90L82 102H38Z", "M30 50C30 34 44 24 60 24S90 34 90 50", "M60 24C60 16 66 12 72 14"],
  can: ["M40 20H80V104H40Z", "M40 32H80M40 92H80", "M52 50h16v24H52Z"],
  bottle: ["M50 14H70V30C82 36 84 44 84 54V104H36V54C36 44 38 36 50 30Z", "M36 64H84M36 86H84"],
  facade: ["M14 104V30H106V104", "M14 30 22 14H98L106 30", "M30 104V58H56V104", "M68 58H94V84H68Z", "M44 30V46M60 30V46M76 30V46"],
  room: ["M10 100H110", "M24 64H56V100M40 64V100", "M64 64H96V100M80 64V100", "M28 48h24M68 48h24", "M40 48V36M80 48V36"],
  moon: ["M78 22A40 40 0 1 0 98 74 32 32 0 0 1 78 22Z", "M92 30l3 6 6 3-6 3-3 6-3-6-6-3 6-3Z"],
  bag: ["M24 40H96L90 106H30Z", "M44 40V32C44 22 52 16 60 16S76 22 76 32V40"],
  seat: ["M30 58H90", "M38 58V104M82 58V104", "M44 58V24H76V58"],
  phone: ["M40 14H80C84 14 86 16 86 20V100C86 104 84 106 80 106H40C36 106 34 104 34 100V20C34 16 36 14 40 14Z", "M54 94h12"],
};

export function Illus({ name, className = "h-12 w-12", strokeWidth = 3 }: { name: IllusName; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
