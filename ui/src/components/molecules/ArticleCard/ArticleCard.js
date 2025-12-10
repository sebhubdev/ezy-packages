import React from "react";
import RichText from "@ezycore/ui/components/atoms/RichText/RichText";
import Heading from "@ezycore/ui/components/atoms/Typo/Heading";
import Btn from "@ezycore/ui/components/atoms/Btn";
import { Link } from "react-router-dom";
import { useLinkResolver } from "@ezycore/hooks";
import { t } from "@ezycore/i18n";

const ArticleCard = ({ data }) => {
  const { title, description, image, uid, currentLang, readingTime } = data;
  const pathLink = useLinkResolver("article", {
    lang: currentLang.path,
    uid: uid,
  });
  return (
    <>
      <div className="article-card">
        <Link to={pathLink}>
          <div className="article-card__image">
            {image && <img src={image.url} alt={image.alt} />}
          </div>
        </Link>
        <div className="article-card__content">
          <div className="article-card__title">
            <Link to={pathLink}>
              <Heading level="4" classes="orange">
                {title}
              </Heading>
            </Link>
          </div>
          <div className="article-card__reading-time">
            {t("Reading time", { minutes: readingTime })}
          </div>
          <div className="article-card__description">
            <RichText content={description} />
          </div>
          <div className="article-card__button">
            <Btn to={pathLink} appearance="link">
              {t("Read more")}...
            </Btn>
          </div>
        </div>
      </div>
    </>
  );
};
export default ArticleCard;
