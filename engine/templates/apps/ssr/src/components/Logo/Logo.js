import React from "react";
import color from "../../assets/img/ezycore-color.png";
import dark from "../../assets/img/ezycore-dark.png";
import mono from "../../assets/img/ezycore-mono.png";

const sources = { color, dark, mono };

const Logo = ({ variant = "color", className = "", alt = "EzyCore" }) => (
  <img
    src={sources[variant] || color}
    className={`app-logo ${className}`.trim()}
    alt={alt}
  />
);

export default Logo;
