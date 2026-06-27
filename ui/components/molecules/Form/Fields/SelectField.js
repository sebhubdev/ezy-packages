import React, { useState, useEffect } from "react";

const SelectField = ({
  type = "checkbox",
  label,
  name,
  placeholder = "select option",
  defaultChecked,
  onChange,
  register,
  value = "true",
  required = false,
  validations = [],
  validateOnChange,
  requireDefaultMessage = "Selectionez un utilisateur svp :)",
  options = [],
}) => {
  const [error, setError] = useState(null);
  const ref = React.useRef(null);

  const runValidation = () => {
    if (required && !ref.current.value) {
      setError(requireDefaultMessage);
      return false;
    }

    setError(null);
    return true;
  };

  useEffect(() => {
    if (register) register(runValidation);
  }, [register, validations]);

  const handleChange = (e) => {
    if (onChange) onChange(e.target.checked);
    if (validateOnChange) runValidation();
  };

  return (
    <div className={`input input--${type}`}>
      <div className="input__inner">
        {label && (
          <label className="input__label">
            <span className="input__label-text">
              {label} {required && <span className="input__required">*</span>}
            </span>
            <div className="input__field">
              <select ref={ref} name={name} onChange={handleChange}>
                <option value={null}>{placeholder}</option>
                {options &&
                  options.map((option, key) => {
                    return (
                      <option key={key} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
              </select>
              <input
                ref={ref}
                type={type == "switch" ? "checkbox" : type}
                name={name}
                defaultChecked={defaultChecked}
                onChange={handleChange}
                value={value}
              />
            </div>
          </label>
        )}
        {error && <div className="input__error">{error}</div>}
      </div>
    </div>
  );
};

export default SelectField;
