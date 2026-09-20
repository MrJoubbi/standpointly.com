import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Flame } from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CatalogueSection } from "@/components/CatalogueSection";
import { JsonLd } from "@/components/JsonLd";
import { availableTests, catalogue, testClusters } from "@/lib/catalogue";

const SITE_URL = process.env.SITE_URL ?? "https://standpointly.com";

const TRENDING_CONFIG = [
  {
    id: "political",
    tag: "⭐ Flagship Compass",
    tagStyle: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    axis: "Economic vs. Social",
  },
  {
    id: "feminist-perspectives",
    tag: "⚡ Trending Topic",
    tagStyle: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    axis: "Gender & Society",
  },
  {
    id: "attachment",
    tag: "❤️ Dating & Relationships",
    tagStyle: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    axis: "Anxiety vs. Avoidance",
  },
  {
    id: "burnout",
    tag: "💼 Work & Energy",
    tagStyle: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    axis: "Exhaustion vs. Cynicism",
  },
  {
    id: "dark-triad",
    tag: "👁️ Personality Spectrum",
    tagStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    axis: "Ego & Strategy",
  },
  {
    id: "love-language",
    tag: "💌 Couples & Connection",
    tagStyle: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    axis: "Affection Modalities",
  },
];

/**
 * Home — the platform, not the political test (§1).
 *
 * Standpointly instruments are organized into 5 scientific fields:
 * Personality, Relationships, Beliefs & Values, Wellbeing, Work & Career.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const clusters = testClusters();
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
          : `${SITE_URL}/${locale}/tests/${entry.fieldSlug}/${entry.slug}`,
    })),
  };

  return (
    <div className="min-h-[100svh]">
      <JsonLd data={catalogueJsonLd} />
      <SiteHeader locale={locale} />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 pt-2 pb-10 sm:px-6 sm:pt-4 sm:pb-12">
          <div className="rounded-[24px] sm:rounded-[28px] bg-tint px-6 py-10 sm:px-14 sm:py-16 border border-line/40">
            <h1 className="display-optical max-w-[18ch] font-display text-[2.1rem] font-bold leading-[1.1] text-ink sm:text-[3.25rem] sm:font-extrabold sm:leading-[1.08]">
              {t("home.hero_title")}
            </h1>
            <p className="mt-4 sm:mt-5 max-w-[54ch] text-[15px] sm:text-lg leading-[1.6] text-muted">
              {t("home.hero_body")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              {featured && (
                <Link
                  href={`/${locale}/test/${featured.id}`}
                  className="w-full sm:w-auto text-center rounded-(--radius-control) bg-accent px-6 py-3 text-[15px] font-semibold text-on-accent transition-opacity hover:opacity-90 motion-reduce:transition-none shadow-sm cursor-pointer"
                >
                  {t("home.hero_cta")}
                </Link>
              )}
              <Link
                href={`/${locale}/test/feminist-perspectives`}
                className="w-full sm:w-auto text-center rounded-(--radius-control) border border-line bg-surface px-5 py-3 text-[14px] font-semibold text-ink hover:border-accent hover:text-accent transition-colors shadow-2xs cursor-pointer"
              >
                🔥 How Much of a Feminist Are You?
              </Link>
              <Link
                href="#trending"
                className="w-full sm:w-auto text-center text-[14px] font-medium text-muted underline-offset-4 hover:text-ink hover:underline py-2"
              >
                Browse Trending ↓
              </Link>
            </div>
          </div>
        </section>

        {/* Trending & Most Popular Showcase */}
        <section id="trending" className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6 border-b border-line">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-red-500" />
                <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                  Trending This Week
                </span>
              </div>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Most Popular Compasses
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted font-mono">
              Visual 2D archetype maps — compare side-by-side with friends
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRENDING_CONFIG.map((item) => {
              const test = available.find((t) => t.id === item.id);
              if (!test) return null;

              return (
                <Link
                  key={test.id}
                  href={`/${locale}/test/${test.id}`}
                  className="group flex flex-col justify-between rounded-xl border border-line bg-surface p-5 transition-all hover:border-accent hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${item.tagStyle}`}
                      >
                        {item.tag}
                      </span>
                      <span className="text-[11px] font-mono text-muted">
                        {item.axis}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-[17px] font-bold leading-snug text-ink group-hover:text-accent transition-colors">
                      {t(test.titleKey)}
                    </h3>

                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted line-clamp-2">
                      {t(test.summaryKey)}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-line/60 flex items-center justify-between text-xs">
                    <span className="font-mono text-muted text-[11px]">
                      ~{test.minutes} min · 2D Compass
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-accent group-hover:translate-x-0.5 transition-transform">
                      Take Test <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 5 Thematic Clusters Catalogue */}
        <CatalogueSection clusters={clusters} locale={locale} />

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

      <SiteFooter locale={locale} />
    </div>
  );
}
