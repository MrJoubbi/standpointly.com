import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { ShareCard } from "@/components/ShareCard";
import { loadTest } from "@/lib/config";
import { parseResult } from "@/lib/result";
import { isShareFormat } from "@/lib/share";
import type { TestConfig } from "@/lib/types";

/**
 * The render target Playwright screenshots — not a page for humans, though it
 * is viewable in a browser, which makes card layout debuggable without a
 * screenshot loop.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function SharePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; testId: string }>;
  searchParams: Promise<{ x?: string; y?: string; v?: string; format?: string }>;
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
  const format = query.format ?? "og";
  if (!parsed.ok || !isShareFormat(format)) notFound();

  return (
    <ShareCard config={config} x={parsed.x} y={parsed.y} format={format} />
  );
}
