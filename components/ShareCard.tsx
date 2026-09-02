import { getTranslations } from "next-intl/server";

import { ResultGrid } from "@/components/ResultGrid";
import { cellFor } from "@/lib/scoring";
import { SHARE_FORMATS, type ShareFormat } from "@/lib/share";
import type { TestConfig } from "@/lib/types";

/**
 * The card behind every share image and the certificate — §7.
 *
 * Laid out with CSS logical properties (`margin-inline`, `text-align: start`)
 * rather than left/right, so the whole thing mirrors for free when `ar`
 * lands. Sizes are absolute px because the output is a fixed-dimension
 * screenshot, not a responsive page.
 */

const readout = (v: number) => (v * 10).toFixed(1);

export async function ShareCard({
  config,
  x,
  y,
  format,
}: {
  config: TestConfig;
  x: number;
  y: number;
  format: ShareFormat;
}) {
  const t = await getTranslations();
  const cell = cellFor(x, y, config);
  const { width, height } = SHARE_FORMATS[format];
  const landscape = format === "og";

  const gridWidth = landscape ? 540 : format === "story" ? 900 : 850;

  return (
    <div
      className="flex items-center gap-14 overflow-hidden bg-canvas"
      style={{
        width,
        height,
        flexDirection: landscape ? "row" : "column",
        justifyContent: "center",
        paddingInline: landscape ? 64 : 80,
      }}
    >
      <div style={{ width: gridWidth, flexShrink: 0 }}>
        <ResultGrid
          config={config}
          x={x}
          y={y}
          animate={false}
          maxWidth={gridWidth}
        />
      </div>

      <div
        style={{
          textAlign: landscape ? "start" : "center",
          maxInlineSize: landscape ? 440 : 860,
        }}
      >
        <p
          className="font-mono text-accent uppercase"
          style={{ letterSpacing: "0.28em", fontSize: landscape ? 17 : 24 }}
        >
          {t(config.axes.x.name_key)} {readout(x)} · {t(config.axes.y.name_key)}{" "}
          {readout(y)}
        </p>

        <h1
          className="display-optical font-display font-extrabold text-ink"
          style={{
            fontSize: landscape ? 66 : format === "story" ? 104 : 88,
            lineHeight: 1.05,
            marginBlockStart: 14,
          }}
        >
          {t(cell.name_key)}
        </h1>

        <p
          className="font-medium text-muted"
          style={{
            fontSize: landscape ? 21 : 30,
            lineHeight: 1.5,
            marginBlockStart: 20,
          }}
        >
          {t(config.title_key)}
        </p>

        <p
          className="font-mono text-accent"
          style={{
            fontSize: landscape ? 15 : 22,
            letterSpacing: "0.2em",
            marginBlockStart: landscape ? 34 : 46,
          }}
        >
          {t("landing.title")}
        </p>
      </div>
    </div>
  );
}
