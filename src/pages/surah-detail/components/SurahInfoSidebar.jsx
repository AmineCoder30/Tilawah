import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import quran from "../../../images/quran.png";
import { useAudioPlayer } from "contexts/AudioPlayerContext";

const SurahInfoSidebar = ({
  surah,
  currentReciter,
  onReciterPanelOpen,
  playbackMode,
  onPlaybackModeChange,
  bookmarkedAyahs = [],
  onBookmarkClick,
}) => {
  const { audioUrl } = useAudioPlayer();
  const SurahName = surah?.name || "Surah Name";

  const handleDownload = async () => {
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();

      // Create a temporary link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${SurahName}.mp3`; // filename
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const surahStats = [
    { label: "Ayahs", value: surah.ayahs.length, icon: "FileText" },
    {
      label: "Words",
      value:
        surah.ayahs.reduce(
          (acc, ayah) => acc + ayah.text.split(" ").length,
          0
        ) || "N/A",
      icon: "Type",
    },
    {
      label: "Letters",
      value:
        surah.ayahs.reduce((acc, ayah) => acc + ayah.text.length, 0) || "N/A",
      icon: "Hash",
    },
    {
      label: "Rukus",
      value:
        surah.ayahs.reduce((acc, ayah) => acc + (ayah.ruku ? 1 : 0), 0) ||
        "N/A",
      icon: "Layers",
    },
  ];
  console.log("Surah Info Sidebar - Surah Data:", surah);
  return (
    <div className="hidden lg:block w-80 bg-surface border-r border-border h-screen sticky top-32 overflow-y-auto">
      <div className="p-6">
        {/* Surah Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-xl font-heading font-bold text-primary-foreground">
              {surah.number}
            </span>
          </div>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-1">
            {surah.name}
          </h2>
          <p className="text-sm text-text-secondary mb-2">
            {surah.englishName}
          </p>
          <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary">
            <span className="px-2 py-1 bg-background rounded">
              {surah.revelationType}
            </span>
            <span className="px-2 py-1 bg-background rounded">
              {surah.revelationPlace}
            </span>
          </div>
        </div>

        {/* Surah Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {surahStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-background rounded-lg p-3 text-center"
            >
              <Icon
                name={stat.icon}
                size={20}
                className="text-text-secondary mx-auto mb-2"
              />
              <p className="text-lg font-heading font-semibold text-text-primary">
                {stat.value}
              </p>
              <p className="text-xs text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Current Reciter */}
        <div className="mb-6">
          <h3 className="text-sm font-heading font-medium text-text-secondary mb-3">
            Current Reciter
          </h3>
          <div className="bg-background rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={quran}
                  alt={currentReciter?.name || "Reciter"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/images/no_image.png";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {currentReciter?.name || "No reciter selected"}
                </p>
                <p className="text-xs text-text-secondary">
                  {currentReciter?.country || ""}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={onReciterPanelOpen}
              iconName="Mic"
              iconPosition="left"
              className="w-full"
            >
              Change Reciter
            </Button>
          </div>
        </div>

        {/* Playback Mode */}
        {/* <div className="mb-6">
          <h3 className="text-sm font-heading font-medium text-text-secondary mb-3">
            Playback Mode
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onPlaybackModeChange("individual")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                playbackMode === "individual"
                  ? "bg-primary-50 border border-primary text-primary"
                  : "bg-background hover:bg-surface-hover text-text-secondary"
              }`}
            >
              <Icon name="Play" size={16} />
              <div className="text-left">
                <p className="text-sm font-medium">Individual Ayah</p>
                <p className="text-xs opacity-75">Play one ayah at a time</p>
              </div>
            </button>

            <button
              onClick={() => onPlaybackModeChange("continuous")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                playbackMode === "continuous"
                  ? "bg-primary-50 border border-primary text-primary"
                  : "bg-background hover:bg-surface-hover text-text-secondary"
              }`}
            >
              <Icon name="PlayCircle" size={16} />
              <div className="text-left">
                <p className="text-sm font-medium">Continuous Surah</p>
                <p className="text-xs opacity-75">Play entire surah</p>
              </div>
            </button>
          </div>
        </div> */}

        {/* Bookmarked Ayahs */}
        {bookmarkedAyahs.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-heading font-medium text-text-secondary mb-3">
              Bookmarked Ayahs
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {bookmarkedAyahs.slice(0, 5).map((ayahNumber) => (
                <button
                  key={ayahNumber}
                  onClick={() => onBookmarkClick(ayahNumber)}
                  className="w-full flex items-center space-x-3 p-2 bg-background hover:bg-surface-hover rounded transition-colors duration-200 text-left"
                >
                  <Icon name="Bookmark" size={14} className="text-primary" />
                  <span className="text-sm text-text-primary">
                    Ayah {ayahNumber}
                  </span>
                </button>
              ))}
              {bookmarkedAyahs.length > 5 && (
                <p className="text-xs text-text-secondary text-center py-2">
                  +{bookmarkedAyahs.length - 5} more bookmarks
                </p>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
            className="w-full"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${surah.name} - ${surah.englishName}`,
                  text: `Read ${surah.name} from the Quran`,
                  url: window.location.href,
                });
              }
            }}
          >
            Share Surah
          </Button>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            className="w-full"
            onClick={handleDownload}
          >
            Download Audio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurahInfoSidebar;
