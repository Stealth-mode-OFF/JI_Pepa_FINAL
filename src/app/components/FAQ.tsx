import React from "react";
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
    <Section className="bg-white border-t border-black" id="faq">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl space-y-3">
            <span className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] text-[#6a7282]">
              {t("faq.label", "FAQ")}
            </span>
            <h2 className="font-['Montserrat'] font-bold text-[40px] md:text-[56px] leading-[1.1] tracking-[-1.5px]">
              {t("faq.title", "Answers to common questions")}
            </h2>
          </div>
          <p className="font-['Montserrat'] text-[#6a7282] text-[14px] leading-[21px] max-w-sm">
            {t("faq.subtitle", "Quick clarity before you commit.")}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="border border-black px-6 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <summary className="cursor-pointer font-['Montserrat'] font-bold text-[16px]">
                {item.question}
              </summary>
              <p className="mt-3 font-['Montserrat'] text-[15px] leading-[24px] text-[#6a7282]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
};
