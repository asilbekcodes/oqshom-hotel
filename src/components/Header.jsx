import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Hamburger va Close icon
import ModalComponent from "./ModalComponent";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import oqshom_logo from "../assets/img/oqshom_logo.png";

function Header() {
  const [header, setHeader] = useState(false);
  const [navOpen, setNavOpen] = useState(false); // menyu ochiq/berkitilgan
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = () => {
    const token = localStorage.getItem("userToken");
    const { t } = useTranslation();

    return (
      <>
        <a href="/" className="hover:text-accent transition">
          {t("nav_home")}
        </a>
        <a href="/about" className="hover:text-accent transition">
          {t("nav_about")}
        </a>
        <a href="/virtual" className="hover:text-accent transition">
          {t("nav_rooms")}
        </a>
        <a href="/serveces" className="hover:text-accent transition">
          {t("nav_services")}
        </a>
        {/* <a href="/spa" className="hover:text-accent transition">
          {t("nav_spa")}
        </a> */}
        <a href="/contact" className="hover:text-accent transition">
          {t("nav_contact")}
        </a>
        <div className="hover:text-accent transition">
          <LanguageSelector /> 
        </div>
        {token ? (
          <a href="/profil" className="hover:text-accent transition">
            {t("profil")}
          </a>
        ) : (
          <a
            onClick={() => setIsLogin(true)}
            className="hover:text-accent transition"
          >
            {t("login")}
          </a>
        )}
      </>
    );
  };

  return (
    <header
      className={`${
        header ? "bg-white py-6 shadow-lg" : "bg-transparent py-8"
      } fixed z-50 w-full transition-all duration-500`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="/">
          <img
            className="w-[160px]"
            src={oqshom_logo}
            alt="logo"
          />
        </a>

        <nav
          className={`hidden lg:flex gap-x-8 font-tertiary tracking-[3px] text-[15px] uppercase ${
            header ? "text-primary" : "text-white"
          }`}
        >
          {navLinks()}
        </nav>

        <div className="lg:hidden z-50">
          <button onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? (
              <FiX
                className={`text-3xl ${
                  header
                    ? "text-primary"
                    : navOpen
                    ? "text-primary"
                    : "text-white"
                }`}
              />
            ) : (
              <FiMenu
                className={`text-3xl ${header ? "text-primary" : "text-white"}`}
              />
            )}
          </button>
        </div>

        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 text-primary text-xl font-tertiary transition-all duration-500 ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {navLinks()}
        </div>
      </div>
      <ModalComponent
        isLoginModal={isLogin}
        onClose={() => setIsLogin(false)}
        setIsLogin={setIsLogin}
      />
    </header>
  );
}

export default Header;
