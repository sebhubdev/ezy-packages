import React, { createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children, userService, http }) => {
  const [userData, setUserData] = React.useState(null);
  const [loadingUser, setLoadingUser] = React.useState(true);

  const getCurrentUser = async () => {
    const token = localStorage?.token && JSON.parse(localStorage?.token);

    if (token) {
      try {
        const res = await userService.me();
        setUserData(res.data);
      } catch (err) {
        console.log(err.response?.data?.error);
        setUserData(null);
      }
    }

    setLoadingUser(false);
  };

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  const login = async (data, cb = () => {}) => {
    try {
      const res = await userService.login(data);
      const { user: loggedUser, token } = res.data;
      if (!loggedUser || !token) return;

      http.defaults.headers.common["Authorization"] = `${token}`;
      localStorage?.setItem("token", JSON.stringify(token));
      setUserData(loggedUser);
      cb();
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
