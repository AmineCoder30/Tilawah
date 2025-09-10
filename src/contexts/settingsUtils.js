// Settings constants and data

export const FONT_OPTIONS = [
  {
    id: "font-amiri",
    name: "Amiri",
    sample: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  },
  {
    id: "font-scheherazade",
    name: "Scheherazade",
    sample: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  },
  {
    id: "font-kofi",
    name: "Kofi",
    sample: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  },
];

export const RECITERS = [
  { id: "abdul-basit", name: "Abdul Basit Abdul Samad", country: "Egypt" },
  { id: "mishary", name: "Mishary Rashid Alafasy", country: "Kuwait" },
  { id: "sudais", name: "Abdul Rahman Al-Sudais", country: "Saudi Arabia" },
  { id: "husary", name: "Mahmoud Khalil Al-Husary", country: "Egypt" },
  { id: "minshawi", name: "Mohamed Siddiq El-Minshawi", country: "Egypt" },
  { id: "ajmi", name: "Ahmed ibn Ali al-Ajmi", country: "Saudi Arabia" },
];

export const RIWAYAH_METHODS = [
  {
    id: "hafs",
    name: "Hafs an Asim",
    description: "Most common recitation method",
    regions: "Middle East, South Asia, Africa",
  },
  {
    id: "warsh",
    name: "Warsh an Nafi",
    description: "Common in North and West Africa",
    regions: "Morocco, Algeria, Tunisia, West Africa",
  },
  {
    id: "qalun",
    name: "Qalun an Nafi",
    description: "Alternative method from Nafi",
    regions: "Libya, parts of North Africa",
  },
];

export const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export const SUPPORTED_LANGUAGES = [
  { id: "en.ahmedali", name: "English", nativeName: "English", flag: "EN" },
  // { id: "urdu", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
  { id: "fr.hamidullah", name: "French", nativeName: "Français", flag: "FR" },
  {
    id: "id.indonesian",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    flag: "ID",
  },
  { id: "tr.diyanet", name: "Turkish", nativeName: "Türkçe", flag: "TR" },

  { id: "my.ghazi", name: "Malay", nativeName: "Bahasa Melayu", flag: "MY" },
];

export const NUMERAL_SYSTEMS = [
  { id: "western", name: "Western", sample: "1 2 3 4 5" },
  { id: "arabic-indic", name: "Arabic-Indic", sample: "١ ٢ ٣ ٤ ٥" },
];

// Helper functions
export const getReciterById = (id) => {
  return RECITERS.find((reciter) => reciter.id === id);
};

export const getRiwayahById = (id) => {
  return RIWAYAH_METHODS.find((riwayah) => riwayah.id === id);
};

export const getLanguageById = (id) => {
  return SUPPORTED_LANGUAGES.find((lang) => lang.id === id);
};

export const getFontById = (id) => {
  return FONT_OPTIONS.find((font) => font.id === id);
};

// Translation samples for different languages
export const getTranslationSample = (languageId) => {
  const translations = {
    english:
      "In the name of Allah, the Entirely Merciful, the Especially Merciful",
    urdu: "اللہ کے نام سے جو بہت مہربان، نہایت رحم والا ہے",
    french: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux",
    indonesian: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang",
    turkish: "Rahman ve Rahim olan Allah'ın adıyla",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    malay: "Dengan nama Allah Yang Maha Pemurah lagi Maha Penyayang",
    bengali: "পরম করুণাময় ও দয়ালু আল্লাহর নামে",
  };

  return translations[languageId] || translations.english;
};

// Export settings to file
export const downloadSettingsFile = (
  settingsJson,
  filename = "quran-reader-settings.json"
) => {
  try {
    const blob = new Blob([settingsJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return { success: true };
  } catch (error) {
    console.error("Failed to download settings file:", error);
    return { success: false, error: "Failed to create download file" };
  }
};

// Import settings from file
export const readSettingsFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const settingsJson = event.target.result;
        resolve(settingsJson);
      } catch (error) {
        reject(new Error("Failed to read file content"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
};

// Format file size for display
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Storage usage calculations
export const calculateStorageUsage = (settings) => {
  const { offlineContent } = settings.data;

  // Mock calculations - in real app, this would be based on actual storage
  const baseStorage = {
    audioFiles: offlineContent.downloadedSurahs * 15 * 1024 * 1024, // ~15MB per surah
    translations: 245 * 1024 * 1024, // 245MB
    appCache: 89 * 1024 * 1024, // 89MB
    userData: 12 * 1024 * 1024, // 12MB
    settings: 2.1 * 1024 * 1024, // 2.1MB
  };

  const total = Object.values(baseStorage).reduce((sum, size) => sum + size, 0);

  return {
    breakdown: Object.entries(baseStorage).map(([type, size]) => ({
      type,
      size,
      formattedSize: formatFileSize(size),
      percentage: ((size / total) * 100).toFixed(1),
    })),
    total,
    formattedTotal: formatFileSize(total),
  };
};

// Validate settings structure
export const isValidSettingsStructure = (settings) => {
  const requiredKeys = ["display", "audio", "language", "data"];

  if (!settings || typeof settings !== "object") {
    return false;
  }

  for (const key of requiredKeys) {
    if (!settings[key] || typeof settings[key] !== "object") {
      return false;
    }
  }

  return true;
};

// Settings migration helper (for future versions)
export const migrateSettings = (settings, fromVersion, toVersion) => {
  // This function would handle settings migration between app versions
  // For now, it just returns the settings as-is

  console.log(`Migrating settings from version ${fromVersion} to ${toVersion}`);

  // Future migration logic would go here
  return settings;
};

// Debug helper for settings
export const debugSettings = (settings) => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  console.group("Settings Debug Info");
  console.log("Current settings:", settings);
  console.log("Settings size:", JSON.stringify(settings).length, "characters");
  console.log("Last updated:", settings._metadata?.lastUpdated);
  console.log("Has unsaved changes:", settings._metadata?.hasUnsavedChanges);
  console.groupEnd();
};
