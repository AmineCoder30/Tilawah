import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import DisplayPreferences from "./components/DisplayPreferences";
import AudioSettings from "./components/AudioSettings";
import LanguageLocalization from "./components/LanguageLocalization";
import DataManagement from "./components/DataManagement";

const SettingsPreferences = () => {
  const navigate = useNavigate();

  const [expandedSections, setExpandedSections] = useState({
    display: false,
    audio: false,
    language: false,
    data: false,
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirmLeave) return;
    }
    navigate("/homepage");
  };

  const handleSave = () => {
    // In real app, this would save settings to backend/localStorage
    setHasUnsavedChanges(false);
    // Show success feedback
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const quickActions = [
    {
      icon: "Moon",
      label: "Dark Mode",
      action: () => console.log("Toggle dark mode"),
      shortcut: "Ctrl+D",
    },
    {
      icon: "Type",
      label: "Text Size",
      action: () => toggleSection("display"),
      shortcut: "Ctrl+T",
    },
    {
      icon: "Volume2",
      label: "Audio",
      action: () => toggleSection("audio"),
      shortcut: "Ctrl+A",
    },
    {
      icon: "Languages",
      label: "Language",
      action: () => toggleSection("language"),
      shortcut: "Ctrl+L",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-100 bg-background border-b border-border shadow-gentle">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-x-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
              aria-label="Go back"
            >
              <Icon name="ArrowLeft" size={20} className="text-text-primary" />
            </button>
            <div>
              <h1 className="text-lg font-heading font-semibold text-text-primary">
                Settings
              </h1>
              <p className="text-xs text-text-secondary">
                Customize your experience
              </p>
            </div>
          </div>
          {hasUnsavedChanges && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              iconName="Check"
              iconPosition="left"
            >
              Save
            </Button>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block sticky top-0 z-100 bg-background border-b border-border shadow-gentle">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
                aria-label="Go back"
              >
                <Icon
                  name="ArrowLeft"
                  size={20}
                  className="text-text-primary"
                />
              </button>
              <div>
                <h1 className="text-2xl font-heading font-semibold text-text-primary">
                  Settings & Preferences
                </h1>
                <p className="text-sm text-text-secondary">
                  Customize your Quran reading and listening experience
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              {hasUnsavedChanges && (
                <div className="flex items-center gap-x-2 px-3 py-1 bg-warning-50 rounded-lg border border-warning-200">
                  <Icon name="AlertCircle" size={16} className="text-warning" />
                  <span className="text-sm text-warning-700">
                    Unsaved changes
                  </span>
                </div>
              )}
              <Button
                variant="primary"
                onClick={handleSave}
                iconName="Check"
                iconPosition="left"
                disabled={!hasUnsavedChanges}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
        {/* Quick Actions - Desktop Only */}
        <div className="hidden lg:block mb-8">
          <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="p-4 bg-surface hover:bg-surface-hover rounded-lg border border-border transition-colors duration-200 text-center group"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-100 transition-colors duration-200">
                  <Icon name={action.icon} size={24} className="text-primary" />
                </div>
                <p className="text-sm font-medium text-text-primary mb-1">
                  {action.label}
                </p>
                <p className="text-xs text-text-secondary font-data">
                  {action.shortcut}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Sections */}
        <div className="gap-y-4">
          <h2 className="text-lg font-heading font-semibold text-text-primary lg:hidden">
            All Settings
          </h2>

          <DisplayPreferences
            isExpanded={expandedSections.display}
            onToggle={() => toggleSection("display")}
          />

          <AudioSettings
            isExpanded={expandedSections.audio}
            onToggle={() => toggleSection("audio")}
          />

          <LanguageLocalization
            isExpanded={expandedSections.language}
            onToggle={() => toggleSection("language")}
          />

          <DataManagement
            isExpanded={expandedSections.data}
            onToggle={() => toggleSection("data")}
          />
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-accent-50 rounded-lg border border-accent-200">
          <div className="flex items-start gap-x-3">
            <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="HelpCircle" size={16} className="text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-heading font-medium text-text-primary mb-1">
                Need Help?
              </h3>
              <p className="text-xs text-text-secondary mb-3">
                Learn more about customizing your Quran reading experience or
                contact support for assistance.
              </p>
              <div className="flex gap-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Book"
                  iconPosition="left"
                >
                  User Guide
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-text-secondary">
            Settings are automatically saved to your device and synced across
            your accounts.
          </p>
          <p className="text-xs text-text-tertiary mt-1">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Mobile Save Button */}
      {hasUnsavedChanges && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-100">
          <Button
            variant="primary"
            onClick={handleSave}
            iconName="Check"
            iconPosition="left"
            fullWidth
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default SettingsPreferences;
