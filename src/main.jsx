import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HotelProvider } from "./context/HeroSlider.jsx";
import { InfoProvider } from "./context/InfoContext.jsx";
import { RoomsProvider } from "./context/RoomsContext";
import { Toaster } from "react-hot-toast";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <RoomsProvider>
    <HotelProvider>
      <InfoProvider>
        <StrictMode>
          <App />
          <Toaster position="top-center" reverseOrder={false} />
        </StrictMode>
      </InfoProvider>
    </HotelProvider>
  </RoomsProvider>
);
