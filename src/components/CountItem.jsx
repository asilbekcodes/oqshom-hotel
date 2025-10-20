import React, { useRef, useState, useEffect } from "react";
import { useCountUp } from "../hook/useCountUp";

const CountItem = ({ end, label }) => {
  const ref = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);
  const count = useCountUp(end, 0, 850, hasAnimated);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true); // faqat bir marta ishlaydi
          observer.disconnect(); // boshqa observe qilmaydi
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div ref={ref} className="text-center w-[200px]">
      <h2 className="text-[35px] font-bold text-accent">{count}</h2>
      <p className="text-[25px] lg:text-[32px]">{label}</p>
    </div>
  );
};

export default CountItem;
