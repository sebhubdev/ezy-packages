import React from "react";
import image from "@ezycore/ui/src/assets/img/errors/500.jpg";
import BaseErrorLayout from "@ezycore/ui/src/layouts/errors/BaseErrorLayout";

const ServerErrorLayout = ({ error }) => {
  return <BaseErrorLayout error={error} image={image} />;
};

export default ServerErrorLayout;
