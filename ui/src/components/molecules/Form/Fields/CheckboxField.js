import React, { useEffect, useState } from "react";
import BaseCheckbox from "./BaseCheckbox";

const CheckboxField = (props) => {
  return <BaseCheckbox type="checkbox" {...props} />;
};

export default CheckboxField;
