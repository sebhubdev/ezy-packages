// atoms/Label.js
import React from "react";

const Label = ({ htmlFor, children, className }) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children || "here the label"}
    </label>
  );
};

export default Label;
