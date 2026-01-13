import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import imgLogo from "@/assets/logo.png";
import { FlagIcon } from "./Icons";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileFirstLinkRef = useRef<HTMLAnchorElement | null>(null);

  const navItems = [
    { label: t("header.method", "Method"), href: "#method" },
    { label: t("header.courses", "Courses"), href: "#courses" },
    { label: t("header.contact", "Contact"), href: "#contact" },
    { label: t("header.guide", "Guide"), href: "/cheat-sheet" },
  ];

  const languages = ["en", "cs", "uk", "ru", "it"] as const;
  const currentLanguage = (i18n.language || "en").split("-")[0];
  const activeLanguage = languages.includes(currentLanguage as (typeof languages)[number])
    ? (currentLanguage as (typeof languages)[number])
    : "en";
  const activeLanguageName = t(`header.languages.${activeLanguage}`, activeLanguage.toUpperCase());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangOpen]);

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

  useEffect(() => {
    document.documentElement.lang = i18n.language || "en";
  }, [i18n.language]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 h-20 flex items-center">
      <div className="w-full px-6 md:px-12 flex items-center justify-between">
        <a href="/" aria-label={t("header.homeLink", "Go to homepage")} className="focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm">
          <img src={imgLogo} alt={t("header.logoAlt", "Jazyk a Integrace logo")} className="w-12 h-12 object-contain" />
        </a>
        
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8" aria-label={t("header.primaryNavAria", "Primary")}>
            {navItems.map((item) => (
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
              {t("header.login", "Student Login")}
            </a>
          </nav>
          
          <div className="h-6 w-px bg-gray-200 hidden md:block" />
          
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen((open) => !open)}
              className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              aria-haspopup="menu"
              aria-expanded={isLangOpen}
              aria-label={t("header.languageMenuLabel", {
                language: activeLanguageName,
                defaultValue: `Change language. Current language: ${activeLanguageName}`,
              })}
            >
              <FlagIcon code={activeLanguage} />
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1 1L5 5L9 1" />
              </svg>
            </button>
            {isLangOpen && (
              <div
                className="absolute right-0 mt-3 min-w-[92px] rounded-lg border border-gray-200 bg-white shadow-lg py-2"
                role="menu"
              >
                {languages.map((language) => {
                  const languageName = t(`header.languages.${language}`, language.toUpperCase());
                  return (
                    <button
                      key={language}
                      type="button"
                      onClick={() => {
                        i18n.changeLanguage(language);
                        window.localStorage.setItem("site_lang", language);
                        setIsLangOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[12px] leading-[18px] font-['Inter'] font-bold uppercase tracking-[1.2px] hover:bg-gray-50"
                      role="menuitem"
                      aria-label={languageName}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon code={language} />
                        <span className="sr-only">{languageName}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-black/20 rounded-full"
            aria-label={t("header.mobileMenuLabel", "Open menu")}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <span className="sr-only">{t("header.mobileMenuLabel", "Open menu")}</span>
            <span className="relative w-5 h-5">
              <motion.span
                className="absolute left-0 top-1 h-[2px] w-5 bg-black"
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 top-2.5 h-[2px] w-5 bg-black"
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 top-4 h-[2px] w-5 bg-black"
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-full sm:w-80 bg-white z-50 border-l border-black/10 p-6 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-['Inter'] font-bold text-[12px] uppercase tracking-[1.2px]">
                  {t("header.mobileMenuTitle", "Menu")}
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[12px] font-['Inter'] font-bold uppercase tracking-[1.2px]"
                >
                  {t("header.mobileMenuClose", "Close")}
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    ref={index === 0 ? mobileFirstLinkRef : null}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-['Montserrat'] font-bold text-[20px] text-black"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-['Montserrat'] font-bold text-[20px] text-black"
                >
                  {t("header.login", "Student Login")}
                </a>
              </nav>

              <div className="mt-auto border-t border-black/10 pt-4">
                <p className="font-['Inter'] font-bold text-[10px] uppercase tracking-[1.2px] text-[#6a7282]">
                  {t("header.languageLabel", "Language")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {languages.map((language) => {
                    const languageName = t(`header.languages.${language}`, language.toUpperCase());
                    const isActive = language === activeLanguage;
                    return (
                      <button
                        key={language}
                        type="button"
                        onClick={() => {
                          i18n.changeLanguage(language);
                          window.localStorage.setItem("site_lang", language);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`px-3 py-2 text-[11px] font-['Inter'] font-bold uppercase tracking-[1.1px] border ${
                          isActive ? "border-black bg-[#FFED00]" : "border-black/30"
                        }`}
                      >
                        {languageName}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
