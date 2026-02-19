import React from "react";
import image from "@ezycore/ui/src/assets/img/errors/403.jpg";
import BaseErrorLayout from "@ezycore/ui/src/layouts/errors/BaseErrorLayout";

const ForbiddenLayout = ({ error }) => {
  return <BaseErrorLayout error={error} image={image} />;
};

export default ForbiddenLayout;
