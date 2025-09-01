import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const VolumeControl = ({ volume, onVolumeChange, isMuted, onToggleMute }) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return 'VolumeX';
    if (volume < 0.5) return 'Volume1';
    return 'Volume2';
  };

  return (
    <div className="relative flex items-center">
      <Button
        variant="ghost"
        size="sm"
        shape="circle"
        onClick={onToggleMute}
        iconName={getVolumeIcon()}
        iconSize={18}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        className="text-text-primary hover:text-primary"
      />
      
      <div className="hidden lg:flex items-center ml-2">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-20 h-1 bg-surface rounded-full appearance-none cursor-pointer slider"
          aria-label="Volume control"
        />
      </div>

      {/* Mobile Volume Slider */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          iconName="MoreHorizontal"
          iconSize={16}
          aria-label="Volume options"
          className="ml-1 text-text-secondary"
        />
        
        {showVolumeSlider && (
          <>
            <div 
              className="fixed inset-0 z-300"
              onClick={() => setShowVolumeSlider(false)}
            />
            <div className="absolute bottom-full right-0 mb-2 p-3 bg-background border border-border rounded-lg shadow-gentle-lg z-400">
              <div className="flex flex-col items-center space-y-2">
                <span className="text-xs text-text-secondary">Volume</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="w-16 h-1 bg-surface rounded-full appearance-none cursor-pointer slider vertical"
                  style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
                  aria-label="Volume control"
                />
                <span className="text-xs text-text-secondary font-data">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VolumeControl;