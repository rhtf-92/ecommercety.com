import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  FALLBACK_CATEGORIES,
  getCategoryBySlug,
  getPublishedProductsByCategory,
} from "@/modules/catalog/data";
import ProductCard from "@/components/ProductCard";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Metadatos desde el catálogo estático de Fase 1 (sincrónico, sin DB):
  // la versión con base de datos llegará con la capa de caché.
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

  const products = await getPublishedProductsByCategory(category.id);

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight">{category.nameEn}</h1>
      {category.descriptionEn ? (
        <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
          {category.descriptionEn}
        </p>
      ) : null}

      {products.length === 0 ? (
        <p className="mt-12 rounded-xl border border-dashed border-zinc-300 px-6 py-10 text-center text-zinc-500 dark:border-zinc-700">
          We are curating the first picks for this category. Check back soon.
        </p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default function CategoryPage({ params }: Props) {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-16">
      <Suspense fallback={<p className="text-zinc-500">Loading…</p>}>
        <CategoryContent params={params} />
      </Suspense>
    </main>
  );
}
