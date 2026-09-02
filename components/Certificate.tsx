import { getTranslations } from "next-intl/server";

import { CompassRose } from "@/components/CompassRose";
import { ResultGrid } from "@/components/ResultGrid";
import { cellFor } from "@/lib/scoring";
import type { TestConfig } from "@/lib/types";

/**
 * A4 certificate — §7.
 *
 * Every directional property here is logical (`padding-inline`,
 * `margin-block-start`, `text-align: start`, `border-inline-start`) and never
 * left/right, so the sheet mirrors correctly the moment `ar` is added rather
 * than needing a second stylesheet. Same ResultGrid the web result uses.
 *
 * The name is optional and supplied per render. It is never stored (§2), so
 * the sheet asserts only that these answers produced this reading — not that
 * anyone verified who typed them.
 */

const readout = (v: number) => (v * 10).toFixed(1);

export async function Certificate({
  config,
  x,
  y,
  name,
}: {
  config: TestConfig;
  x: number;
  y: number;
  name?: string | null;
}) {
  const t = await getTranslations();
  const cell = cellFor(x, y, config);

  return (
    <div className="certificate-sheet bg-canvas text-ink">
      <div className="flex h-full flex-col items-center justify-between">
        <header className="w-full text-center">
          <p
            className="font-mono text-accent uppercase"
            style={{ fontSize: 9, letterSpacing: "0.42em" }}
          >
            STANDPOINTLY
          </p>
          <h1
            className="font-display font-bold text-ink"
            style={{
              fontSize: 19,
              letterSpacing: "0.2em",
              marginBlockStart: 10,
              textTransform: "uppercase",
            }}
          >
            {t(config.title_key)}
          </h1>
          <div
            className="bg-accent"
            style={{
              blockSize: 1,
              inlineSize: 132,
              marginInline: "auto",
              marginBlockStart: 14,
              opacity: 0.55,
            }}
          />
        </header>

        <div style={{ inlineSize: 392, marginBlock: 4 }}>
          <ResultGrid
            config={config}
            x={x}
            y={y}
            animate={false}
            maxWidth={392}
          />
        </div>

        <section className="w-full text-center">
          {name && (
            <div style={{ marginBlockEnd: 18 }}>
              <p
                className="font-mono text-muted uppercase"
                style={{ fontSize: 8, letterSpacing: "0.34em" }}
              >
                {t("certificate.issued_to")}
              </p>
              <p
                className="font-display text-ink"
                style={{ fontSize: 22, marginBlockStart: 5 }}
              >
                {name}
              </p>
            </div>
          )}

          <p
            className="font-mono text-accent uppercase"
            style={{ fontSize: 10, letterSpacing: "0.28em" }}
          >
            {t(config.axes.x.name_key)} {readout(x)} ·{" "}
            {t(config.axes.y.name_key)} {readout(y)}
          </p>
          <h2
            className="display-optical font-display font-extrabold text-ink"
            style={{ fontSize: 40, marginBlockStart: 8 }}
          >
            {t(cell.name_key)}
          </h2>
          <p
            className="font-display text-muted"
            style={{
              fontSize: 10.5,
              lineHeight: 1.72,
              maxInlineSize: "62ch",
              marginInline: "auto",
              marginBlockStart: 14,
              textAlign: "start",
            }}
          >
            {t(cell.description_key)}
          </p>
        </section>

        <footer
          className="flex w-full items-center justify-between"
          style={{ gap: 18 }}
        >
          <p
            className="font-mono text-muted"
            style={{ fontSize: 7.5, lineHeight: 1.7, maxInlineSize: "48ch", textAlign: "start" }}
          >
            {t("certificate.footnote")}
          </p>

          {/* The rose earns its keep here — as the seal, not as the result. */}
          <svg
            width="62"
            height="62"
            viewBox="-70 -70 140 140"
            style={{ flexShrink: 0, opacity: 0.5 }}
            aria-hidden="true"
          >
            <circle
              r="66"
              fill="none"
              stroke="var(--color-line)"
              strokeWidth="1"
            />
            <g transform="scale(0.44)">
              <CompassRose fill="var(--color-accent)" />
            </g>
          </svg>
        </footer>
      </div>
    </div>
  );
}
