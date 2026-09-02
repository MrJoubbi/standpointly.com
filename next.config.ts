import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // The dev overlay badge would otherwise be screenshotted into share images
  // rendered from a dev server.
  devIndicators: false,
  headers: async () => [
    {
      source: "/:all*(svg|jpg|png|webp|woff|woff2)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);

