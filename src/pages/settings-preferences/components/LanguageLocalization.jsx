import React from "react";
import Icon from "../../../components/AppIcon";
import { useLanguageSettings } from "../../../contexts/SettingsContext";
import {
  SUPPORTED_LANGUAGES,
  getLanguageById,
  getTranslationSample,
} from "../../../contexts/settingsUtils";

const LanguageLocalization = ({ isExpanded, onToggle }) => {
  const {
    translationLanguage,
    interfaceLanguage,
    rtlLayout,
    updateLanguageSetting,
  } = useLanguageSettings();

  const handleTranslationLanguageChange = (languageId) => {
    updateLanguageSetting("translationLanguage", languageId);
  };

  // Use updateLanguageSetting from useLanguageSettings for interface language changes

  const handleRtlToggle = () => {
    updateLanguageSetting("rtlLayout", !rtlLayout);
  };

  const selectedTranslationLang = getLanguageById(translationLanguage);
  const selectedInterfaceLang = getLanguageById(interfaceLanguage);

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-hover transition-colors duration-200"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <Icon name="Languages" size={20} className="text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Language & Localization
            </h3>
            <p className="text-sm text-text-secondary">
              Translation and interface language settings
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
          {/* Translation Language */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Translation Language
            </h4>
            <p className="text-xs text-text-secondary">
              Choose the language for Quran verse translations
            </p>

            <div className="grid grid-cols-1 gap-2">
              {SUPPORTED_LANGUAGES.map((language) => (
                <button
                  key={`translation-${language.id}`}
                  onClick={() => handleTranslationLanguageChange(language.id)}
                  className={`w-full p-3 rounded-lg border transition-colors duration-200 text-left ${
                    translationLanguage === language.id
                      ? "border-primary bg-primary-50"
                      : "border-border bg-background hover:bg-surface-hover"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-3">
                      <span className="text-lg">{language.flag}</span>
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {language.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {language.nativeName}
                        </p>
                      </div>
                    </div>
                    {translationLanguage === language.id && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interface Language */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Interface Language
            </h4>
            <p className="text-xs text-text-secondary">
              Choose the language for app interface and navigation
            </p>

            <div className="grid grid-cols-2 gap-2">
              {SUPPORTED_LANGUAGES.slice(0, 6).map((language) => (
                <button
                  key={`interface-${language.id}`}
                  onClick={() =>
                    updateLanguageSetting("interfaceLanguage", language.id)
                  }
                  className={`p-3 rounded-lg border transition-colors duration-200 text-left ${
                    interfaceLanguage === language.id
                      ? "border-primary bg-primary-50"
                      : "border-border bg-background hover:bg-surface-hover"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                      <span className="text-sm">{language.flag}</span>
                      <div>
                        <p className="text-xs font-medium text-text-primary">
                          {language.name}
                        </p>
                      </div>
                    </div>
                    {interfaceLanguage === language.id && (
                      <Icon name="Check" size={14} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RTL Layout */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Layout Direction
            </h4>
            <div className="gap-y-3">
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div className="flex items-center gap-x-3">
                  <Icon
                    name="AlignRight"
                    size={18}
                    className="text-text-secondary"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Right-to-Left (RTL) Layout
                    </p>
                    <p className="text-xs text-text-secondary">
                      Optimize layout for Arabic text reading direction
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRtlToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    rtlLayout ? "bg-primary" : "bg-border-medium"
                  }`}
                  aria-label="Toggle RTL layout"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      rtlLayout ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Preview
            </h4>
            <div className="p-4 bg-background rounded-lg border border-border">
              <div
                className={`gap-y-3 ${rtlLayout ? "text-right" : "text-left"}`}
              >
                <div className="pb-2 border-b border-border">
                  <p
                    className="text-lg text-text-primary"
                    style={{ direction: "rtl" }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Translation ({selectedTranslationLang?.name}):
                  </p>
                  <p className="text-sm text-text-primary">
                    {getTranslationSample(translationLanguage)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Selection Summary */}
          <div className="p-3 bg-accent-50 rounded-lg border border-accent-200">
            <h5 className="text-sm font-heading font-medium text-text-primary mb-2">
              Current Language Configuration
            </h5>
            <div className="gap-y-1 text-xs text-text-secondary">
              <p>
                <span className="font-medium">Translation:</span>{" "}
                {selectedTranslationLang?.name}
              </p>
              <p>
                <span className="font-medium">Interface:</span>{" "}
                {selectedInterfaceLang?.name}
              </p>
              <p>
                <span className="font-medium">Layout:</span>{" "}
                {rtlLayout ? "Right-to-Left" : "Left-to-Right"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageLocalization;
