import React, { useContext } from "react";
import FullLogo from "@ezycore/ui/src/components/molecules/FullLogo/FullLogo";
import Icon from "@ezycore/ui/src/components/atoms/Icon";
import Modal from "@ezycore/ui/src/components/organisms/Modal";
import { Link } from "react-router-dom";
import Navigator from "@ezycore/ui/src/components/organisms/Navigator";
import LangSelector from "@ezycore/ui/src/components/molecules/LangSelector";
import langs from "@ezycore/i18n/src/langs.json";
import SearchBar from "@ezycore/ui/src/components/molecules/SearchBar";
import LoginSteps from "@ezycore/ui/src/modules/User/LoginSteps";
import { UserNav } from "@ezycore/ui/src/modules/User";
import Image from "@ezycore/ui/src/components/atoms/Image";
import logo from "@ezycore/ui/src/assets/img/logo.png";
import { UserContext } from "@ezycore/ui/src/modules/User/UserProvider";
import ShortAccount from "@ezycore/ui/src/modules/User/ShortAccount";

const Header = ({ nav, userData, setUserData, loginHandler }) => {
  const [isNavOpen, setisNavOpen] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [isSmall, setIsSmall] = React.useState(false);

  const logoutHandler = () => {
    setShowLoginSteps(false);
    setTimeout(() => {
      if (typeof document != "undefined") {
        localStorage?.removeItem("token");
      }
      setUserData(null);
    }, 300);
  };

  const handleScroll = () => {
    const y = window.scrollY;
    if (y >= 80) {
      setIsSmall(true);
    } else {
      setIsSmall(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toogleMobileNav = () => {
    setisNavOpen(!isNavOpen);
  };
  const closeMobileNav = () => {
    setisNavOpen(false);
  };

  const openSearch = (e) => {
    e.stopPropagation();
    setShowSearch(!showSearch);
  };

  const onLogin = (data) => {
    setShowLoginSteps(false);
    setTimeout(() => {
      setUserData(data);
    }, 300);
  };

  const testNav = [
    {
      label: "Familles",
      link: "/",
      onClick: closeMobileNav,
    },
    {
      label: "Adultes",
      link: "/persons",
      onClick: closeMobileNav,
    },
    {
      label: "Enfants",
      link: "/students",
      onClick: closeMobileNav,
    },
  ];

  return (
    <>
      <header
        id="mainHeader"
        className={`main-header${isSmall ? " small" : ""}`}
      >
        <div className="main-header__inner ctn ctn-lg">
          <div className="main-header__top">
            <div className="main-header__top__mobile-nav">
              <div className={`mobile-nav${isNavOpen ? " open" : ""}`}>
                <div className="mobile-nav__open" onClick={toogleMobileNav}>
                  <Icon icon="burgerMenu" />
                </div>
                <div className="mobile-nav__close" onClick={toogleMobileNav}>
                  <Icon icon="close" />
                </div>
                {testNav && (
                  <Modal
                    isOpen={isNavOpen}
                    setIsOpen={toogleMobileNav}
                    appearance="right"
                  >
                    <Navigator items={testNav} />
                  </Modal>
                )}
              </div>
            </div>
            <Link
              className="main-header__top__logo"
              to={`/`}
              onClick={closeMobileNav}
            >
              <Image
                image={{
                  url: logo,
                  alt: "Logo",
                }}
              />
            </Link>
            {testNav && (
              <div className="main-header__top__desktop-nav">
                <Navigator items={testNav} />
              </div>
            )}
            <div className="right-nav">
              <div className="right-nav__inner">
                <div className="right-nav__item">
                  <ShortAccount />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
