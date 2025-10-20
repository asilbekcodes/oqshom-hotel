import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../api/BaseUrl";

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [additionalData, setAdditionalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdditionalData = async () => {
    setLoading(true);
    try {
      const res = await axios
      api.get(`hotel/hotel-slider/`);
      setAdditionalData(res.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdditionalData();
  }, []);

  return (
    <HotelContext.Provider value={{ additionalData, loading, error }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotelContext must be used within a HotelProvider");
  }
  return context;
};
