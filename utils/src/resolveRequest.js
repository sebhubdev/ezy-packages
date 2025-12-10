import { matchPath } from "react-router";

export default (pathname, routes) => {
  const pathArray = pathname.replace(/\/+$/, "").split("/").slice(1);

  const route = routes.find((route) => {
    if (matchPath({ path: route.path }, pathname)) {
      return route;
    }
  });
  if (pathArray.length === 1 || pathArray.length === 0) {
    return { ...route };
  } else if (pathArray.length === 2) {
    return { ...route, uid: pathArray[1] };
  } else if (pathArray.length === 3) {
    return { ...route, uid: pathArray[2] };
  } else {
    return { ...route };
  }
};
