import { useTranslation } from "react-i18next";

import { PageContainer, PageSection } from "@/shared/layouts/Page";
import { ButtonLink } from "@/shared/ui";

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
      className="bg-[var(--ds-color-neutral-900)] text-[var(--ds-color-neutral-0)] border-t border-[var(--ds-color-neutral-900)]"
    >
      <PageContainer>
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl space-y-3">
            <span className="block type-ui-sm text-[var(--ds-color-neutral-500)]">
              {t("pricing.label", "Pricing")}
            </span>
            <h2 className="type-h2 md:text-[var(--ds-type-h1-size)]">
              {t("pricing.title", "Clear pricing. Zero surprises.")}
            </h2>
          </div>
          <p className="font-[var(--ds-font-family-display)] text-[var(--ds-color-neutral-500)] text-[var(--ds-type-body-sm-size)] leading-[var(--ds-type-body-sm-line-height)] max-w-sm">
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
    <div className="border border-[var(--ds-color-neutral-0-30)] bg-[var(--ds-color-neutral-900)] p-8 shadow-[0_10px_0px_var(--ds-color-neutral-0-30)]">
      {/* Plan name */}
      <h3 className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[24px] leading-[32px]">
        {plan.name}
      </h3>

      {/* Price */}
      <p className="font-[var(--ds-font-family-display)] text-[28px] font-[var(--ds-font-weight-bold)] mt-4">
        {plan.price}
      </p>

      {/* Billing cadence */}
      <p className="font-[var(--ds-font-family-display)] text-[13px] text-[var(--ds-color-neutral-500)] mt-1">
        {plan.cadence}
      </p>

      {/* Features list */}
      <ul className="mt-6 space-y-2 text-[14px] text-[var(--ds-color-neutral-300)] font-[var(--ds-font-family-display)]">
        {plan.features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>

      {/* CTA button */}
      <ButtonLink
        href={plan.ctaHref}
        className="mt-8 h-[52px] w-full bg-[var(--ds-color-accent-base)] text-[var(--ds-color-neutral-900)] type-ui-sm border border-[var(--ds-color-neutral-900)] hover:bg-[var(--ds-color-accent-dark)] transition-colors"
      >
        {plan.ctaText}
      </ButtonLink>
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
      ctaHref: "mailto:josef@jazykaintegrace.cz?subject=Private%20Czech%20Classes",
    },
  ];
}
