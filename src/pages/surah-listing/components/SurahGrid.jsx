import React from "react";
import SurahCard from "./SurahCard";

const SurahGrid = ({
  surahs,
  favoritedSurahs,
  onToggleFavorite,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="bg-surface border border-border rounded-lg p-4 animate-pulse"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-x-3 flex-1">
                <div className="w-10 h-10 bg-border rounded-lg" />
                <div className="flex-1 gap-y-2">
                  <div className="h-5 bg-border rounded w-3/4" />
                  <div className="h-4 bg-border rounded w-1/2" />
                </div>
              </div>
              <div className="w-8 h-8 bg-border rounded-lg" />
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-x-4">
                <div className="h-4 bg-border rounded w-16" />
                <div className="h-4 bg-border rounded w-20" />
              </div>
              <div className="h-3 bg-border rounded w-8" />
            </div>
            <div className="pt-3 border-t border-border">
              <div className="gap-y-2">
                <div className="h-3 bg-border rounded w-full" />
                <div className="h-3 bg-border rounded w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (surahs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-text-secondary"
            fill="currentColor"
          >
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
          </svg>
        </div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          No Surahs Found
        </h3>
        <p className="text-text-secondary font-body">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {surahs.map((surah) => (
        <SurahCard
          key={surah.number}
          surah={surah}
          isFavorited={favoritedSurahs.includes(surah.number)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default SurahGrid;
