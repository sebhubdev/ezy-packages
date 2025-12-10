import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import sampleConf from "./sliderConf.sample";
import sliderImgSample from "@ezycore/frontend/assets/img/slider-sample.jpg";
import sliderImgSample2 from "@ezycore/frontend/assets/img/slider-sample-2.jpg";
import { Pagination, Navigation, Autoplay } from "swiper";

const ItemComponentSample = ({ image }) => {
  return <img src={image} alt="Slider image sample" />;
};

const Slider = ({ sliderConf = sampleConf, items, ItemComponent, ...rest }) => {
  return (
    <div className="slider">
      <Swiper {...sliderConf} modules={[Pagination, Navigation, Autoplay]}>
        {items && ItemComponent ? (
          items.map((data, key) => {
            return (
              <SwiperSlide key={key}>
                <ItemComponent data={data} {...rest} />
              </SwiperSlide>
            );
          })
        ) : (
          <>
            <SwiperSlide>
              <ItemComponentSample image={sliderImgSample} />
            </SwiperSlide>

            <SwiperSlide>
              <ItemComponentSample image={sliderImgSample2} />
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;
