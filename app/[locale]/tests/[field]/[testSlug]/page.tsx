import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, ShieldCheck, Cpu, SlidersHorizontal, AlertCircle } from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { JsonLd } from "@/components/JsonLd";
import { routing } from "@/i18n/routing";
import {
  FIELDS_DEFINITION,
  findFieldBySlug,
  findInstrument,
  getRelatedInstruments,
  availableTests,
} from "@/lib/catalogue";

const SITE_URL = process.env.SITE_URL ?? "https://standpointly.com";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    FIELDS_DEFINITION.flatMap((field) =>
      field.instruments.map((inst) => ({
        locale,
        field: field.slug,
        testSlug: inst.slug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; field: string; testSlug: string }>;
}): Promise<Metadata> {
  const { locale, field: fieldSlug, testSlug } = await params;
  const match = findInstrument(testSlug);
  if (!match) return {};

  const { instrument, field } = match;
  const t = await getTranslations({ locale });
  const title = `${t(instrument.titleKey)} (Code: ${instrument.code}) — Field ${field.code}: ${field.name}`;
  const description = t(instrument.summaryKey);
  const canonical = `/${locale}/tests/${field.slug}/${instrument.slug}`;

  return {
    title,
    description,
    keywords: [
      t(instrument.titleKey).toLowerCase(),
      `${field.name.toLowerCase()} assessment`,
      `instrument ${instrument.code}`,
      "psychometric test",
      "standpoint mapping",
      ...instrument.dimensions.map((d) => d.toLowerCase()),
    ],
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `/${l}/tests/${field.slug}/${instrument.slug}`,
        ]),
      ),
    },
    openGraph: {
      title: `${title} | Standpointly`,
      description,
      url: `${SITE_URL}${canonical}`,
    },
  };
}

export default async function InstrumentPage({
  params,
}: {
  params: Promise<{ locale: string; field: string; testSlug: string }>;
}) {
  const { locale, field: fieldSlug, testSlug } = await params;
  setRequestLocale(locale);

  const match = findInstrument(testSlug);
  if (!match) {
    notFound();
  }

  const { instrument, field } = match;
  const t = await getTranslations();
  const availableMap = new Map(availableTests().map((t) => [t.id, t]));
  const isAvailable = availableMap.has(instrument.id);
  const availableInfo = availableMap.get(instrument.id);
  const relatedInstruments = getRelatedInstruments(instrument);

  const testHref = isAvailable ? `/${locale}/test/${instrument.id}` : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Assessment",
    name: `${t(instrument.titleKey)} — Standpointly`,
    description: t(instrument.summaryKey),
    identifier: instrument.code,
    url: `${SITE_URL}/${locale}/tests/${field.slug}/${instrument.slug}`,
    isPartOf: {
      "@type": "CollectionPage",
      name: `Field ${field.code}: ${field.name}`,
      url: `${SITE_URL}/${locale}/tests/${field.slug}`,
    },
  };

  return (
    <div className="min-h-[100svh] bg-canvas text-ink">
      <JsonLd data={jsonLd} />
      <SiteHeader locale={locale} />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-[13px] font-mono text-muted">
            <li>
              <Link href={`/${locale}`} className="hover:text-ink transition-colors">
                Home
              </Link>
            </li>
            <li className="select-none text-line-strong">/</li>
            <li>
              <Link
                href={`/${locale}/tests/${field.slug}`}
                className="hover:text-ink transition-colors"
              >
                FIELD {field.code} — {field.name}
              </Link>
            </li>
            <li className="select-none text-line-strong">/</li>
            <li className="text-accent font-semibold">{t(instrument.titleKey)}</li>
          </ol>
        </nav>

        {/* 10. Instrument Header Specification */}
        <header className="rounded-2xl border border-line bg-surface p-6 sm:p-10 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-semibold tracking-wider text-muted">
                CODE: {instrument.code}
              </span>
              <span className="text-muted/40">·</span>
              <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                FIELD {field.code} — {field.name}
              </span>
            </div>

            <span
              className={[
                "rounded px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider uppercase",
                isAvailable
                  ? "bg-accent text-on-accent"
                  : "bg-line/60 text-muted",
              ].join(" ")}
            >
              {isAvailable ? "STANDARD INSTRUMENT · AVAILABLE" : "IN DEVELOPMENT"}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">
            {t(instrument.titleKey)}
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-muted leading-relaxed">
            {t(instrument.summaryKey)}
          </p>

          {/* Action CTA Block */}
          <div className="mt-8 pt-6 border-t border-line/60 flex flex-wrap items-center justify-between gap-4">
            {isAvailable ? (
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={testHref!}
                  id="btn-begin-assessment"
                  className="rounded-xl bg-accent px-6 py-3.5 text-[15px] font-semibold text-on-accent hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
                >
                  Begin Assessment <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="font-mono text-xs text-muted">
                  {availableInfo?.questionCount} statements · ~{availableInfo?.minutes} min · 100% private
                </span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <span className="h-2 w-2 rounded-full bg-accent/60" />
                  <span className="font-mono text-xs">
                    Phase: Statement calibration & construct validation
                  </span>
                </div>
                <Link
                  href={`/${locale}/test/political`}
                  className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                >
                  Try Available Political Test <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Non-Clinical Notice for Wellbeing instruments */}
        {instrument.nonClinicalNotice && (
          <aside className="mt-6 rounded-xl border border-line bg-surface/60 p-5 flex items-start gap-3.5 text-sm text-muted">
            <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <strong className="text-ink font-semibold block mb-0.5">
                Self-Reflection & Psychometric Assessment Notice
              </strong>
              <p className="text-[13.5px] leading-relaxed">
                This instrument is designed exclusively for self-reflection and cognitive-behavioral pattern mapping. It is not a clinical diagnostic tool and does not provide medical evaluation.
              </p>
            </div>
          </aside>
        )}

        {/* Theoretical Framework & Research Foundation */}
        <section className="mt-10 rounded-2xl border border-line bg-surface/40 p-6 sm:p-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent mb-3">
            Theoretical Foundation & Methodology
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-ink/90">
            {instrument.theoreticalFoundation ??
              "Engineered according to modern psychometric standards with orthogonal axis evaluation and balanced item scoring to prevent acquiescence bias."}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 pt-6 border-t border-line/60">
            <div className="rounded-xl border border-line/60 bg-surface p-4">
              <span className="font-mono text-[11px] text-muted uppercase block">
                Interaction System
              </span>
              <p className="mt-1 font-display font-semibold text-ink text-sm">
                1–5 Likert Scale
              </p>
              <p className="text-xs text-muted mt-0.5">
                Neutral midpoint; zero-sum cancel weights
              </p>
            </div>

            <div className="rounded-xl border border-line/60 bg-surface p-4">
              <span className="font-mono text-[11px] text-muted uppercase block">
                Coordinate Engine
              </span>
              <p className="mt-1 font-display font-semibold text-ink text-sm">
                Multidimensional Profile
              </p>
              <p className="text-xs text-muted mt-0.5">
                Continuous coordinate placement, not binary labels
              </p>
            </div>

            <div className="rounded-xl border border-line/60 bg-surface p-4">
              <span className="font-mono text-[11px] text-muted uppercase block">
                Data Sovereignty
              </span>
              <p className="mt-1 font-display font-semibold text-ink text-sm">
                100% Client-Side
              </p>
              <p className="text-xs text-muted mt-0.5">
                No database storage, accounts, or trackers
              </p>
            </div>
          </div>
        </section>

        {/* Measured Dimensions */}
        <section className="mt-10 rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
              Construct Dimensions
            </h2>
            <span className="font-mono text-xs text-muted">
              {instrument.dimensions.length} Core Dimensions
            </span>
          </div>

          <p className="text-sm text-muted mb-5">
            This instrument maps respondent positions across the following distinct psychometric sub-dimensions:
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {instrument.dimensions.map((dim, idx) => (
              <div
                key={dim}
                className="flex items-start gap-3 rounded-xl border border-line/60 bg-canvas p-4"
              >
                <span className="font-mono text-xs font-bold text-accent tabular-nums mt-0.5">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-sm text-ink">
                    {dim}
                  </h3>
                  <p className="text-xs text-muted mt-0.5">
                    Evaluated through bidirectional Likert statements
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 14. Internal Linking: Related Instruments in this Field */}
        {relatedInstruments.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
                Related Instruments in this Topical Cluster
              </h2>
              <Link
                href={`/${locale}/tests/${field.slug}`}
                className="text-xs font-semibold text-accent hover:underline"
              >
                View all in Field {field.code} →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {relatedInstruments.map((rel) => {
                const relIsAvailable = availableMap.has(rel.id);
                return (
                  <Link
                    key={rel.id}
                    href={`/${locale}/tests/${rel.fieldSlug}/${rel.slug}`}
                    className="group flex flex-col justify-between rounded-xl border border-line bg-surface p-5 transition-all hover:border-accent hover:shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] text-muted">
                          CODE: {rel.code}
                        </span>
                        <span
                          className={[
                            "rounded px-1.5 py-0.2 font-mono text-[9px] font-semibold uppercase",
                            relIsAvailable
                              ? "bg-accent/10 text-accent"
                              : "bg-line/50 text-muted",
                          ].join(" ")}
                        >
                          {relIsAvailable ? "AVAILABLE" : "IN DEVELOPMENT"}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-base font-bold text-ink group-hover:text-accent transition-colors">
                        {t(rel.titleKey)}
                      </h3>
                      <p className="mt-1 text-xs text-muted line-clamp-2">
                        {t(rel.summaryKey)}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-line/40 flex items-center justify-between text-[11px] text-muted group-hover:text-ink">
                      <span className="font-mono">FIELD {rel.fieldCode}</span>
                      <span className="flex items-center gap-1 font-semibold text-accent">
                        Explore <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/tests/${field.slug}`}
            className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Return to Field {field.code}: {field.name}
          </Link>
        </div>
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
