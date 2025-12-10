import React from "react";
import { InputText } from "@ezycore/ui/src/components/atoms/Form/Input";
import Icon from "@ezycore/ui/src/components/atoms/Icon";
import classNames from "classnames";

const SearchBar = ({ isOpen, onBlur }) => {
  const [maxHeight, setMaxHeight] = React.useState(0);
  const ref = React.useRef(null);
  const formref = React.useRef(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      setMaxHeight(`${ref.current.scrollHeight}px`);
      setTimeout(function () {
        formref.current.classList.add("in");
        formref.current.classList.remove("out");
        inputRef.current.focus();
      }, 300);
    } else {
      formref.current.classList.remove("in");
      formref.current.classList.add("out");
      setTimeout(function () {
        setMaxHeight(0);
      }, 100);
    }
  }, [isOpen]);

  const contentStyles = {
    maxHeight: maxHeight,
  };

  const classes = classNames({
    "search-bar": true,
    open: isOpen,
  });
  return (
    <>
      <div className={classes} ref={ref} style={{ ...contentStyles }}>
        <div className="search-bar__inner">
          <div className="search-bar__form" ref={formref}>
            <InputText
              name="search"
              placeholder="Search..."
              inputRef={inputRef}
              onBlur={onBlur}
            />
            <div className="search-bar__button">
              <Icon icon="search" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
