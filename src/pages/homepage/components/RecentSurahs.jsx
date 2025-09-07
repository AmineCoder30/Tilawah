import React from "react";
import Icon from "../../../components/AppIcon";

const RecentSurahs = ({ recentSurahs, onSurahClick }) => {
  if (!recentSurahs || recentSurahs.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h2 className="text-xl lg:text-2xl font-heading font-semibold text-text-primary mb-2">
          Recently Accessed
        </h2>
        <p className="text-text-secondary">Continue where you left off</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-x-4 pb-4">
          {recentSurahs.map((surah) => (
            <button
              key={surah.id}
              onClick={() => onSurahClick(surah)}
              className="group flex-shrink-0 w-64 p-4 bg-background border border-border rounded-lg hover:border-primary-200 hover:bg-surface-hover transition-all duration-200"
            >
              <div className="flex items-start gap-x-3">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors duration-200">
                  <span className="text-lg font-heading font-semibold text-primary">
                    {surah.number}
                  </span>
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <h3 className="text-base font-heading font-semibold text-text-primary mb-1 truncate group-hover:text-primary transition-colors duration-200">
                    {surah.englishName}
                  </h3>
                  <p className="text-sm text-primary mb-2 truncate" dir="rtl">
                    {surah.arabicName}
                  </p>
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span>{surah.ayahCount} Ayahs</span>
                    <span className="flex items-center gap-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{surah.lastRead}</span>
                    </span>
                  </div>
                </div>
              </div>

              {surah.progress && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                    <span>Progress</span>
                    <span>{Math.round(surah.progress)}%</span>
                  </div>
                  <div className="w-full h-1 bg-surface rounded-full">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-200"
                      style={{ width: `${surah.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSurahs;
