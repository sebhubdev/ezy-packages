import React from "react";
import { memo } from "react";
import FullLogo from "@ezycore/ui/src/components/molecules/FullLogo/FullLogo";
import Navigator from "@ezycore/ui/src/components/organisms/Navigator";

const Footer = ({ nav }) => {
  return (
    <footer className="main-footer">
      <div>
        <FullLogo />
        <p className="main-footer__copyright">Copyright</p>
        <Navigator items={nav} />
      </div>
    </footer>
  );
};

export default memo(Footer);
