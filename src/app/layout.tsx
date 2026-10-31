import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "T&F Picks — by E-Commerce T&F",
    template: "%s | T&F Picks",
  },
  description:
    "Hand-picked Amazon products, honest guides and comparisons from T&F Picks, by E-Commerce T&F.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="border-t border-zinc-200 px-6 py-6 dark:border-zinc-800">
          <div className="mx-auto w-full max-w-4xl">
            <AffiliateDisclosure />
          </div>
        </footer>
      </body>
    </html>
  );
}
