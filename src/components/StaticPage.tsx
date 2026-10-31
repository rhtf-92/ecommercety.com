export default function StaticPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="container-x flex-1 py-14">
      <div className="max-w-3xl">
        <p className="text-xs font-bold tracking-[0.18em] text-brand-600 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-zinc-900">
          {title}
        </h1>
        {intro ? (
          <p className="mt-4 text-lg leading-relaxed text-zinc-600">{intro}</p>
        ) : null}
        <div className="mt-8 space-y-6 leading-relaxed text-zinc-700 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-zinc-900 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </main>
  );
}
