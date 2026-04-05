import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ko from "./locales/ko.json";

const detectBrowserLang = (): "ko" | "en" => (navigator.language.startsWith("en") ? "en" : "ko");

const locale =
  localStorage.getItem("upbrella-lang") || import.meta.env.VITE_LOCALE || detectBrowserLang();

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
  },
  lng: locale,
  fallbackLng: "ko",
  interpolation: { escapeValue: false },
});

export default i18n;
