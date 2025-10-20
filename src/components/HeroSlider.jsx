import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

import { Autoplay, EffectFade } from "swiper/modules";

import Img1 from "../assets/img/heroSlider/1.jpg";
import Img2 from "../assets/img/heroSlider/2.jpg";
import Img3 from "../assets/img/heroSlider/3.jpg";
import Animation from "./Animation";
import { useHotelContext } from "../context/HeroSlider";

const slides = [
  {
    title: "Your luxuary hotel for vacation",
    image: Img1,
    description: "just enjoy and relax",
  },
  {
    title: "Your luxuary hotel for vacation",
    image: Img2,
    description: "just enjoy and relax",
  },
  {
    title: "Your luxuary hotel for vacation",
    image: Img3,
    description: "just enjoy and relax",
  },
];

function HeroSlider() {
  const { additionalData, loading, error } = useHotelContext();
  const homeData = additionalData.find((item) => item.page === "home")?.additional || [];
  const slidesToShow = homeData.length > 0 ? homeData : slides;  

  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={"fade"}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="heroSlider h-[600px] lg:h-[860px]"
    >
      {slidesToShow?.map((slide, index) => {
        const { title, image, description } = slide;
        return (
          <SwiperSlide
            className="h-full flex justify-center relative items-center"
            key={index}
          >
            <div className="z-20 text-white text-center relative px-4 -bottom-40">
              <div className="uppercase font-tertiary tracking-[6px] mb-5">
                {description}
              </div>
              <Animation dataAos="fade-up">
                <h1 className="text-[32px] font-primary uppercase tracking-[2px] max-w-[920px] lg:text-[68px] leading-tight mb-6 mx-auto">
                  {title}
                </h1>
                <button className="btn btn-lg btn-primary mx-auto">
                  See our rooms
                </button>
              </Animation>
            </div>

            <div className="absolute top-0 w-full h-full">
              <img
                className="w-full h-full object-cover"
                src={image}
                alt={title}
              />
            </div>
            <div className="absolute top-0 w-full h-full bg-black/70"></div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default HeroSlider;
