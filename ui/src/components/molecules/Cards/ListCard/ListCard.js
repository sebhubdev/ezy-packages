import React from "react";
import { Btn } from "@ezycore/ui/src/components/atoms/Btn";
import Avatar from "@ezycore/ui/src/components/molecules/Avatar";

const ListCard = ({
  image,
  label = "List item",
  itemsCol1 = [],
  itemsCol2 = [],
  actions = null,
}) => {
  const initials = label.slice(0, 2).toUpperCase();

  return (
    <>
      <div className="list-card">
        <div className="list-card__inner">
          <div className="list-card__title d-flex gap-2 items-center">
            <Avatar initials={initials} />
            {label && <span className="h4">{label}</span>}
          </div>
          <div className="list-card__info">
            <div className="info-block">
              {itemsCol1 &&
                itemsCol1.map((item, key) => (
                  <div className="info-item" key={key}>
                    {item}
                  </div>
                ))}
            </div>
            <div className="info-block">
              {itemsCol2 &&
                itemsCol2.map((item, key) => (
                  <div className="info-item" key={key}>
                    {item}
                  </div>
                ))}
            </div>
          </div>
          <div className="list-card__actions">{actions}</div>
        </div>
      </div>
    </>
  );
};

export default ListCard;
