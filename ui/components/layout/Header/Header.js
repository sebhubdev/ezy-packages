import React from "react";
import { Link } from "react-router-dom";
import Navigator from "@ezycore/ui/components/organisms/Navigator";
import Image from "@ezycore/ui/components/atoms/Image";
import logo from "@ezycore/ui/assets/img/logo-sample.png";

const Header = ({ nav = [], children }) => (
  <header id="mainHeader" className="main-header">
    <div className="main-header__inner ctn ctn--lg">
      <div className="main-header__top">
        <Link className="main-header__top__logo" to="/">
          <Image image={{ url: logo, alt: "Logo" }} />
        </Link>
        <Navigator items={nav} />
        {children}
      </div>
    </div>
  </header>
);
export default Header;
