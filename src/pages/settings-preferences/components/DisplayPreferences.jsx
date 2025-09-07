import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import { useTheme } from "../../../contexts/ThemeContext";

const DisplayPreferences = ({ isExpanded, onToggle }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedFont, setSelectedFont] = useState("noto-sans-arabic");
  const [textSize, setTextSize] = useState(16);
  const [numeralSystem, setNumeralSystem] = useState("western");

  const arabicFonts = [
    {
      id: "noto-sans-arabic",
      name: "Noto Sans Arabic",
      sample: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    },
    {
      id: "amiri",
      name: "Amiri",
      sample: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    },
    {
      id: "scheherazade",
      name: "Scheherazade",
      sample: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    },
    {
      id: "uthmanic",
      name: "Uthmanic Hafs",
      sample: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    },
  ];

  const handleFontChange = (fontId) => {
    setSelectedFont(fontId);
  };

  const handleTextSizeChange = (e) => {
    setTextSize(parseInt(e.target.value));
  };

  const handleNumeralSystemChange = (system) => {
    setNumeralSystem(system);
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-hover transition-colors duration-200"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <Icon name="Monitor" size={20} className="text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Display Preferences
            </h3>
            <p className="text-sm text-text-secondary">
              Theme, fonts, and text appearance
            </p>
          </div>
        </div>
        <Icon
          name={isExpanded ? "ChevronUp" : "ChevronDown"}
          size={20}
          className="text-text-secondary"
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 gap-y-6">
          {/* Theme Toggle - Now connected to global theme context */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Theme
            </h4>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
              <div className="flex items-center gap-x-3">
                <Icon
                  name={isDarkMode ? "Moon" : "Sun"}
                  size={18}
                  className="text-text-secondary"
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {isDarkMode
                      ? "Dark theme for low-light reading"
                      : "Light theme for daytime reading"}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  isDarkMode ? "bg-primary" : "bg-border-medium"
                }`}
                aria-label="Toggle theme"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    isDarkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Arabic Font Selection */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Arabic Font
            </h4>
            <div className="gap-y-2">
              {arabicFonts.map((font) => (
                <button
                  key={font.id}
                  onClick={() => handleFontChange(font.id)}
                  className={`w-full p-3 rounded-lg border transition-colors duration-200 text-left ${
                    selectedFont === font.id
                      ? "border-primary bg-primary-50"
                      : "border-border bg-background hover:bg-surface-hover"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">
                      {font.name}
                    </span>
                    {selectedFont === font.id && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                  <p
                    className="text-lg text-text-primary"
                    style={{ fontSize: `${textSize}px`, direction: "rtl" }}
                  >
                    {font.sample}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Text Size */}
          <div className="gap-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-heading font-medium text-text-primary">
                Text Size
              </h4>
              <span className="text-sm text-text-secondary font-data">
                {textSize}px
              </span>
            </div>
            <div className="gap-y-3">
              <input
                type="range"
                min="12"
                max="32"
                value={textSize}
                onChange={handleTextSizeChange}
                className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Small</span>
                <span>Medium</span>
                <span>Large</span>
              </div>
              {/* Preview */}
              <div className="p-3 bg-background rounded-lg border border-border">
                <p
                  className="text-text-primary mb-2"
                  style={{ fontSize: `${textSize}px`, direction: "rtl" }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p
                  className="text-text-secondary"
                  style={{ fontSize: `${Math.max(12, textSize - 2)}px` }}
                >
                  In the name of Allah, the Entirely Merciful, the Especially
                  Merciful.
                </p>
              </div>
            </div>
          </div>

          {/* Numeral System */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Numeral System
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleNumeralSystemChange("western")}
                className={`p-3 rounded-lg border transition-colors duration-200 ${
                  numeralSystem === "western"
                    ? "border-primary bg-primary-50"
                    : "border-border bg-background hover:bg-surface-hover"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary">
                    Western
                  </span>
                  {numeralSystem === "western" && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
                <p className="text-lg text-text-primary font-data">1 2 3 4 5</p>
              </button>

              <button
                onClick={() => handleNumeralSystemChange("arabic-indic")}
                className={`p-3 rounded-lg border transition-colors duration-200 ${
                  numeralSystem === "arabic-indic"
                    ? "border-primary bg-primary-50"
                    : "border-border bg-background hover:bg-surface-hover"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary">
                    Arabic-Indic
                  </span>
                  {numeralSystem === "arabic-indic" && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
                <p className="text-lg text-text-primary font-data">١ ٢ ٣ ٤ ٥</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPreferences;
