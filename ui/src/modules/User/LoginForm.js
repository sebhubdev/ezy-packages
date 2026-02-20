import React, { useContext } from "react";
import Heading from "@ezycore/ui/src/components/atoms/Typo/Heading";
import {
  TextField,
  PasswordField,
} from "../../components/molecules/Form/Fields";
import { Btn } from "@ezycore/ui/src/components/atoms/Btn";
import AlertMsg from "@ezycore/ui/src/components/atoms/AlertMsg/AlertMsg";
import { UserContext } from "./UserProvider";
import Form from "@ezycore/ui/src/components/molecules/Form/Form";

const LoginForm = ({ setStep, onLogin = () => {} }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { login } = useContext(UserContext);

  const form = React.useRef(null);

  const loginHandler = (data) => {
    login(data, () => {
      onLogin();
    });
  };

  return (
    <>
      <div className="login-form">
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
            <Form onSubmit={loginHandler}>
              {({ register }) => (
                <>
                  <div className="row gap-4">
                    <div className="col-12">
                      <TextField
                        label={"User or email:"}
                        name="userName"
                        placeholder={"User or email"}
                        defaultValue={""}
                        required={true}
                        register={register}
                        icon="user"
                      />
                    </div>
                    <div className="col-12">
                      <PasswordField
                        label={"Password:"}
                        name="userPassword"
                        placeholder={"*******"}
                        defaultValue={""}
                        required={true}
                        register={register}
                        validateOnChange={true}
                      />
                    </div>
                    <div className="login-form__actions col-12">
                      <Btn
                        variant="link"
                        onClick={() => setStep("PASSWORD_RECOVERY")}
                      >
                        Mot de passe oublié
                      </Btn>

                      <Btn variant="link" onClick={() => setStep("SING_UP")}>
                        Créer un compte
                      </Btn>
                    </div>
                    <div className="col-12">
                      <Btn className="px-4" type="submit">
                        {"Connect"}
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

export default LoginForm;
