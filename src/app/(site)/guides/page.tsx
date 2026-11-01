import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES as PUBLISHED_GUIDES } from "@/modules/guides/content";
import { IconArrowRight } from "@/components/icons";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Buying Guides",
  description:
    "Honest buying guides and comparisons from T&F Picks: decide in minutes, not hours.",
};

const GUIDES = [
  {
    title: "Small kitchen, big upgrades: the essentials that earn their space",
    category: "Home & Kitchen",
    slug: "home-kitchen",
    detail: "Counter-space math, multi-use winners and the gadgets to skip.",
  },
  {
    title: "Smart home starter kit: what to buy first (and what to skip)",
    category: "Tech, Accessories & Smart Home",
    slug: "tech-smart-home",
    detail: "A sane order of purchase, from lighting to security, without the ecosystem trap.",
  },
  {
    title: "Luxury beauty without the markup blindness: a value-first guide",
    category: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    detail: "Where premium actually pays off, and where the drugstore twin wins.",
  },
  {
    title: "The honest pet-owner checklist: food, toys and care that last",
    category: "Pet Supplies",
    slug: "pet-supplies",
    detail: "Durability-tested picks for dogs and cats, from boredom busters to daily care.",
  },
  {
    title: "Home gym on a budget: the minimum kit for maximum consistency",
    category: "Sports, Fitness & Outdoors",
    slug: "sports-outdoors",
    detail: "Small-space, joint-friendly gear that people actually keep using.",
  },
  {
    title: "Weekend DIY starter toolbox: buy once, cry once",
    category: "Tools & Home Improvement",
    slug: "tools-home-improvement",
    detail: "The core tools every home needs, and the order to add the rest.",
  },
];

export default function GuidesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        image="/slides/brand.jpg"
        eyebrow="Buying guides"
        title="Decide in minutes, not hours"
        subtitle="Side-by-side thinking, honest trade-offs and a clear winner for every budget. The first guides are live below; more are in production, and every guide is built from picks you can browse in its category today."
      />

      <section className="container-x py-12">
        <h2 className="text-sm font-bold tracking-wide text-zinc-500 uppercase">
          Published guides
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {PUBLISHED_GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group rounded-3xl border border-brand-200 bg-brand-50/60 p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/10"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold tracking-wide text-brand-700 uppercase">
                  {guide.categoryLabel}
                </p>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700 uppercase">
                  Published
                </span>
              </div>
              <h3 className="mt-3 text-lg leading-snug font-bold text-zinc-900">
                {guide.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {guide.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                Read the guide
                <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 text-sm font-bold tracking-wide text-zinc-500 uppercase">
          In production
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {GUIDES.map((guide) => (
            <Link
              key={guide.title}
              href={`/category/${guide.slug}`}
              className="group rounded-3xl border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/10"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold tracking-wide text-brand-600 uppercase">
                  {guide.category}
                </p>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-700 uppercase">
                  In production
                </span>
              </div>
              <h2 className="mt-3 text-lg leading-snug font-bold text-zinc-900">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {guide.detail}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                See the picks behind it
                <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
