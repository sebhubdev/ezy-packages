import React, { createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children, userService }) => {
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

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export { UserContext };
