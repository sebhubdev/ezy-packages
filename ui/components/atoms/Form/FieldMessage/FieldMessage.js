// atoms/FieldMessage.js
import React from "react";

const FieldMessage = ({
  children = "field message",
  type = "info",
  className,
  id,
}) => {
  if (!children) return null;

  return (
    <span
      id={id}
      role={type === "error" ? "alert" : undefined}
      className={`field-message field-message--${type} ${className ?? ""}`}
    >
      {children}
    </span>
  );
};

export default FieldMessage;
