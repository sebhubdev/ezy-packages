import React from "react";
import Heading from "@ezycore/ui/components/atoms/Typo/Heading";
import { Password } from "@ezycore/ui/components/atoms/Form/Input";
import Btn from "@ezycore/ui/components/atoms/Btn";

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
