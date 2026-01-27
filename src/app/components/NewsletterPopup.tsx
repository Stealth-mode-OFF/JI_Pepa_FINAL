import { AnimatePresence, motion } from "motion/react";
import { type FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { CheckIcon } from "./Icons";

interface NewsletterPopupProps {
  delay?: number;
  showOnScroll?: boolean;
  scrollPercentage?: number;
}

export const NewsletterPopup = ({
  delay = 15000,
  showOnScroll = false,
  scrollPercentage = 50,
}: NewsletterPopupProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const leadEndpoint = import.meta.env.VITE_LEAD_FORM_ENDPOINT as string | undefined;

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("newsletter_popup_seen");
    const hasSubscribed = localStorage.getItem("newsletter_subscribed");

    if (hasSeenPopup || hasSubscribed) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let scrollHandler: (() => void) | undefined;

    if (showOnScroll) {
      scrollHandler = () => {
        const scrolled =
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrolled >= scrollPercentage && !isVisible) {
          setIsVisible(true);
          localStorage.setItem("newsletter_popup_seen", "true");
          window.removeEventListener("scroll", scrollHandler!);
        }
      };
      window.addEventListener("scroll", scrollHandler);
    } else {
      timeoutId = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem("newsletter_popup_seen", "true");
      }, delay);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
    };
  }, [delay, showOnScroll, scrollPercentage, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      toast.error(t("newsletterPopup.toasts.invalidEmail", "Please enter a valid email."));
      return;
    }

    setIsSubmitting(true);

    try {
      if (leadEndpoint) {
        const response = await fetch(leadEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source: "newsletter-popup" }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit.");
        }
        toast.success(
          t("newsletterPopup.toasts.success", "Welcome! Check your inbox for confirmation."),
        );
      } else {
        window.location.href = `mailto:josef@jazykaintegrace.cz?subject=${encodeURIComponent(
          t("newsletterPopup.mailto.subject", "Newsletter Signup"),
        )}&body=${encodeURIComponent(
          t("newsletterPopup.mailto.body", `Please add ${email} to the newsletter.`),
        )}`;
        toast.success(
          t("newsletterPopup.toasts.fallback", "Email draft opened. Send to subscribe."),
        );
      }
      localStorage.setItem("newsletter_subscribed", "true");
      setEmail("");
      setTimeout(() => setIsVisible(false), 2000);
    } catch (error) {
      toast.error(t("newsletterPopup.toasts.error", "Something went wrong. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-[540px]"
          >
            <div className="bg-[var(--ds-color-neutral-0)] border-2 border-[var(--ds-color-neutral-900)] shadow-[var(--ds-shadow-dense-xl)] overflow-hidden">
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-full z-10"
                aria-label={t("newsletterPopup.close", "Close popup")}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M2 2L14 14M14 2L2 14" />
                </svg>
              </button>

              <div className="bg-[var(--ds-color-accent-base)] px-8 py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--ds-color-neutral-900)] rounded-full mb-6">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M4 8L16 16L28 8"
                      stroke="var(--ds-color-accent-base)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="4"
                      y="6"
                      width="24"
                      height="18"
                      rx="2"
                      stroke="var(--ds-color-accent-base)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <h3 className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[28px] leading-[1.2] tracking-[-1px] text-[var(--ds-color-neutral-900)] mb-3">
                  {t("newsletterPopup.title", "Stay Connected")}
                </h3>
                <p className="font-[var(--ds-font-family-display)] text-[16px] leading-[24px] text-[var(--ds-color-neutral-900-80)] max-w-md mx-auto">
                  {t(
                    "newsletterPopup.description",
                    "Get weekly Czech tips, cultural insights, and course updates delivered to your inbox.",
                  )}
                </p>
              </div>

              <div className="px-8 py-8 bg-[var(--ds-color-neutral-0)]">
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[var(--ds-color-neutral-900)] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon />
                    </div>
                    <span className="font-[var(--ds-font-family-display)] text-[14px] leading-[21px] text-[var(--ds-color-neutral-900)]">
                      {t("newsletterPopup.benefit1", "Weekly Czech phrases you can use today")}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[var(--ds-color-neutral-900)] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon />
                    </div>
                    <span className="font-[var(--ds-font-family-display)] text-[14px] leading-[21px] text-[var(--ds-color-neutral-900)]">
                      {t("newsletterPopup.benefit2", "Cultural tips for Prague life")}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[var(--ds-color-neutral-900)] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon />
                    </div>
                    <span className="font-[var(--ds-font-family-display)] text-[14px] leading-[21px] text-[var(--ds-color-neutral-900)]">
                      {t("newsletterPopup.benefit3", "Early access to new courses")}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder={t("newsletterPopup.placeholder", "your@email.com")}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="w-full h-[52px] px-4 border-2 border-[var(--ds-color-neutral-200)] font-[var(--ds-font-family-display)] text-[15px] focus:outline-none focus:border-[var(--ds-color-neutral-900)] transition-colors"
                    aria-label={t("newsletterPopup.emailLabel", "Email address")}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-[52px] bg-[var(--ds-color-neutral-900)] text-[var(--ds-color-neutral-0)] type-ui-md hover:bg-[var(--ds-color-neutral-800)] focus:bg-[var(--ds-color-neutral-800)] focus:outline-none focus:ring-2 focus:ring-[var(--ds-color-neutral-900)] focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? t("newsletterPopup.sending", "Subscribing...")
                      : t("newsletterPopup.submit", "Subscribe Now")}
                  </button>
                </form>

                <p className="text-center text-[11px] leading-[16px] text-[var(--ds-color-neutral-700)] font-[var(--ds-font-family-display)] mt-4">
                  {t("newsletterPopup.disclaimer", "We respect your privacy. Unsubscribe anytime.")}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
