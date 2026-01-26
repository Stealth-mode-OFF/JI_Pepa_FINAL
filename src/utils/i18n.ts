import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import cs from '../locales/cs.json';
import en from '../locales/en.json';
import it from '../locales/it.json';
import ru from '../locales/ru.json';
import uk from '../locales/uk.json';

const supportedLanguages = ['en', 'cs', 'uk', 'ru', 'it'];

const detectLanguage = (): string => {
  if (typeof window === 'undefined') return 'en';
  
  // First check if user has manually selected a language
  const storedLanguage = window.localStorage.getItem('site_lang');
  if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
    return storedLanguage;
  }
  
  // Detect browser language
  const browserLang = navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage || 'en';
  const primaryLang = browserLang.toLowerCase().split('-')[0];
  
  // Map common language variations
  const languageMap: Record<string, string> = {
    'en': 'en',
    'cs': 'cs',
    'cz': 'cs', // Czech alternative code
    'uk': 'uk',
    'ua': 'uk', // Ukrainian alternative code
    'ru': 'ru',
    'it': 'it',
  };
  
  const detectedLang = languageMap[primaryLang];
  
  // Return detected language if supported, otherwise fallback to English
  return detectedLang && supportedLanguages.includes(detectedLang) ? detectedLang : 'en';
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
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
});

export default i18n;
