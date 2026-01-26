import type { ReactNode } from "react";

import { classNames } from "@/design-system";

/**
 * PageContainer
 *
 * Responsive container with consistent max-width and padding.
 * Purpose: Ensure all pages have consistent horizontal spacing and content width.
 *
 * Usage:
 * <PageContainer>
 *   <h1>Page Title</h1>
 * </PageContainer>
 */
export const PageContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={classNames(
      "max-w-[1329px] mx-auto px-6 md:px-12 w-full",
      className
    )}
  >
    {children}
  </div>
);

/**
 * PageSection
 *
 * Semantic section wrapper with standard vertical spacing.
 * Purpose: Provide visual separation between content sections.
 *
 * Props:
 * - id: For anchor links
 * - className: Additional CSS classes
 * - children: Content
 *
 * Usage:
 * <PageSection id="pricing">
 *   <SectionTitle>Pricing</SectionTitle>
 *   ...
 * </PageSection>
 */
export const PageSection = ({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={classNames("py-20 md:py-32 scroll-mt-24", className)}
  >
    {children}
  </section>
);

/**
 * SectionTitle
 *
 * Semantic heading for page sections.
 * Always use this for section headings instead of raw h2.
 *
 * Props:
 * - label: Small caption above title (optional)
 * - children: The main heading text
 * - subtitle: Description below title (optional)
 * - align: text-left | text-center | text-right
 *
 * Usage:
 * <SectionTitle label="Pricing">
 *   Clear pricing. Zero surprises.
 * </SectionTitle>
 */
export const SectionTitle = ({
  label,
  children,
  subtitle,
  align = "text-left",
}: {
  label?: string;
  children: ReactNode;
  subtitle?: React.ReactNode;
  align?: "text-left" | "text-center" | "text-right";
}) => (
  <div className={classNames("space-y-3 mb-12", align)}>
    {label && (
      <span className="block type-ui-sm text-[var(--ds-color-neutral-700)]">
        {label}
      </span>
    )}
    <h2 className="type-h2 md:text-[var(--ds-type-h1-size)] max-w-xl">
      {children}
    </h2>
    {subtitle && (
      <p className="font-[var(--ds-font-family-display)] text-[var(--ds-color-neutral-500)] text-[var(--ds-type-body-sm-size)] leading-[var(--ds-type-body-sm-line-height)] max-w-sm">
        {subtitle}
      </p>
    )}
  </div>
);
