import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import navigationItems from "../../constants/navigationItems";
import Icon from "../AppIcon";

const PrimaryTabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === "/homepage") {
      return location.pathname === "/" || location.pathname === "/homepage";
    }
    if (path === "/surah-listing") {
      return (
        location.pathname === "/surah-listing" ||
        location.pathname === "/search-results"
      );
    }
    if (path === "/surah-detail") {
      return (
        location.pathname === "/surah-detail" ||
        location.pathname === "/audio-player-interface"
      );
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Top Navigation */}
      <nav className="hidden lg:block fixed top-16 left-0 right-0 z-100 bg-background border-b border-border shadow-gentle">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-x-8 py-4">
            {navigationItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-primary-50 dark:text-white text-primary border border-primary-200"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon name={active ? item.activeIcon : item.icon} size={18} />
                  <span className="font-body font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-16 lg:h-32" />
    </>
  );
};

export default PrimaryTabNavigation;
