import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LabeledImageCard from "@ezycore/ui/src/components/molecules/LabeledImageCard";
import resolveUrl from "@ezycore/ui/src/components/helpers/resolveUrl";
import { LayoutContext } from "@ezycore/ui/src/components/layout/GenericLayout";

const LabeledImageCardsGrid = ({ cards }) => {
  const { routes } = useContext(LayoutContext);

  return (
    <>
      <div className="labeled-image-cards-grid slice">
        {cards.map((card, key) => {
          const url = resolveUrl(card.link, routes);
          return (
            <Link key={key} to={url}>
              <LabeledImageCard card={card} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default LabeledImageCardsGrid;
