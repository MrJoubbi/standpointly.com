import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Certificate } from "@/components/Certificate";
import { CertificatePrintBar } from "@/components/CertificatePrintBar";
import { loadTest } from "@/lib/config";
import { cleanName } from "@/lib/name";
import { parseResult } from "@/lib/result";
import { cellFor } from "@/lib/scoring";
import type { TestConfig } from "@/lib/types";

/** Print target for the PDF route. Viewable in a browser for layout work. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function CertificatePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; testId: string }>;
  searchParams: Promise<{ x?: string; y?: string; v?: string; name?: string }>;
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
  const parsed = parseResult(query, config);
  if (!parsed.ok) notFound();

  const t = await getTranslations({ locale });
  const cell = cellFor(parsed.x, parsed.y, config);

  return (
    <div className="flex min-h-screen flex-col items-center bg-surface">
      <CertificatePrintBar
        testId={config.id}
        testTitle={t(config.title_key)}
        cellName={t(cell.name_key)}
        cellDescription={t(cell.description_key)}
        xAxisName={t(config.axes.x.name_key)}
        yAxisName={t(config.axes.y.name_key)}
        x={parsed.x}
        y={parsed.y}
        name={cleanName(query.name)}
        locale={locale}
        version={parsed.version}
      />
      <div className="my-auto py-8">
        <Certificate
          config={config}
          x={parsed.x}
          y={parsed.y}
          name={cleanName(query.name)}
        />
      </div>
    </div>
  );
}
