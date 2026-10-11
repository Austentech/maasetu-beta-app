import type { MetadataRoute } from "next";

import { publicRoutes, siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path === "/" ? "/" : route.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
