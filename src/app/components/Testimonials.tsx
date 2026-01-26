import { useTranslation } from "react-i18next";

import { Container, Section } from "./Layout";

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      quote: t("testimonials.items.0.quote", "I stopped freezing in meetings after three weeks."),
      name: t("testimonials.items.0.name", "Elena K."),
      role: t("testimonials.items.0.role", "Product Manager, Prague"),
    },
    {
      quote: t("testimonials.items.1.quote", "The course felt like real life, not a textbook."),
      name: t("testimonials.items.1.name", "Tom R."),
      role: t("testimonials.items.1.role", "Engineer, Brno"),
    },
    {
      quote: t("testimonials.items.2.quote", "I finally made Czech friends without awkward pauses."),
      name: t("testimonials.items.2.name", "Maria S."),
      role: t("testimonials.items.2.role", "Designer, Prague"),
    },
  ];

  return (
    <Section className="bg-[var(--ds-color-neutral-0)] border-t border-[var(--ds-color-neutral-900)]" id="testimonials">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl space-y-3">
            <span className="type-ui-sm text-[var(--ds-color-neutral-700)]">
              {t("testimonials.label", "Student voices")}
            </span>
            <h2 className="type-h2 md:text-[var(--ds-type-h1-size)]">
              {t("testimonials.title", "Real people. Real Czech.")}
            </h2>
          </div>
          <p className="font-[var(--ds-font-family-display)] text-[var(--ds-color-neutral-700)] text-[var(--ds-type-body-sm-size)] leading-[var(--ds-type-body-sm-line-height)] max-w-sm">
            {t(
              "testimonials.subtitle",
              "Short, honest reflections from professionals who needed Czech for real life.",
            )}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="border border-[var(--ds-color-neutral-900)] p-6 shadow-[var(--ds-shadow-dense-lg)] bg-[var(--ds-color-neutral-0)]"
            >
              <p className="font-[var(--ds-font-family-display)] text-[var(--ds-type-body-lg-size)] leading-[var(--ds-type-body-lg-line-height)] text-[var(--ds-color-neutral-900)]">
                “{item.quote}”
              </p>
              <div className="mt-6">
                <p className="type-ui-sm">
                  {item.name}
                </p>
                <p className="font-[var(--ds-font-family-display)] text-[13px] text-[var(--ds-color-neutral-700)]">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
