import React from "react";
import Heading from "@ezycore/ui/src/components/atoms/Typo/Heading";
import { TextField } from "../../components/molecules/Form/Fields";
import Form from "@ezycore/ui/src/components/molecules/Form/Form";
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
            <Form onSubmit={recoverHanlder}>
              {({ register }) => (
                <>
                  <div className="row gap-4">
                    <div className="col-12">
                      <TextField
                        label={"Email"}
                        name="email"
                        placeholder={"Email"}
                        defaultValue={""}
                        required={true}
                        register={register}
                        icon="mail"
                      />
                    </div>
                    <div className="login-form__actions col-12">
                      <Btn variant="link" onClick={() => setStep("LOGIN")}>
                        Me connecter
                      </Btn>
                    </div>
                    <div className="col-12">
                      <Btn className="px-4" type="submit">
                        Ré-initialiser
                      </Btn>
                    </div>
                  </div>
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordRecover;
