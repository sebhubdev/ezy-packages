import { matchRoutes } from "react-router-dom";

const resolveRouteMatch = (pathname, routes) => {
  const matches = matchRoutes(
    routes.map((route) => ({
      path: route.path,
      caseSensitive: route.caseSensitive,
      route,
    })),
    pathname,
  );
  return matches?.[matches.length - 1].route.route;
};

export default resolveRouteMatch;
