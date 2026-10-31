import { Suspense } from "react";
import Link from "next/link";
import { getCategories } from "@/modules/catalog/data";

async function CategoryGrid() {
  const categories = await getCategories();
  return (
    <ul className="mt-10 grid gap-3 sm:grid-cols-2">
      {categories.map((category) => (
        <li key={category.slug}>
          <Link
            href={`/category/${category.slug}`}
            className="block rounded-xl border border-zinc-200 px-4 py-3 font-medium transition hover:border-amber-500 hover:text-amber-600 dark:border-zinc-800"
          >
            {category.nameEn}
            {category.descriptionEn ? (
              <span className="mt-1 block text-sm font-normal text-zinc-500">
                {category.descriptionEn}
              </span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-16">
      <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
        by E-Commerce T&amp;F
      </p>
      <h1 className="mt-2 text-5xl font-bold tracking-tight">T&amp;F Picks</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
        Hand-picked Amazon finds, honest guides and comparisons. Browse our
        launch categories:
      </p>

      <Suspense
        fallback={
          <p className="mt-10 text-zinc-500">Loading categories…</p>
        }
      >
        <CategoryGrid />
      </Suspense>
    </main>
  );
}
