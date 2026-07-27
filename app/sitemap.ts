import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/* Mapa del sitio para Google (Search Console lo lee en /sitemap.xml).
   Lista las 5 páginas reales del sitio para que se indexen rápido. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/servicios", priority: 0.9 },
    { path: "/nosotros", priority: 0.8 },
    { path: "/contacto", priority: 0.8 },
    { path: "/ubicacion", priority: 0.7 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
