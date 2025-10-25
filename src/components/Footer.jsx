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
import axios from "axios";
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

  const paymentLogos = [
    {
      name: "Humo",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb1mcSV7yZ6JhxTR1roN8aiQozP-oLJuJBAw&s",
    },
    {
      name: "Mastercard",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    },
    {
      name: "Uzcard",
      src: "https://bank.uz/upload/yp/static/058/0584015c28a78f817d6385b99ed3680a.jpg",
    },
    {
      name: "Visa",
      src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    },
  ];

  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios
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
      <div className="container mx-auto flex flex-col items-center gap-6 text-sm md:flex-row md:justify-between">
        {/* Address */}
        <div className="text-center md:text-left font-semibold">
          <img className="w-44" src={oqshom_logo} alt="logo" />
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

        {/* Contact */}
        <div className="text-center md:text-right">
          <a
            href="mailto:oqshomplaza@mail.ru"
            className="text-[#e3af5e] font-semibold hover:underline"
          >
            oqshomplaza@mail.ru
          </a>
          <br />
          <a href="#" className="font-semibold hover:underline">
            {t("public_offer")}
          </a>
        </div>
      </div>

      {/* Payment Logos */}
      <div className="mt-6 flex justify-center flex-wrap">
        {paymentLogos.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.name}
            className="h-10 w-20 object-contain rounded-md px-2 py-1"
          />
        ))}
      </div>

      {/* Scroll to top */}
      <div className="mt-6 flex justify-center">
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
