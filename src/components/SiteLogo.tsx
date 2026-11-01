import { Suspense } from "react";
import Logo, { LogoMark, type LogoVariantId } from "@/components/Logo";
import { getLogoVariant } from "@/modules/settings/site";

// Logo del sitio según el ajuste elegido en el panel. El fallback
// (variante por defecto) se pinta al instante; el ajuste llega en
// streaming sin bloquear la página (patrón Cache Components).

async function DynamicLogo({ tone }: { tone: "dark" | "light" }) {
  const variant = (await getLogoVariant()) as LogoVariantId;
  return <Logo variant={variant} tone={tone} />;
}

async function DynamicMark() {
  const variant = (await getLogoVariant()) as LogoVariantId;
  return <LogoMark variant={variant} />;
}

export default function SiteLogo({
  tone = "dark",
}: {
  tone?: "dark" | "light";
}) {
  return (
    <Suspense fallback={<Logo variant="badge" tone={tone} />}>
      <DynamicLogo tone={tone} />
    </Suspense>
  );
}

/** Solo la insignia del logo seleccionado (sidebar del panel, login). */
export function SiteLogoMark() {
  return (
    <Suspense fallback={<LogoMark variant="badge" />}>
      <DynamicMark />
    </Suspense>
  );
}
