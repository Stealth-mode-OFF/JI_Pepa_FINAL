import React, { useState, useEffect } from "react";
import { Container } from "./Layout";
import { useTranslation } from "react-i18next";

export const CookieConsent = ({
  onOpenLegal,
}: {
  onOpenLegal?: (section: 'privacy' | 'terms' | 'cookies' | 'accessibility') => void;
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black p-6 shadow-2xl z-50 transform translate-y-0 transition-transform">
      <Container>
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-[663px]">
               <h4 className="font-['Montserrat'] font-bold text-[12px] leading-[18px] uppercase tracking-[0.6px]">
                 {t("cookieConsent.title", "Cookies & Privacy")}
               </h4>
               <p className="font-['Montserrat'] text-[13px] leading-[21.125px] text-[#4a5565]">
                 {t(
                   "cookieConsent.description",
                   "We use cookies to improve the site and analyze traffic. Some are essential, others optional.",
                 )}
                 <button 
                   type="button"
                   onClick={() => onOpenLegal?.('cookies')}
                   className="ml-2 underline text-[#4a5565] hover:text-black transition-colors"
                 >
                   {t("cookieConsent.readPolicy", "Read Policy")}
                 </button>
               </p>
            </div>
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
               <button
                 type="button"
                 onClick={() => onOpenLegal?.('cookies')}
                 className="px-4 h-[40.5px] font-['Montserrat'] font-bold text-[11px] leading-[16.5px] uppercase tracking-[1.1px] text-[#6a7282] hover:text-black focus:text-black focus:outline-none focus:underline transition-colors"
                 aria-label={t("cookieConsent.aria.settings", "Cookie settings")}
               >
                 {t("cookieConsent.settings", "Settings")}
               </button>
               <button 
                 type="button"
                 onClick={handleReject}
                 className="px-6 h-[42.5px] border border-[#e5e7eb] font-['Montserrat'] font-bold text-[11px] leading-[16.5px] uppercase tracking-[1.1px] hover:border-black focus:border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
                 aria-label={t("cookieConsent.aria.reject", "Reject optional cookies")}
               >
                 {t("cookieConsent.reject", "Reject Optional")}
               </button>
               <button 
                 type="button"
                 onClick={handleAccept}
                 className="px-6 h-[42.5px] bg-black text-white font-['Montserrat'] font-bold text-[11px] leading-[16.5px] uppercase tracking-[1.1px] hover:bg-gray-800 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                 aria-label={t("cookieConsent.aria.accept", "Accept all cookies")}
               >
                 {t("cookieConsent.accept", "Accept All")}
               </button>
            </div>
         </div>
      </Container>
    </div>
  );
};
