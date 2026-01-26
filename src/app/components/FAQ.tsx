import { useTranslation } from "react-i18next";

import { Container, Section } from "./Layout";

export const FAQ = () => {
  const { t } = useTranslation();

  const items = [
    {
      question: t("faq.items.0.q", "How do I know my level?"),
      answer: t(
        "faq.items.0.a",
        "If you can handle basics in shops but freeze in conversation, A2 or B1 is typical. We confirm your level during onboarding.",
      ),
    },
    {
      question: t("faq.items.1.q", "How many students are in a cohort?"),
      answer: t("faq.items.1.a", "Maximum 6 students per cohort."),
    },
    {
      question: t("faq.items.2.q", "Can I switch cohorts if my schedule changes?"),
      answer: t(
        "faq.items.2.a",
        "Yes, if there is space in another cohort. We’ll help you reschedule.",
      ),
    },
    {
      question: t("faq.items.3.q", "Do you offer refunds?"),
      answer: t(
        "faq.items.3.a",
        "We offer a full refund within 7 days before the cohort starts.",
      ),
    },
  ];

  return (
    <Section className="bg-[var(--ds-color-neutral-0)] border-t border-[var(--ds-color-neutral-900)]" id="faq">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl space-y-3">
            <span className="type-ui-sm text-[var(--ds-color-neutral-700)]">
              {t("faq.label", "FAQ")}
            </span>
            <h2 className="type-h2 md:text-[var(--ds-type-h1-size)]">
              {t("faq.title", "Answers to common questions")}
            </h2>
          </div>
          <p className="font-[var(--ds-font-family-display)] text-[var(--ds-color-neutral-700)] text-[var(--ds-type-body-sm-size)] leading-[var(--ds-type-body-sm-line-height)] max-w-sm">
            {t("faq.subtitle", "Quick clarity before you commit.")}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="border border-[var(--ds-color-neutral-900)] px-6 py-4 shadow-[var(--ds-shadow-dense-lg)]"
            >
              <summary className="cursor-pointer font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[16px]">
                {item.question}
              </summary>
              <p className="mt-3 font-[var(--ds-font-family-display)] text-[15px] leading-[24px] text-[var(--ds-color-neutral-700)]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
};
