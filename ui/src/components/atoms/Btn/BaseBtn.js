import React from "react";
import Icon from "../Icon";

const BaseBtn = ({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  ...rest
}) => {
  return (
    <span
      className={`btn btn--${variant} btn--${size} ${className || ""}`}
      {...rest}
    >
      {icon && iconPosition === "left" && (
        <span className="btn__icon btn__icon--left">
          <Icon icon={icon} />
        </span>
      )}
      <span className="btn__label">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="btn__icon btn__icon--right">
          <Icon icon={icon} />
        </span>
      )}
    </span>
  );
};

export default BaseBtn;
