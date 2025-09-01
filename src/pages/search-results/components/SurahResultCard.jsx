import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SurahResultCard = ({ surah, searchQuery }) => {
  const navigate = useNavigate();

  const handleSurahClick = () => {
    navigate(`/surah-detail?id=${surah.id}`);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    navigate(`/audio-player-interface?surah=${surah.id}`);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-accent-100 text-accent-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div
      onClick={handleSurahClick}
      className="bg-surface hover:bg-surface-hover border border-border rounded-lg p-4 transition-all duration-200 cursor-pointer group shadow-gentle hover:shadow-gentle-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Surah Number and Name */}
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary-foreground">
                {surah.number}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-heading font-semibold text-text-primary truncate">
                {highlightText(surah.englishName, searchQuery)}
              </h3>
              <p className="text-sm text-text-secondary truncate" dir="rtl">
                {highlightText(surah.arabicName, searchQuery)}
              </p>
            </div>
          </div>

          {/* Surah Details */}
          <div className="flex items-center space-x-4 text-xs text-text-secondary mb-3">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={12} />
              <span>{surah.revelationType}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={12} />
              <span>{surah.ayahCount} Ayahs</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{surah.duration}</span>
            </div>
          </div>

          {/* Translation/Meaning */}
          <p className="text-sm text-text-secondary line-clamp-2">
            {highlightText(surah.translation, searchQuery)}
          </p>
        </div>

        {/* Action Button */}
        <div className="ml-4 flex-shrink-0">
          <Button
            variant="ghost"
            onClick={handlePlayClick}
            iconName="Play"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label={`Play ${surah.englishName}`}
          />
        </div>
      </div>

      {/* Match Context */}
      {surah.matchContext && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-text-secondary">
            <span className="font-medium">Match found in:</span> {surah.matchContext}
          </p>
        </div>
      )}
    </div>
  );
};

export default SurahResultCard;