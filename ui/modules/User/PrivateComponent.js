import React, { useContext } from "react";
import HolderPage from "./HolderPage";
import { UserContext } from "./UserProvider";
import Loading from "../../components/molecules/Loading";

const PrivateComponent = ({ children, acceptedRoles = [], ...rest }) => {
  const { userData } = useContext(UserContext);

  return <>{userData ? children : null}</>;
};

export default PrivateComponent;
