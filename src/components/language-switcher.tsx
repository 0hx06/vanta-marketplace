"use client";

import { useEffect, useState } from "react";

const languages = [
  { code: "FR", label: "Français", locale: "fr" },
  { code: "EN", label: "English", locale: "en" },
  { code: "AR", label: "العربية", locale: "ar" },
];

export function LanguageSwitcher() {
  const [locale, setLocale] = useState("fr");

  useEffect(() => {
    const saved = window.localStorage.getItem("vanta-locale") || "fr";
    setLocale(saved);
    document.documentElement.lang = saved;
    document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
  }, []);

  function changeLocale(nextLocale: string) {
    setLocale(nextLocale);
    window.localStorage.setItem("vanta-locale", nextLocale);
    document.documentElement.lang = nextLocale;
    document.documentElement.dir = nextLocale === "ar" ? "rtl" : "ltr";
  }

  return (
    <div className="flex items-center rounded-lg border border-white/10 bg-[#0d151e] p-1">
      {languages.map((language) => (
        <button
          key={language.locale}
          type="button"
          title={language.label}
          aria-label={`Choisir ${language.label}`}
          onClick={() => changeLocale(language.locale)}
          className={`px-2 py-1 text-[10px] font-bold tracking-wider transition ${locale === language.locale ? "bg-[#ff4655] text-white" : "text-zinc-500 hover:text-white"}`}
        >
          {language.code}
        </button>
      ))}
    </div>
  );
}
