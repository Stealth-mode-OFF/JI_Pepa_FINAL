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
    <section className="pt-48 pb-16 md:pt-64 md:pb-32 min-h-screen flex flex-col justify-between bg-white">
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Main Headline */}
          <div className="lg:col-span-8">
            <h1 className="font-['Montserrat'] font-bold text-6xl md:text-7xl lg:text-8xl xl:text-[110px] leading-[0.85] tracking-[-3.6px] text-black mb-0">
              {t("hero.line1", "YOU LIVE")}
              <br />
              {t("hero.line2", "IN PRAGUE.")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C608D6] to-[#9810FA]">
                {t("hero.line3", "SPEAK LIKE IT.")}
              </span>
            </h1>
          </div>

          {/* Supporting copy and CTA */}
          <div className="lg:col-span-4 flex flex-col justify-end gap-8">
            <p className="font-['Montserrat'] font-medium text-[18px] leading-[28px] text-black max-w-[427px]">
              {t(
                "hero.subtitle",
                "Language integration for professionals who are tired of being treated like tourists in their own city."
              )}
            </p>
            <a
              href="/signup"
              className="bg-[#FFED00] hover:bg-[#e6d600] focus:bg-[#e6d600] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 text-black h-[55px] px-[33px] font-['Inter'] font-bold text-[14px] uppercase tracking-[1.2496px] inline-flex items-center justify-center w-fit border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              {t("hero.cta", "Start Now")}
            </a>
          </div>
        </div>
      </PageContainer>

      {/* Footer metadata */}
      <PageContainer className="mt-20 md:mt-auto">
        <div className="border-t border-black pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
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
      <span className="block font-['Inter'] font-bold text-[12px] text-[#6a7282] uppercase tracking-[0.6px]">
        {label}
      </span>
    </div>
  );
}
