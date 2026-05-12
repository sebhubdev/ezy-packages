import React, { useContext } from "react";
import BaseBtn from "./BaseBtn";

const Btn = ({ onClick, type = "button", ...rest }) => {
  return (
    <button type={type} onClick={onClick}>
      <BaseBtn {...rest} />
    </button>
  );
};

export default Btn;
