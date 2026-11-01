import { Suspense } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "./actions";

async function Shell({ children }: { children: React.ReactNode }) {
  const email = await requireAdmin();
  return (
    <div className="flex min-h-dvh">
      {/* Sidebar: exactamente la altura visible (dvh), con la
          navegación en scroll interno y el pie (correo + Cerrar
          sesión) SIEMPRE visible, en cualquier pantalla. */}
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col bg-ink-900 text-white md:flex lg:w-64">
        <div className="shrink-0 p-6 pb-0">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-sm font-black">
              T&amp;F
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-extrabold">T&amp;F Picks</span>
              <span className="block text-xs text-zinc-400">Panel interno</span>
            </span>
          </Link>
        </div>
        <nav className="scrollbar-none mt-8 min-h-0 flex-1 space-y-1 overflow-y-auto px-6 text-sm font-medium">
          <Link
            href="/admin"
            className="block rounded-xl px-3 py-2.5 transition hover:bg-white/10"
          >
            Resumen
          </Link>
          <Link
            href="/admin/productos"
            className="block rounded-xl px-3 py-2.5 transition hover:bg-white/10"
          >
            Productos
          </Link>
          <Link
            href="/admin/productos/nuevo"
            className="block rounded-xl px-3 py-2.5 transition hover:bg-white/10"
          >
            Nuevo producto
          </Link>
          <Link
            href="/"
            className="block rounded-xl px-3 py-2.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
          >
            Ver sitio público ↗
          </Link>
        </nav>
        <div className="shrink-0 border-t border-white/10 p-6 pt-4">
          <p className="truncate text-xs text-zinc-400" title={email}>
            {email}
          </p>
          <form action={logoutAction} className="mt-3">
            <button
              type="submit"
              className="w-full rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="border-b border-zinc-200 bg-white px-4 py-3 md:hidden">
          <div className="flex items-center justify-between gap-3">
            <span className="font-extrabold">T&amp;F Picks · Panel</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-600"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
          <nav className="scrollbar-none mt-3 flex gap-2 overflow-x-auto text-sm font-medium">
            <Link href="/admin" className="rounded-full bg-zinc-100 px-3 py-1.5 whitespace-nowrap">
              Resumen
            </Link>
            <Link href="/admin/productos" className="rounded-full bg-zinc-100 px-3 py-1.5 whitespace-nowrap">
              Productos
            </Link>
            <Link href="/admin/productos/nuevo" className="rounded-full bg-zinc-100 px-3 py-1.5 whitespace-nowrap">
              Nuevo producto
            </Link>
            <Link href="/" className="rounded-full bg-zinc-100 px-3 py-1.5 whitespace-nowrap text-zinc-500">
              Ver sitio ↗
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<p className="p-8 text-zinc-500">Cargando panel…</p>}>
      <Shell>{children}</Shell>
    </Suspense>
  );
}
