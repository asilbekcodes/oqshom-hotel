import React, { useEffect, useState } from "react";
import { api } from "../api/BaseUrl";
import { useTranslation } from "react-i18next";

function MyBooking() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language; // hozirgi tilni olish (masalan: 'uz' yoki 'en')

  // Tilga qarab valyuta belgisi
  const currencySymbol = currentLang === "uz" ? "UZS" : "$";

  const orderData = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setError(t("user_not_logged_in"));
      setLoading(false);
      return;
    }
    try {
      const res = await api.get("rooms/booking/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // har bir booking uchun xonaning to‘liq ma’lumotini olish
      const ordersWithRooms = await Promise.all(
        res.data.map(async (item) => {
          try {
            const roomRes = await api.get(`rooms/${item.room}/`);
            return { ...item, roomData: roomRes.data };
          } catch (err) {
            console.log("Room fetch error:", err);
            return item;
          }
        })
      );

      // Sort by created_at descending to get the latest booking first
      const sortedOrders = ordersWithRooms.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setOrders(sortedOrders);
    } catch (error) {
      console.log("Orders fetch error:", error);
      setError(t("failed_fetch_bookings"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    orderData();
  }, []);

  if (loading) return <div>{t("loading")}</div>;
  if (error) return <div>{error}</div>;

  const lastBooking = orders[0]; // Latest booking

  return (
    <>
      <div className="bg-black min-h-[100px]"></div>
      <div className="container mx-auto py-24 px-4 min-h-[60vh]">
        {lastBooking ? (
          <div className="">
            <h2 className="h2 mb-4 text-3xl md:text-5xl">
              {t("last_booked_room")}
            </h2>
            <div className="flex flex-col md:flex-row">
              <img
                src={lastBooking.roomData?.main_image}
                alt={lastBooking.roomData?.title}
                className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
              />
              <div>
                <h3 className="h3">{lastBooking.roomData?.title}</h3>
                <p className="mb-2">{lastBooking.roomData?.description}</p>
                <p>
                  <strong>{t("size")}</strong> {lastBooking.roomData?.size} m²
                </p>
                <p>
                  <strong>{t("max_people")}</strong> {lastBooking.roomData?.adults}
                </p>
                <p>
                  <strong>{t("check_in_date")}</strong> {lastBooking.start_date}
                </p>
                <p>
                  <strong>{t("check_out_date")}</strong> {lastBooking.end_date}
                </p>
                <p>
                  <strong>{t("room_price")}</strong> {lastBooking.roomData?.price}{" "}
                  {currencySymbol}{" "}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>{t("no_bookings")}</p>
        )}
      </div>
    </>
  );
}

export default MyBooking;
