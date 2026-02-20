import React, { createContext, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children, authLoader, user }) => {
  const [userData, setUserData] = React.useState(user);
  const [loadingUser, setLoadingUser] = React.useState(true);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const login = async (creadentials, cb = () => {}) => {
    try {
      const res = await authLoader.login(creadentials);

      const loggedUser = res.user;
      console.log("loggedUser", res.user);
      if (!loggedUser) return { ok: false, error: "NO_USER" };
      cb({ status: 200, message: "Logged !!" });
      setUserData(loggedUser);
      setLoadingUser(false);
    } catch (error) {
      console.log(error.response);
      cb({
        message: error.response.data.message,
        status: error.response.status,
      });
    }
  };

  const logout = async () => {
    try {
      const res = await authLoader.logout();
      setUserData(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider value={{ userData, login, logout, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export { UserContext };
