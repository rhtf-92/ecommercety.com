"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  deleteProductAction,
  toggleProductStatusAction,
} from "@/app/admin/(panel)/productos/actions";

type Props = {
  id: string;
  asin: string;
  title: string;
  status: string;
};

const itemCls =
  "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition";

/**
 * Acciones de una fila del listado: Editar y Publicar/Despublicar siempre
 * visibles en una sola línea; el resto (Degradar, Pasar a borrador y
 * Eliminar) vive en un menú de desbordamiento con portal y posición fija
 * —así no lo recorta el scroll de la tabla— y Eliminar exige confirmación
 * en un diálogo modal. Reutiliza las server actions existentes del panel.
 */
export default function ProductRowActions({ id, asin, title, status }: Props) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setPos({
        top: rect.bottom + 6,
        right: Math.max(8, window.innerWidth - rect.right),
      });
    }
    setOpen(true);
  };

  // Cierre del menú: clic fuera, Escape (con retorno de foco), scroll o resize.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !menuRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onScrollOrResize = () => setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open ]);

  // Escape cierra el diálogo de confirmación.
  useEffect(() => {
    if (!confirm) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setConfirm(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [confirm]);

  return (
    <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
      <Link
        href={`/admin/productos/${id}`}
        className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
      >
        Editar
      </Link>

      {status !== "PUBLISHED" ? (
        <form action={toggleProductStatusAction}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="next" value="PUBLISHED" />
          <button
            type="submit"
            className="rounded-full bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-800"
          >
            Publicar
          </button>
        </form>
      ) : (
        <form action={toggleProductStatusAction}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="next" value="UNPUBLISHED" />
          <button
            type="submit"
            className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-zinc-900"
          >
            Despublicar
          </button>
        </form>
      )}

      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Más acciones para ${title}`}
        onClick={() => (open ? setOpen(false) : openMenu())}
        className="rounded-full p-1.5 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:outline-none"
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
          <circle cx="10" cy="4" r="1.7" />
          <circle cx="10" cy="10" r="1.7" />
          <circle cx="10" cy="16" r="1.7" />
        </svg>
      </button>

      {open
        ? createPortal(
            <div
              ref={menuRef}
              role="menu"
              aria-label={`Más acciones para ${title}`}
              style={{ top: pos.top, right: pos.right }}
              className="fixed z-50 w-56 rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-zinc-200"
            >
              {status === "PUBLISHED" ? (
                <form
                  action={toggleProductStatusAction}
                  onSubmit={() => setOpen(false)}
                >
                  <input type="hidden" name="id" value={id} />
                  <input type="hidden" name="next" value="DEMOTED" />
                  <button
                    type="submit"
                    role="menuitem"
                    className={`${itemCls} text-amber-700 hover:bg-amber-50`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Degradar
                  </button>
                </form>
              ) : null}
              {status === "DEMOTED" || status === "UNPUBLISHED" ? (
                <form
                  action={toggleProductStatusAction}
                  onSubmit={() => setOpen(false)}
                >
                  <input type="hidden" name="id" value={id} />
                  <input type="hidden" name="next" value="DRAFT" />
                  <button
                    type="submit"
                    role="menuitem"
                    className={`${itemCls} text-zinc-700 hover:bg-zinc-100`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    Pasar a borrador
                  </button>
                </form>
              ) : null}
              <div className="my-1 border-t border-zinc-100" />
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  setConfirm(true);
                }}
                className={`${itemCls} text-red-600 hover:bg-red-50`}
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M4 5.5h12M9 5V3.8A.8.8 0 0 1 9.8 3h.4a.8.8 0 0 1 .8.8V5m3 0-.7 10.2a1.5 1.5 0 0 1-1.5 1.3H8.3a1.5 1.5 0 0 1-1.5-1.3L6 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Eliminar producto…
              </button>
            </div>,
            document.body,
          )
        : null}

      {confirm
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setConfirm(false);
              }}
            >
              <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="eliminar-titulo"
                aria-describedby="eliminar-desc"
                className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
              >
                <h2 id="eliminar-titulo" className="text-lg font-bold text-zinc-900">
                  Eliminar producto
                </h2>
                <p id="eliminar-desc" className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Vas a eliminar <strong>«{title}»</strong> (ASIN{" "}
                  <span className="font-mono text-xs">{asin}</span>) de forma
                  permanente: perderá su ficha pública y su historial de
                  clics. La acción quedará registrada en la auditoría.
                </p>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    autoFocus
                    onClick={() => setConfirm(false)}
                    className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400"
                  >
                    Cancelar
                  </button>
                  <form action={deleteProductAction}>
                    <input type="hidden" name="id" value={id} />
                    <button
                      type="submit"
                      className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </form>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
