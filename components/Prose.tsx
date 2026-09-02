import { getTranslations } from "next-intl/server";

import { SiteHeader } from "@/components/SiteHeader";

/**
 * Shell for the static pages. Logical properties throughout so these mirror
 * under RTL along with everything else (§7).
 */
export async function Prose({
  locale,
  title,
  lede,
  children,
}: {
  locale: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  const t = await getTranslations();

  return (
    <div className="min-h-[100svh]">
      <SiteHeader locale={locale} />

      <main className="mx-auto max-w-[68ch] px-6 pb-24">
        <h1 className="display-optical font-display text-4xl font-extrabold text-ink">{title}</h1>
        {lede && (
          <p className="mt-6 text-lg leading-[1.65] text-muted">
            {lede}
          </p>
        )}
        <div className="mt-12 flex flex-col gap-10">{children}</div>
      </main>
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[13px] font-bold tracking-(--tracking-plate) text-accent uppercase">
        {title}
      </h2>
      <div className="mt-3 text-[16px] leading-[1.7] text-muted">
        {children}
      </div>
    </section>
  );
}
