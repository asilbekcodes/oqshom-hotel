import React from "react";
import HeroServeces from "../components/HeroServeces";
import ServeceDetails from "../components/ServeceDetails";
import servecesImg from "../assets/img/heroSlider/services.jpg";
import { useHotelContext } from "../context/HeroSlider";

function Serveces() {
  const data = {
    title: "services",
    description:
      "We pride ourselves on offering a wide range of first class services",
    image: servecesImg,
  };

  const { additionalData, loading, error } = useHotelContext();
  const servicesData =
    additionalData.find((item) => item.page === "services")?.additional || [];

  return (
    <section>
      <HeroServeces data={servicesData.length > 0 ? servicesData[0] : data} />
      <div className="container mx-auto">
        <ServeceDetails />
      </div>
    </section>
  );
}

export default Serveces;
