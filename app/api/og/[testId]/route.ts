/**
 * Share image — §7. 1200×630, 1080×1080 and 1080×1920 from x, y and locale,
 * cached 24h under a hash of exactly those.
 */

import { NextResponse } from "next/server";

import { withPage } from "@/lib/browser";
import { loadTest } from "@/lib/config";
import { parseResult } from "@/lib/result";
import {
  isShareFormat,
  readCached,
  renderOrigin,
  SHARE_FORMATS,
  shareKey,
  writeCached,
} from "@/lib/share";
import { routing } from "@/i18n/routing";
import type { TestConfig } from "@/lib/types";

// Chromium cannot run on the edge, and the disk cache needs a filesystem.
export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ testId: string }> },
) {
  const { testId } = await params;
  const url = new URL(request.url);

  let config: TestConfig;
  try {
    config = loadTest(testId);
  } catch {
    return NextResponse.json({ error: "unknown test" }, { status: 404 });
  }

  const parsed = parseResult(
    {
      x: url.searchParams.get("x") ?? undefined,
      y: url.searchParams.get("y") ?? undefined,
      v: url.searchParams.get("v") ?? undefined,
    },
    config,
  );
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.reason }, { status: 400 });
  }

  const format = url.searchParams.get("format") ?? "og";
  if (!isShareFormat(format)) {
    return NextResponse.json(
      { error: "unknown format", allowed: Object.keys(SHARE_FORMATS) },
      { status: 400 },
    );
  }

  const requested = url.searchParams.get("locale") ?? routing.defaultLocale;
  const locale = (routing.locales as readonly string[]).includes(requested)
    ? requested
    : routing.defaultLocale;

  const { x, y, version } = parsed;
  const key = shareKey({ testId, locale, format, x, y, version });

  const headers = {
    "Content-Type": "image/png",
    "Cache-Control": "public, max-age=86400, s-maxage=86400",
  };

  const cached = await readCached(key);
  if (cached) {
    return new NextResponse(new Uint8Array(cached), {
      headers: { ...headers, "X-Cache": "HIT" },
    });
  }

  const target = new URL(
    `/${locale}/share/${testId}`,
    renderOrigin(request.url),
  );
  target.searchParams.set("x", x.toFixed(4));
  target.searchParams.set("y", y.toFixed(4));
  target.searchParams.set("v", String(version));
  target.searchParams.set("format", format);

  let png: Buffer;
  try {
    png = await withPage(target.toString(), SHARE_FORMATS[format], (page) =>
      page.screenshot({ type: "png" }),
    );
  } catch (error) {
    console.error("og render failed", error);
    return NextResponse.json({ error: "render failed" }, { status: 500 });
  }

  await writeCached(key, png);
  return new NextResponse(new Uint8Array(png), {
    headers: { ...headers, "X-Cache": "MISS" },
  });
}
