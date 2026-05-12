import React from "react";
import { matchPath } from "react-router";

const useUrlParams = (routes) => {
  const [params, setParams] = React.useState(null);
  React.useEffect(() => {
    const path = window.location.pathname;

    const route = routes.find((route) => {
      if (matchPath({ path: route.path }, path)) {
        return route;
      }
    });

    let routePathArr = route.path.split("/");
    let pathArr = path.split("/");

    let arrToReturn = [];

    routePathArr.map((param, key) => {
      if (/(:[^*]+)/.test(param)) {
        const paramName = param.replace(":", "");
        const objToPush = {};
        objToPush[paramName] = pathArr[key];
        arrToReturn.push(objToPush);
      }
    });

    setParams(arrToReturn);
  }, []);
  return params;
};

export default useUrlParams;
