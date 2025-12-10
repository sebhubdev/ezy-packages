import React from "react";
import Heading from "@ezycore/ui/src/components/atoms/Typo/Heading";
import ArticleCard from "@ezycore/ui/src/components/molecules/ArticleCard";
import SliderOne from "../SliderOne/SliderOne";
import sliderConf from "./sliderConf";
import classNames from "classnames";
import {
  isMobile,
  isTablet,
} from "@ezycore/ui/src/components/helpers/mediaQueries/mediaQueries";

const TestAr = () => {
  return "hola";
};

const ArticlesList = ({
  articles,
  title,
  style = "grid",
  slideId = "slider",
}) => {
  const [slidesPerView, setSlidesPerView] = React.useState(3);
  const [responsiveConf, setResponsiveConf] = React.useState(sliderConf);

  React.useEffect(() => {
    setResponsiveConf({
      slidesPerView: isMobile ? 1 : 3,
      navigation: isMobile
        ? false
        : {
            prevEl: `.${slideId}-prev`,
            nextEl: `.${slideId}-next`,
          },
    });
  }, []);
  const classes = classNames({
    "articles-list": true,
    swiper: style === "slider",
  });

  return (
    <div className={classes}>
      {title && (
        <div className="articles-list__title">
          <Heading level="2" classes="orange">
            {title}
          </Heading>
        </div>
      )}
      {articles[0] ? (
        <>
          {style === "grid" ? (
            <div className="articles-list__articles">
              {articles.map((article, key) => {
                return <ArticleCard key={key} data={article} />;
              })}
            </div>
          ) : (
            <div className="articles-list__slider">
              <SliderOne
                sliderConf={{
                  ...sliderConf,
                  ...responsiveConf,
                }}
                items={articles}
                ItemComponent={ArticleCard}
                slideId={slideId}
              />
            </div>
          )}
        </>
      ) : (
        <div className="articles-list__no-articles">
          <div className="articles-list__no-articles__inner green">
            No articles to show
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ArticlesList);
