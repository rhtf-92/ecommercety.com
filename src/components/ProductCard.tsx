import Link from "next/link";
import Image from "next/image";
import type { ProductWithLinks } from "@/modules/catalog/data";
import TrackedAffiliateButton from "@/components/TrackedAffiliateButton";
import PriceBlock, { freshPrice } from "@/components/PriceBlock";
import { IconExternal } from "@/components/icons";

export function webAffiliateUrl(product: ProductWithLinks): string {
  const webLink = product.links.find((link) => link.channel === "WEB");
  return webLink?.url ?? product.amazonUrl;
}

export default function ProductCard({
  product,
  showImages = true,
}: {
  product: ProductWithLinks;
  showImages?: boolean;
}) {
  const price = freshPrice(product.price);
  // Sin imagen (o interruptor apagado): NO se dibuja bloque vacío.
  const renderImage = showImages && Boolean(product.imageUrl);
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10">
      {renderImage ? (
        <Link href={`/product/${product.asin}`} className="block">
          <div className="relative flex h-52 items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 p-6">
            <Image
              src={product.imageUrl!}
              alt={product.title}
              width={400}
              height={300}
              className="max-h-full w-auto object-contain transition duration-300 group-hover:scale-105"
              unoptimized
            />
            <span className="absolute top-3 left-3 rounded-full bg-ink-900 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
              T&amp;F Pick
            </span>
            {price?.dealBadge ? (
              <span className="absolute top-3 right-3 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
                Deal
              </span>
            ) : null}
          </div>
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        {!renderImage ? (
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-ink-900 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
              T&amp;F Pick
            </span>
            {price?.dealBadge ? (
              <span className="rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
                Deal
              </span>
            ) : null}
          </div>
        ) : null}
        {product.brand ? (
          <p className="text-xs font-bold tracking-wide text-zinc-400 uppercase">
            {product.brand}
          </p>
        ) : null}
        <h3 className="mt-1 leading-snug font-bold break-words text-zinc-900">
          <Link href={`/product/${product.asin}`} className="hover:text-brand-700">
            {product.title}
          </Link>
        </h3>
        {product.shortDescription ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600">
            {product.shortDescription}
          </p>
        ) : null}

        <div className="flex-1" />
        {price ? <PriceBlock price={price} size="card" /> : null}
        <TrackedAffiliateButton
          asin={product.asin}
          href={webAffiliateUrl(product)}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-cta-500 px-5 py-2.5 text-sm font-bold text-ink-900 transition hover:bg-cta-400"
        >
          Check price on Amazon
          <IconExternal className="h-4 w-4" />
        </TrackedAffiliateButton>
        <Link
          href={`/product/${product.asin}`}
          className="mt-2.5 text-center text-sm font-medium text-zinc-500 transition hover:text-zinc-800"
        >
          Why we picked it
        </Link>
      </div>
    </article>
  );
}
