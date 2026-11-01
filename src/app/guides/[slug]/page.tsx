import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getGuideBySlug } from "@/modules/guides/content";
import { getProductByAsin } from "@/modules/catalog/data";
import ProductCard from "@/components/ProductCard";
import { getShowProductImages } from "@/modules/settings/site";
import { IconArrowRight } from "@/components/icons";
import PageBanner from "@/components/PageBanner";
import { CATEGORY_VISUALS, DEFAULT_VISUAL } from "@/modules/catalog/visuals";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description };
}

async function GuideContent({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const [fetched, showImages] = await Promise.all([
    Promise.all(guide.asins.map((asin) => getProductByAsin(asin))),
    getShowProductImages(),
  ]);
  const products = fetched.filter((p) => p && p.status !== "UNPUBLISHED");

  const visual = CATEGORY_VISUALS[guide.categorySlug] ?? DEFAULT_VISUAL;
  return (
    <>
      <PageBanner
        image={visual.image}
        eyebrow={`${guide.categoryLabel} · ${guide.readingMinutes} min read`}
        title={guide.title}
        subtitle={guide.intro}
      />

      <section className="container-x py-12">
        <div className="max-w-3xl space-y-10">
          {guide.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mt-3 leading-relaxed text-zinc-700">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
          <div className="rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100">
            <p className="text-sm font-bold tracking-wide text-brand-700 uppercase">
              The verdict
            </p>
            <p className="mt-2 leading-relaxed font-medium text-zinc-800">
              {guide.verdict}
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <>
            <h2 className="mt-14 text-2xl font-extrabold tracking-tight text-zinc-900">
              The picks in this guide
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product!.id} product={product!} showImages={showImages} />
              ))}
            </div>
          </>
        ) : null}

        <Link
          href={`/category/${guide.categorySlug}`}
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-ink-800"
        >
          Browse all {guide.categoryLabel} picks
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}

export default function GuidePage({ params }: Props) {
  return (
    <main className="flex flex-1 flex-col">
      <Suspense fallback={<p className="container-x py-16 text-zinc-500">Loading…</p>}>
        <GuideContent params={params} />
      </Suspense>
    </main>
  );
}
