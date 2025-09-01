import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const FloatingActionButton = ({
  onPlaybackModeChange,
  currentPlaybackMode,
  onReciterPanelOpen,
  onBookmarkPosition,
  onScrollToTop,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const playbackModes = [
    { id: "individual", label: "Individual Ayah", icon: "Play" },
    { id: "continuous", label: "Continuous Surah", icon: "PlayCircle" },
  ];

  const actions = [
    {
      id: "playback-mode",
      label:
        currentPlaybackMode === "individual"
          ? "Continuous Mode"
          : "Individual Mode",
      icon: currentPlaybackMode === "individual" ? "PlayCircle" : "Play",
      action: () =>
        onPlaybackModeChange(
          currentPlaybackMode === "individual" ? "continuous" : "individual"
        ),
    },
    {
      id: "reciter",
      label: "Change Reciter",
      icon: "Mic",
      action: onReciterPanelOpen,
    },
    {
      id: "bookmark",
      label: "Bookmark Position",
      icon: "BookmarkPlus",
      action: onBookmarkPosition,
    },
    {
      id: "scroll-top",
      label: "Scroll to Top",
      icon: "ArrowUp",
      action: onScrollToTop,
    },
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleActionClick = (action) => {
    action.action();
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-200">
      {/* Expanded Actions */}
      {isExpanded && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-100"
            onClick={() => setIsExpanded(false)}
          />

          {/* Action Menu */}
          <div className="absolute bottom-16 right-0 mb-2 space-y-2 animate-fade-in">
            {actions.map((action, index) => (
              <div
                key={action.id}
                className="flex items-center space-x-3"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Action Label */}
                <div className="hidden lg:block bg-background border border-border rounded-lg px-3 py-2 shadow-gentle">
                  <span className="text-sm font-medium text-text-primary whitespace-nowrap">
                    {action.label}
                  </span>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleActionClick(action)}
                  className="w-12 h-12 bg-primary hover:bg-primary-600 rounded-full shadow-gentle-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                  aria-label={action.label}
                >
                  <Icon
                    name={action.icon}
                    size={20}
                    className="text-primary-foreground"
                  />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Main FAB */}
      <button
        onClick={toggleExpanded}
        className={`w-14 h-14 bg-primary hover:bg-primary-600 rounded-full shadow-gentle-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
          isExpanded ? "rotate-45" : "rotate-0"
        }`}
        aria-label={isExpanded ? "Close menu" : "Open menu"}
      >
        <Icon
          name={isExpanded ? "X" : "MoreVertical"}
          size={24}
          className="text-primary-foreground"
        />
      </button>

      {/* Mobile Action Sheet */}
      {isExpanded && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-lg shadow-gentle-lg z-200 animate-slide-up">
          <div className="p-4">
            <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />

            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 text-center">
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action)}
                  className="flex flex-col items-center space-y-2 p-4 bg-surface hover:bg-surface-hover rounded-lg transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                    <Icon
                      name={action.icon}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <span className="text-sm font-medium text-text-primary text-center">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;
