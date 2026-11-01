import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getDb } from "@/lib/db";
import { isCreatorsApiConfigured } from "@/modules/amazon/creators";
import SyncButton from "@/components/admin/SyncButton";
import ImagesToggle from "@/components/admin/ImagesToggle";
import BrandSettings from "@/components/admin/BrandSettings";
import {
  EXPECTED_MIGRATIONS,
  getBannerVariant,
  getLogoVariant,
  getSettingsHealth,
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
  topPages: { path: string; views: number }[];
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
      views30,
      pendingTrends,
      recent,
      lastRun,
      topPagesRaw,
    ] = await Promise.all([
      db.product.count(),
      db.product.count({ where: { status: "PUBLISHED" } }),
      db.product.count({ where: { status: "DRAFT" } }),
      db.product.count({ where: { status: "DEMOTED" } }),
      db.clickEvent.count(),
      db.clickEvent.count({ where: { createdAt: { gte: since } } }),
      db.pageView.count({ where: { createdAt: { gte: since } } }),
      db.trendCandidate.count({ where: { status: "PENDING" } }),
      db.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
      db.verificationRun.findFirst({ orderBy: { startedAt: "desc" } }),
      db.pageView.groupBy({
        by: ["path"],
        where: { createdAt: { gte: since } },
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 5,
      }),
    ]);
    return {
      cards: [
        { label: "Productos totales", value: total },
        { label: "Publicados", value: published },
        { label: "En borrador", value: drafts },
        { label: "Degradados", value: demoted },
        { label: "Visitas (30 días)", value: views30 },
        { label: "Clics totales", value: clicksTotal },
        { label: "Clics (30 días)", value: clicks30 },
        { label: "Tendencias por revisar", value: pendingTrends },
      ],
      recent,
      lastRun: lastRun
        ? { report: lastRun.report, startedAt: lastRun.startedAt }
        : null,
      topPages: topPagesRaw.map((row) => ({
        path: row.path,
        views: row._count.path,
      })),
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

      {data.topPages.length > 0 ? (
        <>
          <h2 className="mt-10 text-lg font-bold">Páginas más vistas (30 días)</h2>
          <ul className="mt-3 divide-y divide-zinc-100 rounded-2xl bg-white ring-1 ring-zinc-200">
            {data.topPages.map((page) => (
              <li
                key={page.path}
                className="flex items-center gap-3 px-5 py-3 text-sm"
              >
                <span className="min-w-0 flex-1 truncate font-medium text-zinc-700">
                  {page.path}
                </span>
                <span className="font-bold text-brand-700">
                  {page.views} visitas
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-zinc-400">
            Analítica propia de la plataforma (sin cookies ni servicios
            externos): solo se guardan la ruta y el momento de la visita.
          </p>
        </>
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

async function SystemHealth() {
  const health = await getSettingsHealth();
  if (health.dbOk && health.clientOk && health.tableOk) {
    return (
      <div className="rounded-2xl bg-emerald-50 px-5 py-4 text-sm text-emerald-800 ring-1 ring-emerald-200">
        <strong>Estado del sistema:</strong> base de datos conectada, tabla de
        ajustes operativa y cliente actualizado ({health.appliedMigrations}/
        {EXPECTED_MIGRATIONS} migraciones aplicadas). Los interruptores y
        selectores de esta página guardan al instante.
      </div>
    );
  }
  let message: string;
  if (!health.dbOk) {
    message =
      "la base de datos no responde, así que ningún ajuste puede guardarse. Levanta PostgreSQL con «docker compose up -d» y recarga esta página.";
  } else if (!health.clientOk) {
    message =
      "la tabla de ajustes SÍ existe en la base, pero el cliente de datos que usa el servidor se generó antes de que esa tabla existiera, así que el panel no puede leer ni guardar ajustes (por eso los selectores no responden). Solución: detén el servidor, ejecuta «npx prisma generate» en tu carpeta del proyecto, vuelve a arrancar «npm run dev» y recarga esta página.";
  } else if (!health.tableOk) {
    message = `falta la tabla de ajustes en la base (${health.appliedMigrations}/${EXPECTED_MIGRATIONS} migraciones aplicadas), así que el interruptor de imágenes y los selectores de marca no pueden guardar. Ejecuta «npx prisma migrate deploy» en tu carpeta del proyecto y recarga esta página.`;
  } else {
    message =
      "hay una inconsistencia entre el cliente de datos y la base. Ejecuta «npx prisma generate», reinicia el servidor y recarga esta página.";
  }
  return (
    <div className="rounded-2xl bg-red-50 px-5 py-4 text-sm leading-relaxed text-red-800 ring-1 ring-red-200">
      <strong>Estado del sistema:</strong> {message}
    </div>
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
      <div className="mt-6">
        <Suspense fallback={null}>
          <SystemHealth />
        </Suspense>
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
