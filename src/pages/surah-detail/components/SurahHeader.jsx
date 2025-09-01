import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const SurahHeader = ({ surah, currentAyah, totalAyahs, onBookmark, isBookmarked }) => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate('/surah-listing');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${surah.name} - ${surah.englishName}`,
        text: `Read ${surah.name} (${surah.englishName}) from the Quran`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="sticky top-16 lg:top-32 z-50 bg-background border-b border-border shadow-gentle">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Back Button & Surah Info */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Button
              variant="ghost"
              onClick={handleBackNavigation}
              iconName="ArrowLeft"
              className="flex-shrink-0"
              aria-label="Back to Surah listing"
            />
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-lg lg:text-xl font-heading font-semibold text-text-primary truncate">
                  {surah.name}
                </h1>
                <span className="text-sm text-text-secondary font-caption">
                  {surah.number}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <span className="font-caption">{surah.englishName}</span>
                <span>•</span>
                <span className="font-caption">{surah.revelationType}</span>
                <span>•</span>
                <span className="font-caption">{totalAyahs} Ayahs</span>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-2">
            {/* Progress Indicator */}
            <div className="hidden sm:flex items-center space-x-2 text-sm text-text-secondary">
              <span className="font-data">{currentAyah}</span>
              <span>/</span>
              <span className="font-data">{totalAyahs}</span>
            </div>

            {/* Bookmark Button */}
            <Button
              variant={isBookmarked ? "primary" : "ghost"}
              onClick={onBookmark}
              iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
              className="flex-shrink-0"
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            />

            {/* Share Button */}
            <Button
              variant="ghost"
              onClick={handleShare}
              iconName="Share"
              className="flex-shrink-0"
              aria-label="Share Surah"
            />
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="sm:hidden mt-3">
          <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
            <span className="font-caption">Progress</span>
            <span className="font-data">{currentAyah} / {totalAyahs}</span>
          </div>
          <div className="w-full h-1 bg-surface rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(currentAyah / totalAyahs) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurahHeader;