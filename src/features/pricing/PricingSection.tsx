import React from "react";
import { useTranslation } from "react-i18next";
import { PageContainer, PageSection } from "@/shared/layouts/Page";
import { COLORS } from "@/design-system/tokens";

/**
 * PricingSection
 *
 * Displays pricing plans for the course offerings.
 * Shows two main options: cohort-based and private lessons.
 *
 * Domain Concept: Pricing information and plan selection.
 *
 * Responsibilities:
 * - Display pricing plans with features
 * - Provide CTA buttons for enrollment
 */
export const PricingSection = () => {
  const { t } = useTranslation();

  const pricingPlans = getPricingPlans(t);

  return (
    <PageSection
      id="pricing"
      className="bg-black text-white border-t border-black"
    >
      <PageContainer>
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl space-y-3">
            <span className="block font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] text-[#99a1af]">
              {t("pricing.label", "Pricing")}
            </span>
            <h2 className="font-['Montserrat'] font-bold text-[40px] md:text-[56px] leading-[1.1] tracking-[-1.5px]">
              {t("pricing.title", "Clear pricing. Zero surprises.")}
            </h2>
          </div>
          <p className="font-['Montserrat'] text-[#99a1af] text-[14px] leading-[21px] max-w-sm">
            {t(
              "pricing.subtitle",
              "Choose a cohort to integrate fast, or go private for maximum flexibility."
            )}
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </PageContainer>
    </PageSection>
  );
};

// ============================================
// SUBCOMPONENTS
// ============================================

/**
 * PricingCard
 *
 * Individual pricing plan card.
 * Displays plan name, price, features, and CTA button.
 *
 * Props:
 * - plan: Pricing plan data (name, price, features, CTA)
 */
interface PricingPlan {
  id: string;
  name: string;
  price: string;
  cadence: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div className="border border-white/30 bg-black p-8 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.3)]">
      {/* Plan name */}
      <h3 className="font-['Montserrat'] font-bold text-[24px] leading-[32px]">
        {plan.name}
      </h3>

      {/* Price */}
      <p className="font-['Montserrat'] text-[28px] font-bold mt-4">
        {plan.price}
      </p>

      {/* Billing cadence */}
      <p className="font-['Montserrat'] text-[13px] text-[#99a1af] mt-1">
        {plan.cadence}
      </p>

      {/* Features list */}
      <ul className="mt-6 space-y-2 text-[14px] text-[#e5e7eb] font-['Montserrat']">
        {plan.features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>

      {/* CTA button */}
      <a
        href={plan.ctaHref}
        className="mt-8 inline-flex items-center justify-center h-[52px] w-full bg-[#FFED00] text-black font-['Inter'] font-bold text-[12px] uppercase tracking-[1.2px] border border-black hover:bg-[#e6d600] transition-colors"
      >
        {plan.ctaText}
      </a>
    </div>
  );
}

// ============================================
// HELPERS
// ============================================

/**
 * Get pricing plans data
 * Extracted to allow reuse and easier i18n updates
 */
function getPricingPlans(
  t: (key: string, defaultValue: string) => string
): PricingPlan[] {
  return [
    {
      id: "cohort",
      name: t("pricing.plans.0.name", "Cohort Program"),
      price: t("pricing.plans.0.price", "€320"),
      cadence: t("pricing.plans.0.cadence", "per 6-week cohort"),
      features: [
        t("pricing.plans.0.features.0", "Small group (max 6)"),
        t("pricing.plans.0.features.1", "Real-life scenarios"),
        t("pricing.plans.0.features.2", "Community events"),
      ],
      ctaText: t("pricing.plans.0.cta", "Join next cohort"),
      ctaHref: "/signup",
    },
    {
      id: "private",
      name: t("pricing.plans.1.name", "Private Czech"),
      price: t("pricing.plans.1.price", "€55"),
      cadence: t("pricing.plans.1.cadence", "per 60-minute session"),
      features: [
        t("pricing.plans.1.features.0", "1:1 custom plan"),
        t("pricing.plans.1.features.1", "Flexible scheduling"),
        t("pricing.plans.1.features.2", "Progress tracking"),
      ],
      ctaText: t("pricing.plans.1.cta", "Request private classes"),
      ctaHref: "mailto:jazykaintegrace@gmail.com?subject=Private%20Czech%20Classes",
    },
  ];
}
