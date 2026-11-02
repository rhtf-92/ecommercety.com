"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";

// Campo de la página /search con respuesta EN VIVO: al escribir, la
// URL se actualiza en modo suave (router.replace, sin recarga
// completa ni scroll) tras una pausa breve, y el servidor re-renderiza
// solo los resultados. La URL sigue siendo compartible (?q=) y el
// primer render llega del servidor como siempre.
const DEBOUNCE_MS = 300;

export default function SearchPageForm({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const firstRender = useRef(true);

  // La URL manda si cambia desde fuera (historial, enlace del header).
  const [prevInitial, setPrevInitial] = useState(initialQuery);
  if (initialQuery !== prevInitial) {
    setPrevInitial(initialQuery);
    setValue(initialQuery);
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const v = value.trim();
    if (v === initialQuery) return;
    const timer = setTimeout(() => {
      startTransition(() => {
        router.replace(v ? `/search?q=${encodeURIComponent(v)}` : "/search", {
          scroll: false,
        });
      });
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [value, initialQuery, router]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const v = value.trim();
    startTransition(() => {
      router.replace(v ? `/search?q=${encodeURIComponent(v)}` : "/search", {
        scroll: false,
      });
    });
  };

  return (
    <form action="/search" onSubmit={onSubmit} className="max-w-xl" role="search">
      <input
        type="search"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Try “air fryer”, “dog toy”, “LED strip”…"
        aria-label="Search the catalog"
        className="w-full rounded-full border border-zinc-300 px-5 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
      <span className="sr-only" aria-live="polite">
        {isPending ? "Searching…" : ""}
      </span>
    </form>
  );
}
