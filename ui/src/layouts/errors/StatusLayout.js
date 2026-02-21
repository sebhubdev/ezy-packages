import React from "react";
import {
  NotFoundLayout,
  UnauthorizedLayout,
  ServerErrorLayout,
  ForbiddenLayout,
} from "@ezycore/ui/src/layouts/errors";

const StatusLayout = ({ status, error, children }) => {
  console.log("in status layout", error);

  if (!status || status < 400) return children ?? null;

  if (status === 401) return <UnauthorizedLayout error={error.message} />;
  if (status === 403) return <ForbiddenLayout error={error.message} />;
  if (status === 404) return <NotFoundLayout error={error.message} />;
  if (status >= 500) return <ServerErrorLayout error={error.message} />;

  return <ServerErrorLayout error={error.message} />;
};

export default StatusLayout;
