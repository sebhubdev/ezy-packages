import React, { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { usePopper } from "react-popper";

const ColorPicker = ({ defaultValue, onChange, disabled = false, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const ref = useRef(null);
  const popperRef = useRef(null);
  const { styles, attributes } = usePopper(ref.current, popperRef.current, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "flip",
        fallbackPlacements: [
          "top-start",
          "bottom-end",
          "left-start",
          "right-start",
        ],
      },
      { name: "preventOverflow", options: { padding: 8 } },
    ],
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleChange = (color) => {
    if (onChange) onChange(color);
    setValue(color);
  };
  return (
    <div className={`color-picker${isOpen ? " open" : ""}`} ref={ref}>
      <div
        className="color-picker__watch"
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: value }}
      ></div>
      <div
        className="color-picker__picker"
        ref={popperRef}
        style={{ ...styles.popper, zIndex: 1000 }}
        {...attributes.popper}
      >
        <HexColorPicker color={value} onChange={handleChange} />
        <input type="hidden" name={name} value={value} />
      </div>
    </div>
  );
};

export default ColorPicker;
