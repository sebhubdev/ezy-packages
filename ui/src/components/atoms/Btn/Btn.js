import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";

const Btn = ({
  to,
  variant = "primary",
  children,
  onClick,
  type,
  target,
  classes = "test",
  icon,
  iconPosition = "left",
}) => {
  return (
    <>
      {type && type === "web" ? (
        <a
          href={to}
          target={target}
          className={`btn${variant ? ` btn-${variant}` : "default"} ${classes}`}
        >
          {icon ? <Icon icon={icon} /> : null}
          {children}
        </a>
      ) : (
        <Link
          className={`btn btn-${variant} ${classes}`}
          to={to || null}
          onClick={onClick}
        >
          {children}
          {icon ? <Icon icon={icon} /> : null}
        </Link>
      )}
    </>
  );
};

export default Btn;
