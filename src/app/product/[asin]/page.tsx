import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductByAsin } from "@/modules/catalog/data";
import { webAffiliateUrl } from "@/components/ProductCard";
import TrackedAffiliateButton from "@/components/TrackedAffiliateButton";
import PriceBlock, { freshPrice, UpdatedStamp } from "@/components/PriceBlock";
import {
  IconCheck,
  IconExternal,
  IconLock,
  IconRefresh,
  IconShieldCheck,
} from "@/components/icons";

type Props = { params: Promise<{ asin: string }> };

// Sin generateMetadata por ahora: el título usa la plantilla del layout.
// Los metadatos por producto llegarán con la capa de caché de datos.

const BUY_BOX_POINTS = [
  { icon: <IconShieldCheck className="h-4 w-4" />, text: "Sold and shipped on Amazon.com" },
  { icon: <IconLock className="h-4 w-4" />, text: "Secure checkout with your Amazon account" },
  { icon: <IconRefresh className="h-4 w-4" />, text: "This pick is re-verified on our 5-hour cycle" },
];

async function ProductContent({ params }: Props) {
  const { asin } = await params;
  const product = await getProductByAsin(asin);
  if (!product || product.status === "UNPUBLISHED") notFound();
  const price = freshPrice(product.price);

  return (
    <>
      <nav className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-800">Home</Link>
        <span className="mx-1.5">/</span>
        <Link
          href={`/category/${product.category.slug}`}
          className="hover:text-zinc-800"
        >
          {product.category.nameEn}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-zinc-800">{product.title}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="flex items-center justify-center rounded-3xl bg-gradient-to-b from-zinc-50 to-zinc-100 p-10">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={640}
              height={480}
              className="max-h-96 w-auto object-contain"
              unoptimized
            />
          ) : (
            <p className="text-sm font-medium text-zinc-400">
              Official product photo available on Amazon
            </p>
          )}
        </div>

        <div>
          {product.brand ? (
            <p className="text-sm font-bold tracking-wide text-zinc-400 uppercase">
              {product.brand}
            </p>
          ) : null}
          <h1 className="mt-1 text-3xl leading-tight font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            {product.title}
          </h1>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
            <IconCheck className="h-3.5 w-3.5" />
            T&amp;F Verified Pick
          </span>

          {product.shortDescription ? (
            <div className="mt-6">
              <h2 className="text-sm font-bold tracking-wide text-zinc-500 uppercase">
                Why we picked it
              </h2>
              <p className="mt-2 leading-relaxed text-zinc-700">
                {product.shortDescription}
              </p>
            </div>
          ) : null}

          <div className="mt-8 rounded-3xl border-2 border-brand-100 bg-brand-50 p-6">
            {price ? (
              <div className="mb-5">
                <PriceBlock price={price} size="detail" />
              </div>
            ) : null}
            <TrackedAffiliateButton
              asin={product.asin}
              href={webAffiliateUrl(product)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-cta-500 px-6 py-3.5 text-base font-bold text-ink-900 shadow-lg shadow-cta-500/25 transition hover:bg-cta-400"
            >
              Check price on Amazon
              <IconExternal className="h-5 w-5" />
            </TrackedAffiliateButton>
            {price ? (
              <div className="mt-3 text-center">
                <UpdatedStamp fetchedAt={price.fetchedAt} />
              </div>
            ) : (
              <p className="mt-3 text-center text-xs text-zinc-500">
                Live price, deals and availability are shown on Amazon.com and
                may change at any time.
              </p>
            )}
            <ul className="mt-5 space-y-2.5 border-t border-brand-100 pt-5">
              {BUY_BOX_POINTS.map((point) => (
                <li
                  key={point.text}
                  className="flex items-center gap-2.5 text-sm font-medium text-zinc-700"
                >
                  <span className="text-brand-600">{point.icon}</span>
                  {point.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProductPage({ params }: Props) {
  return (
    <main className="container-x flex-1 py-10">
      <Suspense fallback={<p className="text-zinc-500">Loading…</p>}>
        <ProductContent params={params} />
      </Suspense>
    </main>
  );
}
