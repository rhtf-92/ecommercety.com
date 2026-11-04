import Link from "next/link";
import { connection } from "next/server";
import { getDb } from "@/lib/db";
import {
  asinFromProductPath,
  buildCategoryPerformance,
  buildProductPerformance,
  findZombies,
} from "@/modules/analytics/report";
import { demoteZombieAction, replaceZombieAction } from "./actions";

export const metadata = { title: "Panel · Reportes" };

function Notice({ searchParams }: { searchParams: { ok?: string; error?: string } }) {
  if (searchParams.ok) {
    return (
      <p className="rounded-2xl bg-emerald-50 px-5 py-3 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200">
        {searchParams.ok}
      </p>
    );
  }
  if (searchParams.error) {
    return (
      <p className="rounded-2xl bg-red-50 px-5 py-3 text-sm font-medium text-red-800 ring-1 ring-red-200">
        {searchParams.error}
      </p>
    );
  }
  return null;
}

const WINDOW_DAYS = 30;

function pct(value: number | null): string {
  return value === null ? "—" : `${value.toFixed(1)}%`;
}

async function loadReport(): Promise<{
  rows: ReturnType<typeof buildProductPerformance>;
  dbError: boolean;
}> {
  try {
    const db = await getDb();
    const since = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000);
    const [products, clickGroups, viewGroups] = await Promise.all([
      db.product.findMany({
        where: { status: "PUBLISHED" },
        select: {
          id: true,
          asin: true,
          title: true,
          status: true,
          category: { select: { nameEn: true } },
        },
        orderBy: { publishedAt: "desc" },
      }),
      db.clickEvent.groupBy({
        by: ["productId"],
        where: { createdAt: { gte: since } },
        _count: { productId: true },
      }),
      db.pageView.groupBy({
        by: ["path"],
        where: { createdAt: { gte: since } },
        _count: { path: true },
      }),
    ]);

    const viewsByAsin = new Map<string, number>();
    for (const group of viewGroups) {
      const asin = asinFromProductPath(group.path);
      if (!asin) continue;
      viewsByAsin.set(asin, (viewsByAsin.get(asin) ?? 0) + group._count.path);
    }
    const clicksByProductId = new Map(
      clickGroups.map((group) => [group.productId, group._count.productId]),
    );

    const rows = buildProductPerformance(
      products.map((product) => ({
        id: product.id,
        asin: product.asin,
        title: product.title,
        categoryName: product.category.nameEn,
        status: product.status,
      })),
      viewsByAsin,
      clicksByProductId,
    );
    return { rows, dbError: false };
  } catch {
    return { rows: [], dbError: true };
  }
}

export default async function ReportesPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  await connection();
  const params = await searchParams;
  const { rows, dbError } = await loadReport();

  let approvedCandidates: { id: string; asin: string; title: string; sourceList: string }[] = [];
  try {
    const db = await getDb();
    approvedCandidates = await db.trendCandidate.findMany({
      where: { status: "APPROVED" },
      select: { id: true, asin: true, title: true, sourceList: true },
      orderBy: { detectedAt: "desc" },
    });
  } catch {
    approvedCandidates = [];
  }

  const categories = buildCategoryPerformance(rows);
  const zombies = findZombies(rows);
  const totalViews = rows.reduce((sum, row) => sum + row.views, 0);
  const totalClicks = rows.reduce((sum, row) => sum + row.clicks, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold">Reporte de rendimiento</h1>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-zinc-600">
          Últimos {WINDOW_DAYS} días, solo productos publicados. CTR = clics /
          visitas a la ficha del producto. Sin visitas, el CTR se muestra
          como “—”: no es un producto que no convierta, es un producto sin
          exposición. La venta final se confirma en Associates Central, no
          en este reporte.
        </p>
      </div>

      {dbError ? (
        <p className="rounded-2xl bg-amber-50 px-5 py-4 text-sm text-amber-800 ring-1 ring-amber-200">
          Base de datos no conectada. Este reporte necesita DATABASE_URL y
          las migraciones aplicadas.
        </p>
      ) : null}

      <Notice searchParams={params} />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Productos publicados", value: rows.length },
          { label: "Visitas a fichas (30 días)", value: totalViews },
          { label: "Clics a Amazon (30 días)", value: totalClicks },
        ].map((card) => (
          <div key={card.label} className="rounded-3xl bg-white p-5 ring-1 ring-zinc-200">
            <p className="text-sm font-medium text-zinc-500">{card.label}</p>
            <p className="mt-1 text-3xl font-extrabold">{card.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-3xl bg-white p-6 ring-1 ring-zinc-200">
        <h2 className="font-bold">Por categoría</h2>
        {categories.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">Sin datos en la ventana.</p>
        ) : (
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500">
                <th className="py-2 pr-3">Categoría</th>
                <th className="py-2 pr-3">Productos</th>
                <th className="py-2 pr-3">Visitas</th>
                <th className="py-2 pr-3">Clics</th>
                <th className="py-2">CTR</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((row) => (
                <tr key={row.categoryName} className="border-t border-zinc-100">
                  <td className="py-2 pr-3 font-medium">{row.categoryName}</td>
                  <td className="py-2 pr-3">{row.products}</td>
                  <td className="py-2 pr-3">{row.views}</td>
                  <td className="py-2 pr-3">{row.clicks}</td>
                  <td className="py-2">{pct(row.ctr)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="rounded-3xl bg-white p-6 ring-1 ring-zinc-200">
        <h2 className="font-bold">Productos por clics</h2>
        {rows.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">Sin datos en la ventana.</p>
        ) : (
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500">
                <th className="py-2 pr-3">Producto</th>
                <th className="py-2 pr-3">Categoría</th>
                <th className="py-2 pr-3">Visitas</th>
                <th className="py-2 pr-3">Clics</th>
                <th className="py-2">CTR</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 50).map((row) => (
                <tr key={row.id} className="border-t border-zinc-100">
                  <td className="py-2 pr-3">
                    <Link href={`/product/${row.asin}`} className="font-medium underline">
                      {row.title}
                    </Link>
                    <span className="block text-xs text-zinc-500">{row.asin}</span>
                  </td>
                  <td className="py-2 pr-3">{row.categoryName}</td>
                  <td className="py-2 pr-3">{row.views}</td>
                  <td className="py-2 pr-3">{row.clicks}</td>
                  <td className="py-2">{pct(row.ctr)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="rounded-3xl bg-white p-6 ring-1 ring-zinc-200">
        <h2 className="font-bold">
          Productos zombis: publicados, 0 clics en {WINDOW_DAYS} días ({zombies.length})
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Candidatos a degradar o reemplazar, no a borrar en automático. Si un
          zombi además tiene pocas visitas, el problema es exposición; si
          tiene visitas y 0 clics, el problema es la ficha o el encaje.
          Degradar lo saca de los listados públicos (la ficha directa sigue
          funcionando y se puede volver a publicar desde Productos).
          Reemplazar degrada el zombi y crea un borrador desde un
          candidato aprobado, en la misma categoría: ese borrador se
          completa en Productos con descripción propia y enlace
          SiteStripe antes de poder publicarse.
        </p>
        {zombies.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">Ninguno en esta ventana.</p>
        ) : (
          <ul className="mt-4 divide-y divide-zinc-100">
            {zombies.slice(0, 50).map((row) => (
              <li key={row.id} className="py-3 text-sm">
                <span className="font-semibold">{row.title}</span>{" "}
                <span className="text-zinc-500">
                  · {row.categoryName} · {row.views} visitas ·{" "}
                  <Link href={`/admin/productos/${row.id}`} className="underline">
                    Editar
                  </Link>
                </span>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <form action={demoteZombieAction} className="flex flex-wrap items-center gap-2">
                    <input type="hidden" name="id" value={row.id} />
                    <input
                      name="reason"
                      placeholder="Motivo (opcional)"
                      maxLength={300}
                      className="w-56 rounded-xl border border-zinc-300 px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-full border border-amber-300 px-4 py-1.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-50"
                    >
                      Degradar
                    </button>
                  </form>
                  {approvedCandidates.length > 0 ? (
                    <form action={replaceZombieAction} className="flex flex-wrap items-center gap-2">
                      <input type="hidden" name="id" value={row.id} />
                      <select
                        name="candidateId"
                        required
                        className="w-64 rounded-xl border border-zinc-300 px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Reemplazar por candidato aprobado…
                        </option>
                        {approvedCandidates.map((candidate) => (
                          <option key={candidate.id} value={candidate.id}>
                            {candidate.title} ({candidate.asin})
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="rounded-full bg-brand-700 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-800"
                      >
                        Reemplazar
                      </button>
                    </form>
                  ) : (
                    <span className="text-sm text-zinc-500">
                      Sin candidatos aprobados: añade uno en{" "}
                      <Link href="/admin/tendencias" className="underline">
                        Tendencias
                      </Link>
                      .
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
