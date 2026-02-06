import React from "react";
import LoginSteps from "./LoginSteps";
import Modal from "@ezycore/ui/src/components/organisms/Modal";
import { Btn } from "@ezycore/ui/src/components/atoms/Btn";
import Image from "@ezycore/ui/src/components/atoms/Image";
import logo from "@ezycore/ui/src/assets/img/logo-sample.png";

const HolderPage = ({ setUserData, loginHandler }) => {
  const [showLogin, setShowLogin] = React.useState(false);

  const handleLogin = () => {
    setShowLogin(true);
  };

  const image = {
    url: logo,
    alt: "Logo",
  };

  return (
    <div className="holder-page">
      <div className="holder-page__inner">
        <div className="holder-page__image">
          <Image image={image} />
        </div>
        <div className="holder-page__info">Nous travaillons pour vous :)</div>
        <div className="holder-page__actions">
          <Btn appearance="link" onClick={handleLogin}>
            Login
          </Btn>
        </div>
      </div>

      <Modal
        isOpen={showLogin}
        // isOpen={true}
        setIsOpen={setShowLogin}
        appearance="float-middle"
        size="small"
      >
        <LoginSteps />
      </Modal>
    </div>
  );
};

export default HolderPage;
