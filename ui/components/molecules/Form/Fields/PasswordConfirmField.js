import React, { useState } from "react";
import BaseField from "./BaseField";

const PasswordConfirmField = ({ passwordValue, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const validations = [
    {
      validate: (value) => value === passwordValue,
      message: "Las contraseñas no coinciden",
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

export default PasswordConfirmField;
