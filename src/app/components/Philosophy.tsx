import React from "react";
import { Container, Section } from "./Layout";
import { useTranslation } from "react-i18next";

const MethodologyItem = ({ number, title, text }: { number: string; title: string; text: string }) => (
  <div className="border-t border-white/20 pt-[33px] pb-0 first:border-t">
    <div className="flex flex-col gap-4">
      <span className="font-['Inter'] font-bold text-[80px] leading-[120px] text-[rgba(255,255,255,0.1)] tracking-normal">{number}</span>
      <h3 className="font-['Montserrat'] font-bold text-[24px] leading-[36px] text-white mt-[-100px]">{title}</h3>
      <p className="font-['Montserrat'] text-[#99a1af] text-[16px] leading-[26px] max-w-xl">
        {text}
      </p>
    </div>
  </div>
);

export const Philosophy = () => {
  const { t } = useTranslation();
  const items = [
    {
      number: "01",
      title: t("philosophy.items.0.title", "Context over Grammar"),
      text: t(
        "philosophy.items.0.text",
        "We don't just drill cases. We simulate real-life scenarios—bureaucracy, medical visits, social events—so you're ready when they actually happen.",
      ),
    },
    {
      number: "02",
      title: t("philosophy.items.1.title", "Cultural Fluency"),
      text: t(
        "philosophy.items.1.text",
        "Speaking Czech isn't just about words. It's about knowing the unwritten rules of the society. When to be formal, when to push back, and when to joke.",
      ),
    },
    {
      number: "03",
      title: t("philosophy.items.2.title", "Community First"),
      text: t(
        "philosophy.items.2.text",
        "Isolation is the enemy of integration. Our students become a network. We organize hikes, coffees, and events to keep you connected.",
      ),
    },
  ];

  return (
    <Section className="bg-black text-white" id="method">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 h-fit">
            <span className="text-[#FFED00] font-['Inter'] font-bold text-[14px] leading-[21px] uppercase tracking-[2.6496px] mb-6 block">
              {t("philosophy.eyebrow", "The Methodology")}
            </span>
            <h2 className="font-['Montserrat'] font-bold text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] leading-[0.9] tracking-[-3.6px] mb-8">
              {t("philosophy.titleLine1", "The textbook")}<br />
              {t("philosophy.titleLine2", "is not enough.")}
            </h2>
            <p className="font-['Montserrat'] text-[#99a1af] text-[16px] leading-[26px] max-w-md">
              {t(
                "philosophy.body",
                "Most courses teach you how to pass an exam. We teach you how to handle a doctor's appointment, argue with a landlord, and make friends at a bar.",
              )}
            </p>
          </div>
          
          <div className="flex flex-col gap-[128px]">
            {items.map((item) => (
              <MethodologyItem
                key={item.number}
                number={item.number}
                title={item.title}
                text={item.text}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
