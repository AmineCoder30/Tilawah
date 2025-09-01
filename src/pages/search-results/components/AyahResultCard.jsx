import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AyahResultCard = ({ ayah, searchQuery }) => {
  const navigate = useNavigate();

  const handleAyahClick = () => {
    navigate(`/surah-detail?id=${ayah.surahId}&ayah=${ayah.number}`);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    navigate(`/audio-player-interface?surah=${ayah.surahId}&ayah=${ayah.number}`);
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
      onClick={handleAyahClick}
      className="bg-surface hover:bg-surface-hover border border-border rounded-lg p-4 transition-all duration-200 cursor-pointer group shadow-gentle hover:shadow-gentle-md"
    >
      {/* Header with Surah Reference */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={14} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              {ayah.surahName} - Ayah {ayah.number}
            </p>
            <p className="text-xs text-text-secondary">
              Surah {ayah.surahId} • {ayah.revelationType}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          onClick={handlePlayClick}
          iconName="Play"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label={`Play ${ayah.surahName} Ayah ${ayah.number}`}
        />
      </div>

      {/* Arabic Text */}
      <div className="mb-3 p-3 bg-background rounded-lg border border-border">
        <p 
          className="text-lg leading-relaxed text-text-primary font-arabic"
          dir="rtl"
          style={{ fontFamily: 'Amiri, serif' }}
        >
          {highlightText(ayah.arabicText, searchQuery)}
        </p>
      </div>

      {/* Translation */}
      <div className="mb-3">
        <p className="text-sm text-text-secondary leading-relaxed">
          {highlightText(ayah.translation, searchQuery)}
        </p>
      </div>

      {/* Match Information */}
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Icon name="Search" size={12} />
            <span>Match in {ayah.matchType}</span>
          </div>
          {ayah.relevanceScore && (
            <div className="flex items-center space-x-1">
              <Icon name="TrendingUp" size={12} />
              <span>{Math.round(ayah.relevanceScore * 100)}% relevant</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle bookmark
            }}
            className="p-1 hover:bg-surface-active rounded transition-colors duration-200"
            aria-label="Bookmark ayah"
          >
            <Icon name="Bookmark" size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle share
            }}
            className="p-1 hover:bg-surface-active rounded transition-colors duration-200"
            aria-label="Share ayah"
          >
            <Icon name="Share2" size={12} />
          </button>
        </div>
      </div>

      {/* Context Preview */}
      {ayah.contextPreview && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-text-secondary">
            <span className="font-medium">Context:</span> {ayah.contextPreview}
          </p>
        </div>
      )}
    </div>
  );
};

export default AyahResultCard;