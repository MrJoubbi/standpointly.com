"use client";

import { useTranslations } from "next-intl";

import type { ScaleValue, TestConfig } from "@/lib/types";

/**
 * The 5-point control — §6.
 *
 * Neutral sits in the middle but is visually de-emphasised: it is the
 * smallest target, the faintest ring, and it carries no hue at all. Both
 * weight and colour grow outward — warm toward disagree, accent toward agree
 * — so the control reads as a dial rather than five equal options, and
 * picking the middle feels like declining to answer rather than taking a
 * considered position.
 */

/** Ring diameter by |value| — 0 is the smallest. */
const SIZE: Record<number, string> = {
  0: "h-11 w-11",
  1: "h-14 w-14",
  2: "h-[4.25rem] w-[4.25rem]",
};

/** Resting tint by |value|, so the outer options read as the stronger ones. */
const TINT: Record<number, number> = { 0: 0, 1: 0.14, 2: 0.24 };

export function ScaleControl({
  config,
  value,
  onSelect,
  disabled,
}: {
  config: TestConfig;
  value: ScaleValue | undefined;
  onSelect: (value: ScaleValue) => void;
  disabled: boolean;
}) {
  const t = useTranslations();
  const values = config.scale.values;

  return (
    <div className="flex flex-col gap-4">
      <div
        role="radiogroup"
        aria-label={t(config.title_key)}
        className="flex items-center justify-between gap-2 sm:gap-4"
      >
        {values.map((option, i) => {
          const selected = value === option.value;
          const magnitude = Math.abs(option.value);
          const hue =
            option.value === 0
              ? null
              : option.value < 0
                ? "var(--color-scale-neg)"
                : "var(--color-scale-pos)";

          return (
            <button
              key={option.key}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={t(`scale.${option.key}`)}
              disabled={disabled}
              onClick={() => onSelect(option.value)}
              className="group flex flex-1 flex-col items-center gap-2.5 disabled:cursor-default"
            >
              <span
                className={[
                  "flex items-center justify-center rounded-full border-2 transition-[background-color,border-color,transform] duration-150 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                  SIZE[magnitude],
                  selected ? "scale-105" : "",
                ].join(" ")}
                style={{
                  borderColor: hue ?? "var(--color-line)",
                  backgroundColor: hue
                    ? `color-mix(in srgb, ${hue} ${
                        (selected ? 1 : TINT[magnitude]) * 100
                      }%, transparent)`
                    : selected
                      ? "var(--color-line)"
                      : "transparent",
                }}
              >
                {selected && (
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: hue
                        ? "var(--color-on-accent)"
                        : "var(--color-muted)",
                    }}
                  />
                )}
              </span>

              {/* The keyboard affordance doubles as the position readout. */}
              <span
                className={[
                  "font-mono text-[11px] tabular-nums transition-colors duration-150 motion-reduce:transition-none",
                  selected ? "font-medium text-ink" : "text-muted/60",
                ].join(" ")}
              >
                {i + 1}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between text-[13px] text-muted">
        <span>{t(`scale.${values[0].key}`)}</span>
        <span>{t(`scale.${values[values.length - 1].key}`)}</span>
      </div>
    </div>
  );
}
