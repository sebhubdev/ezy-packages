import "./AlertMsg.scss";

import React from "react";

const AlertMsg = ({ message, appareance }) => {
  return (
    <div className="alert-message">
      <div
        className={`alert-message__content${
          appareance ? " " + appareance : ""
        }`}
      >
        {message || "here the message"}
      </div>
    </div>
  );
};

export default AlertMsg;
