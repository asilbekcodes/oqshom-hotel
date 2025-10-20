import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = () => {
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Iltimos, captcha-ni to‘ldiring!");
      return;
    }
    console.log("Captcha token:", captchaValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-10">

      <ReCAPTCHA
        sitekey="YOUR_SITE_KEY"
        onChange={(value) => setCaptchaValue(value)}
      />
    </form>
  );
};

export default ReCaptcha;
