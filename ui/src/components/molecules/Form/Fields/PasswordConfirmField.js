import React from "react";
import BaseField from "./BaseField";

const PasswordConfirmField = ({ passwordValue, ...props }) => {
  return (
    <BaseField
      type="password"
      {...props}
      validations={[
        {
          validate: (value) => value === passwordValue,
          message: "Las contraseñas no coinciden",
        },
        ...(props.validations || []), // otras validaciones si querés
      ]}
    />
  );
};

export default PasswordConfirmField;
