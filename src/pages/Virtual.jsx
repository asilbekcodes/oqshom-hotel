import { useState } from "react";
import HeroServeces from "../components/HeroServeces";
import bgImg from "../assets/img/heroSlider/rooms.jpg";
import Animation from "../components/Animation";
import { useHotelContext } from "../context/HeroSlider";
import { useRoomsContext } from "../context/RoomsContext";

function Virtual() {
  const data = {
    title: "virtual tour of the rooms",
    image: bgImg,
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [activeUrl, setActiveUrl] = useState("");

  const openModal = (url) => {
    setActiveUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveUrl("");
  };

   const { additionalData, loading, error } = useHotelContext();
    const virtualData =
      additionalData.find((item) => item.page === "rooms")?.additional || [];

  const { rooms } = useRoomsContext()
  console.log(rooms);
  

  return (
    <div>
      {/* Hero Section */}
      <HeroServeces data={virtualData.length > 0 ? virtualData[0] : data} />

      {/* Virtual Tour List */}
      <div className="container mx-auto px-4">
        <Animation dataAos="zoom-in">
          <div className="my-16">
            <h2 className="h2">Virtual Tour of the Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {rooms?.map((room) => (
                <div
                  key={room.id}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={room.main_image || "/placeholder.svg"}
                      alt={room.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* <button
                      onClick={() =>
                        openModal(
                          room.url
                        )
                      }
                      className="text-white"
                    >
                      <IoEye className="text-5xl" />
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Animation>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-5xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-1 right-2 text-black text-2xl"
            >
              &times;
            </button>
            <div className="aspect-video">
              <iframe
                src={activeUrl}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Virtual;
