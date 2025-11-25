import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { api } from "../api/BaseUrl";
import { useTranslation } from "react-i18next";

// Custom hotel icon for markers
const hotelIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function ContactAndMapView() {
  const [locations, setLocations] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    api
      .get(`hotel/location/`)
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        console.error("Xarita ma'lumotini olishda xatolik:", err);
      });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full mt-20">
      {/* Contact Information Section */}
      <div className="w-full lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
        <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-gold-500">
          {t("title")}
        </h2>

        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start">
            <span className="font-semibold text-gray-600 min-w-[140px] mb-1 sm:mb-0">
              Phone:
            </span>
            <div className="flex flex-col">
              <span className="text-gray-800">+998 88 900 66 66</span>
              <span className="text-gray-800">+998 90 879 02 03</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start">
            <span className="font-semibold text-gray-600 min-w-[140px] mb-1 sm:mb-0">
              Hotel Email:
            </span>
            <a
              href="mailto:info.PADTH@palacehotels.com"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              oqshomplaza@mail.ru
            </a>
          </div>

          {/* <div className="flex flex-col sm:flex-row sm:items-start">
            <span className="font-semibold text-gray-600 min-w-[140px] mb-1 sm:mb-0">
              Hotel Reservation:
            </span>
            <a
              href="mailto:Stay@addresshotels.com"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Stay@addresshotels.com
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start">
            <span className="font-semibold text-gray-600 min-w-[140px] mb-1 sm:mb-0">
              Dining Reservation:
            </span>
            <a
              href="mailto:DineAtPalaceDowntown@palacehotels.com"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              DineAtPalaceDowntown@palacehotels.com
            </a>
          </div> */}

          <div className="flex flex-col sm:flex-row sm:items-start">
            <span className="font-semibold text-gray-600 min-w-[140px] mb-1 sm:mb-0">
              Address:
            </span>
            <span className="text-gray-800">
              {t("address")}
            </span>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full lg:w-1/2 h-[180px] lg:h-auto z-0">
        <MapContainer
          center={[38.841887, 65.794589]}
          zoom={15}
          className="w-full h-full"
        >
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
          />

          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.longitude, loc.latitude]}
              icon={hotelIcon}
            >
              <Popup>{loc.title}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default ContactAndMapView;
