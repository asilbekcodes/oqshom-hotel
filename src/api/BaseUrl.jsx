// api.js
import axios from "axios";

// Saqlangan yoki brauzer tili
const lang =
  localStorage.getItem("lang") ||
  navigator.language.split("-")[0] ||
  "en";

// Axios instance yaratamiz
export const api = axios.create({
  baseURL: "https://api.oqshomplaza.uz/",
  headers: {
    "Accept-Language": lang, // Backendga til yuboriladi
  },
});

