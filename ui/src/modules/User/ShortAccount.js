import React, { useContext } from "react";
import Icon from "../../components/atoms/Icon";
import { UserContext } from "./UserProvider";
import Modal from "../../components/organisms/Modal";
import UserNav from "./UserNav";
import LoginSteps from "./LoginSteps";

const ShortAccount = ({}) => {
  const [showLoginSteps, setShowLoginSteps] = React.useState(false);
  const { userData } = useContext(UserContext);

  const handleUser = () => {
    setShowLoginSteps(true);
  };

  const onLogin = () => {
    setShowLoginSteps(false);
  };
  return (
    <>
      <Icon
        icon="user"
        classes={userData ? " logged" : ""}
        onClick={handleUser}
      />

      {userData ? (
        <Modal
          isOpen={showLoginSteps}
          setIsOpen={setShowLoginSteps}
          appearance="right"
          size="small"
          className="user-modal"
        >
          <UserNav setIsOpen={setShowLoginSteps} />
        </Modal>
      ) : (
        <Modal
          isOpen={showLoginSteps}
          setIsOpen={setShowLoginSteps}
          appearance="float-middle"
          size="small"
        >
          <LoginSteps onLogin={onLogin} />
        </Modal>
      )}
    </>
  );
};

export default ShortAccount;
