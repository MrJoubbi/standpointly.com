"use client";

import React, { useId, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import type { CatalogueEntry, TestCluster, FieldId } from "@/lib/catalogue";

interface CatalogueSectionProps {
  clusters: TestCluster[];
  locale: string;
}

export function CatalogueSection({ clusters, locale }: CatalogueSectionProps) {
  const t = useTranslations();
  const [selectedField, setSelectedField] = useState<"all" | FieldId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputId = useId();

  const totalInstruments = useMemo(() => {
    return clusters.reduce((acc, c) => acc + c.tests.length, 0);
  }, [clusters]);

  const totalAvailable = useMemo(() => {
    return clusters.reduce((acc, c) => acc + c.availableCount, 0);
  }, [clusters]);

  // Filter fields and instruments according to field tab & search query
  const filteredClusters = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return clusters
      .filter((c) => selectedField === "all" || c.id === selectedField)
      .map((cluster) => {
        if (!query) return cluster;

        const matchingTests = cluster.tests.filter((test) => {
          const title = t(test.titleKey).toLowerCase();
          const summary = t(test.summaryKey).toLowerCase();
          const id = test.id.toLowerCase();
          const code = test.code.toLowerCase();
          return (
            title.includes(query) ||
            summary.includes(query) ||
            id.includes(query) ||
            code.includes(query)
          );
        });

        return {
          ...cluster,
          tests: matchingTests,
        };
      })
      .filter((cluster) => cluster.tests.length > 0);
  }, [clusters, selectedField, searchQuery, t]);

  return (
    <section id="catalogue" className="bg-canvas py-16 sm:py-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Section Header: Clean, Engaging & Inviting */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-wider text-accent uppercase">
                Interactive 2D Compasses
              </span>
              <span className="text-line-strong">/</span>
              <span className="font-mono text-xs text-muted tracking-wider uppercase">
                5 Categories · {totalAvailable} Free Tests
              </span>
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink">
              Browse All Compass Tests
            </h2>
            <p className="mt-3 max-w-[68ch] text-[16px] sm:text-[17px] leading-[1.65] text-muted">
              Discover where you land across personality, relationships, values, wellbeing, and work. Every test is 100% free, private, and gives you a visual 2D compass result to share and compare.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:self-end shrink-0">
            <div className="flex items-center gap-6 rounded-xl border border-line bg-surface px-5 py-3 text-xs">
              <div>
                <div className="font-mono text-[10px] uppercase text-muted tracking-wider">Ready to Take</div>
                <div className="text-base font-bold text-accent">{totalAvailable} Free Tests</div>
              </div>
              <div className="h-7 w-px bg-line" />
              <div>
                <div className="font-mono text-[10px] uppercase text-muted tracking-wider">Privacy</div>
                <div className="text-base font-bold text-ink">100% Anonymous</div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Field Selector Cards */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="text-[12px] font-mono font-semibold tracking-wider text-muted uppercase">
              Filter by Field
            </p>
            {selectedField !== "all" && (
              <button
                type="button"
                id="reset-field-filter"
                onClick={() => setSelectedField("all")}
                className="text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                View all fields ({totalInstruments})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5" role="tablist">
            {clusters.map((cluster) => {
              const isSelected = selectedField === cluster.id;
              return (
                <button
                  key={cluster.id}
                  type="button"
                  role="tab"
                  id={`field-selector-${cluster.id}`}
                  aria-selected={isSelected}
                  onClick={() => setSelectedField(isSelected ? "all" : cluster.id)}
                  className={[
                    "group relative flex flex-col justify-between text-left p-5 rounded-xl border transition-all cursor-pointer",
                    isSelected
                      ? "border-accent bg-surface shadow-md ring-1 ring-accent"
                      : "border-line bg-surface/70 hover:border-line-strong hover:bg-surface hover:shadow-xs",
                  ].join(" ")}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={[
                          "font-mono text-[11px] font-bold tracking-wider",
                          isSelected ? "text-accent" : "text-muted group-hover:text-ink",
                        ].join(" ")}
                      >
                        FIELD {cluster.code}
                      </span>
                      {cluster.availableCount > 0 ? (
                        <span className="h-2 w-2 rounded-full bg-accent" title="Available test in this field" />
                      ) : (
                        <span className="font-mono text-[10px] text-muted/60">ROADMAP</span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-[18px] font-bold text-ink leading-snug group-hover:text-accent transition-colors">
                      {t(`field.${cluster.id}.title`)}
                    </h3>
                  </div>

                  <div className="mt-5 pt-3 border-t border-line/50 flex items-center justify-between text-[11px] text-muted">
                    <span className="font-mono">{cluster.tests.length} Instruments</span>
                    <span className={cluster.availableCount > 0 ? "font-semibold text-accent" : "text-muted"}>
                      {cluster.availableCount > 0 ? `${cluster.availableCount} Available` : "In Progress"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Status Toolbar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-5 rounded-xl border border-line bg-surface/50">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="font-mono text-xs text-muted uppercase">Showing:</span>
            <span className="text-sm font-semibold text-ink">
              {selectedField === "all"
                ? `All Fields (${filteredClusters.reduce((acc, c) => acc + c.tests.length, 0)} instruments)`
                : `${t(`field.${selectedField}.title`)} Field (${filteredClusters.reduce((acc, c) => acc + c.tests.length, 0)} instruments)`}
            </span>
          </div>

          <div className="relative w-full sm:w-72 shrink-0">
            <label htmlFor={searchInputId} className="sr-only">
              Search assessments
            </label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              id={searchInputId}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search instruments or topics..."
              className="w-full rounded-lg border border-line bg-canvas pl-9.5 pr-4 py-2 text-[13px] text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* Empty state for search */}
        {filteredClusters.length === 0 && (
          <div className="mt-14 rounded-xl border border-dashed border-line bg-surface/40 p-12 text-center">
            <p className="text-muted text-[15px]">
              No instruments found matching &ldquo;<strong>{searchQuery}</strong>&rdquo;.
            </p>
            <button
              type="button"
              id="clear-search-btn"
              onClick={() => {
                setSearchQuery("");
                setSelectedField("all");
              }}
              className="mt-3 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline cursor-pointer"
            >
              Reset search and show all fields
            </button>
          </div>
        )}

        {/* Structured Field Blocks with Exact Prompt Hierarchy */}
        <div className="mt-12 space-y-14">
          {filteredClusters.map((cluster) => {
            return (
              <div
                key={cluster.id}
                id={`field-panel-${cluster.id}`}
                className="scroll-mt-12 rounded-2xl border border-line bg-surface/30 p-6 sm:p-8 md:p-10"
              >
                {/* 11. Exact Field Header Hierarchy */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-line">
                  <div>
                    {/* Line 1: Category Tag */}
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                        CATEGORY {cluster.code} · {cluster.tests.length} Tests
                      </span>
                    </div>

                    {/* Line 2: Title */}
                    <h3 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink">
                      {t(`field.${cluster.id}.title`)}
                    </h3>

                    {/* Line 3: Subtitle */}
                    <p className="mt-2 text-[15px] sm:text-[16px] font-medium text-ink/85">
                      {t(`field.${cluster.id}.subtitle`)}
                    </p>

                    {/* Line 4: Description paragraph */}
                    <p className="mt-2 max-w-3xl text-[14px] sm:text-[15px] text-muted leading-relaxed">
                      {t(`field.${cluster.id}.description`)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
                    <Link
                      href={`/${locale}/tests/${cluster.slug}`}
                      className="rounded-md border border-line bg-surface px-3.5 py-1.5 font-mono text-[11px] font-medium text-muted hover:text-ink hover:border-line-strong transition-colors"
                    >
                      Field Hub →
                    </Link>
                    {cluster.availableCount > 0 ? (
                      <span className="rounded-md bg-accent/10 border border-accent/20 px-3 py-1 font-mono text-[11px] font-bold text-accent uppercase tracking-wider">
                        {cluster.availableCount} Available
                      </span>
                    ) : null}
                    <span className="rounded-md bg-surface border border-line px-3 py-1 font-mono text-[11px] font-medium text-muted uppercase tracking-wider">
                      {cluster.plannedCount} In Development
                    </span>
                  </div>
                </div>

                {/* 10. Standard Instrument Cards Grid */}
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {cluster.tests.map((test) => (
                    <StandardInstrumentCard
                      key={test.id}
                      test={test}
                      fieldSlug={cluster.slug}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function StandardInstrumentCard({
  test,
  fieldSlug,
  locale,
}: {
  test: CatalogueEntry;
  fieldSlug: string;
  locale: string;
}) {
  const t = useTranslations();
  const isAvailable = test.status === "available";

  const cardContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Top line with time and category badge */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] font-medium text-muted">
            {isAvailable ? `~${test.minutes} min · ${test.questionCount} questions` : "~4 min · 2D Compass"}
          </span>
          <span className="rounded px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase bg-accent/10 text-accent">
            2D Compass
          </span>
        </div>

        {/* Instrument Title */}
        <h4 className="mt-3 font-display text-[18px] sm:text-[19px] font-bold leading-tight text-ink group-hover:text-accent transition-colors">
          {t(test.titleKey)}
        </h4>

        {/* Short description */}
        <p className="mt-2.5 text-[13.5px] leading-[1.6] text-muted line-clamp-3">
          {t(test.summaryKey)}
        </p>
      </div>

      {/* Footer info and CTA */}
      <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-[12px]">
        <span className="font-mono text-[11px] text-muted">
          Instant visual archetype
        </span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-accent group-hover:translate-x-0.5 transition-transform">
          Take Test <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );

  const href = isAvailable
    ? `/${locale}/test/${test.id}`
    : `/${locale}/tests/${fieldSlug}/${test.slug}`;

  return (
    <Link
      href={href}
      id={`instrument-card-${test.id}`}
      className={[
        "group rounded-xl border p-5.5 transition-all motion-reduce:transition-none flex flex-col justify-between",
        isAvailable
          ? "border-line bg-surface shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-accent hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 cursor-pointer"
          : "border-line bg-surface/50 hover:border-line-strong hover:bg-surface/80 hover:-translate-y-0.5 cursor-pointer",
      ].join(" ")}
    >
      {cardContent}
    </Link>
  );
}
