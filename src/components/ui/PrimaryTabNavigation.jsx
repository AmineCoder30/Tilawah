import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../AppIcon";

const PrimaryTabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      label: "Home",
      path: "/homepage",
      icon: "Home",
      activeIcon: "Home",
    },
    {
      label: "Browse",
      path: "/surah-listing",
      icon: "Book",
      activeIcon: "BookOpen",
    },
    {
      label: "Reading",
      path: "/surah-detail",
      icon: "FileText",
      activeIcon: "FileText",
    },
    {
      label: "Settings",
      path: "/settings-preferences",
      icon: "Settings",
      activeIcon: "Settings",
    },
  ];

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
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-100 lg:hidden bg-background border-t border-border shadow-gentle-lg">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center min-h-[48px] px-3 py-2 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-primary-50 text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                }`}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  name={active ? item.activeIcon : item.icon}
                  size={20}
                  className="mb-1"
                />
                <span className="text-xs font-caption font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

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
                      ? "bg-primary-50 text-primary border border-primary-200"
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
