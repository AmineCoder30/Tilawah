import React, { createContext, useContext, useState } from "react";

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentReciter, setCurrentReciter] = useState({
    id: 1,
    name: "إبراهيم الأخضر",
    letter: "إ",
    date: "2025-05-01T21:47:54.000000Z",
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server6.mp3quran.net/akdr/",
        surah_total: 114,
        moshaf_type: 11,
        surah_list:
          "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114",
      },
    ],
  });
  const [currentSurah, setCurrentSurah] = useState("Al-Fatiha");
  const [currentRiwayah, setCurrentRiwayah] = useState(1);
  const [currentAyah, setCurrentAyah] = useState(1);
  const [audioUrl, setAudioUrl] = useState(
    "https://server6.mp3quran.net/akdr/001.mp3"
  );

  return (
    <AudioPlayerContext.Provider
      value={{
        currentReciter,
        setCurrentReciter,
        currentSurah,
        setCurrentSurah,
        currentRiwayah,
        setCurrentRiwayah,
        currentAyah,
        setCurrentAyah,
        audioUrl,
        setAudioUrl,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
