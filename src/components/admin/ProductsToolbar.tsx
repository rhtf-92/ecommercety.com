"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type ToolbarCategory = { slug: string; nameEn: string; count: number };

type Props = {
  q: string;
  categoria: string;
  orden: string;
  estado: string;
  categories: ToolbarCategory[];
};

const ORDERS = [
  { value: "recientes", label: "Más recientes" },
  { value: "titulo", label: "Título A–Z" },
  { value: "clics", label: "Más clics" },
];

/**
 * Barra de herramientas del listado de productos: búsqueda y filtros que
 * viven en la URL (searchParams), para que la vista sea compartible y
 * sobreviva a las acciones de cada fila. Cambiar un filtro reinicia la
 * paginación (no incluye `pagina`).
 */
export default function ProductsToolbar({
  q,
  categoria,
  orden,
  estado,
  categories,
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(q);

  // Si la URL cambia desde fuera (chips de estado, historial), el input
  // sigue: ajuste de estado durante el render al cambiar la prop (patrón
  // recomendado por React en lugar de un efecto).
  const [prevQ, setPrevQ] = useState(q);
  if (q !== prevQ) {
    setPrevQ(q);
    setQuery(q);
  }

  const href = useCallback(
    (patch: Partial<{ q: string; categoria: string; orden: string }>) => {
      const values = { q, categoria, orden, ...patch };
      const params = new URLSearchParams();
      if (estado) params.set("estado", estado);
      if (values.q) params.set("q", values.q);
      if (values.categoria) params.set("categoria", values.categoria);
      if (values.orden && values.orden !== "recientes") {
        params.set("orden", values.orden);
      }
      const qs = params.toString();
      return qs ? `/admin/productos?${qs}` : "/admin/productos";
    },
    [q, categoria, orden, estado],
  );

  // Búsqueda con debounce: escribe tranquilo, filtramos a los 400 ms.
  useEffect(() => {
    if (query === q) return;
    const t = setTimeout(() => {
      router.replace(href({ q: query }), { scroll: false });
    }, 400);
    return () => clearTimeout(t);
  }, [query, q, href, router]);

  const selectCls =
    "w-full appearance-none rounded-full bg-white py-2.5 pr-9 pl-4 text-sm font-medium text-zinc-700 ring-1 ring-zinc-300 outline-none transition focus:ring-2 focus:ring-brand-600 sm:w-auto";

  return (
    <form
      role="search"
      className="flex flex-col gap-3 lg:flex-row lg:items-center"
      onSubmit={(e) => {
        e.preventDefault();
        router.replace(href({ q: query }), { scroll: false });
      }}
    >
      <div className="relative flex-1">
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-400"
        >
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="m13.5 13.5 3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <label htmlFor="productos-buscar" className="sr-only">
          Buscar productos por título, ASIN o marca
        </label>
        <input
          id="productos-buscar"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título, ASIN o marca…"
          autoComplete="off"
          className="w-full rounded-full bg-white py-2.5 pr-10 pl-11 text-sm ring-1 ring-zinc-300 outline-none transition placeholder:text-zinc-400 focus:ring-2 focus:ring-brand-600"
        />
        {query ? (
          <button
            type="button"
            aria-label="Limpiar búsqueda"
            onClick={() => {
              setQuery("");
              router.replace(href({ q: "" }), { scroll: false });
            }}
            className="absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
          >
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden>
              <path
                d="m5 5 10 10M15 5 5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <label htmlFor="productos-categoria" className="sr-only">
            Filtrar por categoría
          </label>
          <select
            id="productos-categoria"
            value={categoria}
            onChange={(e) =>
              router.replace(href({ categoria: e.target.value }), { scroll: false })
            }
            className={selectCls}
          >
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.nameEn} ({c.count})
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400"
            fill="none"
          >
            <path
              d="m5 7.5 5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="relative">
          <label htmlFor="productos-orden" className="sr-only">
            Ordenar productos
          </label>
          <select
            id="productos-orden"
            value={orden}
            onChange={(e) =>
              router.replace(href({ orden: e.target.value }), { scroll: false })
            }
            className={selectCls}
          >
            {ORDERS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400"
            fill="none"
          >
            <path
              d="m5 7.5 5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </form>
  );
}
