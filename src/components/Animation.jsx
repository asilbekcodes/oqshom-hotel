import React, { useEffect } from "react";

// importing aos
import AOS from "aos";
import "aos/dist/aos.css";

const Animation = ({ children, dataAos }) => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div data-aos={dataAos} data-aos-once="true" data-aos-duration="1000">
      {children}
    </div>
  );
};

export default Animation;
