import { useState, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import { FaRegCalendarCheck } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Home from "./pages/Home";
import { useTranslation } from "react-i18next";

// 🔹 Sahifalarni lazy load qilamiz
// const Home = lazy(() => import("./pages/Home"));
const RoomDetails = lazy(() => import("./pages/RoomDetails"));
const Serveces = lazy(() => import("./pages/Serveces"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Spa = lazy(() => import("./pages/Spa"));
const Virtual = lazy(() => import("./pages/Virtual"));
const Profil = lazy(() => import("./pages/Profil"));
const FilterRooms = lazy(() => import("./pages/FilterRooms"));

// 🔹 Router
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/room/:id", element: <RoomDetails /> },
  { path: "/serveces", element: <Serveces /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/spa", element: <Spa /> },
  { path: "/virtual", element: <Virtual /> },
  { path: "/profil", element: <Profil /> },
  { path: "/rooms", element: <FilterRooms /> },
]);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { t } = useTranslation();

  return (
    <div>
      <Header />

      {/* Bron qilish tugmasi */}
      <button
        onClick={openModal}
        className={`fixed z-40 bg-tertiary py-2 px-4 tracking-[3px] font-tertiary uppercase text-white -right-2 top-52 lg:px-8 lg:py-4 ${
          isModalOpen ? "hidden" : ""
        }`}
      >
        <FaRegCalendarCheck className="md:hidden block mr-2" />
        <span className="hidden md:block">{t("order_rooms")}</span>
      </button>

      {/* 🔹 Suspense bilan yuklanish animatsiyasi */}
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center z-50 fixed bottom-0 top-0 right-0 left-0 bg-black/90">
            <ClipLoader color="white" />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>

      <Footer />
      <BookingModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
