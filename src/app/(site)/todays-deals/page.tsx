import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTrendRadarProducts } from "@/modules/catalog/data";
import { getShowProductImages } from "@/modules/settings/site";
import ProductCard from "@/components/ProductCard";
import PageBanner from "@/components/PageBanner";

// Cumplimiento Associates: esta página presenta los hallazgos frescos
// del radar de tendencias de la tienda, SIN precios, SIN porcentajes
// de descuento y SIN ventanas de oferta. La señal de oferta es un
// criterio interno de selección; el precio y la disponibilidad en
// vivo se confirman siempre en Amazon, y así se le dice al lector.
export const metadata: Metadata = {
  title: "Today's Deals",
  description:
    "The freshest finds our trend radar is tracking today at T&F Picks — hand-checked Amazon products, with live price and availability always confirmed on Amazon.",
};

async function DealsGrid() {
  const [products, showImages] = await Promise.all([
    getTrendRadarProducts(24),
    getShowProductImages(),
  ]);

  if (products.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center text-zinc-500">
        The radar is scanning right now. Check back in a bit, or browse the{" "}
        <Link href="/guides" className="font-semibold text-brand-700 underline">
          buying guides
        </Link>{" "}
        in the meantime.
      </p>
    );
  }
  return (
    <>
      <p className="text-sm font-medium text-zinc-500">
        {products.length} fresh find{products.length === 1 ? "" : "s"} from
        our trend radar, newest first
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showImages={showImages}
          />
        ))}
      </div>
    </>
  );
}

export default function TodaysDealsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        image="/slides/brand.jpg"
        eyebrow="Trend radar"
        title="Today's Deals"
        subtitle="The fresh finds our team is tracking today — hand-checked picks our trend radar just surfaced across the store, from kitchen upgrades to gift-ready tech."
        size="sm"
      />
      <div className="container-x py-10">
        <p className="max-w-3xl rounded-2xl bg-brand-50 px-5 py-4 text-sm leading-relaxed text-brand-900 ring-1 ring-brand-100">
          This list refreshes as new finds land throughout the day. Prices
          and availability move fast, so the live price and stock are
          always confirmed on Amazon — tap any pick to check before you
          buy.
        </p>
        <div className="mt-10">
          <Suspense fallback={<p className="text-zinc-500">Loading finds…</p>}>
            <DealsGrid />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
