import React from "react";
import { Container, Section } from "./Layout";
import { useTranslation } from "react-i18next";

const MethodologyItem = ({ number, title, text }: { number: string; title: string; text: string }) => (
  <div className="border-t border-[var(--ds-color-neutral-0-15)] py-12 md:py-16 first:border-t-0">
    <div className="flex flex-col gap-4">
      <span className="type-ui-sm text-[var(--ds-color-neutral-700)]">{number}</span>
      <h3 className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[var(--ds-type-h3-size)] md:text-[var(--ds-type-h2-size)] leading-[var(--ds-type-h3-line-height)] text-[var(--ds-color-neutral-0)]">{title}</h3>
      <p className="font-[var(--ds-font-family-display)] text-[var(--ds-color-neutral-500)] text-[var(--ds-type-body-lg-size)] leading-[var(--ds-type-body-lg-line-height)] max-w-[580px]">
        {text}
      </p>
    </div>
  </div>
);

export const Philosophy = () => {
  const { t } = useTranslation();
  
  return (
    <Section className="bg-[var(--ds-color-neutral-900)] text-[var(--ds-color-neutral-0)] border-b border-[var(--ds-color-neutral-900-20)]" id="method">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div className="lg:sticky lg:top-32 h-fit">
            <span className="type-ui-sm text-[var(--ds-color-accent-base)] mb-8 block">
              {t("philosophy.label", "The Methodology")}
            </span>
            <h2 className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[var(--ds-type-h1-size-sm)] md:text-[var(--ds-type-h0-size-sm)] leading-[var(--ds-type-h1-line-height)] tracking-[var(--ds-type-h1-letter-spacing)] mb-12">
              {t("philosophy.title", "The textbook")}
              <br />
              {t("philosophy.titleCont", "is not enough.")}
            </h2>
            <p className="font-[var(--ds-font-family-display)] text-[var(--ds-color-neutral-500)] text-[var(--ds-type-body-lg-size)] leading-[var(--ds-type-body-lg-line-height)] max-w-[540px]">
              {t(
                "philosophy.intro",
                "Most courses teach you how to pass an exam. We teach you how to handle a doctor's appointment, argue with a landlord, and make friends at a bar.",
              )}
            </p>
          </div>
          
          <div className="flex flex-col">
            <MethodologyItem 
              number="01" 
              title={t("philosophy.item1.title", "Context over Grammar")}
              text={t(
                "philosophy.item1.text",
                "We don't just drill cases. We simulate real-life scenarios—bureaucracy, medical visits, social events—so you're ready when they actually happen.",
              )}
            />
            <MethodologyItem 
              number="02" 
              title={t("philosophy.item2.title", "Cultural Fluency")}
              text={t(
                "philosophy.item2.text",
                "Speaking Czech isn't just about words. It's about knowing the unwritten rules of the society. When to be formal, when to push back, and when to joke.",
              )}
            />
            <MethodologyItem 
              number="03" 
              title={t("philosophy.item3.title", "Community First")}
              text={t(
                "philosophy.item3.text",
                "Isolation is the enemy of integration. Our students become a network. We organize hikes, coffees, and events to keep you connected.",
              )}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};
