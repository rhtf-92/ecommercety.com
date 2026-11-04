import { Suspense } from "react";
import type { Metadata } from "next";
import { searchProducts } from "@/modules/catalog/data";
import { normalizeSearchTerm } from "@/modules/search/log";
import { getShowProductImages } from "@/modules/settings/site";
import { getDb } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import PageBanner from "@/components/PageBanner";
import SearchPageForm from "@/components/SearchPageForm";

export const metadata: Metadata = {
  title: "Search picks",
  description: "Search the T&F Picks catalog of hand-picked Amazon products.",
  // Las páginas de resultados de búsqueda no se indexan (práctica
  // estándar: contenido delgado y duplicado); el buscador interno se
  // descubre vía el SearchAction del WebSite.
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ q?: string }> };

// Respaldo visual mientras llega la consulta: el mismo formulario en
// su forma clásica (action="/search"), para que la página nunca se
// vea sin buscador.
function FormFallback() {
  return (
    <form action="/search" className="max-w-xl">
      <input
        type="search"
        name="q"
        placeholder="Try “air fryer”, “dog toy”, “LED strip”…"
        aria-label="Search the catalog"
        className="w-full rounded-full border border-zinc-300 px-5 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
    </form>
  );
}

async function FormSection({ searchParams }: Props) {
  const { q } = await searchParams;
  return <SearchPageForm initialQuery={(q ?? "").trim()} />;
}

async function Results({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const [products, showImages] = await Promise.all([
    query ? searchProducts(query) : Promise.resolve([]),
    getShowProductImages(),
  ]);

  // Registro de la búsqueda (Fase 3, 2a parte): solo la página
  // /search, nunca el desplegable en vivo del header. El registro
  // jamás rompe la búsqueda: cualquier fallo de base de datos se
  // traga en silencio, igual que el resto de la capa pública
  // degrada sin base de datos. Matiz: el formulario actualiza ?q=
  // con debounce, así que un término intermedio puede quedar
  // registrado; la agregación del reporte lo absorbe (ver
  // modules/search/log).
  if (query) {
    const term = normalizeSearchTerm(query);
    if (term) {
      try {
        const db = await getDb();
        await db.searchLog.create({
          data: { term, resultCount: products.length },
        });
      } catch {
        // El registro es analítica, no parte del resultado.
      }
    }
  }

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
        {/* El campo responde en vivo (SearchPageForm): escribir
            actualiza ?q= en modo suave y los resultados se
            re-renderizan sin recargar la página. La promesa de
            searchParams se resuelve dentro de <Suspense>, como pide
            el prerender de Next. */}
        <Suspense fallback={<FormFallback />}>
          <FormSection searchParams={searchParams} />
        </Suspense>
        <div className="mt-10">
          <Suspense fallback={<p className="text-zinc-500">Searching…</p>}>
            <Results searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
