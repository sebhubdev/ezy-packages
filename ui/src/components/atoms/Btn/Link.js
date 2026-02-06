import React from "react";
import { Link as RouterLink } from "react-router-dom";
import BaseBtn from "./BaseBtn";

const Link = ({ to, ...rest }) => {
  const isExternal = /^https?:\/\//.test(to);

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer">
        <BaseBtn {...rest} />
      </a>
    );
  }

  return (
    <RouterLink to={to}>
      <BaseBtn {...rest} />
    </RouterLink>
  );
};

export default Link;
