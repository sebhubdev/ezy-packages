import React, { useContext } from "react";
import Heading from "@ezycore/ui/src/components/atoms/Typo/Heading";
import {
  InputText,
  Password,
} from "@ezycore/ui/src/components/atoms/Form/Input";
import Btn from "@ezycore/ui/src/components/atoms/Btn";
import AlertMsg from "@ezycore/ui/src/components/atoms/AlertMsg/AlertMsg";
import Link from "@ezycore/ui/src/components/atoms/Link";
import { UserContext } from "./UserProvider";

const LoginForm = ({ setStep, onLogin }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { login } = useContext(UserContext);

  const form = React.useRef(null);

  const loginHandler = () => {
    const data = new FormData(form.current);
    login(data, () => {
      onLogin();
    });
  };

  return (
    <>
      <form ref={form} className="login-form">
        <div className="login-form__inner">
          <Heading level="1" classes="simple">
            Log in
          </Heading>
          <div className="login-form__fields">
            {error && error?.response?.data?.message && (
              <>
                <AlertMsg
                  appareance="danger"
                  message={error.response.data.message}
                />
              </>
            )}
            <InputText name="userName" placeholder={"User or email"} />
            <Password name="userPassword" placeholder="*******" />
            <div className="login-form__actions">
              <Link onClick={() => setStep("PASSWORD_RECOVERY")}>
                Mot de passe oublié
              </Link>

              <Link onClick={() => setStep("SING_UP")}>Créer un compte</Link>
            </div>
            <Btn onClick={loginHandler}>{"Connect"}</Btn>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
