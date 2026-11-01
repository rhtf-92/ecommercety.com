import { Suspense } from "react";
import Link from "next/link";
import { getCategories, getFeaturedProducts } from "@/modules/catalog/data";
import { getShowProductImages } from "@/modules/settings/site";
import { CATEGORY_VISUALS, DEFAULT_VISUAL } from "@/modules/catalog/visuals";
import CategoryIcon from "@/components/CategoryIcon";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import { Faq, HowWePick, SectionHeading, TrustStrip } from "@/components/Sections";
import { IconArrowRight, IconBook } from "@/components/icons";

async function CategoryTiles() {
  const categories = await getCategories();
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const visual = CATEGORY_VISUALS[category.slug] ?? DEFAULT_VISUAL;
        return (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/10"
          >
            <span
              className={`absolute inset-x-0 top-0 h-1.5 ${visual.bar}`}
            />
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${visual.chip}`}
            >
              <CategoryIcon slug={category.slug} />
            </span>
            <h3 className="mt-4 text-lg font-bold text-zinc-900">
              {category.nameEn}
            </h3>
            <p className="mt-1 text-sm font-medium text-brand-600">
              {visual.tagline}
            </p>
            {category.descriptionEn ? (
              <p className="mt-2 line-clamp-2 text-sm text-zinc-600">
                {category.descriptionEn}
              </p>
            ) : null}
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
              Explore picks
              <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

async function FeaturedPicks() {
  const [products, showImages] = await Promise.all([
    getFeaturedProducts(6),
    getShowProductImages(),
  ]);
  if (products.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center">
        <p className="font-semibold text-zinc-800">
          The first picks are being curated right now
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
          Our launch catalog is on its way. Meanwhile, browse the categories
          above and check back very soon.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showImages={showImages} />
      ))}
    </div>
  );
}

const GUIDE_TEASERS = [
  {
    title: "Small kitchen, big upgrades: the 10 essentials that earn their space",
    category: "Home & Kitchen",
    slug: "home-kitchen",
  },
  {
    title: "Smart home starter kit: what to buy first (and what to skip)",
    category: "Tech & Smart Home",
    slug: "tech-smart-home",
  },
  {
    title: "The honest pet-owner checklist: food, toys and care that last",
    category: "Pet Supplies",
    slug: "pet-supplies",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />

      <section className="container-x py-14">
        <TrustStrip />
      </section>

      <section id="categories" className="container-x pb-20">
        <SectionHeading
          eyebrow="Start here"
          title="Shop by category"
          sub="Six focused categories, each one curated by hand and kept verified. No endless aisles, no filler products."
        />
        <Suspense fallback={<p className="mt-10 text-zinc-500">Loading…</p>}>
          <CategoryTiles />
        </Suspense>
      </section>

      <section className="bg-zinc-50 py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Fresh on the shelf"
            title="Featured picks"
            sub="The newest additions to the catalog, straight from our latest research and trend cycle."
          />
          <Suspense fallback={<p className="mt-10 text-zinc-500">Loading…</p>}>
            <FeaturedPicks />
          </Suspense>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHeading
          eyebrow="Our method"
          title="How T&F Picks works"
          sub="A simple promise: research like a friend who reads the fine print, and keep every pick honest and up to date."
        />
        <div className="mt-10">
          <HowWePick />
        </div>
      </section>

      <section className="bg-ink-900 py-20 text-white">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-amber-300 uppercase">
                <IconBook className="mr-2 inline h-4 w-4" />
                Buying guides
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                Decide in minutes, not hours
              </h2>
              <p className="mt-3 max-w-xl text-zinc-400">
                Side-by-side comparisons and checklists from our editors. In
                production now, publishing soon.
              </p>
            </div>
            <Link
              href="/guides"
              className="hidden shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-zinc-900 transition hover:bg-zinc-200 sm:inline-flex"
            >
              All guides
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {GUIDE_TEASERS.map((guide) => (
              <Link
                key={guide.title}
                href={`/category/${guide.slug}`}
                className="group rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10"
              >
                <p className="text-xs font-bold tracking-wide text-amber-300 uppercase">
                  {guide.category}
                </p>
                <h3 className="mt-3 leading-snug font-bold">{guide.title}</h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  Explore the category
                  <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHeading
          eyebrow="Good to know"
          title="Questions, answered straight"
        />
        <div className="mt-10 max-w-3xl">
          <Faq />
        </div>
      </section>
    </main>
  );
}
