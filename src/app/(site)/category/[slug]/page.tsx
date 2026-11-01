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
import PageBanner from "@/components/PageBanner";
import { getShowProductImages } from "@/modules/settings/site";
import CategoryIcon from "@/components/CategoryIcon";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, itemListLd } from "@/modules/seo/jsonld";
import { IconArrowRight } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Metadatos desde el catálogo estático (sincrónico, sin DB).
  const category = FALLBACK_CATEGORIES.find((item) => item.slug === slug);
  if (!category) return {};
  const title = `Best Amazon ${category.nameEn} Deals & Trending Picks`;
  const description = `Shop the best Amazon deals and trending products in ${category.nameEn}, hand-picked and re-verified every 5 hours by T&F Picks. ${category.descriptionEn ?? ""}`.trim();
  return {
    title,
    description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title: `${title} | T&F Picks`,
      description,
      url: `/category/${category.slug}`,
      type: "website",
    },
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
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: category.nameEn, path: `/category/${category.slug}` },
        ])}
      />
      <JsonLd
        data={itemListLd(
          products.map((product) => ({
            name: product.title,
            path: `/product/${product.asin}`,
          })),
          `Best Amazon ${category.nameEn} picks`,
        )}
      />
      <PageBanner
        image={visual.image}
        eyebrow={visual.tagline}
        title={category.nameEn}
        subtitle={category.descriptionEn ?? undefined}
      >
        <p className="mt-6 inline-flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur-sm">
            <CategoryIcon slug={category.slug} className="h-5 w-5" />
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase ring-1 ring-white/25 backdrop-blur-sm">
            {products.length > 0
              ? `${products.length} curated picks`
              : "Curating the first picks"}
          </span>
        </p>
      </PageBanner>

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
