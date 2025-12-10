import React from "react";
import Icon from "@ezycore/ui/src/components/atoms/Icon";
import Btn from "@ezycore/ui/src/components/atoms/Btn/Btn";

const UserNav = ({ user, setUser, setIsOpen }) => {
  console.log(user);

  const logout = (e) => {
    e && e.preventDefault();
    localStorage.removeItem("token");
    setUser(null);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  console.log(user);

  return (
    <div className="user-nav">
      <div className="user-nav__inner">
        <div className="user-nav__logo">
          <Icon icon="user" />
        </div>
        <h3 className="user-nav__title color-primary mb-4 h1">
          Bonjour <strong>{user.firstName}</strong>
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
