import React from "react";
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
    <Section className="bg-white border-t border-black" id="testimonials">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl space-y-3">
            <span className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] text-[#6a7282]">
              {t("testimonials.label", "Student voices")}
            </span>
            <h2 className="font-['Montserrat'] font-bold text-[40px] md:text-[56px] leading-[1.1] tracking-[-1.5px]">
              {t("testimonials.title", "Real people. Real Czech.")}
            </h2>
          </div>
          <p className="font-['Montserrat'] text-[#6a7282] text-[14px] leading-[21px] max-w-sm">
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
              className="border border-black p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-white"
            >
              <p className="font-['Montserrat'] text-[18px] leading-[28px] text-black">
                “{item.quote}”
              </p>
              <div className="mt-6">
                <p className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px]">
                  {item.name}
                </p>
                <p className="font-['Montserrat'] text-[13px] text-[#6a7282]">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
