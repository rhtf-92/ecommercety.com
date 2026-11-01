import { Suspense } from "react";
import Link from "next/link";
import { getDb } from "@/lib/db";
import {
  deleteProductAction,
  toggleProductStatusAction,
} from "./actions";

export const metadata = { title: "Panel · Productos" };

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Borrador",
  PUBLISHED: "Publicado",
  DEMOTED: "Degradado",
  UNPUBLISHED: "Despublicado",
};

const STATUS_CLS: Record<string, string> = {
  DRAFT: "bg-zinc-100 text-zinc-600",
  PUBLISHED: "bg-emerald-100 text-emerald-700",
  DEMOTED: "bg-amber-100 text-amber-700",
  UNPUBLISHED: "bg-red-100 text-red-700",
};

type Props = { searchParams: Promise<{ estado?: string; creado?: string }> };

async function ProductTable({ searchParams }: Props) {
  const { estado, creado } = await searchParams;
  const status =
    estado && STATUS_LABEL[estado] ? (estado as keyof typeof STATUS_LABEL) : undefined;

  let products: Awaited<ReturnType<typeof fetchProducts>> = [];
  let dbError = false;
  try {
    products = await fetchProducts(status);
  } catch {
    dbError = true;
  }

  if (dbError) {
    return (
      <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
        Base de datos no conectada: configura DATABASE_URL para gestionar
        productos.
      </p>
    );
  }

  return (
    <>
      {creado ? (
        <p className="mt-6 rounded-2xl bg-emerald-50 px-5 py-3 text-sm font-medium text-emerald-700">
          Producto creado correctamente.
        </p>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-2">
        {["", "PUBLISHED", "DRAFT", "DEMOTED", "UNPUBLISHED"].map((s) => (
          <Link
            key={s || "todos"}
            href={s ? `/admin/productos?estado=${s}` : "/admin/productos"}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ring-1 ${
              (status ?? "") === s
                ? "bg-ink-900 text-white ring-ink-900"
                : "bg-white text-zinc-600 ring-zinc-300 hover:ring-zinc-400"
            }`}
          >
            {s ? STATUS_LABEL[s] : "Todos"}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-white px-5 py-10 text-center text-zinc-500 ring-1 ring-zinc-200">
          No hay productos en este estado todavía.{" "}
          <Link href="/admin/productos/nuevo" className="font-semibold text-brand-700">
            Crea el primero
          </Link>
          .
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-zinc-200">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-zinc-100 text-xs tracking-wide text-zinc-400 uppercase">
              <tr>
                <th className="px-5 py-3">Producto</th>
                <th className="px-5 py-3">Categoría</th>
                <th className="px-5 py-3">Estado</th>
                <th className="px-5 py-3">Clics</th>
                <th className="px-5 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {products.map((product) => (
                <tr key={product.id} className="align-top">
                  <td className="px-5 py-3">
                    <p className="font-semibold text-zinc-900">{product.title}</p>
                    <p className="text-xs text-zinc-400">
                      ASIN {product.asin}
                      {product.brand ? ` · ${product.brand}` : ""}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-zinc-600">
                    {product.category.nameEn}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_CLS[product.status]}`}
                    >
                      {STATUS_LABEL[product.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-zinc-600">
                    {product._count.clicks}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Link
                        href={`/admin/productos/${product.id}`}
                        className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold hover:border-zinc-400"
                      >
                        Editar
                      </Link>
                      {product.status !== "PUBLISHED" ? (
                        <form action={toggleProductStatusAction}>
                          <input type="hidden" name="id" value={product.id} />
                          <input type="hidden" name="next" value="PUBLISHED" />
                          <button className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700">
                            Publicar
                          </button>
                        </form>
                      ) : (
                        <form action={toggleProductStatusAction}>
                          <input type="hidden" name="id" value={product.id} />
                          <input type="hidden" name="next" value="UNPUBLISHED" />
                          <button className="rounded-full bg-zinc-600 px-3 py-1 text-xs font-semibold text-white hover:bg-zinc-700">
                            Despublicar
                          </button>
                        </form>
                      )}
                      <form action={deleteProductAction}>
                        <input type="hidden" name="id" value={product.id} />
                        <button className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 ring-1 ring-red-200 hover:bg-red-100">
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

async function fetchProducts(status?: string) {
  const db = await getDb();
  return db.product.findMany({
    where: status ? { status: status as never } : undefined,
    include: { category: true, _count: { select: { clicks: true } } },
    orderBy: { updatedAt: "desc" },
    take: 100,
  });
}

export default function ProductsPage({ searchParams }: Props) {
  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Productos</h1>
          <p className="mt-1 text-zinc-500">
            Catálogo completo con su estado y clics registrados.
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="shrink-0 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-800"
        >
          + Nuevo producto
        </Link>
      </div>
      <Suspense fallback={<p className="mt-6 text-zinc-500">Cargando…</p>}>
        <ProductTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}
