import React, { useEffect, useState } from "react";
import BaseField from "./BaseField";

const TextField = (props) => {
  const validations = [
    {
      validate: (value) => value.length > 4,
      message: "Minimum 4 characters",
    },
  ];
  return <BaseField type="text" validations={validations} {...props} />;
};

export default TextField;
