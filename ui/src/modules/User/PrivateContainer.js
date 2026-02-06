import React, { useContext } from "react";
import HolderPage from "./HolderPage";
import { UserContext } from "./UserProvider";
import Loading from "../../components/molecules/Loading";

const PrivateContainer = ({ children, EscapeComponent, loading, ...rest }) => {
  const { userData, loadingUser } = useContext(UserContext);
  console.log(loadingUser);

  if (loadingUser) return null;
  const Component = EscapeComponent ? EscapeComponent : HolderPage;
  return <>{userData ? children : <Component {...rest} />}</>;
};

export default PrivateContainer;
