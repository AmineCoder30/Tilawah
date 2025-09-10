import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const SettingsContext = createContext();

// Default settings configuration
const defaultSettings = {
  display: {
    selectedFont: "font-amiri",
    textSize: 16,
    numeralSystem: "western",
  },
  audio: {
    selectedReciter: "abdul-basit",
    selectedRiwayah: "hafs",
    playbackSpeed: 1,
    autoPlay: true,
  },
  language: {
    translationLanguage: "fr.hamidullah",
    interfaceLanguage: "english",
    rtlLayout: true,
  },
  data: {
    syncEnabled: true,
    offlineContent: {
      totalSize: "2.4 GB",
      downloadedSurahs: 15,
      totalSurahs: 114,
    },
  },
  // Metadata for tracking changes and sync
  _metadata: {
    lastUpdated: null,
    version: "1.0.0",
    hasUnsavedChanges: false,
  },
};

// Validation schemas for each settings category
const settingsValidation = {
  display: {
    selectedFont: (value) =>
      ["font-amiri", "font-scheherazade", "font-kofi"].includes(value),
    textSize: (value) =>
      typeof value === "number" && value >= 12 && value <= 32,
    numeralSystem: (value) => ["western", "arabic-indic"].includes(value),
  },
  audio: {
    selectedReciter: (value) => typeof value === "string" && value.length > 0,
    selectedRiwayah: (value) =>
      ["hafs", "warsh", "qalun", "duri"].includes(value),
    playbackSpeed: (value) => [0.5, 0.75, 1, 1.25, 1.5, 2].includes(value),
    autoPlay: (value) => typeof value === "boolean",
  },
  language: {
    translationLanguage: (value) =>
      [
        "en.ahmedali",
        "fr.hamidullah",
        "id.indonesian",
        "tr.diyanet",
        "ar.alfushah",
        "my.ghazi",
      ].includes(value),
    interfaceLanguage: (value) =>
      [
        "english",
        "urdu",
        "french",
        "indonesian",
        "turkish",
        "arabic",
        "malay",
        "bengali",
      ].includes(value),
    rtlLayout: (value) => typeof value === "boolean",
  },
  data: {
    syncEnabled: (value) => typeof value === "boolean",
  },
};

// Utility function to deep merge objects
const deepMerge = (target, source) => {
  const result = { ...target };
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};

// Validate a settings object against the schema
const validateSettings = (settings) => {
  const errors = [];

  for (const category in settingsValidation) {
    if (settings[category]) {
      for (const setting in settingsValidation[category]) {
        const validator = settingsValidation[category][setting];
        const value = settings[category][setting];

        if (value !== undefined && !validator(value)) {
          errors.push(`Invalid value for ${category}.${setting}: ${value}`);
        }
      }
    }
  }

  return errors;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem("quran-reader-settings");
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);

          // Validate the loaded settings
          const validationErrors = validateSettings(parsed);
          if (validationErrors.length > 0) {
            console.warn("Settings validation errors:", validationErrors);
            // Use default settings if validation fails
            setSettings({
              ...defaultSettings,
              _metadata: {
                ...defaultSettings._metadata,
                lastUpdated: new Date().toISOString(),
              },
            });
          } else {
            // Merge with defaults to ensure all new settings are present
            const mergedSettings = deepMerge(defaultSettings, parsed);
            mergedSettings._metadata = {
              ...mergedSettings._metadata,
              hasUnsavedChanges: false,
            };
            setSettings(mergedSettings);
          }
        }
      } catch (error) {
        console.error("Failed to load settings from localStorage:", error);
        setError("Failed to load settings");
        setSettings(defaultSettings);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings to localStorage
  const saveSettingsToStorage = useCallback((settingsToSave) => {
    try {
      const settingsWithMetadata = {
        ...settingsToSave,
        _metadata: {
          ...settingsToSave._metadata,
          lastUpdated: new Date().toISOString(),
          hasUnsavedChanges: false,
        },
      };

      localStorage.setItem(
        "quran-reader-settings",
        JSON.stringify(settingsWithMetadata)
      );
      return true;
    } catch (error) {
      console.error("Failed to save settings to localStorage:", error);
      setError("Failed to save settings");
      return false;
    }
  }, []);

  // Update a specific setting
  const updateSetting = useCallback((category, key, value) => {
    setSettings((prevSettings) => {
      const newSettings = {
        ...prevSettings,
        [category]: {
          ...prevSettings[category],
          [key]: value,
        },
        _metadata: {
          ...prevSettings._metadata,
          hasUnsavedChanges: true,
        },
      };

      // Validate the new setting
      if (settingsValidation[category] && settingsValidation[category][key]) {
        const validator = settingsValidation[category][key];
        if (!validator(value)) {
          console.warn(`Invalid value for ${category}.${key}:`, value);
          return prevSettings; // Don't update if invalid
        }
      }

      return newSettings;
    });
  }, []);

  // Update multiple settings at once
  const updateSettings = useCallback((newSettings) => {
    setSettings((prevSettings) => {
      const mergedSettings = deepMerge(prevSettings, newSettings);

      // Validate all settings
      const validationErrors = validateSettings(mergedSettings);
      if (validationErrors.length > 0) {
        console.warn("Settings validation errors:", validationErrors);
        return prevSettings; // Don't update if validation fails
      }

      return {
        ...mergedSettings,
        _metadata: {
          ...mergedSettings._metadata,
          hasUnsavedChanges: true,
        },
      };
    });
  }, []);

  // Save current settings
  const saveSettings = useCallback(() => {
    const success = saveSettingsToStorage(settings);
    if (success) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        _metadata: {
          ...prevSettings._metadata,
          hasUnsavedChanges: false,
          lastUpdated: new Date().toISOString(),
        },
      }));
      setError(null);
    }
    return success;
  }, [settings, saveSettingsToStorage]);

  // Reset settings to defaults
  const resetSettings = useCallback(() => {
    const resetSettings = {
      ...defaultSettings,
      _metadata: {
        ...defaultSettings._metadata,
        lastUpdated: new Date().toISOString(),
        hasUnsavedChanges: true,
      },
    };
    setSettings(resetSettings);
  }, []);

  // Export settings as JSON
  const exportSettings = useCallback(() => {
    const exportData = {
      ...settings,
      _metadata: {
        ...settings._metadata,
        exportedAt: new Date().toISOString(),
        appVersion: "1.0.0",
      },
    };

    return JSON.stringify(exportData, null, 2);
  }, [settings]);

  // Import settings from JSON
  const importSettings = useCallback((settingsJson) => {
    try {
      const importedSettings = JSON.parse(settingsJson);

      // Validate imported settings
      const validationErrors = validateSettings(importedSettings);
      if (validationErrors.length > 0) {
        console.error("Imported settings validation failed:", validationErrors);
        return { success: false, error: "Invalid settings format" };
      }

      // Merge with current settings
      const mergedSettings = deepMerge(defaultSettings, importedSettings);
      mergedSettings._metadata = {
        ...mergedSettings._metadata,
        hasUnsavedChanges: true,
        lastUpdated: new Date().toISOString(),
      };

      setSettings(mergedSettings);
      return { success: true };
    } catch (error) {
      console.error("Failed to import settings:", error);
      return { success: false, error: "Failed to parse settings file" };
    }
  }, []);

  // Get settings for a specific category
  const getCategorySettings = useCallback(
    (category) => {
      return settings[category] || {};
    },
    [settings]
  );

  // Check if there are unsaved changes
  const hasUnsavedChanges = settings._metadata?.hasUnsavedChanges || false;

  const value = {
    // Settings data
    settings,
    isLoading,
    error,
    hasUnsavedChanges,

    // Settings by category (for convenience)
    displaySettings: settings.display,
    audioSettings: settings.audio,
    languageSettings: settings.language,
    dataSettings: settings.data,

    // Actions
    updateSetting,
    updateSettings,
    saveSettings,
    resetSettings,
    exportSettings,
    importSettings,
    getCategorySettings,

    // Utility functions
    validateSettings: (settingsToValidate) =>
      validateSettings(settingsToValidate),
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// Convenience hooks for specific settings categories
export const useDisplaySettings = () => {
  const { displaySettings, updateSetting } = useSettings();
  return {
    ...displaySettings,
    updateDisplaySetting: (key, value) => updateSetting("display", key, value),
  };
};

export const useAudioSettings = () => {
  const { audioSettings, updateSetting } = useSettings();
  return {
    ...audioSettings,
    updateAudioSetting: (key, value) => updateSetting("audio", key, value),
  };
};

export const useLanguageSettings = () => {
  const { languageSettings, updateSetting } = useSettings();
  return {
    ...languageSettings,
    updateLanguageSetting: (key, value) =>
      updateSetting("language", key, value),
  };
};

export const useDataSettings = () => {
  const { dataSettings, updateSetting } = useSettings();
  return {
    ...dataSettings,
    updateDataSetting: (key, value) => updateSetting("data", key, value),
  };
};

export default SettingsContext;
