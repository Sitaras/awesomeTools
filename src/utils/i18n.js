import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: false,
    lng: "en",
    fallbackLng: false,
    supportedLngs: ["el", "en"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      requestOptions: {
        cache: "no-store",
      },
    },
  });

export default i18n;
