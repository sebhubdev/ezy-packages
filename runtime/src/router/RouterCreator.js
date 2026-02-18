import React from "react";
import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
import Loading from "@ezycore/ui/src/components/molecules/Loading";

const cache = new Map();

const getLoadable = (loader) => {
  if (!cache.has(loader)) {
    cache.set(loader, loadable(loader, { fallback: <Loading /> }));
  }
  return cache.get(loader);
};

const RouterCreator = ({ routes, pageData }) => (
  <Routes>
    {routes.map(({ path, component: loader }, key) => {
      const Component = getLoadable(loader);
      return (
        <Route
          key={key}
          path={path}
          element={<Component pageData={pageData} />}
        />
      );
    })}
  </Routes>
);

export default RouterCreator;
