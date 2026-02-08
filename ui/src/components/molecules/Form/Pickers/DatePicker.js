import React, { useState, forwardRef } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = forwardRef(
  (
    {
      value = null,
      onChange = () => {},
      disabled = false,
      minDate = null,
      maxDate = null,
      placeholder = "Selecciona una fecha",
      dateFormat = "yyyy-MM-dd",
      clearable = true,
      name,
    },
    ref,
  ) => {
    const [startDate, setStartDate] = useState(null);
    const [open, setOpen] = useState(false);
    registerLocale("fr", fr);

    return (
      <>
        <div className="date-picker">
          <input type="hidden" name={name} value={startDate} ref={ref} />
          <ReactDatePicker
            selected={startDate}
            disabled={disabled}
            minDate={new Date(1990, 0, 1)}
            maxDate={new Date(2030, 11, 31)}
            placeholderText={placeholder}
            dateFormat={dateFormat}
            isClearable={clearable}
            showYearDropdown
            onChange={(date) => setStartDate(date)}
            inline={false}
            locale="fr"
            customInput={<input onKeyDown={(e) => e.preventDefault()} />}
          />
        </div>
      </>
    );
  },
);

export default DatePicker;
