import React from "react";
import img1 from "../assets/img/travel/kokGumbaz.webp";
import img2 from "../assets/img/travel/oqSaray.jpg";
import img3 from "../assets/img/travel/qarshiBogi.webp";
import img4 from "../assets/img/travel/qarshiKoprigi.jpg";
import img5 from "../assets/img/travel/teatr.jpg";
import Animation from "./Animation";
import { useTranslation } from "react-i18next";

const Travel = () => {
  const { t } = useTranslation();
  
  return (
    <section>
      <Animation dataAos="fade-right">
        <h2 className="text-2xl lg:text-3xl font-semibold my-10 uppercase">
          {t("our_travel_packages")}
        </h2>

        <div className="grid md:grid-cols-4 gap-4 text-[22px] font-lato">
          {/* Row 1 */}

          <div className="col-span-2 relative rounded-lg overflow-hidden group">
            <img
              src={img2}
              alt="travel"
              className="group-hover:scale-110 duration-300 w-full transition-all h-56 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              {t("oq_saray")}
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden group">
            <img
              src={img4}
              alt="travel"
              className="w-full group-hover:scale-110 duration-300 transition-all h-56 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              {t("qarshi_koprigi")}
            </div>
          </div>

          <div className="col-span-1 md:col-span-1 md:row-span-2 relative rounded-lg overflow-hidden group">
            <img
              src={img1}
              alt="travel"
              className="w-full h-56 md:h-full object-cover group-hover:scale-110 duration-300 transition-all"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              {t("kok_gumbaz")}
            </div>
          </div>
          {/* Row 2 */}
          <div className="col-span-2 md:col-span-1 relative rounded-lg overflow-hidden group">
            <img
              src={img5}
              alt="travel"
              className="w-full h-56 object-cover group-hover:scale-110 duration-300 transition-all"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              {t("qarshi_teatr")}
            </div>
          </div>

          <div className="col-span-2 relative rounded-lg overflow-hidden group">
            <img
              src={img3}
              alt="travel"
              className="w-full h-56 object-cover group-hover:scale-110 duration-300 transition-all"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              {t("qarshi_bogi")}
            </div>
          </div>
        </div>
      </Animation>
    </section>
  );
};

export default Travel;
