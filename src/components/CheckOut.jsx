import React, { useState } from "react";

import DatePictor from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../datepicker.css";
import { BsCalendar } from "react-icons/bs";

function CheckOut() {
  const [endDate, setEndDate] = useState(false);
  return (
    <div className="relative flex items-center justify-end h-full">
      <div className="absolute z-10 pr-8 ">
        <div>
          <BsCalendar className="text-accent text-base" />
        </div>
      </div>
      <DatePictor
        className="w-full h-full"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        placeholderText="Check Out"
      />
    </div>
  );
}

export default CheckOut;
