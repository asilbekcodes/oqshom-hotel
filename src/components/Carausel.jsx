import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { BsFillTaxiFrontFill } from "react-icons/bs";
import { LiaCcVisa } from "react-icons/lia";
import { PiBroom } from "react-icons/pi";
import { FaBriefcaseMedical, FaWifi } from "react-icons/fa";
import { IoBedSharp } from "react-icons/io5";
import { TbSwimming } from "react-icons/tb";

const services = [
  { icon: <MdOutlineLocalLaundryService />, title: "Laundry Service" },
  { icon: <BsFillTaxiFrontFill />, title: "Airport Transfer" },
  { icon: <LiaCcVisa />, title: "Visa Support" },
  { icon: <PiBroom />, title: "Room Service" },
  { icon: <FaBriefcaseMedical />, title: "Medical Assistance" },
  { icon: <FaWifi />, title: "Free WiFi" },
  { icon: <IoBedSharp />, title: "Comfort Beds" },
  { icon: <TbSwimming />, title: "Swimming Pool" },
];

function Carousel() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 uppercase mb-4">
        Our Services
      </h2>
      <p className="mb-6">
        Our hotel offers a wide range of services designed specifically to make
        your stay comfortable, convenient, and unforgettable.
      </p>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="w-full"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 flex flex-col items-center justify-center text-center h-full">
              <span className="text-5xl mb-2 bg-accent text-white p-8 rounded-full">{service.icon}</span>
              <h3 className="text-lg font-medium    ">{service.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
