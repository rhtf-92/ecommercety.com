"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container-x flex flex-1 flex-col items-center py-24 text-center">
      <p className="text-sm font-bold tracking-[0.2em] text-red-600 uppercase">
        Something went wrong
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">
        A brief hiccup on our side
      </h1>
      <p className="mt-3 max-w-md text-zinc-600">
        The page failed to load. Try again, and if it keeps happening, the
        pick will be back after our next verification cycle.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-brand-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-800"
      >
        Try again
      </button>
    </main>
  );
}
