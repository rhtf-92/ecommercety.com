import { Suspense } from "react";
import Header from "@/components/Header";
import SiteLogo from "@/components/SiteLogo";
import Footer from "@/components/Footer";
import ViewBeacon from "@/components/ViewBeacon";

// Chrome del sitio público SOLO para las rutas del grupo (site).
// El panel /admin vive fuera de este grupo: nunca hereda la cabecera
// pública (eso empujaba el sidebar fuera de la pantalla).
//
// La metadata (incluido el favicon dinámico por variante de logo) se
// declara en el layout RAÍZ (src/app/layout.tsx), única fuente para
// todo el dominio: este grupo no declara icons propios.

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header logo={<SiteLogo />} />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
      {/* usePathname es dinámico: frontera Suspense (Cache Components). */}
      <Suspense fallback={null}>
        <ViewBeacon />
      </Suspense>
    </>
  );
}
