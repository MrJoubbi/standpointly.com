import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Prose, Section } from "@/components/Prose";
import { JsonLd } from "@/components/JsonLd";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.SITE_URL ?? "https://standpointly.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const title = t("about.title");
  const description = t("about.lede");
  const canonical = `/${locale}/about`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/about`]),
      ),
    },
    openGraph: {
      title: `${title} — Standpointly`,
      description,
      url: `${SITE_URL}${canonical}`,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("about.title"),
    description: t("about.lede"),
    url: `${SITE_URL}/${locale}/about`,
    publisher: {
      "@type": "Organization",
      name: "Standpointly",
      url: SITE_URL,
    },
  };

  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <Prose locale={locale} title={t("about.title")} lede={t("about.lede")}>
        {[1, 2, 3, 4].map((n) => (
          <Section key={n} title={t(`about.s${n}_title`)}>
            <p>{t(`about.s${n}_body`)}</p>
          </Section>
        ))}
      </Prose>
    </>
  );
}
