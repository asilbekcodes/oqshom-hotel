import React from "react";
import { useTranslation } from "react-i18next";
import { BsArrowsFullscreen, BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";

function Room({ room }) {
  const {
    id,
    title,
    description,
    size,
    price,
    main_image,
    adults,
    // kids
  } = room;

  const { t,i18n  } = useTranslation();
   const currentLang = i18n.language; // hozirgi tilni olish (masalan: 'uz' yoki 'en')

  // Tilga qarab valyuta belgisi
  const currencySymbol = currentLang === "uz" ? "so'm" : "";
  const formattedPrice = `${price} ${currencySymbol}`;
  return (
    <div className="bg-white shadow-2xl min-h-[500px] group">
      <div className="overflow-hidden">
        <img
          className="group-hover:scale-110 duration-300 w-full h-[250px] transition-all"
          src={main_image}
          alt={title}
        />
      </div>
      <div className="bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex items-center justify-center uppercase font-tertiary tracking-[1px] font-semibold text-base">
        <div className="flex justify-between w-[85%]">
          <div className="flex items-center gap-x-2">
            <div className="text-accent">
              <BsArrowsFullscreen className="text-[15px]" />
            </div>
            <div className="flex gap-x-1 items-center text-sm">
              <div>{t("size")}</div>
              <div>{size}m²</div>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="text-accent">
              <BsPeople className="text-[18px]" />
            </div>
            <div className="flex gap-x-1 items-center text-sm">
              <div>{t("max_people")}</div>
              <div>{adults}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Link to={`/room/${id}`}>
          <h3 className="h3">{title}</h3>
        </Link>
        <p className="max-w-[300px] mx-auto mb-3 lg:mb-6">
          {description?.slice(0, 56)}
        </p>
      </div>
      <Link
        to={`/room/${id}`}
        className="btn btn-secondary btn-sm max-w-[300px] mx-auto p-0"
      >
        {t("book_now", { price: formattedPrice })}
      </Link>
    </div>
  );
}

export default Room;
