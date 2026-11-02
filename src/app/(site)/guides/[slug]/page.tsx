import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getGuideBySlug, GUIDES } from "@/modules/guides/content";
import { getProductByAsin } from "@/modules/catalog/data";
import ProductCard from "@/components/ProductCard";
import SubscribeForm from "@/components/SubscribeForm";
import { getShowProductImages } from "@/modules/settings/site";
import { IconArrowRight } from "@/components/icons";
import PageBanner from "@/components/PageBanner";
import JsonLd from "@/components/JsonLd";
import { articleLd, breadcrumbLd } from "@/modules/seo/jsonld";
import { CATEGORY_VISUALS, DEFAULT_VISUAL } from "@/modules/catalog/visuals";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: `${guide.title} | T&F Picks`,
      description: guide.description,
      url: `/guides/${guide.slug}`,
      type: "article",
    },
  };
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
      <JsonLd
        data={articleLd({
          slug: guide.slug,
          title: guide.title,
          description: guide.description,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ])}
      />
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

        {guide.slug === "holiday-gift-guide-2026" ? (
          <div className="mt-14 max-w-3xl rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100 sm:p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">
              Get the Holiday Gift List
            </h2>
            <p className="mt-2 leading-relaxed text-zinc-600">
              One thoughtful email a week with our newest gift finds and
              seasonal guides, all season long.
            </p>
            <div className="mt-5">
              <SubscribeForm source="guide-holiday" />
            </div>
          </div>
        ) : null}

        <h2 className="mt-14 text-2xl font-extrabold tracking-tight text-zinc-900">
          Keep reading
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.filter((other) => other.slug !== guide.slug).map((other) => (
            <Link
              key={other.slug}
              href={`/guides/${other.slug}`}
              className="group rounded-3xl border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/10"
            >
              <p className="text-xs font-bold tracking-wide text-brand-700 uppercase">
                {other.categoryLabel} · {other.readingMinutes} min read
              </p>
              <h3 className="mt-2 leading-snug font-bold text-zinc-900">
                {other.title}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                Read the guide
                <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

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
