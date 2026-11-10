import carte from "@/data/carte.json";

export type Tag = "toConfirm" | "spicy";
export type IllusKind = "skewer" | "rice" | "glass" | "tacos" | "plate" | "sandwich" | "burger" | "box" | "dessert" | "can" | "bottle";
export type OptionGroup = keyof typeof carte.options;
export type Size = { id: "m" | "l" | "xl"; price: number | null };
export type Item = {
  price: number | null;
  from?: boolean;
  sizes?: Size[];
  options?: OptionGroup[];
  tags: Tag[];
  photo: string[];
  illus: IllusKind;
};
export type ItemId = keyof typeof carte.items;
export type CategoryId = "perses" | "tacos" | "assiettes" | "sandwichs" | "menus" | "desserts-boissons";

export const ITEMS = carte.items as unknown as Record<ItemId, Item>;
export const ITEM_IDS = Object.keys(ITEMS) as ItemId[];
export const OPTIONS = carte.options as Record<OptionGroup, string[]>;
export const OPTION_GROUPS = Object.keys(OPTIONS) as OptionGroup[];
export const isItem = (v: unknown): v is ItemId => typeof v === "string" && v in ITEMS;

export const categories = () => carte.categories as { id: CategoryId; items: ItemId[] }[];

/** Prix d'une ligne (taille comprise) ; null si le prix n'est pas encore connu. */
export function unitPrice(id: ItemId, size?: string) {
  const it = ITEMS[id];
  if (it.sizes) return it.sizes.find((s) => s.id === size)?.price ?? (size ? null : it.price);
  return it.price;
}

/** Plats qu'on peut commander en ligne (les plats « à confirmer » sans prix restent au téléphone). */
export const orderable = (id: ItemId) => !ITEMS[id].tags.includes("toConfirm");

export const checked = carte.checked;
