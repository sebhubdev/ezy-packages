import React, { ReactNode } from "react";

function InfoCard({ title, children }) {
  return (
    <div className="info-card bg-quaternary p-4">
      <div className="info-card__inner">
        {title && <div className="info-card__title h2">{title}</div>}
        <div className="info-card__content pl-16 mt-2">{children}</div>
      </div>
    </div>
  );
}

export default InfoCard;
