import { useEffect, useState } from "react";

export const useCountUp = (end, start = 0, duration = 2000, active = true) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!active) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [active, end, start, duration]);

  return count;
};
