import PageBanner from "@/components/PageBanner";

export default function StaticPage({
  eyebrow,
  title,
  intro,
  image = "/slides/brand.jpg",
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        image={image}
        eyebrow={eyebrow}
        title={title}
        subtitle={intro}
        size="sm"
      />
      <div className="container-x py-12">
        <div className="max-w-3xl space-y-6 leading-relaxed text-zinc-700 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-zinc-900 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </main>
  );
}
