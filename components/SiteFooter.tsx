import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function SiteFooter({ locale }: { locale: string }) {
  const t = await getTranslations();

  return (
    <footer className="border-t border-line mt-auto bg-canvas">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-[14px] text-muted">
        <p>© {new Date().getFullYear()} Standpointly. {t("landing.footer_note")}</p>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href={`/${locale}/about`} className="hover:text-ink transition-colors">
            {t("nav.about")}
          </Link>
          <Link href={`/${locale}/method`} className="hover:text-ink transition-colors">
            {t("nav.method")}
          </Link>
          <Link href={`/${locale}/privacy`} className="hover:text-ink transition-colors">
            {t("nav.privacy")}
          </Link>
          <Link href={`/${locale}/terms`} className="hover:text-ink transition-colors">
            {t("nav.terms")}
          </Link>
          <Link href={`/${locale}/contact`} className="hover:text-ink transition-colors">
            {t("nav.contact")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
