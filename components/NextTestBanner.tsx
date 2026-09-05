import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Heart, Briefcase, Brain, Scale, Sprout } from "lucide-react";
import { availableTests, type AvailableTest } from "@/lib/catalogue";

interface NextTestBannerProps {
  currentTestId: string;
  locale: string;
}

const CLUSTER_ICONS: Record<string, React.ReactNode> = {
  personality: <Brain className="h-5 w-5 text-accent" />,
  relationships: <Heart className="h-5 w-5 text-accent" />,
  beliefs: <Scale className="h-5 w-5 text-accent" />,
  wellbeing: <Sprout className="h-5 w-5 text-accent" />,
  career: <Briefcase className="h-5 w-5 text-accent" />,
};

const TEST_DISPLAY_NAMES: Record<string, string> = {
  political: "The Political Standpoint Test",
  attachment: "Relational Attachment Style",
  leadership: "Leadership & Decision Dynamics",
};

export function NextTestBanner({ currentTestId, locale }: NextTestBannerProps) {
  const allTests = availableTests();
  const nextTests = allTests.filter((t) => t.id !== currentTestId);

  if (nextTests.length === 0) return null;

  return (
    <section className="mx-auto flex w-full max-w-[56ch] flex-col gap-4 rounded-(--radius-card) border border-line bg-surface/50 p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[12px] font-mono tracking-[0.16em] uppercase text-accent font-semibold">
            Continue Your Self-Discovery
          </span>
          <h2 className="text-[18px] font-bold text-ink mt-0.5">
            Discover Your Next Standpoint
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-1">
        {nextTests.map((test) => {
          const icon = CLUSTER_ICONS[test.clusterId] || <Compass className="h-5 w-5 text-accent" />;
          const title = TEST_DISPLAY_NAMES[test.id] || test.id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <Link
              key={test.id}
              href={`/${locale}/test/${test.id}`}
              className="group flex items-center justify-between rounded-(--radius-control) border border-line bg-canvas p-4 transition-all hover:border-accent hover:shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-transform group-hover:scale-105">
                  {icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-ink group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                  <p className="text-[13px] text-muted">
                    {test.questionCount} statements · about {test.minutes} min
                  </p>
                </div>
              </div>

              <span className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

