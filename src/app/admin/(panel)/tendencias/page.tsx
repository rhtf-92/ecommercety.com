import Link from "next/link";
import { connection } from "next/server";
import { getDb } from "@/lib/db";
import { TREND_SOURCES } from "@/modules/trends/queue";
import {
  addCandidateAction,
  approveCandidateAction,
  createDraftFromCandidateAction,
  rejectCandidateAction,
} from "./actions";

export const metadata = { title: "Panel · Tendencias" };

const inputCls =
  "w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none";
const btnCls =
  "rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800";
const ghostBtnCls =
  "rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100";

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

export default async function TendenciasPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  await connection();
  const params = await searchParams;
  type CandidateRow = {
    id: string;
    asin: string;
    title: string;
    sourceList: string;
    status: string;
    reason: string | null;
    detectedAt: Date;
    reviewedAt: Date | null;
  };
  let candidates: CandidateRow[] = [];
  let categories: { id: string; nameEn: string }[] = [];
  let dbError = false;
  try {
    const db = await getDb();
    const [rawCandidates, rawCategories] = await Promise.all([
      db.trendCandidate.findMany({ orderBy: { detectedAt: "desc" }, take: 200 }),
      db.category.findMany({
        where: { isActive: true },
        select: { id: true, nameEn: true },
        orderBy: { nameEn: "asc" },
      }),
    ]);
    candidates = rawCandidates as unknown as CandidateRow[];
    categories = rawCategories as unknown as { id: string; nameEn: string }[];
  } catch {
    dbError = true;
  }

  const pending = candidates.filter((c) => c.status === "PENDING");
  const approved = candidates.filter((c) => c.status === "APPROVED");
  const rejected = candidates.filter((c) => c.status === "REJECTED");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold">Caza de tendencias</h1>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-zinc-600">
          Cola única de candidatos. Regla: aprobar no publica nada; un
          candidato aprobado se convierte en borrador, y solo un borrador
          con enlace SiteStripe válido puede publicarse en Productos.
          Meta operativa: de señal a publicado en menos de 24 horas.
        </p>
      </div>

      <Notice searchParams={params} />

      {dbError ? (
        <p className="rounded-2xl bg-amber-50 px-5 py-4 text-sm text-amber-800 ring-1 ring-amber-200">
          Base de datos no conectada. Esta cola necesita DATABASE_URL y las
          migraciones aplicadas.
        </p>
      ) : null}

      <section className="rounded-3xl bg-white p-6 ring-1 ring-zinc-200">
        <h2 className="font-bold">Añadir candidato</h2>
        <form action={addCandidateAction} className="mt-4 grid gap-3 sm:grid-cols-3">
          <input name="asin" placeholder="ASIN (10 caracteres)" className={inputCls} required />
          <input name="title" placeholder="Título del producto" className={inputCls} required />
          <select name="sourceList" className={inputCls} defaultValue={TREND_SOURCES[0]} required>
            {TREND_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
          <button type="submit" className={`${btnCls} sm:col-span-3 sm:justify-self-start`}>
            Añadir a la cola
          </button>
        </form>
      </section>

      <section className="rounded-3xl bg-white p-6 ring-1 ring-zinc-200">
        <h2 className="font-bold">Pendientes por revisar ({pending.length})</h2>
        {pending.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">No hay candidatos pendientes.</p>
        ) : (
          <ul className="mt-4 divide-y divide-zinc-100">
            {pending.map((c) => (
              <li key={c.id} className="py-4">
                <p className="font-semibold">{c.title}</p>
                <p className="mt-1 text-sm text-zinc-500">
                  {c.asin} · {c.sourceList} ·{" "}
                  {c.detectedAt.toLocaleString("es")} ·{" "}
                  <a
                    className="underline"
                    href={`https://www.amazon.com/dp/${c.asin}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver en Amazon
                  </a>
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <form action={approveCandidateAction}>
                    <input type="hidden" name="id" value={c.id} />
                    <button type="submit" className={btnCls}>
                      Aprobar
                    </button>
                  </form>
                  <form action={rejectCandidateAction} className="flex flex-wrap items-center gap-2">
                    <input type="hidden" name="id" value={c.id} />
                    <input
                      name="reason"
                      placeholder="Motivo del rechazo (opcional)"
                      className={`${inputCls} w-64`}
                    />
                    <button type="submit" className={ghostBtnCls}>
                      Rechazar
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-3xl bg-white p-6 ring-1 ring-zinc-200">
        <h2 className="font-bold">Aprobados: crear borrador ({approved.length})</h2>
        {approved.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">
            No hay candidatos aprobados. Aprueba uno pendiente para empezar su ficha.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-zinc-100">
            {approved.map((c) => (
              <li key={c.id} className="py-4">
                <p className="font-semibold">{c.title}</p>
                <p className="mt-1 text-sm text-zinc-500">
                  {c.asin} · {c.sourceList}
                </p>
                <form action={createDraftFromCandidateAction} className="mt-3 flex flex-wrap gap-2">
                  <input type="hidden" name="id" value={c.id} />
                  <select name="categoryId" className={`${inputCls} w-64`} required>
                    <option value="">Elige categoría…</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nameEn}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className={btnCls}>
                    Crear borrador
                  </button>
                </form>
                <p className="mt-2 text-xs text-zinc-500">
                  El borrador se abre en Productos: ahí se completan descripción
                  propia, highlights, imagen y enlace SiteStripe antes de publicar.
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {rejected.length > 0 ? (
        <section className="rounded-3xl bg-white p-6 ring-1 ring-zinc-200">
          <h2 className="font-bold">Rechazados ({rejected.length})</h2>
          <ul className="mt-4 divide-y divide-zinc-100">
            {rejected.map((c) => (
              <li key={c.id} className="py-3 text-sm">
                <span className="font-semibold">{c.title}</span>{" "}
                <span className="text-zinc-500">
                  · {c.asin} · {c.sourceList}
                  {c.reason ? ` · Motivo: ${c.reason}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="text-sm text-zinc-500">
        Ver también: <Link href="/admin/reportes" className="font-semibold underline">Reporte de rendimiento y productos zombis</Link>.
      </p>
    </div>
  );
}
