import React, { useRef } from "react";
import AlertMsg from "@ezycore/ui/src/components/atoms/AlertMsg/AlertMsg";
import toArray from "@ezycore/utils/src/toArray";

const Form = ({ onSubmit, children, messages = [], ...rest }) => {
  const validators = useRef([]);

  const messagesArray = toArray(messages);

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

    if (hasErrors) return;

    onSubmit(formData);
  };
  const formRef = React.useRef(null);
  return (
    <div className="form" {...rest}>
      {messagesArray.length ? (
        <div className="form-messages mb-4">
          {messagesArray.map((msg, key) => {
            const variant =
              msg?.status >= 500
                ? "danger"
                : msg?.status > 200
                  ? "warning"
                  : "success";

            return (
              <AlertMsg key={key} message={msg.message} variant={variant} />
            );
          })}
        </div>
      ) : null}

      <form ref={formRef} onSubmit={handleSubmit}>
        {typeof children === "function" ? children({ register }) : children}
      </form>
    </div>
  );
};

export default Form;
