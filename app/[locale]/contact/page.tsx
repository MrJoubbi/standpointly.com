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
  const title = t("contact.title");
  const description = t("contact.lede");
  const canonical = `/${locale}/contact`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/contact`]),
      ),
    },
    openGraph: {
      title: `${title} — Standpointly`,
      description,
      url: `${SITE_URL}${canonical}`,
    },
  };
}

export default async function ContactPage({
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

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t("contact.title"),
    description: t("contact.lede"),
    url: `${SITE_URL}/${locale}/contact`,
    publisher: {
      "@type": "Organization",
      name: "Standpointly",
      url: SITE_URL,
    },
  };

  return (
    <>
      <JsonLd data={contactJsonLd} />
      <Prose locale={locale} title={t("contact.title")} lede={t("contact.lede")}>
        {[1, 2, 3].map((n) => (
          <Section key={n} title={t(`contact.s${n}_title`)}>
            <p>{t(`contact.s${n}_body`, values)}</p>
          </Section>
        ))}
      </Prose>
    </>
  );
}
