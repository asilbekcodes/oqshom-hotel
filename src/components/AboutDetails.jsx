import { useInfoContext } from "../context/InfoContext";

function AboutDetails() {
  const { infoData } = useInfoContext();

  // Agar infoData undefined bo‘lsa, bo‘sh massiv sifatida ishlatamiz
  const aboutData = infoData?.find((item) => item.page === "about")?.about || [];

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
