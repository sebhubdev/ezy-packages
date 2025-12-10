import React from "react";
import {
  LoginForm,
  PasswordRecover,
  CreateAccountForm,
} from "@ezycore/ui/src/modules/User";
import Btn from "@ezycore/ui/src/components/atoms/Btn";

const LoginSteps = ({ resetSteps, http, userService, onLogin }) => {
  const [step, setStep] = React.useState("LOGIN");

  return (
    <>
      {step && step === "LOGIN" ? (
        <LoginForm
          setStep={setStep}
          onLogin={onLogin}
          http={http}
          userService={userService}
        />
      ) : step === "PASSWORD_RECOVERY" ? (
        <>
          <PasswordRecover setStep={setStep} />
        </>
      ) : step === "RECOVERY_SENDED" ? (
        <>
          <h2>Un email de récupération de mot de passe vous a été envoyé </h2>
        </>
      ) : step === "SING_UP" ? (
        <>
          <CreateAccountForm setStep={setStep} />
        </>
      ) : null}
    </>
  );
};

export default LoginSteps;
