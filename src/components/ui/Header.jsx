import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";
import Input from "./Input";
import { useTheme } from "../../contexts/ThemeContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogoClick = () => {
    navigate("/homepage");
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery("");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchExpanded(false);
      setSearchQuery("");
    }
  };

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleSettingsNavigation = () => {
    navigate("/settings-preferences");
    setIsSettingsOpen(false);
  };

  const quickSettings = [
    { label: isDarkMode ? "Light Mode" : "Dark Mode", action: toggleTheme },
    { label: "Text Size", action: () => console.log("Adjust text size") },
    { label: "Reciter", action: () => console.log("Change reciter") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-background border-b border-border shadow-gentle">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-x-3 hover:opacity-80 transition-opacity duration-200"
            aria-label="Quran Reader Home"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                <path
                  d="M12 16L13.09 22.26L20 23L13.09 23.74L12 30L10.91 23.74L4 23L10.91 22.26L12 16Z"
                  opacity="0.6"
                />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-heading font-semibold text-text-primary">
                Quran Reader
              </h1>
              <p className="text-xs text-text-secondary font-caption">
                القرآن الكريم
              </p>
            </div>
          </button>
        </div>

        {/* Search Section */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          {isSearchExpanded ? (
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="search"
                placeholder="Search Quran..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10"
                autoFocus
              />
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <button
                type="button"
                onClick={handleSearchToggle}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200"
                aria-label="Close search"
              >
                <Icon name="X" size={18} />
              </button>
            </form>
          ) : (
            <div className="hidden lg:block">
              <button
                onClick={handleSearchToggle}
                className="w-full flex items-center gap-x-3 px-4 py-2 bg-surface hover:bg-surface-hover rounded-lg border border-border transition-colors duration-200"
                aria-label="Open search"
              >
                <Icon
                  name="Search"
                  size={18}
                  className="text-text-secondary"
                />
                <span className="text-text-secondary font-body">
                  Search Quran...
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-x-2">
          {/* Mobile Search Button */}
          <button
            onClick={handleSearchToggle}
            className="lg:hidden p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
            aria-label="Search"
          >
            <Icon
              name="Search"
              size={20}
              className="text-text-primary"
            />
          </button>

          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={handleSettingsToggle}
              className="p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
              aria-label="Settings"
            >
              <Icon
                name="Settings"
                size={20}
                className="text-text-primary"
              />
            </button>

            {isSettingsOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-300"
                  onClick={() => setIsSettingsOpen(false)}
                />

                {/* Settings Panel */}
                <div className="absolute right-0 top-full mt-2 w-64 bg-background border border-border rounded-lg shadow-gentle-lg z-400 animate-fade-in">
                  <div className="p-4">
                    <h3 className="text-sm font-heading font-medium text-text-primary mb-3">
                      Quick Settings
                    </h3>
                    <div className="gap-y-2">
                      {quickSettings.map((setting, index) => (
                        <button
                          key={index}
                          onClick={setting.action}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-md transition-colors duration-200"
                        >
                          <span>{setting.label}</span>
                          <Icon name="ChevronRight" size={16} />
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-border">
                      <Button
                        variant="ghost"
                        onClick={handleSettingsNavigation}
                        className="w-full justify-start"
                        iconName="Settings"
                        iconPosition="left"
                      >
                        All Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchExpanded && (
        <div className="lg:hidden border-t border-border bg-background p-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="search"
              placeholder="Search Quran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
              autoFocus
            />
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
