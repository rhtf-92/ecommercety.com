import Link from "next/link";
import Image from "next/image";
import type { ProductWithLinks } from "@/modules/catalog/data";
import TrackedAffiliateButton from "@/components/TrackedAffiliateButton";

export function webAffiliateUrl(product: ProductWithLinks): string {
  const webLink = product.links.find((link) => link.channel === "WEB");
  return webLink?.url ?? product.amazonUrl;
}

export default function ProductCard({ product }: { product: ProductWithLinks }) {
  return (
    <article className="flex flex-col rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={400}
          height={300}
          className="h-48 w-full rounded-lg object-contain"
          unoptimized
        />
      ) : null}
      {product.brand ? (
        <p className="mt-3 text-xs font-medium tracking-wide text-zinc-500 uppercase">
          {product.brand}
        </p>
      ) : null}
      <h3 className="mt-1 font-semibold">
        <Link href={`/product/${product.asin}`} className="hover:underline">
          {product.title}
        </Link>
      </h3>
      {product.shortDescription ? (
        <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-300">
          {product.shortDescription}
        </p>
      ) : null}
      <div className="mt-4 flex-1" />
      <TrackedAffiliateButton
        asin={product.asin}
        href={webAffiliateUrl(product)}
        className="inline-block rounded-lg bg-amber-500 px-4 py-2 text-center text-sm font-semibold text-black transition hover:bg-amber-400"
      >
        Check price on Amazon
      </TrackedAffiliateButton>
    </article>
  );
}
