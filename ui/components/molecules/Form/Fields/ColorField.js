import React, { useEffect, useState } from "react";
import BaseField from "./BaseField";

const ColorField = (props) => {
  const validations = [];
  return <BaseField type="color" validations={validations} {...props} />;
};

export default ColorField;
