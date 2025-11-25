import React from "react";
import DishImg from "../assets/img/gallery/dish.jpg";
import MassageImg from "../assets/img/gallery/photo_2025-11-25_15-45-01.jpg";
import PoolImg from "../assets/img/gallery/pool.jpg";
import SaunaImg from "../assets/img/gallery/sauna.jpg";
import RestaurantImg from "../assets/img/gallery/restaurants.jpg";
import Animation from "./Animation";
import { useTranslation } from "react-i18next";

const ComfortSection = () => {
  const { t } = useTranslation();
  return (
    <section>
      <Animation dataAos="fade-left">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-10 uppercase">
          {t("make_stay_comfortable")}
        </h2>

        <div className="grid md:grid-cols-4 gap-4 text-[22px] font-lato">
          {/* Row 1 */}
          <div className="col-span-2 md:col-span-1 md:row-span-2 relative rounded-lg overflow-hidden group">
            <img
              src={DishImg}
              alt="Dish"
              className="w-full h-56 md:h-full object-cover group-hover:scale-110 duration-300 transition-all"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              {t("dish")}
            </div>
          </div>

          <div className="col-span-2 relative rounded-lg overflow-hidden group">
            <img
              src={MassageImg}
              alt="Massage"
              className="w-full h-56 object-cover group-hover:scale-110 duration-300 transition-all"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              {t("massage")}
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 md:row-span-2 relative rounded-lg overflow-hidden group">
            <img
              src={RestaurantImg}
              alt="Restaurant"
              className="w-full h-56 md:h-full object-cover group-hover:scale-110 duration-300 transition-all"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              {t("restaurant")}
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden group">
            <img
              src={PoolImg}
              alt="Pool"
              className="w-full h-56 object-cover group-hover:scale-110 duration-300 transition-all"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              {t("pool")}
            </div>
          </div>

          {/* Row 2 */}
          <div className="relative rounded-lg overflow-hidden group">
            <img
              src={SaunaImg}
              alt="Sauna"
              className="w-full h-56 object-cover group-hover:scale-110 duration-300 transition-all"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              {t("sauna")}
            </div>
          </div>

          
        </div>
      </Animation>
    </section>
  );
};

export default ComfortSection;
