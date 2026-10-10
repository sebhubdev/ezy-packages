import React from "react";
import mascot from "../../assets/img/ezycore-mascot-dark.png";

const Brand = ({ showMascot = true, className = "" }) => (
  <span className={`app-brand ${className}`.trim()}>
    {showMascot && <img className="app-brand__mascot" src={mascot} alt="" />}
    <span className="app-brand__wordmark">Ezy<span>Core</span></span>
  </span>
);

export default Brand;
