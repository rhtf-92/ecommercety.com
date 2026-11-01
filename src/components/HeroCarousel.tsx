"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";
import { IconArrowRight, IconTrending } from "@/components/icons";

// Slide de marketing de portada: visuales diseñados por categoría
// (degradados + icono + copy propio). Sin fotos de terceros: cuando
// existan imágenes licenciadas, el diseño admite fondo fotográfico.

export type HeroSlide = {
  id: string;
  slug?: string; // slug de categoría (para el icono); sin slug = marca
  eyebrow: string;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  band: string; // clases del fondo
  dark?: boolean;
};

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) => setIndex(((next % slides.length) + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (paused || slides.length < 2) return;
    timer.current = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, slides.length]);

  const slide = slides[index];

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-700 ${slide.band}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured categories"
    >
      <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
        <div key={slide.id} className="animate-[fadeSlide_.6s_ease]">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${
              slide.dark
                ? "border border-white/15 bg-white/5 text-amber-300"
                : "bg-white/70 text-brand-700 ring-1 ring-black/5"
            }`}
          >
            <IconTrending className="h-3.5 w-3.5" />
            {slide.eyebrow}
          </span>
          <h1
            className={`mt-5 text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl ${
              slide.dark ? "text-white" : "text-ink-900"
            }`}
          >
            {slide.title}
          </h1>
          <p
            className={`mt-5 max-w-lg text-lg leading-relaxed ${
              slide.dark ? "text-zinc-300" : "text-zinc-600"
            }`}
          >
            {slide.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 rounded-full bg-cta-500 px-6 py-3 text-sm font-bold text-ink-900 shadow-lg shadow-cta-500/25 transition hover:bg-cta-400"
            >
              {slide.cta}
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides"
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                slide.dark
                  ? "border border-white/20 text-white hover:bg-white/10"
                  : "border border-zinc-300 text-zinc-700 hover:bg-white"
              }`}
            >
              Read buying guides
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-2">
            {slides.map((item, i) => (
              <button
                key={item.id}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}: ${item.eyebrow}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === index
                    ? `w-8 ${slide.dark ? "bg-amber-400" : "bg-brand-600"}`
                    : `w-2 ${slide.dark ? "bg-white/30 hover:bg-white/50" : "bg-zinc-300 hover:bg-zinc-400"}`
                }`}
              />
            ))}
            <div className="ml-4 flex gap-1.5">
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${
                  slide.dark
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-50"
                }`}
              >
                ‹
              </button>
              <button
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${
                  slide.dark
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-50"
                }`}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <div className="relative hidden items-center justify-center lg:flex" aria-hidden>
          <div
            className={`flex h-72 w-72 items-center justify-center rounded-[3rem] shadow-2xl transition-all duration-700 ${
              slide.dark ? "bg-white/10 ring-1 ring-white/15" : "bg-white shadow-brand-900/5 ring-1 ring-black/5"
            }`}
          >
            {slide.slug ? (
              <CategoryIcon slug={slide.slug} className="h-32 w-32 opacity-90" />
            ) : (
              <span className="text-6xl font-black tracking-tight text-brand-600">
                T&amp;F
              </span>
            )}
          </div>
          <span
            className={`absolute -bottom-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase ${
              slide.dark ? "bg-amber-400 text-ink-900" : "bg-ink-900 text-white"
            }`}
          >
            Verified every 5 hours
          </span>
        </div>
      </div>
      <style>{`@keyframes fadeSlide { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }`}</style>
    </section>
  );
}
