"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
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

// Pausa breve antes de filtrar: escribir se siente instantáneo y la
// tabla (servidor, vía searchParams) se actualiza sin recarga.
const DEBOUNCE_MS = 250;

type AdminHit = {
  id: string;
  asin: string;
  title: string;
  brand: string | null;
  status: string;
  categoryName: string;
};

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Borrador",
  PUBLISHED: "Publicado",
  DEMOTED: "Degradado",
  UNPUBLISHED: "Despublicado",
};

const STATUS_CLS: Record<string, string> = {
  DRAFT: "bg-zinc-100 text-zinc-600",
  PUBLISHED: "bg-emerald-100 text-emerald-700",
  DEMOTED: "bg-amber-100 text-amber-700",
  UNPUBLISHED: "bg-red-100 text-red-700",
};

/**
 * Barra de herramientas del listado de productos, ahora EN VIVO en
 * dos capas que comparten la misma coincidencia del servidor:
 *
 * 1. La tabla se filtra mientras se escribe: la búsqueda vive en la
 *    URL (searchParams) y se actualiza con router.replace en modo
 *    suave + transición tras 250 ms — así los conteos facetados de
 *    estado, la paginación de 25 y la columna # siguen saliendo del
 *    servidor, siempre correctos y con la vista compartible.
 * 2. Un desplegable de localización rápida (endpoint autenticado
 *    /api/admin/search) busca en TODOS los estados y salta directo a
 *    la ficha de edición del producto elegido.
 *
 * Cambiar un filtro reinicia la paginación (no incluye `pagina`).
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
  const [isPending, startTransition] = useTransition();

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

  const replace = useCallback(
    (url: string) => {
      startTransition(() => {
        router.replace(url, { scroll: false });
      });
    },
    [router],
  );

  // Capa 1 — filtrado en vivo de la tabla (debounce + transición).
  useEffect(() => {
    if (query === q) return;
    const t = setTimeout(() => replace(href({ q: query })), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query, q, href, replace]);

  // Capa 2 — desplegable de localización rápida (todos los estados).
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AdminHit[]>([]);
  const [suggestTotal, setSuggestTotal] = useState(0);
  const [suggestActive, setSuggestActive] = useState(-1);
  const seqRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const trimmed = query.trim();
  const showSuggest = suggestOpen && trimmed.length > 0;

  useEffect(() => {
    if (!showSuggest) return;
    const seq = ++seqRef.current;
    const timer = setTimeout(() => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setSuggestLoading(true);
      fetch(`/api/admin/search?q=${encodeURIComponent(trimmed)}`, {
        signal: controller.signal,
      })
        .then((res) =>
          res.ok
            ? (res.json() as Promise<{ total: number; results: AdminHit[] }>)
            : null,
        )
        .then((data) => {
          if (seqRef.current !== seq) return;
          setSuggestions(data?.results ?? []);
          setSuggestTotal(data?.total ?? 0);
          setSuggestActive(-1);
        })
        .catch(() => {
          if (seqRef.current !== seq) return;
          setSuggestions([]);
          setSuggestTotal(0);
        })
        .finally(() => {
          if (seqRef.current === seq) setSuggestLoading(false);
        });
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [trimmed, showSuggest]);

  // Cierre del desplegable al hacer clic fuera del buscador.
  useEffect(() => {
    if (!suggestOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        searchBoxRef.current &&
        event.target instanceof Node &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setSuggestOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [suggestOpen]);

  const goToEdit = (id: string) => {
    setSuggestOpen(false);
    router.push(`/admin/productos/${id}`);
  };

  const onSearchKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!showSuggest) {
        setSuggestOpen(true);
        return;
      }
      setSuggestActive((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSuggestActive((i) => Math.max(i - 1, -1));
    } else if (event.key === "Enter") {
      if (showSuggest && suggestActive >= 0 && suggestions[suggestActive]) {
        event.preventDefault();
        goToEdit(suggestions[suggestActive].id);
      }
      // Sin sugerencia activa, el submit filtra la tabla como siempre.
    } else if (event.key === "Escape") {
      if (showSuggest) {
        event.preventDefault();
        setSuggestOpen(false);
        setSuggestActive(-1);
      }
    }
  };

  const selectCls =
    "w-full appearance-none rounded-full bg-white py-2.5 pr-9 pl-4 text-sm font-medium text-zinc-700 ring-1 ring-zinc-300 outline-none transition focus:ring-2 focus:ring-brand-600 sm:w-auto";

  return (
    <form
      role="search"
      className="flex flex-col gap-3 lg:flex-row lg:items-center"
      onSubmit={(e) => {
        e.preventDefault();
        replace(href({ q: query }));
      }}
    >
      <div className="relative flex-1" ref={searchBoxRef}>
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
          onChange={(e) => {
            setQuery(e.target.value);
            setSuggestOpen(true);
          }}
          onFocus={() => setSuggestOpen(true)}
          onKeyDown={onSearchKeyDown}
          placeholder="Buscar por título, ASIN o marca…"
          autoComplete="off"
          role="combobox"
          aria-expanded={showSuggest}
          aria-controls="productos-sugerencias"
          aria-activedescendant={
            showSuggest && suggestActive >= 0
              ? `productos-sugerencias-opt-${suggestActive}`
              : undefined
          }
          aria-autocomplete="list"
          className="w-full rounded-full bg-white py-2.5 pr-10 pl-11 text-sm ring-1 ring-zinc-300 outline-none transition placeholder:text-zinc-400 focus:ring-2 focus:ring-brand-600"
        />
        {isPending ? (
          <span
            aria-hidden
            className={`absolute top-1/2 flex h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-brand-500 ${
              query ? "right-11" : "right-4"
            }`}
          />
        ) : null}
        <span className="sr-only" aria-live="polite">
          {isPending ? "Filtrando…" : ""}
        </span>
        {query ? (
          <button
            type="button"
            aria-label="Limpiar búsqueda"
            onClick={() => {
              setQuery("");
              setSuggestOpen(false);
              replace(href({ q: "" }));
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

        {showSuggest ? (
          <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-zinc-200">
            {suggestLoading && suggestions.length === 0 ? (
              <p className="px-4 py-3 text-sm text-zinc-500">Buscando…</p>
            ) : suggestions.length === 0 && !suggestLoading ? (
              <p className="px-4 py-3 text-sm text-zinc-500">
                Sin coincidencias en ningún estado para “{trimmed}”.
              </p>
            ) : (
              <ul
                role="listbox"
                id="productos-sugerencias"
                aria-label="Coincidencias en el catálogo"
              >
                {suggestions.map((hit, index) => (
                  <li
                    key={hit.id}
                    role="option"
                    id={`productos-sugerencias-opt-${index}`}
                    aria-selected={suggestActive === index}
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setSuggestActive(index)}
                      onClick={() => goToEdit(hit.id)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition ${
                        suggestActive === index ? "bg-brand-50" : "bg-white"
                      }`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-zinc-800">
                          {hit.title}
                        </span>
                        <span className="block truncate text-xs text-zinc-400">
                          <span className="font-mono">{hit.asin}</span>
                          {hit.brand ? ` · ${hit.brand}` : ""} ·{" "}
                          {hit.categoryName}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold whitespace-nowrap ${
                          STATUS_CLS[hit.status] ?? STATUS_CLS.DRAFT
                        }`}
                      >
                        {STATUS_LABEL[hit.status] ?? hit.status}
                      </span>
                    </button>
                  </li>
                ))}
                {suggestTotal > suggestions.length ? (
                  <li className="bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-500">
                    {suggestTotal} coincidencias en total — la tabla de abajo
                    ya está filtrada con esta búsqueda.
                  </li>
                ) : null}
              </ul>
            )}
          </div>
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
            onChange={(e) => replace(href({ categoria: e.target.value }))}
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
            onChange={(e) => replace(href({ orden: e.target.value }))}
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
