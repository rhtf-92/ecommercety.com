import { Suspense } from "react";
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

export const metadata = { title: "Panel · Configuración" };

// Página de Configuración (2026-11-02): concentra TODA la configuración
// de la plataforma que antes vivía repartida en el Resumen — estado del
// sistema, estado/sincronización de la Creators API, interruptor de
// imágenes y Marca y banner. Solo cambia el hogar: los componentes y
// las server actions son exactamente los mismos.

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

export default function SettingsPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight">Configuración</h1>
      <p className="mt-1 text-zinc-500">
        Ajustes de la plataforma: marca, imágenes, integraciones y estado
        del sistema.
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
    </>
  );
}
