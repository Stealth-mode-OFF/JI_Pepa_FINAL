import React from "react";
import { Container, Section } from "./Layout";
import { useTranslation } from "react-i18next";

const MethodologyItem = ({ number, title, text }: { number: string; title: string; text: string }) => (
  <div className="border-t border-white/15 py-12 md:py-16 first:border-t-0">
    <div className="flex flex-col gap-4">
      <span className="font-['Inter'] font-bold text-[12px] text-[#6a7282] uppercase tracking-[0.6px]">{number}</span>
      <h3 className="font-['Montserrat'] font-bold text-[32px] md:text-[42px] leading-[1.1] text-white">{title}</h3>
      <p className="font-['Montserrat'] text-[#99a1af] text-[18px] leading-[28px] max-w-[580px]">
        {text}
      </p>
    </div>
  </div>
);

export const Philosophy = () => {
  const { t } = useTranslation();
  
  return (
    <Section className="bg-black text-white border-b border-black/20" id="method">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div className="lg:sticky lg:top-32 h-fit">
            <span className="text-[#FFED00] font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] mb-8 block">
              {t("philosophy.label", "The Methodology")}
            </span>
            <h2 className="font-['Montserrat'] font-bold text-[48px] md:text-[64px] leading-[1.1] tracking-[-2px] mb-12">
              {t("philosophy.title", "The textbook")}
              <br />
              {t("philosophy.titleCont", "is not enough.")}
            </h2>
            <p className="font-['Montserrat'] text-[#99a1af] text-[18px] leading-[28px] max-w-[540px]">
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
