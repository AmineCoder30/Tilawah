import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { useDataSettings, useSettings } from "../../../contexts/SettingsContext";
import { downloadSettingsFile } from "../../../contexts/settingsUtils";

const DataManagement = ({ isExpanded, onToggle }) => {
  const {
    syncEnabled,
    offlineContent,
    updateDataSetting
  } = useDataSettings();
  const { exportSettings, resetSettings } = useSettings();
  
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleSyncToggle = () => {
    updateDataSetting('syncEnabled', !syncEnabled);
  };

  const handleBackupFavorites = () => {
    try {
      const settingsData = exportSettings();
      const result = downloadSettingsFile(
        settingsData, 
        `quran-reader-backup-${new Date().toISOString().split("T")[0]}.json`
      );
      
      if (result.success) {
        // Show success feedback in a real app
        console.log('Settings backed up successfully');
      }
    } catch (error) {
      console.error('Failed to backup settings:', error);
    }
  };

  const handleClearCache = async () => {
    setIsClearing(true);
    // Simulate cache clearing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsClearing(false);
  };

  const handleResetSettings = () => {
    setShowResetDialog(true);
  };

  const confirmReset = () => {
    setShowResetDialog(false);
    resetSettings();
  };

  const cancelReset = () => {
    setShowResetDialog(false);
  };

  const storageItems = [
    { label: "Audio Files", size: "1.8 GB", type: "audio" },
    { label: "Translations", size: "245 MB", type: "text" },
    { label: "App Cache", size: "89 MB", type: "cache" },
    { label: "User Data", size: "12 MB", type: "user" },
    { label: "Settings", size: "2.1 MB", type: "settings" },
  ];

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-hover transition-colors duration-200"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <Icon name="Database" size={20} className="text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Data Management
            </h3>
            <p className="text-sm text-text-secondary">
              Sync, backup, and storage management
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
          {/* Reading Position Sync */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Reading Position Sync
            </h4>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
              <div className="flex items-center gap-x-3">
                <Icon
                  name="RefreshCw"
                  size={18}
                  className="text-text-secondary"
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Auto-sync Reading Progress
                  </p>
                  <p className="text-xs text-text-secondary">
                    Sync your reading position across devices
                  </p>
                </div>
              </div>
              <button
                onClick={handleSyncToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  syncEnabled ? "bg-primary" : "bg-border-medium"
                }`}
                aria-label="Toggle sync"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    syncEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            {syncEnabled && (
              <div className="p-3 bg-success-50 rounded-lg border border-success-200">
                <div className="flex items-center gap-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <p className="text-xs text-success-700">
                    Last synced: 2 minutes ago
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Favorites Backup */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Favorites & Bookmarks
            </h4>
            <div className="gap-y-3">
              <div className="p-3 bg-background rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Backup Favorites
                    </p>
                    <p className="text-xs text-text-secondary">
                      Export your favorite Surahs and bookmarks
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackupFavorites}
                    iconName="Download"
                    iconPosition="left"
                  >
                    Export
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-data font-semibold text-primary">
                      9
                    </p>
                    <p className="text-xs text-text-secondary">
                      Favorite Surahs
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-data font-semibold text-primary">
                      3
                    </p>
                    <p className="text-xs text-text-secondary">
                      Bookmarked Ayahs
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-data font-semibold text-primary">
                      1
                    </p>
                    <p className="text-xs text-text-secondary">
                      Reading Position
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Offline Content */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Offline Content
            </h4>
            <div className="p-3 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Downloaded Audio
                  </p>
                  <p className="text-xs text-text-secondary">
                    {offlineContent.downloadedSurahs} of{" "}
                    {offlineContent.totalSurahs} Surahs
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-data font-semibold text-text-primary">
                    {offlineContent.totalSize}
                  </p>
                  <p className="text-xs text-text-secondary">Total size</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-surface rounded-full h-2 mb-3">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      (offlineContent.downloadedSurahs /
                        offlineContent.totalSurahs) *
                      100
                    }%`,
                  }}
                />
              </div>

              <div className="flex gap-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  className="flex-1"
                >
                  Download More
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                  className="flex-1"
                >
                  Manage
                </Button>
              </div>
            </div>
          </div>

          {/* Storage Usage */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Storage Usage
            </h4>
            <div className="gap-y-2">
              {storageItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-background rounded border border-border"
                >
                  <div className="flex items-center gap-x-3">
                    <Icon
                      name={
                        item.type === "audio"
                          ? "Music"
                          : item.type === "text"
                          ? "FileText"
                          : item.type === "cache"
                          ? "HardDrive"
                          : item.type === "user"
                          ? "User"
                          : "Settings"
                      }
                      size={16}
                      className="text-text-secondary"
                    />
                    <span className="text-sm text-text-primary">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-data text-text-secondary">
                    {item.size}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cache Management */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Cache Management
            </h4>
            <div className="p-3 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Clear App Cache
                  </p>
                  <p className="text-xs text-text-secondary">
                    Free up space by clearing temporary files
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearCache}
                  disabled={isClearing}
                  iconName={isClearing ? "Loader2" : "Trash2"}
                  iconPosition="left"
                >
                  {isClearing ? "Clearing..." : "Clear Cache"}
                </Button>
              </div>
            </div>
          </div>

          {/* Reset Settings */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Reset Settings
            </h4>
            <div className="p-3 bg-error-50 rounded-lg border border-error-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-error-700">
                    Reset to Defaults
                  </p>
                  <p className="text-xs text-error-600">
                    This will reset all settings to their default values
                  </p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleResetSettings}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetDialog && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-300"
            onClick={cancelReset}
          />
          <div className="fixed inset-4 lg:inset-auto lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-96 z-400 bg-background rounded-lg shadow-gentle-lg">
            <div className="p-6">
              <div className="flex items-center gap-x-3 mb-4">
                <div className="w-10 h-10 bg-error-50 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-error" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Reset Settings
                  </h3>
                  <p className="text-sm text-text-secondary">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <p className="text-sm text-text-secondary mb-6">
                Are you sure you want to reset all settings to their default
                values? This will affect:
              </p>

              <ul className="text-sm text-text-secondary mb-6 gap-y-1">
                <li>• Display preferences and theme</li>
                <li>• Audio and reciter settings</li>
                <li>• Language and localization</li>
                <li>• Reading position sync</li>
              </ul>

              <div className="flex gap-x-3">
                <Button
                  variant="ghost"
                  onClick={cancelReset}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={confirmReset}
                  className="flex-1"
                >
                  Reset Settings
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DataManagement;
