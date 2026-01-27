import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import cs from "../locales/cs.json";
import en from "../locales/en.json";
import it from "../locales/it.json";
import ru from "../locales/ru.json";
import uk from "../locales/uk.json";

const SUPPORTED_LANGUAGES = ["en", "cs", "uk", "ru", "it"] as const;

const LANGUAGE_MAP: Record<string, (typeof SUPPORTED_LANGUAGES)[number]> = {
  en: "en",
  cs: "cs",
  cz: "cs",
  uk: "uk",
  ua: "uk",
  ru: "ru",
  it: "it",
};

const detectLanguage = (): string => {
  if (typeof window === "undefined") return "en";

  const storedLanguage = window.localStorage.getItem("site_lang");
  if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage as (typeof SUPPORTED_LANGUAGES)[number])) {
    return storedLanguage;
  }

  const browserLanguage = navigator.language ||
    (navigator as Navigator & { userLanguage?: string }).userLanguage ||
    "en";
  const primaryLanguage = browserLanguage.toLowerCase().split("-")[0];
  const detected = LANGUAGE_MAP[primaryLanguage];

  return detected && SUPPORTED_LANGUAGES.includes(detected) ? detected : "en";
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    cs: { translation: cs },
    uk: { translation: uk },
    ru: { translation: ru },
    it: { translation: it },
  },
  lng: detectLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
