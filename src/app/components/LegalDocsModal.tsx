import { AnimatePresence,motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type LegalSection = "privacy" | "terms" | "cookies" | "accessibility";

type LegalContent = {
  title: string;
  updated: string;
  sections: Array<{ heading: string; paragraphs: string[]; list?: string[] }>;
};

interface LegalDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection: LegalSection;
}

export const LegalDocsModal = ({ isOpen, onClose, initialSection }: LegalDocsModalProps) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<LegalSection>(initialSection);
  const sections: LegalSection[] = ["terms", "privacy", "cookies", "accessibility"];
  const content = t(`legal.${activeSection}`, { returnObjects: true }) as LegalContent;

  useEffect(() => {
    if (isOpen) {
      setActiveSection(initialSection);
    }
  }, [initialSection, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed inset-4 md:inset-12 bg-white z-[61] rounded-lg shadow-2xl overflow-hidden flex flex-col max-w-4xl mx-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col gap-4 p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="font-['Montserrat'] font-bold text-xl uppercase tracking-widest">
                  {content?.title || t("legal.titleFallback", "Legal")}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={t("legal.closeLabel", "Close")}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {sections.map((section) => (
                  <button
                    key={section}
                    type="button"
                    onClick={() => setActiveSection(section)}
                    className={`px-3 py-1.5 rounded-full text-xs font-['Inter'] font-bold uppercase tracking-widest transition-colors ${
                      activeSection === section
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600 hover:text-black"
                    }`}
                  >
                    {t(`legal.${section}.title`, { defaultValue: section })}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 font-['Montserrat']">
                {content?.updated || t("legal.updatedFallback", "Last updated")}
              </p>
            </div>

            <div className="p-8 overflow-y-auto flex-1 font-['Montserrat'] text-gray-600 leading-relaxed space-y-8">
              {content?.sections?.map((section) => (
                <section key={section.heading} className="space-y-3">
                  <h3 className="text-sm uppercase tracking-widest text-gray-900 font-['Inter'] font-bold">
                    {section.heading}
                  </h3>
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.heading}-p-${index}`}>{paragraph}</p>
                  ))}
                  {section.list && (
                    <ul className="list-disc pl-6 space-y-1">
                      {section.list.map((item) => (
                        <li key={`${section.heading}-${item}`}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
