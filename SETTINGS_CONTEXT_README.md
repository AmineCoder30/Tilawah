# Settings Context System

This document explains how to use the comprehensive settings context system in your Quran Reader application.

## Overview

The Settings Context provides a centralized way to manage all application settings including:
- **Display Settings**: Font, text size, numeral system
- **Audio Settings**: Reciter, riwayah method, playback speed, auto-play
- **Language Settings**: Translation language, interface language, RTL layout
- **Data Settings**: Sync preferences, offline content management

## Features

- ✅ **Automatic localStorage persistence**
- ✅ **Settings validation**
- ✅ **Unsaved changes tracking**
- ✅ **Export/Import functionality**
- ✅ **Settings reset to defaults**
- ✅ **Category-specific hooks for better performance**
- ✅ **Deep merge for partial updates**
- ✅ **Error handling and fallback to defaults**

## Setup

### 1. Wrap your app with SettingsProvider

First, you need to wrap your application with the `SettingsProvider` to make settings available throughout your app.

```jsx
// In your main App.jsx or index.jsx
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      {/* Your app components */}
    </SettingsProvider>
  );
}
```

### 2. Import and use the hooks

```jsx
import { 
  useSettings,
  useDisplaySettings,
  useAudioSettings,
  useLanguageSettings,
  useDataSettings
} from './contexts/SettingsContext';
```

## Usage Patterns

### Pattern 1: Category-Specific Hooks (Recommended)

Use these hooks when you only need settings from a specific category:

```jsx
import { useDisplaySettings } from './contexts/SettingsContext';

const MyComponent = () => {
  const { 
    selectedFont, 
    textSize, 
    numeralSystem,
    updateDisplaySetting 
  } = useDisplaySettings();

  const handleFontChange = (newFont) => {
    updateDisplaySetting('selectedFont', newFont);
  };

  return (
    <div style={{ fontSize: `${textSize}px` }}>
      <select onChange={(e) => handleFontChange(e.target.value)}>
        {/* Font options */}
      </select>
    </div>
  );
};
```

### Pattern 2: Main Settings Hook

Use this when you need access to multiple categories or advanced functionality:

```jsx
import { useSettings } from './contexts/SettingsContext';

const MyComponent = () => {
  const { 
    settings, 
    hasUnsavedChanges,
    updateSetting,
    saveSettings,
    resetSettings
  } = useSettings();

  const handleMultipleUpdates = () => {
    updateSetting('display', 'textSize', 18);
    updateSetting('audio', 'autoPlay', false);
  };

  return (
    <div>
      <button onClick={handleMultipleUpdates}>
        Update Multiple Settings
      </button>
      
      {hasUnsavedChanges && (
        <button onClick={saveSettings}>
          Save Changes
        </button>
      )}
    </div>
  );
};
```

### Pattern 3: Using Utility Functions

Get additional information about settings using utility functions:

```jsx
import { useAudioSettings } from './contexts/SettingsContext';
import { getReciterById, getRiwayahById } from './contexts/settingsUtils';

const AudioDisplay = () => {
  const { selectedReciter, selectedRiwayah } = useAudioSettings();
  
  const reciterData = getReciterById(selectedReciter);
  const riwayahData = getRiwayahById(selectedRiwayah);

  return (
    <div>
      <p>Reciter: {reciterData?.name} ({reciterData?.country})</p>
      <p>Method: {riwayahData?.name}</p>
      <p>Description: {riwayahData?.description}</p>
    </div>
  );
};
```

## Available Hooks

### useSettings()

The main hook providing access to all settings and functions:

```jsx
const {
  // State
  settings,           // All settings object
  isLoading,          // Loading state
  error,              // Error state
  hasUnsavedChanges,  // Whether there are unsaved changes
  
  // Category shortcuts
  displaySettings,    // settings.display
  audioSettings,      // settings.audio  
  languageSettings,   // settings.language
  dataSettings,       // settings.data
  
  // Functions
  updateSetting,      // (category, key, value) => void
  updateSettings,     // (partialSettings) => void
  saveSettings,       // () => boolean
  resetSettings,      // () => void
  exportSettings,     // () => string (JSON)
  importSettings,     // (jsonString) => { success, error? }
  getCategorySettings, // (category) => object
  validateSettings    // (settings) => string[] (errors)
} = useSettings();
```

### useDisplaySettings()

Hook for display-related settings:

```jsx
const {
  selectedFont,        // Current font ID
  textSize,            // Text size in pixels
  numeralSystem,       // 'western' or 'arabic-indic'
  updateDisplaySetting // (key, value) => void
} = useDisplaySettings();
```

### useAudioSettings()

Hook for audio-related settings:

```jsx
const {
  selectedReciter,     // Current reciter ID
  selectedRiwayah,     // Current riwayah ID
  playbackSpeed,       // Playback speed (0.5 to 2)
  autoPlay,            // Auto-play enabled
  updateAudioSetting   // (key, value) => void
} = useAudioSettings();
```

### useLanguageSettings()

Hook for language-related settings:

```jsx
const {
  translationLanguage, // Translation language ID
  interfaceLanguage,   // Interface language ID
  rtlLayout,           // RTL layout enabled
  updateLanguageSetting // (key, value) => void
} = useLanguageSettings();
```

### useDataSettings()

Hook for data management settings:

```jsx
const {
  syncEnabled,         // Sync enabled
  offlineContent,      // Offline content info
  updateDataSetting    // (key, value) => void
} = useDataSettings();
```

## Utility Functions

Import from `./contexts/settingsUtils.js`:

```jsx
import {
  // Data constants
  FONT_OPTIONS,
  RECITERS,
  RIWAYAH_METHODS,
  PLAYBACK_SPEEDS,
  SUPPORTED_LANGUAGES,
  NUMERAL_SYSTEMS,
  
  // Helper functions
  getReciterById,
  getRiwayahById,
  getLanguageById,
  getFontById,
  getTranslationSample,
  
  // File operations
  downloadSettingsFile,
  readSettingsFile,
  
  // Utilities
  formatFileSize,
  calculateStorageUsage,
  isValidSettingsStructure,
  debugSettings
} from './contexts/settingsUtils';
```

## Settings Structure

The settings object has the following structure:

```json
{
  "display": {
    "selectedFont": "noto-sans-arabic",
    "textSize": 16,
    "numeralSystem": "western"
  },
  "audio": {
    "selectedReciter": "abdul-basit",
    "selectedRiwayah": "hafs",
    "playbackSpeed": 1,
    "autoPlay": true
  },
  "language": {
    "translationLanguage": "english",
    "interfaceLanguage": "english",
    "rtlLayout": true
  },
  "data": {
    "syncEnabled": true,
    "offlineContent": {
      "totalSize": "2.4 GB",
      "downloadedSurahs": 15,
      "totalSurahs": 114
    }
  },
  "_metadata": {
    "lastUpdated": "2025-01-07T14:10:20.000Z",
    "version": "1.0.0",
    "hasUnsavedChanges": false
  }
}
```

## Common Use Cases

### 1. Reading Settings in Any Component

```jsx
const MyComponent = () => {
  const { textSize } = useDisplaySettings();
  const { autoPlay } = useAudioSettings();
  const { rtlLayout } = useLanguageSettings();

  return (
    <div 
      style={{ 
        fontSize: `${textSize}px`,
        direction: rtlLayout ? 'rtl' : 'ltr'
      }}
    >
      {autoPlay ? 'Auto-play enabled' : 'Auto-play disabled'}
    </div>
  );
};
```

### 2. Updating Settings

```jsx
const SettingsControl = () => {
  const { updateDisplaySetting } = useDisplaySettings();
  const { updateAudioSetting } = useAudioSettings();

  return (
    <div>
      <button onClick={() => updateDisplaySetting('textSize', 20)}>
        Increase Text Size
      </button>
      <button onClick={() => updateAudioSetting('autoPlay', false)}>
        Disable Auto-play
      </button>
    </div>
  );
};
```

### 3. Bulk Settings Update

```jsx
const BulkUpdate = () => {
  const { updateSettings } = useSettings();

  const handlePreset = () => {
    updateSettings({
      display: {
        textSize: 18,
        selectedFont: 'amiri'
      },
      audio: {
        playbackSpeed: 1.25,
        autoPlay: false
      }
    });
  };

  return <button onClick={handlePreset}>Apply Preset</button>;
};
```

### 4. Settings Export/Import

```jsx
const SettingsBackup = () => {
  const { exportSettings, importSettings } = useSettings();
  const [importFile, setImportFile] = useState(null);

  const handleExport = () => {
    const settingsData = exportSettings();
    downloadSettingsFile(settingsData);
  };

  const handleImport = async () => {
    if (importFile) {
      const settingsJson = await readSettingsFile(importFile);
      const result = importSettings(settingsJson);
      
      if (result.success) {
        alert('Settings imported successfully!');
      } else {
        alert('Failed to import settings: ' + result.error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleExport}>Export Settings</button>
      <input 
        type="file" 
        accept=".json"
        onChange={(e) => setImportFile(e.target.files[0])}
      />
      <button onClick={handleImport}>Import Settings</button>
    </div>
  );
};
```

### 5. Unsaved Changes Detection

```jsx
const SettingsPage = () => {
  const { hasUnsavedChanges, saveSettings } = useSettings();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <div>
      {hasUnsavedChanges && (
        <div className="unsaved-changes-warning">
          <p>You have unsaved changes</p>
          <button onClick={saveSettings}>Save Now</button>
        </div>
      )}
      {/* Settings UI */}
    </div>
  );
};
```

## Best Practices

1. **Use category-specific hooks** when you only need settings from one category
2. **Use the main useSettings hook** when you need advanced functionality or multiple categories
3. **Always handle the loading state** when the component first mounts
4. **Validate settings** before importing or applying bulk updates
5. **Handle errors gracefully** - the context provides fallback to defaults
6. **Use utility functions** to get additional information about settings values
7. **Debounce frequent updates** to avoid excessive localStorage writes

## Error Handling

The settings context includes comprehensive error handling:

- Invalid settings are validated and rejected
- Failed localStorage operations fall back to defaults
- Import errors are caught and reported
- Loading states are provided for async operations

```jsx
const MyComponent = () => {
  const { settings, isLoading, error } = useSettings();

  if (isLoading) return <div>Loading settings...</div>;
  if (error) return <div>Error loading settings: {error}</div>;

  return <div>Settings loaded successfully!</div>;
};
```

## Testing

You can test your settings integration by:

1. Opening browser DevTools → Application → Local Storage
2. Looking for the `quran-reader-settings` key
3. Modifying settings and watching the value change
4. Testing with invalid data to see validation in action

## Migration

When you need to migrate settings for new app versions, you can extend the `migrateSettings` function in `settingsUtils.js` to handle version-specific changes.

This settings system provides a robust, scalable foundation for managing all your application settings with proper persistence, validation, and error handling.
