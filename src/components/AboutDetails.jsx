import React from "react";
import hotel1 from "../assets/img/serveces/hotel.jpg";
import hotel2 from "../assets/img/serveces/hotel1.jpg";
import conference1 from "../assets/img/serveces/conference1.jpg";
import conference2 from "../assets/img/serveces/conference2.jpg";
import hourServices1 from "../assets/img/serveces/24-hourServices1.jpg";
import hourServices2 from "../assets/img/serveces/24-hourServices2.jpg";
import img1 from "../assets/img/serveces/img.avif";
import img2 from "../assets/img/serveces/img2.jpg";
import { useInfoContext } from "../context/InfoContext";

const about = [
  {
    id: 1,
    title: "A place for inspiration and relaxation",
    description:
      "Our hotel perfectly combines comfort, luxury and the ability to combine leisure and work. You can spend time in our beautiful business center, enjoy soft beds and panoramic views from the windows in the rooms, and enjoy first-class service and excellent restaurants. This is the perfect place to relax, where you can fully enjoy every moment.",
    button: "Book",
    images: [hotel1, hotel2],
    reverse: false,
  },
  {
    id: 2,
    title: "Hotel with Business Center: The perfect place to relax and work",
    description:
      "In today's world, where work and leisure are inextricably linked, you need to find the perfect place where you can fully enjoy your vacations without forgetting your business responsibilities. Our hotel with business center provides a unique opportunity to combine excellent rest and impeccable service for business guests and those who simply love comfort.",
    button: "Book",
    images: [conference1, conference2],
    reverse: true,
  },
  {
    id: 3,
    title: "Safety and convenience - parking right next to the hotel",
    description:
      "We pride ourselves on providing you with convenient parking right on the hotel grounds. This ensures that your vehicle is safe and secure, and you are free to enjoy your stay with us knowing that a parking space is always at your disposal.",
    button: "Book",
    images: [img1, img2],
    reverse: false,
  },
  {
    id: 4,
    title: "Unlock your potential: Join our team",
    description:
      "We are always happy to see new faces in our friendly team. If you are seeking career advancement and want to work in the hospitality industry, we invite you to consider open positions at our hotel. We value talented and dedicated employees, and provide opportunities to develop professionally and achieve your goals.",
    button: "Book",
    images: [hourServices1, hourServices2],
    reverse: true,
  },
];

function AboutDetails() {
  const { infoData, loading, error } = useInfoContext();

  const aboutData = infoData.find((item) => item.page === "about")?.about || [];

  return (
    <div className="space-y-10 lg:space-y-24 py-10">
      {aboutData.map((item, index) => (
        <div
          key={item.id}
          className={`flex flex-col md:flex-row ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          } items-center gap-10 xl:gap-20`}
        >
          <div className="w-full grid grid-cols-2 gap-2 md:gap-4">
            {[item.image1, item.image2].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className={`w-full h-[350px] md:h-[320px] lg:h-[450px] rounded-lg object-cover ${
                  index === 0 ? "mt-28" : ""
                } `}
              />
            ))}
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h3 className="h3 uppercase">{item.title}</h3>
            <p className="font-tertiary tracking-[1px] text-[16px]">
              {item.description}
            </p>
            {item.button && (
              <button className="btn btn-primary btn-sm">{item.button}</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AboutDetails;
