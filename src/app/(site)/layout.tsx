import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Chrome del sitio público SOLO para las rutas del grupo (site).
// El panel /admin vive fuera de este grupo: nunca hereda la cabecera
// pública (eso empujaba el sidebar fuera de la pantalla).

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </>
  );
}
