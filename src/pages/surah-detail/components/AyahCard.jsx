import React, { useState, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useDisplaySettings } from "../../../contexts/SettingsContext";

const AyahCard = ({
  ayah,
  index,
  isPlaying,
  isLoading,
  onPlayPause,
  onBookmark,
  isBookmarked,
  ayahTranslation,
  showArabicNumbers = false,
  onShowTranslation,
}) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const cardRef = useRef(null);
  const { textSize, selectedFont } = useDisplaySettings();

  const handleShare = () => {
    const text = `${ayah.text}\n\n${ayah.translation}\n\n- Quran ${ayah.surah}:${ayah.number}`;

    if (navigator.share) {
      navigator.share({
        title: `Ayah ${ayah.number}`,
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const handleCopy = () => {
    const text = `${ayah.text}\n\n${ayah.translation}`;
    navigator.clipboard.writeText(text);
  };

  // Font size for Arabic text is now controlled by settings (textSize)

  return (
    <div
      ref={cardRef}
      className={`bg-surface border border-border rounded-lg p-4 lg:p-6 transition-all duration-200 ${
        isPlaying
          ? "ring-2 ring-primary ring-opacity-50 bg-primary-50"
          : "hover:shadow-gentle"
      }`}
    >
      {/* Ayah Number & Controls Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-3">
          {/* Ayah Number Badge */}
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm lg:text-base font-heading font-semibold text-primary-foreground">
              {/* {formatAyahNumber(ayah.number)} */}
              {index + 1}
            </span>
          </div>

          {/* Play Button */}
          {/* <Button
            variant={isPlaying ? "primary" : "ghost"}
            onClick={onPlayPause}
            disabled={isLoading}
            iconName={isLoading ? "Loader2" : isPlaying ? "Pause" : "Play"}
            className={isLoading ? "animate-spin" : ""}
            aria-label={isPlaying ? "Pause ayah" : "Play ayah"}
          /> */}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-x-1">
          <Button
            variant="ghost"
            onClick={onBookmark}
            iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
            size="sm"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          />

          <Button
            variant="ghost"
            onClick={handleCopy}
            iconName="Copy"
            size="sm"
            aria-label="Copy ayah text"
          />

          <Button
            variant="ghost"
            onClick={handleShare}
            iconName="Share"
            size="sm"
            aria-label="Share ayah"
          />
        </div>
      </div>

      {/* Arabic Text */}
      <div className="mb-4" dir="rtl">
        <p
          className={`leading-relaxed text-text-primary text-right ${selectedFont}`}
          style={{ fontSize: textSize }}
        >
          {ayah.text}
        </p>
      </div>

      {/* Translation Toggle */}
      <div className="flex items-center gap-x-4 mb-3">
        <button
          onClick={() => {
            setShowTranslation(!showTranslation);
            onShowTranslation();
          }}
          className="flex items-center gap-x-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <Icon
            name={showTranslation ? "ChevronDown" : "ChevronRight"}
            size={16}
          />
          <span className="font-caption">Translation</span>
        </button>
      </div>

      {/* Transliteration */}
      {showTranslation && (
        <div className="mb-3">
          <p
            className="text-sm lg:text-base leading-relaxed text-text-secondary italic"
            style={{ fontSize: textSize }}
          >
            {ayahTranslation || (
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <p>
                  <Skeleton />
                </p>
              </SkeletonTheme>
            )}
          </p>
        </div>
      )}

      {/* Audio Progress Bar (when playing) */}
      {/* {isPlaying && (
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-x-3">
            <Icon name="Volume2" size={16} className="text-text-secondary" />
            <div className="flex-1 h-1 bg-surface rounded-full">
              <div className="h-full bg-primary rounded-full w-1/3 transition-all duration-300" />
            </div>
            <span className="text-xs text-text-secondary font-data">0:15</span>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AyahCard;
