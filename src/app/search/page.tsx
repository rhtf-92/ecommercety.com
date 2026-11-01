import { Suspense } from "react";
import type { Metadata } from "next";
import { searchProducts } from "@/modules/catalog/data";
import { getShowProductImages } from "@/modules/settings/site";
import ProductCard from "@/components/ProductCard";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Search picks",
  description: "Search the T&F Picks catalog of hand-picked Amazon products.",
};

type Props = { searchParams: Promise<{ q?: string }> };

async function Results({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const [products, showImages] = await Promise.all([
    query ? searchProducts(query) : Promise.resolve([]),
    getShowProductImages(),
  ]);

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
          <ProductCard key={product.id} product={product} showImages={showImages} />
        ))}
      </div>
    </>
  );
}

export default function SearchPage({ searchParams }: Props) {
  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        image="/slides/brand.jpg"
        eyebrow="Catalog search"
        title="Search picks"
        size="sm"
      />
      <div className="container-x py-10">
        <form action="/search" className="max-w-xl">
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
      </div>
    </main>
  );
}
