import React from "react";
import I18nProvider, { I18nContext } from "./i18nProvider";
import parse from "html-react-parser";
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import es from "./locales/es.json";

const t = (text, params = {}) => {
  // const i18nContext = React.useContext(I18nContext);
  // const lang = i18nContext.path;
  // const defaultLang = fr;
  // const i18n = {
  //   fr: fr,
  //   en: en,
  //   es: es,
  // };
  // let translated = i18n[lang][text];
  // if (Object.keys(params).length) {
  //   Object.keys(params).map((param) => {
  //     translated = translated.replace(`$${param}$`, params[param]);
  //   });
  //   translated = parse(translated);
  // }
  // return translated || text;
};

export { t, I18nProvider };
