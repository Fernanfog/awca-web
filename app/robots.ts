import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/* robots.txt — permite indexar todo y apunta a Google al sitemap. */
export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
