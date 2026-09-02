import { defineRouting } from "next-intl/routing";

/**
 * §8 — locale lives in the path. v1 ships `en` only; `fr` then `ar` land at
 * build order step 7, and RTL gets fixed at that point, not later.
 */
export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  // Keep the locale in the URL even for the default, so every result link is
  // unambiguous about the language it was generated in.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
