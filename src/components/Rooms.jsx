import { useTransition } from "react";
import { RoomContext } from "../context/RoomContext";
import Room from "./Room";
import { ClipLoader } from "react-spinners";
import Animation from "./Animation";
import { useRoomsContext } from "../context/RoomsContext";
import { useTranslation } from "react-i18next";

function Rooms() {
  const { rooms, loading } = useRoomsContext();
  const { t } = useTranslation();  
  return (
    <section className="py-24">
      {loading && (
        <div className="h-screen flex justify-center items-center z-50 fixed bottom-0 top-0 right-0 left-0 bg-black/90">
          <ClipLoader color="white" />
        </div>
      )}
      <div className="container mx-auto lg:px-0 ">
        <Animation dataAos="zoom-out">
          <div className="text-center">
            <div className="font-tertiary uppercase tracking-[6px] text-[15px] text-accent">
               {t("hotel_name")}
            </div>
            <h2 className="font-primary text-[45px] mb-4"> {t("rooms_title")}</h2>
          </div>
        </Animation>
        <Animation dataAos="zoom-in">
          <div className="grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0">
            {rooms?.map((room) => {
              return <Room key={room.id} room={room} />;
            })}
          </div>
        </Animation>
      </div>
    </section>
  );
}

export default Rooms;
