import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageLocalization = ({ isExpanded, onToggle }) => {
  const [translationLanguage, setTranslationLanguage] = useState('english');
  const [interfaceLanguage, setInterfaceLanguage] = useState('english');
  const [rtlLayout, setRtlLayout] = useState(true);

  const supportedLanguages = [
    { id: 'english', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { id: 'urdu', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
    { id: 'french', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { id: 'indonesian', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
    { id: 'turkish', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
    { id: 'arabic', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { id: 'malay', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
    { id: 'bengali', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' }
  ];

  const handleTranslationLanguageChange = (languageId) => {
    setTranslationLanguage(languageId);
  };

  const handleInterfaceLanguageChange = (languageId) => {
    setInterfaceLanguage(languageId);
  };

  const handleRtlToggle = () => {
    setRtlLayout(!rtlLayout);
  };

  const selectedTranslationLang = supportedLanguages.find(l => l.id === translationLanguage);
  const selectedInterfaceLang = supportedLanguages.find(l => l.id === interfaceLanguage);

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-hover transition-colors duration-200"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center space-x-3">
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
        <div className="px-4 pb-4 space-y-6">
          {/* Translation Language */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Translation Language
            </h4>
            <p className="text-xs text-text-secondary">
              Choose the language for Quran verse translations
            </p>
            
            <div className="grid grid-cols-1 gap-2">
              {supportedLanguages.map((language) => (
                <button
                  key={`translation-${language.id}`}
                  onClick={() => handleTranslationLanguageChange(language.id)}
                  className={`w-full p-3 rounded-lg border transition-colors duration-200 text-left ${
                    translationLanguage === language.id
                      ? 'border-primary bg-primary-50' :'border-border bg-background hover:bg-surface-hover'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
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
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Interface Language
            </h4>
            <p className="text-xs text-text-secondary">
              Choose the language for app interface and navigation
            </p>
            
            <div className="grid grid-cols-2 gap-2">
              {supportedLanguages.slice(0, 6).map((language) => (
                <button
                  key={`interface-${language.id}`}
                  onClick={() => handleInterfaceLanguageChange(language.id)}
                  className={`p-3 rounded-lg border transition-colors duration-200 text-left ${
                    interfaceLanguage === language.id
                      ? 'border-primary bg-primary-50' :'border-border bg-background hover:bg-surface-hover'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
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
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Layout Direction
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Icon name="AlignRight" size={18} className="text-text-secondary" />
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
                    rtlLayout ? 'bg-primary' : 'bg-border-medium'
                  }`}
                  aria-label="Toggle RTL layout"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      rtlLayout ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Preview
            </h4>
            <div className="p-4 bg-background rounded-lg border border-border">
              <div className={`space-y-3 ${rtlLayout ? 'text-right' : 'text-left'}`}>
                <div className="pb-2 border-b border-border">
                  <p className="text-lg text-text-primary" style={{ direction: 'rtl' }}>
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Translation ({selectedTranslationLang?.name}):
                  </p>
                  <p className="text-sm text-text-primary">
                    {translationLanguage === 'urdu' ?'اللہ کے نام سے جو بہت مہربان، نہایت رحم والا ہے'
                      : translationLanguage === 'french' ?'Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux'
                      : translationLanguage === 'indonesian' ?'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang'
                      : translationLanguage === 'turkish' ?'Rahman ve Rahim olan Allah\'ın adıyla' :'In the name of Allah, the Entirely Merciful, the Especially Merciful'
                    }
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
            <div className="space-y-1 text-xs text-text-secondary">
              <p><span className="font-medium">Translation:</span> {selectedTranslationLang?.name}</p>
              <p><span className="font-medium">Interface:</span> {selectedInterfaceLang?.name}</p>
              <p><span className="font-medium">Layout:</span> {rtlLayout ? 'Right-to-Left' : 'Left-to-Right'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageLocalization;