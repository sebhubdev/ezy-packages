import React from "react";
import { Link as RouterLink } from "react-router-dom";
import BaseBtn from "./BaseBtn";

const Link = ({ to, className, ...rest }) => {
  const isExternal = /^https?:\/\//.test(to);

  if (isExternal) {
    return (
      <a
        href={to}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        <BaseBtn {...rest} />
      </a>
    );
  }

  return (
    <RouterLink to={to} className={className}>
      <BaseBtn {...rest} />
    </RouterLink>
  );
};

export default Link;
