// Identidad visual por categoría, sobria y profesional: cada categoría
// conserva un matiz propio pero en tonos suaves (bandas claras, chips
// pastel y un acento medio), sin degradados estridentes.
export type CategoryVisual = {
  band: string; // fondo suave de la banda de categoría
  bar: string; // acento superior de la tarjeta
  chip: string; // contenedor del icono
  tagline: string; // frase corta de venta, en inglés (sitio público)
};

export const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  "home-kitchen": {
    band: "bg-orange-50",
    bar: "bg-orange-400",
    chip: "bg-orange-100 text-orange-700",
    tagline: "Cook smarter, live better",
  },
  "tech-smart-home": {
    band: "bg-indigo-50",
    bar: "bg-indigo-400",
    chip: "bg-indigo-100 text-indigo-700",
    tagline: "Gadgets that earn their keep",
  },
  "beauty-personal-care": {
    band: "bg-rose-50",
    bar: "bg-rose-400",
    chip: "bg-rose-100 text-rose-700",
    tagline: "Routines that actually work",
  },
  "pet-supplies": {
    band: "bg-emerald-50",
    bar: "bg-emerald-400",
    chip: "bg-emerald-100 text-emerald-700",
    tagline: "For the furry family members",
  },
  "sports-outdoors": {
    band: "bg-lime-50",
    bar: "bg-lime-500",
    chip: "bg-lime-100 text-lime-700",
    tagline: "Gear up and get moving",
  },
  "tools-home-improvement": {
    band: "bg-slate-100",
    bar: "bg-slate-400",
    chip: "bg-slate-200 text-slate-700",
    tagline: "Fix it right, the first time",
  },
};

export const DEFAULT_VISUAL: CategoryVisual = {
  band: "bg-brand-50",
  bar: "bg-brand-500",
  chip: "bg-brand-100 text-brand-700",
  tagline: "Hand-picked for you",
};
