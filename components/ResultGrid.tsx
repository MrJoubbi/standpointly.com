"use client";

import { useEffect, useRef, useState, type DependencyList } from "react";
import { useTranslations } from "next-intl";

import { CompassRose } from "@/components/CompassRose";
import { cellFor } from "@/lib/scoring";
import type { TestConfig } from "@/lib/types";

/**
 * The result visual — §6.
 *
 * An instrument face, not a chart. The plot field is four corner radial
 * gradients rather than four flat quadrants: a hard seam at zero would fight
 * the dividers at ±band. The compass rose is demoted to a 5% watermark — it
 * is the brand mark, not the result.
 *
 * Supports single-point result and dual-point comparative views.
 */

export type Figure = { name: string; x: number; y: number };

/* ------------------------------------------------------------------ */
/*  Geometry                                                           */
/* ------------------------------------------------------------------ */

const X0 = 76;
const Y0 = 44;
const W = 468;
const H = 468;

const px = (x: number) => X0 + ((x + 1) / 2) * W;
const py = (y: number) => Y0 + ((1 - y) / 2) * H;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const stage = (p: number, a: number, b: number) =>
  Math.max(0, Math.min(1, (p - a) / (b - a)));

/* ------------------------------------------------------------------ */
/*  Timeline                                                           */
/* ------------------------------------------------------------------ */

function useTimeline(
  duration: number,
  deps: DependencyList,
  animate: boolean,
): number {
  const [p, setP] = useState(animate ? 0 : 1);
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || reduced) {
      setP(1);
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / duration, 1);
      setP(t);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== undefined) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return p;
}

/* ------------------------------------------------------------------ */
/*  Grid                                                               */
/* ------------------------------------------------------------------ */

export function ResultGrid({
  config,
  x,
  y,
  comparison,
  figures = [],
  animate = true,
  maxWidth = 620,
}: {
  config: TestConfig;
  x: number;
  y: number;
  comparison?: { x: number; y: number; label?: string };
  /** Cap in px. Share cards and the certificate scale it up; the SVG is vector. */
  maxWidth?: number;
  /**
   * Reference placements. Empty until each figure has a stated method and a
   * published source (§9) — never ship invented coordinates for real people.
   */
  figures?: Figure[];
  animate?: boolean;
}) {
  const t = useTranslations();
  const p = useTimeline(1700, [x, y, comparison?.x, comparison?.y, animate], animate);
  const cell = cellFor(x, y, config);
  const compCell = comparison ? cellFor(comparison.x, comparison.y, config) : null;

  const pGrid = stage(p, 0, 0.18);
  const pVert = easeOut(stage(p, 0.16, 0.48));
  const pHorz = easeOut(stage(p, 0.28, 0.6));
  const pDot = stage(p, 0.58, 0.76);
  const pCell = stage(p, 0.72, 1);

  const dx = px(x);
  const dy = py(y);
  const vx = px(0) + (dx - px(0)) * pVert;
  const hy = py(0) + (dy - py(0)) * pHorz;

  const compDx = comparison ? px(comparison.x) : 0;
  const compDy = comparison ? py(comparison.y) : 0;

  // overshoot pop on the dot
  const dotR = 10 * (pDot < 1 ? Math.sin(pDot * Math.PI * 0.5) * 1.25 : 1);

  const band = config.scoring.band;
  const bands = [-band, band];
  const cellX = X0 + (cell.col * W) / 3;
  const cellY = Y0 + (cell.row * H) / 3;

  // Row-major, three per row — the config's own ordering (§4).
  const rows = [0, 1, 2].map((r) => config.cells.slice(r * 3, r * 3 + 3));

  const label = (key: string) => t(key).toUpperCase();

  return (
    <svg
      viewBox="0 0 620 600"
      width="100%"
      style={{ maxWidth, display: "block" }}
      role="img"
      aria-label={t(cell.name_key)}
    >
      <defs>
        {[
          ["g-al", "var(--color-q-auth-left)", "0%", "0%"],
          ["g-ar", "var(--color-q-auth-right)", "100%", "0%"],
          ["g-ll", "var(--color-q-lib-left)", "0%", "100%"],
          ["g-lr", "var(--color-q-lib-right)", "100%", "100%"],
        ].map(([id, c, cx, cy]) => (
          <radialGradient key={id} id={id} cx={cx} cy={cy} r="105%">
            {/* Strength is themed: a light ground needs far less than the dark one. */}
            <stop offset="0%" stopColor={c} stopOpacity="var(--quadrant-alpha)" />
            <stop offset="70%" stopColor={c} stopOpacity="0.04" />
            <stop offset="100%" stopColor={c} stopOpacity="0" />
          </radialGradient>
        ))}
        <clipPath id="plot">
          <rect x={X0} y={Y0} width={W} height={H} rx="3" />
        </clipPath>
        <filter id="dotglow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dotglow2" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* plot field — four corner gradients, no hard quadrant seam */}
      <g clipPath="url(#plot)">
        <rect x={X0} y={Y0} width={W} height={H} fill="var(--color-surface)" />
        {["g-al", "g-ar", "g-ll", "g-lr"].map((id) => (
          <rect
            key={id}
            x={X0}
            y={Y0}
            width={W}
            height={H}
            fill={`url(#${id})`}
          />
        ))}

        {/* compass rose, demoted to a watermark */}
        <g opacity={0.05 * pGrid} transform={`translate(${px(0)} ${py(0)})`}>
          <CompassRose />
        </g>

        {/* active primary cell */}
        <rect
          x={cellX}
          y={cellY}
          width={W / 3}
          height={H / 3}
          fill="var(--color-accent)"
          fillOpacity={0.11 * pCell}
          stroke="var(--color-accent)"
          strokeOpacity={0.85 * pCell}
          strokeWidth="1.75"
        />

        {/* active comparison cell if present */}
        {compCell && (
          <rect
            x={X0 + (compCell.col * W) / 3}
            y={Y0 + (compCell.row * H) / 3}
            width={W / 3}
            height={H / 3}
            fill="var(--color-ink)"
            fillOpacity={0.08 * pCell}
            stroke="var(--color-ink)"
            strokeOpacity={0.5 * pCell}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        )}

        {/* cell dividers at ±band */}
        <g opacity={pGrid}>
          {bands.map((b) => (
            <line
              key={`v${b}`}
              x1={px(b)}
              y1={Y0}
              x2={px(b)}
              y2={Y0 + H}
              stroke="var(--color-ink)"
              strokeOpacity="0.22"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          ))}
          {bands.map((b) => (
            <line
              key={`h${b}`}
              x1={X0}
              y1={py(b)}
              x2={X0 + W}
              y2={py(b)}
              stroke="var(--color-ink)"
              strokeOpacity="0.22"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          ))}
        </g>

        {/* centre axes */}
        <g opacity={pGrid}>
          <line
            x1={px(0)}
            y1={Y0}
            x2={px(0)}
            y2={Y0 + H}
            stroke="var(--color-ink)"
            strokeOpacity="0.3"
          />
          <line
            x1={X0}
            y1={py(0)}
            x2={X0 + W}
            y2={py(0)}
            stroke="var(--color-ink)"
            strokeOpacity="0.3"
          />
        </g>

        {/* cell names */}
        <g opacity={pGrid * 0.9}>
          {rows.map((row, r) =>
            row.map((c, col) => {
              const on = c.id === cell.id;
              const isComp = compCell?.id === c.id;
              return (
                <text
                  key={c.id}
                  x={X0 + (col + 0.5) * (W / 3)}
                  y={Y0 + (r + 0.5) * (H / 3)}
                  fill={
                    on
                      ? "var(--color-accent)"
                      : isComp
                        ? "var(--color-ink)"
                        : "var(--color-muted)"
                  }
                  fillOpacity={on || isComp ? pCell : 0.5}
                  fontWeight={on || isComp ? "600" : "normal"}
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                  letterSpacing="1.6"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {label(c.label_key)}
                </text>
              );
            }),
          )}
        </g>

        {/* reference markers */}
        <g opacity={pCell}>
          {figures.map((f) => (
            <g key={f.name}>
              <circle
                cx={px(f.x)}
                cy={py(f.y)}
                r="3.5"
                fill="var(--color-ink)"
                fillOpacity="0.5"
              />
              <text
                x={px(f.x) + 7}
                y={py(f.y)}
                fill="var(--color-ink)"
                fillOpacity="0.45"
                fontFamily="var(--font-mono)"
                fontSize="9"
                dominantBaseline="central"
              >
                {f.name}
              </text>
            </g>
          ))}
        </g>

        {/* connector line for comparison */}
        {comparison && pDot > 0 && (
          <g opacity={pDot}>
            <line
              x1={dx}
              y1={dy}
              x2={compDx}
              y2={compDy}
              stroke="var(--color-ink)"
              strokeOpacity="0.45"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </g>
        )}

        {/* plotting guides */}
        <g opacity={0.55 * (1 - stage(p, 0.86, 1) * 0.45)}>
          <line
            x1={vx}
            y1={Y0}
            x2={vx}
            y2={Y0 + H}
            stroke="var(--color-accent)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={stage(p, 0.16, 0.3)}
          />
          <line
            x1={X0}
            y1={hy}
            x2={X0 + W}
            y2={hy}
            stroke="var(--color-accent)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={stage(p, 0.28, 0.42)}
          />
        </g>

        {/* comparison friend dot */}
        {comparison && pDot > 0 && (
          <g opacity={pDot}>
            <circle
              cx={compDx}
              cy={compDy}
              r={dotR * 0.9}
              fill="var(--color-ink)"
              fillOpacity="0.85"
              filter="url(#dotglow2)"
            />
            <circle cx={compDx} cy={compDy} r={dotR * 0.35} fill="var(--color-canvas)" />
            <text
              x={compDx}
              y={compDy - 14}
              fill="var(--color-ink)"
              fontFamily="var(--font-mono)"
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
            >
              {comparison.label || "FRIEND"}
            </text>
          </g>
        )}

        {/* the primary user result */}
        {pDot > 0 && (
          <g>
            <circle
              cx={dx}
              cy={dy}
              r={dotR}
              fill="var(--color-accent)"
              filter="url(#dotglow)"
            />
            <circle cx={dx} cy={dy} r={dotR * 0.4} fill="var(--color-surface)" />
            {comparison && (
              <text
                x={dx}
                y={dy - 14}
                fill="var(--color-accent)"
                fontFamily="var(--font-mono)"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                YOU
              </text>
            )}
          </g>
        )}
      </g>

      <rect
        x={X0}
        y={Y0}
        width={W}
        height={H}
        rx="3"
        fill="none"
        stroke="var(--color-line)"
        strokeWidth="1.25"
      />

      {/* axis labels — poles come from the config, not from this file */}
      <text
        x={X0 + W / 2}
        y={Y0 - 18}
        fill="var(--color-ink)"
        fillOpacity="0.8"
        fontFamily="var(--font-display)"
        fontSize="17"
        letterSpacing="4"
        textAnchor="middle"
      >
        {label(config.axes.y.positive_label_key)}
      </text>
      <text
        x={X0 + W / 2}
        y={Y0 + H + 32}
        fill="var(--color-ink)"
        fillOpacity="0.8"
        fontFamily="var(--font-display)"
        fontSize="17"
        letterSpacing="4"
        textAnchor="middle"
      >
        {label(config.axes.y.negative_label_key)}
      </text>
      <text
        x={X0 - 22}
        y={Y0 + H / 2}
        fill="var(--color-ink)"
        fillOpacity="0.8"
        fontFamily="var(--font-display)"
        fontSize="17"
        letterSpacing="4"
        textAnchor="middle"
        transform={`rotate(-90 ${X0 - 22} ${Y0 + H / 2})`}
      >
        {label(config.axes.x.negative_label_key)}
      </text>
      <text
        x={X0 + W + 22}
        y={Y0 + H / 2}
        fill="var(--color-ink)"
        fillOpacity="0.8"
        fontFamily="var(--font-display)"
        fontSize="17"
        letterSpacing="4"
        textAnchor="middle"
        transform={`rotate(90 ${X0 + W + 22} ${Y0 + H / 2})`}
      >
        {label(config.axes.x.positive_label_key)}
      </text>

      {/* scale ticks */}
      {[-1, -0.5, 0.5, 1].map((v) => (
        <text
          key={v}
          x={px(v)}
          y={Y0 + H + 14}
          fill="var(--color-muted)"
          fillOpacity="0.55"
          fontFamily="var(--font-mono)"
          fontSize="9"
          textAnchor="middle"
        >
          {(v * 10).toFixed(0)}
        </text>
      ))}
    </svg>
  );
}
