import Link from "next/link";
import { FALLBACK_CATEGORIES } from "@/modules/catalog/data";
import { IconSearch } from "@/components/icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-amber-400 text-sm font-black text-white shadow-sm">
            T&amp;F
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight">
              T&amp;F Picks
            </span>
            <span className="block text-[11px] font-medium text-zinc-500">
              by E-Commerce T&amp;F
            </span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {FALLBACK_CATEGORIES.slice(0, 4).map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
            >
              {category.nameEn}
            </Link>
          ))}
          <Link
            href="/guides"
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
          >
            Guides
          </Link>
        </nav>

        <form action="/search" className="ml-auto hidden max-w-xs flex-1 sm:block">
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
      </div>

      <nav className="container-x flex gap-1 overflow-x-auto pb-2 lg:hidden">
        {FALLBACK_CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium whitespace-nowrap text-zinc-700"
          >
            {category.nameEn}
          </Link>
        ))}
        <Link
          href="/guides"
          className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold whitespace-nowrap text-brand-700"
        >
          Guides
        </Link>
      </nav>
    </header>
  );
}
