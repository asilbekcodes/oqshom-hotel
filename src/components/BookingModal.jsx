import { useEffect, useState } from "react";
import { BsPeople } from "react-icons/bs";
import { CalendarModal } from "./Calendar";
import { useTranslation } from "react-i18next";

const BookingModal = ({ isOpen, closeModal }) => {
  const { t } = useTranslation();

  const [adults, setAdults] = useState(0);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(value > 0 ? value - 1 : 0);

  const handleSubmit = () => {
    const params = new URLSearchParams({
      adults: adults.toString(),
    });

    window.location.href = `/rooms?${params.toString()}`;
    closeModal();
  };

  const [openModal, setOpenModal] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Oylarga tarjima
  const getMonthName = (monthIndex) => {
    const months = t("monthNames", { returnObjects: true });
    return months[monthIndex];
  };

  const formatDate = (date) => {
    if (!date) return "";
    return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
  };

  const handleDateRangeSelect = (newRange) => {
    setDateRange(newRange);
  };

  const openCalendar = () => setIsCalendarOpen(true);

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
              <h3 className="h3">{t("roomReservations")}</h3>

              {/* Check-in */}
              <div className="h-[40px] relative">
                <div onClick={openCalendar} className="cursor-pointer">
                  <input
                    className="w-full h-[40px] px-[32px] cursor-pointer"
                    type="text"
                    placeholder={t("checkIn")}
                    value={formatDate(dateRange.startDate)}
                    readOnly
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="h-[40px] relative">
                <div onClick={openCalendar} className="cursor-pointer">
                  <input
                    className="w-full h-[40px] px-[32px] cursor-pointer"
                    type="text"
                    placeholder={t("checkOut")}
                    value={formatDate(dateRange.endDate)}
                    readOnly
                  />
                </div>
              </div>

              {/* Guests */}
              <div
                onClick={() => setOpenModal(true)}
                className="relative cursor-pointer"
              >
                <input
                  className="w-full h-[40px] px-[32px] cursor-pointer"
                  type="text"
                  placeholder={t("guests")}
                  value={`${adults} ${t("adults")}`}
                  readOnly
                />
                <BsPeople className="absolute top-3 right-3 text-accent" />
              </div>

              <button onClick={handleSubmit} className="btn btn-primary py-2">
                {t("findRooms")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guests Modal */}
      {openModal && (
        <div className="fixed inset-0 top-[190px] left-[10%] md:left-[80%] z-50">
          <div className="bg-white p-6 w-[300px] rounded">
            <h2 className="text-lg font-semibold">{t("numberOfGuests")}</h2>
            <hr className="my-2" />
            <div className="mb-4">
              <div className="flex justify-between items-end gap-3">
                <div className="w-[50%] mt-2">
                  <label className="text-sm">{t("adults")}</label>
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
              </div>
            </div>
            <hr className="my-6" />
            <button
              onClick={() => setOpenModal(false)}
              className="btn btn-primary py-2 w-full"
            >
              {t("ready")}
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
