import React from "react";
import { Link } from "react-router-dom";
import routes from "@ezycore/server/routes";

const LinkResolver = ({ children, params, type }) => {
  const route = routes.find((route) => {
    return route.type === type;
  });
  let urlToLink = route.path;

  Object.keys(params).map((param) => {
    urlToLink = urlToLink.replace(`:${param}`, params[param]);
  });
  return <Link to={urlToLink}>{children}</Link>;
};

export default LinkResolver;
