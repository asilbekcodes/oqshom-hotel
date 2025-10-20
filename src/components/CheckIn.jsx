import React, { useState } from "react";

import DatePictor from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../datepicker.css";
import { BsCalendar } from "react-icons/bs";

function CheckIn() {
  const [startDate, setStartDate] = useState(false);
  return (
    <div className="relative flex items-center justify-end h-full w-full">
      <div className="absolute z-10 pr-8 ">
        <div>
          <BsCalendar className="text-accent text-base" />
        </div>
      </div>
      <DatePictor
        className="w-full h-full"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Check In"
      />
    </div>
  );
}

export default CheckIn;
