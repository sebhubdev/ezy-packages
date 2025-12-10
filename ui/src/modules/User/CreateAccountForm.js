import React from "react";
import Heading from "@ezycore/ui/src/components/atoms/Typo/Heading";
import {
  InputText,
  Password,
} from "@ezycore/ui/src/components/atoms/Form/Input";
import PasswordForm from "./PasswordForm";
import Btn from "@ezycore/ui/src/components/atoms/Btn";
import Link from "@ezycore/ui/src/components/atoms/Link";

const CreateAccountForm = ({ setStep, onLogin }) => {
  const [loading, setLoading] = React.useState(false);

  const form = React.useRef(null);

  const createAccountHandler = (e) => {
    return;
    e.preventDefault();
    setLoading(true);
    const data = new FormData(form.current);
    usersDataService
      .createAccount(data)
      .then((res) => {
        const data = res?.data.userData;
        const token = res.data.token;
        http.defaults.headers.common["Authorization"] = token;
        if (typeof document != "undefined") {
          localStorage?.setItem("token", JSON.stringify(token));
        }
        onLogin(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <form ref={form} className="login-form">
        <div className="login-form__inner">
          <Heading level="1" classes="simple">
            Créer un compte
          </Heading>
          <div className="login-form__fields">
            <InputText name="name" placeholder="Nom" />
            <InputText name="lastname" placeholder="Prenom" />
            <InputText name="email" placeholder="Email" />
            <PasswordForm />
            <div className="login-form__actions">
              <Link onClick={() => setStep("LOGIN")}>Me connecter</Link>
            </div>
            <p className="login-form__info-line">
              Les champs marqués d'une * sont obligatoires.
            </p>
            <Btn onClick={createAccountHandler}>Créer mon compte</Btn>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateAccountForm;
