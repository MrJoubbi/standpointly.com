"use client";

import React, { useId, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Search } from "lucide-react";
import type { CatalogueEntry, TestCluster, TestClusterId } from "@/lib/catalogue";

interface CatalogueSectionProps {
  clusters: TestCluster[];
  locale: string;
}

export function CatalogueSection({ clusters, locale }: CatalogueSectionProps) {
  const t = useTranslations();
  const [selectedCluster, setSelectedCluster] = useState<"all" | TestClusterId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputId = useId();

  const totalTests = useMemo(() => {
    return clusters.reduce((acc, c) => acc + c.tests.length, 0);
  }, [clusters]);

  const totalAvailable = useMemo(() => {
    return clusters.reduce((acc, c) => acc + c.availableCount, 0);
  }, [clusters]);

  // Filter clusters and tests according to tab & search query
  const filteredClusters = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return clusters
      .filter((c) => selectedCluster === "all" || c.id === selectedCluster)
      .map((cluster) => {
        if (!query) return cluster;

        const matchingTests = cluster.tests.filter((test) => {
          const title = t(test.titleKey).toLowerCase();
          const summary = t(test.summaryKey).toLowerCase();
          const id = test.id.toLowerCase();
          return title.includes(query) || summary.includes(query) || id.includes(query);
        });

        return {
          ...cluster,
          tests: matchingTests,
        };
      })
      .filter((cluster) => cluster.tests.length > 0);
  }, [clusters, selectedCluster, searchQuery, t]);

  return (
    <section id="catalogue" className="bg-canvas py-16 sm:py-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Section Header: Academic & Authoritative */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-(--tracking-plate) text-accent uppercase">
                Battery Architecture
              </span>
              <span className="text-line-strong">/</span>
              <span className="font-mono text-xs text-muted tracking-wider uppercase">
                5 Research Domains · 25 Instruments
              </span>
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink">
              The Assessment Domains
            </h2>
            <p className="mt-3 max-w-[68ch] text-[16px] sm:text-[17px] leading-[1.65] text-muted">
              {t("home.tests_body")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:self-end shrink-0">
            <div className="flex items-center gap-6 rounded-xl border border-line bg-surface px-5 py-3 text-xs">
              <div>
                <div className="font-mono text-[10px] uppercase text-muted tracking-wider">Operational</div>
                <div className="text-base font-bold text-ink">{totalAvailable} Instruments</div>
              </div>
              <div className="h-7 w-px bg-line" />
              <div>
                <div className="font-mono text-[10px] uppercase text-muted tracking-wider">In Research</div>
                <div className="text-base font-bold text-ink">{totalTests - totalAvailable} Instruments</div>
              </div>
            </div>
          </div>
        </div>

        {/* Big Executive Category Deck */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="text-[12px] font-mono font-semibold tracking-wider text-muted uppercase">
              Filter by Domain
            </p>
            {selectedCluster !== "all" && (
              <button
                type="button"
                id="reset-cluster-filter"
                onClick={() => setSelectedCluster("all")}
                className="text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                View all domains ({totalTests})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5" role="tablist">
            {clusters.map((cluster) => {
              const isSelected = selectedCluster === cluster.id;
              return (
                <button
                  key={cluster.id}
                  type="button"
                  role="tab"
                  id={`domain-selector-${cluster.id}`}
                  aria-selected={isSelected}
                  onClick={() => setSelectedCluster(isSelected ? "all" : cluster.id)}
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
                        DOMAIN {cluster.code}
                      </span>
                      {cluster.availableCount > 0 ? (
                        <span className="h-2 w-2 rounded-full bg-accent" title="Available test in this domain" />
                      ) : (
                        <span className="font-mono text-[10px] text-muted/60">ROADMAP</span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-[18px] font-bold text-ink leading-snug group-hover:text-accent transition-colors">
                      {t(`cluster.${cluster.id}.title`)}
                    </h3>
                  </div>

                  <div className="mt-5 pt-3 border-t border-line/50 flex items-center justify-between text-[11px] text-muted">
                    <span>5 Instruments</span>
                    <span className={cluster.availableCount > 0 ? "font-semibold text-accent" : "text-muted"}>
                      {cluster.availableCount > 0 ? `${cluster.availableCount} Ready` : "Planned"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-5 rounded-xl border border-line bg-surface/50">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="font-mono text-xs text-muted uppercase">Showing:</span>
            <span className="text-sm font-semibold text-ink">
              {selectedCluster === "all"
                ? `All Domains (${filteredClusters.reduce((acc, c) => acc + c.tests.length, 0)} instruments)`
                : `${t(`cluster.${selectedCluster}.title`)} Domain (${filteredClusters.reduce((acc, c) => acc + c.tests.length, 0)} instruments)`}
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
                setSelectedCluster("all");
              }}
              className="mt-3 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline cursor-pointer"
            >
              Reset search and show all domains
            </button>
          </div>
        )}

        {/* Large Professional Domain Blocks */}
        <div className="mt-12 space-y-14">
          {filteredClusters.map((cluster) => {
            return (
              <div
                key={cluster.id}
                id={`domain-panel-${cluster.id}`}
                className="scroll-mt-12 rounded-2xl border border-line bg-surface/30 p-6 sm:p-8 md:p-10"
              >
                {/* Big Category Header */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-line">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                        DOMAIN {cluster.code}
                      </span>
                      <span className="text-muted/50">·</span>
                      <span className="font-mono text-xs text-muted uppercase tracking-wider">
                        {cluster.tests.length} Standard Instruments
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink">
                      {t(`cluster.${cluster.id}.title`)}
                    </h3>

                    <p className="mt-2 text-[15px] sm:text-[16px] font-medium text-ink/80">
                      {t(`cluster.${cluster.id}.tagline`)}
                    </p>

                    <p className="mt-1.5 max-w-3xl text-[14px] text-muted leading-relaxed">
                      {t(`cluster.${cluster.id}.description`)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
                    {cluster.availableCount > 0 ? (
                      <span className="rounded-md bg-accent/10 border border-accent/20 px-3 py-1 font-mono text-[11px] font-bold text-accent uppercase tracking-wider">
                        {cluster.availableCount} Ready to take
                      </span>
                    ) : null}
                    <span className="rounded-md bg-surface border border-line px-3 py-1 font-mono text-[11px] font-medium text-muted uppercase tracking-wider">
                      {cluster.plannedCount} In Development
                    </span>
                  </div>
                </div>

                {/* Grid of Tests inside this Category */}
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {cluster.tests.map((test, index) => (
                    <ProfessionalTestCard
                      key={test.id}
                      test={test}
                      clusterCode={cluster.code}
                      index={index + 1}
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

function ProfessionalTestCard({
  test,
  clusterCode,
  index,
  locale,
}: {
  test: CatalogueEntry;
  clusterCode: string;
  index: number;
  locale: string;
}) {
  const t = useTranslations();
  const isAvailable = test.status === "available";
  const instrumentCode = `${clusterCode}.${String(index).padStart(2, "0")}`;

  const cardContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Top line with code and status */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-muted">
            CODE: {instrumentCode}
          </span>
          <span
            className={[
              "rounded px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase",
              isAvailable
                ? "bg-accent text-on-accent"
                : "bg-line/60 text-muted",
            ].join(" ")}
          >
            {isAvailable ? "Available" : "In Development"}
          </span>
        </div>

        {/* Test Title */}
        <h4 className="mt-3 font-display text-[18px] sm:text-[19px] font-bold leading-tight text-ink group-hover:text-accent transition-colors">
          {t(test.titleKey)}
        </h4>

        {/* Test Summary */}
        <p className="mt-2.5 text-[13.5px] leading-[1.6] text-muted line-clamp-3">
          {t(test.summaryKey)}
        </p>
      </div>

      {/* Footer info */}
      <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-[12px]">
        {isAvailable ? (
          <>
            <span className="font-mono text-[11px] text-muted">
              {test.questionCount} statements · ~{test.minutes}m
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-accent group-hover:translate-x-0.5 transition-transform">
              Begin Test <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </>
        ) : (
          <div className="flex items-center justify-between w-full font-mono text-[11px] text-muted/70">
            <span>Research battery</span>
            <span className="uppercase text-[10px]">Roadmap</span>
          </div>
        )}
      </div>
    </div>
  );

  if (!isAvailable) {
    return (
      <div
        id={`test-card-${test.id}`}
        className="rounded-xl border border-line bg-surface/50 p-5.5 transition-all"
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={`/${locale}/test/${test.id}`}
      id={`test-card-${test.id}`}
      className="group rounded-xl border border-line bg-surface p-5.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:border-accent hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 motion-reduce:transition-none"
    >
      {cardContent}
    </Link>
  );
}
