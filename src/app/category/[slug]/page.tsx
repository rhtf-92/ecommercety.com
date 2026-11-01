import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FALLBACK_CATEGORIES,
  getCategories,
  getCategoryBySlug,
  getPublishedProductsByCategory,
} from "@/modules/catalog/data";
import { CATEGORY_VISUALS, DEFAULT_VISUAL } from "@/modules/catalog/visuals";
import ProductCard from "@/components/ProductCard";
import { getShowProductImages } from "@/modules/settings/site";
import CategoryIcon from "@/components/CategoryIcon";
import { IconArrowRight } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Metadatos desde el catálogo estático de Fase 1 (sincrónico, sin DB).
  const category = FALLBACK_CATEGORIES.find((item) => item.slug === slug);
  if (!category) return {};
  return {
    title: category.nameEn,
    description:
      category.descriptionEn ??
      `Hand-picked ${category.nameEn} products from T&F Picks.`,
  };
}

async function CategoryContent({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [products, allCategories, showImages] = await Promise.all([
    getPublishedProductsByCategory(category.id),
    getCategories(),
    getShowProductImages(),
  ]);
  const visual = CATEGORY_VISUALS[category.slug] ?? DEFAULT_VISUAL;
  const others = allCategories.filter((item) => item.slug !== category.slug);

  return (
    <>
      <section className={`${visual.band} border-b border-zinc-200/60`}>
        <div className="container-x py-14">
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${visual.chip}`}
          >
            <CategoryIcon slug={category.slug} className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            {category.nameEn}
          </h1>
          <p className="mt-2 text-lg font-medium text-brand-700">
            {visual.tagline}
          </p>
          {category.descriptionEn ? (
            <p className="mt-3 max-w-2xl leading-relaxed text-zinc-600">
              {category.descriptionEn}
            </p>
          ) : null}
          <p className="mt-5 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold tracking-wide text-zinc-700 uppercase ring-1 ring-zinc-200">
            {products.length > 0
              ? `${products.length} verified picks`
              : "Curating the first picks"}
          </p>
        </div>
      </section>

      <section className="container-x py-12">
        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-14 text-center">
            <p className="text-lg font-semibold text-zinc-800">
              The first {category.nameEn} picks are being curated
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
              We check every product against Amazon before it earns a spot
              here. Check back very soon, or explore another category below.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} showImages={showImages} />
            ))}
          </div>
        )}
      </section>

      <section className="container-x pb-16">
        <h2 className="text-sm font-bold tracking-wide text-zinc-500 uppercase">
          Keep exploring
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {others.map((item) => (
            <Link
              key={item.slug}
              href={`/category/${item.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-brand-400 hover:text-brand-700"
            >
              {item.nameEn}
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default function CategoryPage({ params }: Props) {
  return (
    <main className="flex flex-1 flex-col">
      <Suspense fallback={<p className="container-x py-16 text-zinc-500">Loading…</p>}>
        <CategoryContent params={params} />
      </Suspense>
    </main>
  );
}
