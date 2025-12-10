import React, { ReactNode } from "react";

function InfoCard({ title, children }) {
  return (
    <div className="info-card bg-quaternary py-8 px-8">
      <div className="info-card__inner">
        {title && <div className="info-card__title h2">{title}</div>}
        <div className="info-card__content pl-16 mt-4">{children}</div>
      </div>
    </div>
  );
}

export default InfoCard;
