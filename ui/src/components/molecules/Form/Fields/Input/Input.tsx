import React from "react";
import Icon from "@ezycore/ui/src/components/atoms/Icon";
import { IconProps } from "@ezycore/ui/src/components/atoms/Icon";

export interface InputProps {
  placeholder: string | null;
  name: string;
  label: string;
  icon: IconProps;
  onChange: () => void;
}

function Input({
  placeholder = null,
  name,
  icon,
  label,
  onChange,
}: InputProps) {
  return (
    <div className="input">
      <div className="input__inner">
        {label && (
          <label className="input__label" htmlFor="">
            {label}
          </label>
        )}
        <div className="input__field">
          <input
            type="text"
            name={name}
            placeholder={`${placeholder || "Im an input text"}`}
            onChange={onChange}
          />
          {icon && (
            <div className="input__icon">
              <Icon icon={icon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Input;
