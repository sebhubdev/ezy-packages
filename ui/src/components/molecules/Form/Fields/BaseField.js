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
  requireDefaultMessage = "This field is required",
}) => {
  const [error, setError] = useState(null);
  const ref = React.useRef(null);

  const runValidation = () => {
    if (!required) return true;
    if (!ref.current.value) {
      setError(requireDefaultMessage);
      return false;
    }

    for (let { validate, message } of validations) {
      if (!validate(ref.current.value)) {
        setError(message);
        return false;
      }
    }

    setError(null);
    return true;
  };

  useEffect(() => {
    if (!register) return;

    const unregister = register(runValidation); // registra la validación actual
    return unregister; // se limpia si vuelve a registrarse o desmonta
  }, [register, validations]);

  const handleChange = (e) => {
    console.log(onChange);

    if (onChange) onChange(ref.current.value);
    if (validateOnChange) runValidation();
  };

  return (
    <div className={`input input--${type}`}>
      <div className="input__inner">
        <label className="input__label">
          {label && (
            <span className="input__label-text">
              {label} {required && <span className="input__required">*</span>}
            </span>
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
        </label>
        {error && <div className="input__error">{error}</div>}
      </div>
    </div>
  );
};

export default BaseField;
