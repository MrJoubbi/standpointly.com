import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Prose, Section } from "@/components/Prose";
import { JsonLd } from "@/components/JsonLd";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.SITE_URL ?? "https://standpointly.com";
const CONTACT = process.env.PRIVACY_CONTACT ?? "support@standpointly.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const title = t("terms.title");
  const description = t("terms.lede");
  const canonical = `/${locale}/terms`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/terms`]),
      ),
    },
    openGraph: {
      title: `${title} — Standpointly`,
      description,
      url: `${SITE_URL}${canonical}`,
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const values = {
    contact: CONTACT,
  };

  const termsJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("terms.title"),
    description: t("terms.lede"),
    url: `${SITE_URL}/${locale}/terms`,
    publisher: {
      "@type": "Organization",
      name: "Standpointly",
      url: SITE_URL,
    },
  };

  return (
    <>
      <JsonLd data={termsJsonLd} />
      <Prose locale={locale} title={t("terms.title")} lede={t("terms.lede")}>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <Section key={n} title={t(`terms.s${n}_title`)}>
            <p>{t(`terms.s${n}_body`, values)}</p>
          </Section>
        ))}
      </Prose>
    </>
  );
}
