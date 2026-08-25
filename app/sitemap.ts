import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Emits a static sitemap.xml into ./out at build time. Add new routes here as
 * sections graduate into their own pages.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/contact/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    // /case-studies is intentionally omitted until it has real content — it is
    // noindex for the same reason.
  ];
}
