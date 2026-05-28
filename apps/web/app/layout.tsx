import type { Metadata } from "next";
import { Sora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Display: Sora (títulos con carácter)
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

// Body: Geist Sans. Si prefieres no usar archivo local, reemplaza por
// otra fuente de next/font/google (ej. Plus Jakarta Sans) y ajusta la variable.
// Aquí se usa Geist vía Google Fonts como alternativa simple:
import { Inter as GeistFallback } from "next/font/google";
const geist = GeistFallback({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "{{PROJECT_NAME}}",
  description: "Construye tu trayectoria profesional como una aventura. A tu ritmo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${sora.variable} ${geist.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
