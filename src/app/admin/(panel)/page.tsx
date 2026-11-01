import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getDb } from "@/lib/db";
import { isCreatorsApiConfigured } from "@/modules/amazon/creators";
import SyncButton from "@/components/admin/SyncButton";
import ImagesToggle from "@/components/admin/ImagesToggle";
import BrandSettings from "@/components/admin/BrandSettings";
import {
  getBannerVariant,
  getLogoVariant,
  getShowProductImages,
} from "@/modules/settings/site";

export const metadata = { title: "Panel · Resumen" };

type AuditEntry = {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  actor: string;
  createdAt: Date;
};

type StatsData = {
  cards: { label: string; value: number }[];
  recent: AuditEntry[];
  lastRun: { report: string | null; startedAt: Date } | null;
};

async function loadStats(): Promise<StatsData | null> {
  await connection(); // panel siempre dinámico: nada se prerenderiza
  try {
    const db = await getDb();
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [
      total,
      published,
      drafts,
      demoted,
      clicksTotal,
      clicks30,
      pendingTrends,
      recent,
      lastRun,
    ] = await Promise.all([
      db.product.count(),
      db.product.count({ where: { status: "PUBLISHED" } }),
      db.product.count({ where: { status: "DRAFT" } }),
      db.product.count({ where: { status: "DEMOTED" } }),
      db.clickEvent.count(),
      db.clickEvent.count({ where: { createdAt: { gte: since } } }),
      db.trendCandidate.count({ where: { status: "PENDING" } }),
      db.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
      db.verificationRun.findFirst({ orderBy: { startedAt: "desc" } }),
    ]);
    return {
      cards: [
        { label: "Productos totales", value: total },
        { label: "Publicados", value: published },
        { label: "En borrador", value: drafts },
        { label: "Degradados", value: demoted },
        { label: "Clics totales", value: clicksTotal },
        { label: "Clics (30 días)", value: clicks30 },
        { label: "Tendencias por revisar", value: pendingTrends },
      ],
      recent,
      lastRun: lastRun
        ? { report: lastRun.report, startedAt: lastRun.startedAt }
        : null,
    };
  } catch {
    return null;
  }
}

async function Stats() {
  const data = await loadStats();

  if (!data) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="font-bold text-amber-900">Base de datos no conectada</h2>
        <p className="mt-2 text-sm leading-relaxed text-amber-800">
          El panel funciona, pero todavía no hay una base de datos accesible
          (DATABASE_URL). Levanta PostgreSQL local con{" "}
          <code className="rounded bg-amber-100 px-1">docker compose up -d</code>{" "}
          o configura la URL de Neon, aplica la migración con{" "}
          <code className="rounded bg-amber-100 px-1">npx prisma migrate deploy</code>{" "}
          y carga las categorías con{" "}
          <code className="rounded bg-amber-100 px-1">npm run db:seed</code>.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.cards.map((card) => (
          <div
            key={card.label}
            className="rounded-3xl bg-white p-5 ring-1 ring-zinc-200"
          >
            <p className="text-sm font-medium text-zinc-500">{card.label}</p>
            <p className="mt-1 text-3xl font-extrabold">{card.value}</p>
          </div>
        ))}
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center justify-center rounded-3xl bg-brand-700 p-5 font-bold text-white transition hover:bg-brand-800"
        >
          + Nuevo producto
        </Link>
      </div>

      {data.lastRun ? (
        <p className="mt-8 rounded-2xl bg-white px-5 py-4 text-sm text-zinc-600 ring-1 ring-zinc-200">
          <strong className="text-zinc-900">Última verificación/sincronización:</strong>{" "}
          {data.lastRun.report ?? "sin reporte"} ·{" "}
          {data.lastRun.startedAt.toLocaleString("es")}
        </p>
      ) : null}

      <h2 className="mt-10 text-lg font-bold">Actividad reciente</h2>
      {data.recent.length === 0 ? (
        <p className="mt-3 rounded-2xl bg-white px-5 py-4 text-sm text-zinc-500 ring-1 ring-zinc-200">
          Todavía no hay movimientos registrados en la auditoría.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-zinc-100 rounded-2xl bg-white ring-1 ring-zinc-200">
          {data.recent.map((entry) => (
            <li key={entry.id} className="flex flex-wrap gap-x-3 px-5 py-3 text-sm">
              <span className="font-bold text-brand-700">{entry.action}</span>
              <span className="text-zinc-600">
                {entry.entityType} · {entry.entityId.slice(0, 8)}…
              </span>
              <span className="text-zinc-400">por {entry.actor}</span>
              <span className="ml-auto text-zinc-400">
                {entry.createdAt.toLocaleString("es")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

async function ImagesSettingValue() {
  const showImages = await getShowProductImages();
  return <ImagesToggle initial={showImages} />;
}

async function BrandSettingValue() {
  const [logoVariant, bannerVariant] = await Promise.all([
    getLogoVariant(),
    getBannerVariant(),
  ]);
  return (
    <BrandSettings logoVariant={logoVariant} bannerVariant={bannerVariant} />
  );
}

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight">Resumen</h1>
      <p className="mt-1 text-zinc-500">
        Estado del catálogo y de la operación de T&amp;F Picks.
      </p>
      <div
        className={`mt-6 rounded-2xl px-5 py-4 text-sm ring-1 ${
          isCreatorsApiConfigured()
            ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
            : "bg-amber-50 text-amber-800 ring-amber-200"
        }`}
      >
        <strong>Amazon Creators API:</strong>{" "}
        {isCreatorsApiConfigured()
          ? "credenciales configuradas. Los precios e imágenes oficiales se sincronizan con npm run db:sync-amazon y en los ciclos de 5 horas."
          : "sin credenciales. Amazon las emite solo con la cuenta aprobada y 10+ ventas calificadas en los últimos 30 días; mientras tanto el sitio no muestra precios (cumplimiento) y usa «Check price on Amazon»."}
        <SyncButton />
      </div>
      <section className="mt-6 rounded-3xl bg-white p-6 ring-1 ring-zinc-200">
        <h2 className="text-base font-bold">Imágenes de productos en el sitio</h2>
        <p className="mt-1 mb-4 max-w-2xl text-sm text-zinc-500">
          Interruptor global de visualización. Además, por diseño, un
          producto sin imagen nunca muestra un espacio vacío: su tarjeta y
          su ficha se dibujan solo con texto. Cuando la Creators API traiga
          las fotos oficiales, actívalo para lucirlas en todo el sitio.
        </p>
        <Suspense fallback={<p className="text-sm text-zinc-400">Cargando ajuste…</p>}>
          <ImagesSettingValue />
        </Suspense>
      </section>
      <section className="mt-6 rounded-3xl bg-white p-6 ring-1 ring-zinc-200">
        <h2 className="text-base font-bold">Marca y banner</h2>
        <p className="mt-1 mb-4 max-w-2xl text-sm text-zinc-500">
          Elige entre las 5 alternativas de logo diseñadas para T&amp;F Picks
          y el estilo del banner de portada. El cambio se aplica a todo el
          sitio al guardar y queda registrado en la auditoría.
        </p>
        <Suspense fallback={<p className="text-sm text-zinc-400">Cargando marca…</p>}>
          <BrandSettingValue />
        </Suspense>
      </section>
      <div className="mt-8">
        <Suspense fallback={<p className="text-zinc-500">Cargando datos…</p>}>
          <Stats />
        </Suspense>
      </div>
    </>
  );
}
