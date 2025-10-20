import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import uz from "./locales/uz.json";
import ar from "./locales/ar.json";
import zh from "./locales/zh.json";

const savedLang = localStorage.getItem("lang") || "en"; // saqlangan tilni olamiz

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    uz: { translation: uz },
    ar: { translation: ar },
    zh: { translation: zh },
  },
  lng: savedLang, // saqlangan til yoki default
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
