import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductByAsin } from "@/modules/catalog/data";
import { webAffiliateUrl } from "@/components/ProductCard";
import TrackedAffiliateButton from "@/components/TrackedAffiliateButton";

type Props = { params: Promise<{ asin: string }> };

// Sin generateMetadata por ahora: el título usa la plantilla del layout.
// Los metadatos por producto llegarán con la capa de caché de datos.

async function ProductContent({ params }: Props) {
  const { asin } = await params;
  const product = await getProductByAsin(asin);
  if (!product || product.status === "UNPUBLISHED") notFound();

  return (
    <>
      <Link
        href={`/category/${product.category.slug}`}
        className="text-sm font-medium text-amber-600 hover:underline"
      >
        ← {product.category.nameEn}
      </Link>

      {product.brand ? (
        <p className="mt-6 text-sm font-medium tracking-wide text-zinc-500 uppercase">
          {product.brand}
        </p>
      ) : null}
      <h1 className="mt-1 text-4xl font-bold tracking-tight">{product.title}</h1>

      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={640}
          height={480}
          className="mt-8 h-80 w-full rounded-2xl object-contain"
          unoptimized
        />
      ) : null}

      {product.shortDescription ? (
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-200">
          {product.shortDescription}
        </p>
      ) : null}

      <div className="mt-10">
        <TrackedAffiliateButton
          asin={product.asin}
          href={webAffiliateUrl(product)}
          className="inline-block rounded-lg bg-amber-500 px-6 py-3 text-base font-semibold text-black transition hover:bg-amber-400"
        >
          Check price on Amazon
        </TrackedAffiliateButton>
        <p className="mt-3 text-xs text-zinc-500">
          Price and availability are shown on Amazon.com and may change.
        </p>
      </div>
    </>
  );
}

export default function ProductPage({ params }: Props) {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-16">
      <Suspense fallback={<p className="text-zinc-500">Loading…</p>}>
        <ProductContent params={params} />
      </Suspense>
    </main>
  );
}
