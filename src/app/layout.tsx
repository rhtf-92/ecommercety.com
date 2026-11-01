import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecommercety.com";

// Viewport explícito: escala correcta en todo dispositivo, uso del
// área segura en pantallas con notch y color de tema de marca.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d1220",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "T&F Picks — by E-Commerce T&F",
    template: "%s | T&F Picks",
  },
  description:
    "Hand-picked Amazon products, honest guides and comparisons from T&F Picks, by E-Commerce T&F.",
  openGraph: {
    type: "website",
    siteName: "T&F Picks",
    title: "T&F Picks — Great products. Zero guesswork.",
    description:
      "Curated Amazon finds, verified on a 5-hour cycle, with honest buying guides.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "T&F Picks — Great products. Zero guesswork.",
    description:
      "Curated Amazon finds, verified on a 5-hour cycle, with honest buying guides.",
  },
};

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
