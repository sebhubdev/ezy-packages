import React from "react";
import Brand from "../../Brand/Brand";
import { BaseFooter } from "@ezycore/ui/components/layout";

const Footer = () => (
  <BaseFooter className="app-footer">
    <div className="app-footer__inner ctn ctn--lg">
      <p>Small beginnings. Big possibilities.</p>
      <div className="app-footer__brand">
        <span>Powered by</span>
        <Brand showMascot={false} />
      </div>
    </div>
  </BaseFooter>
);
export default Footer;
