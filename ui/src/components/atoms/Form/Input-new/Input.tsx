import React, { forwardRef } from "react";
import classNames from "classnames";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "url"
  | "tel"
  | "search"
  | "date"
  | "datetime-local"
  | "month"
  | "week"
  | "time"
  | "color"
  | "file"
  | "hidden";

export type InputState = "normal" | "error" | "success";

export type InputSize = "sm" | "md" | "lg";

export type InputVariant = "default" | "outlined" | "filled";

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;

  id?: string;
  name?: string;
  className?: string;
  variant?: InputVariant;
  size?: InputSize;
  state?: InputState;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = "text",
  placeholder = "Placeholder...",
  required = false,
  disabled = false,
  id,
  name,
  className = "",
  variant = "default",
  size = "md",
  state = "normal",
}) => {
  return (
    <div
      className={[
        "ui-input",
        `ui-input--${variant}`,
        `ui-input--${size}`,
        `ui-input--${state}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
