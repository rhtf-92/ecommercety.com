import Link from "next/link";
import {
  IconArrowRight,
  IconCheck,
  IconRefresh,
  IconShieldCheck,
  IconTrending,
} from "@/components/icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(600px 300px at 15% 0%, rgba(249,115,22,.45), transparent 60%), radial-gradient(700px 350px at 90% 20%, rgba(245,158,11,.25), transparent 60%)",
        }}
      />
      <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-amber-300 uppercase">
            <IconTrending className="h-3.5 w-3.5" />
            Curated for US shoppers
          </span>
          <h1 className="mt-5 text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl lg:text-6xl">
            Great products.
            <span className="block bg-gradient-to-r from-brand-400 to-amber-300 bg-clip-text text-transparent">
              Zero guesswork.
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-zinc-300">
            We research, compare and keep verifying the best Amazon finds, so
            every pick you see here is one we would buy ourselves. See a pick
            you like? Check the live price on Amazon and check out securely.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#categories"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
            >
              Browse categories
              <IconArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Read buying guides
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-300">
            <li className="flex items-center gap-2">
              <IconCheck className="h-4 w-4 text-emerald-400" /> Human-curated
              picks
            </li>
            <li className="flex items-center gap-2">
              <IconRefresh className="h-4 w-4 text-emerald-400" /> Re-checked
              every 5 hours
            </li>
            <li className="flex items-center gap-2">
              <IconShieldCheck className="h-4 w-4 text-emerald-400" /> Secure
              Amazon checkout
            </li>
          </ul>
        </div>

        <div className="relative hidden lg:block" aria-hidden>
          <div className="absolute -top-4 right-10 w-64 rotate-3 rounded-3xl bg-white p-5 text-zinc-900 shadow-2xl">
            <p className="text-xs font-bold tracking-wide text-brand-600 uppercase">
              Pick of the week
            </p>
            <p className="mt-2 font-bold">Home &amp; Kitchen favorites</p>
            <p className="mt-1 text-sm text-zinc-500">
              The upgrades our readers keep coming back to.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <IconCheck className="h-3.5 w-3.5" /> Verified today
            </span>
          </div>
          <div className="mt-40 ml-6 w-72 -rotate-2 rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
            <p className="text-xs font-bold tracking-wide text-amber-300 uppercase">
              How we work
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200">
              Every product is checked against Amazon on a 5-hour cycle. If a
              pick goes out of stock or gets discontinued, it comes down. No
              stale links, no filler.
            </p>
          </div>
          <div className="mt-6 ml-auto w-60 rotate-1 rounded-3xl bg-gradient-to-br from-brand-500 to-amber-400 p-5 shadow-2xl">
            <p className="text-sm font-bold">Trending now</p>
            <p className="mt-1 text-sm text-white/85">
              Fresh finds join the catalog mid-cycle, straight from
              Amazon&apos;s best-seller lists.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
