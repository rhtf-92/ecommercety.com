import { Suspense } from "react";
import type { Metadata } from "next";
import { searchProducts } from "@/modules/catalog/data";
import ProductCard from "@/components/ProductCard";
import { IconSearch } from "@/components/icons";

export const metadata: Metadata = {
  title: "Search picks",
  description: "Search the T&F Picks catalog of hand-picked Amazon products.",
};

type Props = { searchParams: Promise<{ q?: string }> };

async function Results({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const products = query ? await searchProducts(query) : [];

  if (!query) {
    return (
      <p className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center text-zinc-500">
        Type a product, brand or keyword above to search the catalog.
      </p>
    );
  }
  if (products.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center text-zinc-500">
        No picks match “{query}” yet. Try a broader word, or browse the
        categories from the home page.
      </p>
    );
  }
  return (
    <>
      <p className="text-sm font-medium text-zinc-500">
        {products.length} pick{products.length === 1 ? "" : "s"} for “{query}”
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default function SearchPage({ searchParams }: Props) {
  return (
    <main className="container-x flex-1 py-12">
      <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-zinc-900">
        <IconSearch className="h-7 w-7 text-brand-600" />
        Search picks
      </h1>
      <form action="/search" className="mt-6 max-w-xl">
        <input
          type="search"
          name="q"
          placeholder="Try “air fryer”, “dog toy”, “LED strip”…"
          className="w-full rounded-full border border-zinc-300 px-5 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </form>
      <div className="mt-10">
        <Suspense fallback={<p className="text-zinc-500">Searching…</p>}>
          <Results searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
