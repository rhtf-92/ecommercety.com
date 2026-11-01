// Sistema de logos de T&F Picks: 5 alternativas profesionales en SVG,
// seleccionables desde el panel (SiteSetting.logoVariant).
// Paleta oficial: brand #14594a, ink #0d1220, ámbar CTA #f59e0b.

export type LogoVariantId = "badge" | "tag" | "arrow" | "seal" | "wordmark";

export const LOGO_VARIANTS: { id: LogoVariantId; name: string; concept: string }[] = [
  { id: "badge", name: "Insignia", concept: "Monograma T&F en pastilla redondeada: sólido, app-ready, el más versátil." },
  { id: "tag", name: "Etiqueta", concept: "La etiqueta de precio con check: promete selección y buen precio sin decirlo." },
  { id: "arrow", name: "Flecha", concept: "T&F con flecha ascendente: crecimiento y acierto en cada compra." },
  { id: "seal", name: "Sello verificado", concept: "Medalla circular con check: el sello de nuestros ciclos de verificación." },
  { id: "wordmark", name: "Tipográfico", concept: "Solo texto con estrella ámbar: minimalista, editorial, premium." },
];

export function LogoMark({ variant }: { variant: LogoVariantId }) {
  switch (variant) {
    case "tag":
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
          <path d="M8 6h18l14 14-18 18L8 24z" fill="#14594a" transform="rotate(0 24 24)" />
          <circle cx="16" cy="14" r="3" fill="#fafaf8" />
          <path d="M19 27l4 4 8-9" stroke="#f59e0b" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "arrow":
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
          <rect width="48" height="48" rx="12" fill="#0d1220" />
          <text x="24" y="25" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="15" fill="#ffffff">T&amp;F</text>
          <path d="M11 37 L29 37" stroke="#1f8a70" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M29 37 L37 29" stroke="#f59e0b" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M30.5 29.5 H37 V36" stroke="#f59e0b" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "seal":
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
          <circle cx="24" cy="24" r="21" fill="#14594a" />
          <circle cx="24" cy="24" r="16.5" fill="none" stroke="#fafaf8" strokeWidth="1.6" strokeDasharray="3 3" />
          <path d="M16.5 24.5l5.5 5.5L32 19" stroke="#ffffff" strokeWidth="3.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="36.5" cy="11.5" r="4" fill="#f59e0b" />
        </svg>
      );
    case "wordmark":
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
          <path d="M24 5l2.6 6.2L33 12l-4.9 4.3 1.5 6.7L24 19.4 18.4 23l1.5-6.7L15 12l6.4-.8z" fill="#f59e0b" />
          <text x="24" y="40" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="13" fill="#14594a">T&amp;F</text>
        </svg>
      );
    case "badge":
    default:
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
          <rect width="48" height="48" rx="13" fill="#14594a" />
          <text x="24" y="30" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill="#ffffff">T&amp;F</text>
          <circle cx="37" cy="11" r="3.2" fill="#f59e0b" />
        </svg>
      );
  }
}

export default function Logo({
  variant,
  tone = "dark",
  compact = false,
}: {
  variant: LogoVariantId;
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const nameCls = tone === "light" ? "text-white" : "text-zinc-900";
  const subCls = tone === "light" ? "text-zinc-400" : "text-zinc-500";
  if (variant === "wordmark") {
    return (
      <span className="flex items-center gap-2.5">
        <LogoMark variant={variant} />
        {!compact ? (
          <span className="leading-tight">
            <span className={`block text-base font-black tracking-tight ${nameCls}`}>
              T&amp;F <span className="text-brand-600">Picks</span>
              <span className="text-amber-500">★</span>
            </span>
            <span className={`block text-[11px] font-medium ${subCls}`}>
              by E-Commerce T&amp;F
            </span>
          </span>
        ) : null}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark variant={variant} />
      {!compact ? (
        <span className="leading-tight">
          <span className={`block text-base font-extrabold tracking-tight ${nameCls}`}>
            T&amp;F Picks
          </span>
          <span className={`block text-[11px] font-medium ${subCls}`}>
            by E-Commerce T&amp;F
          </span>
        </span>
      ) : null}
    </span>
  );
}
