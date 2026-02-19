import React from "react";
import {
  NotFoundLayout,
  UnauthorizedLayout,
  ServerErrorLayout,
  ForbiddenLayout,
} from "@ezycore/ui/src/layouts/errors";

const StatusLayout = ({ status, error, children }) => {
  if (!status || status < 400) return children ?? null;

  if (status === 401) return <UnauthorizedLayout error={error} />;
  if (status === 403) return <ForbiddenLayout error={error} />;
  if (status === 404) return <NotFoundLayout error={error} />;
  if (status >= 500) return <ServerErrorLayout error={error} />;

  return <ServerErrorLayout error={error} />;
};

export default StatusLayout;
