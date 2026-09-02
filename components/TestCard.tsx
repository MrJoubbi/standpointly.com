import Link from "next/link";
import { getTranslations } from "next-intl/server";

import type { CatalogueEntry } from "@/lib/catalogue";

/**
 * One entry in the catalogue. A planned test renders as a panel with no link
 * and a visible "in development" tag — never as something a reader could
 * mistake for a test they can take.
 */
export async function TestCard({
  entry,
  locale,
}: {
  entry: CatalogueEntry;
  locale: string;
}) {
  const t = await getTranslations();
  const available = entry.status === "available";

  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-[1.35rem] font-bold leading-tight text-ink">
          {t(entry.titleKey)}
        </h3>
        <span
          className={[
            "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.09em] uppercase",
            available
              ? "bg-accent-soft text-accent"
              : "bg-line/40 text-muted",
          ].join(" ")}
        >
          {available ? t("home.status_available") : t("home.status_planned")}
        </span>
      </div>

      <p className="mt-3 text-[15px] leading-[1.65] text-muted">
        {t(entry.summaryKey)}
      </p>

      <p className="mt-5 text-[13px] text-muted/80">
        {available
          ? t("home.card_meta", {
              count: entry.questionCount,
              minutes: entry.minutes,
            })
          : t("home.card_unavailable")}
      </p>
    </>
  );

  if (!available) {
    return (
      <div className="rounded-(--radius-card) border border-line bg-surface/60 p-6">
        {body}
      </div>
    );
  }

  return (
    <Link
      href={`/${locale}/test/${entry.id}`}
      className="group block rounded-(--radius-card) border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(22,32,44,0.04)] transition-[border-color,box-shadow] hover:border-accent hover:shadow-[0_6px_20px_rgba(22,32,44,0.07)] motion-reduce:transition-none"
    >
      {body}
      <span className="mt-5 inline-block text-sm font-semibold text-accent">
        {t("home.card_cta")} →
      </span>
    </Link>
  );
}
