import { Pagination, Navigation, Autoplay } from "swiper";

export default {
  spaceBetween: 10,
  slidesPerView: 1,
  loop: true,
  speed: 1000,
  pagination: {
    clickable: true,
  },
  modules: [Pagination, Navigation, Autoplay],
};
