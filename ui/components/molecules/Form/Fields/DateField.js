import React, { useEffect, useState } from "react";
import BaseField from "./BaseField";

const DateField = (props) => {
  const validations = [];
  return <BaseField type="date" validations={validations} {...props} />;
};

export default DateField;
