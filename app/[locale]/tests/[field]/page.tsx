import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { JsonLd } from "@/components/JsonLd";
import { routing } from "@/i18n/routing";
import {
  FIELDS_DEFINITION,
  findFieldBySlug,
  availableTests,
} from "@/lib/catalogue";

const SITE_URL = process.env.SITE_URL ?? "https://standpointly.com";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    FIELDS_DEFINITION.map((field) => ({
      locale,
      field: field.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; field: string }>;
}): Promise<Metadata> {
  const { locale, field: fieldSlug } = await params;
  const fieldDef = findFieldBySlug(fieldSlug);
  if (!fieldDef) return {};

  const t = await getTranslations({ locale });
  const title = `${fieldDef.name} — Field ${fieldDef.code} Assessments`;
  const description = `${fieldDef.subtitle}. ${t(fieldDef.descriptionKey)}`;
  const canonical = `/${locale}/tests/${fieldDef.slug}`;

  return {
    title,
    description,
    keywords: [
      `${fieldDef.name.toLowerCase()} tests`,
      `field ${fieldDef.code}`,
      "psychometric instruments",
      "standpointly assessment",
      "personality traits",
      "2d coordinate mapping",
    ],
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/tests/${fieldDef.slug}`]),
      ),
    },
    openGraph: {
      title: `${title} | Standpointly`,
      description,
      url: `${SITE_URL}${canonical}`,
      siteName: "Standpointly",
      type: "website",
      images: [
        {
          url: `/api/og/${fieldDef.instruments[0]?.id ?? "big-five"}?x=0.00&y=0.00&format=og`,
          width: 1200,
          height: 630,
          alt: `Field ${fieldDef.code}: ${fieldDef.name} Overview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Standpointly`,
      description,
      images: [
        `/api/og/${fieldDef.instruments[0]?.id ?? "big-five"}?x=0.00&y=0.00&format=og`,
      ],
    },
  };
}

export default async function FieldPage({
  params,
}: {
  params: Promise<{ locale: string; field: string }>;
}) {
  const { locale, field: fieldSlug } = await params;
  setRequestLocale(locale);

  const fieldDef = findFieldBySlug(fieldSlug);
  if (!fieldDef) {
    notFound();
  }

  const t = await getTranslations();
  const available = new Set(availableTests().map((t) => t.id));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `Field ${fieldDef.code}: ${fieldDef.name} — Standpointly`,
        description: t(fieldDef.descriptionKey),
        url: `${SITE_URL}/${locale}/tests/${fieldDef.slug}`,
        hasPart: fieldDef.instruments.map((inst) => ({
          "@type": "Assessment",
          name: t(inst.titleKey),
          description: t(inst.summaryKey),
          identifier: inst.code,
          url: `${SITE_URL}/${locale}/tests/${fieldDef.slug}/${inst.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `Field ${fieldDef.code}: ${fieldDef.name}`,
            item: `${SITE_URL}/${locale}/tests/${fieldDef.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-[100svh] bg-canvas text-ink">
      <JsonLd data={jsonLd} />
      <SiteHeader locale={locale} />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-[13px] font-mono text-muted">
            <li>
              <Link href={`/${locale}`} className="hover:text-ink transition-colors">
                Home
              </Link>
            </li>
            <li className="select-none text-line-strong">/</li>
            <li>
              <Link href={`/${locale}#catalogue`} className="hover:text-ink transition-colors">
                Fields
              </Link>
            </li>
            <li className="select-none text-line-strong">/</li>
            <li className="text-accent font-semibold">
              FIELD {fieldDef.code}
            </li>
          </ol>
        </nav>

        {/* 11. Field Header Hierarchy */}
        <header className="rounded-2xl border border-line bg-surface/60 p-6 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
              FIELD {fieldDef.code} · {fieldDef.instruments.length} STANDARD INSTRUMENTS
            </span>
          </div>

          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">
            {fieldDef.name}
          </h1>

          <p className="mt-2 text-lg sm:text-xl font-medium text-ink/85">
            {fieldDef.subtitle}
          </p>

          <p className="mt-4 max-w-3xl text-[15px] sm:text-[16px] text-muted leading-relaxed">
            {t(fieldDef.descriptionKey)}
          </p>

          {/* Quick stats indicator */}
          <div className="mt-8 pt-6 border-t border-line/60 flex flex-wrap items-center gap-6 text-[12px] font-mono text-muted">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span>Standard 1–5 Likert scoring model</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span>Zero-balanced multidimensional axes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span>100% private in-browser computation</span>
            </div>
          </div>
        </header>

        {/* 10. Instrument Cards Grid */}
        <section className="mt-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
              Standard Instruments in this Field
            </h2>
            <span className="font-mono text-xs text-muted">
              {fieldDef.instruments.length} Instruments
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {fieldDef.instruments.map((inst) => {
              const isAvailable = available.has(inst.id);
              const testHref = isAvailable
                ? `/${locale}/test/${inst.id}`
                : `/${locale}/tests/${fieldDef.slug}/${inst.slug}`;

              return (
                <article
                  key={inst.id}
                  id={`field-inst-${inst.id}`}
                  className="flex flex-col justify-between rounded-xl border border-line bg-surface p-6 shadow-xs transition-all hover:border-accent hover:shadow-sm"
                >
                  <div>
                    {/* Top line with code and status */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold tracking-wider text-muted">
                        CODE: {inst.code}
                      </span>
                      <span
                        className={[
                          "rounded px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase",
                          isAvailable
                            ? "bg-accent text-on-accent"
                            : "bg-line/60 text-muted",
                        ].join(" ")}
                      >
                        {isAvailable ? "STANDARD INSTRUMENT" : "IN DEVELOPMENT"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 font-display text-xl font-bold text-ink">
                      <Link
                        href={`/${locale}/tests/${fieldDef.slug}/${inst.slug}`}
                        className="hover:text-accent transition-colors"
                      >
                        {t(inst.titleKey)}
                      </Link>
                    </h3>

                    {/* Short description */}
                    <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                      {t(inst.summaryKey)}
                    </p>

                    {/* Dimensions preview */}
                    {inst.dimensions.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-line/40">
                        <span className="font-mono text-[10px] text-muted uppercase tracking-wider block mb-1.5">
                          Measured Dimensions:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {inst.dimensions.map((dim) => (
                            <span
                              key={dim}
                              className="rounded bg-canvas px-2 py-0.5 text-[11px] text-muted border border-line/60"
                            >
                              {dim}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs">
                    {isAvailable ? (
                      <>
                        <Link
                          href={`/${locale}/tests/${fieldDef.slug}/${inst.slug}`}
                          className="font-mono text-[11px] text-muted hover:text-ink transition-colors"
                        >
                          Specification
                        </Link>
                        <Link
                          href={testHref}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 font-semibold text-on-accent hover:opacity-90 transition-opacity"
                        >
                          Begin Test <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </>
                    ) : (
                      <>
                        <span className="font-mono text-[11px] text-muted/70">
                          Research battery
                        </span>
                        <Link
                          href={`/${locale}/tests/${fieldDef.slug}/${inst.slug}`}
                          className="inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:underline"
                        >
                          Instrument Framework <ArrowRight className="h-3 w-3" />
                        </Link>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Future Research Roadmap */}
        {fieldDef.futureRoadmap.length > 0 && (
          <section className="mt-14 rounded-2xl border border-line bg-surface/30 p-6 sm:p-8">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
              Future Research Roadmap · Field {fieldDef.code}
            </h2>
            <p className="mt-2 text-sm text-muted">
              Subsequent measurement constructs currently slated for operational calibration within {fieldDef.name}:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {fieldDef.futureRoadmap.map((topic) => (
                <span
                  key={topic}
                  className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted"
                >
                  {topic}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Explore Other Fields Navigation */}
        <section className="mt-16 pt-10 border-t border-line">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-muted mb-4">
            Explore All Five Fields
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {FIELDS_DEFINITION.map((f) => {
              const isCurrent = f.id === fieldDef.id;
              return (
                <Link
                  key={f.id}
                  href={`/${locale}/tests/${f.slug}`}
                  className={[
                    "p-4 rounded-xl border text-left transition-all",
                    isCurrent
                      ? "border-accent bg-accent/5 font-semibold text-accent"
                      : "border-line bg-surface/60 hover:border-line-strong hover:bg-surface text-ink",
                  ].join(" ")}
                >
                  <span className="font-mono text-[10px] text-muted block uppercase">
                    FIELD {f.code}
                  </span>
                  <span className="text-sm font-bold block mt-1">
                    {f.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-line">
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
