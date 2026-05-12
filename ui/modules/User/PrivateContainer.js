import React, { useContext } from "react";
import HolderPage from "./HolderPage";
import { UserContext } from "./UserProvider";
import Loading from "../../components/molecules/Loading";

const PrivateContainer = ({ children, EscapeComponent, ...rest }) => {
  const { userData } = useContext(UserContext);

  const Component = EscapeComponent ? EscapeComponent : HolderPage;
  return <>{userData ? children : <Component {...rest} />}</>;
};

export default PrivateContainer;
