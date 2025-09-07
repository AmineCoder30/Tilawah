import React, { useState, useRef, useEffect } from "react";
import Icon from "../AppIcon";
import { useAudioPlayer } from "../../contexts/AudioPlayerContext";

const PersistentAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const {
    currentReciter,
    currentSurah,
    currentAyah,
    setCurrentSurah,
    audioUrl,
    setAudioUrl,
  } = useAudioPlayer();

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Mock audio data - in real app, this would come from context/props

  const getAudioUrl = () => {
    const surahlist = currentReciter.moshaf[0]?.surah_list.split(",");
    console.log(
      "is the current surah exist in the list",
      surahlist.includes(currentSurah.toString())
    );

    if (surahlist.includes(currentSurah.toString())) {
      const ayahNumber =
        currentSurah < 10
          ? `00${currentSurah}`
          : currentSurah < 100
          ? `0${currentSurah}`
          : `${currentSurah}`;
      setAudioUrl(`${currentReciter.moshaf[0].server}/${ayahNumber}.mp3`);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);
  useEffect(() => {
    getAudioUrl();
  }, [currentReciter, currentSurah]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const changePlaybackSpeed = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];

    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const skipPrevious = () => {
    if (currentSurah > 1) {
      setCurrentSurah(currentSurah - 1);
      // In real app, load previous ayah audio
    }
  };

  const skipNext = () => {
    setCurrentSurah(currentSurah + 1);
    // In real app, load next ayah audio
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Compact player for mobile/desktop when not expanded
  if (!isExpanded) {
    return (
      <>
        <audio ref={audioRef} src={audioUrl} preload="metadata" />

        {/* Mobile Bottom Player */}
        <div className="fixed bottom-0 left-0 right-0 z-200 lg:hidden bg-background border-t border-border shadow-gentle-lg">
          <div className="px-4 py-3">
            {/* Progress Bar */}
            <div
              ref={progressRef}
              className="w-full h-1 bg-surface rounded-full cursor-pointer mb-3"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-primary rounded-full transition-all duration-200"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="flex-shrink-0"
                  aria-label="Expand player"
                >
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Icon
                      name="Music"
                      size={20}
                      className="text-primary-foreground"
                    />
                  </div>
                </button>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {currentSurah}
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    {currentReciter.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <button
                  onClick={skipPrevious}
                  className="p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
                  aria-label="Previous ayah"
                >
                  <Icon
                    name="SkipBack"
                    size={18}
                    className="text-text-primary"
                  />
                </button>

                <button
                  onClick={togglePlayPause}
                  disabled={isLoading}
                  className="p-2 bg-primary hover:bg-primary-600 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isLoading ? (
                    <Icon
                      name="Loader2"
                      size={20}
                      className="text-primary-foreground animate-spin"
                    />
                  ) : (
                    <Icon
                      name={isPlaying ? "Pause" : "Play"}
                      size={20}
                      className="text-primary-foreground"
                    />
                  )}
                </button>

                <button
                  onClick={skipNext}
                  className="p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
                  aria-label="Next ayah"
                >
                  <Icon
                    name="SkipForward"
                    size={18}
                    className="text-text-primary"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Top Player */}
        <div className="hidden lg:block fixed top-16 right-4 z-200 w-80 bg-background border border-border rounded-lg shadow-gentle-lg">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon
                    name="Music"
                    size={20}
                    className="text-primary-foreground"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {currentSurah} - Ayah {currentAyah}
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    {currentReciter.name}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(true)}
                className="p-1 hover:bg-surface-hover rounded transition-colors duration-200"
                aria-label="Expand player"
              >
                <Icon
                  name="Maximize2"
                  size={16}
                  className="text-text-secondary"
                />
              </button>
            </div>

            {/* Progress Bar */}
            <div
              ref={progressRef}
              className="w-full h-1 bg-surface rounded-full cursor-pointer mb-3"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-primary rounded-full transition-all duration-200"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary font-data">
                {formatTime(currentTime)}
              </span>

              <div className="flex items-center gap-x-1">
                <button
                  onClick={skipPrevious}
                  className="p-1 hover:bg-surface-hover rounded transition-colors duration-200"
                  aria-label="Previous ayah"
                >
                  <Icon
                    name="SkipBack"
                    size={16}
                    className="text-text-primary"
                  />
                </button>

                <button
                  onClick={togglePlayPause}
                  disabled={isLoading}
                  className="p-2 bg-primary hover:bg-primary-600 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isLoading ? (
                    <Icon
                      name="Loader2"
                      size={16}
                      className="text-primary-foreground animate-spin"
                    />
                  ) : (
                    <Icon
                      name={isPlaying ? "Pause" : "Play"}
                      size={16}
                      className="text-primary-foreground"
                    />
                  )}
                </button>

                <button
                  onClick={skipNext}
                  className="p-1 hover:bg-surface-hover rounded transition-colors duration-200"
                  aria-label="Next ayah"
                >
                  <Icon
                    name="SkipForward"
                    size={16}
                    className="text-text-primary"
                  />
                </button>
              </div>

              <span className="text-xs text-text-secondary font-data">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Expanded player modal
  return (
    <>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-300"
        onClick={() => setIsExpanded(false)}
      />

      {/* Expanded Player Modal */}
      <div className="fixed inset-4 lg:inset-8 z-400 bg-background rounded-lg shadow-gentle-lg overflow-hidden animate-scale-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Audio Player
            </h2>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
              aria-label="Close player"
            >
              <Icon name="X" size={20} className="text-text-primary" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
            <div className="max-w-md mx-auto">
              {/* Album Art */}
              <div className="w-64 h-64 mx-auto mb-6 bg-primary rounded-lg flex items-center justify-center">
                <Icon
                  name="Music"
                  size={64}
                  className="text-primary-foreground"
                />
              </div>

              {/* Track Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-1">
                  {currentSurah}
                </h3>
                <p className="text-text-secondary mb-2">Ayah {currentAyah}</p>
                <p className="text-sm text-text-secondary">
                  {currentReciter.name}
                </p>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div
                  ref={progressRef}
                  className="w-full h-2 bg-surface rounded-full cursor-pointer mb-2"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-200"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-text-secondary font-data">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-x-4 mb-6">
                <button
                  onClick={skipPrevious}
                  className="p-3 hover:bg-surface-hover rounded-full transition-colors duration-200"
                  aria-label="Previous ayah"
                >
                  <Icon
                    name="SkipBack"
                    size={24}
                    className="text-text-primary"
                  />
                </button>

                <button
                  onClick={togglePlayPause}
                  disabled={isLoading}
                  className="p-4 bg-primary hover:bg-primary-600 rounded-full transition-colors duration-200 disabled:opacity-50"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isLoading ? (
                    <Icon
                      name="Loader2"
                      size={32}
                      className="text-primary-foreground animate-spin"
                    />
                  ) : (
                    <Icon
                      name={isPlaying ? "Pause" : "Play"}
                      size={32}
                      className="text-primary-foreground"
                    />
                  )}
                </button>

                <button
                  onClick={skipNext}
                  className="p-3 hover:bg-surface-hover rounded-full transition-colors duration-200"
                  aria-label="Next ayah"
                >
                  <Icon
                    name="SkipForward"
                    size={24}
                    className="text-text-primary"
                  />
                </button>
              </div>

              {/* Additional Controls */}
              <div className="gap-y-4">
                {/* Volume */}
                <div className="flex items-center gap-x-3">
                  <button
                    onClick={toggleMute}
                    className="p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    <Icon
                      name={
                        isMuted
                          ? "VolumeX"
                          : volume > 0.5
                          ? "Volume2"
                          : "Volume1"
                      }
                      size={20}
                      className="text-text-primary"
                    />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1 bg-surface rounded-full appearance-none cursor-pointer"
                  />
                </div>

                {/* Playback Speed */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    Playback Speed
                  </span>
                  <button
                    onClick={changePlaybackSpeed}
                    className="px-3 py-1 bg-surface hover:bg-surface-hover rounded-lg text-sm font-data transition-colors duration-200"
                  >
                    {playbackSpeed}x
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersistentAudioPlayer;
