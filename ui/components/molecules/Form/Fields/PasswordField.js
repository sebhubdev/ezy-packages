import React, { useState } from "react";
import BaseField from "./BaseField";
import Icon from "../../../atoms/Icon";

const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const validations = [
    {
      validate: (v) => v.length >= 8,
      message: "Debe tener al menos 8 caracteres",
    },
    {
      validate: (v) => /[A-Z]/.test(v),
      message: "Debe tener una letra mayúscula",
    },
    {
      validate: (v) => /[0-9]/.test(v),
      message: "Debe tener un numero",
    },
  ];

  return (
    <BaseField
      type={showPassword ? "text" : "password"}
      icon={showPassword ? "eye" : "eyeclose"}
      onIconClick={togglePassword}
      validations={validations}
      {...props}
    />
  );
};

export default PasswordField;
