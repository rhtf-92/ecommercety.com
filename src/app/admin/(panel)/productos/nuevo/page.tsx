import { Suspense } from "react";
import { getDb } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";
import { createProductAction } from "../actions";

export const metadata = { title: "Panel · Nuevo producto" };

async function Form() {
  const db = await getDb().catch(() => null);
  const categories = db
    ? await db.category.findMany({
        where: { isActive: true },
        orderBy: { nameEn: "asc" },
        select: { id: true, nameEn: true },
      })
    : [];
  if (!db) {
    return (
      <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
        Base de datos no conectada: configura DATABASE_URL para crear productos.
      </p>
    );
  }
  return (
    <div className="mt-8 max-w-3xl rounded-3xl bg-white p-6 ring-1 ring-zinc-200 sm:p-8">
      <ProductForm
        action={createProductAction}
        categories={categories}
        submitLabel="Crear producto"
      />
    </div>
  );
}

export default function NewProductPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight">Nuevo producto</h1>
      <p className="mt-1 text-zinc-500">
        Carga manual con el enlace de SiteStripe del canal WEB. El sistema
        valida ASIN, dominio de Amazon y Tracking ID oficial.
      </p>
      <Suspense fallback={<p className="mt-6 text-zinc-500">Cargando…</p>}>
        <Form />
      </Suspense>
    </>
  );
}
