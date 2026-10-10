import React, { forwardRef } from "react";
import Icon from "../../../atoms/Icon";

const toInputDate = (value) => {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return "";
    const year = String(value.getFullYear()).padStart(4, "0");
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return value == null ? "" : String(value).slice(0, 10);
};

const DatePicker = forwardRef(
  (
    {
      value,
      defaultValue,
      onChange = () => {},
      onFocus,
      minDate,
      maxDate,
      dateFormat,
      clearable,
      ...props
    },
    ref,
  ) => (
    <div
      className={`date-picker${props.disabled ? " date-picker--disabled" : ""}`}
    >
      <input
        {...props}
        ref={ref}
        type="date"
        {...(value !== undefined
          ? { value: toInputDate(value) }
          : { defaultValue: toInputDate(defaultValue) })}
        min={minDate == null ? props.min : toInputDate(minDate)}
        max={maxDate == null ? props.max : toInputDate(maxDate)}
        onChange={(event) => onChange(event.target.value)}
        onFocus={(event) => {
          onFocus?.(event);
          const input = event.currentTarget;
          if (
            event.defaultPrevented ||
            input.disabled ||
            input.readOnly ||
            typeof input.showPicker !== "function"
          )
            return;

          try {
            input.showPicker();
          } catch (error) {
            // Browsers may require a user gesture to open the native picker.
            if (
              ![
                "NotAllowedError",
                "InvalidStateError",
                "SecurityError",
              ].includes(error.name)
            ) {
              throw error;
            }
          }
        }}
      />
      <span className="date-picker__icon" aria-hidden="true">
        <Icon icon="calendar" />
      </span>
    </div>
  ),
);

export default DatePicker;
