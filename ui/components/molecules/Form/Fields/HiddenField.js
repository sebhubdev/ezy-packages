import React from "react";
import BaseField from "./BaseField";

const HiddenField = ({ name, defaultValue }) => {
  return <BaseField type="hidden" name={name} defaultValue={defaultValue} />;
};

export default HiddenField;
