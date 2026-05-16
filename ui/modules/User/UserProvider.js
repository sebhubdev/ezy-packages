import React, { createContext, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children, authLoader, user }) => {
  const [userData, setUserData] = React.useState(user);
  const [loadingUser, setLoadingUser] = React.useState(true);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const login = async (credentials, cb = () => {}) => {
    try {
      const res = await authLoader.login({ credentials });

      const loggedUser = res.user;
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
      await authLoader.logout({});
      setUserData(null);
    } catch (error) {
      console.log(error);
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
