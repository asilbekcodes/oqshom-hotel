import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../api/BaseUrl";

const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [infoData, setInfoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInfoData = async () => {
    setLoading(true);
    try {
      const res = await axios
      api.get(
        `about/`
      );
      setInfoData(res.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfoData();
  }, []);

  return (
    <InfoContext.Provider value={{ infoData, loading, error }}>
      {children}
    </InfoContext.Provider>
  );
};

export const useInfoContext = () => {
  const context = useContext(InfoContext);
  if (!context) {
    throw new Error("useInfoContext must be used within a InfoProvider");
  }
  return context;
};
