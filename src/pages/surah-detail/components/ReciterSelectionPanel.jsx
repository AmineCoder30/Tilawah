import React, { useEffect, useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import quran from "../../../images/quran.png";
import { Riwayat } from "../../../constants/riwayat";
import { useAudioPlayer } from "contexts/AudioPlayerContext";
import axios from "axios";

const ReciterSelectionPanel = ({
  isOpen,
  onClose,
  selectedReciter,
  onReciterChange,

  onRiwayahChange,
}) => {
  const [reciters, setReciters] = useState([]);
  const {
    currentReciter,

    currentRiwayah,
  } = useAudioPlayer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.mp3quran.net/api/v3/reciters?language=ar&rewaya=${currentRiwayah}`
        );
        // Handle the response data

        setReciters(response.data.reciters);
      } catch (error) {
        console.error("Error fetching reciters:", error);
      }
    };

    fetchData();
  }, [currentRiwayah]);

  const [activeTab, setActiveTab] = useState("reciters");

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-300"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed bottom-0 left-0 right-0 lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-96 h-[90vh] z-400 bg-background lg:rounded-lg shadow-gentle-lg animate-slide-up lg:animate-scale-in">
        <div className="flex flex-col h-full ">
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Audio Settings
            </h2>
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              aria-label="Close panel"
            />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("reciters")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === "reciters"
                  ? "text-primary border-b-2 border-primary bg-primary-50"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Reciters
            </button>
            <button
              onClick={() => setActiveTab("riwayah")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === "riwayah"
                  ? "text-primary border-b-2 border-primary bg-primary-50"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Riwayah
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            {activeTab === "reciters" ? (
              <div className="space-y-3">
                {reciters.length > 0 &&
                  reciters.map((reciter) => (
                    <button
                      key={reciter.id}
                      onClick={() => onReciterChange(reciter)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 text-left ${
                        selectedReciter?.id === reciter.id
                          ? "bg-primary-50 border border-primary text-primary"
                          : "hover:bg-surface-hover border border-transparent"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={quran}
                          alt={reciter.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/assets/images/no_image.png";
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {reciter.name}
                        </p>
                        {/* <p
                        className="text-xs text-text-secondary truncate"
                        dir="rtl"
                      >
                        {reciter.arabicName}
                      </p> */}
                        <div className="flex items-center space-x-2 mt-1">
                          {/* <span className="text-xs text-text-secondary">
                          {reciter.country}
                        </span> */}
                          <span className="text-xs text-text-secondary">•</span>
                          <span className="text-xs text-text-secondary">
                            {reciter.moshaf[0].name}
                          </span>
                        </div>
                      </div>

                      {selectedReciter?.id === reciter.id && (
                        <Icon
                          name="Check"
                          size={20}
                          className="text-primary flex-shrink-0"
                        />
                      )}
                    </button>
                  ))}
              </div>
            ) : (
              <div className="space-y-3">
                {Riwayat.map((riwayah) => (
                  <button
                    key={riwayah.id}
                    onClick={() => onRiwayahChange(riwayah.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 text-left ${
                      currentRiwayah === riwayah.id
                        ? "bg-primary-50 border border-primary text-primary"
                        : "hover:bg-surface-hover border border-transparent"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {riwayah.name}
                      </p>
                      <p className="text-xs text-text-secondary line-clamp-1">
                        {riwayah.description}
                      </p>
                    </div>

                    {currentRiwayah === riwayah.id && (
                      <Icon name="Check" size={20} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 lg:p-6 border-t border-border">
            <div className="text-xs text-text-secondary text-center">
              {reciters.length} reciters available recitation
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReciterSelectionPanel;
