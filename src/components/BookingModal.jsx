import { useEffect, useState } from "react";
import { BsPeople } from "react-icons/bs";
import { CalendarModal } from "./Calendar";

const BookingModal = ({ isOpen, closeModal }) => {
  // const [checkIn, setCheckIn] = useState("");
  // const [checkOut, setCheckOut] = useState("");
  // const [guests, setGuests] = useState(1);
  const [adults, setAdults] = useState(0);
  // const [kids, setKids] = useState(0);

  // Date range state
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(value > 0 ? value - 1 : 0);

  const handleSubmit = () => {
    const params = new URLSearchParams({
      adults: adults.toString(),
      // kids: kids.toString(),
    });

    window.location.href = `/rooms?${params.toString()}`
    closeModal();
  };

  const [openModal, setOpenModal] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const getMonthName = (monthIndex) => {
    const months = [
      "yanvar",
      "fevral",
      "mart",
      "aprel",
      "may",
      "iyun",
      "iyul",
      "avgust",
      "sentabr",
      "oktabr",
      "noyabr",
      "dekabr",
    ];
    return months[monthIndex];
  };

  // Format single date for display
  const formatDate = (date) => {
    if (!date) return "";
    return `${date.getDate()} ${getMonthName(
      date.getMonth()
    )} ${date.getFullYear()}`;
  };

  // Calculate nights
  const calculateNights = () => {
    if (!dateRange.startDate || !dateRange.endDate) return 0;
    const diffTime =
      dateRange.endDate.getTime() - dateRange.startDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const nights = calculateNights();
    return nights * 650000;
  };

  // Handle date range selection from calendar
  const handleDateRangeSelect = (newRange) => {
    setDateRange(newRange);
  };

  // Open calendar (can be triggered by either input)
  const openCalendar = () => {
    setIsCalendarOpen(true);
  };

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowAnimation(true), 100);
    } else {
      setShowAnimation(false);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed top-[20%] right-0 z-40">
          <div
            className={`bg-[#f4efe7] w-72 max-h-max p-6 relative transition-transform duration-300 ${
              showAnimation ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={closeModal}
              className="absolute top-[10px] right-3 text-3xl text-gray-600"
            >
              &times;
            </button>
            <div className="flex flex-col space-y-4 mb-4">
              <h3 className="h3">Room reservations</h3>

              {/* Check-in Date Input */}
              <div className="h-[40px] relative">
                <div onClick={openCalendar} className="cursor-pointer">
                  <input
                    className="w-full h-[40px] px-[32px] cursor-pointer"
                    type="text"
                    placeholder="Check In"
                    value={formatDate(dateRange.startDate)}
                    readOnly
                  />
                  <svg
                    className="absolute top-3 right-3 w-4 h-4 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Check-out Date Input */}
              <div className="h-[40px] relative">
                <div onClick={openCalendar} className="cursor-pointer">
                  <input
                    className="w-full h-[40px] px-[32px] cursor-pointer"
                    type="text"
                    placeholder="Check Out"
                    value={formatDate(dateRange.endDate)}
                    readOnly
                  />
                  <svg
                    className="absolute top-3 right-3 w-4 h-4 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Guests Input */}
              <div
                onClick={() => setOpenModal(true)}
                className="relative cursor-pointer"
              >
                <input
                  className="w-full h-[40px] px-[32px] cursor-pointer"
                  type="text"
                  placeholder="Guests"
                  value={`${adults} adults`}
                  readOnly
                />
                <BsPeople className="absolute top-3 right-3 text-accent" />
              </div>

              <button onClick={handleSubmit} className="btn btn-primary py-2">
                find rooms
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guests Modal */}
      {openModal && (
        <div className="fixed inset-0 top-[190px] left-[80%] z-50">
          <div className="bg-white p-6 w-[300px] rounded">
            <h2 className="text-lg font-semibold">Number of guests</h2>
            <hr className="my-2" />
            <div className="mb-4">
              <p className="text-sm mb-4">NUMBER 1</p>
              <div className="flex justify-between items-end gap-3">
                <div className="w-[50%] mt-2">
                  <label className="text-sm">Adults</label>
                  <div className="flex items-center border">
                    <button
                      onClick={() => decrement(setAdults, adults)}
                      className="px-2 py-1 w-full hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{adults}</span>
                    <button
                      onClick={() => increment(setAdults, adults)}
                      className="px-2 py-1 w-full hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* <div className="w-[50%] mt-2">
                  <label className="text-sm">Children under 6 years old</label>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => decrement(setKids, kids)}
                      className="px-2 py-1 w-full hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{kids}</span>
                    <button
                      onClick={() => increment(setKids, kids)}
                      className="px-2 py-1 w-full hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
            <hr className="my-6" />
            <button
              onClick={() => setOpenModal(false)}
              className="btn btn-primary py-2 w-full"
            >
              Ready
            </button>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        dateRange={dateRange}
        onDateRangeSelect={handleDateRangeSelect}
      />
    </>
  );
};

export default BookingModal;
