import React, { ReactNode } from "react";

export interface InfoItemProps {
  label: string | null;
  value: ReactNode;
}

function InfoItem({ value = "Value", label = null }: InfoItemProps) {
  return (
    <div className="info-item">
      <div className="info-item__inner d-flex gap-2">
        {label && (
          <div className="info-item__label color-primary">{label} : </div>
        )}
        <div className="info-item__value">{value}</div>
      </div>
    </div>
  );
}

export default InfoItem;
