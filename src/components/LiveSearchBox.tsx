"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { IconSearch } from "@/components/icons";

// Buscador público EN TIEMPO REAL (directiva de Renato, 2026-11-02):
// al escribir, un desplegable muestra las coincidencias contra los
// productos publicados (endpoint /api/search) sin salir de la página.
// Es el ÚNICO buscador del sitio público: lo usan el header de
// escritorio y el panel móvil con el mismo comportamiento.
//
// Patrón combobox/listbox accesible: el foco nunca sale del input,
// las opciones se recorren con ↑/↓ (aria-activedescendant), Enter
// abre la opción activa — o la página /search si no hay ninguna —,
// Escape cierra y el clic fuera también. Sin JS el formulario sigue
// funcionando como siempre (action="/search").

type LiveHit = {
  asin: string;
  title: string;
  brand: string | null;
  categoryName: string;
  categorySlug: string;
};

type LiveResponse = { query: string; total: number; results: LiveHit[] };

const DEBOUNCE_MS = 180;

type Props = {
  className?: string;
  /** Se invoca al navegar desde el desplegable (cierra el panel móvil). */
  onNavigate?: () => void;
};

export default function LiveSearchBox({ className = "", onNavigate }: Props) {
  const router = useRouter();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const listboxId = `live-search-${uid}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState<LiveHit[]>([]);
  const [active, setActive] = useState(-1);
  const seqRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const trimmed = query.trim();
  const showDropdown = open && trimmed.length > 0;
  // Opciones navegables: los productos + la fila final «ver todos».
  const optionCount = results.length + (total > 0 ? 1 : 0);

  // Petición con debounce y cancelación: cada tecla reinicia el reloj
  // y cualquier respuesta obsoleta se descarta por número de serie.
  // (El vaciado al borrar la consulta se resetea en el onChange.)
  useEffect(() => {
    if (!trimmed) return;
    const seq = ++seqRef.current;
    const timer = setTimeout(() => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
        signal: controller.signal,
      })
        .then((res) => (res.ok ? (res.json() as Promise<LiveResponse>) : null))
        .then((data) => {
          if (seqRef.current !== seq) return;
          setResults(data?.results ?? []);
          setTotal(data?.total ?? 0);
          setActive(-1);
        })
        .catch(() => {
          if (seqRef.current !== seq) return;
          setResults([]);
          setTotal(0);
        })
        .finally(() => {
          if (seqRef.current === seq) setLoading(false);
        });
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [trimmed]);

  // Cierre al hacer clic fuera del buscador.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        rootRef.current &&
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open ]);

  const closeAnd = (navigate: () => void) => {
    setOpen(false);
    onNavigate?.();
    navigate();
  };

  const goToProduct = (asin: string) =>
    closeAnd(() => router.push(`/product/${asin}`));

  const goToSearchAll = () =>
    closeAnd(() =>
      router.push(`/search?q=${encodeURIComponent(trimmed)}`),
    );

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!showDropdown) {
        setOpen(true);
        return;
      }
      setActive((i) => Math.min(i + 1, optionCount - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (event.key === "Enter") {
      if (showDropdown && active >= 0 && active < results.length) {
        event.preventDefault();
        goToProduct(results[active].asin);
      } else if (showDropdown && active === results.length && total > 0) {
        event.preventDefault();
        goToSearchAll();
      }
      // Sin opción activa, el submit del formulario lleva a /search.
    } else if (event.key === "Escape") {
      if (showDropdown) {
        event.preventDefault();
        setOpen(false);
        setActive(-1);
      }
    }
  };

  const optionId = (index: number) => `${listboxId}-opt-${index}`;

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <form
        action="/search"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          if (trimmed) goToSearchAll();
        }}
      >
        <label className="relative block">
          <IconSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            name="q"
            value={query}
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              setOpen(true);
              if (!value.trim()) {
                seqRef.current += 1;
                abortRef.current?.abort();
                setResults([]);
                setTotal(0);
                setLoading(false);
                setActive(-1);
              }
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder="Search picks…"
            autoComplete="off"
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls={listboxId}
            aria-activedescendant={
              showDropdown && active >= 0 ? optionId(active) : undefined
            }
            aria-autocomplete="list"
            className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2 pr-3 pl-9 text-sm outline-none transition placeholder:text-zinc-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
        </label>
      </form>

      {showDropdown ? (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-zinc-900/10">
          {loading && results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-zinc-500" aria-live="polite">
              Searching…
            </p>
          ) : total === 0 && !loading ? (
            <p className="px-4 py-3 text-sm text-zinc-500">
              No picks match “{trimmed}” yet. Try a broader word.
            </p>
          ) : (
            <ul role="listbox" id={listboxId} aria-label="Search suggestions">
              {results.map((hit, index) => (
                <li
                  key={hit.asin}
                  role="option"
                  id={optionId(index)}
                  aria-selected={active === index}
                >
                  <Link
                    href={`/product/${hit.asin}`}
                    tabIndex={-1}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => {
                      setOpen(false);
                      onNavigate?.();
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 transition ${
                      active === index ? "bg-brand-50" : "bg-white"
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-zinc-800">
                        {hit.title}
                      </span>
                      {hit.brand ? (
                        <span className="block truncate text-xs text-zinc-400">
                          {hit.brand}
                        </span>
                      ) : null}
                    </span>
                    <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap text-zinc-500">
                      {hit.categoryName}
                    </span>
                  </Link>
                </li>
              ))}
              <li
                role="option"
                id={optionId(results.length)}
                aria-selected={active === results.length}
              >
                <Link
                  href={`/search?q=${encodeURIComponent(trimmed)}`}
                  tabIndex={-1}
                  onMouseEnter={() => setActive(results.length)}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className={`block px-4 py-2.5 text-sm font-semibold text-brand-700 transition ${
                    active === results.length ? "bg-brand-50" : "bg-zinc-50"
                  }`}
                >
                  See all {total} result{total === 1 ? "" : "s"}
                </Link>
              </li>
            </ul>
          )}
          <span className="sr-only" aria-live="polite">
            {loading
              ? "Searching"
              : total > 0
                ? `${total} results available`
                : ""}
          </span>
        </div>
      ) : null}
    </div>
  );
}
