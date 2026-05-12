import React, { useEffect, useState } from "react";
import BaseCheckbox from "./BaseCheckbox";

const RadioField = (props) => {
  return <BaseCheckbox type="radio" {...props} />;
};

export default RadioField;
