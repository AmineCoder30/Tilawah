import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const SpeedControl = ({ speed, onSpeedChange }) => {
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowSpeedOptions(!showSpeedOptions)}
        className="text-text-secondary hover:text-text-primary font-data text-xs"
        aria-label="Playback speed"
      >
        {speed}x
      </Button>

      {showSpeedOptions && (
        <>
          <div 
            className="fixed inset-0 z-300"
            onClick={() => setShowSpeedOptions(false)}
          />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-background border border-border rounded-lg shadow-gentle-lg z-400 min-w-max">
            <div className="p-2">
              <div className="text-xs text-text-secondary mb-2 px-2">Playback Speed</div>
              <div className="grid grid-cols-3 gap-1">
                {speedOptions.map((speedOption) => (
                  <Button
                    key={speedOption}
                    variant={speed === speedOption ? 'primary' : 'ghost'}
                    size="xs"
                    onClick={() => {
                      onSpeedChange(speedOption);
                      setShowSpeedOptions(false);
                    }}
                    className={`text-xs font-data ${
                      speed === speedOption 
                        ? 'text-primary-foreground' 
                        : 'text-text-primary hover:text-primary'
                    }`}
                  >
                    {speedOption}x
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SpeedControl;