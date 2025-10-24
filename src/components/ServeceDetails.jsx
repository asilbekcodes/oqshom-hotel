import React from "react";
import { useInfoContext } from "../context/InfoContext";

function ServeceDetails() {
  const { infoData, loading, error } = useInfoContext();

  const servicesData =
    infoData?.find((item) => item.page === "services")?.about || [];

  return (
    <div className="space-y-10 lg:space-y-24 py-10">
      {servicesData.map((item, index) => (
        <div
          key={item.id}
          className={`flex flex-col md:flex-row ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          } items-center gap-10 xl:gap-20`}
        >
          <div className="w-full grid grid-cols-2 gap-2 md:gap-4">
            {[item.image1, item.image2].map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`Image ${idx + 1}`}
                className={`w-full h-[350px] md:h-[320px] lg:h-[450px] rounded-lg object-cover ${
                  idx === 0 ? "mt-28" : ""
                }`}
              />
            ))}
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h3 className="h3 uppercase">{item.title}</h3>
            <p className="font-tertiary tracking-[1px] text-[16px]">
              {item.description}
            </p>
            {item.button && (
              <button className="btn btn-primary btn-sm">{item.button}</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServeceDetails;
