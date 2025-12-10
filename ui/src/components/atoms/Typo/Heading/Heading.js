import { string } from "prop-types";
import React from "react";

// level : 1-6
// clasess: string
// asLevel : number 1-6

const Heading = ({ children, level, classes, asLevel }) => {
  const tag = `h${
    asLevel && asLevel > 1 && asLevel <= 6
      ? asLevel
      : level && level > 1 && level <= 6
      ? level
      : 1
  }`;
  const ComponentTag = `h${level && level > 1 && level <= 6 ? level : 1}`;
  return (
    <>
      <ComponentTag className={`${tag}${classes ? ` ${classes}` : ""}`}>
        {children}
      </ComponentTag>
    </>
  );
};
export default Heading;
