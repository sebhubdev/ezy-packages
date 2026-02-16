import "./FullLogo.scss";

import React from "react";
import { LogoIcon, LogoTitle } from "@ezycore/ui/src/components/atoms/Logo";
const FullLogo = () => {
  return (
    <>
      <div className="full-logo">
        <div className="full-logo__inner">
          <LogoIcon />
          <LogoTitle />
        </div>
      </div>
    </>
  );
};

export default FullLogo;
