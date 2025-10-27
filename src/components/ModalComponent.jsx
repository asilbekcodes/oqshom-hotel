import React, { useState } from "react";
import { api } from "../api/BaseUrl";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Input from "./Input";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import VerificationInput from "react-verification-input";

function ModalComponent({ isLoginModal, onClose, setIsLogin }) {
  const { t } = useTranslation();
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterModal, setIsRegisterModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [userId, setUserId] = useState("");

  const handleConfirmPhone = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api
      .post(`users/signup/`, {
        email,
        password,
        confirm_password: confirmPassword,
        first_name: firstName,
        last_name: lastName,
        phone_number,
        citizenship,
      })
      .then((res) => {
        setUserId(res.data.user_id);
        setIsRegisterModal(false);
        setIsCodeModalOpen(true);
        toast.success(t("success_register"));
      })
      .catch(() => {
        toast.error(t("error_occurred"));
      })
      .finally(() => setIsLoading(false));
  };

  const handleConfirmCode = () => {
    if (verificationCode.length !== 6) {
      toast.error(t("code_incorrect"));
      return;
    }
    api
      .post(`users/verify/`, { user_id: userId, code: verificationCode })
      .then((res) => {
        localStorage.setItem("userToken", res.data.access);
        localStorage.setItem("refreshToken", res.data.refresh);
        setIsCodeModalOpen(false);
        toast.success(t("success_login"));
      })
      .catch(() => {
        setVerificationCode("");
        toast.error(t("code_incorrect"));
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    api
      .post(`users/signin/`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("userToken", res.data.tokens.access);
        localStorage.setItem("refreshToken", res.data.tokens.refresh);
        setIsLogin(false);
        toast.success(t("success_login"));
      })
      .catch(() => {
        toast.error(t("error_occurred"));
      });
  };

  return (
    <>
      {/* Ro‘yxatdan o‘tish modal */}
      {isRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-[800px] p-6 relative font-sans">
            <button
              onClick={() => setIsRegisterModal(false)}
              className="absolute top-3 right-4 text-3xl text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-2">{t("sign_up")}</h2>
            <form onSubmit={handleConfirmPhone}>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  label={t("last_name")}
                  name="lastName"
                  placeholder={t("last_name")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  label={t("first_name")}
                  name="firstName"
                  placeholder={t("first_name")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  label={t("email")}
                  name="email"
                  placeholder={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div>
                  <label className="text-lg font-medium" htmlFor="phone">
                    {t("phone_number")} <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    country={"uz"}
                    placeholder={t("phone_number")}
                    value={phone_number}
                    onChange={(value, country) => {
                      setPhone_number("+" + value);
                      setCitizenship(country.countryCode.toUpperCase());
                    }}
                    required
                    buttonClass="!bg-white mt-1 !rounded-l-md"
                    dropdownClass="!text-black"
                    inputProps={{
                      name: "phone",
                      required: true,
                      className:
                        "w-full pl-12 pr-4 py-3 outline-none rounded-md border mt-1",
                    }}
                  />
                </div>
                <Input
                  type="password"
                  label={t("password")}
                  name="password"
                  placeholder={t("password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  label={t("confirm_password")}
                  name="confirmPassword"
                  placeholder={t("confirm_password")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                className="btn btn-primary btn-sm w-full cursor-pointer my-5"
                type="submit"
              >
                {isLoading ? "Loading..." : t("sign_up")}
              </button>
            </form>

            <p
              onClick={() => {
                setIsLogin(true);
                setIsRegisterModal(false);
              }}
              className="text-lg text-center text-blue-500 cursor-pointer"
            >
              {t("have_account")} {t("login_here")}
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
            <h2 className="text-2xl font-semibold mb-2">{t("enter_code")}</h2>
            <p className="text-lg text-[#292929] mb-8">
              {t("code_sent")} <span className="font-semibold">{email}</span>.
            </p>

            <div className="my-12 flex justify-center">
              <VerificationInput
                value={verificationCode}
                onChange={setVerificationCode}
                length={6}
                validChars="0-9"
                placeholder=""
                classNames={{
                  container: "flex justify-center items-center gap-3",
                  character: "w-12 h-12 border border-black rounded-md text-center",
                  characterInactive: "text-gray-400",
                  characterSelected: "border-blue-500",
                }}
              />
            </div>

            <button
              onClick={handleConfirmCode}
              className="btn btn-lg btn-primary w-full"
            >
              {t("confirmation")}
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-[450px] p-6 relative font-sans">
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-3xl text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-2">{t("sign_in")}</h2>
            <form onSubmit={handleLogin}>
              <Input
                type="email"
                label={t("email")}
                name="email"
                placeholder={t("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                label={t("password")}
                name="password"
                placeholder={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-primary btn-sm w-full transition my-5"
              >
                {t("sign_in")}
              </button>
            </form>
            <p className="text-center">
              {t("dont_have_account")}{" "}
              <span
                onClick={() => {
                  onClose();
                  setIsRegisterModal(true);
                }}
                className="text-blue-500 cursor-pointer"
              >
                {t("register_here")}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalComponent;
