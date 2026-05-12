// Radio.tsx
import React from "react";

export interface RadioProps {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
}

const Radio: React.FC<RadioProps> = ({
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
