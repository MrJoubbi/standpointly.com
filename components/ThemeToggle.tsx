"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { THEME_ORDER, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
}

/**
 * Three states rather than two: someone whose OS is set to dark should get
 * dark without having to ask, and someone who overrides it should keep their
 * override. "System" is the default and is a real, selectable option.
 */
export function ThemeToggle() {
  const t = useTranslations();
  const [theme, setTheme] = useState<Theme>("system");
  // The stored value is only readable after mount; until then render the
  // neutral label so the markup matches what the server produced.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      /* private mode */
    }
    if (stored === "light" || stored === "dark") setTheme(stored);
    setReady(true);
  }, []);

  function cycle() {
    const next = THEME_ORDER[(THEME_ORDER.indexOf(theme) + 1) % THEME_ORDER.length];
    setTheme(next);
    apply(next);
    try {
      if (next === "system") window.localStorage.removeItem(THEME_STORAGE_KEY);
      else window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* persistence is a convenience */
    }
  }

  const label = t(`theme.${ready ? theme : "system"}`);

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={t("theme.toggle", { current: label })}
      title={t("theme.toggle", { current: label })}
      className="flex items-center gap-2 rounded-(--radius-control) border border-line px-3 py-1.5 text-[13px] font-medium text-muted transition-colors hover:border-accent hover:text-accent motion-reduce:transition-none"
    >
      <Icon theme={ready ? theme : "system"} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function Icon({ theme }: { theme: Theme }) {
  const common = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (theme === "dark") {
    return (
      <svg {...common}>
        <path d="M20 13.4A8.2 8.2 0 1 1 10.6 4a6.6 6.6 0 0 0 9.4 9.4Z" />
      </svg>
    );
  }
  if (theme === "light") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.6v2M12 19.4v2M2.6 12h2M19.4 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="2.8" y="4.2" width="18.4" height="13" rx="2" />
      <path d="M8 20.5h8" />
    </svg>
  );
}
