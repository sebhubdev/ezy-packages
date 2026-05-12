import React, { useState, useEffect } from "react";

const BaseCheckbox = ({
  type = "checkbox",
  label,
  name,
  placeholder,
  defaultChecked,
  onChange,
  register,
  value = "true",
  required = false,
  validations = [],
  validateOnChange,
  requireDefaultMessage = "This field is required",
}) => {
  const [error, setError] = useState(null);
  const ref = React.useRef(null);

  const runValidation = () => {
    if (type === "radio" && required) {
      const group = ref.current.form?.elements[name];
      const isChecked = Array.from(group).some((input) => input.checked);
      if (!isChecked) {
        setError("Debes seleccionar una opcion");
        return false;
      }
    } else if (required && !ref.current.checked) {
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

export default BaseCheckbox;
