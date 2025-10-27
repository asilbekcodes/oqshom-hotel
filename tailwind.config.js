/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: "Gilda Display",
      secondary: "Barlow",
      tertiary: "Barlow Condensed",
      poppins: ["Poppins", "sans-serif"],
      lato: ["Lato", "sans-serif"],
      playfair: ["Playfair Display", "serif"],
      dmserif: ["DM Serif Display", "serif"],
    },
    container: {
      padding: {
        DEFAULT: "15px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1140px",
    },
    extend: {
      colors: {
        /* --- BRANd RANGLAR --- */
        primary: "#0a0a0a",      
        secondary: "#ACCCCB",  // och yashil/moviy pastel (soft elementlar)
        tertiary: "#5A9A97",   // yashil/moviy (body, text asosiy) 
        accent: {
          DEFAULT: "#452B87",    // to'q binafsha (cta)
          hover: "#3a226d",      // accent hover (bir oz qoraytirilgan)
        },

        /* agar kerak bo'lsa, eski ranglarni ham qoldirish mumkin:
        oldPrimary: "#0a0a0a",
        */
      },
      backgroundImage: {
        room: "url('./assets/img/room.jpg')",
      },
    },
  },
  plugins: [],
};
