import React from "react";
import { BaseFooter } from "@ezycore/ui/components/layout";

const Footer = () => (
  <BaseFooter className="app-footer">
    <div className="ctn ctn--lg">{APP_NAME}</div>
  </BaseFooter>
);
export default Footer;
