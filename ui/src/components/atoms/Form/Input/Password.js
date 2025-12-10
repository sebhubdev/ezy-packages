import React from "react";

const Password = ({ placeholder, name, inputRef, onBlur }) => {
  return (
    <div className="input-wrapper input">
      <input
        type="password"
        name={name}
        placeholder={`${placeholder || "********"}`}
        onBlur={onBlur}
        ref={inputRef || null}
      />
    </div>
  );
};

export default Password;
