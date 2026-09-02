import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ResultGrid } from "@/components/ResultGrid";
import { ResultInsights } from "@/components/ResultInsights";
import { CompareStandpoints } from "@/components/CompareStandpoints";
import { ShareCardActions } from "@/components/ShareCardActions";
import { NextTestBanner } from "@/components/NextTestBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { loadTest } from "@/lib/config";
import { parseResult } from "@/lib/result";
import { cellFor } from "@/lib/scoring";
import type { TestConfig } from "@/lib/types";

/** Readouts are shown on the ±10 scale the grid's ticks use, not ±1. */
const readout = (v: number) => (v * 10).toFixed(1);

/**
 * First sentence, for link unfurls. A 120-word description is the right
 * length on the page and far too long for a preview card, which truncates
 * around 200 characters and does it mid-word.
 */
function summarise(text: string, limit = 200): string {
  if (text.length <= limit) return text;
  const window = text.slice(0, limit);
  const stop = Math.max(window.lastIndexOf(". "), window.lastIndexOf("? "));
  if (stop > 60) return window.slice(0, stop + 1);
  const space = window.lastIndexOf(" ");
  return `${window.slice(0, space > 0 ? space : limit).trimEnd()}…`;
}

/**
 * §7 — the share card is what most people will actually see of this result,
 * since a link posted to WhatsApp or X is unfurled, not clicked, by everyone
 * who scrolls past it.
 */
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; testId: string }>;
  searchParams: Promise<{ x?: string; y?: string; v?: string }>;
}): Promise<Metadata> {
  const { locale, testId } = await params;

  let config: TestConfig;
  try {
    config = loadTest(testId);
  } catch {
    return {};
  }

  const parsed = parseResult(await searchParams, config);
  const t = await getTranslations({ locale });
  if (!parsed.ok) return { title: t("result.invalid_title") };

  const cell = cellFor(parsed.x, parsed.y, config);
  const title = `${t(cell.name_key)} — ${t(config.title_key)}`;
  const description = summarise(t(cell.description_key));

  const image = (format: string) => {
    const q = new URLSearchParams({
      x: parsed.x.toFixed(4),
      y: parsed.y.toFixed(4),
      v: String(parsed.version),
      locale,
      format,
    });
    return `/api/og/${testId}?${q}`;
  };

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/r/${testId}?x=${parsed.x.toFixed(4)}&y=${parsed.y.toFixed(4)}&v=${parsed.version}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale,
      images: [
        { url: image("og"), width: 1200, height: 630 },
        { url: image("square"), width: 1080, height: 1080 },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image("og")],
    },
  };
}

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; testId: string }>;
  searchParams: Promise<{
    x?: string;
    y?: string;
    v?: string;
    x2?: string;
    y2?: string;
    friend?: string;
  }>;
}) {
  const { locale, testId } = await params;
  setRequestLocale(locale);

  let config: TestConfig;
  try {
    config = loadTest(testId);
  } catch {
    notFound();
  }

  const query = await searchParams;
  const t = await getTranslations();
  const parsed = parseResult(query, config);

  if (!parsed.ok) {
    return (
      <main className="mx-auto flex min-h-[70svh] max-w-2xl flex-col justify-center gap-6 px-6 py-16">
        <h1 className="display-optical font-display text-3xl font-extrabold text-ink">
          {t("result.invalid_title")}
        </h1>
        <p className="max-w-md text-[16px] leading-[1.65] text-muted">
          {t("result.invalid_body")}
        </p>
        <Link
          href={`/${locale}/test/${config.id}`}
          className="inline-block self-start rounded-(--radius-control) bg-accent px-6 py-3 text-[15px] font-semibold text-on-accent"
        >
          {t("result.invalid_cta")}
        </Link>
      </main>
    );
  }

  const { x, y, version, stale } = parsed;
  const cell = cellFor(x, y, config);

  // Optional friend comparison from query parameters
  let initialCompare: { x: number; y: number; label: string } | undefined = undefined;
  if (query.x2 && query.y2) {
    const friendX = parseFloat(query.x2);
    const friendY = parseFloat(query.y2);
    if (!isNaN(friendX) && !isNaN(friendY)) {
      initialCompare = {
        x: friendX,
        y: friendY,
        label: query.friend || "Friend",
      };
    }
  }

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto flex w-full max-w-[660px] flex-col gap-9 px-4 pb-24">
        {/* 2D Interactive Grid */}
        <ResultGrid
          config={config}
          x={x}
          y={y}
          comparison={initialCompare}
        />

        {/* Readout Header */}
        <div className="text-center">
          <p className="font-mono text-[13px] tracking-[0.18em] text-accent uppercase">
            {t("result.reading", {
              axis: t(config.axes.x.name_key),
              value: readout(x),
            })}
            {" · "}
            {t("result.reading", {
              axis: t(config.axes.y.name_key),
              value: readout(y),
            })}
          </p>
          <h1 className="display-optical mt-3 font-display text-4xl font-extrabold text-ink sm:text-5xl">
            {t(cell.name_key)}
          </h1>
        </div>

        {/* Analytical Archetype Description */}
        <p className="mx-auto max-w-[56ch] rounded-(--radius-card) bg-tint px-6 py-6 text-start text-[16px] leading-[1.7] text-muted">
          {t(cell.description_key)}
        </p>

        {/* Strengths, Blindspots & Communication Advice */}
        <ResultInsights testId={config.id} cellId={cell.id} />

        {/* Compare Standpoints with a Friend */}
        <CompareStandpoints
          config={config}
          userX={x}
          userY={y}
          initialCompareX={initialCompare?.x}
          initialCompareY={initialCompare?.y}
          initialFriendName={initialCompare?.label}
        />

        {/* Share & Export Hub (Instant Social Cards + PDF) */}
        <ShareCardActions
          testId={config.id}
          testTitle={t(config.title_key)}
          cellName={t(cell.name_key)}
          cellDescription={t(cell.description_key)}
          xAxisName={t(config.axes.x.name_key)}
          yAxisName={t(config.axes.y.name_key)}
          xNegLabel={t(config.axes.x.negative_label_key)}
          xPosLabel={t(config.axes.x.positive_label_key)}
          yNegLabel={t(config.axes.y.negative_label_key)}
          yPosLabel={t(config.axes.y.positive_label_key)}
          x={x}
          y={y}
          version={version}
          locale={locale}
          labels={{
            downloadPdf: t("certificate.download"),
            nameLabel: t("certificate.name_label"),
            namePlaceholder: t("certificate.name_placeholder"),
            nameNote: t("certificate.name_note"),
          }}
        />

        {/* Next Assessment Discovery Banner */}
        <NextTestBanner currentTestId={config.id} locale={locale} />

        {/* Scoring Method Link */}
        <div className="flex justify-center pt-2">
          <Link
            href={`/${locale}/method`}
            className="rounded-(--radius-control) border border-line px-5 py-2.5 text-[15px] font-medium text-muted hover:border-accent hover:text-accent transition-colors"
          >
            {t("result.how_scored")}
          </Link>
        </div>

        {/* Stale version notice */}
        {stale && (
          <p className="text-center text-[13px] text-muted">
            {t("result.version_notice", { version })}
          </p>
        )}
      </main>
    </>
  );
}
