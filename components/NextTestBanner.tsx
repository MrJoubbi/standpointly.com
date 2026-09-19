import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Heart, Briefcase, Brain, Scale, Sprout } from "lucide-react";
import { availableTests } from "@/lib/catalogue";

interface NextTestBannerProps {
  currentTestId: string;
  locale: string;
}

const FIELD_ICONS: Record<string, React.ReactNode> = {
  personality: <Brain className="h-5 w-5 text-accent" />,
  relationships: <Heart className="h-5 w-5 text-accent" />,
  beliefs: <Scale className="h-5 w-5 text-accent" />,
  wellbeing: <Sprout className="h-5 w-5 text-accent" />,
  career: <Briefcase className="h-5 w-5 text-accent" />,
};

const TEST_DISPLAY_NAMES: Record<string, string> = {
  // Field 01 - Personality
  "big-five": "The Big Five Personality Spectrum",
  "dark-triad": "The Dark Triad Spectrum",
  empathy: "Affective & Cognitive Empathy Mapping",
  "emotional-intelligence": "Emotional Intelligence Spectrum",
  "self-esteem": "Self-Worth & Contingency Profile",

  // Field 02 - Relationships
  attachment: "Relational Attachment Style",
  "love-language": "Relational Affection Modalities",
  compatibility: "Relational Compatibility Matrix",
  "relationship-anxiety": "Relational Security & Vigilance",
  boundaries: "Interpersonal Boundary Architecture",

  // Field 03 - Beliefs & Values
  political: "The Political Standpoint Test",
  "feminist-perspectives": "Feminist Perspectives Compass",
  "moral-foundations": "Moral Foundations Compass",
  "gender-equality": "Gender Parity & Structural Equity",
  "individualism-collectivism": "Individualism vs. Collectivism Spectrum",

  // Field 04 - Wellbeing
  stress: "Perceived Stress & Resilience Profile",
  burnout: "Occupational Burnout & Exhaustion Index",
  "emotional-regulation": "Emotion Regulation Strategies",
  resilience: "Psychological Resilience & Tenacity",
  procrastination: "Procrastination & Temporal Delay",

  // Field 05 - Work & Career
  "career-personality": "Career Personality & Occupational Anchors",
  "work-style": "Workplace Rhythm & Execution Style",
  "leadership-style": "Executive Leadership Architecture",
  "career-values": "Career Values & Motivating Drivers",
  "decision-making-style": "Decision-Making Style Matrix",
};

export function NextTestBanner({ currentTestId, locale }: NextTestBannerProps) {
  const allTests = availableTests();
  const nextTests = allTests.filter((t) => t.id !== currentTestId);

  if (nextTests.length === 0) return null;

  return (
    <section className="mx-auto flex w-full max-w-[56ch] flex-col gap-4 rounded-xl border border-line bg-surface/50 p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono tracking-wider uppercase text-accent font-semibold">
            Discover Where You Stand
          </span>
          <h2 className="text-[18px] font-bold text-ink mt-0.5">
            Continue with another standard instrument
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-1">
        {nextTests.map((test) => {
          const icon = FIELD_ICONS[test.fieldId] || <Compass className="h-5 w-5 text-accent" />;
          const title =
            TEST_DISPLAY_NAMES[test.id] ||
            test.id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <Link
              key={test.id}
              href={`/${locale}/test/${test.id}`}
              className="group flex items-center justify-between rounded-xl border border-line bg-canvas p-4 transition-all hover:border-accent hover:shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-transform group-hover:scale-105">
                  {icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[10px] text-muted font-semibold">
                      CODE: {test.code}
                    </span>
                    <span className="text-muted/40 text-[10px]">·</span>
                    <span className="font-mono text-[10px] text-accent font-semibold uppercase">
                      FIELD {test.fieldCode}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold text-ink group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                  <p className="text-[12px] text-muted">
                    {test.questionCount} statements · ~{test.minutes} min
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
