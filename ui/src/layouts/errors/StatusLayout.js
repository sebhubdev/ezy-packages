import React from "react";
import NotFoundLayout from "@ezycore/ui/src/layouts/errors/NotFoundLayout";
import ForbiddenLayout from "@ezycore/ui/src/layouts/errors/ForbiddenLayout";
import UnauthorizedLayout from "@ezycore/ui/src/layouts/errors/UnauthorizedLayout";
import ServerErrorLayout from "@ezycore/ui/src/layouts/errors/ServerErrorLayout";

const StatusLayout = ({ status, error, children }) => {
  if (!status || status < 400) return children ?? null;

  if (status === 401) return <UnauthorizedLayout />;
  if (status === 403) return <ForbiddenLayout />;
  if (status === 404) return <NotFoundLayout />;
  if (status >= 500) return <ServerErrorLayout error={error} />;

  return <ServerErrorLayout error={error} />;
};

export default StatusLayout;
