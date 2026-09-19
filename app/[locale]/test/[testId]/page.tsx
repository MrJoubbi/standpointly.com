import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { QuestionFlow } from "@/components/QuestionFlow";
import { SiteHeader } from "@/components/SiteHeader";
import { JsonLd, buildQuizJsonLd } from "@/components/JsonLd";
import { listTestIds, loadTest } from "@/lib/config";
import { routing } from "@/i18n/routing";
import type { TestConfig } from "@/lib/types";

const SITE_URL = process.env.SITE_URL ?? "https://standpointly.com";

const TEST_ID_ALIASES: Record<string, string> = {
  "political-ideology": "political",
  "attachment-style": "attachment",
  "relationship-compatibility": "compatibility",
  "relationship-boundaries": "boundaries",
  leadership: "leadership-style",
};

function resolveTestId(id: string): string {
  return TEST_ID_ALIASES[id] ?? id;
}

export function generateStaticParams() {
  const ids = [...listTestIds(), ...Object.keys(TEST_ID_ALIASES)];
  return routing.locales.flatMap((locale) =>
    ids.map((testId) => ({ locale, testId })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; testId: string }>;
}): Promise<Metadata> {
  const { locale, testId: rawTestId } = await params;
  const testId = resolveTestId(rawTestId);
  let config: TestConfig;
  try {
    config = loadTest(testId);
  } catch {
    return {};
  }

  const t = await getTranslations({ locale });
  const title = t(config.title_key);
  const description = t(config.summary_key);
  const canonical = `/${locale}/test/${testId}`;
  const xAxisName = t(config.axes.x.name_key);
  const yAxisName = t(config.axes.y.name_key);

  const testKeywords = [
    title.toLowerCase(),
    `${title.toLowerCase()} test`,
    `${title.toLowerCase()} assessment`,
    `${xAxisName.toLowerCase()} vs ${yAxisName.toLowerCase()}`,
    "standpoint mapping",
    "2d coordinate psychometrics",
    "free scientific assessment",
    "privacy-first personality test",
  ];

  return {
    title: `${title} — Take Free Assessment | Standpointly`,
    description,
    keywords: testKeywords,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/test/${testId}`]),
      ),
    },
    openGraph: {
      title: `${title} — Free 2D Psychometric Assessment | Standpointly`,
      description,
      url: `${SITE_URL}${canonical}`,
      siteName: "Standpointly",
      type: "website",
      images: [
        {
          url: `/api/og/${testId}?x=0.00&y=0.00&format=og`,
          width: 1200,
          height: 630,
          alt: `${title} 2D Coordinate Grid`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Standpointly`,
      description,
      images: [`/api/og/${testId}?x=0.00&y=0.00&format=og`],
    },
  };
}

export default async function TestPage({
  params,
}: {
  params: Promise<{ locale: string; testId: string }>;
}) {
  const { locale, testId: rawTestId } = await params;
  const testId = resolveTestId(rawTestId);
  setRequestLocale(locale);

  let config: TestConfig;
  try {
    config = loadTest(testId);
  } catch {
    notFound();
  }

  const t = await getTranslations();
  const title = t(config.title_key);
  const description = t(config.summary_key);
  const quizJsonLd = buildQuizJsonLd({
    testId,
    title,
    description,
    questionCount: config.questions.length,
    url: `${SITE_URL}/${locale}/test/${testId}`,
    baseUrl: SITE_URL,
  });

  return (
    <div className="flex min-h-[100svh] flex-col">
      <JsonLd data={quizJsonLd} />
      <SiteHeader locale={locale} />
      <QuestionFlow config={config} locale={locale} />
    </div>
  );
}
