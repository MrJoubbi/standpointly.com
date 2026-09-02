/**
 * Certificate PDF — §7. A4, printed by Chromium.
 *
 * Chromium and not @react-pdf/renderer: the certificate has to render in the
 * user's chosen language, that list will include Arabic, and
 * @react-pdf/renderer leaves Arabic letters disconnected. Non-negotiable (§2).
 */

import { NextResponse } from "next/server";

import { withPage } from "@/lib/browser";
import { loadTest } from "@/lib/config";
import { cleanName } from "@/lib/name";
import { parseResult } from "@/lib/result";
import { renderOrigin } from "@/lib/share";
import { routing } from "@/i18n/routing";
import type { TestConfig } from "@/lib/types";

export const runtime = "nodejs";

/** A4 at 96dpi. Matches `.certificate-sheet` exactly. */
const A4 = { width: 794, height: 1123 };

/**
 * POST, so the name never appears in a URL — query strings end up in browser
 * history, `Referer` headers and Nginx access logs, and this is the one piece
 * of identifying text the product touches.
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ testId: string }> },
) {
  let name: string | null = null;
  try {
    name = cleanName((await request.formData()).get("name"));
  } catch {
    // Not form-encoded — treat as an unnamed certificate rather than failing.
  }
  return render(request, context, name);
}

/** Unnamed certificates stay shareable as a plain link. */
export async function GET(
  request: Request,
  context: { params: Promise<{ testId: string }> },
) {
  return render(request, context, null);
}

async function render(
  request: Request,
  { params }: { params: Promise<{ testId: string }> },
  name: string | null,
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

  const requested = url.searchParams.get("locale") ?? routing.defaultLocale;
  const locale = (routing.locales as readonly string[]).includes(requested)
    ? requested
    : routing.defaultLocale;

  const { x, y, version } = parsed;
  const target = new URL(
    `/${locale}/certificate/${testId}`,
    renderOrigin(request.url),
  );
  target.searchParams.set("x", x.toFixed(4));
  target.searchParams.set("y", y.toFixed(4));
  target.searchParams.set("v", String(version));
  // Localhost-to-localhost only: this URL never leaves the machine, so the
  // name is not exposed to Nginx logs or to the network.
  if (name) target.searchParams.set("name", name);

  let pdf: Buffer;
  try {
    pdf = await withPage(target.toString(), A4, (page) =>
      page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: "0", right: "0", bottom: "0", left: "0" },
      }),
    );
  } catch (error) {
    console.error("pdf render failed for target:", target.toString(), error);
    return NextResponse.json(
      {
        error: "render failed",
        details: error instanceof Error ? error.message : String(error),
        target: target.toString(),
      },
      { status: 500 },
    );
  }

  const filename = `${testId}-${x.toFixed(2)}-${y.toFixed(2)}.pdf`;
  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
