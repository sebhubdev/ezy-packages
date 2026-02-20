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
      setUserData(loggedUser);
      setLoadingUser(false);
      cb();
    } catch (err) {
      console.log("in error", err);
      return {
        ok: false,
        error: err?.response?.data ?? {
          message: err?.message ?? "Login failed",
        },
        status: err?.response?.status ?? 500,
      };
    }
  };

  const logout = async () => {
    try {
      const res = await authLoader.logout();
      setUserData(null);
    } catch (err) {
      console.log("in error", err);
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
