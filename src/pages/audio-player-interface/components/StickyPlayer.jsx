import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressBar from './ProgressBar';
import PlaybackControls from './PlaybackControls';

const StickyPlayer = ({ 
  currentAyah,
  surahName,
  reciterName,
  isPlaying,
  isLoading,
  currentTime,
  duration,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onExpand,
  canGoPrevious,
  canGoNext
}) => {
  if (!currentAyah) return null;

  return (
    <>
      {/* Mobile Sticky Player */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-200 bg-background border-t border-border shadow-gentle-lg">
        <div className="px-4 py-3">
          {/* Progress Bar */}
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
            showTime={false}
            className="mb-3"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={onExpand}
              className="flex items-center space-x-3 flex-1 min-w-0"
              aria-label="Expand player"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Music" size={20} className="text-primary-foreground" />
              </div>
              
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-medium text-text-primary truncate">
                  {surahName} - Ayah {currentAyah.number}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {reciterName}
                </p>
              </div>
            </button>

            <div className="flex items-center space-x-1">
              <PlaybackControls
                isPlaying={isPlaying}
                isLoading={isLoading}
                onPlayPause={onPlayPause}
                onPrevious={onPrevious}
                onNext={onNext}
                canGoPrevious={canGoPrevious}
                canGoNext={canGoNext}
                size="small"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sticky Player */}
      <div className="hidden lg:block fixed top-32 right-4 z-200 w-80 bg-background border border-border rounded-lg shadow-gentle-lg">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onExpand}
              className="flex items-center space-x-3 flex-1 min-w-0"
              aria-label="Expand player"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Music" size={20} className="text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-medium text-text-primary truncate">
                  {surahName} - Ayah {currentAyah.number}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {reciterName}
                </p>
              </div>
            </button>
            
            <Button
              variant="ghost"
              size="xs"
              onClick={onExpand}
              iconName="Maximize2"
              iconSize={16}
              aria-label="Expand player"
              className="text-text-secondary hover:text-text-primary"
            />
          </div>

          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
            className="mb-3"
          />

          <div className="flex items-center justify-center">
            <PlaybackControls
              isPlaying={isPlaying}
              isLoading={isLoading}
              onPlayPause={onPlayPause}
              onPrevious={onPrevious}
              onNext={onNext}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
              size="small"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StickyPlayer;