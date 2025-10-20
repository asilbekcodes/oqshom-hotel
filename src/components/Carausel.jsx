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
import { useTranslation } from "react-i18next";
import "../i18n";

function Carousel() {
  const { t, i18n } = useTranslation();

  const services = [
    { icon: <MdOutlineLocalLaundryService />, title: t("laundry_service") },
    { icon: <BsFillTaxiFrontFill />, title: t("airport_transfer") },
    { icon: <LiaCcVisa />, title: t("visa_support") },
    { icon: <PiBroom />, title: t("room_service") },
    { icon: <FaBriefcaseMedical />, title: t("medical_assistance") },
    { icon: <FaWifi />, title: t("free_wifi") },
    { icon: <IoBedSharp />, title: t("comfort_beds") },
    { icon: <TbSwimming />, title: t("swimming_pool") }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 uppercase mb-4">
        {t("our_services")}
      </h2>
      <p className="mb-6">{t("our_services_desc")}</p>

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
          1024: { slidesPerView: 6 }
        }}
        className="w-full"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 flex flex-col items-center justify-center text-center h-full">
              <span className="text-5xl mb-2 bg-accent text-white p-8 rounded-full">
                {service.icon}
              </span>
              <h3 className="text-lg font-medium">{service.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
