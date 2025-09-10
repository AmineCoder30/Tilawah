import React from 'react';
import { 
  useSettings, 
  useDisplaySettings, 
  useAudioSettings, 
  useLanguageSettings, 
  useDataSettings 
} from '../../contexts/SettingsContext';
import { 
  getFontById, 
  getReciterById, 
  getLanguageById 
} from '../../contexts/settingsUtils';

/**
 * Example component demonstrating how to use the SettingsContext
 * from anywhere in your application
 */
const SettingsUsageExample = () => {
  // Method 1: Using the main settings hook for full access
  const { 
    settings,
    hasUnsavedChanges,
    saveSettings,
    resetSettings,
    exportSettings,
    importSettings
  } = useSettings();

  // Method 2: Using specific category hooks (recommended for most cases)
  const { selectedFont, textSize, updateDisplaySetting } = useDisplaySettings();
  const { selectedReciter, autoPlay, updateAudioSetting } = useAudioSettings();
  const { translationLanguage, rtlLayout } = useLanguageSettings();
  const { syncEnabled } = useDataSettings();

  // Example functions showing different ways to update settings
  const handleFontChange = () => {
    updateDisplaySetting('selectedFont', 'amiri');
  };

  const handleReciterChange = () => {
    updateAudioSetting('selectedReciter', 'mishary');
  };

  const handleExportSettings = () => {
    const settingsData = exportSettings();
    console.log('Exported settings:', settingsData);
  };

  // Get detailed information using utility functions
  const currentFont = getFontById(selectedFont);
  const currentReciter = getReciterById(selectedReciter);
  const currentLanguage = getLanguageById(translationLanguage);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-surface rounded-lg border border-border">
      <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
        Settings Usage Examples
      </h2>

      {/* Display current settings */}
      <div className="space-y-4 mb-6">
        <div className="p-4 bg-background rounded-lg border border-border">
          <h3 className="font-medium text-text-primary mb-2">Current Display Settings:</h3>
          <p className="text-sm text-text-secondary">
            Font: {currentFont?.name} | Text Size: {textSize}px
          </p>
        </div>

        <div className="p-4 bg-background rounded-lg border border-border">
          <h3 className="font-medium text-text-primary mb-2">Current Audio Settings:</h3>
          <p className="text-sm text-text-secondary">
            Reciter: {currentReciter?.name} | Auto-play: {autoPlay ? 'On' : 'Off'}
          </p>
        </div>

        <div className="p-4 bg-background rounded-lg border border-border">
          <h3 className="font-medium text-text-primary mb-2">Current Language Settings:</h3>
          <p className="text-sm text-text-secondary">
            Translation: {currentLanguage?.name} | RTL Layout: {rtlLayout ? 'On' : 'Off'}
          </p>
        </div>

        <div className="p-4 bg-background rounded-lg border border-border">
          <h3 className="font-medium text-text-primary mb-2">Data Settings:</h3>
          <p className="text-sm text-text-secondary">
            Sync Enabled: {syncEnabled ? 'Yes' : 'No'}
          </p>
        </div>
      </div>

      {/* Unsaved changes indicator */}
      {hasUnsavedChanges && (
        <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg mb-4">
          <p className="text-sm text-warning-700">
            ⚠️ You have unsaved changes
          </p>
        </div>
      )}

      {/* Example action buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleFontChange}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          Change Font to Amiri
        </button>

        <button
          onClick={handleReciterChange}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          Change Reciter to Mishary
        </button>

        <button
          onClick={saveSettings}
          className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success-hover transition-colors"
          disabled={!hasUnsavedChanges}
        >
          Save Settings
        </button>

        <button
          onClick={handleExportSettings}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-hover transition-colors"
        >
          Export Settings
        </button>

        <button
          onClick={resetSettings}
          className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error-hover transition-colors"
        >
          Reset to Defaults
        </button>
      </div>

      {/* Code examples */}
      <div className="mt-8">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Usage Examples:
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-background rounded-lg border border-border">
            <h4 className="font-medium text-text-primary mb-2">Method 1: Using category-specific hooks (Recommended)</h4>
            <pre className="text-xs text-text-secondary overflow-x-auto">
{`// Import the specific hook you need
import { useDisplaySettings } from '../../contexts/SettingsContext';

const MyComponent = () => {
  const { selectedFont, textSize, updateDisplaySetting } = useDisplaySettings();
  
  // Use settings
  const handleFontChange = (newFont) => {
    updateDisplaySetting('selectedFont', newFont);
  };
  
  return (
    <div style={{ fontSize: textSize + 'px' }}>
      Current font: {selectedFont}
    </div>
  );
};`}
            </pre>
          </div>

          <div className="p-4 bg-background rounded-lg border border-border">
            <h4 className="font-medium text-text-primary mb-2">Method 2: Using the main settings hook</h4>
            <pre className="text-xs text-text-secondary overflow-x-auto">
{`// Import the main hook for full access
import { useSettings } from '../../contexts/SettingsContext';

const MyComponent = () => {
  const { settings, updateSetting, saveSettings } = useSettings();
  
  // Access any setting
  const fontSize = settings.display.textSize;
  const reciter = settings.audio.selectedReciter;
  
  // Update any setting
  const handleUpdate = () => {
    updateSetting('display', 'textSize', 20);
    updateSetting('audio', 'autoPlay', false);
  };
  
  return (
    <button onClick={handleUpdate}>
      Update Settings
    </button>
  );
};`}
            </pre>
          </div>

          <div className="p-4 bg-background rounded-lg border border-border">
            <h4 className="font-medium text-text-primary mb-2">Method 3: Using utility functions</h4>
            <pre className="text-xs text-text-secondary overflow-x-auto">
{`// Import utilities for additional data
import { getReciterById, getFontById } from '../../contexts/settingsUtils';
import { useAudioSettings } from '../../contexts/SettingsContext';

const MyComponent = () => {
  const { selectedReciter } = useAudioSettings();
  const reciterData = getReciterById(selectedReciter);
  
  return (
    <div>
      <p>Reciter: {reciterData?.name}</p>
      <p>Country: {reciterData?.country}</p>
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsUsageExample;
