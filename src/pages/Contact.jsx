import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import img from "../assets/img/heroSlider/contact.jpg";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-number-input/input";
import Animation from "../components/Animation";
import MapView from "../components/map";
import { api } from "../api/BaseUrl";

function Contact() {
  const [reasons, setReasons] = useState([]);
  const [reason, setReason] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  // const [captchaValue, setCaptchaValue] = useState(null);

  const getSelect = () => {
      api.get(`hotel/reason/`)
      .then((res) => setReasons(res.data))
      .catch((err) => console.log(err));
  };

  const resetForm = () => {
    setReason("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setDate("");
    // setCaptchaValue(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      api.post(`hotel/contact/`, {
        reason,
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
        email,
        stay_date: date,
        message,
      })
      .then(() => {
        alert("Xabaringiz yuborildi!");
        resetForm();
      })
      .catch((err) => {
        console.log(err);
        alert("Xatolik yuz berdi.");
      });
  };

  useEffect(() => {
    getSelect();
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <img
        src={img}
        alt="contact"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 w-full h-full bg-black/60 z-10" />
      <div className="relative z-20 flex items-center justify-center px-4">
        <div className="w-full container mt-20">
          <Animation dataAos="zoom-in">
            <form onSubmit={handleSubmit}>
              <h2 className="h2 text-white">Contact</h2>

              <div className="mb-4">
                <label className="text-lg font-medium text-white">
                  Contact reason: <span className="text-red-500">*</span>
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-3 bg-transparent outline-none rounded-md text-white backdrop-blur-md border border-white"
                  required
                >
                  <option disabled value="" className="text-white bg-black/50">
                    Select reason
                  </option>
                  {reasons.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      className="text-white bg-black/50"
                    >
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-white">
                <Input
                  label="First Name"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="backdrop-blur-md bg-white/0 text-white border border-white placeholder:text-white"
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="backdrop-blur-md bg-white/0 text-white border border-white placeholder:text-white"
                />
                <Input
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="backdrop-blur-md bg-white/0 text-white border border-white placeholder:text-white"
                />
                <div className="flex flex-col gap-y-1">
                  <label className="text-lg font-medium text-white">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    className="px-4 py-3 outline-none rounded-md backdrop-blur-md bg-white/0 text-white border border-white placeholder:text-white"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 mt-4 text-white">
                <Input
                  type="date"
                  label="Stay date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="backdrop-blur-md bg-white/0 text-white border border-white placeholder:text-white"
                />
                <label className="text-lg font-medium text-white">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full p-3 bg-transparent outline-none rounded-md text-white backdrop-blur-md border border-white placeholder:text-white"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-y-4 my-5">
                {/* <ReCAPTCHA
                  sitekey="YOUR_SITE_KEY"
                  // onChange={(value) => setCaptchaValue(value)}
                /> */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg md:max-w-max py-5 w-full"
                >
                  Contact Us
                </button>
              </div>
            </form>
          </Animation>
        </div>
      </div>

      <div className="z-20 relative mt-10">
        <MapView />
      </div>
    </div>
  );
}

export default Contact;
