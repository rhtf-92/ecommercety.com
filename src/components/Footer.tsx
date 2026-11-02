import Link from "next/link";
import { FALLBACK_CATEGORIES } from "@/modules/catalog/data";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import SiteLogo from "@/components/SiteLogo";
import SubscribeForm from "@/components/SubscribeForm";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-zinc-300">
      <div className="container-x grid gap-10 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <SiteLogo tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
            Hand-picked Amazon products, honest guides and comparisons. We do
            the research and keep every pick verified, so you can buy with
            confidence on Amazon.com.
          </p>
          <div className="mt-6 max-w-sm">
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">
              The Holiday Gift List
            </h3>
            <div className="mt-3">
              <SubscribeForm source="footer" tone="dark" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide text-white uppercase">
            Categories
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {FALLBACK_CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="transition hover:text-white"
                >
                  {category.nameEn}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide text-white uppercase">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/search" className="transition hover:text-white">
                Search picks
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-white">
                Today&apos;s categories
              </Link>
            </li>
            {/* «Buying guides» cierra el grupo (directiva de Renato,
                2026-11-02: «Guides» siempre al final). */}
            <li>
              <Link href="/guides" className="transition hover:text-white">
                Buying guides
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide text-white uppercase">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/about" className="transition hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link href="/disclosure" className="transition hover:text-white">
                Affiliate disclosure
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition hover:text-white">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-zinc-500">
          <AffiliateDisclosure />
          <p>
            © 2026 E-Commerce T&amp;F. Amazon and the Amazon logo are
            trademarks of Amazon.com, Inc. or its affiliates.
          </p>
        </div>
      </div>
    </footer>
  );
}
