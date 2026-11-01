"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { ProductFormState } from "@/app/admin/(panel)/productos/actions";

type CategoryOption = { id: string; nameEn: string };
type InitialValues = Record<string, string>;

const inputCls =
  "mt-1 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
const labelCls = "text-sm font-semibold text-zinc-700";
const errorCls = "mt-1 text-sm font-medium text-red-600";

function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
      {hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}
      {error ? <p className={errorCls}>{error}</p> : null}
    </div>
  );
}

export default function ProductForm({
  action,
  categories,
  initial,
  submitLabel,
}: {
  action: (
    prev: ProductFormState,
    formData: FormData,
  ) => Promise<ProductFormState>;
  categories: CategoryOption[];
  initial?: InitialValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const v = state.values ?? initial ?? {};
  const e = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      {e.form ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {e.form}
        </p>
      ) : null}
      {state.ok ? (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Cambios guardados correctamente.
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="ASIN *" error={e.asin} hint="10 caracteres. Único en el catálogo.">
          <input name="asin" defaultValue={v.asin ?? ""} required className={inputCls} placeholder="B0DXXXXXXX" />
        </Field>
        <Field label="Marca" error={e.brand}>
          <input name="brand" defaultValue={v.brand ?? ""} className={inputCls} placeholder="Ninja, Sony, Chewy…" />
        </Field>
      </div>

      <Field label="Título del producto *" error={e.title} hint="Título claro en inglés (así se verá en el sitio público).">
        <input name="title" defaultValue={v.title ?? ""} required className={inputCls} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Categoría *" error={e.categoryId}>
          <select name="categoryId" defaultValue={v.categoryId ?? ""} required className={inputCls}>
            <option value="" disabled>
              Selecciona…
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nameEn}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Estado" error={e.status}>
          <select name="status" defaultValue={v.status ?? "DRAFT"} className={inputCls}>
            <option value="DRAFT">Borrador</option>
            <option value="PUBLISHED">Publicado</option>
            <option value="DEMOTED">Degradado (visible con menor prioridad)</option>
            <option value="UNPUBLISHED">Despublicado</option>
          </select>
        </Field>
      </div>

      <Field label="URL del producto en Amazon *" error={e.amazonUrl}>
        <input name="amazonUrl" defaultValue={v.amazonUrl ?? ""} required className={inputCls} placeholder="https://www.amazon.com/dp/B0DXXXXXXX" />
      </Field>

      <Field
        label="Enlace de afiliado WEB (SiteStripe)"
        error={e.affiliateUrl}
        hint="Pega el enlace generado con SiteStripe. Debe incluir tag=ecommercety00-20. Obligatorio para publicar."
      >
        <input name="affiliateUrl" defaultValue={v.affiliateUrl ?? ""} className={inputCls} placeholder="https://www.amazon.com/dp/...?tag=ecommercety00-20" />
      </Field>

      <Field
        label="URL de la imagen"
        error={e.imageUrl}
        hint="Solo imágenes con derecho de uso: las oficiales llegan solas vía la Creators API de Amazon cuando la cuenta califique; también puedes pegar una imagen propia o del fabricante con permiso. No pegues URLs de imágenes copiadas de Amazon fuera de la API: viola la licencia de Associates."
      >
        <input name="imageUrl" defaultValue={v.imageUrl ?? ""} className={inputCls} placeholder="https://…" />
        {v.imageUrl ? (
          <a
            href={v.imageUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block text-xs font-semibold text-brand-700 underline"
          >
            Ver la imagen actual
          </a>
        ) : null}
      </Field>

      <Field label="Descripción propia (Why we picked it)" error={e.shortDescription} hint="Texto original nuestro, nunca copiado de Amazon. Máximo 1200 caracteres.">
        <textarea name="shortDescription" defaultValue={v.shortDescription ?? ""} rows={4} className={inputCls} />
      </Field>

      <Field
        label="Puntos destacados (se publican en la ficha)"
        error={e.highlights}
        hint="Uno por línea, máximo 8, frases propias y cortas: qué lo hace bueno, para quién es, qué problema resuelve. Esto SÍ se muestra al visitante."
      >
        <textarea name="highlights" defaultValue={v.highlights ?? ""} rows={4} className={inputCls} placeholder={"Traducción en tiempo real para viajar sin barreras\nCancelación de ruido adaptativa\nEstuche compacto para el equipaje de mano"} />
      </Field>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <Field
          label="Notas internas del panel (NO se publican)"
          error={e.internalNotes}
          hint="Aquí sí puedes anotar a mano el precio que viste, el fin de una oferta o cualquier dato de Amazon: queda solo como referencia interna de gestión. Por la licencia de Associates, los precios públicos deben venir de la API oficial (con su hora de verificación); un precio escrito a mano y publicado es causal de cierre de la cuenta."
        >
          <textarea name="internalNotes" defaultValue={v.internalNotes ?? ""} rows={3} className={inputCls} placeholder="Ej.: visto a $32.99 el 31-oct, oferta vista hasta agotar stock…" />
        </Field>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-800 disabled:opacity-60"
        >
          {pending ? "Guardando…" : submitLabel}
        </button>
        <Link href="/admin/productos" className="text-sm font-medium text-zinc-500 hover:text-zinc-800">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
