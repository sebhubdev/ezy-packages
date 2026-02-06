import React from "react";
import Heading from "@ezycore/ui/src/components/atoms/Typo/Heading";
import { InputText } from "@ezycore/ui/src/components/atoms/Form/Input";
import { Btn } from "@ezycore/ui/src/components/atoms/Btn";

const PasswordRecover = ({ fieldToFocus, onSend = () => {}, setStep }) => {
  const recoverHanlder = () => {
    onSend({ here: "the data" });
    setStep("RECOVERY_SENDED");
  };
  return (
    <>
      <div className="login-form">
        <div className="login-form__inner">
          <Heading level="1" classes="simple">
            Ré-initialiser
            <br /> mon mot de passe
          </Heading>
          <div className="login-form__fields">
            <InputText inputRef={fieldToFocus} placeholder="Email" />
            <div className="login-form__actions">
              <Btn variant="link" onClick={() => setStep("LOGIN")}>
                Me connecter
              </Btn>
            </div>
            <Btn onClick={recoverHanlder}>Ré-initialiser</Btn>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordRecover;
