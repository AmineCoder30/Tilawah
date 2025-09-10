import React from "react";
import Icon from "../../../components/AppIcon";
import { useTheme } from "../../../contexts/ThemeContext";
import { useDisplaySettings } from "../../../contexts/SettingsContext";

const ReadingControls = ({ showArabicNumbers, onArabicNumbersToggle }) => {
  const fontSizes = [
    { id: 12, label: "Small", size: "A" },
    { id: 16, label: "Medium", size: "A" },
    { id: 22, label: "Large", size: "A" },
    { id: 32, label: "Extra Large", size: "A" },
  ];
  const { textSize, updateDisplaySetting } = useDisplaySettings();
  const { toggleTheme, isDarkMode } = useTheme();
  return (
    <div className="sticky top-32 lg:top-48 z-40 bg-background border-b border-border shadow-gentle">
      <div className="px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Font Size Controls */}
          <div className="flex items-center gap-x-2">
            <Icon name="Type" size={16} className="text-text-secondary" />
            <div className="flex items-center gap-x-1 bg-surface rounded-lg p-1">
              {fontSizes.map((size, index) => (
                <button
                  key={size.id}
                  onClick={() => updateDisplaySetting("textSize", size.id)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors duration-200 ${
                    textSize === size.id
                      ? "bg-primary text-primary-foreground"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                  }`}
                  style={{
                    fontSize:
                      index === 0
                        ? "10px"
                        : index === 1
                        ? "12px"
                        : index === 2
                        ? "14px"
                        : "16px",
                  }}
                  aria-label={`Set font size to ${size.label}`}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Controls */}
          <div className="flex items-center gap-x-2">
            {/* Arabic Numbers Toggle */}
            {/* <button
              onClick={onArabicNumbersToggle}
              className={`flex items-center gap-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                showArabicNumbers
                  ? "bg-primary-50 text-primary border border-primary-200"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
              }`}
              aria-label={
                showArabicNumbers ? "Use Western numbers" : "Use Arabic numbers"
              }
            >
              <span className="text-sm font-medium">
                {showArabicNumbers ? "١٢٣" : "123"}
              </span>
            </button> */}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode
                  ? "bg-primary-50 text-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
              }`}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <Icon name={isDarkMode ? "Sun" : "Moon"} size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingControls;
