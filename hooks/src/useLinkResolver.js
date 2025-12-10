import React from "react";
import routes from "@ezycore/frontend/routes";
const useLinkResolver = (type, params) => {
  // routes.map((route) => {
  //   console.log(route, type);
  //   return route.type == type;
  // });
  const route = routes.find((route) => {
    return route.type == type;
  });
  console.log("route", route);
  if (!route?.path) return;
  let urlToLink = route?.path;

  Object.keys(params).map((param) => {
    urlToLink = urlToLink.replace(`:${param}`, params[param]);
  });
  return urlToLink;
};

export default useLinkResolver;
