import React, { useContext } from "react";
import Icon from "@ezycore/ui/src/components/atoms/Icon";
import { Btn } from "@ezycore/ui/src/components/atoms/Btn/";
import { UserContext } from "./UserProvider";

const UserNav = ({ setIsOpen }) => {
  const { userData: user, logout } = useContext(UserContext);

  console.log(user);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="user-nav">
      <div className="user-nav__inner">
        <div className="user-nav__logo">
          <Icon icon="user" />
          ddd
        </div>
        <h3 className="user-nav__title color-primary mb-4 h1">
          Bonjour <strong>{user.username}</strong>
        </h3>
        <nav className="user-nav__items">
          <ul>
            <li className="user-nav__item">
              <Btn onClick={logout}>Me déconnecter</Btn>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UserNav;
