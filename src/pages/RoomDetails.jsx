import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import ScrollToTop from "../components/ScrollToTop";
import axios from "axios";
import { baseUrl } from "../api/BaseUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Menu } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import DatePictor from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../datepicker.css";
import { BsCalendar } from "react-icons/bs";
import { eachDayOfInterval, format, parseISO } from "date-fns";
import ModalComponent from "../components/ModalComponent";
import toast from "react-hot-toast";

function RoomDetails( ) {
  const { id } = useParams();
  const [rooms, setRooms] = useState({});
  const [excludeDates, setExcludeDates] = useState([]);
  // const [isLogin, setIsLogin] = useState(false);

  const getRooms = async () => {
    try {
      const res = await axios.get(`${baseUrl}rooms/${id}`);
      const data = res.data;
      setRooms(data);
      const excluded = data.booking_times.flatMap((booking) => {
        const start = parseISO(booking.start_date);
        const end = parseISO(booking.end_date);
        return eachDayOfInterval({ start, end });
      });
      setExcludeDates(excluded);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  const {
    title,
    description,
    main_image,
    room_images,
    facilities,
    rules,
    price,
    adults,
    kids,
  } = rooms;

  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);

  
  const roomBron = () => {
    const token = localStorage.getItem("accessToken");
    axios.post(`${baseUrl}rooms/booking/`, {
      room: id,
      start_date: format(new Date(startDate), "yyyy-MM-dd"),
      end_date: format(new Date(endDate), "yyyy-MM-dd"),
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      toast.success('Succes booking');
    })
    .catch((err) => {
      toast.error(err.response.data.non_field_errors[0] || "Xatolik yuz berdi!");
    })
  }
  const handleBron = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLogin(true);
    }else if (startDate && endDate && token) {
      roomBron();
    }
  }

  return (
    <section>
      <ScrollToTop />
      <div
        className="bg-cover bg-center h-[560px] relative flex justify-center items-center"
        style={{ backgroundImage: `url(${main_image})` }}
      >
        <div className="absolute top-0 w-full h-full bg-black/70"></div>
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          {title}
        </h1>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row h-full py-24">
          <div className="flex-1 h-full lg:w-[60%] px-6">
            <h2 className="h2">{title}</h2>
            <p className="mb-8">{description}</p>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              modules={[Autoplay]}
            >
              {room_images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image.image} alt={title} className="mb-8" />
                </SwiperSlide>
              ))}
            </Swiper>
            <div>
              <h3 className="h3 mb-3">Room Facilities</h3>
              <p className="mb-12">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium rerum voluptatibus error fuga ratione laboriosam
                consequuntur. Atque vel possimus mollitia veniam, ex corporis
                quaerat in.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-12">
                {facilities &&
                  facilities[0]?.obj?.map((facility, index) => (
                    <div key={index} className="flex items-center gap-x-4 mb-2">
                      <div className="text-accent flex items-center gap-x-3 flex-1">
                        <div>
                          <FaCheck />
                        </div>
                        <div>{facility}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex-1 h-full lg:w-[60%] ">
            <div className="py-8 px-6 bg-accent/20 mb-12">
              <div className="flex flex-col space-y-4 mb-4">
                <h3 className="h3">Your Reservation</h3>
                <div className="h-[60px]">
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
                      excludeDates={excludeDates}
                      minDate={new Date()}
                    />
                  </div>
                </div>
                <div className="h-[60px]">
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
                      excludeDates={excludeDates}
                      minDate={startDate || new Date()}
                    />
                  </div>
                </div>
                <div className="h-[60px]">
                  <Menu as="div" className={"w-full h-full bg-white relative"}>
                    <Menu.Button
                      className={
                        "w-full h-full flex items-center justify-between px-8"
                      }
                    >
                      {adults === "0 Adults" ? "No Adults" : adults + " Adults"}
                      <BsChevronDown className="text-base text-accent-hover" />
                    </Menu.Button>
                  </Menu>
                </div>

                {/* <div className="h-[60px]">
                  <Menu as="div" className={"w-full h-full bg-white relative"}>
                    <Menu.Button
                      className={
                        "w-full h-full flex items-center justify-between px-8"
                      }
                    >
                      {kids === "0 Kids" ? "No Kids" : kids + " Kids"}
                      <BsChevronDown className="text-base text-accent-hover" />
                    </Menu.Button>
                  </Menu>
                </div> */}
              </div>
              <button onClick={handleBron} className="btn btn-lg btn-primary  w-full">
                book now for ${price}
              </button>
            </div>
            <div>
              <h3 className="h3 mb-3">Hotel Rules</h3>
              <p className="mb-6">
                {(rules && rules[0]?.description) ||
                  "Hotel rules are listed below:"}
              </p>
              <ul className="flex flex-col gap-y-4">
                {rules &&
                  rules[0]?.obj.map((rule, index) => (
                    <li key={index} className="flex items-center gap-x-4 mb-2">
                      <FaCheck className="text-accent" />
                      {rule}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <ModalComponent isLoginModal={isLogin} onClose={() => setIsLogin(false)} setIsLogin={setIsLogin}/> */}
    </section>
  );
}

export default RoomDetails;
