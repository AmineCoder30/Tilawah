import React from "react";
import Button from "../../../components/ui/Button";

const HeroSection = ({
  onBrowseClick,
  onContinueReading,
  lastReadingSurah,
}) => {
  return (
    <div className="text-center px-4 py-8 lg:py-12">
      {/* Islamic Greeting */}
      <div className="mb-6">
        <p
          className="text-lg lg:text-xl text-primary font-heading mb-2"
          dir="rtl"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="text-sm lg:text-base text-text-secondary font-caption">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>
      </div>

      {/* Main Title */}
      <div className="mb-8 ">
        <h1 className="text-3xl lg:text-5xl font-heading font-semibold text-text-primary mb-4">
          Quran Reader
        </h1>
        <p
          className="text-lg lg:text-xl text-primary font-heading mb-4"
          dir="rtl"
        >
          القرآن الكريم
        </p>
        <p className="text-base lg:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Experience the divine words of Allah with authentic Arabic text,
          beautiful recitations from renowned Qaris, and comprehensive
          translations. Your spiritual journey begins here.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
        <Button
          variant="primary"
          size="lg"
          iconName="Book"
          iconPosition="left"
          onClick={onBrowseClick}
          className="w-full sm:w-auto"
        >
          Browse All Surahs
        </Button>

        {lastReadingSurah && (
          <Button
            variant="outline"
            size="lg"
            iconName="BookOpen"
            iconPosition="left"
            onClick={onContinueReading}
            className="w-full sm:w-auto"
          >
            Continue Reading
          </Button>
        )}
      </div>

      {/* Decorative Pattern */}
      <div className="mt-8 flex justify-center">
        <div className="w-16 h-1 bg-gradient-to-r from-primary-300 via-primary to-primary-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default HeroSection;
