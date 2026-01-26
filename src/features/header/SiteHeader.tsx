import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { type FlagCode,FlagIcon } from "@/app/components/Icons";
import imgLogo from "@/assets/logo.png";

/**
 * SiteHeader
 *
 * Main navigation header that appears on all landing pages.
 * Features: Logo, primary navigation, language switcher, mobile menu.
 *
 * Domain Concept: Primary navigation and branding for the site.
 *
 * Responsibilities:
 * - Display site logo
 * - Provide navigation links (desktop and mobile)
 * - Language selection
 * - Responsive behavior
 */
export const SiteHeader = () => {
  const { t, i18n } = useTranslation();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileFirstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Navigation items (sourced from i18n)
  const navigationItems = [
    { label: t("header.method", "Method"), href: "#method" },
    { label: t("header.courses", "Courses"), href: "#courses" },
    { label: t("header.contact", "Contact"), href: "#contact" },
    { label: t("header.guide", "Guide"), href: "/cheat-sheet" },
  ];

  // Supported languages
  const SUPPORTED_LANGUAGES = ["en", "cs", "uk", "ru", "it"] as const;
  const currentLanguage = (i18n.language || "en").split("-")[0];
  const activeLanguageCode: FlagCode = SUPPORTED_LANGUAGES.includes(
    currentLanguage as (typeof SUPPORTED_LANGUAGES)[number]
  )
    ? (currentLanguage as FlagCode)
    : "en";
  const activeLanguageName = t(
    `header.languages.${activeLanguageCode}`,
    activeLanguageCode.toUpperCase()
  );

  // ============================================
  // EFFECTS: Language dropdown click-outside
  // ============================================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    if (isLanguageMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguageMenuOpen]);

  // ============================================
  // EFFECTS: Mobile menu accessibility
  // ============================================
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    mobileFirstLinkRef.current?.focus();
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // ============================================
  // EFFECTS: HTML language attribute
  // ============================================
  useEffect(() => {
    document.documentElement.lang = i18n.language || "en";
  }, [i18n.language]);

  // ============================================
  // HANDLERS
  // ============================================
  const handleLanguageChange = async (langCode: string) => {
    await i18n.changeLanguage(langCode);
    setIsLanguageMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 h-20 flex items-center">
      <div className="w-full px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          aria-label={t("header.homeLink", "Go to homepage")}
          className="focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
        >
          <img
            src={imgLogo}
            alt={t("header.logoAlt", "Jazyk a Integrace logo")}
            className="w-12 h-12 object-contain"
          />
        </a>

        {/* Desktop navigation and language selector */}
        <div className="flex items-center gap-8">
          {/* Desktop nav links */}
          <DesktopNavigation navigationItems={navigationItems} />

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200 hidden md:block" />

          {/* Language selector */}
          <LanguageSelector
            ref={languageMenuRef}
            isOpen={isLanguageMenuOpen}
            activeLanguageName={activeLanguageName}
            activeLanguageCode={activeLanguageCode}
            supportedLanguages={SUPPORTED_LANGUAGES}
            onToggle={() => setIsLanguageMenuOpen((prev) => !prev)}
            onChange={handleLanguageChange}
          />

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label={t("header.mobileMenuToggle", "Toggle menu")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 right-0 bg-white border-b border-gray-100 md:hidden shadow-lg"
          >
            <div className="px-6 py-4 space-y-4">
              {navigationItems.map((item, index) => (
                <a
                  key={item.href}
                  ref={index === 0 ? mobileFirstLinkRef : undefined}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-['Inter'] font-bold text-[12px] uppercase tracking-[1.2px] text-black hover:text-gray-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-['Inter'] font-bold text-[12px] uppercase tracking-[1.2px] text-black hover:text-gray-600 transition-colors"
              >
                {t("header.login", "Student Login")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// ============================================
// SUBCOMPONENTS
// ============================================

/**
 * DesktopNavigation
 * Renders navigation links for desktop screens only.
 */
function DesktopNavigation({
  navigationItems,
}: {
  navigationItems: Array<{ label: string; href: string }>;
}) {
  return (
    <nav
      className="hidden md:flex items-center gap-8"
      aria-label="Primary navigation"
    >
      {navigationItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="font-['Inter'] font-bold text-[12px] leading-[18px] uppercase tracking-[1.2px] hover:text-gray-600 focus:text-gray-600 focus:outline-none focus:underline transition-colors"
        >
          {item.label}
        </a>
      ))}
      <a
        href="/login"
        className="font-['Inter'] font-bold text-[12px] leading-[18px] uppercase tracking-[1.2px] hover:text-gray-600 focus:text-gray-600 focus:outline-none focus:underline transition-colors"
      >
        Login
      </a>
    </nav>
  );
}

/**
 * LanguageSelector
 * Dropdown menu for selecting the current language.
 */
type LanguageSelectorProps = {
  isOpen: boolean;
  activeLanguageName: string;
  activeLanguageCode: FlagCode;
  supportedLanguages: readonly FlagCode[];
  onToggle: () => void;
  onChange: (langCode: FlagCode) => void;
};

const LanguageSelector = forwardRef<HTMLDivElement, LanguageSelectorProps>(
  (
    {
      isOpen,
      activeLanguageName,
      activeLanguageCode,
      supportedLanguages,
      onToggle,
      onChange,
    },
    ref
  ) => {
    const { t } = useTranslation();

    return (
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          aria-label={t("header.languageToggle", "Toggle language menu")}
          aria-expanded={isOpen}
        >
          <FlagIcon code={activeLanguageCode} />
          <span className="text-sm font-bold">{activeLanguageName}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="language-dropdown"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-48"
            >
              <div className="py-2">
                {supportedLanguages.map((langCode) => (
                  <button
                    key={langCode}
                    type="button"
                    onClick={() => onChange(langCode)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      activeLanguageCode === langCode
                        ? "bg-gray-100 font-bold"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {t(`header.languages.${langCode}`, langCode.toUpperCase())}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

LanguageSelector.displayName = "LanguageSelector";
