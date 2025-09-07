import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const FeaturedReciterCard = ({ reciter, onPlaySample, onViewProfile }) => {
  return (
    <div className="px-4 py-6">
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-accent-50 to-primary-50 rounded-lg border border-accent-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl lg:text-2xl font-heading font-semibold text-text-primary mb-2">
            Featured Reciter of the Day
          </h2>
          <p className="text-text-secondary">
            Discover beautiful recitations from renowned Qaris
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-y-4 md:gap-y-0 md:gap-x-6">
          {/* Reciter Avatar */}
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={40} className="text-primary-foreground" />
          </div>

          {/* Reciter Info */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
              {reciter.name}
            </h3>
            <p className="text-primary mb-2" dir="rtl">
              {reciter.arabicName}
            </p>
            <p className="text-sm text-text-secondary mb-3">
              {reciter.description}
            </p>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {reciter.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent-100 text-accent-700 text-xs rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-y-2 flex-shrink-0">
            <Button
              variant="primary"
              size="sm"
              iconName="Play"
              iconPosition="left"
              onClick={() => onPlaySample(reciter)}
            >
              Play Sample
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="User"
              iconPosition="left"
              onClick={() => onViewProfile(reciter)}
            >
              View Profile
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 pt-4 border-t border-accent-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-heading font-semibold text-text-primary">
                {reciter.totalRecitations}
              </p>
              <p className="text-xs text-text-secondary">Recitations</p>
            </div>
            <div>
              <p className="text-lg font-heading font-semibold text-text-primary">
                {reciter.riwayahMethods.length}
              </p>
              <p className="text-xs text-text-secondary">Riwayah Methods</p>
            </div>
            <div>
              <p className="text-lg font-heading font-semibold text-text-primary">
                {reciter.rating}★
              </p>
              <p className="text-xs text-text-secondary">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedReciterCard;
