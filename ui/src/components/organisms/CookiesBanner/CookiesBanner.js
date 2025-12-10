import React from "react";
import Heading from "@ezycore/ui/src/components/atoms/Typo/Heading";
import { t } from "@ezycore/i18n/src";
import Btn from "@ezycore/ui/src/components/atoms/Btn";
import classNames from "classnames";

const CookiesBanner = () => {
  const [mounted, setMounted] = React.useState(false);
  const [showBanner, setShowBanner] = React.useState(false);
  const [consented, setConsented] = React.useState(true);

  React.useEffect(() => {
    if (!mounted) {
      setMounted(true);
    } else {
      let cookiesconsent = localStorage.getItem("cookiesconsent");
      if (!cookiesconsent) {
        setConsented(false);
        setTimeout(() => {
          setShowBanner(true);
          setTimeout(() => {
            setTimer();
          }, 1000);
        }, 1000);
      }
    }
  }, [mounted]);

  const accept = () => {
    localStorage.setItem("cookiesconsent", "true");
    setShowBanner(false);
    setTimeout(() => {
      setConsented(true);
    }, 1000);
  };

  const setTimer = () => {
    setTimeout(() => {
      accept();
    }, 10000);
  };

  if (!mounted || consented) return;
  const classes = classNames({
    "cookies-banner": true,
    active: showBanner,
  });

  return (
    <div className={classes}>
      <div className="cookies-banner__inner">
        <div className="cookies-banner__content">
          <span className="cookies-banner__title">{t("cookies title")}</span>
          <p className="cookies-banner__text">{t("cookies text")}</p>
        </div>
        <div className="cookies-banner__actions">
          <Btn onClick={accept}>{t("Accept")}</Btn>
        </div>
      </div>
    </div>
  );
};

export default CookiesBanner;
