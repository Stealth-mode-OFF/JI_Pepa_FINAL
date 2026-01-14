import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Section } from "./Layout";

export const Instructor = () => {
  const { t } = useTranslation();

  const highlights = [
    t("instructor.highlights.0", "12+ years teaching Czech for expats"),
    t("instructor.highlights.1", "Focus on real-life language, not exams"),
    t("instructor.highlights.2", "Small groups + community integration"),
  ];

  return (
    <Section className="bg-[var(--ds-color-neutral-0)] border-t border-[var(--ds-color-neutral-900)]" id="instructor">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <span className="type-ui-sm text-[var(--ds-color-neutral-700)]">
              {t("instructor.label", "Your instructor")}
            </span>
            <h2 className="type-h2 md:text-[var(--ds-type-h1-size)]">
              {t("instructor.title", "Meet the team behind your Czech confidence.")}
            </h2>
            <p className="font-[var(--ds-font-family-display)] text-[var(--ds-type-body-lg-size)] leading-[var(--ds-type-body-lg-line-height)] text-[var(--ds-color-neutral-700)] max-w-xl">
              {t(
                "instructor.body",
                "We teach the Czech you need for landlords, colleagues, and coffee chats. Expect practical scenarios and real feedback.",
              )}
            </p>
            <ul className="space-y-2 font-[var(--ds-font-family-display)] text-[16px] text-[var(--ds-color-neutral-900)]">
              {highlights.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="border border-[var(--ds-color-neutral-900)] bg-[var(--ds-color-neutral-50)] p-8 shadow-[var(--ds-shadow-dense-lg)]">
            <p className="type-ui-sm text-[var(--ds-color-neutral-700)]">
              {t("instructor.cardLabel", "Why students stay")}
            </p>
            <p className="font-[var(--ds-font-family-display)] text-[var(--ds-type-body-lg-size)] leading-[var(--ds-type-body-lg-line-height)] mt-4">
              {t(
                "instructor.cardBody",
                "“It felt like a community from day one. The class was intense, but always supportive.”",
              )}
            </p>
            <p className="font-[var(--ds-font-family-display)] text-[13px] text-[var(--ds-color-neutral-700)] mt-4">
              {t("instructor.cardAttribution", "— Lucie, Lead Instructor")}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
};
