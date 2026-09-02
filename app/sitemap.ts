import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { listTestIds } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL ?? "https://standpointly.com";
  const now = new Date();

  const testIds = listTestIds();
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    // Home
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}`]),
        ),
      },
    });

    // Test pages
    for (const testId of testIds) {
      routes.push({
        url: `${baseUrl}/${locale}/test/${testId}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${baseUrl}/${l}/test/${testId}`]),
          ),
        },
      });
    }

    // Static content pages
    const staticPages = ["about", "method", "privacy"];
    for (const page of staticPages) {
      routes.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${baseUrl}/${l}/${page}`]),
          ),
        },
      });
    }
  }

  // Root / URL pointing to default locale
  routes.unshift({
    url: baseUrl,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  return routes;
}
