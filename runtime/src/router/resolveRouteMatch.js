import { matchPath } from "react-router-dom";

const resolveRouteMatch = (pathname, routes) => {
  if (!pathname || !Array.isArray(routes)) return null;

  const cleanPath = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  for (const end of [true, false]) {
    for (const route of routes) {
      const match = matchPath({ path: route.path, end }, cleanPath);
      if (match) {
        return { ...route, params: match.params, pathname: cleanPath };
      }
    }
  }

  return null;
};

export default resolveRouteMatch;
