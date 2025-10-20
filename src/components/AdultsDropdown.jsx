import { Menu } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import { useRoomsContext } from "../context/RoomsContext";
import { useTranslation } from "react-i18next";

function AdultsDropdown() {
  const { adults, setAdults } = useRoomsContext();
  const { t } = useTranslation();

  const lis = t("adultsOptions", { returnObjects: true }); // massivni olish

  return (
    <Menu as="div" className="w-full h-full bg-white relative">
      <Menu.Button className="w-full h-full flex items-center justify-between px-8">
        {adults === "0 Adults" || !adults ? t("noAdults") : adults}
        <BsChevronDown className="text-base text-accent-hover" />
      </Menu.Button>

      <Menu.Items
        as="ul"
        className="absolute w-full bg-white flex flex-col z-40"
      >
        {lis.map((li, index) => (
          <Menu.Item key={index} as="li">
            <div
              onClick={() => setAdults(li)}
              className="border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-center items-center cursor-pointer"
            >
              {li}
            </div>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export default AdultsDropdown;
