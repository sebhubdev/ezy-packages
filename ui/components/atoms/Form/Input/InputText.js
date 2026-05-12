import React from "react";

const InputText = ({ placeholder, name, inputRef, onBlur }) => {
  return (
    <div className="input-wrapper input">
      <input
        type="text"
        name={name}
        placeholder={`${placeholder || "Im an input text"}`}
        onBlur={onBlur}
        ref={inputRef || null}
      />
    </div>
  );
};

export default InputText;
