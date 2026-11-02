import { Suspense } from "react";
import Link from "next/link";
import { getDb } from "@/lib/db";
import ProductsToolbar from "@/components/admin/ProductsToolbar";
import ProductRowActions from "@/components/admin/ProductRowActions";

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

const STATUS_DOT: Record<string, string> = {
  DRAFT: "bg-zinc-400",
  PUBLISHED: "bg-emerald-500",
  DEMOTED: "bg-amber-500",
  UNPUBLISHED: "bg-red-500",
};

const STATUS_KEYS = ["PUBLISHED", "DRAFT", "DEMOTED", "UNPUBLISHED"];
const ORDERS = ["recientes", "titulo", "clics"];
const PAGE_SIZE = 25;

type SearchParams = {
  estado?: string;
  q?: string;
  categoria?: string;
  orden?: string;
  pagina?: string;
  creado?: string;
};

type Props = { searchParams: Promise<SearchParams> };

type CatalogData = {
  categories: { slug: string; nameEn: string; count: number }[];
  categoriesWithProducts: number;
  counts: Record<string, number>;
  total: number;
  totalAll: number;
  publishedAll: number;
  clicksAll: number;
  categoryValid?: string;
  products: {
    id: string;
    asin: string;
    title: string;
    brand: string | null;
    status: string;
    category: { nameEn: string };
    _count: { clicks: number };
  }[];
};

async function loadCatalog(params: {
  status?: string;
  q: string;
  categoria?: string;
  orden: string;
  page: number;
}): Promise<CatalogData> {
  const db = await getDb();

  const categoriesRaw = await db.category.findMany({
    orderBy: { nameEn: "asc" },
    select: {
      slug: true,
      nameEn: true,
      _count: { select: { products: true } },
    },
  });
  const categories = categoriesRaw.map((c) => ({
    slug: c.slug,
    nameEn: c.nameEn,
    count: c._count.products,
  }));
  const categoryValid =
    params.categoria && categories.some((c) => c.slug === params.categoria)
      ? params.categoria
      : undefined;

  // Filtros facetados: la búsqueda y la categoría alimentan tanto el listado
  // como los conteos de los chips de estado.
  const baseWhere = {
    ...(categoryValid ? { category: { slug: categoryValid } } : {}),
    ...(params.q
      ? {
          OR: [
            { title: { contains: params.q, mode: "insensitive" as const } },
            { asin: { contains: params.q, mode: "insensitive" as const } },
            { brand: { contains: params.q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [grouped, totalAll, publishedAll, clicksAll] = await Promise.all([
    db.product.groupBy({
      by: ["status"],
      where: baseWhere,
      _count: { _all: true },
    }),
    db.product.count(),
    db.product.count({ where: { status: "PUBLISHED" } }),
    db.clickEvent.count(),
  ]);

  const counts: Record<string, number> = { "": 0 };
  for (const key of STATUS_KEYS) counts[key] = 0;
  for (const row of grouped) {
    counts[row.status] = row._count._all;
    counts[""] += row._count._all;
  }

  const total = counts[params.status ?? ""];
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(Math.max(1, params.page), totalPages);

  const orderBy =
    params.orden === "titulo"
      ? [{ title: "asc" as const }]
      : params.orden === "clics"
        ? [
            { clicks: { _count: "desc" as const } },
            { updatedAt: "desc" as const },
          ]
        : [{ updatedAt: "desc" as const }];

  const products =
    total === 0
      ? []
      : await db.product.findMany({
          where: params.status
            ? { ...baseWhere, status: params.status as never }
            : baseWhere,
          include: {
            category: { select: { nameEn: true } },
            _count: { select: { clicks: true } },
          },
          orderBy,
          skip: (page - 1) * PAGE_SIZE,
          take: PAGE_SIZE,
        });

  return {
    categories,
    categoriesWithProducts: categories.filter((c) => c.count > 0).length,
    counts,
    total,
    totalAll,
    publishedAll,
    clicksAll,
    categoryValid,
    products: products.map((p) => ({ ...p, status: String(p.status) })),
  };
}

/** Ventana de páginas para la paginación: 1 … actual … última, sin duplicar. */
function pageItems(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set(
    [1, 2, current - 1, current, current + 1, total - 1, total].filter(
      (p) => p >= 1 && p <= total,
    ),
  );
  const sorted = [...set].sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push("…");
    out.push(p);
    prev = p;
  }
  return out;
}

async function Catalog({ searchParams }: Props) {
  const raw = await searchParams;
  const status =
    raw.estado && STATUS_LABEL[raw.estado] ? raw.estado : undefined;
  const q = (raw.q ?? "").trim();
  const orden = raw.orden && ORDERS.includes(raw.orden) ? raw.orden : "recientes";
  const paginaRaw = Number.parseInt(raw.pagina ?? "1", 10);
  const page = Number.isFinite(paginaRaw) && paginaRaw > 0 ? paginaRaw : 1;

  let data: CatalogData | null = null;
  try {
    data = await loadCatalog({
      status,
      q,
      categoria: raw.categoria,
      orden,
      page,
    });
  } catch {
    data = null;
  }

  if (!data) {
    return (
      <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
        Base de datos no conectada: configura DATABASE_URL para gestionar
        productos.
      </p>
    );
  }

  const { categories, counts, total } = data;
  const categoria = data.categoryValid ?? "";
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const from = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(total, currentPage * PAGE_SIZE);
  const filtersActive = Boolean(q || categoria || status);

  // Construye hrefs que conservan filtros y orden (la paginación se reinicia
  // al cambiar de chip; `creado` no se propaga).
  const href = (patch: Partial<{ estado: string; pagina: number }>) => {
    const params = new URLSearchParams();
    const st = patch.estado !== undefined ? patch.estado : (status ?? "");
    if (st) params.set("estado", st);
    if (q) params.set("q", q);
    if (categoria) params.set("categoria", categoria);
    if (orden !== "recientes") params.set("orden", orden);
    const pg = patch.pagina ?? 1;
    if (pg > 1) params.set("pagina", String(pg));
    const qs = params.toString();
    return qs ? `/admin/productos?${qs}` : "/admin/productos";
  };

  const kpis = [
    { label: "Productos totales", value: data.totalAll },
    { label: "Publicados", value: data.publishedAll },
    { label: "Clics registrados", value: data.clicksAll },
    { label: "Categorías con productos", value: data.categoriesWithProducts },
  ];

  const thCls =
    "sticky top-0 z-10 bg-white px-4 py-3 text-xs font-semibold tracking-wide text-zinc-400 uppercase shadow-[inset_0_-1px_0_0_#e4e4e7]";

  return (
    <>
      {raw.creado ? (
        <p className="mt-6 rounded-2xl bg-emerald-50 px-5 py-3 text-sm font-medium text-emerald-700">
          Producto creado correctamente.
        </p>
      ) : null}

      {/* KPIs del catálogo */}
      <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl bg-white px-4 py-3.5 ring-1 ring-zinc-200"
          >
            <dt className="text-[11px] font-semibold tracking-wide text-zinc-500 uppercase">
              {kpi.label}
            </dt>
            <dd className="mt-0.5 text-2xl font-extrabold text-zinc-900 tabular-nums">
              {kpi.value.toLocaleString("es")}
            </dd>
          </div>
        ))}
      </dl>

      {/* Buscador, categoría y orden */}
      <div className="mt-6">
        <ProductsToolbar
          q={q}
          categoria={categoria}
          orden={orden}
          estado={status ?? ""}
          categories={categories}
        />
      </div>

      {/* Chips de estado con conteo (respetan búsqueda y categoría) */}
      <div className="mt-4 flex flex-wrap gap-2">
        {["", ...STATUS_KEYS].map((s) => {
          const active = (status ?? "") === s;
          return (
            <Link
              key={s || "todos"}
              href={href({ estado: s })}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition ${
                active
                  ? "bg-ink-900 text-white ring-ink-900"
                  : "bg-white text-zinc-600 ring-zinc-300 hover:ring-zinc-400"
              }`}
            >
              {s ? STATUS_LABEL[s] : "Todos"}
              <span
                className={`ml-2 rounded-full px-1.5 py-0.5 text-xs font-bold tabular-nums ${
                  active ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"
                }`}
              >
                {counts[s]}
              </span>
            </Link>
          );
        })}
      </div>

      {total === 0 ? (
        filtersActive ? (
          <div className="mt-4 rounded-2xl bg-white px-5 py-10 text-center ring-1 ring-zinc-200">
            <p className="font-semibold text-zinc-900">
              Sin resultados para estos filtros
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm text-zinc-500">
              Ningún producto coincide con la búsqueda, la categoría y el
              estado seleccionados. Prueba con otros criterios o limpia los
              filtros.
            </p>
            <Link
              href="/admin/productos"
              className="mt-4 inline-block rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Limpiar filtros
            </Link>
          </div>
        ) : (
          <p className="mt-4 rounded-2xl bg-white px-5 py-10 text-center text-zinc-500 ring-1 ring-zinc-200">
            No hay productos todavía.{" "}
            <Link
              href="/admin/productos/nuevo"
              className="font-semibold text-brand-700"
            >
              Crea el primero
            </Link>
            .
          </p>
        )
      ) : (
        <>
          <div className="mt-4 max-h-[70vh] overflow-auto rounded-2xl bg-white ring-1 ring-zinc-200">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead>
                <tr>
                  <th scope="col" className={`${thCls} w-12`}>
                    #
                  </th>
                  <th scope="col" className={thCls}>
                    Producto
                  </th>
                  <th scope="col" className={thCls}>
                    Categoría
                  </th>
                  <th scope="col" className={thCls}>
                    Estado
                  </th>
                  <th scope="col" className={`${thCls} text-right`}>
                    Clics
                  </th>
                  <th scope="col" className={`${thCls} text-right`}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {data.products.map((product, i) => (
                  <tr
                    key={product.id}
                    className="align-top transition hover:bg-zinc-50"
                  >
                    <td className="px-4 py-3 text-xs text-zinc-400 tabular-nums">
                      {from + i}
                    </td>
                    <td className="px-4 py-3">
                      <p className="line-clamp-2 max-w-md font-semibold text-zinc-900">
                        {product.title}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-400">
                        <span className="font-mono">{product.asin}</span>
                        {product.brand ? ` · ${product.brand}` : ""}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-zinc-600">
                        {product.category.nameEn}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ${STATUS_CLS[product.status]}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[product.status]}`}
                        />
                        {STATUS_LABEL[product.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-zinc-700 tabular-nums">
                      {product._count.clicks.toLocaleString("es")}
                    </td>
                    <td className="px-4 py-3">
                      <ProductRowActions
                        id={product.id}
                        asin={product.asin}
                        title={product.title}
                        status={product.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-zinc-500" aria-live="polite">
              Mostrando{" "}
              <strong className="text-zinc-800">
                {from}–{to}
              </strong>{" "}
              de <strong className="text-zinc-800">{total}</strong> productos
            </p>
            <nav aria-label="Paginación de productos" className="flex items-center gap-1.5">
              {currentPage > 1 ? (
                <Link
                  href={href({ pagina: currentPage - 1 })}
                  className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-zinc-600 ring-1 ring-zinc-300 transition hover:ring-zinc-400"
                >
                  ← Anterior
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-zinc-300 ring-1 ring-zinc-200"
                >
                  ← Anterior
                </span>
              )}
              {pageItems(currentPage, totalPages).map((item, idx) =>
                item === "…" ? (
                  <span key={`gap-${idx}`} className="px-1 text-zinc-400">
                    …
                  </span>
                ) : item === currentPage ? (
                  <span
                    key={item}
                    aria-current="page"
                    className="rounded-full bg-ink-900 px-3 py-1.5 text-sm font-bold text-white tabular-nums"
                  >
                    {item}
                  </span>
                ) : (
                  <Link
                    key={item}
                    href={href({ pagina: item })}
                    className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-zinc-600 tabular-nums ring-1 ring-zinc-300 transition hover:ring-zinc-400"
                  >
                    {item}
                  </Link>
                ),
              )}
              {currentPage < totalPages ? (
                <Link
                  href={href({ pagina: currentPage + 1 })}
                  className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-zinc-600 ring-1 ring-zinc-300 transition hover:ring-zinc-400"
                >
                  Siguiente →
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-zinc-300 ring-1 ring-zinc-200"
                >
                  Siguiente →
                </span>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
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
        <Catalog searchParams={searchParams} />
      </Suspense>
    </>
  );
}
