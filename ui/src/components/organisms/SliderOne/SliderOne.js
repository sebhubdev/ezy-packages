import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import sampleConf from "./sliderConf.sample";
import { Btn } from "@ezycore/ui/src/components/atoms/Btn";
import Icon from "@ezycore/ui/src/components/atoms/Icon";

const SliderOne = ({
  sliderConf = sampleConf,
  items,
  ItemComponent,
  slideId,
}) => {
  return (
    <div>
      <Swiper {...sliderConf} className="slider-one">
        {items.map((data, key) => (
          <SwiperSlide key={key}>
            <ItemComponent key={key} data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
      {sliderConf?.navigation && (
        <div className="slider-one__actions">
          <Btn
            appearance="arrow"
            classes={`${slideId}-prev slider-one__actions__prev`}
          >
            <Icon icon="arrow" />
          </Btn>
          <Btn
            appearance="arrow"
            classes={`${slideId}-next slider-one__actions__next`}
          >
            <Icon icon="arrow" />
          </Btn>
        </div>
      )}
    </div>
  );
};

export default SliderOne;
