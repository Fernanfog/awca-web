import type { Metadata } from "next";
import { Hanken_Grotesk, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

// Hanken Grotesk = sustituto libre de Neue Haas Grotesk (tipografía principal
// del brandbook): mismo linaje Helvetica, más cálida y premium que Inter.
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

// Playfair Display = tipografía secundaria del brandbook (títulos elegantes)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Geist Mono = etiquetas técnicas/editoriales (códigos, coordenadas, tags)
// estilo ficha de arquitecto — el toque "FIN-JU" del recorrido.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "auditoría Ecuador",
    "contabilidad",
    "declaración de impuestos",
    "SRI",
    "NIIF",
    "asesoría tributaria",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${hanken.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
