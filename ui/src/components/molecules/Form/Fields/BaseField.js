import React, { useState, useEffect, forwardRef } from "react";
import Icon from "../../../atoms/Icon";

const BaseField = ({
  type = "text",
  label,
  name,
  placeholder,
  defaultValue,
  onChange,
  icon,
  register,
  required = false,
  validations = [],
  onIconClick,
  validateOnChange,
  autoComplete = "off",
  spellCheck = false,
}) => {
  const [error, setError] = useState("");
  const ref = React.useRef(null);

  const runValidation = () => {
    if (required && !ref.current.value) {
      setError("This field is required");
      return false;
    }

    for (let { validate, message } of validations) {
      if (!validate(ref.current.value)) {
        setError(message);
        return false;
      }
    }
    setError("");
    return true;
  };

  useEffect(() => {
    if (register) register(runValidation);
  }, [register]);

  const handleChange = (e) => {
    if (onChange) onChange(e);
    if (validateOnChange) runValidation(); // valida en cada cambio
  };

  return (
    <div className="input">
      <div className="input__inner">
        {label && (
          <label className="input__label" htmlFor={name}>
            {required && <span className="input__required">*</span>}
            {label}
          </label>
        )}
        <div className="input__field">
          <input
            ref={ref}
            type={type}
            name={name}
            placeholder={placeholder || "Im an input text"}
            defaultValue={defaultValue}
            onChange={handleChange}
            autoComplete={autoComplete}
            spellCheck={spellCheck}
          />
          {icon && (
            <div
              className="input__icon"
              onClick={onIconClick}
              style={{ cursor: onIconClick ? "pointer" : "default" }}
            >
              <Icon icon={icon} />
            </div>
          )}
        </div>
        {error && <div className="input__error">{error}</div>}
      </div>
    </div>
  );
};

export default BaseField;
