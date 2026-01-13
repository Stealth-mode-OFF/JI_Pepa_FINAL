import React, { useEffect, useRef, useState } from "react";
import imgLogo from "@/assets/logo.png";
import { FlagIcon } from "./Icons";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { label: t("header.method", "Method"), href: "#method" },
    { label: t("header.courses", "Courses"), href: "#courses" },
    { label: t("header.contact", "Contact"), href: "#contact" },
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
    document.documentElement.lang = i18n.language || "en";
  }, [i18n.language]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 h-20 flex items-center">
      <div className="w-full px-6 md:px-12 flex items-center justify-between">
        <img src={imgLogo} alt={t("header.logoAlt", "Jazyk a Integrace logo")} className="w-12 h-12 object-contain" />
        
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
        </div>
      </div>
    </header>
  );
};
