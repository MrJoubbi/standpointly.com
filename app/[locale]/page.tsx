import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SiteHeader } from "@/components/SiteHeader";
import { TestCard } from "@/components/TestCard";
import { JsonLd } from "@/components/JsonLd";
import { availableTests, catalogue } from "@/lib/catalogue";

const SITE_URL = process.env.SITE_URL ?? "https://standpointly.com";

/**
 * Home — the platform, not the political test (§1).
 *
 * The catalogue is derived from /config/tests, so shipping test #2 really is
 * just adding a JSON file: it appears here on its own.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const entries = catalogue();
  const available = availableTests();
  const featured = available.find(t => t.id === "political") ?? available[0];

  const catalogueJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("home.tests_title"),
    description: t("home.tests_body"),
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t(entry.titleKey),
      description: t(entry.summaryKey),
      url:
        entry.status === "available"
          ? `${SITE_URL}/${locale}/test/${entry.id}`
          : undefined,
    })),
  };

  return (
    <div className="min-h-[100svh]">
      <JsonLd data={catalogueJsonLd} />
      <SiteHeader locale={locale} />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 pt-2 pb-14 sm:px-6 sm:pt-4 sm:pb-16">
          <div className="rounded-[24px] sm:rounded-[28px] bg-tint px-6 py-10 sm:px-14 sm:py-20">
            <h1 className="display-optical max-w-[17ch] font-display text-[2rem] font-bold leading-[1.12] text-ink sm:text-[3.25rem] sm:font-extrabold sm:leading-[1.08]">
              {t("home.hero_title")}
            </h1>
            <p className="mt-4 sm:mt-6 max-w-[54ch] text-[15px] sm:text-lg leading-[1.6] text-muted">
              {t("home.hero_body")}
            </p>

          {featured && (
            <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-4 sm:gap-5">
              <Link
                href={`/${locale}/test/${featured.id}`}
                className="w-full sm:w-auto text-center rounded-(--radius-control) bg-accent px-7 py-3.5 text-[15px] font-semibold text-on-accent transition-opacity hover:opacity-90 motion-reduce:transition-none shadow-sm"
              >
                {t("home.hero_cta")}
              </Link>
              <Link
                href={`/${locale}/method`}
                className="w-full sm:w-auto text-center text-[14px] sm:text-[15px] font-medium text-muted underline-offset-4 hover:text-ink hover:underline py-1"
              >
                {t("home.hero_secondary")}
              </Link>
            </div>
          )}
          </div>
        </section>

        {/* Catalogue */}
        <section id="catalogue" className="bg-canvas">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-[13px] font-bold tracking-(--tracking-plate) text-accent uppercase">
              {t("home.tests_title")}
            </h2>
            <p className="mt-4 max-w-[58ch] text-[16px] leading-[1.65] text-muted">
              {t("home.tests_body")}
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {entries.map((entry) => (
                <TestCard key={entry.id} entry={entry} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-canvas">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-[13px] font-bold tracking-(--tracking-plate) text-accent uppercase">
              {t("home.how_title")}
            </h2>
            <ol className="mt-10 grid gap-10 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <li key={n}>
                  <span className="text-[13px] font-bold text-accent tabular-nums">
                    {String(n).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold text-ink">
                    {t(`home.how_${n}_title`)}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.65] text-muted">
                    {t(`home.how_${n}_body`)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why trust it */}
        <section className="bg-canvas">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-[13px] font-bold tracking-(--tracking-plate) text-accent uppercase">
              {t("home.why_title")}
            </h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n}>
                  <h3 className="font-display text-xl font-bold text-ink">
                    {t(`home.why_${n}_title`)}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.65] text-muted">
                    {t(`home.why_${n}_body`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-[14px] text-muted">
          <p>{t("landing.footer_note")}</p>
          <nav className="flex gap-5">
            <Link href={`/${locale}/about`}>{t("nav.about")}</Link>
            <Link href={`/${locale}/method`}>{t("nav.method")}</Link>
            <Link href={`/${locale}/privacy`}>{t("nav.privacy")}</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
