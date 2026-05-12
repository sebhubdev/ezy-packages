import React from "react";
import { useSearchParams } from "react-router-dom";

const createPageHref = (page) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set("page", page);
  return `?${params.toString()}`;
};

export default createPageHref;
