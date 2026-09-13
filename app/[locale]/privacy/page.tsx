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
  const title = t("privacy.title");
  const description = t("privacy.lede");
  const canonical = `/${locale}/privacy`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/privacy`]),
      ),
    },
    openGraph: {
      title: `${title} — Standpointly`,
      description,
      url: `${SITE_URL}${canonical}`,
    },
  };
}

/**
 * Operator details are unset until the site has a legal entity behind it.
 * They render as visible placeholders rather than plausible-looking
 * inventions, so an unreviewed policy cannot quietly ship looking finished.
 */
const CONTROLLER = process.env.PRIVACY_CONTROLLER ?? "Standpointly (standpointly.com)";
const CONTACT = process.env.PRIVACY_CONTACT ?? "support@standpointly.com";
const LOG_RETENTION = process.env.PRIVACY_LOG_RETENTION ?? "30 days";
const REVIEWED = process.env.PRIVACY_REVIEWED_DATE ?? "March 2026";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const values = {
    controller: CONTROLLER,
    contact: CONTACT,
    logRetention: LOG_RETENTION,
  };

  const privacyJsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: t("privacy.title"),
    description: t("privacy.lede"),
    url: `${SITE_URL}/${locale}/privacy`,
    publisher: {
      "@type": "Organization",
      name: "Standpointly",
      url: SITE_URL,
    },
  };

  return (
    <>
      <JsonLd data={privacyJsonLd} />
      <Prose locale={locale} title={t("privacy.title")} lede={t("privacy.lede")}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <Section key={n} title={t(`privacy.s${n}_title`)}>
            <p>{t(`privacy.s${n}_body`, values)}</p>
          </Section>
        ))}

        <p className="font-mono text-xs text-muted">
          {t("privacy.updated", { date: REVIEWED })}
        </p>
      </Prose>
    </>
  );
}
