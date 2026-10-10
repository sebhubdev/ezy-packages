import React from "react";
import Brand from "../../Brand/Brand";
import { NavLink } from "react-router-dom";
import { BaseHeader } from "@ezycore/ui/components/layout";

const Header = () => (
  <BaseHeader className="app-header">
    <div className="app-header__inner ctn ctn--lg">
      <NavLink to="/" className="app-header__brand" aria-label="EzyCore home">
        <Brand />
      </NavLink>
      <nav aria-label="Main navigation" className="app-header__nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About EzyCore</NavLink>
      </nav>
    </div>
  </BaseHeader>
);
export default Header;
