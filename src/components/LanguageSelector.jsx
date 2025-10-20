import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RiGlobalLine } from "react-icons/ri";
import { HiChevronDown } from "react-icons/hi";

const languages = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "uz", label: "O‘zbekcha" },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg transition"
      >
        <RiGlobalLine className="w-5 h-5" />
        <span className="uppercase">{currentLang.label}</span>
        <HiChevronDown className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                i18n.language === lang.code ? "bg-gray-50 font-medium text-black" : "text-black"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
