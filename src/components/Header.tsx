"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { FALLBACK_CATEGORIES } from "@/modules/catalog/data";
import { CATEGORY_VISUALS, DEFAULT_VISUAL } from "@/modules/catalog/visuals";
import CategoryIcon from "@/components/CategoryIcon";
import {
  IconArrowRight,
  IconChevronDown,
  IconMenu,
  IconSearch,
  IconSparkles,
  IconTrending,
  IconX,
} from "@/components/icons";
// Navegación principal (Sprint de navegación, 2026-11-01): la barra ya no
// intenta comprimir las 14 categorías en enlaces sueltos. En escritorio un
// disparador "Shop by Category" abre un mega-menú con las 14 categorías en
// columnas (con icono, nombre y descripción de la fuente central,
// FALLBACK_CATEGORIES); en móvil un botón hamburguesa abre un panel con la
// lista completa. El panel de escritorio se renderiza siempre (mejor SEO y
// cero layout shift) y se oculta con visibilidad + `inert` cuando está
// cerrado, para que sus enlaces no sean enfocables ni visibles.

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400";

function SearchForm({ className = "" }: { className?: string }) {
  return (
    <form action="/search" className={className}>
      <label className="relative block">
        <IconSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="search"
          name="q"
          placeholder="Search picks…"
          className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2 pr-3 pl-9 text-sm outline-none transition placeholder:text-zinc-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
        />
      </label>
    </form>
  );
}

// El logo llega como prop desde el layout de servidor: SiteLogo es un
// componente async (resuelve la variante del panel con Prisma) y NO debe
// importarse dentro de este componente cliente; el patrón soportado en
// App Router es componerlo en el servidor y pasarlo como hijo.
export default function Header({ logo }: { logo: ReactNode }) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const megaButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  const closeAll = () => {
    setMegaOpen(false);
    setMobileOpen(false);
  };

  // Cierre al hacer clic fuera del header y con la tecla Escape
  // (devolviendo el foco al botón que abrió el panel).
  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (
        headerRef.current &&
        event.target instanceof Node &&
        !headerRef.current.contains(event.target)
      ) {
        closeAll();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (megaOpen) megaButtonRef.current?.focus();
        else if (mobileOpen) mobileButtonRef.current?.focus();
        closeAll();
      }
    };
    const onPopState = () => closeAll();

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
    };
  }, [megaOpen, mobileOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-zinc-100 bg-white/85 backdrop-blur-md"
    >
      <div className="container-x flex h-16 items-center gap-4">
        <Link href="/" aria-label="T&F Picks — home">
          {logo}
        </Link>

        <nav aria-label="Primary" className="ml-6 hidden items-center gap-1 lg:flex">
          <button
            ref={megaButtonRef}
            type="button"
            aria-haspopup="true"
            aria-expanded={megaOpen}
            aria-controls="site-category-menu"
            onClick={() => {
              setMobileOpen(false);
              setMegaOpen((open) => !open);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition ${FOCUS_RING} ${
              megaOpen
                ? "bg-zinc-100 text-zinc-900"
                : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
          >
            Shop by Category
            <IconChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                megaOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <Link
            href="/guides"
            className={`rounded-full px-3 py-1.5 text-sm font-semibold text-brand-600 transition hover:bg-brand-50 ${FOCUS_RING}`}
          >
            Guides
          </Link>
          {/* Píldoras promocionales animadas (directiva de Renato,
              2026-11-02): degradado de colores que fluye + shimmer,
              definidos en globals.css (.nav-pill-promo). Holiday
              Gifts lleva la paleta festiva y Today's Deals la cálida
              de oferta; ambas enlazan a páginas reales del sitio. */}
          <Link
            href="/guides/holiday-gift-guide-2026"
            className={`nav-pill-promo nav-pill-holiday ml-1 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold whitespace-nowrap ${FOCUS_RING}`}
          >
            <IconSparkles className="h-4 w-4 shrink-0" />
            Holiday Gifts
          </Link>
          <Link
            href="/todays-deals"
            className={`nav-pill-promo nav-pill-deals inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold whitespace-nowrap ${FOCUS_RING}`}
          >
            <IconTrending className="h-4 w-4 shrink-0" />
            Today&apos;s Deals
          </Link>
        </nav>

        <SearchForm className="ml-auto hidden max-w-xs flex-1 sm:block" />

        <button
          ref={mobileButtonRef}
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="site-mobile-menu"
          onClick={() => {
            setMegaOpen(false);
            setMobileOpen((open) => !open);
          }}
          className={`ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900 sm:ml-3 lg:hidden ${FOCUS_RING}`}
        >
          {mobileOpen ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mega-menú de escritorio: panel amplio con las 14 categorías. */}
      <div
        id="site-category-menu"
        aria-hidden={!megaOpen}
        inert={!megaOpen}
        className={`absolute inset-x-0 top-full hidden border-b border-zinc-100 bg-white shadow-xl shadow-zinc-900/5 transition duration-200 lg:block ${
          megaOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="container-x py-6">
          <div className="flex items-baseline justify-between gap-6">
            <p className="text-xs font-bold tracking-[0.18em] text-zinc-400 uppercase">
              Shop by category
            </p>
            <p className="text-xs font-medium text-zinc-400">
              Fourteen focused categories, curated by hand
            </p>
          </div>
          <nav aria-label="Categories">
            <ul className="mt-4 grid grid-cols-3 gap-1.5">
              {FALLBACK_CATEGORIES.map((category) => {
                const visual = CATEGORY_VISUALS[category.slug] ?? DEFAULT_VISUAL;
                return (
                  <li key={category.slug}>
                    <Link
                      href={`/category/${category.slug}`}
                      onClick={closeAll}
                      className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 transition hover:bg-zinc-50 ${FOCUS_RING}`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${visual.chip}`}
                      >
                        <CategoryIcon slug={category.slug} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-zinc-800">
                          {category.nameEn}
                        </span>
                        {category.descriptionEn ? (
                          <span className="block truncate text-xs text-zinc-500">
                            {category.descriptionEn}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-5 flex items-center justify-between gap-6 border-t border-zinc-100 pt-4">
            <p className="text-sm text-zinc-500">
              Not sure where to start? Our editors&apos; guides make it easy.
            </p>
            <Link
              href="/guides"
              onClick={closeAll}
              className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:text-brand-700 ${FOCUS_RING} rounded-full`}
            >
              Read the buying guides
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Panel móvil: buscador, guías y las 14 categorías completas. */}
      <div
        id="site-mobile-menu"
        className={`border-t border-zinc-100 bg-white lg:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        <div className="container-x py-4">
          <SearchForm className="sm:hidden" />
          <Link
            href="/guides"
            onClick={closeAll}
            className={`mt-1 block rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 ${FOCUS_RING}`}
          >
            Buying guides
            <span className="block text-xs font-medium text-brand-600">
              Decide in minutes, not hours
            </span>
          </Link>
          {/* Las mismas píldoras animadas del escritorio, en la zona
              de accesos del panel móvil. */}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Link
              href="/guides/holiday-gift-guide-2026"
              onClick={closeAll}
              className={`nav-pill-promo nav-pill-holiday inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-3 text-sm font-bold ${FOCUS_RING}`}
            >
              <IconSparkles className="h-4 w-4 shrink-0" />
              Holiday Gifts
            </Link>
            <Link
              href="/todays-deals"
              onClick={closeAll}
              className={`nav-pill-promo nav-pill-deals inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-3 text-sm font-bold ${FOCUS_RING}`}
            >
              <IconTrending className="h-4 w-4 shrink-0" />
              Today&apos;s Deals
            </Link>
          </div>
          <p className="mt-5 text-xs font-bold tracking-[0.18em] text-zinc-400 uppercase">
            Categories
          </p>
          <nav aria-label="Categories">
            <ul className="mt-1 max-h-[55vh] divide-y divide-zinc-50 overflow-y-auto">
              {FALLBACK_CATEGORIES.map((category) => {
                const visual = CATEGORY_VISUALS[category.slug] ?? DEFAULT_VISUAL;
                return (
                  <li key={category.slug}>
                    <Link
                      href={`/category/${category.slug}`}
                      onClick={closeAll}
                      className={`flex items-center gap-3 py-2.5 ${FOCUS_RING} rounded-lg`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${visual.chip}`}
                      >
                        <CategoryIcon slug={category.slug} className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-zinc-800">
                        {category.nameEn}
                      </span>
                      <IconArrowRight className="ml-auto h-4 w-4 shrink-0 text-zinc-300" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
