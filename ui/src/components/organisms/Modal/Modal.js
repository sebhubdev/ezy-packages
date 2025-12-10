import React from "react";
import classNames from "classnames";
import Icon from "@ezycore/ui/src/components/atoms/Icon";

const Modal = ({
  children,
  setIsOpen,
  isOpen,
  afterCloseCallback,
  appearance,
  size,
  className,
  delay = 300,
}) => {
  const [showContent, setShowContent] = React.useState(isOpen ? true : false);

  React.useEffect(() => {
    if (isOpen) {
      setShowContent(true);
    }
    if (!isOpen) {
      setTimeout(() => {
        setShowContent(false);
      }, 300);
    }
  }, [isOpen]);

  const closeModal = () => {
    if (!setIsOpen) return;
    setIsOpen(false);
    if (afterCloseCallback) {
      setTimeout(() => {
        afterCloseCallback();
      }, delay);
    }
  };

  const classes = classNames({
    modal: true,
    "modal-open": isOpen,
    float: !appearance || appearance == "float",
    "float-top": appearance === "float-top",
    "float-bottom": appearance === "float-bottom",
    "float-middle": appearance === "float-middle",
    right: appearance === "right",
    left: appearance === "left",
    small: !size || size === "small",
    medium: size === "medium",
    large: size === "large",
  });
  return (
    <>
      <div className={`${classes}${className ? ` ${className}` : ""}`}>
        <div className="modal__inner">
          <div className="modal__close" onClick={closeModal}>
            <Icon icon="close" />
          </div>
          <div className="modal__content">{showContent && children}</div>
        </div>
        <div className="modal__backdrop" onClick={closeModal}></div>
      </div>
    </>
  );
};

export default Modal;
