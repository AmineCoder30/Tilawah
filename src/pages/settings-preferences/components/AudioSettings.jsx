import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const AudioSettings = ({ isExpanded, onToggle }) => {
  const [selectedReciter, setSelectedReciter] = useState("abdul-basit");
  const [selectedRiwayah, setSelectedRiwayah] = useState("hafs");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const reciters = [
    { id: "abdul-basit", name: "Abdul Basit Abdul Samad", country: "Egypt" },
    { id: "mishary", name: "Mishary Rashid Alafasy", country: "Kuwait" },
    { id: "sudais", name: "Abdul Rahman Al-Sudais", country: "Saudi Arabia" },
    { id: "husary", name: "Mahmoud Khalil Al-Husary", country: "Egypt" },
    { id: "minshawi", name: "Mohamed Siddiq El-Minshawi", country: "Egypt" },
    { id: "ajmi", name: "Ahmed ibn Ali al-Ajmi", country: "Saudi Arabia" },
  ];

  const riwayahMethods = [
    {
      id: "hafs",
      name: "Hafs an Asim",
      description: "Most common recitation method",
      regions: "Middle East, South Asia, Africa",
    },
    {
      id: "warsh",
      name: "Warsh an Nafi",
      description: "Common in North and West Africa",
      regions: "Morocco, Algeria, Tunisia, West Africa",
    },
    {
      id: "qalun",
      name: "Qalun an Nafi",
      description: "Alternative method from Nafi",
      regions: "Libya, parts of North Africa",
    },
    {
      id: "duri",
      name: "Al-Duri an Abu Amr",
      description: "Historical recitation method",
      regions: "Parts of Middle East",
    },
  ];

  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const handleReciterChange = (reciterId) => {
    setSelectedReciter(reciterId);
  };

  const handleRiwayahChange = (riwayahId) => {
    setSelectedRiwayah(riwayahId);
  };

  const handlePlaybackSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  const handleAutoPlayToggle = () => {
    setAutoPlay(!autoPlay);
  };

  const handlePreviewPlay = () => {
    setIsPlaying(!isPlaying);
    // In real app, this would play/pause preview audio
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const selectedReciterData = reciters.find((r) => r.id === selectedReciter);
  const selectedRiwayahData = riwayahMethods.find(
    (r) => r.id === selectedRiwayah
  );

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-hover transition-colors duration-200"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <Icon name="Volume2" size={20} className="text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Audio Settings
            </h3>
            <p className="text-sm text-text-secondary">
              Reciter, Riwayah, and playback preferences
            </p>
          </div>
        </div>
        <Icon
          name={isExpanded ? "ChevronUp" : "ChevronDown"}
          size={20}
          className="text-text-secondary"
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 gap-y-6">
          {/* Default Reciter */}
          <div className="gap-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-heading font-medium text-text-primary">
                Default Reciter
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePreviewPlay}
                iconName={isPlaying ? "Pause" : "Play"}
                iconPosition="left"
                disabled={isPlaying}
              >
                {isPlaying ? "Playing..." : "Preview"}
              </Button>
            </div>

            <div className="gap-y-2">
              {reciters.map((reciter) => (
                <button
                  key={reciter.id}
                  onClick={() => handleReciterChange(reciter.id)}
                  className={`w-full p-3 rounded-lg border transition-colors duration-200 text-left ${
                    selectedReciter === reciter.id
                      ? "border-primary bg-primary-50"
                      : "border-border bg-background hover:bg-surface-hover"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {reciter.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {reciter.country}
                      </p>
                    </div>
                    {selectedReciter === reciter.id && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Riwayah Method */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Recitation Method (Riwayah)
            </h4>
            <div className="gap-y-2">
              {riwayahMethods.map((riwayah) => (
                <button
                  key={riwayah.id}
                  onClick={() => handleRiwayahChange(riwayah.id)}
                  className={`w-full p-3 rounded-lg border transition-colors duration-200 text-left ${
                    selectedRiwayah === riwayah.id
                      ? "border-primary bg-primary-50"
                      : "border-border bg-background hover:bg-surface-hover"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary mb-1">
                        {riwayah.name}
                      </p>
                      <p className="text-xs text-text-secondary mb-1">
                        {riwayah.description}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        Common in: {riwayah.regions}
                      </p>
                    </div>
                    {selectedRiwayah === riwayah.id && (
                      <Icon
                        name="Check"
                        size={16}
                        className="text-primary flex-shrink-0 mt-1"
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Playback Speed */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Default Playback Speed
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {playbackSpeeds.map((speed) => (
                <button
                  key={speed}
                  onClick={() => handlePlaybackSpeedChange(speed)}
                  className={`p-2 rounded-lg border transition-colors duration-200 ${
                    playbackSpeed === speed
                      ? "border-primary bg-primary-50 text-primary"
                      : "border-border bg-background hover:bg-surface-hover text-text-primary"
                  }`}
                >
                  <span className="text-sm font-data font-medium">
                    {speed}x
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Auto-play Settings */}
          <div className="gap-y-3">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Auto-play Behavior
            </h4>
            <div className="gap-y-3">
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div className="flex items-center gap-x-3">
                  <Icon name="Play" size={18} className="text-text-secondary" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Auto-play Next Ayah
                    </p>
                    <p className="text-xs text-text-secondary">
                      Automatically continue to next ayah after current finishes
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleAutoPlayToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    autoPlay ? "bg-primary" : "bg-border-medium"
                  }`}
                  aria-label="Toggle auto-play"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      autoPlay ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Current Selection Summary */}
          <div className="p-3 bg-accent-50 rounded-lg border border-accent-200">
            <h5 className="text-sm font-heading font-medium text-text-primary mb-2">
              Current Audio Configuration
            </h5>
            <div className="gap-y-1 text-xs text-text-secondary">
              <p>
                <span className="font-medium">Reciter:</span>{" "}
                {selectedReciterData?.name}
              </p>
              <p>
                <span className="font-medium">Method:</span>{" "}
                {selectedRiwayahData?.name}
              </p>
              <p>
                <span className="font-medium">Speed:</span> {playbackSpeed}x
              </p>
              <p>
                <span className="font-medium">Auto-play:</span>{" "}
                {autoPlay ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioSettings;
