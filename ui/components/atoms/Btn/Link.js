import React from "react";
import { Link as RouterLink } from "react-router-dom";
import BaseBtn from "./BaseBtn";

const Link = ({ to, className, variant = "link", ...rest }) => {
  const isExternal = /^https?:\/\//.test(to);

  if (isExternal) {
    return (
      <a
        href={to}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        <BaseBtn {...rest} variant={variant} />
      </a>
    );
  }

  return (
    <RouterLink to={to} className={className}>
      <BaseBtn {...rest} variant={variant} />
    </RouterLink>
  );
};

export default Link;
