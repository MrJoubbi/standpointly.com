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
const CONTROLLER = process.env.PRIVACY_CONTROLLER;
const CONTACT = process.env.PRIVACY_CONTACT;
const LOG_RETENTION = process.env.PRIVACY_LOG_RETENTION;
const REVIEWED = process.env.PRIVACY_REVIEWED_DATE;

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const unset = (label: string) => `[${label} — NOT SET]`;
  const incomplete = !CONTROLLER || !CONTACT || !LOG_RETENTION || !REVIEWED;

  const values = {
    controller: CONTROLLER ?? unset("OPERATOR"),
    contact: CONTACT ?? unset("CONTACT"),
    logRetention: LOG_RETENTION ?? unset("LOG RETENTION PERIOD"),
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
        {incomplete && (
          <p className="border border-q-auth-left/60 bg-q-auth-left/10 px-4 py-3 font-mono text-xs leading-relaxed text-ink">
            {t("privacy.placeholder_warning")}
          </p>
        )}

        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <Section key={n} title={t(`privacy.s${n}_title`)}>
            <p>{t(`privacy.s${n}_body`, values)}</p>
          </Section>
        ))}

        <p className="font-mono text-xs text-muted">
          {t("privacy.updated", { date: REVIEWED ?? unset("REVIEW DATE") })}
        </p>
      </Prose>
    </>
  );
}
