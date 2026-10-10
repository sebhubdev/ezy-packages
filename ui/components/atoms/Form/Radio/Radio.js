// Radio.js
import React from "react";

const Radio = ({
  value,
  checked,
  onChange,
  disabled = false,
  name,
  className,
}) => {
  return (
    <div className={`ui-radio ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
        className="ui-radio__input"
      />
    </div>
  );
};

export default Radio;
