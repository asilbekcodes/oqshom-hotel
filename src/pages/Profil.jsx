import React, { useEffect, useState } from "react";
import { api } from "../api/BaseUrl";
import img from "../assets/img/rooms/7-lg.png";

function Profil() {
  const [activeTab, setActiveTab] = useState("profile");
  const [data, setData] = useState({});
  const [order, setOrder] = useState([]);

  const userData = {
    firstname: "Asilbek",
    lastname: "Suvonov",
    email: "asilbek@example.com",
    phone: "+998 90 123 45 67",
  };

  const profileData = () => {
      api.get(`users/`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const orderData = () => {
      api.get(`rooms/booking/`)
      .then((res) => setOrder(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    profileData();
    orderData();
  }, []);

  return (
    <div>
      <div className="bg-black min-h-[100px]"></div>
      <div className="container mx-auto px-4 min-h-[90vh]">
        <div className="block lg:flex justify-between mt-10 gap-5 ">
          <div className="lg:w-1/3">
            <div className="space-y-3 my-6 lg:my-0">
              <button
                className={`w-full text-center px-4 py-3 text-lg rounded-lg font-medium transition ${
                  activeTab === "profile"
                    ? "bg-gray-100 text-black"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Mening ma'lumotlarim
              </button>
              <button
                className={`w-full text-center px-4 py-3 text-lg rounded-lg font-medium transition ${
                  activeTab === "orders"
                    ? "bg-gray-100 text-black"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("orders")}
              >
                Mening buyurtmalarim
              </button>
            </div>
          </div>

          <div className="lg:w-2/3">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Mening ma'lumotlarim
                </h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Familiya *</label>
                    <input
                      type="text"
                      defaultValue={userData.lastname}
                      className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Ism *</label>
                    <input
                      type="text"
                      defaultValue={userData.firstname}
                      className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Elektron pochta
                    </label>
                    <input
                      type="email"
                      defaultValue={userData.email}
                      className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Telefon raqam
                    </label>
                    <input
                      type="tel"
                      defaultValue={userData.phone}
                      className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Buyurtmalarim</h2>
                <p>Sizda hali hech qanday buyurtma mavjud emas.</p>

                <div
                  className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row w-full hover:bg-gray-100"
                >
                  <img className="object-cover w-full h-full rounded-t-lg md:w-48 md:h-48 md:rounded-none md:rounded-s-lg" src={img} alt=""/>
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight">
                      Noteworthy technology acquisitions 2021
                    </h5>
                    <p className="mb-3 font-normal text-gray-700">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
