import React, { useEffect, useState } from "react";
import bgImg from "../assets/img/heroSlider/aboutHotel.jpg";
import HeroServeces from "../components/HeroServeces";
import AboutDetails from "../components/AboutDetails";
import CountItem from "../components/CountItem";
import Animation from "../components/Animation";
import { useHotelContext } from "../context/HeroSlider";
import { api } from "../api/BaseUrl";
import { useTranslation } from "react-i18next";

function About() {
  const data = {
    title: "about us",
    description:
      "At our hotel, we strive to do everything we can to make your stay exceptional.",
    image: bgImg,
  };

  const { additionalData, loading, error } = useHotelContext();
  const aboutData =
    additionalData?.find((item) => item.page === "about")?.additional || [];

  const [count, setCount] = useState([]);
  const { t } = useTranslation();

  const countData = () => {
    api
      .get(`about/result/`)
      .then((res) => {
        setCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    countData();
  }, []);

  return (
    <div>
      <HeroServeces data={aboutData.length > 0 ? aboutData[0] : data} />
      <div className="container mx-auto px-4">
        <AboutDetails />
        <Animation dataAos="zoom-in">
          <div className="my-20">
            <p className="font-tertiary text-[20px] lg:text-[32px] text-center underline underline-offset-8">
              {t("text")}
            </p>

            {/* Scrollda ko‘rinadigan count animatsiya */}
            <div className="flex flex-wrap justify-center gap-10 mt-10">
              {count.map((item, index) => (
                <CountItem key={index} end={item.count} label={item.type} />
              ))}
            </div>
          </div>
        </Animation>
      </div>
    </div>
  );
}

export default About;
