import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import img1 from "../assets/img/serveces/spa1.jpg";
import img2 from "../assets/img/serveces/conference2.jpg";
import img3 from "../assets/img/serveces/hotel1.jpg";
import img4 from "../assets/img/serveces/24-hourServices2.jpg";
import img5 from "../assets/img/serveces/restaurant2.jpg";
import img6 from "../assets/img/heroSlider/rooms.jpg";
import img7 from "../assets/img/rooms/7-lg.png";

import { api } from "../api/BaseUrl"; // baseUrl = "http://your-api.com/api/" kabi bo‘lishi kerak
import { useTranslation } from "react-i18next";

function FotoGalereya() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const { t } = useTranslation();

  const localImages = [img1, img2, img3, img4, img5, img6, img7];
  const imagesToShow = galleryImages?.length > 0 ? galleryImages : localImages;

  const fetchGallery = async () => {
    try {
      const res = await api.get(`hotel/hotel-gallery/`);
      a(res.data); // serverdan rasm list keladi
    } catch (err) {
      console.log("Rasm yuklanmadi:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openModal = (index) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const navigateImage = (dir) => {
    setSelectedImage((prev) =>
      dir === "prev"
        ? prev === 0
          ? imagesToShow.length - 1
          : prev - 1
        : prev === imagesToShow.length - 1
        ? 0
        : prev + 1
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") navigateImage("prev");
    if (e.key === "ArrowRight") navigateImage("next");
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <div className="mt-20">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-5">
          {t("atmosphere_title")}
        </h2>
        <p className="text-gray-600 max-w-3xl text-lg leading-relaxed">
          {t("atmosphere_desc")}
        </p>
      </div>

      <div>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {imagesToShow.map((image, index) => {
            const src = typeof image === "string" ? image : image.image; // backend image bo‘lsa .image dan olamiz
            return (
              <SwiperSlide key={index}>
                <div
                  className="relative w-full h-72 cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
                  onClick={() => openModal(index)}
                >
                  <img
                    src={src}
                    alt={`Hotel Atmosphere ${index + 1}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <div className="bg-white/20 rounded-full p-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="11"
                          cy="11"
                          r="8"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <path
                          d="m21 21-4.35-4.35"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {isModalOpen && selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-48 md:-top-10 -right-4 md:-right-10 bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center text-white"
              onClick={closeModal}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="m18 6-12 12" stroke="currentColor" strokeWidth="2" />
                <path d="m6 6 12 12" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            <img
              src={
                typeof imagesToShow[selectedImage] === "string"
                  ? imagesToShow[selectedImage]
                  : imagesToShow[selectedImage]?.image
              }
              alt={`Hotel Atmosphere ${selectedImage + 1}`}
              className="w-full h-[90vh] object-contain rounded-md"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-2 sm:left-[-80px] top-1/2 transform -translate-y-1/2 bg-black/80 md:bg-white/30 md:hover:bg-white/40 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="m15 18-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-2 sm:right-[-80px] top-1/2 transform -translate-y-1/2 bg-black/80 md:bg-white/30 md:hover:bg-white/40 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-1 rounded-full text-sm">
              {selectedImage + 1} / {imagesToShow.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FotoGalereya;
