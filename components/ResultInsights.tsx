import React from "react";
import { Award, AlertTriangle, MessageSquare } from "lucide-react";
import { getArchetypeInsights } from "@/lib/insights";

interface ResultInsightsProps {
  testId: string;
  cellId: string;
}

export function ResultInsights({ testId, cellId }: ResultInsightsProps) {
  const insights = getArchetypeInsights(testId, cellId);

  if (!insights) return null;

  return (
    <section className="mx-auto flex w-full max-w-[56ch] flex-col gap-6">
      <h2 className="text-[13px] font-mono tracking-[0.16em] uppercase text-accent font-semibold">
        Archetype Dynamics & Guidance
      </h2>

      <div className="flex flex-col gap-4">
        {/* Core Strengths */}
        <div className="rounded-(--radius-card) border border-line bg-surface/60 p-5 shadow-xs transition-colors hover:bg-surface">
          <div className="flex items-center gap-2.5 text-ink font-semibold text-[15px] mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Award className="h-4 w-4" />
            </span>
            <span>Core Strengths & Natural Gifts</span>
          </div>
          <ul className="flex flex-col gap-2.5 pl-2 text-[14.5px] leading-[1.6] text-muted">
            {insights.strengths.map((s, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Growth Blind Spots */}
        <div className="rounded-(--radius-card) border border-line bg-surface/60 p-5 shadow-xs transition-colors hover:bg-surface">
          <div className="flex items-center gap-2.5 text-ink font-semibold text-[15px] mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4" />
            </span>
            <span>Growth & Potential Blind Spots</span>
          </div>
          <ul className="flex flex-col gap-2.5 pl-2 text-[14.5px] leading-[1.6] text-muted">
            {insights.blindspots.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Communication Strategies */}
        <div className="rounded-(--radius-card) border border-line bg-surface/60 p-5 shadow-xs transition-colors hover:bg-surface">
          <div className="flex items-center gap-2.5 text-ink font-semibold text-[15px] mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              <MessageSquare className="h-4 w-4" />
            </span>
            <span>Bridging Different Standpoints</span>
          </div>
          <ul className="flex flex-col gap-2.5 pl-2 text-[14.5px] leading-[1.6] text-muted">
            {insights.communicationTips.map((c, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
