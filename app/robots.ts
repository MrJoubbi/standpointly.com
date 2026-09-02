import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.SITE_URL ?? "https://standpointly.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/pdf/"], // Prevent bot load on dynamic PDF generation endpoint
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "Meta-ExternalAgent",
          "Amazonbot",
          "Bytespider",
          "CCBot",
          "cohere-ai",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/pdf/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
