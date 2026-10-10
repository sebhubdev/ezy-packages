import React from "react";

const Input = ({
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
