import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Prose, Section } from "@/components/Prose";
import { JsonLd, buildArticleJsonLd } from "@/components/JsonLd";
import { loadTest } from "@/lib/config";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.SITE_URL ?? "https://standpointly.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const title = t("method.title");
  const description = t("method.lede");
  const canonical = `/${locale}/method`;

  return {
    title,
    description,
    keywords: [
      "psychometric scoring methodology",
      "political compass algorithm",
      "2d coordinate psychometrics",
      "question weight loading",
      "attachment style scoring formula",
    ],
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/method`]),
      ),
    },
    openGraph: {
      title: `${title} — Standpointly`,
      description,
      url: `${SITE_URL}${canonical}`,
    },
  };
}

export default async function MethodPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  // Read from the live config so this page cannot describe a scoring model
  // the engine no longer uses.
  const config = loadTest("political");
  const xId = config.axes.x.id;
  const yId = config.axes.y.id;
  const loads = (axis: string, other: string) =>
    config.questions.filter(
      (q) => (q.w[axis] ?? 0) !== 0 && (q.w[other] ?? 0) === 0,
    ).length;
  const cross = config.questions.filter(
    (q) => (q.w[xId] ?? 0) !== 0 && (q.w[yId] ?? 0) !== 0,
  ).length;

  const values = {
    questions: config.questions.length,
    xAxis: t(config.axes.x.name_key).toLowerCase(),
    yAxis: t(config.axes.y.name_key).toLowerCase(),
    xCount: loads(xId, yId),
    yCount: loads(yId, xId),
    crossCount: cross,
    xMax: config.axes.x.max_raw,
    yMax: config.axes.y.max_raw,
    gain: config.scoring.gain,
    clamp: config.scoring.clamp,
    band: config.scoring.band,
    bandJustUnder: (config.scoring.band - 0.01).toFixed(2),
    bandJustOver: (config.scoring.band + 0.01).toFixed(2),
  };

  const articleJsonLd = buildArticleJsonLd({
    title: t("method.title"),
    description: t("method.lede"),
    url: `${SITE_URL}/${locale}/method`,
    baseUrl: SITE_URL,
  });

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <Prose locale={locale} title={t("method.title")} lede={t("method.lede")}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Section key={n} title={t(`method.s${n}_title`)}>
            <p>{t(`method.s${n}_body`, values)}</p>
          </Section>
        ))}
      </Prose>
    </>
  );
}
