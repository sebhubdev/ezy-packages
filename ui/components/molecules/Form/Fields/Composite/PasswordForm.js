import React, { useState } from "react";
import PasswordField from "../PasswordField";
import PasswordConfirmField from "../PasswordConfirmField";

const PasswordForm = ({
  onChange,
  labels = { password: "password", confirm: "confirm password" },
  names = { password: "password", confirm: "confirm" },
  defaultValues = { password: "123456", confirm: "123456" },

  placeholders = {
    password: "password",
    confirm: "confirm password",
  },
  register,
}) => {
  const [password, setPassword] = useState(defaultValues.password);

  return (
    <div className="password-form row gap-4">
      <div className="col-12">
        <PasswordField
          label={labels.password}
          name={names.password}
          defaultValue={defaultValues.password}
          placeholder={placeholders.password}
          onChange={(e) => setPassword(e.target.value)}
          register={register}
          required={true}
          autoComplete="new-password"
        />
      </div>
      <div className="col-12">
        <PasswordConfirmField
          label={labels.confirm}
          name={names.confirm}
          defaultValue={defaultValues.confirm}
          placeholder={placeholders.confirm}
          passwordValue={password}
          register={register}
          required={true}
          autoComplete="new-password"
        />
      </div>
    </div>
  );
};

export default PasswordForm;
