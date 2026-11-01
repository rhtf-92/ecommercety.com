"use client";

import { useActionState, useState } from "react";
import Logo, { LOGO_VARIANTS, type LogoVariantId } from "@/components/Logo";
import {
  setBrandAction,
  type BrandState,
} from "@/app/admin/(panel)/brand-action";

const BANNERS: {
  id: string;
  name: string;
  concept: string;
}[] = [
  { id: "slider", name: "Slide de categorías", concept: "Carrusel automático: marca + una diapositiva de marketing por categoría, con flechas y puntos." },
  { id: "classic", name: "Hero clásico", concept: "El banner fijo original, oscuro, con tarjetas flotantes. Sin movimiento." },
  { id: "showcase", name: "Slide + guías", concept: "El carrusel completo y una diapositiva extra que empuja las guías de compra." },
];

export default function BrandSettings({
  logoVariant,
  bannerVariant,
}: {
  logoVariant: string;
  bannerVariant: string;
}) {
  const [state, action, pending] = useActionState<BrandState, FormData>(
    setBrandAction,
    { logoVariant, bannerVariant },
  );
  // Selección local controlada: la tarjeta se marca AL INSTANTE al
  // hacer clic (antes solo se veía tras guardar, y si el guardado
  // fallaba parecía que el selector no respondía).
  const [logoSel, setLogoSel] = useState(logoVariant);
  const [bannerSel, setBannerSel] = useState(bannerVariant);

  // Tras un guardado exitoso manda el estado confirmado por el
  // servidor (patrón de ajuste durante el render, sin efectos).
  const [savedStamp, setSavedStamp] = useState<number | undefined>(undefined);
  if (state.savedAt && state.savedAt !== savedStamp) {
    setSavedStamp(state.savedAt);
    setLogoSel(state.logoVariant);
    setBannerSel(state.bannerVariant);
  }

  const dirty = logoSel !== state.logoVariant || bannerSel !== state.bannerVariant;

  return (
    <form action={action} className="space-y-6">
      <div>
        <p className="text-sm font-bold text-zinc-800">Logo del sitio</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LOGO_VARIANTS.map((option) => {
            const isSaved = state.logoVariant === option.id;
            const isSelected = logoSel === option.id;
            return (
              <label
                key={option.id}
                className={`cursor-pointer rounded-2xl border-2 bg-white p-4 transition ${
                  isSelected
                    ? "border-brand-600 shadow-md shadow-brand-600/10 ring-2 ring-brand-100"
                    : "border-zinc-200 hover:border-zinc-400"
                }`}
              >
                <input
                  type="radio"
                  name="logoVariant"
                  value={option.id}
                  checked={isSelected}
                  onChange={() => setLogoSel(option.id)}
                  className="sr-only"
                />
                <span className="flex justify-center rounded-xl bg-zinc-50 py-3">
                  <Logo variant={option.id as LogoVariantId} compact />
                </span>
                <span className="mt-3 block text-sm font-bold text-zinc-900">
                  {option.name}
                  {isSaved ? (
                    <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-bold text-brand-700 uppercase">
                      Activo
                    </span>
                  ) : isSelected ? (
                    <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-700 uppercase">
                      Seleccionado
                    </span>
                  ) : null}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-zinc-500">
                  {option.concept}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-bold text-zinc-800">Banner de portada</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {BANNERS.map((option) => {
            const isSaved = state.bannerVariant === option.id;
            const isSelected = bannerSel === option.id;
            return (
              <label
                key={option.id}
                className={`cursor-pointer rounded-2xl border-2 bg-white p-4 transition ${
                  isSelected
                    ? "border-brand-600 shadow-md shadow-brand-600/10 ring-2 ring-brand-100"
                    : "border-zinc-200 hover:border-zinc-400"
                }`}
              >
                <input
                  type="radio"
                  name="bannerVariant"
                  value={option.id}
                  checked={isSelected}
                  onChange={() => setBannerSel(option.id)}
                  className="sr-only"
                />
                <span className="block text-sm font-bold text-zinc-900">
                  {option.name}
                  {isSaved ? (
                    <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-bold text-brand-700 uppercase">
                      Activo
                    </span>
                  ) : isSelected ? (
                    <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-700 uppercase">
                      Seleccionado
                    </span>
                  ) : null}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-zinc-500">
                  {option.concept}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand-700 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800 disabled:opacity-60"
        >
          {pending ? "Aplicando…" : "Guardar marca y banner"}
        </button>
        {dirty && !pending ? (
          <span className="text-xs font-semibold text-amber-600">
            Tienes cambios sin guardar
          </span>
        ) : null}
        {state.savedAt && !pending && !dirty ? (
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700 uppercase">
            Guardado y aplicado al sitio
          </span>
        ) : null}
      </div>
      {state.error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
