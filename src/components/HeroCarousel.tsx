"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IconArrowRight } from "@/components/icons";

// Slide de marketing de portada (v2, rediseño senior): fotografía
// editorial a pantalla completa por categoría, velo degradado para
// legibilidad, contador editorial y barra de progreso segmentada.
// Sin insignias ni paneles flotantes: la imagen ES el diseño.

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  image?: string; // foto referencial propia (public/slides)
  band: string; // color de respaldo bajo la foto
};

const DURATION = 6000;

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) =>
      setIndex(((next % slides.length) + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (paused || slides.length < 2) return;
    timer.current = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, DURATION);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, slides.length, index]);

  const slide = slides[index];

  return (
    <section
      className={`relative isolate overflow-hidden ${slide.band}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured categories"
    >
      {/* Fondos fotográficos con crossfade + Ken Burns sutil */}
      {slides.map((item, i) =>
        item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={item.id}
            src={item.image}
            alt=""
            aria-hidden={i !== index}
            className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-1000 ${
              i === index ? "kenburns opacity-100" : "opacity-0"
            }`}
          />
        ) : null,
      )}
      {/* Velos de legibilidad */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/85 via-ink-950/45 to-ink-950/5" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-ink-950/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-ink-950/40 to-transparent" />

      {/* Contador editorial */}
      <div className="container-x pointer-events-none absolute inset-x-0 top-6 flex justify-end">
        <p className="font-mono text-xs tracking-[0.3em] text-white/70 sm:text-sm">
          {String(index + 1).padStart(2, "0")}
          <span className="mx-1 text-white/35">/</span>
          <span className="text-white/45">{String(slides.length).padStart(2, "0")}</span>
        </p>
      </div>

      <div className="container-x relative flex min-h-[500px] flex-col justify-end pb-24 sm:min-h-[540px] lg:min-h-[600px]">
        <div key={slide.id} className="slide-in max-w-2xl">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-bold tracking-[0.14em] text-white uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            <span className="truncate">{slide.eyebrow}</span>
          </span>
          <h1 className="mt-5 text-4xl leading-[1.02] font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-200 sm:text-lg">
            {slide.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 rounded-full bg-cta-500 px-7 py-3.5 text-sm font-bold text-ink-900 shadow-xl shadow-black/25 transition hover:bg-cta-400"
            >
              {slide.cta}
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Read buying guides
            </Link>
          </div>
        </div>
      </div>

      {/* Controles: progreso segmentado + flechas */}
      <div className="container-x absolute inset-x-0 bottom-7 flex items-end gap-6">
        <div className="flex flex-1 gap-2">
          {slides.map((item, i) => (
            <button
              key={item.id}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}: ${item.eyebrow}`}
              aria-current={i === index}
              className="group relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25">
                {i === index ? (
                  <span
                    key={`${index}-${paused}`}
                    className="progress-fill block h-full rounded-full bg-amber-400"
                    style={{
                      animationDuration: `${DURATION}ms`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                  />
                ) : i < index ? (
                  <span className="block h-full w-full bg-white/60" />
                ) : null}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-lg text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            ‹
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-lg text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            ›
          </button>
        </div>
      </div>

      <style>{`
        .kenburns { animation: kb 7s ease-out forwards; }
        @keyframes kb { from { transform: scale(1.08); } to { transform: scale(1); } }
        .slide-in { animation: slideIn .65s cubic-bezier(.22,.8,.3,1) both; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        .progress-fill { animation-name: fill; animation-timing-function: linear; animation-fill-mode: forwards; width: 0; }
        @keyframes fill { from { width: 0; } to { width: 100%; } }
      `}</style>
    </section>
  );
}
