const categories = [
  "Home & Kitchen",
  "Tech, Accessories & Smart Home",
  "Beauty & Personal Care",
  "Pet Supplies",
  "Sports, Fitness & Outdoors",
  "Tools & Home Improvement",
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-16">
      <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
        by E-Commerce T&amp;F
      </p>
      <h1 className="mt-2 text-5xl font-bold tracking-tight">T&amp;F Picks</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
        Hand-picked Amazon finds, honest guides and comparisons. Our platform is
        under construction — these are the categories we are launching with:
      </p>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {categories.map((category) => (
          <li
            key={category}
            className="rounded-xl border border-zinc-200 px-4 py-3 font-medium dark:border-zinc-800"
          >
            {category}
          </li>
        ))}
      </ul>
    </main>
  );
}
