import React, { useState, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const AyahCard = ({
  ayah,
  index,
  isPlaying,
  isLoading,
  onPlayPause,
  onBookmark,
  isBookmarked,
  showArabicNumbers = false,
  fontSize = "base",
}) => {
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const cardRef = useRef(null);

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

  const getFontSizeClass = () => {
    const sizeMap = {
      sm: "text-lg lg:text-xl",
      base: "text-xl lg:text-2xl",
      lg: "text-2xl lg:text-3xl",
      xl: "text-3xl lg:text-4xl",
    };
    return sizeMap[fontSize] || sizeMap["base"];
  };

  const formatAyahNumber = (number) => {
    if (showArabicNumbers) {
      // Convert to Arabic-Indic numerals
      return number.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
    }
    return number.toString();
  };

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
        <div className="flex items-center space-x-3">
          {/* Ayah Number Badge */}
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm lg:text-base font-heading font-semibold text-primary-foreground">
              {/* {formatAyahNumber(ayah.number)} */}
              {index + 1}
            </span>
          </div>

          {/* Play Button */}
          <Button
            variant={isPlaying ? "primary" : "ghost"}
            onClick={onPlayPause}
            disabled={isLoading}
            iconName={isLoading ? "Loader2" : isPlaying ? "Pause" : "Play"}
            className={isLoading ? "animate-spin" : ""}
            aria-label={isPlaying ? "Pause ayah" : "Play ayah"}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
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
          className={`${getFontSizeClass()} leading-relaxed text-text-primary font-arabic text-right`}
        >
          {ayah.text}
        </p>
      </div>

      {/* Translation Toggle */}
      <div className="flex items-center space-x-4 mb-3">
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="flex items-center space-x-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <Icon
            name={showTranslation ? "ChevronDown" : "ChevronRight"}
            size={16}
          />
          <span className="font-caption">Translation</span>
        </button>

        <button
          onClick={() => setShowTransliteration(!showTransliteration)}
          className="flex items-center space-x-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <Icon
            name={showTransliteration ? "ChevronDown" : "ChevronRight"}
            size={16}
          />
          <span className="font-caption">Transliteration</span>
        </button>
      </div>

      {/* Translation */}
      {showTranslation && (
        <div className="mb-3">
          <p className="text-base lg:text-lg leading-relaxed text-text-primary">
            {ayah.translation}
          </p>
        </div>
      )}

      {/* Transliteration */}
      {showTransliteration && (
        <div className="mb-3">
          <p className="text-sm lg:text-base leading-relaxed text-text-secondary italic">
            {ayah.transliteration}
          </p>
        </div>
      )}

      {/* Audio Progress Bar (when playing) */}
      {isPlaying && (
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Volume2" size={16} className="text-text-secondary" />
            <div className="flex-1 h-1 bg-surface rounded-full">
              <div className="h-full bg-primary rounded-full w-1/3 transition-all duration-300" />
            </div>
            <span className="text-xs text-text-secondary font-data">0:15</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AyahCard;
