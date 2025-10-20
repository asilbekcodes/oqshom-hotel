import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/BaseUrl";

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [originalRooms, setOriginalRooms] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [adults, setAdults] = useState("0 Adults");
  const [kids, setKids] = useState("0 Kids");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // API orqali barcha xonalarni yuklab olish
  const roomData = async () => {
    setLoading(true);
    try {
      const res = await axios
      api.get(`rooms/all`);
      setOriginalRooms(res.data);
      setRooms(res.data);
    } catch (err) {
      console.error("Xonalarni olishda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    roomData();
  }, []);

  // Button bosilganda xonalarni filterlash
  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);

    const totalGuests =
      parseInt(adults?.split(" ")[0]) + parseInt(kids?.split(" ")[0]);

    const filtered = originalRooms.filter(
      (room) => totalGuests <= room.adults
    );

    // Soxta yuklanishni ko‘rsatish uchun 1.5s delay
    setTimeout(() => {
      setRooms(filtered);
      setLoading(false);
    }, 1000);
  };

  return (
    <RoomsContext.Provider
      value={{
        rooms,
        adults,
        setAdults,
        kids,
        setKids,
        loading,
        handleClick,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

export const useRoomsContext = () => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error("useRoomsContext must be used within a RoomsProvider");
  }
  return context;
};
