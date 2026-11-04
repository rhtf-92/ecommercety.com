import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE_DEFAULT,
  SITE_URL,
} from "@/modules/seo/site";
import { getLogoVariant } from "@/modules/settings/site";
import type { LogoVariantId } from "@/components/Logo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Viewport explícito: escala correcta en todo dispositivo, uso del
// área segura en pantallas con notch y color de tema de marca.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d1220",
};

// Verificación de propiedad para buscadores (Search Console y Bing
// Webmaster) por meta tag, como alternativa al TXT en DNS. Se activa
// definiendo las variables en el entorno de producción. La verificación
// de Pinterest (p:domain_verify) es un token público por diseño: se
// publica en el HTML para que Pinterest confirme la propiedad del
// dominio, así que va fija en el código y no en variables de entorno.
// No quitarla tras reclamar: Pinterest puede revalidar el dominio.
const PINTEREST_DOMAIN_VERIFY = "e6d3a392e18d61dd064930ab61dd7506";
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE_DEFAULT,
    template: "%s | T&F Picks",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: "E-Commerce T&F", url: SITE_URL }],
  creator: "E-Commerce T&F",
  publisher: "E-Commerce T&F",
  category: "shopping",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    other: {
      ...(bingVerification
        ? { "msvalidate.01": bingVerification }
        : {}),
      "p:domain_verify": PINTEREST_DOMAIN_VERIFY,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/slides/brand.jpg",
        width: 2048,
        height: 1152,
        alt: "T&F Picks — curated Amazon deals and trending products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    images: ["/slides/brand.jpg"],
  },
};

// Favicon dinámico — FUENTE ÚNICA en el layout raíz: el icono de la
// pestaña sigue la variante de logo elegida en el panel
// (SiteSetting.logoVariant, la misma fuente que SiteLogo) en TODAS las
// rutas: sitio público, /admin, /admin/login, 404 raíz y futuras. Los
// assets por variante viven en public/favicons/ y se regeneran con
// scripts/generate-favicons.mjs. Sin base disponible, getLogoVariant
// cae a "badge" (el default del sistema), igual que el logo visible.
// src/app/favicon.ico (badge) queda como respaldo para peticiones
// directas a /favicon.ico; en la pestaña manda esta declaración.
export async function generateMetadata(): Promise<Metadata> {
  const variant = (await getLogoVariant()) as LogoVariantId;
  return {
    ...baseMetadata,
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-zinc-900">
        {children}
      </body>
    </html>
  );
}
