import React, { useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import StatusLayout from "@ezycore/ui/layouts/errors/StatusLayout";

const RouterCreator = ({ routes, pageResponse }) => {
  const location = useLocation();
  const renderedLocation = useRef(null);
  // Keep the previous page mounted until the new route's data is ready.
  if (!pageResponse.loading) renderedLocation.current = location;
  if (!renderedLocation.current) return null;
  return (
    <Routes location={renderedLocation.current}>
      {routes.map(({ id, path, caseSensitive, component: Component }) => {
        return (
          <Route
            key={id || path}
            path={path}
            caseSensitive={caseSensitive}
            element={
              <StatusLayout
                status={pageResponse.status}
                error={pageResponse.error}
              >
                <Component data={pageResponse.data} />
              </StatusLayout>
            }
          />
        );
      })}
      <Route
        path={"*"}
        element={
          <StatusLayout
            status={pageResponse.status}
            error={pageResponse.error}
          />
        }
      />
    </Routes>
  );
};

export default RouterCreator;
