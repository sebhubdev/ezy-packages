import React from "react";

const Avatar = ({ initials = "aa", image, size = "md" }) => {
  return <div className={`avatar avatar-${size}`}>{initials}</div>;
};

export default Avatar;
