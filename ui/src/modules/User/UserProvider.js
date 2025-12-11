import React, { createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children, userService, http }) => {
  const [userData, setUserData] = React.useState(null);
  const getCurrentUSer = async () => {
    let token;
    token = localStorage?.token && JSON.parse(localStorage?.token);

    if (token) {
      await userService
        .me()
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          if (err.response) console.log(err.response.data.error);
        });
    }
  };

  React.useEffect(() => {
    getCurrentUSer();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  const login = (data) => {
    userService
      .login(data)
      .then((res) => {
        const { user: userData, token } = res.data;
        if (!userData || !token) return;
        http.defaults.headers.common["Authorization"] = `${token}`;

        if (typeof document != "undefined") {
          localStorage?.setItem("token", JSON.stringify(token));
        }
        setUserData(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserContext.Provider value={{ userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export { UserContext };
