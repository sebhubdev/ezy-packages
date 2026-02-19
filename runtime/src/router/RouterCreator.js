import React from "react";
import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
import Loading from "@ezycore/ui/src/components/molecules/Loading";
import StatusLayout from "@ezycore/ui/src/layouts/errors/StatusLayout";

const cache = new Map();

const getLoadable = (loader) => {
  if (!cache.has(loader)) {
    cache.set(loader, loader);
  }
  return cache.get(loader);
};

const RouterCreator = ({ routes, pageResponse }) => {
  return (
    <Routes>
      {routes.map(({ path, component: loader }, key) => {
        const Component = getLoadable(loader);

        return (
          <Route
            key={key}
            path={path}
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
          <StatusLayout status={pageResponse.status} error={pageResponse.error}>
            one
          </StatusLayout>
        }
      />
    </Routes>
  );
};

export default RouterCreator;
