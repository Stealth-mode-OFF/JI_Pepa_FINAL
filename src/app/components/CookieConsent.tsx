import React, { useState, useEffect } from "react";
import { Container } from "./Layout";
import { useTranslation } from "react-i18next";
import { grantAnalyticsConsent, revokeAnalyticsConsent } from "@/utils/analytics";

const CONSENT_STORAGE_KEY = 'user_cookie_preferences';

interface CookieConsentDecision {
  analyticsAccepted: boolean;
  timestamp: string;
  version: string;
}

/**
 * Store user's cookie consent decision in localStorage.
 */
const storeCookieConsentDecision = (analyticsAccepted: boolean): void => {
  const decision: CookieConsentDecision = {
    analyticsAccepted,
    timestamp: new Date().toISOString(),
    version: 'v1.0',
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(decision));
};

/**
 * Retrieve user's cookie consent decision from localStorage.
 */
const getCookieConsentDecision = (): CookieConsentDecision | null => {
  const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored) as CookieConsentDecision;
  } catch {
    return null;
  }
};

/**
 * Allow external code to reopen the cookie consent banner.
 * Used by footer "Cookie Preferences" link.
 */
export const reopenCookieConsentBanner = (): void => {
  window.dispatchEvent(new CustomEvent('reopen-cookie-consent'));
};

export const CookieConsent = ({
  onOpenLegal,
}: {
  onOpenLegal?: (section: 'privacy' | 'terms' | 'cookies' | 'accessibility') => void;
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const existingDecision = getCookieConsentDecision();
    if (!existingDecision) {
      setIsVisible(true);
    } else {
      // Apply stored consent decision on page load
      if (existingDecision.analyticsAccepted) {
        grantAnalyticsConsent();
      } else {
        revokeAnalyticsConsent();
      }
    }
  }, []);

  // Listen for reopen events from footer link
  useEffect(() => {
    const handleReopen = () => setIsVisible(true);
    window.addEventListener('reopen-cookie-consent', handleReopen);
    return () => window.removeEventListener('reopen-cookie-consent', handleReopen);
  }, []);

  const handleAccept = () => {
    storeCookieConsentDecision(true);
    grantAnalyticsConsent(); // Enable PostHog tracking
    setIsVisible(false);
  };

  const handleReject = () => {
    storeCookieConsentDecision(false);
    revokeAnalyticsConsent(); // Disable PostHog tracking and clear data
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--ds-color-neutral-0)] border-t border-[var(--ds-color-neutral-900)] p-6 shadow-2xl z-50 transform translate-y-0 transition-transform">
      <Container>
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-[663px]">
               <h4 className="type-ui-sm">
                 {t("cookieConsent.title", "Cookies & Privacy")}
               </h4>
               <p className="font-[var(--ds-font-family-display)] text-[13px] leading-[21.125px] text-[var(--ds-color-neutral-600)]">
                 {t(
                   "cookieConsent.description",
                   "We use cookies to improve the site and analyze traffic. Some are essential, others optional.",
                 )}
                 <button 
                   type="button"
                   onClick={() => onOpenLegal?.('cookies')}
                   className="ml-2 underline text-[var(--ds-color-neutral-600)] hover:text-[var(--ds-color-neutral-900)] transition-colors"
                 >
                   {t("cookieConsent.readPolicy", "Read Policy")}
                 </button>
               </p>
            </div>
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
               <button
                 type="button"
                 onClick={() => onOpenLegal?.('cookies')}
                 className="px-4 h-[40.5px] font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[11px] leading-[16.5px] uppercase tracking-[1.1px] text-[var(--ds-color-neutral-700)] hover:text-[var(--ds-color-neutral-900)] focus:text-[var(--ds-color-neutral-900)] focus:outline-none focus:underline transition-colors"
                 aria-label={t("cookieConsent.aria.settings", "Cookie settings")}
               >
                 {t("cookieConsent.settings", "Settings")}
               </button>
               <button 
                 type="button"
                 onClick={handleReject}
                 className="px-6 h-[42.5px] border border-[var(--ds-color-neutral-300)] font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[11px] leading-[16.5px] uppercase tracking-[1.1px] hover:border-[var(--ds-color-neutral-900)] focus:border-[var(--ds-color-neutral-900)] focus:outline-none focus:ring-2 focus:ring-[var(--ds-color-neutral-900)] focus:ring-offset-2 transition-colors"
                 aria-label={t("cookieConsent.aria.reject", "Reject optional cookies")}
               >
                 {t("cookieConsent.reject", "Reject Optional")}
               </button>
               <button 
                 type="button"
                 onClick={handleAccept}
                 className="px-6 h-[42.5px] bg-[var(--ds-color-neutral-900)] text-[var(--ds-color-neutral-0)] font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[11px] leading-[16.5px] uppercase tracking-[1.1px] hover:bg-[var(--ds-color-neutral-800)] focus:bg-[var(--ds-color-neutral-800)] focus:outline-none focus:ring-2 focus:ring-[var(--ds-color-neutral-0)] focus:ring-offset-2 transition-colors shadow-[var(--ds-shadow-md)]"
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
