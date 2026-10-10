// atoms/Checkbox.js
import React, { forwardRef } from "react";

const Checkbox = forwardRef(
  (
    {
      checked,
      onChange,
      disabled = false,
      className,
      id,
      name,
      value,
      required,
    },
    ref,
  ) => {
    const checkboxId = id ?? `chk-${Math.random().toString(36).slice(2, 9)}`;
    return (
      <input
        ref={ref}
        id={checkboxId}
        name={name}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className={className}
        value={value}
        required={required}
      />
    );
  },
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
