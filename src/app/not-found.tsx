import Link from "next/link";
import Logo from "@/components/Logo";

// 404 raíz: las URL completamente desconocidas no entran al grupo
// (site), así que esta página trae su propia mini-chrome de marca.
// Los notFound() dentro de páginas públicas usan (site)/not-found.

export default function RootNotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-zinc-100 bg-white/85">
        <div className="container-x flex h-16 items-center">
          <Link href="/" aria-label="T&F Picks — home">
            <Logo variant="badge" />
          </Link>
        </div>
      </header>
      <main className="container-x flex flex-1 flex-col items-center py-24 text-center">
        <p className="text-sm font-bold tracking-[0.2em] text-brand-600 uppercase">
          404
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">
          This pick wandered off
        </h1>
        <p className="mt-3 max-w-md text-zinc-600">
          The page you are looking for is not here. It may have been
          removed during one of our verification cycles, because we only
          keep live, verified picks.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-brand-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-800"
          >
            Back to home
          </Link>
          <Link
            href="/search"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400"
          >
            Search picks
          </Link>
        </div>
      </main>
      <footer className="border-t border-zinc-100 py-6 text-center text-xs text-zinc-400">
        T&amp;F Picks · by E-Commerce T&amp;F
      </footer>
    </div>
  );
}
