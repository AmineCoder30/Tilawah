import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const SurahCard = ({ surah, isFavorited, onToggleFavorite }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/surah-detail?id=${surah.number}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(surah.number);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-surface hover:bg-surface-hover border border-border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-gentle active:scale-98"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-heading font-semibold text-sm">
              {surah.number}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-1 truncate">
              {surah.name}
            </h3>
            <p className="text-sm text-text-secondary truncate">
              {surah.englishName}
            </p>
          </div>
        </div>
        <button
          onClick={handleFavoriteClick}
          className="p-2 hover:bg-surface-active rounded-lg transition-colors duration-200"
          aria-label={
            isFavorited ? "Remove from favorites" : "Add to favorites"
          }
        >
          <Icon
            name="Heart"
            size={18}
            className={
              isFavorited ? "text-error fill-current" : "text-text-secondary"
            }
          />
        </button>
      </div>

      <div className="flex items-center justify-between text-sm text-text-secondary">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} />
            <span className="font-caption">{surah.revelationType}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="FileText" size={14} />
            <span className="font-caption">{surah.ayahs.length} Ayahs</span>
          </div>
        </div>
        <div className="text-xs text-text-tertiary font-data">
          #{surah.number}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-text-secondary font-caption line-clamp-2">
          {surah.englishNameTranslation}
        </p>
      </div>
    </div>
  );
};

export default SurahCard;
