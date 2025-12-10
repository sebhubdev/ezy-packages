import React from "react";
import { Link } from "react-router-dom";
import { useLinkResolver } from "@ezycore/hooks";
import { useLocation } from "react-router-dom";
import classNames from "classnames";

const NavItem = ({ item }) => {
  return (
    <li className="nav-item">
      <Link className="nav-item__link " to={item.link} onClick={item.onClick}>
        <span className="nav-item__link__label">{item.label}</span>
      </Link>
    </li>
  );
};

export default NavItem;
