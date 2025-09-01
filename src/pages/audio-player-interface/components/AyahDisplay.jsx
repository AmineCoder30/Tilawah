import React from 'react';

const AyahDisplay = ({ ayah, surahName, showTranslation = true }) => {
  if (!ayah) return null;

  return (
    <div className="text-center space-y-4 max-w-2xl mx-auto">
      {/* Surah and Ayah Reference */}
      <div className="text-sm text-text-secondary font-caption">
        <span>{surahName}</span>
        <span className="mx-2">•</span>
        <span>Ayah {ayah.number}</span>
      </div>

      {/* Arabic Text */}
      <div className="bg-surface rounded-lg p-6 lg:p-8">
        <p 
          className="text-2xl lg:text-3xl leading-relaxed text-text-primary font-arabic text-right"
          dir="rtl"
          lang="ar"
        >
          {ayah.arabicText}
        </p>
      </div>

      {/* Translation */}
      {showTranslation && ayah.translation && (
        <div className="bg-surface-hover rounded-lg p-4 lg:p-6">
          <p className="text-base lg:text-lg leading-relaxed text-text-primary font-body">
            {ayah.translation}
          </p>
        </div>
      )}

      {/* Transliteration */}
      {ayah.transliteration && (
        <div className="text-sm text-text-secondary font-caption italic">
          {ayah.transliteration}
        </div>
      )}
    </div>
  );
};

export default AyahDisplay;