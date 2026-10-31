import { Suspense } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "./actions";

async function Shell({ children }: { children: React.ReactNode }) {
  const email = await requireAdmin();
  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-ink-900 p-6 text-white md:flex">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-sm font-black">
            T&amp;F
          </span>
          <span className="leading-tight">
            <span className="block font-extrabold">T&amp;F Picks</span>
            <span className="block text-xs text-zinc-400">Panel interno</span>
          </span>
        </Link>
        <nav className="mt-10 space-y-1 text-sm font-medium">
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
        <div className="flex-1" />
        <p className="truncate text-xs text-zinc-400">{email}</p>
        <form action={logoutAction} className="mt-3">
          <button
            type="submit"
            className="w-full rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            Cerrar sesión
          </button>
        </form>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-3 md:hidden">
          <span className="font-extrabold">T&amp;F Picks · Panel</span>
          <nav className="flex gap-4 text-sm font-medium">
            <Link href="/admin/productos">Productos</Link>
            <Link href="/admin/productos/nuevo">Nuevo</Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-6xl px-6 py-8">{children}</main>
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
