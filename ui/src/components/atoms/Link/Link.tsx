import React, { ReactNode } from "react";
import { Link as DomLink } from "react-router-dom";

export interface LinkProps {
  to?: string;
  children: ReactNode;
  type: string;
  onClick: () => void;
}

function Link({ to = "/", type = "base", children, onClick }: LinkProps) {
  return (
    <div className={`link link-${type}`} onClick={onClick}>
      <DomLink to={to}>{children}</DomLink>
    </div>
  );
}

export default Link;
