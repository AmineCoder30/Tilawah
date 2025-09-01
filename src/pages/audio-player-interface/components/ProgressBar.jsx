import React from 'react';

const ProgressBar = ({ 
  currentTime, 
  duration, 
  onSeek, 
  className = '',
  showTime = true 
}) => {
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleClick = (e) => {
    if (!onSeek || duration === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    onSeek(newTime);
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className="w-full h-2 bg-surface rounded-full cursor-pointer relative overflow-hidden"
        onClick={handleClick}
        role="progressbar"
        aria-valuenow={progressPercentage}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Audio progress"
      >
        <div
          className="h-full bg-primary rounded-full transition-all duration-200"
          style={{ width: `${progressPercentage}%` }}
        />
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-sm transition-all duration-200"
          style={{ left: `calc(${progressPercentage}% - 6px)` }}
        />
      </div>
      
      {showTime && (
        <div className="flex justify-between mt-2 text-xs text-text-secondary font-data">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;