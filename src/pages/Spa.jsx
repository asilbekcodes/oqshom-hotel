import React, { useEffect, useState } from "react";
import HeroServeces from "../components/HeroServeces";
import bgImg from "../assets/img/serveces/spa2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useHotelContext } from "../context/HeroSlider";
import axios from "axios";
import { api } from "../api/BaseUrl";

function Spa() {
  const data = {
    title: "SPA & Wellness",
    image: bgImg,
  };

  const { additionalData, loading, error } = useHotelContext();
  const spaData =
    additionalData.find((item) => item.page === "spa")?.additional || [];

  const [dataSpa, setDataSpa] = useState();

  const fetchSpa = async () => {
    try {
      const res = await axios 
      api.get(`hotel/spa/`);
      setDataSpa(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSpa();
  }, []);

  return (
    <div>
      <HeroServeces data={spaData.length > 0 ? spaData[0] : data} />
      <div className="container mx-auto px-4">
        <div className="text-center my-20">
          <h2 className="h2">{dataSpa && dataSpa[0]?.title}</h2>
          <p className="w-[70%] mx-auto">
            {dataSpa && dataSpa[0]?.description}
          </p>
        </div>

        <div className="space-y-24 mb-20">
          {dataSpa &&
            dataSpa[0]?.items?.map((spa, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                } items-center gap-10`}
              >
                {/* Carousel */}
                <div className="w-full lg:w-[70%]">
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation
                    autoplay={{ delay: 4000 }}
                    loop
                    className="rounded-xl overflow-hidden"
                  >
                    {spa?.images.map((img, idx) => (
                      <SwiperSlide key={idx}>
                        <img
                          src={img.image}
                          alt={`slide-${idx}`}
                          className="w-full h-[380px] object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Text */}
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4">{spa.title}</h3>
                  <p className="text-gray-700">{spa.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Spa;
