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
    <Section className="bg-white border-t border-black" id="instructor">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <span className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] text-[#6a7282]">
              {t("instructor.label", "Your instructor")}
            </span>
            <h2 className="font-['Montserrat'] font-bold text-[40px] md:text-[56px] leading-[1.1] tracking-[-1.5px]">
              {t("instructor.title", "Meet the team behind your Czech confidence.")}
            </h2>
            <p className="font-['Montserrat'] text-[18px] leading-[28px] text-[#6a7282] max-w-xl">
              {t(
                "instructor.body",
                "We teach the Czech you need for landlords, colleagues, and coffee chats. Expect practical scenarios and real feedback.",
              )}
            </p>
            <ul className="space-y-2 font-['Montserrat'] text-[16px] text-black">
              {highlights.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="border border-black bg-[#f9f9f9] p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] text-[#6a7282]">
              {t("instructor.cardLabel", "Why students stay")}
            </p>
            <p className="font-['Montserrat'] text-[18px] leading-[28px] mt-4">
              {t(
                "instructor.cardBody",
                "“It felt like a community from day one. The class was intense, but always supportive.”",
              )}
            </p>
            <p className="font-['Montserrat'] text-[13px] text-[#6a7282] mt-4">
              {t("instructor.cardAttribution", "— Lucie, Lead Instructor")}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
};
