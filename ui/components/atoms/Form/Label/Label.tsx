// atoms/Label.tsx
import React from "react";
export interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}
const Label = ({ htmlFor, children, className }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children || "here the label"}
    </label>
  );
};

export default Label;
