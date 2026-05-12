
import React from "react";

const Page = ({ className, children, pageData, size = "full" }) => {
  return (
    <div className={`page${className ? ` ${className}` : ""}`}>
      <div className={`page__inner ctn ctn--${size}`}>{children}</div>
    </div>
  );
};

export default Page;
