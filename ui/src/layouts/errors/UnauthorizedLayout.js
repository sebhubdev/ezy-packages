import React from "react";
import image from "@ezycore/ui/src/assets/img/errors/403.png";
import BaseErrorLayout from "@ezycore/ui/src/layouts/errors/BaseErrorLayout";

const UnauthorizedLayout = ({ error }) => {
  return <BaseErrorLayout error={error} image={image} />;
};

export default UnauthorizedLayout;
