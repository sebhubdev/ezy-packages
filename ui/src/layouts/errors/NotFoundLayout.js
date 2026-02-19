import React from "react";
import image from "@ezycore/ui/src/assets/img/errors/404.png";
import BaseErrorLayout from "@ezycore/ui/src/layouts/errors/BaseErrorLayout";

const NotFoundLayout = ({ error = "Not found" }) => {
  return <BaseErrorLayout error={error} image={image} />;
};

export default NotFoundLayout;
