import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES as PUBLISHED_GUIDES } from "@/modules/guides/content";
import { IconArrowRight } from "@/components/icons";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Amazon Buying Guides & Comparisons",
  description:
    "Honest Amazon buying guides and comparisons from T&F Picks: decide in minutes, not hours.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        image="/pages/guides.jpg"
        eyebrow="Buying guides"
        title="Decide in minutes, not hours"
        subtitle="Side-by-side thinking, honest trade-offs and a clear winner for every budget. Every guide below is published and built from picks you can browse in its category today; new guides join this page as their categories grow."
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

      </section>
    </main>
  );
}
