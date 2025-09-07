import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";

const ReciterResultCard = ({ reciter, searchQuery }) => {
  const navigate = useNavigate();

  const handleReciterClick = () => {
    navigate(`/audio-player-interface?reciter=${reciter.id}`);
  };

  const handlePlaySample = (e) => {
    e.stopPropagation();
    // Handle play sample audio
    console.log("Playing sample for", reciter.name);
  };

  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="bg-accent-100 text-accent-800 px-1 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div
      onClick={handleReciterClick}
      className="bg-surface hover:bg-surface-hover border border-border rounded-lg p-4 transition-all duration-200 cursor-pointer group shadow-gentle hover:shadow-gentle-md"
    >
      <div className="flex items-start gap-x-4">
        {/* Reciter Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-primary-50">
          <Image
            src={reciter.image}
            alt={reciter.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Reciter Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-heading font-semibold text-text-primary truncate">
                {highlightText(reciter.name, searchQuery)}
              </h3>
              <p className="text-sm text-text-secondary truncate">
                {highlightText(reciter.arabicName, searchQuery)}
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={handlePlaySample}
              iconName="Play"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2"
              aria-label={`Play sample from ${reciter.name}`}
            />
          </div>

          {/* Reciter Details */}
          <div className="flex items-center gap-x-4 text-xs text-text-secondary mb-2">
            <div className="flex items-center gap-x-1">
              <Icon name="MapPin" size={12} />
              <span>{reciter.country}</span>
            </div>
            <div className="flex items-center gap-x-1">
              <Icon name="Book" size={12} />
              <span>{reciter.riwayah}</span>
            </div>
            <div className="flex items-center gap-x-1">
              <Icon name="Star" size={12} />
              <span>{reciter.rating}/5</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary line-clamp-2 mb-3">
            {highlightText(reciter.description, searchQuery)}
          </p>

          {/* Available Surahs */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-text-secondary">
              <span className="font-medium">{reciter.availableSurahs}</span>{" "}
              Surahs available
            </div>

            <div className="flex items-center gap-x-2">
              {reciter.isPopular && (
                <span className="px-2 py-1 bg-accent-100 text-accent-800 text-xs rounded-full">
                  Popular
                </span>
              )}
              {reciter.isNew && (
                <span className="px-2 py-1 bg-success-100 text-success-800 text-xs rounded-full">
                  New
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Match Context */}
      {reciter.matchContext && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-text-secondary">
            <span className="font-medium">Match found in:</span>{" "}
            {reciter.matchContext}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReciterResultCard;
