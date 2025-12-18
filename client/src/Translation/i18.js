import i18 from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
//translation json
import fr from "./fr.json";
import de from "./de.json";
import es from "./es.json";
import en from "./en.json"; 
import ar from "./ar.json";

i18
.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources: {
        en: { translation: en },
        fr: { translation: fr },
        de: { translation: de },
        es: { translation: es },
        ar: { translation: ar },
    },
        fallbackLng: 'en',
        supportedLngs: ['en', 'fr', 'de', 'es', 'ar'],
        detection: {
        order:["navigator"], // detect language from browser settings
        },
    interpolation: {
        escapeValue: false, // react already safes from xss 
        }
});

export default i18;