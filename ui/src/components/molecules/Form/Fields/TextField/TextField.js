import React, { useEffect, useState } from "react";
import Icon from "@ezycore/ui/src/components/atoms/Icon";

const TextField = ({
  placeholder = null,
  id,
  name,
  icon,
  label,
  required = false,
  onChange,
  register,
  defaultValue,
}) => {
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);

  const ref = React.useRef(null);

  const validate = () => {
    if (!required) return false;
    if (!ref.current.value) {
      setError("You must write something here");
      setValidated(false);
      return false;
    }

    if (ref.current.value.length < 3) {
      setError("4 chars minimum");
      setValidated(false);
      return false;
    }

    setError("");
    setValidated(true);
    return true;
  };

  useEffect(() => {
    if (!register) return;
    return register(validate);
  }, [register]);
  return (
    <div className="input">
      <div className="input__inner">
        {label && (
          <label className="input__label" htmlFor="">
            {required && <span className="input__required">*</span>}
            {label}
          </label>
        )}
        <div className="input__field">
          <input
            ref={ref}
            type="text"
            name={name}
            placeholder={`${placeholder || "Im an input text"}`}
            onChange={onChange}
            defaultValue={defaultValue}
          />
          {icon && (
            <div className="input__icon">
              <Icon icon={icon} />
            </div>
          )}
        </div>
        {error && <div className="input__error">{error}</div>}
      </div>
    </div>
  );
};

export default TextField;
