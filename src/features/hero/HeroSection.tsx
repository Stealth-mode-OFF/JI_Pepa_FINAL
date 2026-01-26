import React from "react";
import { useTranslation } from "react-i18next";
import { PageContainer } from "@/shared/layouts/Page";
import { ArrowDownIcon } from "@/app/components/Icons";

/**
 * HeroSection
 *
 * Main hero section of the landing page.
 * Displays the primary value proposition with a large headline and CTA.
 *
 * Domain Concept: The hero section that captures user attention and guides them to sign up.
 */
export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-32 md:pt-64 pb-16 md:pb-32 min-h-screen flex flex-col justify-between bg-white">
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Main Headline */}
          <div className="lg:col-span-8">
            <h1 className="type-h0 text-[42px] sm:text-[var(--ds-type-h0-size-sm)] md:text-[var(--ds-type-h0-size-md)] xl:text-[var(--ds-type-h0-size)] leading-[1.05] text-[var(--ds-color-neutral-900)] mb-0">
              {t("hero.line1", "YOU LIVE")}
              <br />
              {t("hero.line2", "IN PRAGUE.")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--ds-gradient-accent-to-purple-from)] to-[var(--ds-gradient-accent-to-purple-to)]">
                {t("hero.line3", "SPEAK LIKE IT.")}
              </span>
            </h1>
          </div>

          {/* Supporting copy and CTA */}
          <div className="lg:col-span-4 flex flex-col justify-end gap-8">
            <p className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-medium)] text-[18px] sm:text-[var(--ds-type-body-lg-size)] leading-[1.6] text-[var(--ds-color-neutral-900)] max-w-[540px]">
              {t(
                "hero.subtitle",
                "Language integration for professionals who are tired of being treated like tourists in their own city."
              )}
            </p>
            <a
              href="/signup"
              className="bg-[var(--ds-color-accent-base)] hover:bg-[var(--ds-color-accent-dark)] focus:bg-[var(--ds-color-accent-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--ds-color-neutral-900)] focus:ring-offset-2 transition-all duration-200 text-[var(--ds-color-neutral-900)] h-[52px] px-[28px] type-ui-md inline-flex items-center justify-center w-fit border border-[var(--ds-color-neutral-900)] shadow-[var(--ds-shadow-dense-lg)]"
            >
              {t("hero.cta", "Start Now")}
            </a>
          </div>
        </div>
      </PageContainer>

      {/* Footer metadata */}
      <PageContainer className="mt-14 md:mt-auto">
        <div className="border-t border-black pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <HeroMetadata
              label={t("hero.meta.established", "Est. 2012")}
            />
            <HeroMetadata
              label={t("hero.meta.location", "Prague, CZ")}
            />
            <HeroMetadata
              label={t("hero.meta.levels", "A1 — B2 Levels")}
            />
          </div>
          <ArrowDownIcon />
        </div>
      </PageContainer>
    </section>
  );
};

/**
 * HeroMetadata
 *
 * Small helper component for displaying metadata items in the hero footer.
 * Purpose: Keep hero section DRY by extracting repeated metadata pattern.
 */
function HeroMetadata({ label }: { label: string }) {
  return (
    <div className="space-y-2">
      <span className="block type-ui-sm text-[var(--ds-color-neutral-700)]">
        {label}
      </span>
    </div>
  );
}
