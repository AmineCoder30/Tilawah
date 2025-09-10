import React from "react";
import Icon from "../../../components/AppIcon";
import { useTheme } from "../../../contexts/ThemeContext";
import { useDisplaySettings } from "../../../contexts/SettingsContext";
import { FONT_OPTIONS, NUMERAL_SYSTEMS } from "../../../contexts/settingsUtils";

const DisplayPreferences = ({ isExpanded, onToggle }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { selectedFont, textSize, numeralSystem, updateDisplaySetting } =
    useDisplaySettings();

  const handleFontChange = (fontId) => {
    updateDisplaySetting("selectedFont", fontId);
  };

  const handleTextSizeChange = (e) => {
    updateDisplaySetting("textSize", parseInt(e.target.value));
  };

  const handleNumeralSystemChange = (system) => {
    updateDisplaySetting("numeralSystem", system);
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
          <div className="mt-3">
            <h4 className="text-sm mb-2 font-heading font-medium text-text-primary">
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
          <div className="mt-3">
            <h4 className="text-sm mb-2 font-heading font-medium text-text-primary">
              Arabic Font
            </h4>
            <div className="flex flex-col gap-y-2">
              {FONT_OPTIONS.map((font) => (
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
                    className={"text-lg text-text-primary " + font.id}
                    style={{ fontSize: `${textSize}px`, direction: "rtl" }}
                  >
                    {font.sample}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Text Size */}
          <div className="mt-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm mb-2 font-heading font-medium text-text-primary">
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
          <div className="mt-3">
            <h4 className="text-sm mb-2 font-heading font-medium text-text-primary">
              Numeral System
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {NUMERAL_SYSTEMS.map((system) => (
                <button
                  key={system.id}
                  onClick={() => handleNumeralSystemChange(system.id)}
                  className={`p-3 rounded-lg border transition-colors duration-200 ${
                    numeralSystem === system.id
                      ? "border-primary bg-primary-50"
                      : "border-border bg-background hover:bg-surface-hover"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">
                      {system.name}
                    </span>
                    {numeralSystem === system.id && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                  <p className="text-lg text-text-primary font-data">
                    {system.sample}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPreferences;
