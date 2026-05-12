import React from "react";
import Icon from "@ezycore/ui/components/atoms/Icon";

const IconsNav = ({ items }) => {
  return (
    <div className="icons-nav">
      <div className="icons-nav__inner">
        {items &&
          items.map((item, key) => {
            return (
              <div key={key} className="icons-nav__item">
                <Icon icon={item.icon} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default IconsNav;
