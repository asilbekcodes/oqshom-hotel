import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { api } from "../api/BaseUrl";

// Marker ikonkani to‘g‘rilash (Leaflet default marker ishlashi uchun)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapView() {
  const [locations, setLocations] = useState([]);

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
    <MapContainer
      center={[38.865275, 65.808873]}
      zoom={13}
      style={{ height: "400px", width: "100%", zIndex: 1 }}
    >
      <TileLayer
        url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.longitude, loc.latitude]}>
          <Popup>{loc.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
