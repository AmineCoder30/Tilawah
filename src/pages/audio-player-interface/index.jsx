import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import PrimaryTabNavigation from "../../components/ui/PrimaryTabNavigation";
import ReciterCarousel from "./components/ReciterCarousel";
import PlaybackControls from "./components/PlaybackControls";
import ProgressBar from "./components/ProgressBar";
import VolumeControl from "./components/VolumeControl";
import PlaybackModeToggle from "./components/PlaybackModeToggle";
import SpeedControl from "./components/SpeedControl";
import AyahDisplay from "./components/AyahDisplay";
import StickyPlayer from "./components/StickyPlayer";

const AudioPlayerInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef(null);

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [playbackMode, setPlaybackMode] = useState("ayah");

  // UI state
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedRiwayah, setSelectedRiwayah] = useState("Hafs");
  const [showTranslation, setShowTranslation] = useState(true);

  // Mock data
  const mockCurrentAyah = {
    number: 1,
    arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation:
      "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    transliteration: "Bismillahi'r-rahmani'r-raheem",
  };

  const mockSurahName = "Al-Fatiha";
  const mockCurrentSurah = {
    id: 1,
    name: mockSurahName,
    totalAyahs: 7,
    currentAyah: 1,
  };

  const mockReciters = [
    {
      id: 1,
      name: "Abdul Basit",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      riwayah: ["Hafs", "Warsh"],
      audioUrl: "/assets/audio/abdul-basit/",
    },
    {
      id: 2,
      name: "Mishary Rashid",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      riwayah: ["Hafs"],
      audioUrl: "/assets/audio/mishary/",
    },
    {
      id: 3,
      name: "Saad Al-Ghamdi",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      riwayah: ["Hafs", "Qalun"],
      audioUrl: "/assets/audio/saad/",
    },
    {
      id: 4,
      name: "Maher Al-Muaiqly",
      photo:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      riwayah: ["Hafs"],
      audioUrl: "/assets/audio/maher/",
    },
    {
      id: 5,
      name: "Ahmed Al-Ajmi",
      photo:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      riwayah: ["Hafs", "Warsh"],
      audioUrl: "/assets/audio/ahmed/",
    },
    {
      id: 6,
      name: "Yasser Al-Dosari",
      photo:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      riwayah: ["Hafs"],
      audioUrl: "/assets/audio/yasser/",
    },
  ];

  const [selectedReciter, setSelectedReciter] = useState(mockReciters[0]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      setIsPlaying(false);
      if (playbackMode === "surah") {
        handleNext();
      } else if (playbackMode === "repeat") {
        audio.currentTime = 0;
        audio.play();
      }
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
  }, [playbackMode]);

  // Playback controls
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (mockCurrentSurah.currentAyah > 1) {
      // In real app, load previous ayah
      console.log("Loading previous ayah");
    }
  };

  const handleNext = () => {
    if (mockCurrentSurah.currentAyah < mockCurrentSurah.totalAyahs) {
      // In real app, load next ayah
      console.log("Loading next ayah");
    }
  };

  const handleSeek = (newTime) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const handleToggleMute = () => {
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

  const handleSpeedChange = (newSpeed) => {
    setPlaybackSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const handleReciterSelect = (reciter) => {
    setSelectedReciter(reciter);
    // In real app, load new audio source
    console.log("Selected reciter:", reciter.name);
  };

  const canGoPrevious = mockCurrentSurah.currentAyah > 1;
  const canGoNext = mockCurrentSurah.currentAyah < mockCurrentSurah.totalAyahs;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={`${selectedReciter.audioUrl}${mockCurrentSurah.id}/${mockCurrentAyah.number}.mp3`}
        preload="metadata"
      />

      {/* Sticky Player */}
      <StickyPlayer
        currentAyah={mockCurrentAyah}
        surahName={mockSurahName}
        reciterName={selectedReciter.name}
        isPlaying={isPlaying}
        isLoading={isLoading}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={handlePlayPause}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSeek={handleSeek}
        onExpand={() => setIsExpanded(true)}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
      />

      {/* Expanded Player Modal */}
      {isExpanded && (
        <>
          {/* Mobile Full Screen */}
          <div className="lg:hidden fixed inset-0 z-300 bg-background">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  iconName="ChevronDown"
                  iconSize={20}
                  aria-label="Minimize player"
                  className="text-text-primary"
                />
                <h1 className="text-lg font-heading font-semibold text-text-primary">
                  Audio Player
                </h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/surah-detail")}
                  iconName="FileText"
                  iconSize={20}
                  aria-label="View text"
                  className="text-text-primary"
                />
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 gap-y-6">
                {/* Current Ayah Display */}
                <AyahDisplay
                  ayah={mockCurrentAyah}
                  surahName={mockSurahName}
                  showTranslation={showTranslation}
                />

                {/* Progress */}
                <ProgressBar
                  currentTime={currentTime}
                  duration={duration}
                  onSeek={handleSeek}
                />

                {/* Main Controls */}
                <PlaybackControls
                  isPlaying={isPlaying}
                  isLoading={isLoading}
                  onPlayPause={handlePlayPause}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  canGoPrevious={canGoPrevious}
                  canGoNext={canGoNext}
                  size="large"
                />

                {/* Secondary Controls */}
                <div className="flex items-center justify-between">
                  <VolumeControl
                    volume={volume}
                    onVolumeChange={handleVolumeChange}
                    isMuted={isMuted}
                    onToggleMute={handleToggleMute}
                  />

                  <PlaybackModeToggle
                    mode={playbackMode}
                    onModeChange={setPlaybackMode}
                  />

                  <SpeedControl
                    speed={playbackSpeed}
                    onSpeedChange={handleSpeedChange}
                  />
                </div>

                {/* Reciter Selection */}
                <ReciterCarousel
                  reciters={mockReciters}
                  selectedReciter={selectedReciter}
                  onReciterSelect={handleReciterSelect}
                  riwayahFilter={selectedRiwayah}
                />

                {/* Options */}
                <div className="gap-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">
                      Show Translation
                    </span>
                    <Button
                      variant={showTranslation ? "primary" : "ghost"}
                      size="xs"
                      onClick={() => setShowTranslation(!showTranslation)}
                      iconName={showTranslation ? "Eye" : "EyeOff"}
                      iconSize={16}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Riwayah</span>
                    <select
                      value={selectedRiwayah}
                      onChange={(e) => setSelectedRiwayah(e.target.value)}
                      className="px-3 py-1 bg-surface border border-border rounded text-sm text-text-primary"
                    >
                      <option value="Hafs">Hafs</option>
                      <option value="Warsh">Warsh</option>
                      <option value="Qalun">Qalun</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Modal */}
          <div className="hidden lg:block">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-300"
              onClick={() => setIsExpanded(false)}
            />

            {/* Modal */}
            <div className="fixed inset-8 z-400 bg-background rounded-lg shadow-gentle-lg overflow-hidden">
              <div className="flex h-full">
                {/* Left Panel - Controls */}
                <div className="w-1/2 flex flex-col border-r border-border">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-border">
                    <h1 className="text-xl font-heading font-semibold text-text-primary">
                      Audio Player
                    </h1>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                      iconName="X"
                      iconSize={20}
                      aria-label="Close player"
                      className="text-text-primary"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-6 gap-y-6">
                    {/* Progress */}
                    <ProgressBar
                      currentTime={currentTime}
                      duration={duration}
                      onSeek={handleSeek}
                    />

                    {/* Main Controls */}
                    <PlaybackControls
                      isPlaying={isPlaying}
                      isLoading={isLoading}
                      onPlayPause={handlePlayPause}
                      onPrevious={handlePrevious}
                      onNext={handleNext}
                      canGoPrevious={canGoPrevious}
                      canGoNext={canGoNext}
                      size="large"
                    />

                    {/* Secondary Controls */}
                    <div className="flex items-center justify-between">
                      <VolumeControl
                        volume={volume}
                        onVolumeChange={handleVolumeChange}
                        isMuted={isMuted}
                        onToggleMute={handleToggleMute}
                      />

                      <PlaybackModeToggle
                        mode={playbackMode}
                        onModeChange={setPlaybackMode}
                      />

                      <SpeedControl
                        speed={playbackSpeed}
                        onSpeedChange={handleSpeedChange}
                      />
                    </div>

                    {/* Reciter Selection */}
                    <ReciterCarousel
                      reciters={mockReciters}
                      selectedReciter={selectedReciter}
                      onReciterSelect={handleReciterSelect}
                      riwayahFilter={selectedRiwayah}
                    />

                    {/* Options */}
                    <div className="gap-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">
                          Show Translation
                        </span>
                        <Button
                          variant={showTranslation ? "primary" : "ghost"}
                          size="xs"
                          onClick={() => setShowTranslation(!showTranslation)}
                          iconName={showTranslation ? "Eye" : "EyeOff"}
                          iconSize={16}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">
                          Riwayah
                        </span>
                        <select
                          value={selectedRiwayah}
                          onChange={(e) => setSelectedRiwayah(e.target.value)}
                          className="px-3 py-1 bg-surface border border-border rounded text-sm text-text-primary"
                        >
                          <option value="Hafs">Hafs</option>
                          <option value="Warsh">Warsh</option>
                          <option value="Qalun">Qalun</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel - Ayah Display */}
                <div className="w-1/2 flex flex-col">
                  <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-lg font-heading font-semibold text-text-primary">
                      Current Ayah
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate("/surah-detail")}
                      iconName="FileText"
                      iconSize={18}
                      aria-label="View full text"
                      className="text-text-secondary hover:text-text-primary"
                    >
                      View Full Text
                    </Button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6">
                    <AyahDisplay
                      ayah={mockCurrentAyah}
                      surahName={mockSurahName}
                      showTranslation={showTranslation}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom spacing for mobile navigation */}
      <div className="h-32 lg:h-16" />
    </div>
  );
};

export default AudioPlayerInterface;
