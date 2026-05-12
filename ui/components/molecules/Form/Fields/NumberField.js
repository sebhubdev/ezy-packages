import React, { useEffect, useState } from "react";
import BaseField from "./BaseField";

const NumberField = (props) => {
  const validations = [
    {
      validate: (value) => value.length > 4,
      message: "Minimum 4 chiffres",
    },
  ];

  const handleKeyDown = (e) => {
    const val = e.target.value;
    if (
      !/[0-9]/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) {
      e.preventDefault();
    }
  };
  return (
    <BaseField
      type="number"
      onKeyDown={handleKeyDown}
      validations={validations}
      {...props}
    />
  );
};

export default NumberField;
