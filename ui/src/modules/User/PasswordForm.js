import React from "react";
import Heading from "@ezycore/ui/src/components/atoms/Typo/Heading";
import { Password } from "@ezycore/ui/src/components/atoms/Form/Input";
import Btn from "@ezycore/ui/src/components/atoms/Btn";

const PasswordForm = ({ fieldToFocus, onChange = () => {}, setStep }) => {
  return (
    <>
      <Password
        inputRef={fieldToFocus}
        placeholder="Créez votre mot de passe "
      />
      <Password
        inputRef={fieldToFocus}
        placeholder="Confirmez votre mot de passe "
      />
    </>
  );
};

export default PasswordForm;
