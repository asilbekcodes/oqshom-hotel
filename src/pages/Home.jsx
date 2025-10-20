import React from "react";
import Rooms from "../components/Rooms";
import BookForm from "../components/BookForm";
import HeroSlider from "../components/HeroSlider";
import ComfortSection from "../components/ComfortSection";
import Travel from "../components/Travel";
import Carausel from "../components/Carausel";
import FotoGalereya from "../components/FotoGalereya";
import MapView from "../components/map";

function Home() {
  
  return (
    <div>
      <HeroSlider />
      <div className="container mx-auto relative">
        <div id="rooms" className="bg-accent/20 mt-4 p-4 lg:shadow-xl lg:absolute lg:-top-12 lg:left-0 lg:right-0 lg:p-0 lg:z-30">
          <BookForm />
        </div>
      </div>
      <Rooms />
      <div className="container mx-auto mb-20">
        <Carausel />
        <ComfortSection />
        <Travel />
        <FotoGalereya />
      </div>
      <div className="container mx-auto">
        <div className="flex justify-between flex-wrap">
          <h2 className="h2 ">CONTACT US</h2>
          <div className="text-[20px]">
            <p>+998 75 225 10 10</p>
            <p>+998 75 225 33 22</p>
          </div>
        </div>
      </div>
      <div className="z-0 ">
        <MapView />
      </div>
    </div>
  );
}

export default Home;
