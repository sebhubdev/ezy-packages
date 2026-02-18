import React from "react";

const RouterCreator = ({ routes, pageData }) => {
  return (
    <Routes>
      {routes.map((route, key) => {
        const { path, component } = route;
        let Component = null;
        try {
          Component = loadable(() => import(`../${component}`), {
            fallback: <Loading />,
          });
        } catch (err) {
          console.log(err);
        }

        if (!Component) return;

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
};

export default RouterCreator;
