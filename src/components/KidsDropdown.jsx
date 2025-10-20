import React, { useContext } from "react";

import { RoomContext } from "../context/RoomContext";
import { Menu } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import { useRoomsContext } from "../context/RoomsContext";

const lis = [
  { name: "1 Kids" },
  { name: "2 Kids" },
  { name: "3 Kids" },
  { name: "4 Kids" },
];

function KidsDropdown() {
  const { kids, setKids } = useRoomsContext()
  return (
    <Menu as="div" className={"w-full h-full bg-white relative"}>
      <Menu.Button
        className={"w-full h-full flex items-center justify-between px-8"}
      >
        {kids === "0 Kids" ? "No Kids" : kids}
        <BsChevronDown className="text-base text-accent-hover" />
      </Menu.Button>

      <Menu.Items
        as="ul"
        className="absolute w-full bg-white flex flex-col z-40"
      >
        {lis.map((li, index) => (
          <Menu.Item key={index} as="li">
            <div
              onClick={() => setKids(li.name)}
              className={`border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-center items-center cursor-pointer`}
            >
              {li.name}
            </div>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export default KidsDropdown;
