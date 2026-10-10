import React, { forwardRef } from "react";

const BaseHeader = forwardRef(({ className = "", children, ...props }, ref) => (
  <header {...props} ref={ref} className={`base-header${className ? ` ${className}` : ""}`}>
    {children}
  </header>
));
BaseHeader.displayName = "BaseHeader";
export default BaseHeader;
