// Identidad visual por categoría: gradiente y acento para tarjetas y bandas.
// El icono se resuelve en el componente CategoryIcon según el slug.
export type CategoryVisual = {
  gradient: string; // clases Tailwind para fondos
  chip: string; // clases para el contenedor del icono
  tagline: string; // frase corta de venta, en inglés (sitio público)
};

export const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  "home-kitchen": {
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    chip: "bg-orange-100 text-orange-600",
    tagline: "Cook smarter, live better",
  },
  "tech-smart-home": {
    gradient: "from-blue-600 via-indigo-500 to-violet-500",
    chip: "bg-blue-100 text-blue-600",
    tagline: "Gadgets that earn their keep",
  },
  "beauty-personal-care": {
    gradient: "from-pink-500 via-rose-400 to-fuchsia-400",
    chip: "bg-pink-100 text-pink-600",
    tagline: "Routines that actually work",
  },
  "pet-supplies": {
    gradient: "from-emerald-500 via-teal-500 to-cyan-400",
    chip: "bg-emerald-100 text-emerald-600",
    tagline: "For the furry family members",
  },
  "sports-outdoors": {
    gradient: "from-lime-500 via-green-500 to-emerald-400",
    chip: "bg-lime-100 text-lime-600",
    tagline: "Gear up and get moving",
  },
  "tools-home-improvement": {
    gradient: "from-slate-600 via-zinc-600 to-stone-500",
    chip: "bg-slate-200 text-slate-700",
    tagline: "Fix it right, the first time",
  },
};

export const DEFAULT_VISUAL: CategoryVisual = {
  gradient: "from-brand-500 via-amber-500 to-yellow-400",
  chip: "bg-brand-100 text-brand-600",
  tagline: "Hand-picked for you",
};
