import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Section } from "./Layout";
import { CheckIcon, FreeResourceIcon } from "./Icons";
import { useTranslation } from "react-i18next";

const FeaturePoint = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3">
    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center shrink-0 mt-0.5">
      <CheckIcon />
    </div>
    <span className="font-['Montserrat'] font-bold text-[14px] leading-[21px] text-black">{text}</span>
  </div>
);

export const LeadMagnet = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your API call here
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
    }, 1000);
  };

  const features = [
    t("leadMagnet.feature1", "Handle small talk with confidence"),
    t("leadMagnet.feature2", 'Understand casual "street" Czech'),
    t("leadMagnet.feature3", "Avoid awkward silences"),
  ];

  return (
    <Section className="bg-[#FFED00] border-t border-b border-black">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-3 bg-black/8 border border-black/20 rounded-full px-4 py-2">
              <FreeResourceIcon />
              <span className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] text-black">
                {t("leadMagnet.badge", "Free Resource")}
              </span>
            </div>
            
            <h2 className="font-['Montserrat'] font-bold text-[48px] md:text-[64px] leading-[1.1] tracking-[-2px] text-black">
              {t("leadMagnet.title1", "STOP")}
              <br />
              {t("leadMagnet.title2", "SOUNDING")}
              <br />
              {t("leadMagnet.title3", "LIKE A TEXTBOOK.")}
            </h2>
            
            <div className="space-y-6">
              <p className="font-['Montserrat'] font-medium text-[18px] leading-[28px] text-black/80 max-w-md">
                {t(
                  "leadMagnet.description1",
                  "Most courses teach you grammar tables. Locals don't speak in tables.",
                )}
              </p>
              <p className="font-['Montserrat'] font-medium text-[18px] leading-[28px] text-black/80 max-w-md">
                {t("leadMagnet.description2", "Download our ")}
                <span className="font-bold">{t("leadMagnet.sheetName", '"Natural Czech Cheat Sheet"')}</span>
                {t(
                  "leadMagnet.description3",
                  ": 50 essential phrases to soften requests, fill pauses, and sound like you actually live here.",
                )}
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              {features.map((feature) => (
                <FeaturePoint key={feature} text={feature} />
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full lg:sticky lg:top-32">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] text-black block">
                  {t("leadMagnet.emailLabel", "Work Email")}
                </label>
                <input 
                  type="email" 
                  placeholder={t("leadMagnet.emailPlaceholder", "name@company.com")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-[52px] bg-white border border-black px-4 text-[14px] font-['Montserrat'] text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200"
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[52px] bg-black text-white font-['Inter'] font-bold text-[14px] uppercase tracking-[1.2496px] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? t("leadMagnet.submitting", "Loading...") : t("leadMagnet.cta", "Get the Cheat Sheet")}
              </button>
              <p className="text-center text-[12px] text-gray-500 font-['Montserrat'] leading-[18px]">
                {t("leadMagnet.privacy", "We respect your inbox. Unsubscribe at any time.")}
              </p>
            </form>

            <div className="border-t border-black/10 mt-8 pt-8 flex flex-col gap-4">
              <div className="space-y-2">
                <h3 className="font-['Montserrat'] font-bold text-[20px] text-black">
                  {t("leadMagnet.cheatSheetTitle", "Prefer instant access?")}
                </h3>
                <p className="font-['Inter'] text-[14px] text-black/70">
                  {t(
                    "leadMagnet.cheatSheetBody",
                    "Open the free cheat sheet now and start using the phrases today.",
                  )}
                </p>
              </div>
              
              <Link 
                to="/cheat-sheet"
                className="w-full h-[52px] bg-white text-black border border-black font-['Inter'] font-bold text-[14px] uppercase tracking-[1.2496px] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center justify-center"
              >
                {t("leadMagnet.cheatSheetCta", "View Cheat Sheet")}
              </Link>
              
              <p className="text-center text-[12px] text-gray-500 font-['Montserrat'] leading-[18px]">
                {t("leadMagnet.cheatSheetNote", "No email required for the preview.")}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
