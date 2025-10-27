import React, { useEffect, useState } from "react";
import { api } from "../api/BaseUrl";
import img from "../assets/img/rooms/7-lg.png";
import { useTranslation } from "react-i18next";

function Profil() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("profile");
  const [data, setData] = useState({});
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("userToken");

  const profileData = () => {
    api
      .get("users/me/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log("Profile fetch error:", err));
  };

  const orderData = async () => {
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

      setOrders(ordersWithRooms);
    } catch (error) {
      console.log("Orders fetch error:", error);
    }
  };

  useEffect(() => {
    profileData();
    orderData();
  }, []);

  return (
    <div>
      <div className="bg-black min-h-[100px]"></div>
      <div className="container mx-auto px-4 min-h-[90vh]">
        <div className="block lg:flex justify-between mt-10 gap-5">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="space-y-4 my-6 lg:my-0">
              <button
                className={`w-full text-center px-5 py-3 text-lg rounded-xl font-semibold transition-all duration-300 shadow-sm border ${
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-[#ACCCCB] to-[#5A9A97] text-white shadow-md scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:shadow-md"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                {t("my_info")}
              </button>

              <button
                className={`w-full text-center px-5 py-3 text-lg rounded-xl font-semibold transition-all duration-300 shadow-sm border ${
                  activeTab === "orders"
                    ? "bg-gradient-to-r from-[#ACCCCB] to-[#5A9A97] text-white shadow-md scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:shadow-md"
                }`}
                onClick={() => setActiveTab("orders")}
              >
                {t("my_orders")}
              </button>
            </div>
          </div>

          {/* Profile / Orders */}
          <div className="lg:w-2/3">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">{t("my_info")}</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">
                      {t("lastname")}
                    </label>
                    <input
                      type="text"
                      defaultValue={data.last_name}
                      className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      {t("firstname")}
                    </label>
                    <input
                      type="text"
                      defaultValue={data.first_name}
                      className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      defaultValue={data.email}
                      className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      {t("phone")}
                    </label>
                    <input
                      type="tel"
                      defaultValue={data.phone_number}
                      className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  {t("my_orders")}
                </h2>

                {orders.length === 0 ? (
                  <p>{t("no_orders")}</p>
                ) : (
                  orders.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row w-full hover:bg-gray-100 mb-4"
                    >
                      <img
                        className="object-cover w-full h-full rounded-t-lg md:w-1/3 md:h-auto md:rounded-none md:rounded-s-lg"
                        src={item.roomData?.main_image || img}
                        alt={item.roomData?.title || "Room"}
                      />
                      <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight">
                          {item.roomData?.title || "Room"}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700">
                          {item.roomData?.description.slice(0, 100) || "-"}
                        </p>
                        <p className="mb-3 font-normal">
                          {t("size")}: {item.roomData?.size} m² <br />
                          {t("adults")}: {item.roomData?.adults}
                        </p>
                        <p className="font-normal">
                          {t("check_in")}: {item.start_date} <br />
                          {t("check_out")}: {item.end_date}
                        </p>
                        <p className="font-normal">
                          {t("price")}: {item.roomData?.price} UZS
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
