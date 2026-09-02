import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { StandpointFullLogo } from "@/components/StandpointLogo";
import { ThemeToggle } from "@/components/ThemeToggle";

/**
 * Shared chrome present across all pages, including when taking assessments.
 */
export async function SiteHeader({ locale }: { locale: string }) {
  const t = await getTranslations();

  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-7">
      <Link
        href={`/${locale}`}
        className="group flex items-center shrink-0 transition-transform duration-150 hover:opacity-90 active:scale-[0.99]"
        aria-label="Standpointly"
      >
        <StandpointFullLogo className="h-8 sm:h-9 md:h-10 w-auto block text-ink" />
      </Link>

      <nav className="flex items-center gap-3.5 sm:gap-6 text-[13px] sm:text-[15px] font-medium text-muted">
        <Link href={`/${locale}/about`} className="hover:text-ink transition-colors">
          {t("nav.about")}
        </Link>
        <Link href={`/${locale}/method`} className="hover:text-ink transition-colors">
          {t("nav.method")}
        </Link>
        <Link href={`/${locale}/privacy`} className="hover:text-ink transition-colors">
          {t("nav.privacy")}
        </Link>
      </nav>
    </header>
  );
}
