import React, { useState } from "react";

const languages = [
  { label: "EN", short: "EN"},
];

const LanguageSwitcher = ({ onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleChange = (e) => {
    const lang = languages.find((l) => l.short === e.target.value);
    setSelectedLanguage(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  return (
    <select
      value={selectedLanguage.short}
      onChange={handleChange}
      className="cursor-pointer text-xl p-2 active:border-[none] focus-within:border-[none] focus-within:outline-none focus-within:ring-0 focus-within:shadow-none"
    >
      {languages.map((lang) => (
        <option key={lang.short} value={lang.short} className="cursor-pointer">
          {lang.logo} {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;