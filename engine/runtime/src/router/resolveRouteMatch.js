import { matchPath } from "react-router-dom";

export default (pathname, routes) => {
  const route = routes.find((route) => {
    if (matchPath({ path: route.path }, pathname)) {
      return route;
    }

    return null;
  });

  return route;
};
