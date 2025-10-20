import React from "react";
import Animation from "./Animation";

function HeroServeces(data) {
  return (
    <div className="h-[600px] lg:h-[860px]">
      <div className="h-full flex justify-center relative items-center">
        <div className="z-20 text-white text-center relative px-4 -top-16">
          <Animation dataAos="fade-up">
            <div className="uppercase text-[18px] lg:text-[68px] font-tertiary tracking-[6px] mb-5">
              {data.data.title}
            </div>
            <h1 className="text-[18px] font-primary uppercase tracking-[2px] max-w-[920px] lg:text-[32px] leading-tight mb-6 mx-auto">
              {data.data.description}
            </h1>
          </Animation>
          {/* <button className="btn btn-lg btn-primary mx-auto">salom</button> */}
        </div>

        <div className="absolute top-0 w-full h-full">
          <img
            className="w-full h-full object-cover"
            src={data.data.image}
            alt="serveces"
          />
        </div>
        <div className="absolute top-0 w-full h-full bg-black/50"></div>
      </div>
    </div>
  );
}

export default HeroServeces;
