import React from "react";
import Icon from "@ezycore/ui/components/atoms/Icon";
import langs from "@ezycore/i18n/langs.json";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { t } from "@ezycore/i18n";

const LangSelector = ({ currentLang }) => {
  const [showSelector, setShowSelector] = React.useState(false);
  const changeLang = (newLang) => {
    localStorage.setItem("lang", JSON.stringify(newLang));
    window.location.href = `/${newLang.path}/`;
  };
  const itemClass = classNames({
    "lang-selector__items": true,
    active: showSelector,
  });

  const handleClick = () => {
    setShowSelector(!showSelector);
  };

  const handleMouseLeave = () => {
    setShowSelector(false);
  };
  return (
    <>
      <div className="lang-selector" onMouseLeave={handleMouseLeave}>
        <div className="lang-selector__current" onClick={handleClick}>
          <Icon icon={currentLang.icon} />
        </div>
        <div className={itemClass}>
          <div className="lang-selector__items__inner">
            {Object.keys(langs).map((lang, key) => {
              return (
                langs[lang].code != currentLang.code && (
                  <Link
                    key={key}
                    className="lang-selector__item"
                    onClick={() => changeLang(langs[lang])}
                    to={`/${lang}/`}
                  >
                    <div className="lang-selector__item__icon">
                      <Icon icon={langs[lang].icon} />
                    </div>
                    <div className="lang-selector__item__label">
                      {t(langs[lang].lang)}
                    </div>
                  </Link>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default LangSelector;
