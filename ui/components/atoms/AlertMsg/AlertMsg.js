import "./AlertMsg.scss";

import React from "react";

const AlertMsg = ({ message = "Alert message", variant = "info" }) => {
  return (
    <div className="alert-message">
      <div className={`alert-message__content alert-${variant}`}>{message}</div>
    </div>
  );
};

export default AlertMsg;
