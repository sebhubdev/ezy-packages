// atoms/FieldMessage.tsx
import React from "react";

export type FieldMessageType = "error" | "success" | "warning" | "info";

export interface FieldMessageProps {
  children?: React.ReactNode | string;
  type?: FieldMessageType;
  className?: string;
  id?: string;
}

const FieldMessage: React.FC<FieldMessageProps> = ({
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
