"use client";

// Frontera de error raíz (panel y rutas sin grupo). La pública vive
// en (site)/error.tsx con la chrome completa del sitio.

export default function RootError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-24 text-center">
      <p className="text-sm font-bold tracking-[0.2em] text-red-600 uppercase">
        Something went wrong
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">
        A brief hiccup on our side
      </h1>
      <p className="mt-3 max-w-md text-zinc-600">
        The page failed to load. Try again in a moment.
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
