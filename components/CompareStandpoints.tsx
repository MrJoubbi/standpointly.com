"use client";

import React, { useState } from "react";
import { Users, ArrowRight, Sparkles, Check, Share2, HelpCircle } from "lucide-react";
import { compareStandpoints, type StandpointComparison } from "@/lib/comparison";
import type { TestConfig } from "@/lib/types";

interface CompareStandpointsProps {
  config: TestConfig;
  userX: number;
  userY: number;
  initialCompareX?: number;
  initialCompareY?: number;
  initialFriendName?: string;
  onSelectComparison?: (comparison: { x: number; y: number; label: string } | null) => void;
}

export function CompareStandpoints({
  config,
  userX,
  userY,
  initialCompareX,
  initialCompareY,
  initialFriendName = "Friend",
  onSelectComparison,
}: CompareStandpointsProps) {
  const [isOpen, setIsOpen] = useState(
    initialCompareX !== undefined && initialCompareY !== undefined
  );
  const [inputUrl, setInputUrl] = useState("");
  const [friendName, setFriendName] = useState(initialFriendName);
  const [error, setError] = useState<string | null>(null);
  const [comparison, setComparison] = useState<StandpointComparison | null>(() => {
    if (initialCompareX !== undefined && initialCompareY !== undefined) {
      return compareStandpoints(
        { x: userX, y: userY, label: "You" },
        { x: initialCompareX, y: initialCompareY, label: initialFriendName },
        config
      );
    }
    return null;
  });
  const [copiedComp, setCopiedComp] = useState(false);

  const handleParseAndCompare = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    let targetX: number | null = null;
    let targetY: number | null = null;

    try {
      if (inputUrl.includes("?")) {
        const parsedUrl = new URL(inputUrl.startsWith("http") ? inputUrl : `https://dummy.com/${inputUrl}`);
        const qX = parsedUrl.searchParams.get("x");
        const qY = parsedUrl.searchParams.get("y");
        if (qX && qY) {
          targetX = parseFloat(qX);
          targetY = parseFloat(qY);
        }
      } else if (inputUrl.includes(",")) {
        const [rawX, rawY] = inputUrl.split(",");
        targetX = parseFloat(rawX.trim());
        targetY = parseFloat(rawY.trim());
      }
    } catch {
      targetX = null;
      targetY = null;
    }

    if (
      targetX === null ||
      targetY === null ||
      isNaN(targetX) ||
      isNaN(targetY) ||
      targetX < -1 ||
      targetX > 1 ||
      targetY < -1 ||
      targetY > 1
    ) {
      setError("Please paste a valid Standpointly result link (e.g. .../r/political?x=-0.25&y=0.40)");
      return;
    }

    const label = friendName.trim() || "Friend";
    const comp = compareStandpoints(
      { x: userX, y: userY, label: "You" },
      { x: targetX, y: targetY, label },
      config
    );

    setComparison(comp);
    if (onSelectComparison) {
      onSelectComparison({ x: targetX, y: targetY, label });
    }
  };

  const handlePresetCompare = (x: number, y: number, label: string) => {
    setError(null);
    setFriendName(label);
    const comp = compareStandpoints(
      { x: userX, y: userY, label: "You" },
      { x, y, label },
      config
    );
    setComparison(comp);
    if (onSelectComparison) {
      onSelectComparison({ x, y, label });
    }
  };

  const handleClear = () => {
    setComparison(null);
    setInputUrl("");
    setError(null);
    if (onSelectComparison) {
      onSelectComparison(null);
    }
  };

  const handleCopyComparisonLink = async () => {
    if (!comparison) return;
    const url = new URL(window.location.href);
    url.searchParams.set("x2", comparison.point2.x.toFixed(4));
    url.searchParams.set("y2", comparison.point2.y.toFixed(4));
    url.searchParams.set("friend", comparison.point2.label);

    try {
      await navigator.clipboard.writeText(url.toString());
      setCopiedComp(true);
      setTimeout(() => setCopiedComp(false), 2500);
    } catch {
      setCopiedComp(true);
      setTimeout(() => setCopiedComp(false), 2500);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-[56ch] flex-col gap-5 rounded-(--radius-card) border border-line bg-surface/70 p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Users className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-[13px] font-mono tracking-[0.16em] uppercase text-accent font-semibold">
              Compare with a Friend
            </h2>
            <p className="text-[13.5px] text-muted">
              Plot two standpoints together on the grid to discover shared ground and contrasts.
            </p>
          </div>
        </div>

        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="rounded-(--radius-control) border border-line px-3.5 py-1.5 text-[13.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Open
          </button>
        )}
      </div>

      {isOpen && (
        <div className="flex flex-col gap-5 pt-2">
          {/* Paste Friend Link Form */}
          <form onSubmit={handleParseAndCompare} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                placeholder="Friend's Name"
                className="w-full sm:w-36 rounded-(--radius-control) border border-line bg-canvas px-3.5 py-2 text-[14px] text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
              />
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Paste friend's result link..."
                className="flex-1 rounded-(--radius-control) border border-line bg-canvas px-3.5 py-2 text-[14px] text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-(--radius-control) bg-accent px-4 py-2 text-[14px] font-semibold text-on-accent transition-opacity hover:opacity-90 active:scale-[0.98]"
              >
                Compare
              </button>
            </div>

            {error && <p className="text-[13px] text-amber-600 dark:text-amber-400">{error}</p>}
          </form>

          {/* Quick Presets for Demo / Instant Exploration */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-mono uppercase text-muted tracking-wider">
              Or quick-compare with neighboring archetypes:
            </span>
            <div className="flex flex-wrap gap-2">
              {config.cells.slice(0, 4).map((c, i) => {
                // Approximate coordinate offset for presets
                const colIdx = i % 3;
                const rowIdx = Math.floor(i / 3);
                const sampleX = [-0.6, 0, 0.6][colIdx] || 0.5;
                const sampleY = [0.6, 0, -0.6][rowIdx] || -0.5;

                return (
                  <button
                    key={c.id}
                    onClick={() => handlePresetCompare(sampleX, sampleY, c.id.toUpperCase())}
                    type="button"
                    className="rounded-full border border-line bg-canvas/80 px-3 py-1 text-[12.5px] font-medium text-muted hover:border-accent hover:text-ink transition-colors"
                  >
                    vs. {c.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Comparison Analysis Result */}
          {comparison && (
            <div className="flex flex-col gap-4 rounded-(--radius-control) border border-accent/30 bg-accent/5 p-4.5 mt-2">
              <div className="flex items-center justify-between border-b border-line/60 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="font-semibold text-ink text-[15px]">
                      {comparison.verdict}
                    </span>
                  </div>
                  <p className="text-[13px] text-muted mt-0.5">
                    Standpoint Alignment Score: <strong className="text-accent">{comparison.alignmentScore}%</strong>
                  </p>
                </div>

                <button
                  onClick={handleClear}
                  type="button"
                  className="text-[12.5px] font-medium text-muted hover:text-ink underline"
                >
                  Reset
                </button>
              </div>

              {/* Side-by-Side Archetypes */}
              <div className="grid grid-cols-2 gap-3 text-center py-1">
                <div className="rounded-lg bg-surface/80 p-3 border border-line">
                  <span className="text-[11px] font-mono uppercase text-accent font-semibold block">YOU</span>
                  <span className="text-[14px] font-bold text-ink block mt-0.5">
                    {comparison.point1.cell.id.toUpperCase()}
                  </span>
                  <span className="text-[12px] font-mono text-muted">
                    ({(comparison.point1.x * 10).toFixed(1)}, {(comparison.point1.y * 10).toFixed(1)})
                  </span>
                </div>
                <div className="rounded-lg bg-surface/80 p-3 border border-line">
                  <span className="text-[11px] font-mono uppercase text-ink font-semibold block">
                    {comparison.point2.label}
                  </span>
                  <span className="text-[14px] font-bold text-ink block mt-0.5">
                    {comparison.point2.cell.id.toUpperCase()}
                  </span>
                  <span className="text-[12px] font-mono text-muted">
                    ({(comparison.point2.x * 10).toFixed(1)}, {(comparison.point2.y * 10).toFixed(1)})
                  </span>
                </div>
              </div>

              {/* Summary Narrative */}
              <p className="text-[14px] leading-[1.65] text-muted">
                {comparison.summary}
              </p>

              {/* Axis Nuance */}
              <div className="flex flex-col gap-1.5 text-[13px] text-muted border-t border-line/40 pt-2.5">
                <p>• {comparison.xAnalysis}</p>
                <p>• {comparison.yAnalysis}</p>
              </div>

              {/* Share Dual Reading */}
              <button
                onClick={handleCopyComparisonLink}
                type="button"
                className="mt-1 flex items-center justify-center gap-2 rounded-(--radius-control) border border-accent/40 bg-accent/10 px-3.5 py-2 text-[13.5px] font-semibold text-accent transition-colors hover:bg-accent/20"
              >
                {copiedComp ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Copied Comparison Link!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    <span>Share This Comparison Link</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
