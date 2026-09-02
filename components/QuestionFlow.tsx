"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { ScaleControl } from "@/components/ScaleControl";
import { score } from "@/lib/scoring";
import { clearProgress, loadProgress, saveProgress } from "@/lib/storage";
import type { Answers, ScaleValue, TestConfig } from "@/lib/types";

/** Beat between selecting and advancing, so the choice registers visually. */
const ADVANCE_MS = 260;

/** Coordinates in the result URL. 4dp keeps the dot from visibly quantising. */
const COORD_PRECISION = 4;

function firstUnanswered(config: TestConfig, answers: Answers): number {
  return config.questions.findIndex((q) => answers[q.id] === undefined);
}

export function QuestionFlow({
  config,
  locale,
}: {
  config: TestConfig;
  locale: string;
}) {
  const t = useTranslations();
  const router = useRouter();

  const total = config.questions.length;

  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [resumed, setResumed] = useState(false);
  // Blocks input during the advance beat and while the result route loads.
  const [busy, setBusy] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submitted = useRef(false);

  useEffect(() => {
    try {
      const saved = loadProgress(config);
      if (saved && Object.keys(saved.answers).length > 0) {
        setAnswers(saved.answers);
        setIndex(saved.index);
        setResumed(true);
      }
    } catch {
      // Ignore storage errors on restricted browsers
    }
  }, [config]);

  useEffect(() => {
    try {
      saveProgress(config, { answers, index });
    } catch {
      // Ignore
    }
  }, [config, answers, index]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const answeredCount = useMemo(
    () => config.questions.filter((q) => answers[q.id] !== undefined).length,
    [config, answers],
  );

  const finish = useCallback(
    (final: Answers) => {
      if (submitted.current) return;
      submitted.current = true;
      setBusy(true);

      // §2 — scored entirely in the browser. The result is two numbers plus
      // the config version, and all three live in the URL (§3).
      const { x, y } = score(final, config);
      const params = new URLSearchParams({
        x: x.toFixed(COORD_PRECISION),
        y: y.toFixed(COORD_PRECISION),
        v: String(config.version),
      });

      clearProgress(config);
      router.push(`/${locale}/r/${config.id}?${params}`);
    },
    [config, locale, router],
  );

  const advance = useCallback(
    (from: number, current: Answers) => {
      const next = from + 1;
      if (next < total) {
        setIndex(next);
        return;
      }
      // Off the end: mop up anything skipped on the way through before
      // scoring, so a missed statement can't silently count as neutral.
      const gap = firstUnanswered(config, current);
      if (gap === -1) finish(current);
      else setIndex(gap);
    },
    [config, total, finish],
  );

  const select = useCallback(
    (value: ScaleValue) => {
      if (busy) return;
      const question = config.questions[index];
      if (!question) return;
      const next: Answers = { ...answers, [question.id]: value };

      setAnswers(next);
      setResumed(false);
      setBusy(true);

      timer.current = setTimeout(() => {
        setBusy(false);
        advance(index, next);
      }, ADVANCE_MS);
    },
    [busy, config, index, answers, advance],
  );

  const goBack = useCallback(() => {
    if (busy || index === 0) return;
    setResumed(false);
    setIndex(index - 1);
  }, [busy, index]);

  const goForward = useCallback(() => {
    if (busy) return;
    const question = config.questions[index];
    if (!question || answers[question.id] === undefined) return;
    setResumed(false);
    advance(index, answers);
  }, [busy, config, index, answers, advance]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const slot = Number.parseInt(event.key, 10);
      if (slot >= 1 && slot <= config.scale.values.length) {
        event.preventDefault();
        select(config.scale.values[slot - 1].value);
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "Backspace") {
        event.preventDefault();
        goBack();
        return;
      }
      if (event.key === "ArrowRight" || event.key === "Enter") {
        event.preventDefault();
        goForward();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [config, select, goBack, goForward]);

  const question = config.questions[index] ?? config.questions[0];
  const current = answers[question?.id];
  const remaining = total - answeredCount;

  if (!question) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col gap-6 sm:gap-8 px-4 pt-2 pb-8 sm:px-6 sm:pb-12">
      <header className="mx-auto w-full max-w-2xl">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-[13px] font-bold tracking-(--tracking-plate) text-accent uppercase">
            {t(config.title_key)}
          </h1>
          <p className="text-[13px] font-medium tabular-nums text-muted">
            {t("flow.progress", { current: index + 1, total })}
          </p>
        </div>

        {/* Fills by answers banked, not by position — going back to revise
            must not read as losing progress. */}
        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={answeredCount}
          aria-label={t("flow.answered", { count: answeredCount })}
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          />
        </div>

        <p className="mt-2 h-4 text-[12px] text-muted/70">
          {resumed ? t("flow.resumed") : ""}
        </p>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-12">
        <div key={question.id} className="statement-enter">
          <p className="font-mono text-[11px] tracking-[0.24em] text-muted/60 uppercase">
            {question.id}
          </p>
          <p className="display-optical mt-4 font-display text-[1.7rem] font-bold leading-[1.25] text-balance sm:text-[2.1rem]">
            {t(question.text_key)}
          </p>
        </div>

        <ScaleControl
          config={config}
          value={current}
          onSelect={select}
          disabled={busy}
        />
      </main>

      <footer className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4">
        <button
          type="button"
          onClick={goBack}
          disabled={index === 0 || busy}
          className="rounded-(--radius-control) border border-line px-4 py-2 text-[14px] font-medium text-muted transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none"
        >
          ← {t("flow.back")}
        </button>

        <p className="hidden text-[13px] text-muted/70 sm:block">
          {t("flow.hint")}
        </p>

        <p className="text-[13px] tabular-nums text-muted/70">
          {remaining > 0 ? t("flow.incomplete", { count: remaining }) : ""}
        </p>
      </footer>
    </div>
  );
}
