import React from "react";
import Icon from "@ezycore/ui/components/atoms/Icon";
import classNames from "classnames";

const BackToTop = ({ container, isVisible }) => {
  const handleClick = () => {
    container.current.scrollTo({
      top: 0,
      left: 1,
      behavior: "smooth",
    });
  };

  const classes = classNames({
    "back-to-top": true,
    visible: isVisible,
  });
  return (
    <div className={classes} onClick={handleClick}>
      <div className="back-to-top__inner">
        <span className="back-to-top__inner__button">
          <Icon icon="arrow" />
        </span>
      </div>
    </div>
  );
};

export default BackToTop;
