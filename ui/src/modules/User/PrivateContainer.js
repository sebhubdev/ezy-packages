import React from "react";

const PrivateContainer = ({
  children,
  EscapeComponent,
  userData,
  loading,
  ...rest
}) => {
  // if (loading) return;
  return (
    <>
      {userData ? children : <EscapeComponent userData={userData} {...rest} />}
    </>
  );
};

export default PrivateContainer;
