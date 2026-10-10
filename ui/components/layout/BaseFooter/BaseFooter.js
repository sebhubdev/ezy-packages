import React, { forwardRef } from "react";

const BaseFooter = forwardRef(({ className = "", children, ...props }, ref) => (
  <footer {...props} ref={ref} className={`base-footer${className ? ` ${className}` : ""}`}>
    {children}
  </footer>
));
BaseFooter.displayName = "BaseFooter";
export default BaseFooter;
