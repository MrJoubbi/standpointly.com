import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { JsonLd, buildWebsiteJsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

// §8 — self-hosted and served from our own origin, never fetched from Google
// at render time. Both are SIL Open Font License. This is also what makes the
// share images and the PDF render correctly on a Linux VPS, which has none of
// these fonts installed.
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";

import "@/app/globals.css";

const SITE_URL = process.env.SITE_URL ?? "https://standpointly.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Standpointly — Discover Where You Stand",
    template: "%s | Standpointly",
  },
  description:
    "Discover where you stand. A research-informed psychometric assessment platform structured across 5 scientific fields: Personality, Relationships, Beliefs & Values, Wellbeing, and Work & Career.",
  keywords: [
    "psychometrics 2D grid",
    "personality test",
    "big five personality test",
    "dark triad assessment",
    "attachment style quiz",
    "relational attachment assessment",
    "political standpoint test",
    "political compass 2d",
    "burnout index",
    "resilience assessment",
    "career personality test",
    "leadership style assessment",
    "privacy-first personality test",
    "client-side psychometrics",
    "archetype dynamics",
  ],
  authors: [{ name: "Standpointly" }],
  creator: "Standpointly",
  publisher: "Standpointly",
  applicationName: "Standpointly",
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Standpointly",
    title: "Standpointly — 2D Psychometric & Standpoint Mapping",
    description:
      "Map your political, psychological, and relational philosophy across high-resolution 2D coordinate planes. 100% private, client-side scoring.",
    images: [
      {
        url: "/api/og/political?x=0.20&y=0.40&format=og",
        width: 1200,
        height: 630,
        alt: "Standpointly 2D Coordinate Grid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Standpointly — 2D Psychometric & Standpoint Mapping",
    description:
      "Map your political, psychological, and relational philosophy across high-resolution 2D coordinate planes. 100% private, client-side scoring.",
    images: ["/api/og/political?x=0.20&y=0.40&format=og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

/**
 * Ensures window.fetch has both a getter and a setter in environments (such as sandboxed
 * iframes or strict-mode script loaders) where fetch was defined with a getter only,
 * preventing "Cannot set property fetch of #<Window> which has only a getter" errors.
 */
const FETCH_SHIM = `(function(){try{var f=window.fetch;Object.defineProperty(window,'fetch',{get:function(){return typeof f==='function'?f.bind(window):f;},set:function(v){f=v;},configurable:true,enumerable:true});}catch(e){}})();`;

/**
 * Runs before first paint, so a reader who chose dark never sees a white
 * flash on the way in. It must stay tiny and dependency-free — anything that
 * waits for hydration is too late to prevent the flash.
 */
const NO_FLASH = `try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="dark"){document.documentElement.setAttribute("data-theme","dark")}else{document.documentElement.setAttribute("data-theme","light")}}catch(e){}`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const websiteJsonLd = buildWebsiteJsonLd(SITE_URL);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Environment & sandbox fetch shim */}
        <script dangerouslySetInnerHTML={{ __html: FETCH_SHIM }} />

        {/* Google AdSense Meta Verification */}
        <meta name="google-adsense-account" content="ca-pub-3381513533522940" />

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3381513533522940"
          crossOrigin="anonymous"
        />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-R64MQ2WQ5G"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-R64MQ2WQ5G');
            `,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="min-h-screen bg-canvas font-body text-ink antialiased">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
