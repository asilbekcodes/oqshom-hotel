import { useEffect, useState,  } from "react";
import {
  FaVk,
  FaTelegramPlane,
  FaOdnoklassniki,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { api } from "../api/BaseUrl";
import oqshom_logo from "../assets/img/oqshom_logo.png";
import { useTranslation } from "react-i18next";

const iconMap = {
  telegram: FaTelegramPlane,
  instagram: FaInstagram,
  faceebook: FaFacebook,
  vk: FaVk,
  odnoklassniki: FaOdnoklassniki,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn
};

function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const [links, setLinks] = useState([]);

  useEffect(() => {    
      api.get(`hotel/social-media/`) // API manzilini o'zingizga moslashtiring
      .then((res) => {
        setLinks(res.data);
      })
      .catch((err) => {
        console.error("Ijtimoiy tarmoqlarni olishda xatolik:", err);
      });
  }, []);

  return (
    <footer className="bg-black py-8 text-white">
      <div className="container mx-auto flex flex-col">
        {/* Address */}
        <div className="text-center md:text-left font-semibold">
          <img className="w-44" src={oqshom_logo} alt="logo" />
        </div>
        <div>
          <p className="text-lg text-white mb-5">
            {t("footer_description")}
          </p>
        </div>

              {/* Social Icons */}
        <div className="flex gap-4">
          {links.map((item) => {
            const Icon = iconMap[item.name.toLowerCase()];
            if (!Icon) return null; // agar icon topilmasa, chiqarmaymiz

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent rounded-full p-3 hover:opacity-80"
              >
                <Icon className="text-white text-lg" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Scroll to top */}
      <div className="mt-10 flex justify-center">
        <div
          className="border-2 border-white p-2 rounded-md cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp />
        </div>
      </div>

      <div className="mt-6 text-center text-lg">
        &copy; {currentYear}, {t("all_rigths_reserved")}
      </div>
    </footer>
  );
}

export default Footer;
