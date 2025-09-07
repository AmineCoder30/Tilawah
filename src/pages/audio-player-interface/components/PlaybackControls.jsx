import React from "react";

import Button from "../../../components/ui/Button";

const PlaybackControls = ({
  isPlaying,
  isLoading,
  onPlayPause,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  size = "large",
}) => {
  const iconSize = size === "large" ? 32 : size === "medium" ? 24 : 20;
  const buttonSize = size === "large" ? "xl" : size === "medium" ? "lg" : "md";

  return (
    <div className="flex items-center justify-center gap-x-4">
      <Button
        variant="ghost"
        size={buttonSize}
        shape="circle"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        iconName="SkipBack"
        iconSize={iconSize}
        aria-label="Previous ayah"
        className="text-text-primary hover:text-primary disabled:opacity-50"
      />

      <Button
        variant="primary"
        size={buttonSize}
        shape="circle"
        onClick={onPlayPause}
        disabled={isLoading}
        loading={isLoading}
        iconName={isPlaying ? "Pause" : "Play"}
        iconSize={iconSize}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="shadow-gentle-md"
      />

      <Button
        variant="ghost"
        size={buttonSize}
        shape="circle"
        onClick={onNext}
        disabled={!canGoNext}
        iconName="SkipForward"
        iconSize={iconSize}
        aria-label="Next ayah"
        className="text-text-primary hover:text-primary disabled:opacity-50"
      />
    </div>
  );
};

export default PlaybackControls;
