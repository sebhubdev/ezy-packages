import React, { useContext } from "react";
import HolderPage from "./HolderPage";
import { UserContext } from "./UserProvider";
import Loading from "../../components/molecules/Loading";

const PrivateComponent = ({ children, acceptedRoles = "", ...rest }) => {
  const { userData } = useContext(UserContext);

  const acceptedRolesArr = acceptedRoles
    .split(",")
    .map((role) => role.trim())
    .filter(Boolean);
  const rolesArr = userData?.role
    .split(",")
    .map((role) => role.trim())
    .filter(Boolean);

  const roleMatch = acceptedRolesArr.some((item) => rolesArr.includes(item));

  return <>{roleMatch ? children : null}</>;
};

export default PrivateComponent;
