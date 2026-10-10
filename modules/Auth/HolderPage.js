import React from "react";
import LoginSteps from "./LoginSteps";
import Modal from "@ezycore/ui/components/organisms/Modal";
import { Btn } from "@ezycore/ui/components/atoms/Btn";

const HolderPage = ({ logo }) => {
  const [showLogin, setShowLogin] = React.useState(false);

  const handleLogin = () => {
    setShowLogin(true);
  };

  return (
    <div className="holder-page">
      <div className="holder-page__inner">
        {logo && <div className="holder-page__image">{logo}</div>}
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
