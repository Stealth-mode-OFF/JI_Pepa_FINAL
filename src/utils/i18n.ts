import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import cs from '../locales/cs.json';
import uk from '../locales/uk.json';
import ru from '../locales/ru.json';
import it from '../locales/it.json';

i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      cs: { translation: cs },
      uk: { translation: uk },
      ru: { translation: ru },
      it: { translation: it },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
});

export default i18n;
