import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import SiteLogo from "@/components/SiteLogo";
import Footer from "@/components/Footer";
import ViewBeacon from "@/components/ViewBeacon";
import { getLogoVariant } from "@/modules/settings/site";
import type { LogoVariantId } from "@/components/Logo";

// Chrome del sitio público SOLO para las rutas del grupo (site).
// El panel /admin vive fuera de este grupo: nunca hereda la cabecera
// pública (eso empujaba el sidebar fuera de la pantalla).

// Favicon dinámico: el icono de la pestaña sigue la variante de logo
// elegida en el panel (SiteSetting.logoVariant, la misma fuente que
// SiteLogo). Los assets por variante viven en public/favicons/ y se
// regeneran con scripts/generate-favicons.mjs. Sin base disponible,
// getLogoVariant cae a "badge" (el default del sistema), igual que el
// logo visible. El panel /admin no pasa por este layout: conserva el
// favicon.ico clásico (variante badge) de src/app/favicon.ico.
export async function generateMetadata(): Promise<Metadata> {
  const variant = (await getLogoVariant()) as LogoVariantId;
  return {
    icons: {
      icon: [
        { url: `/favicons/${variant}.svg`, type: "image/svg+xml" },
        {
          url: `/favicons/${variant}-32.png`,
          sizes: "32x32",
          type: "image/png",
        },
      ],
      apple: {
        url: `/favicons/${variant}-180.png`,
        sizes: "180x180",
        type: "image/png",
      },
      shortcut: `/favicons/${variant}-32.png`,
    },
  };
}

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
