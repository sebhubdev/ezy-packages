import React from "react";
import { NavLink } from "react-router-dom";
import { BaseHeader } from "@ezycore/ui/components/layout";

const Header = () => (
  <BaseHeader className="app-header">
    <div className="app-header__inner ctn ctn--lg">
      <NavLink to="/" className="app-header__brand">{APP_NAME}</NavLink>
      <nav aria-label="Main navigation" className="app-header__nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </div>
  </BaseHeader>
);
export default Header;
