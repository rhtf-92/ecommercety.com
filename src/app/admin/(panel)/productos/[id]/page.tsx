import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";
import { updateProductAction } from "../actions";

export const metadata = { title: "Panel · Editar producto" };

type Props = { params: Promise<{ id: string }> };

async function Form({ params }: Props) {
  const { id } = await params;
  const db = await getDb().catch(() => null);
  if (!db) {
    return (
      <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
        Base de datos no conectada.
      </p>
    );
  }
  const [product, categories] = await Promise.all([
    db.product.findUnique({
      where: { id },
      include: { links: { where: { channel: "WEB" } } },
    }),
    db.category.findMany({
      where: { isActive: true },
      orderBy: { nameEn: "asc" },
      select: { id: true, nameEn: true },
    }),
  ]);
  if (!product) notFound();

  const initial = {
    asin: product.asin,
    brand: product.brand ?? "",
    title: product.title,
    categoryId: product.categoryId,
    status: product.status,
    amazonUrl: product.amazonUrl,
    affiliateUrl: product.links[0]?.url ?? "",
    imageUrl: product.imageUrl ?? "",
    shortDescription: product.shortDescription ?? "",
  };

  const action = updateProductAction.bind(null, id);

  return (
    <div className="mt-8 max-w-3xl rounded-3xl bg-white p-6 ring-1 ring-zinc-200 sm:p-8">
      <ProductForm
        action={action}
        categories={categories}
        initial={initial}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}

export default function EditProductPage({ params }: Props) {
  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight">Editar producto</h1>
      <p className="mt-1 text-zinc-500">
        Todo cambio queda registrado en la auditoría con tu usuario.
      </p>
      <Suspense fallback={<p className="mt-6 text-zinc-500">Cargando…</p>}>
        <Form params={params} />
      </Suspense>
    </>
  );
}
