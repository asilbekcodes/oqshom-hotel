import React from "react";
import Animation from "../components/Animation";
import { useLocation } from "react-router-dom";
import Room from "../components/Room";
import { useRoomsContext } from "../context/RoomsContext";

function FilterRooms() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const adults = parseInt(queryParams.get("adults")) || 0;
  const kids = parseInt(queryParams.get("kids")) || 0;

  const { rooms } = useRoomsContext();

  const filteredRooms = rooms.filter((room) => room.capacity >= adults + kids);

  return (
    <div>
      <div className="bg-black min-h-[100px]"></div>
      <div className="container mx-auto lg:px-0 my-20">
        <Animation dataAos="zoom-out">
          <div className="text-center mb-10">
            <div className="font-tertiary uppercase tracking-[6px] text-[15px] text-accent">
              Hotel & Spa Adina
            </div>
            <h2 className="font-primary text-[45px] mb-4">Rooms & Suites</h2>
          </div>
        </Animation>
        <Animation dataAos="zoom-in">
          <div className="grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0">
            {filteredRooms?.map((room) => {
              return <Room key={room.id} room={room} />;
            })}
          </div>
        </Animation>
      </div>
    </div>
  );
}

export default FilterRooms;
