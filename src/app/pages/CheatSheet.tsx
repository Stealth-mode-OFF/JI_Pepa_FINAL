import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { SiteFooter } from "@/features/footer/SiteFooter";
import { SiteHeader } from "@/features/header/SiteHeader";
import { trackEvent, trackPageView } from "@/utils/analytics";

import { SEO } from "../components/SEO";
import { SocialShare } from "../components/SocialShare";

interface PhraseItem {
  czech: string;
  pronunciation: string;
  meaning: string;
  context: string;
}

const CheatSheet = () => {
  const { t } = useTranslation();

  useEffect(() => {
    trackPageView("Czech Cheat Sheet");
  }, []);

  const handleDownload = () => {
    trackEvent("pdf_download_clicked", {
      page: "cheat_sheet",
      content_type: "czech_phrases",
    });
    window.print();
  };

  const getSectionItems = (sectionKey: string): PhraseItem[] => {
    const items = t(`cheatSheet.sections.${sectionKey}.phrases`, { returnObjects: true });
    return Array.isArray(items) ? (items as PhraseItem[]) : [];
  };

  const sections = [
    {
      key: "conversation",
      emoji: "🗣️",
      title: t("cheatSheet.sections.conversation.title", "Conversation Starters & Small Talk"),
    },
    {
      key: "polite",
      emoji: "🤝",
      title: t("cheatSheet.sections.polite.title", "Softening Requests (Be Polite, Not Pushy)"),
    },
    {
      key: "fillers",
      emoji: "⏸️",
      title: t("cheatSheet.sections.fillers.title", "Filling Pauses & Thinking Out Loud"),
    },
    {
      key: "reactions",
      emoji: "😅",
      title: t("cheatSheet.sections.reactions.title", "Reacting & Expressing Emotion"),
    },
    {
      key: "pub",
      emoji: "🍺",
      title: t("cheatSheet.sections.pub.title", "At the Pub, Restaurant, or Shop"),
    },
    {
      key: "practical",
      emoji: "🚇",
      title: t("cheatSheet.sections.practical.title", "Getting Around & Practical Phrases"),
    },
    {
      key: "street",
      emoji: "💬",
      title: t("cheatSheet.sections.street.title", "Understanding Street Czech"),
    },
    {
      key: "plans",
      emoji: "🎯",
      title: t("cheatSheet.sections.plans.title", "Agreements & Plans"),
    },
    {
      key: "goodbyes",
      emoji: "😊",
      title: t("cheatSheet.sections.goodbyes.title", "Closing & Goodbyes"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "cheatSheet.seo.title",
          "Free Czech Cheat Sheet - 50 Essential Phrases | Jazyk a Integrace",
        )}
        description={t(
          "cheatSheet.seo.description",
          "Download your free Czech language cheat sheet with 50 essential phrases for small talk, requests, and street Czech. Sound like a local in Prague!",
        )}
        keywords={t(
          "cheatSheet.seo.keywords",
          "free Czech cheat sheet, Czech phrases, Czech for beginners, learn Czech Prague, Czech language guide, essential Czech phrases",
        )}
        path="/cheat-sheet"
        type="article"
        schemaType="HowTo"
      />
      <div className="no-print">
        <SiteHeader />
      </div>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-5xl">
        {/* Header Section */}
        <div className="bg-[var(--ds-color-accent-base)] border-4 border-black rounded-none p-6 sm:p-8 md:p-12 mb-8 sm:mb-12 shadow-[var(--ds-shadow-dense-lg)] print-shadow-none">
          <h1 className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black mb-3 sm:mb-4 uppercase tracking-tight">
            {t("cheatSheet.title", "Natural Czech Cheat Sheet")}
          </h1>
          <p className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-medium)] text-lg sm:text-xl md:text-2xl text-black mb-2">
            {t("cheatSheet.subtitle", "50 Essential Phrases Locals Actually Use")}
          </p>
          <p className="font-[var(--ds-font-family-body)] text-base sm:text-lg text-[var(--ds-color-neutral-900-80)] italic">
            {t(
              "cheatSheet.tagline",
              "Stop sounding like a textbook. Start sounding like you live here.",
            )}
          </p>
          
          <button
            onClick={handleDownload}
            aria-label={t("cheatSheet.downloadAriaLabel", "Download cheat sheet as PDF")}
            className="mt-6 sm:mt-8 no-print bg-black text-[var(--ds-color-accent-base)] font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 uppercase tracking-wide border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[var(--ds-shadow-dense-xs)] w-full sm:w-auto"
          >
            {t("cheatSheet.downloadCta", "📥 Download as PDF")}
          </button>

          {/* Social Share */}
          <div className="mt-6 sm:mt-8 no-print pt-6 sm:pt-8 border-t-2 border-[var(--ds-color-neutral-900-20)]">
            <SocialShare
              url={typeof window !== "undefined" ? window.location.href : ""}
              title={t(
                "cheatSheet.shareText",
                "Just found this free Czech cheat sheet with 50 essential phrases! 🇨🇿",
              )}
            />
          </div>
        </div>

        {/* Intro Section */}
        <div className="bg-white border-4 border-black p-6 sm:p-8 mb-8 sm:mb-12 shadow-[var(--ds-shadow-dense-xs)] print-shadow-none">
          <h2 className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-2xl sm:text-3xl text-black mb-3 sm:mb-4">
            {t("cheatSheet.introTitle", "Why You Need This")}
          </h2>
          <p className="font-[var(--ds-font-family-body)] text-base sm:text-lg text-black mb-4">
            <strong>{t("cheatSheet.introBold", "Grammar tables won't help you at the pub.")}</strong>{" "}
            {t(
              "cheatSheet.introBody1",
              "This cheat sheet gives you the phrases Czechs use every single day—the ones that make you sound natural, not like you're reading from a language app.",
            )}
          </p>
          <p className="font-[var(--ds-font-family-body)] text-base sm:text-lg text-black">
            {t(
              "cheatSheet.introBody2",
              "Master these 50 phrases and you'll handle small talk, soften requests, fill awkward pauses, and actually understand what people say on the street.",
            )}
          </p>
        </div>

        {/* Phrase Sections */}
        {sections.map((section) => {
          const items = getSectionItems(section.key);
          return (
            <div
              key={section.key}
              className="mb-8 sm:mb-12 bg-white border-4 border-black p-5 sm:p-6 md:p-8 shadow-[var(--ds-shadow-dense-xs)] print-shadow-none break-inside-avoid"
            >
              <h3 className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-xl sm:text-2xl text-black mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-4 border-[var(--ds-color-accent-base)]">
                {section.emoji} {section.title}
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                {items.map((phrase, index) => (
                  <div
                    key={index}
                    className="bg-[var(--ds-color-accent-base-10)] border-l-4 border-black p-4 sm:p-5 rounded-none break-inside-avoid"
                  >
                    <div className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-xl sm:text-2xl text-black mb-2">
                      {phrase.czech}
                    </div>
                    <div className="font-[var(--ds-font-family-body)] italic text-[var(--ds-color-neutral-900-60)] text-sm sm:text-base mb-2">
                      {phrase.pronunciation}
                    </div>
                    <div className="font-[var(--ds-font-family-body)] text-base sm:text-lg text-black mb-2">
                      {phrase.meaning}
                    </div>
                    <div className="font-[var(--ds-font-family-body)] text-sm sm:text-base text-[var(--ds-color-neutral-900-70)] italic">
                      {phrase.context}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Pro Tip */}
        <div className="bg-[var(--ds-color-accent-base)] border-l-4 sm:border-l-8 border-black p-5 sm:p-6 mb-8 sm:mb-12 print-shadow-none">
          <p className="font-[var(--ds-font-family-body)] text-base sm:text-lg text-black">
            <strong className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-xl">
              {t("cheatSheet.proTipLabel", "💡 Pro Tip:")}
            </strong>{" "}
            {t(
              "cheatSheet.proTipBody",
              "Don't try to memorize all 50 at once. Pick 5-10 phrases that fit situations you encounter daily. Use them until they feel automatic, then add more. The goal isn't perfection—it's sounding natural and feeling confident in real conversations.",
            )}
          </p>
        </div>

        {/* Footer CTA */}
        <div className="bg-black text-white p-12 text-center border-4 border-black shadow-[var(--ds-shadow-accent-dense-lg)] print-shadow-none">
          <p className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-2xl mb-4 text-[var(--ds-color-accent-base)]">
            {t("cheatSheet.footerTitle", "Want to sound even more natural?")}
          </p>
          <p className="font-[var(--ds-font-family-body)] text-lg mb-8">
            {t(
              "cheatSheet.footerBody",
              "This cheat sheet is just the beginning. Our courses teach you how to actually USE these phrases in real conversations, understand responses, and build genuine fluency.",
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              aria-label={t("cheatSheet.footerAriaLabel", "Start enrollment in Czech courses")}
              className="no-print inline-block bg-[var(--ds-color-accent-base)] text-black font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-lg px-8 py-4 uppercase tracking-wide border-4 border-[var(--ds-color-accent-base)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[var(--ds-shadow-accent-dense-sm)]"
            >
              {t("cheatSheet.footerCta", "Start Enrollment")}
            </a>
            <a
              href="/#courses"
              className="no-print inline-block bg-black text-[var(--ds-color-accent-base)] font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-lg px-8 py-4 uppercase tracking-wide border-4 border-[var(--ds-color-accent-base)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[var(--ds-shadow-accent-dense-sm)]"
            >
              {t("cheatSheet.footerSecondaryCta", "See Cohorts")}
            </a>
          </div>
        </div>
      </main>

      <div className="no-print">
        <SiteFooter />
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-shadow-none {
            box-shadow: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default CheatSheet;
