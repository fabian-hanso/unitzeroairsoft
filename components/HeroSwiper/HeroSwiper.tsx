"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";

export default function HeroSwiper() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className="w-full lg:h-[800px] h-96"
      autoplay
    >
      <SwiperSlide className="relative w-full h-full">
        <img
          src="/Marcel-1.jpg"
          alt="Slider"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </SwiperSlide>
      <SwiperSlide className="relative w-full h-full">
        <img
          src="/Marcel-2.jpg"
          alt="Slider"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </SwiperSlide>

      <SwiperSlide className="relative w-full h-full">
        <img
          src="/Marcel-3.jpg"
          alt="Slider"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </SwiperSlide>
    </Swiper>
  );
}
