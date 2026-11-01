import type { ReactNode } from "react";
import Image from "next/image";

// Banner fotográfico estándar para todas las páginas internas:
// misma dirección de arte que el slide de portada (foto propia a
// todo ancho, velos degradados, chip de sección y titular blanco).

export default function PageBanner({
  image,
  eyebrow,
  title,
  subtitle,
  size = "lg",
  children,
}: {
  image: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  size?: "lg" | "sm";
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/85 via-ink-950/50 to-ink-950/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-ink-950/70 to-transparent" />
      <div
        className={`container-x relative ${size === "lg" ? "py-16 lg:py-20" : "py-10 lg:py-12"}`}
      >
        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-bold tracking-[0.14em] text-white uppercase backdrop-blur-sm">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
          <span className="truncate">{eyebrow}</span>
        </span>
        <h1
          className={`mt-4 font-black tracking-tight text-white ${
            size === "lg"
              ? "max-w-3xl text-4xl leading-[1.05] sm:text-5xl"
              : "text-3xl sm:text-4xl"
          }`}
        >
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
