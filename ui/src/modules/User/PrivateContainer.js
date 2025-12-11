import React, { useContext } from "react";
import HolderPage from "./HolderPage";
import { UserContext } from "./UserProvider";

const PrivateContainer = ({ children, EscapeComponent, loading, ...rest }) => {
  const { userData } = useContext(UserContext);
  const Component = EscapeComponent ? EscapeComponent : HolderPage;
  return <>{userData ? children : <Component {...rest} />}</>;
};

export default PrivateContainer;
