import React from "react";
import img1 from "../assets/img/gallery/travel1.jpg";
import img2 from "../assets/img/gallery/travel2.jpg";
import img3 from "../assets/img/gallery/travel3.avif";
import img4 from "../assets/img/gallery/travel4.jpg";
import img5 from "../assets/img/gallery/travel5.jpeg";
import Animation from "./Animation";

const Travel = () => {
  return (
    <section>
      <Animation dataAos="fade-right">
        <h2 className="text-2xl lg:text-3xl font-semibold my-10 uppercase">
          our travel packages
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
              Venetsiya
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden group">
            <img
              src={img3}
              alt="travel"
              className="w-full group-hover:scale-110 duration-300 transition-all h-56 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              Ha Long ko‘rfazi
            </div>
          </div>

          <div className="col-span-1 md:col-span-1 md:row-span-2 relative rounded-lg overflow-hidden group">
            <img
              src={img1}
              alt="travel"
              className="w-full h-56 md:h-full object-cover group-hover:scale-110 duration-300 transition-all"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              Amalfi qirg‘oqlari
            </div>
          </div>
          {/* Row 2 */}
          <div className="col-span-2 md:col-span-1 relative rounded-lg overflow-hidden group">
            <img
              src={img4}
              alt="travel"
              className="w-full h-56 object-cover group-hover:scale-110 duration-300 transition-all"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              Verdon darasi
            </div>
          </div>

          <div className="col-span-2 relative rounded-lg overflow-hidden group">
            <img
              src={img5}
              alt="travel"
              className="w-full h-56 object-cover group-hover:scale-110 duration-300 transition-all"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2">
              Kotor, Chernogoriya
            </div>
          </div>
        </div>
      </Animation>
    </section>
  );
};

export default Travel;
