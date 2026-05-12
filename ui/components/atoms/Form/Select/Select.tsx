import React from "react";

export interface SelectProps {}

function Select({}: SelectProps) {
  return (
    <div className="select">
      <select name="" id="">
        <option value="">Option 1</option>
        <option value="">Option 2</option>
        <option value="">Option 3</option>
      </select>
    </div>
  );
}

export default Select;
