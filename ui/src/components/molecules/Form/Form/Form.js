import React, { useRef } from "react";

const Form = ({ onSubmit, children, ...rest }) => {
  const validators = useRef([]);

  const register = (validateFn) => {
    validators.current.push(validateFn);

    return () => {
      validators.current = validators.current.filter((v) => v !== validateFn);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const results = validators.current.map((v) => v());

    const hasErrors = results.some((r) => r === false);

    onSubmit(hasErrors ? { error: "error" } : formData);
  };
  const formRef = React.useRef(null);
  return (
    <div className="form" {...rest}>
      <form ref={formRef} onSubmit={handleSubmit}>
        {typeof children === "function" ? children({ register }) : children}
      </form>
    </div>
  );
};

export default Form;
