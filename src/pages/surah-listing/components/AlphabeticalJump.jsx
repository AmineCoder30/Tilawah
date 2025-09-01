import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AlphabeticalJump = ({ surahs, onJumpToSurah, isMobile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Group surahs by first letter of transliteration
  const groupedSurahs = surahs.reduce((acc, surah) => {
    const firstLetter = surah.transliteration.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(surah);
    return acc;
  }, {});

  const letters = Object.keys(groupedSurahs).sort();

  const handleLetterClick = (letter) => {
    const firstSurah = groupedSurahs[letter][0];
    onJumpToSurah(firstSurah.number);
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Floating Button */}
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-20 right-4 z-100 w-12 h-12 bg-primary hover:bg-primary-600 rounded-full shadow-gentle-lg flex items-center justify-center transition-colors duration-200"
          aria-label="Alphabetical jump navigation"
        >
          <Icon name="List" size={20} className="text-primary-foreground" />
        </button>

        {/* Mobile Bottom Sheet */}
        {isExpanded && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-200"
              onClick={() => setIsExpanded(false)}
            />
            <div className="fixed bottom-0 left-0 right-0 z-300 bg-background rounded-t-lg shadow-gentle-lg max-h-96 overflow-hidden animate-slide-up">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Jump to Letter
                  </h3>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
                    aria-label="Close"
                  >
                    <Icon name="X" size={20} className="text-text-primary" />
                  </button>
                </div>
              </div>
              <div className="p-4 overflow-y-auto">
                <div className="grid grid-cols-6 gap-2">
                  {letters.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => handleLetterClick(letter)}
                      className="aspect-square bg-surface hover:bg-surface-hover border border-border rounded-lg flex items-center justify-center text-sm font-heading font-semibold text-text-primary transition-colors duration-200"
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-100 bg-background border border-border rounded-lg shadow-gentle-lg p-2">
      <div className="flex flex-col space-y-1">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className="w-8 h-8 bg-surface hover:bg-surface-hover rounded flex items-center justify-center text-xs font-heading font-semibold text-text-primary transition-colors duration-200"
            title={`Jump to ${letter}`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlphabeticalJump;