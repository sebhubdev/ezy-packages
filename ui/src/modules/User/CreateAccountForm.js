import React from "react";
import Heading from "@ezycore/ui/src/components/atoms/Typo/Heading";
import {
  TextField,
  PasswordForm,
} from "../../components/molecules/Form/Fields";
import { Btn } from "@ezycore/ui/src/components/atoms/Btn";
import Form from "@ezycore/ui/src/components/molecules/Form/Form";

const CreateAccountForm = ({ setStep }) => {
  const [loading, setLoading] = React.useState(false);

  const createAccountHandler = (e) => {};

  return (
    <>
      <div className="login-form">
        <div className="login-form__inner">
          <Heading level="1" classes="simple">
            Créer un compte
          </Heading>
          <div className="login-form__fields">
            <Form onSubmit={createAccountHandler}>
              {({ register }) => (
                <>
                  <div className="row gap-4">
                    <div className="col-12">
                      <TextField
                        label={"Prenom"}
                        name="name"
                        placeholder={"Prenom"}
                        defaultValue={""}
                        required={true}
                        register={register}
                        icon="user"
                      />
                    </div>
                    <div className="col-12">
                      <TextField
                        label={"Nom"}
                        name="lastname"
                        placeholder={"Nom"}
                        defaultValue={""}
                        required={true}
                        register={register}
                        icon="user"
                      />
                    </div>

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
                    <div className="col-12">
                      <PasswordForm
                        defaultValues={{
                          password: "",
                          confirm: "",
                        }}
                        register={register}
                        validateOnChange={true}
                      />
                    </div>
                    <div className="login-form__actions col-12">
                      <Btn variant="link" onClick={() => setStep("LOGIN")}>
                        Me connecter
                      </Btn>
                    </div>
                    <p className="login-form__info-line col-12">
                      Les champs marqués d'une * sont obligatoires.
                    </p>
                    <div className="col-12">
                      <Btn className="px-4" type="submit">
                        Créer mon compte
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

export default CreateAccountForm;
