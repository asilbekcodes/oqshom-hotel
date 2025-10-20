import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../api/BaseUrl";
// import resent from "../../assets/icons/Ellipse 286.svg";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Input from "./Input";
import toast from "react-hot-toast";

function ModalComponent({ isLoginModal, onClose, setIsLogin }) {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterModal, setIsRegisterModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [citizenship, setCitizenship] = useState("");

  // useEffect(() => {
  //   if (isCodeModalOpen && timer > 0) {
  //     const interval = setInterval(() => {
  //       setTimer((prev) => prev - 1);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [isCodeModalOpen, timer]);

  // useEffect(() => {
  //   if (verificationCode.every((d) => d !== "") && isCodeModalOpen) {
  //     handleConfirmCode();
  //   }
  // }, [verificationCode]);  

  const handleConfirmPhone = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}users/signup/`, {
        email,
        password,
        confirm_password: confirmPassword,
        first_name: firstName,
        last_name: lastName,
        phone_number,
        citizenship,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.access);
        localStorage.setItem("refreshToken", res.data.refresh);
        setIsRegisterModal(false);
        setIsCodeModalOpen(true);
        toast.success("Succes register");
      })
      .catch((err) => {
        toast.error("Xatolik yuz berdi!");
      });
  };

  const handleCodeChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleConfirmCode = () => {
    const code = verificationCode.join("");
    if (code.length !== 6) return;
    const token = localStorage.getItem("accessToken");
    axios
      .post(`${baseUrl}users/verify/`, { code }, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        localStorage.setItem("userToken", res.data.access);
        localStorage.setItem("refreshToken", res.data.refresh);
        setIsCodeModalOpen(false);
        toast.success("Succesfully logged in!");
      })
      .catch((err) => {
        setVerificationCode(["", "", "", "", "", ""]);
        inputRefs.current[0].focus();
        toast.error("Code xato!");
      });
  };

  // const resentSms = () => {
  //   if (timer > 0) {
  //     toast.warning(`Iltimos, ${timer} soniya kuting`);
  //     return;
  //   }

  //   axios
  //     .post(`${baseUrl}user/resend-sms/`, { phone_number: phoneNumber })
  //     .then(() => {
  //       toast.success("Kod qayta yuborildi!");
  //     })
  //     .catch((err) => {
  //       toast.error(err.response?.data?.message || "Xatolik yuz berdi!");
  //     });
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}users/signin/`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.tokens.access);
        localStorage.setItem("refreshToken", res.data.tokens.refresh);
        setIsLogin(false);    
        toast.success("Succes login");    
      })
      .catch((err) => {
        toast.error("Xatolik yuz berdi!");        
      });
  };

  return (
    <>
      {/* Telefon raqam modal */}
      {isRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-[800px] p-6 relative font-sans">
            <button
              onClick={() => setIsRegisterModal(false)}
              className="absolute top-3 right-4 text-3xl text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-2">Sign in</h2>
            <form onSubmit={handleConfirmPhone}>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  label="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  label="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div>
                  <label className="text-lg font-medium" htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    country={"uz"}
                    placeholder="Enter your phone number"
                    value={phone_number}
                    onChange={(value, country) => {
                      setPhone_number( "+" + value);
                      setCitizenship(country.countryCode.toUpperCase()); // 'uz' -> 'UZ'
                    }}
                    required
                    buttonClass="!bg-white mt-1 !rounded-l-md"
                    dropdownClass="!text-black"
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                      className:
                        "w-full pl-12 pr-4 py-3 outline-none rounded-md border mt-1",
                    }}
                  />
                </div>
                <Input
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                className="btn btn-primary btn-sm w-full cursor-pointer my-5"
                type="submit"
              >
                {isLoading ? "Loading..." : "Sign up"}
              </button>
            </form>

            <p
              onClick={() => {
                setIsLogin(true);
                setIsRegisterModal(false);
              }}
              className="text-lg text-center text-blue-500 cursor-pointer"
            >
              Sign In
            </p>
          </div>
        </div>
      )}

      {/* Kodni kiritish modal */}
      {isCodeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-[450px] p-6 relative font-sans">
            <button
              onClick={() => setIsCodeModalOpen(false)}
              className="absolute top-3 right-4 text-3xl text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-2">Enter the code</h2>
            <p className="text-lg text-[#292929] mb-8">
              A 4-digit code has been sent to your email address{" "}
              <span className="font-semibold">{email}</span> to verify your
              email.
            </p>

            <div className="flex justify-center gap-3 my-16">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleCodeChange(e, index)}
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 border border-black rounded-md text-center text-lg"
                />
              ))}
            </div>

            {/* <p className="text-gray-600 text-center">
              {timer > 0 ? (
                <>
                  Kod ololmadizmi? {timer} soniyadan so‘ng qayta yuborish
                  mumkin.
                </>
              ) : (
                <span
                  onClick={resentSms}
                  className="cursor-pointer flex items-center justify-center gap-2 text-[#292929] font-medium hover:underline"
                >
                  <img src='' alt="resent" className="w-5 h-5" />
                  Kodni qayta yuborish
                </span>
              )}
            </p> */}
            <button onClick={handleConfirmCode} className="btn btn-lg btn-primary w-full">
              confirmation
            </button>
          </div>
        </div>
      )}

      {isLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-[450px] p-6 relative font-sans">
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-3xl text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
            <form onSubmit={handleLogin}>
              <Input
                type="email"
                label="Email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                label="Password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-primary btn-sm w-full transition  my-5"
              >
                Sign In
              </button>
            </form>
            {/* <Login /> */}
            <p className="text-center">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  onClose();
                  setIsRegisterModal(true);
                }}
                className="text-blue-500 cursor-pointer"
              >
                Sign up.
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalComponent;
