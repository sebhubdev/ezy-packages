import React, { useContext } from "react";
import FullLogo from "@ezycore/ui/components/molecules/FullLogo/FullLogo";
import Icon from "@ezycore/ui/components/atoms/Icon";
import Modal from "@ezycore/ui/components/organisms/Modal";
import { Link } from "react-router-dom";
import Navigator from "@ezycore/ui/components/organisms/Navigator";
import LangSelector from "@ezycore/ui/components/molecules/LangSelector";
import langs from "@ezycore/i18n/langs.json";
import SearchBar from "@ezycore/ui/components/molecules/SearchBar";
import LoginSteps from "@ezycore/ui/modules/User/LoginSteps";
import { ShortCart } from "@ezycore/frontend/modules/CheckOut";
import { ShortWishList } from "@ezycore/frontend/modules/WishList";
import { UserNav } from "@ezycore/ui/modules/User";
import Image from "@ezycore/ui/components/atoms/Image";
import logo from "@ezycore/frontend/assets/img/logo-laterre.png";
import { UserContext } from "@ezycore/ui/modules/User/UserProvider";

const Header = ({ nav, userData, setUserData }) => {
  const [isNavOpen, setisNavOpen] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [showLoginSteps, setShowLoginSteps] = React.useState(false);

  const test = useContext(UserContext);

  console.log(test);

  const logoutHandler = () => {
    setShowLoginSteps(false);
    setTimeout(() => {
      if (typeof document != "undefined") {
        localStorage?.removeItem("token");
      }
      setUserData(null);
    }, 300);
  };

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

  const handleUser = () => {
    setShowLoginSteps(true);
  };

  const onLogin = (data) => {
    setShowLoginSteps(false);
    setTimeout(() => {
      setUserData(data);
    }, 300);
  };

  return (
    <>
      <header id="mainHeader" className="main-header">
        <div className="main-header__inner">
          <div className="main-header__top">
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
            <div className="main-header__top__desktop-nav">
              <Navigator items={nav.items} />
            </div>

            <div className="right-nav">
              <div className="right-nav__inner">
                <div className="right-nav__item">
                  <Icon
                    icon="search"
                    classes={showSearch ? "search disabled" : "search"}
                    onClick={openSearch}
                  />
                </div>
                {/* <div className="right-nav__item">
                  <Icon icon="mail" />
                </div> */}
                <div className="right-nav__item">
                  <Icon
                    icon="user"
                    classes={userData ? " logged" : ""}
                    onClick={handleUser}
                  />
                </div>

                {/* <ShortAccount /> */}

                <div className="right-nav__item">
                  <ShortWishList />
                </div>

                <div className="right-nav__item">
                  <ShortCart />
                </div>

                <div className="right-nav__item">
                  <LangSelector currentLang={langs.fr} />
                </div>
              </div>
            </div>

            <div className="main-header__top__mobile-nav">
              <div className={`mobile-nav${isNavOpen ? " open" : ""}`}>
                <div className="mobile-nav__open" onClick={toogleMobileNav}>
                  <Icon icon="burgerMenu" />
                </div>
                <div className="mobile-nav__close" onClick={toogleMobileNav}>
                  <Icon icon="close" />
                </div>

                <Modal
                  isOpen={isNavOpen}
                  setIsOpen={toogleMobileNav}
                  appearance="right"
                >
                  <Navigator items={nav.items} />
                </Modal>
              </div>
            </div>
          </div>
        </div>

        <SearchBar isOpen={showSearch} onBlur={openSearch} />

        {userData ? (
          <Modal
            isOpen={showLoginSteps}
            setIsOpen={setShowLoginSteps}
            appearance="right"
            size="small"
          >
            <UserNav
              setIsOpen={setShowLoginSteps}
              user={userData}
              setUser={setUserData}
            />
          </Modal>
        ) : (
          <Modal
            isOpen={showLoginSteps}
            setIsOpen={setShowLoginSteps}
            appearance="float-middle"
            size="small"
          >
            <LoginSteps onLogin={onLogin} />
          </Modal>
        )}
      </header>
    </>
  );
};

export default Header;
